import { timingSafeEqual } from 'node:crypto';
import { createClient } from '@supabase/supabase-js';
import { runBursaryChecks } from '../lib/bursary-checker.js';

export const config = { maxDuration: 60 };
export function authorized(header, secret) {
  if (!secret || typeof header !== 'string') return false;
  const actual = Buffer.from(header);
  const expected = Buffer.from(`Bearer ${secret}`);
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}
export function makeHandler({ env = process.env, client = createClient, run = runBursaryChecks } = {}) {
  return async function handler(req, res) {
    res.setHeader('Cache-Control', 'no-store');
    if (req.method !== 'GET') {
      res.setHeader('Allow', 'GET');
      return res.status(405).json({ error: 'Method not allowed' });
    }
    if (!authorized(req.headers.authorization, env.CRON_SECRET)) return res.status(401).json({ error: 'Unauthorized' });
    const url = env.SUPABASE_URL || env.VITE_SUPABASE_URL;
    const key = env.SUPABASE_SECRET_KEY;
    if (!url || !key) return res.status(503).json({ error: 'Updater environment is not configured' });
    try {
      const jobSignal = AbortSignal.timeout(45000);
      const db = client(url, key, {
        auth: { persistSession: false, autoRefreshToken: false },
        global: { fetch: (input, init = {}) => fetch(input, {
          ...init, signal: AbortSignal.any([jobSignal, AbortSignal.timeout(5000), ...(init.signal ? [init.signal] : [])])
        }) }
      });
      const results = await run(db, fetch, jobSignal);
      const failures = results.filter(r => ['error', 'database_error', 'time_budget_exceeded'].includes(r.outcome)).length;
      console.info('Bursary source check completed', { checked: results.length, failures });
      return res.status(failures ? 207 : 200).json({
        status: failures ? 'partial' : 'complete', checkedAt: new Date().toISOString(), results
      });
    } catch {
      console.error('Bursary checker could not read or write the database');
      return res.status(500).json({ error: 'Bursary checker failed; inspect deployment configuration and database access' });
    }
  };
}
export default makeHandler();

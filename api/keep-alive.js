export default async function handler(req, res) {
  const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://uuogkevymtifhlbadntv.supabase.co';
  const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV1b2drZXZ5bXRpZmhsYmFkbnR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM2MjY2NjksImV4cCI6MjA5OTIwMjY2OX0.8xgctFdgmzRuTbGCgpCWzt7FtAhZyRYZOwJvfvlM7K0';

  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/institutions?select=count`, {
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`
      }
    });

    if (!response.ok) {
      throw new Error(`Supabase returned status ${response.status}`);
    }

    const data = await response.json();
    return res.status(200).json({
      status: 'alive',
      message: 'Supabase pinged successfully.',
      timestamp: new Date().toISOString(),
      data
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
}

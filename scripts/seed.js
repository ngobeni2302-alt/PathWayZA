// SEED SCRIPT TO POPULATE YOUR SUPABASE CLOUD DATABASE
// Run this file using: node scripts/seed.js
import fs from 'fs';

// Load env vars manually to bypass any shell/caching bugs
let supabaseUrl = 'https://uuogkevymtifhlbadntv.supabase.co';
let supabaseAnonKey = '';

try {
  const envContent = fs.readFileSync('.env', 'utf8');
  const lines = envContent.split('\n');
  for (const line of lines) {
    const match = line.match(/^\s*VITE_SUPABASE_ANON_KEY\s*=\s*(.*)\s*$/);
    if (match) {
      supabaseAnonKey = match[1].trim();
    }
    const urlMatch = line.match(/^\s*VITE_SUPABASE_URL\s*=\s*(.*)\s*$/);
    if (urlMatch) {
      supabaseUrl = urlMatch[1].trim();
    }
  }
} catch (e) {
  console.error("Could not read .env file locally:", e.message);
}

if (!supabaseAnonKey || supabaseAnonKey.includes('YOUR_SUPABASE_ANON_KEY_HERE')) {
  console.error("Error: Please add your VITE_SUPABASE_ANON_KEY to your .env file before running this script.");
  process.exit(1);
}

async function seed() {
  console.log("Reading institutions from public/institutions.json...");
  const rawData = fs.readFileSync('public/institutions.json', 'utf8');
  const institutionsList = JSON.parse(rawData);

  console.log(`Found ${institutionsList.length} institutions. Starting upload via REST API...`);

  for (let inst of institutionsList) {
    // 1. Upsert Institution
    try {
      const instResponse = await fetch(`${supabaseUrl}/rest/v1/institutions?on_conflict=name`, {
        method: 'POST',
        headers: {
          'apikey': supabaseAnonKey,
          'Authorization': `Bearer ${supabaseAnonKey}`,
          'Content-Type': 'application/json',
          'Prefer': 'resolution=merge-duplicates,return=representation'
        },
        body: JSON.stringify({
          name: inst.name,
          type: inst.type,
          location: inst.location,
          legit: inst.legit
        })
      });

      if (!instResponse.ok) {
        const errText = await instResponse.text();
        console.error(`Failed to insert institution ${inst.name}:`, errText);
        continue;
      }

      const instData = await instResponse.json();
      const insertedInst = instData[0];
      console.log(`✓ Uploaded Institution: ${insertedInst.name}`);

      // Generate Courses based on type
      let coursesToInsert = [];
      if (insertedInst.type === 'Public University') {
        coursesToInsert = [
          { name: "BSc in Computer Science", saqa_id: `UNIV-${insertedInst.id}-CS`, nqf_level: 7, min_aps: 35, required_subjects: { "Mathematics": 60, "Physical Sciences": 50 } },
          { name: "Bachelor of Commerce in Accounting", saqa_id: `UNIV-${insertedInst.id}-ACC`, nqf_level: 7, min_aps: 32, required_subjects: { "Mathematics": 50 } },
          { name: "Bachelor of Laws (LLB)", saqa_id: `UNIV-${insertedInst.id}-LLB`, nqf_level: 8, min_aps: 30, required_subjects: { "English": 50 } },
          { name: "Bachelor of Medicine & Bachelor of Surgery (MBChB)", saqa_id: `UNIV-${insertedInst.id}-MED`, nqf_level: 8, min_aps: 40, required_subjects: { "Mathematics": 70, "Physical Sciences": 70, "Life Sciences": 70 } },
          { name: "BEng in Electrical Engineering", saqa_id: `UNIV-${insertedInst.id}-ENG`, nqf_level: 8, min_aps: 36, required_subjects: { "Mathematics": 65, "Physical Sciences": 60 } },
          { name: "Bachelor of Arts in Psychology", saqa_id: `UNIV-${insertedInst.id}-PSY`, nqf_level: 7, min_aps: 26, required_subjects: {} }
        ];
      } else if (insertedInst.type === 'Public TVET') {
        coursesToInsert = [
          { name: "National Certificate: N1 Engineering Studies", saqa_id: `TVET-${insertedInst.id}-N1`, nqf_level: 2, min_aps: 15, required_subjects: {} },
          { name: "National Certificate: N3 Engineering Studies", saqa_id: `TVET-${insertedInst.id}-N3`, nqf_level: 3, min_aps: 16, required_subjects: {} },
          { name: "National Certificate: N6 Business Management", saqa_id: `TVET-${insertedInst.id}-BM6`, nqf_level: 5, min_aps: 18, required_subjects: {} },
          { name: "National Certificate: N6 Financial Management", saqa_id: `TVET-${insertedInst.id}-FM6`, nqf_level: 5, min_aps: 18, required_subjects: {} },
          { name: "National Certificate: N6 Human Resource Management", saqa_id: `TVET-${insertedInst.id}-HRM6`, nqf_level: 5, min_aps: 18, required_subjects: {} }
        ];
      } else { // Private College
        coursesToInsert = [
          { name: "Diploma in Information Technology", saqa_id: `PRIV-${insertedInst.id}-DIT`, nqf_level: 6, min_aps: 22, required_subjects: { "Mathematics": 40 } },
          { name: "Diploma in Business Management", saqa_id: `PRIV-${insertedInst.id}-DBM`, nqf_level: 6, min_aps: 22, required_subjects: {} },
          { name: "Bachelor of Business Administration", saqa_id: `PRIV-${insertedInst.id}-BBA`, nqf_level: 7, min_aps: 24, required_subjects: {} },
          { name: "Higher Certificate in Software Development", saqa_id: `PRIV-${insertedInst.id}-HCSD`, nqf_level: 5, min_aps: 20, required_subjects: {} },
          { name: "Diploma in Public Relations", saqa_id: `PRIV-${insertedInst.id}-DPR`, nqf_level: 6, min_aps: 22, required_subjects: {} }
        ];
      }

      // Add institution relationship ID
      const coursesPayload = coursesToInsert.map(c => ({
        institution_id: insertedInst.id,
        name: c.name,
        saqa_id: c.saqa_id,
        nqf_level: c.nqf_level,
        min_aps: c.min_aps,
        required_subjects: c.required_subjects,
        accredited: true
      }));

      // 2. Upsert Courses
      const courseResponse = await fetch(`${supabaseUrl}/rest/v1/courses?on_conflict=saqa_id`, {
        method: 'POST',
        headers: {
          'apikey': supabaseAnonKey,
          'Authorization': `Bearer ${supabaseAnonKey}`,
          'Content-Type': 'application/json',
          'Prefer': 'resolution=merge-duplicates'
        },
        body: JSON.stringify(coursesPayload)
      });

      if (!courseResponse.ok) {
        const errText = await courseResponse.text();
        console.error(`  ✗ Failed to upload courses for ${insertedInst.name}:`, errText);
      } else {
        console.log(`  ✓ Seeded ${coursesPayload.length} courses for ${insertedInst.name}`);
      }

    } catch (e) {
      console.error(`Network Error while processing ${inst.name}:`, e.message);
    }
  }

  console.log("All institutions and courses successfully seeded to the cloud!");
}

seed().catch(err => {
  console.error("Fatal Seeding Error:", err);
});

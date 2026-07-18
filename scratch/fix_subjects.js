const fs = require('fs');

let content = fs.readFileSync('PathwayZA.jsx', 'utf8');

// Replace subjects in the file
const replacements = [
  { from: "(Grade 8 & 9)", to: "(Beginner)" },
  { from: "Social Sciences — History (Beginner)", to: "History (Beginner)" },
  { from: "Social Sciences — Geography (Beginner)", to: "Geography (Beginner)" },
  { from: "Arts & Culture — Visual Art (Beginner)", to: "Visual Arts (Beginner)" },
  { from: "Arts & Culture — Music (Beginner)", to: "Music (Beginner)" },
  { from: "Arts & Culture — Drama (Beginner)", to: "Drama (Beginner)" },
  { from: "Arts & Culture — Dance (Beginner)", to: "Dance (Beginner)" },
];

replacements.forEach(r => {
  // Global replace
  content = content.split(r.from).join(r.to);
});

// Now we need to replace the two Grade 7 and 8 & 9 groups in SUBJECT_GROUPS
const subjectGroupsStart = content.indexOf('const SUBJECT_GROUPS = {');
const languagesStart = content.indexOf('"Languages": [', subjectGroupsStart);

const newGroups = `"Beginner Subjects": [
    "English (Home Language)", "Afrikaans (First Additional Language)",
    "IsiZulu (Beginner)", "IsiXhosa (Beginner)",
    "Sesotho (Beginner)", "Setswana (Beginner)",
    "Mathematics (Beginner)", "Natural Sciences (Beginner)",
    "History (Beginner)", "Geography (Beginner)",
    "Technology (Beginner)", "Economic & Management Sciences (Beginner)",
    "Life Orientation (Beginner)", "Visual Arts (Beginner)",
    "Music (Beginner)", "Drama (Beginner)", "Dance (Beginner)",
    "Creative Arts (Beginner)"
  ],
  `;

content = content.substring(0, subjectGroupsStart + 'const SUBJECT_GROUPS = {\n'.length) +
          newGroups +
          content.substring(languagesStart);

fs.writeFileSync('PathwayZA.jsx', content);
console.log('Successfully updated PathwayZA.jsx');

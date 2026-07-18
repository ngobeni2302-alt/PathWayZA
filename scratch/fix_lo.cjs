const fs = require('fs');

let content = fs.readFileSync('PathwayZA.jsx', 'utf8');

// Replace all occurrences in careers arrays
content = content.split('"Life Orientation (Beginner)"').join('"Life Orientation"');

// Now, we need to add "Life Orientation" to "Humanities & Social Sciences" if it's not already there.
const humanitiesStr = `"Humanities & Social Sciences": [
    "Life Orientation","History","Geography","Religion Studies","Philosophy",
    "Sociology","Psychology","Political Studies","Development Studies",
  ],`;

const oldHumanitiesStr = `"Humanities & Social Sciences": [
    "History","Geography","Religion Studies","Philosophy",
    "Sociology","Psychology","Political Studies","Development Studies",
  ],`;

content = content.replace(oldHumanitiesStr, humanitiesStr);

fs.writeFileSync('PathwayZA.jsx', content);
console.log('Successfully updated PathwayZA.jsx');

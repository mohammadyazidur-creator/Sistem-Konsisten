import fs from 'fs';

const json = JSON.parse(fs.readFileSync('scripts/03___Tambah_jadwal.json', 'utf8'));

function dump(n, indent = '') {
  let extra = '';
  if (n.layoutMode) extra += ` layout=${n.layoutMode}`;
  if (n.itemSpacing) extra += ` gap=${n.itemSpacing}`;
  if (n.cornerRadius) extra += ` radius=${n.cornerRadius}`;
  if (n.characters) extra += ` text="${n.characters.replace(/\n/g, '\\n')}"`;
  console.log(`${indent}${n.name} (${n.type})${extra}`);
  if (n.children) {
    for (const c of n.children) dump(c, indent + '  ');
  }
}

// Find Tambah jadwal · Bottom sheet
function findSheet(n) {
  if (n.name && n.name.includes('Bottom sheet')) {
    dump(n);
    return;
  }
  if (n.children) n.children.forEach(findSheet);
}
findSheet(json);

import fs from 'fs';

function printTree(file) {
  const json = JSON.parse(fs.readFileSync('scripts/' + file, 'utf8'));
  console.log('==============================');
  console.log('FILE:', file, 'ID:', json.id);
  
  function recurse(n, indent = '') {
    let extra = '';
    if (n.layoutMode) extra += ` layout=${n.layoutMode}`;
    if (n.itemSpacing) extra += ` gap=${n.itemSpacing}`;
    if (n.cornerRadius) extra += ` radius=${n.cornerRadius}`;
    if (n.characters) extra += ` text="${n.characters.replace(/\n/g, '\\n')}"`;
    if (n.box) extra += ` [w:${Math.round(n.box.width)},h:${Math.round(n.box.height)}]`;
    
    console.log(`${indent}${n.name} (${n.type})${extra}`);
    if (n.children) {
      for (const c of n.children) {
        recurse(c, indent + '  ');
      }
    }
  }
  for (const c of json.children) {
    recurse(c);
  }
}

printTree('02___Jadwal.json');
printTree('04___Detail_jadwal.json');
printTree('05___Sesi.json');
printTree('06___Notifikasi.json');

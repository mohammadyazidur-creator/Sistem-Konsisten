const fs = require('fs');

function dumpTexts(file) {
  const data = JSON.parse(fs.readFileSync('scripts/' + file, 'utf8'));
  console.log('=== ' + file + ' ===');
  function walk(node, depth = 0) {
    if (node.name) {
      // print interesting frames
      if (node.type === 'FRAME' || node.type === 'INSTANCE' || node.type === 'COMPONENT') {
        // check if modal or sheet
        if (node.name.toLowerCase().includes('modal') || node.name.toLowerCase().includes('sheet') || node.name.toLowerCase().includes('dialog') || node.name.toLowerCase().includes('tambah') || node.name.toLowerCase().includes('form')) {
          console.log(' '.repeat(depth * 2) + `[FRAME] ${node.name} (id: ${node.id}) layout: ${node.layoutMode}`);
        }
      }
    }
    if (node.characters) {
      console.log(' '.repeat(depth * 2) + `"${node.characters.replace(/\n/g, '\\n')}" [${node.style ? node.style.fontSize : ''}px, w${node.style ? node.style.fontWeight : ''}]`);
    }
    if (node.children) {
      for (const c of node.children) walk(c, depth + 1);
    }
  }
  for (const c of data.children) walk(c, 0);
}

dumpTexts('03___Tambah_jadwal.json');
dumpTexts('04___Detail_jadwal.json');
dumpTexts('05___Sesi.json');
dumpTexts('06___Notifikasi.json');

const fs = require('fs');

const files = [
  '01___Dashboard.json',
  '02___Jadwal.json',
  '03___Tambah_jadwal.json',
  '04___Detail_jadwal.json',
  '05___Sesi.json',
  '06___Notifikasi.json',
  'Konsisten___Komponen.json'
];

for (const file of files) {
  const data = JSON.parse(fs.readFileSync('scripts/' + file, 'utf8'));
  console.log('====================================');
  console.log('FILE:', file);
  console.log('Screen:', data.name, 'Dimensions:', data.box);
  console.log('Bg:', JSON.stringify(data.backgroundColor));
  
  // Collect all text nodes
  const texts = [];
  function getTexts(node) {
    if (node.characters) {
      texts.push({
        text: node.characters,
        fontFamily: node.style ? node.style.fontFamily : '',
        fontWeight: node.style ? node.style.fontWeight : '',
        fontSize: node.style ? node.style.fontSize : '',
        color: node.fills ? node.fills[0] : null
      });
    }
    if (node.children) {
      for (const c of node.children) getTexts(c);
    }
  }
  for (const c of data.children) getTexts(c);
  console.log('Texts count:', texts.length);
  console.log('Sample texts:', texts.slice(0, 10).map(t => `${t.text} (${t.fontSize}px, w${t.fontWeight})`));
}

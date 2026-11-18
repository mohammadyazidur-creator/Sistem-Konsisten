const fs = require('fs');
const data = JSON.parse(fs.readFileSync('figma_test.json', 'utf8'));

const vectorNodes = [];
function findVectors(n) {
  if (n.name && (n.name.startsWith('Icon /') || n.name.startsWith('icon-') || n.type === 'VECTOR')) {
    vectorNodes.push({ id: n.id, name: n.name, type: n.type });
  }
  if (n.children) {
    for (const c of n.children) findVectors(c);
  }
}
findVectors(data.document);
console.log('Total vector/icon nodes found:', vectorNodes.length);
console.log('Sample vector nodes:', vectorNodes.slice(0, 30));

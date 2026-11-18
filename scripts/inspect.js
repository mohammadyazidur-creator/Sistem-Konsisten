const fs = require('fs');
const data = JSON.parse(fs.readFileSync('figma_test.json', 'utf8'));

function walk(node, depth = 0) {
  const indent = ' '.repeat(depth * 2);
  let info = indent + '- [' + node.type + '] ' + node.name + ' (id: ' + node.id + ')';
  if (node.type === 'TEXT') {
    info += ' -> text: "' + node.characters.replace(/\n/g, '\\n') + '"';
  }
  if (node.layoutMode) {
    info += ' [layout: ' + node.layoutMode + ']';
  }
  console.log(info);
  if (node.children && depth < 4) {
    for (const c of node.children) {
      walk(c, depth + 1);
    }
  }
}

const page = data.document.children[0];
console.log('Page:', page.name);
for (const child of page.children) {
  console.log('\n==============================');
  console.log('SCREEN:', child.name, child.id, JSON.stringify(child.absoluteBoundingBox));
  if (child.children) {
    for (const c of child.children) {
      walk(c, 1);
    }
  }
}

const fs = require('fs');
const data = JSON.parse(fs.readFileSync('figma_test.json', 'utf8'));

const page = data.document.children[0];

function describeScreen(node) {
  const result = {
    name: node.name,
    id: node.id,
    box: node.absoluteBoundingBox,
    backgroundColor: node.backgroundColor,
    children: []
  };

  function collect(n, arr) {
    const item = {
      name: n.name,
      type: n.type,
      id: n.id,
      layoutMode: n.layoutMode,
      padding: {
        top: n.paddingTop,
        bottom: n.paddingBottom,
        left: n.paddingLeft,
        right: n.paddingRight
      },
      itemSpacing: n.itemSpacing,
      primaryAxisAlignItems: n.primaryAxisAlignItems,
      counterAxisAlignItems: n.counterAxisAlignItems,
      fills: n.fills,
      strokes: n.strokes,
      strokeWeight: n.strokeWeight,
      cornerRadius: n.cornerRadius,
      rectangleCornerRadii: n.rectangleCornerRadii,
      characters: n.characters,
      style: n.style,
      box: n.absoluteBoundingBox
    };

    // Clean undefined
    for (const k of Object.keys(item)) {
      if (item[k] === undefined || (typeof item[k] === 'object' && item[k] !== null && Object.keys(item[k]).length === 0)) {
        delete item[k];
      }
    }

    if (n.children) {
      item.children = [];
      for (const c of n.children) {
        collect(c, item.children);
      }
    }
    arr.push(item);
  }

  if (node.children) {
    for (const c of node.children) {
      collect(c, result.children);
    }
  }

  return result;
}

for (const child of page.children) {
  const desc = describeScreen(child);
  const outName = child.name.replace(/[^a-zA-Z0-9]/g, '_') + '.json';
  fs.writeFileSync('scripts/' + outName, JSON.stringify(desc, null, 2));
  console.log('Wrote scripts/' + outName);
}

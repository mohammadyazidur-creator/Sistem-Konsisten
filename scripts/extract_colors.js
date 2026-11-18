import fs from 'fs';

const data = JSON.parse(fs.readFileSync('figma_test.json', 'utf8'));

function rgbToHex(c) {
  if (!c) return '';
  const r = Math.round(c.r * 255);
  const g = Math.round(c.g * 255);
  const b = Math.round(c.b * 255);
  return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('').toUpperCase();
}

const colors = new Set();
function getColors(n) {
  if (n.fills) {
    for (const f of n.fills) {
      if (f.type === 'SOLID' && f.color) {
        colors.add(rgbToHex(f.color));
      }
    }
  }
  if (n.strokes) {
    for (const s of n.strokes) {
      if (s.type === 'SOLID' && s.color) {
        colors.add(rgbToHex(s.color));
      }
    }
  }
  if (n.children) n.children.forEach(getColors);
}
getColors(data.document);
console.log('Unique colors found in Figma:', Array.from(colors));

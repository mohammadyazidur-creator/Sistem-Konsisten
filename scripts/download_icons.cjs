const fs = require('fs');
const https = require('https');
const path = require('path');

const FIGMA_TOKEN = process.env.FIGMA_TOKEN;
if (!FIGMA_TOKEN) {
  console.error('Error: Environment variable FIGMA_TOKEN belum diatur.');
  console.error('Silakan set di terminal terlebih dahulu:');
  console.error('  PowerShell: $env:FIGMA_TOKEN="token_anda"');
  console.error('  CMD       : set FIGMA_TOKEN=token_anda');
  process.exit(1);
}

const FILE_KEY = '3Z8aj18BHH57C80wi1yQnI';

const data = JSON.parse(fs.readFileSync('figma_test.json', 'utf8'));

// Find one node ID for each unique icon name
const iconMap = {};
function findIcons(n) {
  if (n.name && n.name.startsWith('Icon /')) {
    if (!iconMap[n.name]) {
      iconMap[n.name] = n.id;
    }
  }
  if (n.children) n.children.forEach(findIcons);
}
findIcons(data.document);

console.log('Icon mapping:', iconMap);

const ids = Object.values(iconMap).join(',');
const options = {
  hostname: 'api.figma.com',
  path: `/v1/images/${FILE_KEY}?ids=${encodeURIComponent(ids)}&format=svg`,
  headers: {
    'X-Figma-Token': FIGMA_TOKEN
  }
};

const req = https.get(options, (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => {
    let json;
    try {
      json = JSON.parse(body);
    } catch (e) {
      console.error('Error: Gagal mem-parse response JSON dari Figma API:', e.message);
      console.error('Response raw:', body);
      return;
    }

    if (res.statusCode !== 200 || json.err) {
      console.error(`Figma API error (Status ${res.statusCode}):`, json.err || json);
      return;
    }

    console.log('SVG URLs:', json);
    const svgDir = path.join(process.cwd(), 'src', 'assets', 'icons');
    if (!fs.existsSync(svgDir)) fs.mkdirSync(svgDir, { recursive: true });

    const revMap = {};
    for (const [name, id] of Object.entries(iconMap)) {
      revMap[id] = name.replace('Icon / ', '').trim();
    }

    if (json.images) {
      for (const [id, url] of Object.entries(json.images)) {
        if (!url) continue;
        const iconName = revMap[id] || id;
        const filePath = path.join(svgDir, `${iconName}.svg`);
        const fileStream = fs.createWriteStream(filePath);
        https.get(url, (svgRes) => {
          svgRes.pipe(fileStream);
          fileStream.on('finish', () => {
            fileStream.close();
            console.log(`Saved ${iconName}.svg`);
          });
        }).on('error', (err) => {
          console.error(`Gagal mengunduh ikon ${iconName}:`, err.message);
        });
      }
    }
  });
});
req.on('error', (e) => console.error('Request error:', e.message));

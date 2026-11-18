import fs from 'fs';
import path from 'path';

const iconDir = path.join(process.cwd(), 'src', 'assets', 'icons');
const files = fs.readdirSync(iconDir).filter(f => f.endsWith('.svg'));

let output = `import React from 'react';\n\n`;

for (const file of files) {
  const name = path.basename(file, '.svg');
  const compName = 'Icon' + name.charAt(0).toUpperCase() + name.slice(1);
  let svgContent = fs.readFileSync(path.join(iconDir, file), 'utf8');

  // Extract default stroke from original SVG if any
  const strokeMatch = svgContent.match(/stroke="([^"]+)"/);
  const defaultStroke = strokeMatch ? strokeMatch[1] : 'currentColor';

  const match = svgContent.match(/<svg[^>]*>([\s\S]*?)<\/svg>/);
  if (!match) continue;

  let inner = match[1]
    .replace(/stroke-width/g, 'strokeWidth')
    .replace(/stroke-linecap/g, 'strokeLinecap')
    .replace(/stroke-linejoin/g, 'strokeLinejoin')
    .replace(/fill-rule/g, 'fillRule')
    .replace(/clip-rule/g, 'clipRule')
    .replace(/stroke="[^"]+"/g, `stroke={color || "${defaultStroke}"}`);

  const vbMatch = svgContent.match(/viewBox="([^"]+)"/);
  const viewBox = vbMatch ? vbMatch[1] : '0 0 24 24';

  output += `export const ${compName} = ({ className = "w-5 h-5", size, color, ...props }) => {
  return (
    <svg
      viewBox="${viewBox}"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ width: size, height: size, ...props.style }}
      {...props}
    >
      ${inner.trim()}
    </svg>
  );
};\n\n`;
}

// Add Status Bar Indicators
output += `export const StatusBarIndicators = ({ className = "w-16 h-3 text-current" }) => (
  <div className={"flex items-center gap-1.5 " + className}>
    {/* Cellular */}
    <svg className="w-4 h-3" viewBox="0 0 17 11" fill="currentColor">
      <rect x="0" y="8" width="3" height="3" rx="0.5"/>
      <rect x="4.5" y="5.5" width="3" height="5.5" rx="0.5"/>
      <rect x="9" y="3" width="3" height="8" rx="0.5"/>
      <rect x="13.5" y="0.5" width="3" height="10.5" rx="0.5"/>
    </svg>
    {/* Wifi */}
    <svg className="w-4 h-3" viewBox="0 0 16 12" fill="currentColor">
      <path d="M8 10.5C8.41421 10.5 8.75 10.1642 8.75 9.75C8.75 9.33579 8.41421 9 8 9C7.58579 9 7.25 9.33579 7.25 9.75C7.25 10.1642 7.58579 10.5 8 10.5Z"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M3.75736 5.50736C6.10051 3.16421 9.89949 3.16421 12.2426 5.50736L13.3033 4.4467C10.3744 1.51777 5.62563 1.51777 2.6967 4.4467L3.75736 5.50736Z"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M5.87868 7.62868C7.05025 6.45711 8.94975 6.45711 10.1213 7.62868L11.182 6.56802C9.42462 4.81066 6.57538 4.81066 4.81802 6.56802L5.87868 7.62868Z"/>
    </svg>
    {/* Battery */}
    <svg className="w-6 h-3" viewBox="0 0 25 12" fill="none">
      <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke="currentColor"/>
      <rect x="2" y="2" width="14" height="8" rx="2" fill="currentColor"/>
      <path d="M23 4V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  </div>
);\n`;

fs.writeFileSync('src/components/Icons.jsx', output);
console.log('Regenerated src/components/Icons.jsx');

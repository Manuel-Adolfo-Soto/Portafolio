import sharp from 'sharp';

const width = 1200;
const height = 630;

const svg = `
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#020618"/>
      <stop offset="100%" style="stop-color:#0f172a"/>
    </linearGradient>
    <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#06b6d4"/>
      <stop offset="100%" style="stop-color:#8b5cf6"/>
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#bg)"/>
  <circle cx="100" cy="500" r="300" fill="#06b6d4" opacity="0.04"/>
  <circle cx="1100" cy="100" r="250" fill="#8b5cf6" opacity="0.04"/>
  <rect x="60" y="60" width="1080" height="510" rx="16" fill="none" stroke="#06b6d4" stroke-opacity="0.1" stroke-width="1"/>
  <text x="80" y="240" font-family="system-ui, sans-serif" font-size="56" font-weight="800" fill="#ffffff">Manuel Adolfo</text>
  <text x="80" y="310" font-family="system-ui, sans-serif" font-size="56" font-weight="800" fill="url(#accent)">Soto</text>
  <text x="80" y="370" font-family="monospace, sans-serif" font-size="22" fill="#64748b">&gt; Practicante de Desarrollo Web Full Stack</text>
  <line x1="80" y1="400" x2="400" y2="400" stroke="url(#accent)" stroke-width="3" stroke-linecap="round"/>
  <text x="80" y="445" font-family="system-ui, sans-serif" font-size="18" fill="#475569">khiomaru.vercel.app</text>
  <rect x="80" y="470" width="120" height="40" rx="20" fill="#06b6d4" fill-opacity="0.1" stroke="#06b6d4" stroke-opacity="0.3" stroke-width="1"/>
  <text x="140" y="496" font-family="system-ui, sans-serif" font-size="14" fill="#06b6d4" text-anchor="middle">Portafolio</text>
</svg>`;

const outputPath = 'public/og-image.png';
await sharp(Buffer.from(svg)).resize(width, height).png().toFile(outputPath);
console.log(`OG image saved: ${outputPath}`);

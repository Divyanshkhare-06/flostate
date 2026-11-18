import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const svgBuffer = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512" fill="none">
  <rect width="512" height="512" rx="112" fill="#171A2E"/>
  <circle cx="256" cy="256" r="160" fill="#A99BFF" fill-opacity="0.18"/>
  <circle cx="256" cy="256" r="110" fill="#A99BFF" fill-opacity="0.3"/>
  <path d="M256 110C256 110 186 200 186 266C186 304.66 217.34 336 256 336C294.66 336 326 304.66 326 266C326 200 256 110 256 110Z" fill="#A99BFF"/>
  <circle cx="256" cy="266" r="42" fill="#B8E6D0"/>
  <path d="M140 310C175 310 210 275 256 275C302 275 337 310 372 310" stroke="#EAE6FF" stroke-width="22" stroke-linecap="round"/>
</svg>
`);

const maskableSvgBuffer = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512" fill="none">
  <rect width="512" height="512" fill="#171A2E"/>
  <circle cx="256" cy="256" r="140" fill="#A99BFF" fill-opacity="0.18"/>
  <circle cx="256" cy="256" r="95" fill="#A99BFF" fill-opacity="0.3"/>
  <path d="M256 128C256 128 194 206 194 266C194 300 222 328 256 328C290 328 318 300 318 266C318 206 256 128 256 128Z" fill="#A99BFF"/>
  <circle cx="256" cy="266" r="36" fill="#B8E6D0"/>
  <path d="M156 305C186 305 216 275 256 275C296 275 326 305 356 305" stroke="#EAE6FF" stroke-width="18" stroke-linecap="round"/>
</svg>
`);

async function generate() {
  const publicDir = path.resolve('public');

  // 192x192
  await sharp(svgBuffer)
    .resize(192, 192)
    .png()
    .toFile(path.join(publicDir, 'pwa-192x192.png'));
  console.log('Created pwa-192x192.png');

  // 512x512
  await sharp(svgBuffer)
    .resize(512, 512)
    .png()
    .toFile(path.join(publicDir, 'pwa-512x512.png'));
  console.log('Created pwa-512x512.png');

  // apple-touch-icon (180x180)
  await sharp(svgBuffer)
    .resize(180, 180)
    .png()
    .toFile(path.join(publicDir, 'apple-touch-icon.png'));
  console.log('Created apple-touch-icon.png');

  // maskable 512x512
  await sharp(maskableSvgBuffer)
    .resize(512, 512)
    .png()
    .toFile(path.join(publicDir, 'maskable-icon-512x512.png'));
  console.log('Created maskable-icon-512x512.png');
}

generate().catch(err => {
  console.error('Error generating icons:', err);
  process.exit(1);
});

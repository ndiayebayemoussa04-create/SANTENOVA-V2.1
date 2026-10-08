const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');

async function generateQRCodes() {
  const targetUrl = 'https://ais-pre-iltzrfgixn3ekmsn36cnnh-926860827443.europe-west2.run.app/?tab=patient-app';
  const publicDir = path.join(__dirname, '..', 'public');

  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // 1. Generate high-resolution PNG
  const pngPath = path.join(publicDir, 'qr_patient_app.png');
  await QRCode.toFile(pngPath, targetUrl, {
    width: 600,
    margin: 2,
    color: {
      dark: '#0f172a', // Deep slate for crisp scanning
      light: '#ffffff',
    },
    errorCorrectionLevel: 'H',
  });
  console.log('Generated PNG QR Code:', pngPath);

  // 2. Generate vector SVG
  const svgPath = path.join(publicDir, 'qr_patient_app.svg');
  const svgString = await QRCode.toString(targetUrl, {
    type: 'svg',
    margin: 2,
    color: {
      dark: '#0d9488', // Teal
      light: '#ffffff',
    },
    errorCorrectionLevel: 'H',
  });
  fs.writeFileSync(svgPath, svgString);
  console.log('Generated SVG QR Code:', svgPath);

  // 3. Generate DataURL for embedded use
  const dataUrl = await QRCode.toDataURL(targetUrl, {
    width: 400,
    margin: 2,
    errorCorrectionLevel: 'H',
  });

  const exportPath = path.join(__dirname, '..', 'src', 'data', 'qrCodeData.ts');
  const content = `// Auto-generated QR code data for SantéNova Patient App
export const PATIENT_APP_DEMO_URL = ${JSON.stringify(targetUrl)};
export const PATIENT_APP_QR_DATA_URL = ${JSON.stringify(dataUrl)};
`;
  fs.writeFileSync(exportPath, content);
  console.log('Generated TypeScript data file:', exportPath);
}

generateQRCodes().catch(err => {
  console.error('Error generating QR codes:', err);
  process.exit(1);
});

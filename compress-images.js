const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');

// Images to compress (skip backup files)
const images = fs.readdirSync(publicDir).filter(f => 
  (f.endsWith('.png') || f.endsWith('.jpg')) &&
  !f.endsWith('_bak.png') &&
  !f.endsWith('_char.png') &&
  !f.includes('logo')
);

async function compressImage(filename) {
  const inputPath = path.join(publicDir, filename);
  const outputName = filename.replace(/\.(png|jpg)$/, '.webp');
  const outputPath = path.join(publicDir, outputName);
  
  const inputStat = fs.statSync(inputPath);
  const inputSizeMB = (inputStat.size / 1024 / 1024).toFixed(2);
  
  // Use different quality based on file type
  const isGameImage = filename.startsWith('game_');
  const quality = isGameImage ? 75 : 80;
  const width = isGameImage ? 800 : 600;

  try {
    await sharp(inputPath)
      .resize(width, null, { withoutEnlargement: true })
      .webp({ quality })
      .toFile(outputPath);
    
    const outputStat = fs.statSync(outputPath);
    const outputSizeMB = (outputStat.size / 1024 / 1024).toFixed(2);
    const saving = (((inputStat.size - outputStat.size) / inputStat.size) * 100).toFixed(0);
    
    console.log(`✅ ${filename}: ${inputSizeMB}MB → ${outputSizeMB}MB (${saving}% smaller)`);
  } catch (err) {
    console.error(`❌ Failed ${filename}:`, err.message);
  }
}

async function run() {
  console.log(`\n🖼️  Compressing ${images.length} images to WebP...\n`);
  for (const img of images) {
    await compressImage(img);
  }
  console.log('\n✨ Done! Update your component imports to use .webp files.');
}

run();

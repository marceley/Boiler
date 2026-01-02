import sharp from "sharp";
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const OG_WIDTH = 1200;
const OG_HEIGHT = 630;
const BACKGROUND_COLOR = "#f5f5f5"; // Match site background

async function generateOGImage() {
  try {
    // Load the logo
    const logoPath = join(__dirname, "../public/logo.png");
    const logo = sharp(logoPath);
    const logoMetadata = await logo.metadata();

    // Calculate logo size (max 600px width to fit nicely)
    const maxLogoWidth = 600;
    const maxLogoHeight = 400;
    let logoWidth = logoMetadata.width;
    let logoHeight = logoMetadata.height;

    // Scale down if needed while maintaining aspect ratio
    if (logoWidth > maxLogoWidth) {
      const scale = maxLogoWidth / logoWidth;
      logoWidth = maxLogoWidth;
      logoHeight = Math.round(logoHeight * scale);
    }
    if (logoHeight > maxLogoHeight) {
      const scale = maxLogoHeight / logoHeight;
      logoHeight = maxLogoHeight;
      logoWidth = Math.round(logoWidth * scale);
    }

    // Resize logo
    const resizedLogo = await logo
      .resize(logoWidth, logoHeight, {
        fit: "inside",
        withoutEnlargement: true,
      })
      .toBuffer();

    // Calculate position to center the logo
    const x = Math.round((OG_WIDTH - logoWidth) / 2);
    const y = Math.round((OG_HEIGHT - logoHeight) / 2);

    // Create the OG image
    const ogImage = await sharp({
      create: {
        width: OG_WIDTH,
        height: OG_HEIGHT,
        channels: 3,
        background: BACKGROUND_COLOR,
      },
    })
      .composite([
        {
          input: resizedLogo,
          left: x,
          top: y,
        },
      ])
      .png()
      .toFile(join(__dirname, "../public/og-image.png"));

    console.log("✅ OG image generated successfully at public/og-image.png");
    console.log(`   Logo size: ${logoWidth}x${logoHeight}px`);
    console.log(`   Position: centered at (${x}, ${y})`);
  } catch (error) {
    console.error("❌ Error generating OG image:", error.message);
    process.exit(1);
  }
}

generateOGImage();

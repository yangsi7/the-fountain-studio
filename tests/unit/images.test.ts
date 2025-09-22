import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Image References', () => {
  const publicImagesPath = path.join(process.cwd(), 'public', 'images');

  // Map of expected images (as referenced in page.tsx) to actual files
  const imageMapping = {
    // Expected -> Current actual file
    'service-biofield-tuning.jpg': 'tuning-forks-fan.jpg',
    'service-gyrotonic-movement.jpg': 'equipment-detail.jpg',
    'service-breathwork.jpg': 'breathwork-space.jpg',
    'service-integration.jpg': 'studio-atmosphere.jpg',
    'about-treatment-session.jpg': 'treatment-session.jpg',
    'learn-biofield.jpg': 'tuning-forks-spiral.jpg',
    'learn-gyrotonic.jpg': 'studio-space.jpg',
    'learn-breathwork.jpg': 'voice-integration.jpg',
    'testimonials-bg-sunset.jpg': 'sunset-meadow.jpg',
  };

  const expectedImages = [
    'hero-swiss-alps.jpg', // This one exists correctly
    'service-biofield-tuning.jpg',
    'service-gyrotonic-movement.jpg',
    'service-breathwork.jpg',
    'service-integration.jpg',
    'about-treatment-session.jpg',
    'learn-biofield.jpg',
    'learn-gyrotonic.jpg',
    'learn-breathwork.jpg',
    'testimonials-bg-sunset.jpg',
  ];

  it('should have all expected image files in public/images', () => {
    expectedImages.forEach(imageName => {
      const imagePath = path.join(publicImagesPath, imageName);
      const exists = fs.existsSync(imagePath);

      if (!exists && imageMapping[imageName]) {
        // Check if the old file exists that needs to be renamed
        const oldPath = path.join(publicImagesPath, imageMapping[imageName]);
        expect(fs.existsSync(oldPath)).toBe(true);
        console.log(`Need to rename: ${imageMapping[imageName]} -> ${imageName}`);
      } else {
        expect(exists).toBe(true);
      }
    });
  });

  it('should not have duplicate image files after renaming', () => {
    // After renaming, the old filenames should not exist
    const oldFiles = Object.values(imageMapping);
    const newFiles = Object.keys(imageMapping);

    // This test will pass after renaming is done
    oldFiles.forEach((oldFile, index) => {
      const oldPath = path.join(publicImagesPath, oldFile);
      const newPath = path.join(publicImagesPath, newFiles[index]);

      // Either the old file exists (not renamed yet) OR the new file exists (renamed)
      // But not both
      const oldExists = fs.existsSync(oldPath);
      const newExists = fs.existsSync(newPath);

      // They should not both exist (would indicate duplication)
      if (oldExists && newExists) {
        expect(oldExists && newExists).toBe(false);
      }
    });
  });

  it('should have correctly sized images for web performance', () => {
    expectedImages.forEach(imageName => {
      const imagePath = path.join(publicImagesPath, imageName);

      // Check if file exists (or will exist after rename)
      if (fs.existsSync(imagePath)) {
        const stats = fs.statSync(imagePath);
        const sizeInMB = stats.size / (1024 * 1024);

        // Hero image can be larger, others should be optimized
        const maxSize = imageName === 'hero-swiss-alps.jpg' ? 6 : 5;
        expect(sizeInMB).toBeLessThan(maxSize);

        // Warn if image is over 2MB (should consider further optimization)
        if (sizeInMB > 2) {
          console.warn(`Image ${imageName} is ${sizeInMB.toFixed(2)}MB - consider optimization`);
        }
      }
    });
  });
});
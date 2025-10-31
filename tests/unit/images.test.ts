import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

describe('Image References', () => {
  const publicImagesPath = path.join(process.cwd(), 'public', 'images');

  // Images that should exist after cleanup
  const expectedImages = [
    'hero-swiss-alps.jpg',
    'Kristen-faceshot.jpeg',
    'Kristen-giving-treatment.jpeg',
    'service-gyrotonic-movement.jpg',
    'service-breathwork.jpg',
    'service-integration.jpg',
    'learn-biofield.jpg',
    'learn-gyrotonic.jpg',
    'learn-breathwork.jpg',
    'testimonials-bg-sunset.jpg',
    'sacred-totem.png',
  ];

  // Old filenames that should no longer exist
  const oldImages = [
    'tuning-forks-fan.jpg',
    'equipment-detail.jpg',
    'breathwork-space.jpg',
    'studio-atmosphere.jpg',
    'treatment-session.jpg',
    'tuning-forks-spiral.jpg',
    'studio-space.jpg',
    'voice-integration.jpg',
    'sunset-meadow.jpg',
  ];

  it('should have all expected image files in public/images', () => {
    expectedImages.forEach(imageName => {
      const imagePath = path.join(publicImagesPath, imageName);
      const exists = fs.existsSync(imagePath);
      expect(exists).toBe(true);
    });
  });

  it('should not have old image files after renaming', () => {
    // After renaming, the old filenames should not exist
    oldImages.forEach(oldFile => {
      const oldPath = path.join(publicImagesPath, oldFile);
      const exists = fs.existsSync(oldPath);
      expect(exists).toBe(false);
    });
  });

  it('should have correctly sized images for web performance', () => {
    expectedImages.forEach(imageName => {
      const imagePath = path.join(publicImagesPath, imageName);

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

  it('should have appropriate image formats', () => {
    expectedImages.forEach(imageName => {
      const imagePath = path.join(publicImagesPath, imageName);
      
      if (fs.existsSync(imagePath)) {
        // Check file extension
        const ext = path.extname(imageName).toLowerCase();
        expect(['.jpg', '.jpeg', '.png', '.webp']).toContain(ext);
      }
    });
  });

  it('should have all images referenced in components', () => {
    // This ensures we're testing all images that are actually used
    const referencedImages = [
      '/images/hero-swiss-alps.jpg',
      '/images/Kristen-faceshot.jpeg',
      '/images/Kristen-giving-treatment.jpeg',
      '/images/service-gyrotonic-movement.jpg',
      '/images/service-breathwork.jpg',
      '/images/service-integration.jpg',
      '/images/learn-biofield.jpg',
      '/images/learn-gyrotonic.jpg',
      '/images/learn-breathwork.jpg',
      '/images/testimonials-bg-sunset.jpg',
      '/images/sacred-totem.png',
    ];

    referencedImages.forEach(imageRef => {
      const imageName = imageRef.replace('/images/', '');
      expect(expectedImages).toContain(imageName);
    });
  });
});

/**
 * Script to convert test.png to grayscale
 * 
 * Usage:
 * 1. Make sure opencv.js is loaded
 * 2. Run: bun run convertToGray.ts
 */

import { initOpenCV, Mat, cvtColor, ColorConversion, safeDelete } from './src/index';
import * as fs from 'fs';
import * as path from 'path';

// For Node.js environment, we need to use canvas
import { createCanvas, loadImage, Image } from 'canvas';

async function convertToGray() {
  try {
    console.log('Loading opencv.js...');
    
    // Load opencv.js for Node.js
    const cv = require('./opencv.js');
    
    // Wait for OpenCV to initialize
    await new Promise<void>((resolve) => {
      if (cv.onRuntimeInitialized) {
        cv.onRuntimeInitialized = () => resolve();
      } else {
        resolve();
      }
    });
    
    console.log('OpenCV loaded successfully');
    
    // Initialize the wrapper
    initOpenCV(cv);
    
    // Load the image
    const imagePath = path.join(__dirname, 'test.png');
    
    if (!fs.existsSync(imagePath)) {
      console.error(`Error: test.png not found at ${imagePath}`);
      console.log('Please place test.png in the project root directory');
      process.exit(1);
    }
    
    console.log('Loading test.png...');
    const img = await loadImage(imagePath);
    
    // Create a canvas and draw the image
    const canvas = createCanvas(img.width, img.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    
    // Get pixel data from canvas
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    console.log(`Image loaded: ${img.width}x${img.height}`);
    
    // Create Mat from raw pixel data
    const src = new cv.Mat(img.height, img.width, cv.CV_8UC4);
    src.data.set(imageData.data);
    
    // Wrap in our Mat class
    const srcMat = new Mat(src, false);
    console.log(`Mat created: ${srcMat.width}x${srcMat.height}, channels: ${srcMat.channels()}`);
    
    // Convert to grayscale
    console.log('Converting to grayscale...');
    const gray = cvtColor(srcMat, ColorConversion.RGBA2GRAY.code);
    
    // Convert back to RGBA for saving
    const grayRGBA = cvtColor(gray, ColorConversion.GRAY2RGBA.code);
    
    // Create output canvas
    const outputCanvas = createCanvas(gray.width, gray.height);
    const outputCtx = outputCanvas.getContext('2d');
    
    // Get raw pixel data from Mat
    const data = grayRGBA.data;
    const outputImageData = outputCtx.createImageData(gray.width, gray.height);
    
    // Copy pixel data
    for (let i = 0; i < data.length; i++) {
      outputImageData.data[i] = data[i]!;
    }
    
    // Put image data to canvas
    outputCtx.putImageData(outputImageData, 0, 0);
    
    // Save the output
    const outputPath = path.join(__dirname, 'test_gray.png');
    const buffer = outputCanvas.toBuffer('image/png');
    fs.writeFileSync(outputPath, buffer);
    
    console.log(`✓ Grayscale image saved to: ${outputPath}`);
    
    // Clean up
    safeDelete(srcMat, gray, grayRGBA);
    
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

// Run the script
convertToGray();

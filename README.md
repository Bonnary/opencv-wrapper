# OpenCV TypeScript Wrapper

A comprehensive, type-safe TypeScript wrapper around opencv.js WebAssembly for use in React and web applications.

## Features

- ✅ **Full Type Safety**: Complete TypeScript definitions for opencv.js
- 🎯 **Clean API**: Intuitive, object-oriented interface
- 🧩 **Modular Design**: Organized by functionality (core, image processing, object detection, video)
- 🗑️ **Memory Management**: Easy cleanup with `delete()` and `safeDelete()`
- ⚛️ **React Ready**: Perfect for React projects
- 📦 **Tree-shakeable**: Import only what you need

## Installation

```bash
npm install opencv-wrapper
# or
yarn add opencv-wrapper
# or
pnpm add opencv-wrapper
```

You'll also need to include opencv.js in your project. You can:

- Download from [OpenCV.js releases](https://docs.opencv.org/4.x/d4/da1/tutorial_js_setup.html)
- Use a CDN: `<script src="https://docs.opencv.org/4.x/opencv.js"></script>`

## Quick Start

```typescript
import {
  initOpenCV,
  Mat,
  cvtColor,
  ColorConversion,
  gaussianBlur,
  threshold,
  Threshold,
} from "opencv-wrapper";

// 1. Initialize OpenCV (after opencv.js loads)
declare const cv: any;
initOpenCV(cv);

// 2. Load and process an image
const img = Mat.fromImage(
  document.getElementById("myImage") as HTMLImageElement,
);

// 3. Convert to grayscale
const gray = cvtColor(img, ColorConversion.RGB2GRAY.code);

// 4. Apply Gaussian blur
const blurred = gaussianBlur(gray, {
  ksize: { width: 5, height: 5 },
  sigmaX: 1.5,
});

// 5. Apply threshold
const binary = threshold(blurred, {
  thresh: 127,
  maxval: 255,
  type: Threshold.BINARY.type,
});

// 6. Display result
binary.imshow("outputCanvas");

// 7. Clean up memory
img.delete();
gray.delete();
blurred.delete();
binary.delete();
```

## React Example

```tsx
import React, { useEffect, useRef, useState } from "react";
import {
  initOpenCV,
  Mat,
  cvtColor,
  ColorConversion,
  canny,
  isOpenCVReady,
} from "opencv-wrapper";

function ImageProcessor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Wait for OpenCV to load
    if (window.cv) {
      initOpenCV(window.cv);
      setReady(true);
    } else {
      window.cv = {
        onRuntimeInitialized: () => {
          initOpenCV(window.cv);
          setReady(true);
        },
      };
    }
  }, []);

  const processImage = (imageElement: HTMLImageElement) => {
    if (!ready || !canvasRef.current) return;

    // Load image
    const src = Mat.fromImage(imageElement);

    // Convert to grayscale
    const gray = cvtColor(src, ColorConversion.RGB2GRAY.code);

    // Apply Canny edge detection
    const edges = canny(gray, {
      threshold1: 50,
      threshold2: 150,
    });

    // Display
    edges.imshow(canvasRef.current);

    // Cleanup
    src.delete();
    gray.delete();
    edges.delete();
  };

  return (
    <div>
      <canvas ref={canvasRef} />
      {ready ? "OpenCV Ready!" : "Loading OpenCV..."}
    </div>
  );
}

export default ImageProcessor;
```

## API Documentation

### Core

#### `Mat` Class

Main class for working with images and matrices.

```typescript
// Create from image
const mat = Mat.fromImage(imageElement);

// Create from ImageData
const mat = Mat.fromImageData(imageData);

// Create empty
const mat = Mat.empty();

// Create with specific size and type
const mat = Mat.create(480, 640, cv.CV_8UC3);

// Properties
mat.rows; // Height
mat.cols; // Width
mat.width; // Alias for cols
mat.height; // Alias for rows
mat.channels(); // Number of channels
mat.type(); // Data type

// Methods
mat.clone(); // Clone the matrix
mat.copyTo(dst); // Copy to another matrix
mat.isEmpty(); // Check if empty
mat.imshow(canvas); // Display on canvas
mat.delete(); // Free memory
```

### Image Processing

Full documentation available for:

- Color conversion
- Resizing and scaling
- Blurring (Gaussian, Median, Bilateral)
- Edge detection (Canny)
- Thresholding
- Morphological operations
- Contour detection
- Drawing functions
- Object detection
- Video processing

See the inline TypeScript documentation for detailed method signatures and options.

## Memory Management

OpenCV.js requires manual memory management. Always delete Mat objects when done:

```typescript
// Option 1: Manual deletion
const mat = Mat.fromImage(img);
// ... use mat ...
mat.delete();

// Option 2: Use safeDelete utility
import { safeDelete } from "opencv-wrapper";
const mat1 = Mat.empty();
const mat2 = Mat.empty();
// ... use mats ...
safeDelete(mat1, mat2); // Safely deletes multiple objects

// Option 3: Try-finally pattern
const mat = Mat.fromImage(img);
try {
  // ... process mat ...
} finally {
  mat.delete();
}
```

## Project Structure

```
src/
├── core/
│   ├── Mat.ts           # Mat wrapper class
│   ├── types.ts         # Core type definitions
│   ├── utils.ts         # Utility functions
│   └── constants.ts     # OpenCV constants
├── imgproc/
│   ├── imageProcessing.ts  # Image processing functions
│   ├── drawing.ts          # Drawing functions
│   └── contours.ts         # Contour detection
├── objdetect/
│   └── objectDetection.ts  # Object detection
├── video/
│   └── videoCapture.ts     # Video processing
├── types/
│   └── opencv.d.ts         # OpenCV type definitions
└── index.ts                # Main exports
```

## Development

```bash
# Install dependencies
npm install

# Build the library
npm run build

# Development mode (watch)
npm run dev
```

## License

MIT

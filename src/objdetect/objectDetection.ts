/**
 * Object detection utilities
 */

import { Mat } from '../core/Mat';
import { getCV, createSize, safeDelete } from '../core/utils';
import type { MatVector, CascadeClassifier as CVCascadeClassifier } from '../types/opencv.d';

export interface DetectionOptions {
  scaleFactor?: number;
  minNeighbors?: number;
  minSize?: { width: number; height: number };
  maxSize?: { width: number; height: number };
}

export interface Detection {
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * Cascade Classifier wrapper for object detection
 */
export class CascadeClassifier {
  private classifier: CVCascadeClassifier;

  constructor() {
    const cv = getCV();
    this.classifier = new cv.CascadeClassifier();
  }

  /**
   * Load classifier from file
   */
  load(filename: string): boolean {
    return this.classifier.load(filename);
  }

  /**
   * Detect objects in image
   */
  detectMultiScale(
    image: Mat,
    options?: DetectionOptions
  ): Detection[] {
    const cv = getCV();
    const objects = new cv.MatVector();
    
    const minSize = options?.minSize
      ? createSize(options.minSize.width, options.minSize.height)
      : undefined;
    
    const maxSize = options?.maxSize
      ? createSize(options.maxSize.width, options.maxSize.height)
      : undefined;
    
    this.classifier.detectMultiScale(
      image.getMat(),
      objects,
      options?.scaleFactor ?? 1.1,
      options?.minNeighbors ?? 3,
      0,
      minSize,
      maxSize
    );
    
    const detections: Detection[] = [];
    for (let i = 0; i < objects.size(); i++) {
      const rect = objects.get(i) as any;
      detections.push({
        x: rect.x,
        y: rect.y,
        width: rect.width,
        height: rect.height,
      });
    }
    
    safeDelete(objects);
    return detections;
  }

  /**
   * Delete the classifier
   */
  delete(): void {
    safeDelete(this.classifier);
  }
}

/**
 * ORB feature detector wrapper
 */
export class ORBDetector {
  private orb: any;

  constructor(nfeatures?: number) {
    const cv = getCV();
    this.orb = cv.ORB.create(nfeatures ?? 500);
  }

  /**
   * Detect keypoints in image
   */
  detect(image: Mat): MatVector {
    const cv = getCV();
    const keypoints = new cv.MatVector();
    this.orb.detect(image.getMat(), keypoints);
    return keypoints;
  }

  /**
   * Compute descriptors for keypoints
   */
  compute(image: Mat, keypoints: MatVector): Mat {
    const descriptors = Mat.empty();
    this.orb.compute(image.getMat(), keypoints, descriptors.getMat());
    return descriptors;
  }

  /**
   * Detect and compute keypoints and descriptors
   */
  detectAndCompute(image: Mat): { keypoints: MatVector; descriptors: Mat } {
    const cv = getCV();
    const keypoints = new cv.MatVector();
    const descriptors = Mat.empty();
    const mask = Mat.empty();
    
    this.orb.detectAndCompute(
      image.getMat(),
      mask.getMat(),
      keypoints,
      descriptors.getMat()
    );
    
    safeDelete(mask);
    
    return { keypoints, descriptors };
  }

  /**
   * Delete the detector
   */
  delete(): void {
    safeDelete(this.orb);
  }
}

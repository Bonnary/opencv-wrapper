/**
 * Core utility functions and constants
 */

import type { OpenCVModule } from '../types/opencv.d';
import type { Color } from './types';

let cvInstance: OpenCVModule | null = null;

/**
 * Initialize the OpenCV module
 */
export function initOpenCV(cv: OpenCVModule): void {
  cvInstance = cv;
}

/**
 * Get the OpenCV module instance
 */
export function getCV(): OpenCVModule {
  if (!cvInstance) {
    throw new Error(
      'OpenCV module not initialized. Call initOpenCV(cv) first.'
    );
  }
  return cvInstance;
}

/**
 * Check if OpenCV is initialized
 */
export function isOpenCVReady(): boolean {
  return cvInstance !== null;
}

/**
 * Convert a color array to OpenCV Scalar
 */
export function toScalar(color: Color): any {
  const cv = getCV();
  
  if (Array.isArray(color)) {
    const [v0, v1, v2, v3] = color;
    return new cv.Scalar(v0, v1, v2, v3);
  }
  
  return color;
}

/**
 * Safe deletion of OpenCV objects
 */
export function safeDelete(...objects: Array<{ delete(): void } | null | undefined>): void {
  for (const obj of objects) {
    try {
      obj?.delete();
    } catch (error) {
      console.warn('Error deleting OpenCV object:', error);
    }
  }
}

/**
 * Create a Size object
 */
export function createSize(width: number, height: number) {
  const cv = getCV();
  return new cv.Size(width, height);
}

/**
 * Create a Point object
 */
export function createPoint(x: number, y: number) {
  const cv = getCV();
  return new cv.Point(x, y);
}

/**
 * Create a Rect object
 */
export function createRect(x: number, y: number, width: number, height: number) {
  const cv = getCV();
  return new cv.Rect(x, y, width, height);
}

/**
 * Create a Scalar object
 */
export function createScalar(v0: number, v1?: number, v2?: number, v3?: number) {
  const cv = getCV();
  return new cv.Scalar(v0, v1, v2, v3);
}

/**
 * Image processing operations
 */

import { Mat } from '../core/Mat';
import { getCV, createSize, toScalar, safeDelete } from '../core/utils';
import type { Color } from '../core/types';

export interface ResizeOptions {
  width?: number;
  height?: number;
  fx?: number;
  fy?: number;
  interpolation?: number;
}

export interface GaussianBlurOptions {
  ksize: { width: number; height: number };
  sigmaX: number;
  sigmaY?: number;
  borderType?: number;
}

export interface CannyOptions {
  threshold1: number;
  threshold2: number;
  apertureSize?: number;
  L2gradient?: boolean;
}

export interface ThresholdOptions {
  thresh: number;
  maxval: number;
  type: number;
}

/**
 * Convert color space
 */
export function cvtColor(src: Mat, code: number): Mat {
  const cv = getCV();
  const dst = Mat.empty();
  cv.cvtColor(src.getMat(), dst.getMat(), code);
  return dst;
}

/**
 * Resize image
 */
export function resize(src: Mat, options: ResizeOptions): Mat {
  const cv = getCV();
  const dst = Mat.empty();
  
  let width = options.width ?? 0;
  let height = options.height ?? 0;
  
  if (options.fx !== undefined || options.fy !== undefined) {
    width = 0;
    height = 0;
  }
  
  const dsize = createSize(width, height);
  
  cv.resize(
    src.getMat(),
    dst.getMat(),
    dsize,
    options.fx ?? 0,
    options.fy ?? 0,
    options.interpolation ?? cv.INTER_LINEAR
  );
  
  return dst;
}

/**
 * Apply threshold to image
 */
export function threshold(src: Mat, options: ThresholdOptions): Mat {
  const cv = getCV();
  const dst = Mat.empty();
  cv.threshold(src.getMat(), dst.getMat(), options.thresh, options.maxval, options.type);
  return dst;
}

/**
 * Apply adaptive threshold
 */
export function adaptiveThreshold(
  src: Mat,
  maxValue: number,
  adaptiveMethod: number,
  thresholdType: number,
  blockSize: number,
  C: number
): Mat {
  const cv = getCV();
  const dst = Mat.empty();
  cv.adaptiveThreshold(
    src.getMat(),
    dst.getMat(),
    maxValue,
    adaptiveMethod,
    thresholdType,
    blockSize,
    C
  );
  return dst;
}

/**
 * Apply Gaussian blur
 */
export function gaussianBlur(src: Mat, options: GaussianBlurOptions): Mat {
  const cv = getCV();
  const dst = Mat.empty();
  const ksize = createSize(options.ksize.width, options.ksize.height);
  
  cv.GaussianBlur(
    src.getMat(),
    dst.getMat(),
    ksize,
    options.sigmaX,
    options.sigmaY ?? 0,
    options.borderType ?? cv.BORDER_DEFAULT
  );
  
  return dst;
}

/**
 * Apply median blur
 */
export function medianBlur(src: Mat, ksize: number): Mat {
  const cv = getCV();
  const dst = Mat.empty();
  cv.medianBlur(src.getMat(), dst.getMat(), ksize);
  return dst;
}

/**
 * Apply bilateral filter
 */
export function bilateralFilter(
  src: Mat,
  d: number,
  sigmaColor: number,
  sigmaSpace: number,
  borderType?: number
): Mat {
  const cv = getCV();
  const dst = Mat.empty();
  cv.bilateralFilter(
    src.getMat(),
    dst.getMat(),
    d,
    sigmaColor,
    sigmaSpace,
    borderType ?? cv.BORDER_DEFAULT
  );
  return dst;
}

/**
 * Apply Canny edge detection
 */
export function canny(src: Mat, options: CannyOptions): Mat {
  const cv = getCV();
  const dst = Mat.empty();
  cv.Canny(
    src.getMat(),
    dst.getMat(),
    options.threshold1,
    options.threshold2,
    options.apertureSize ?? 3,
    options.L2gradient ?? false
  );
  return dst;
}

/**
 * Dilate image
 */
export function dilate(
  src: Mat,
  kernel: Mat,
  iterations?: number
): Mat {
  const cv = getCV();
  const dst = Mat.empty();
  cv.dilate(
    src.getMat(),
    dst.getMat(),
    kernel.getMat(),
    undefined,
    iterations ?? 1
  );
  return dst;
}

/**
 * Erode image
 */
export function erode(
  src: Mat,
  kernel: Mat,
  iterations?: number
): Mat {
  const cv = getCV();
  const dst = Mat.empty();
  cv.erode(
    src.getMat(),
    dst.getMat(),
    kernel.getMat(),
    undefined,
    iterations ?? 1
  );
  return dst;
}

/**
 * Apply morphological operation
 */
export function morphologyEx(
  src: Mat,
  op: number,
  kernel: Mat,
  iterations?: number
): Mat {
  const cv = getCV();
  const dst = Mat.empty();
  cv.morphologyEx(
    src.getMat(),
    dst.getMat(),
    op,
    kernel.getMat(),
    undefined,
    iterations ?? 1
  );
  return dst;
}

/**
 * Get structuring element for morphological operations
 */
export function getStructuringElement(
  shape: number,
  ksize: { width: number; height: number }
): Mat {
  const cv = getCV();
  const size = createSize(ksize.width, ksize.height);
  const kernel = cv.getStructuringElement(shape, size);
  return new Mat(kernel);
}

/**
 * Contour detection and manipulation
 */

import { Mat } from '../core/Mat';
import { getCV, createPoint, safeDelete } from '../core/utils';
import type { Rect, MatVector } from '../types/opencv.d';

export interface Contour {
  points: Mat;
  area: number;
  perimeter: number;
  boundingRect: Rect;
}

export interface FindContoursOptions {
  mode: number;
  method: number;
  offset?: { x: number; y: number };
}

/**
 * Find contours in a binary image
 */
export function findContours(
  image: Mat,
  options: FindContoursOptions
): MatVector {
  const cv = getCV();
  const contours = new cv.MatVector();
  const hierarchy = Mat.empty();
  
  const offset = options.offset 
    ? createPoint(options.offset.x, options.offset.y)
    : createPoint(0, 0);
  
  cv.findContours(
    image.getMat(),
    contours,
    hierarchy.getMat(),
    options.mode,
    options.method,
    offset
  );
  
  safeDelete(hierarchy);
  return contours;
}

/**
 * Draw contours on an image
 */
export function drawContours(
  image: Mat,
  contours: MatVector,
  contourIdx: number,
  color: any,
  thickness?: number
): void {
  const cv = getCV();
  
  cv.drawContours(
    image.getMat(),
    contours,
    contourIdx,
    color,
    thickness ?? 1
  );
}

/**
 * Calculate contour area
 */
export function contourArea(contour: Mat, oriented?: boolean): number {
  const cv = getCV();
  return cv.contourArea(contour.getMat(), oriented ?? false);
}

/**
 * Calculate contour perimeter (arc length)
 */
export function arcLength(curve: Mat, closed: boolean): number {
  const cv = getCV();
  return cv.arcLength(curve.getMat(), closed);
}

/**
 * Approximate a polygonal curve
 */
export function approxPolyDP(
  curve: Mat,
  epsilon: number,
  closed: boolean
): Mat {
  const cv = getCV();
  const approxCurve = Mat.empty();
  cv.approxPolyDP(curve.getMat(), approxCurve.getMat(), epsilon, closed);
  return approxCurve;
}

/**
 * Calculate bounding rectangle for contour
 */
export function boundingRect(points: Mat): Rect {
  const cv = getCV();
  return cv.boundingRect(points.getMat());
}

/**
 * Calculate minimum area rotated rectangle
 */
export function minAreaRect(points: Mat): any {
  const cv = getCV();
  return cv.minAreaRect(points.getMat());
}

/**
 * Get contour information
 */
export function getContourInfo(contour: Mat): Contour {
  const area = contourArea(contour);
  const perimeter = arcLength(contour, true);
  const rect = boundingRect(contour);
  
  return {
    points: contour,
    area,
    perimeter,
    boundingRect: rect,
  };
}

/**
 * Filter contours by area
 */
export function filterContoursByArea(
  contours: MatVector,
  minArea: number,
  maxArea?: number
): number[] {
  const cv = getCV();
  const filtered: number[] = [];
  
  for (let i = 0; i < contours.size(); i++) {
    const contour = new Mat(contours.get(i), false);
    const area = contourArea(contour);
    
    if (area >= minArea && (maxArea === undefined || area <= maxArea)) {
      filtered.push(i);
    }
  }
  
  return filtered;
}

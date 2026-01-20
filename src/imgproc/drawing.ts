/**
 * Drawing functions
 */

import { Mat } from '../core/Mat';
import { getCV, createPoint, toScalar, createSize, safeDelete } from '../core/utils';
import type { Color } from '../core/types';

export interface LineOptions {
  thickness?: number;
  lineType?: number;
  shift?: number;
}

export interface RectangleOptions {
  thickness?: number;
  lineType?: number;
  shift?: number;
}

export interface CircleOptions {
  thickness?: number;
  lineType?: number;
  shift?: number;
}

export interface TextOptions {
  fontFace?: number;
  fontScale?: number;
  thickness?: number;
  lineType?: number;
  bottomLeftOrigin?: boolean;
}

/**
 * Draw a line on the image
 */
export function drawLine(
  img: Mat,
  pt1: { x: number; y: number },
  pt2: { x: number; y: number },
  color: Color,
  options?: LineOptions
): void {
  const cv = getCV();
  const point1 = createPoint(pt1.x, pt1.y);
  const point2 = createPoint(pt2.x, pt2.y);
  const scalar = toScalar(color);
  
  cv.line(
    img.getMat(),
    point1,
    point2,
    scalar,
    options?.thickness ?? 1,
    options?.lineType ?? cv.LINE_8,
    options?.shift ?? 0
  );
}

/**
 * Draw a rectangle on the image
 */
export function drawRectangle(
  img: Mat,
  pt1: { x: number; y: number },
  pt2: { x: number; y: number },
  color: Color,
  options?: RectangleOptions
): void {
  const cv = getCV();
  const point1 = createPoint(pt1.x, pt1.y);
  const point2 = createPoint(pt2.x, pt2.y);
  const scalar = toScalar(color);
  
  cv.rectangle(
    img.getMat(),
    point1,
    point2,
    scalar,
    options?.thickness ?? 1,
    options?.lineType ?? cv.LINE_8,
    options?.shift ?? 0
  );
}

/**
 * Draw a circle on the image
 */
export function drawCircle(
  img: Mat,
  center: { x: number; y: number },
  radius: number,
  color: Color,
  options?: CircleOptions
): void {
  const cv = getCV();
  const centerPoint = createPoint(center.x, center.y);
  const scalar = toScalar(color);
  
  cv.circle(
    img.getMat(),
    centerPoint,
    radius,
    scalar,
    options?.thickness ?? 1,
    options?.lineType ?? cv.LINE_8,
    options?.shift ?? 0
  );
}

/**
 * Draw an ellipse on the image
 */
export function drawEllipse(
  img: Mat,
  center: { x: number; y: number },
  axes: { width: number; height: number },
  angle: number,
  startAngle: number,
  endAngle: number,
  color: Color,
  thickness?: number,
  lineType?: number
): void {
  const cv = getCV();
  const centerPoint = createPoint(center.x, center.y);
  const axesSize = createSize(axes.width, axes.height);
  const scalar = toScalar(color);
  
  cv.ellipse(
    img.getMat(),
    centerPoint,
    axesSize,
    angle,
    startAngle,
    endAngle,
    scalar,
    thickness ?? 1,
    lineType ?? cv.LINE_8,
    0
  );
}

/**
 * Put text on the image
 */
export function putText(
  img: Mat,
  text: string,
  org: { x: number; y: number },
  color: Color,
  options?: TextOptions
): void {
  const cv = getCV();
  const point = createPoint(org.x, org.y);
  const scalar = toScalar(color);
  
  cv.putText(
    img.getMat(),
    text,
    point,
    options?.fontFace ?? cv.FONT_HERSHEY_SIMPLEX,
    options?.fontScale ?? 1,
    scalar,
    options?.thickness ?? 1,
    options?.lineType ?? cv.LINE_8,
    options?.bottomLeftOrigin ?? false
  );
}

/**
 * Fill a polygon
 * Note: Use drawContours with thickness=-1 for filled polygons in opencv.js
 */
export function fillPoly(
  img: Mat,
  pts: Array<{ x: number; y: number }>,
  color: Color
): void {
  const cv = getCV();
  const scalar = toScalar(color);
  
  // Convert points to Mat for contour
  const pointsData = new Int32Array(pts.flatMap(p => [p.x, p.y]));
  const pointsMat = Mat.fromArray(pts.length, 1, cv.CV_32SC2, Array.from(pointsData));
  const matVector = new cv.MatVector();
  matVector.push_back(pointsMat.getMat());
  
  // Draw filled contour
  cv.drawContours(img.getMat(), matVector, 0, scalar, cv.FILLED);
  
  safeDelete(pointsMat, matVector);
}

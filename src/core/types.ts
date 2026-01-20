/**
 * Core types and interfaces for the OpenCV wrapper
 */

import type { Mat, Size, Point, Scalar, Rect } from '../types/opencv.d';

export type { Mat, Size, Point, Scalar, Rect };

export interface ImageSource {
  source: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement | ImageData;
  width: number;
  height: number;
}

export interface ColorConversionCode {
  readonly name: string;
  readonly code: number;
}

export interface InterpolationFlag {
  readonly name: string;
  readonly flag: number;
}

export interface ThresholdType {
  readonly name: string;
  readonly type: number;
}

export interface MorphShape {
  readonly name: string;
  readonly shape: number;
}

export interface BorderType {
  readonly name: string;
  readonly type: number;
}

export interface ContourMode {
  readonly name: string;
  readonly mode: number;
}

export interface ContourMethod {
  readonly name: string;
  readonly method: number;
}

export interface DataType {
  readonly name: string;
  readonly type: number;
}

export type RGBColor = [number, number, number];
export type RGBAColor = [number, number, number, number];
export type Color = RGBColor | RGBAColor | Scalar;

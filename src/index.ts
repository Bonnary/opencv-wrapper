/**
 * Main entry point for the OpenCV TypeScript wrapper
 * 
 * A type-safe wrapper around opencv.js for use in React and web applications
 * 
 * @example
 * ```typescript
 * import { initOpenCVAsync, Mat, cvtColor, ColorConversion } from 'opencv-wrapper';
 * 
 * // Initialize OpenCV (loads opencv.js automatically)
 * await initOpenCVAsync();
 * 
 * // Use type-safe wrapper
 * const img = Mat.fromImage(imageElement);
 * const gray = cvtColor(img, ColorConversion.RGB2GRAY.code);
 * gray.imshow('canvas');
 * 
 * // Clean up
 * img.delete();
 * gray.delete();
 * ```
 */

// Core exports
export { Mat } from './core/Mat';
export { 
  initOpenCV,

  getCV, 
  isOpenCVReady, 
  safeDelete,
  toScalar,
  createSize,
  createPoint,
  createRect,
  createScalar
} from './core/utils';



export {
  ColorConversion,
  Interpolation,
  Threshold,
  MorphologyShape,
  MorphologyOp,
  Border,
  ContourRetrieval,
  ContourApproximation,
  DataTypes,
  FontFace,
  LineType,
} from './core/constants';

// Types
export type {
  ImageSource,
  ColorConversionCode,
  InterpolationFlag,
  ThresholdType,
  MorphShape,
  BorderType,
  ContourMode,
  ContourMethod,
  DataType,
  RGBColor,
  RGBAColor,
  Color,
} from './core/types';

export type {
  Mat as CVMat,
  Size,
  Point,
  Scalar,
  Rect,
  RotatedRect,
  Range,
  MatVector,
  OpenCVModule,
} from './types/opencv.d';

// Image processing exports
export {
  cvtColor,
  resize,
  threshold,
  adaptiveThreshold,
  gaussianBlur,
  medianBlur,
  bilateralFilter,
  canny,
  dilate,
  erode,
  morphologyEx,
  getStructuringElement,
} from './imgproc/imageProcessing';

export type {
  ResizeOptions,
  GaussianBlurOptions,
  CannyOptions,
  ThresholdOptions,
} from './imgproc/imageProcessing';

// Drawing exports
export {
  drawLine,
  drawRectangle,
  drawCircle,
  drawEllipse,
  putText,
  fillPoly,
} from './imgproc/drawing';

export type {
  LineOptions,
  RectangleOptions,
  CircleOptions,
  TextOptions,
} from './imgproc/drawing';

// Contour exports
export {
  findContours,
  drawContours,
  contourArea,
  arcLength,
  approxPolyDP,
  boundingRect,
  minAreaRect,
  getContourInfo,
  filterContoursByArea,
} from './imgproc/contours';

export type {
  Contour,
  FindContoursOptions,
} from './imgproc/contours';

// Object detection exports
export {
  CascadeClassifier,
  ORBDetector,
} from './objdetect/objectDetection';

export type {
  DetectionOptions,
  Detection,
} from './objdetect/objectDetection';

// Video exports
export {
  VideoCapture,
  processVideo,
} from './video/videoCapture';

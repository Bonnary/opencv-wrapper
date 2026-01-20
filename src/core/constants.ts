/**
 * Constants for OpenCV operations
 */

import { getCV } from './utils';
import type { 
  ColorConversionCode, 
  InterpolationFlag, 
  ThresholdType, 
  MorphShape, 
  BorderType,
  ContourMode,
  ContourMethod,
  DataType
} from './types';

/**
 * Color conversion codes
 */
export const ColorConversion = {
  get RGBA2GRAY(): ColorConversionCode {
    return { name: 'RGBA2GRAY', code: getCV().COLOR_RGBA2GRAY };
  },
  get RGB2GRAY(): ColorConversionCode {
    return { name: 'RGB2GRAY', code: getCV().COLOR_RGB2GRAY };
  },
  get GRAY2RGBA(): ColorConversionCode {
    return { name: 'GRAY2RGBA', code: getCV().COLOR_GRAY2RGBA };
  },
  get BGR2GRAY(): ColorConversionCode {
    return { name: 'BGR2GRAY', code: getCV().COLOR_BGR2GRAY };
  },
  get GRAY2BGR(): ColorConversionCode {
    return { name: 'GRAY2BGR', code: getCV().COLOR_GRAY2BGR };
  },
  get BGR2RGB(): ColorConversionCode {
    return { name: 'BGR2RGB', code: getCV().COLOR_BGR2RGB };
  },
  get RGB2BGR(): ColorConversionCode {
    return { name: 'RGB2BGR', code: getCV().COLOR_RGB2BGR };
  },
  get BGR2HSV(): ColorConversionCode {
    return { name: 'BGR2HSV', code: getCV().COLOR_BGR2HSV };
  },
  get RGB2HSV(): ColorConversionCode {
    return { name: 'RGB2HSV', code: getCV().COLOR_RGB2HSV };
  },
  get HSV2BGR(): ColorConversionCode {
    return { name: 'HSV2BGR', code: getCV().COLOR_HSV2BGR };
  },
  get HSV2RGB(): ColorConversionCode {
    return { name: 'HSV2RGB', code: getCV().COLOR_HSV2RGB };
  },
} as const;

/**
 * Interpolation flags
 */
export const Interpolation = {
  get NEAREST(): InterpolationFlag {
    return { name: 'NEAREST', flag: getCV().INTER_NEAREST };
  },
  get LINEAR(): InterpolationFlag {
    return { name: 'LINEAR', flag: getCV().INTER_LINEAR };
  },
  get CUBIC(): InterpolationFlag {
    return { name: 'CUBIC', flag: getCV().INTER_CUBIC };
  },
  get AREA(): InterpolationFlag {
    return { name: 'AREA', flag: getCV().INTER_AREA };
  },
  get LANCZOS4(): InterpolationFlag {
    return { name: 'LANCZOS4', flag: getCV().INTER_LANCZOS4 };
  },
} as const;

/**
 * Threshold types
 */
export const Threshold = {
  get BINARY(): ThresholdType {
    return { name: 'BINARY', type: getCV().THRESH_BINARY };
  },
  get BINARY_INV(): ThresholdType {
    return { name: 'BINARY_INV', type: getCV().THRESH_BINARY_INV };
  },
  get TRUNC(): ThresholdType {
    return { name: 'TRUNC', type: getCV().THRESH_TRUNC };
  },
  get TOZERO(): ThresholdType {
    return { name: 'TOZERO', type: getCV().THRESH_TOZERO };
  },
  get TOZERO_INV(): ThresholdType {
    return { name: 'TOZERO_INV', type: getCV().THRESH_TOZERO_INV };
  },
  get OTSU(): ThresholdType {
    return { name: 'OTSU', type: getCV().THRESH_OTSU };
  },
  get TRIANGLE(): ThresholdType {
    return { name: 'TRIANGLE', type: getCV().THRESH_TRIANGLE };
  },
} as const;

/**
 * Morphological shapes
 */
export const MorphologyShape = {
  get RECT(): MorphShape {
    return { name: 'RECT', shape: getCV().MORPH_RECT };
  },
  get CROSS(): MorphShape {
    return { name: 'CROSS', shape: getCV().MORPH_CROSS };
  },
  get ELLIPSE(): MorphShape {
    return { name: 'ELLIPSE', shape: getCV().MORPH_ELLIPSE };
  },
} as const;

/**
 * Morphological operations
 */
export const MorphologyOp = {
  get ERODE(): number {
    return getCV().MORPH_ERODE;
  },
  get DILATE(): number {
    return getCV().MORPH_DILATE;
  },
  get OPEN(): number {
    return getCV().MORPH_OPEN;
  },
  get CLOSE(): number {
    return getCV().MORPH_CLOSE;
  },
  get GRADIENT(): number {
    return getCV().MORPH_GRADIENT;
  },
  get TOPHAT(): number {
    return getCV().MORPH_TOPHAT;
  },
  get BLACKHAT(): number {
    return getCV().MORPH_BLACKHAT;
  },
} as const;

/**
 * Border types
 */
export const Border = {
  get CONSTANT(): BorderType {
    return { name: 'CONSTANT', type: getCV().BORDER_CONSTANT };
  },
  get REPLICATE(): BorderType {
    return { name: 'REPLICATE', type: getCV().BORDER_REPLICATE };
  },
  get REFLECT(): BorderType {
    return { name: 'REFLECT', type: getCV().BORDER_REFLECT };
  },
  get WRAP(): BorderType {
    return { name: 'WRAP', type: getCV().BORDER_WRAP };
  },
  get REFLECT_101(): BorderType {
    return { name: 'REFLECT_101', type: getCV().BORDER_REFLECT_101 };
  },
  get DEFAULT(): BorderType {
    return { name: 'DEFAULT', type: getCV().BORDER_DEFAULT };
  },
} as const;

/**
 * Contour retrieval modes
 */
export const ContourRetrieval = {
  get EXTERNAL(): ContourMode {
    return { name: 'EXTERNAL', mode: getCV().RETR_EXTERNAL };
  },
  get LIST(): ContourMode {
    return { name: 'LIST', mode: getCV().RETR_LIST };
  },
  get CCOMP(): ContourMode {
    return { name: 'CCOMP', mode: getCV().RETR_CCOMP };
  },
  get TREE(): ContourMode {
    return { name: 'TREE', mode: getCV().RETR_TREE };
  },
} as const;

/**
 * Contour approximation methods
 */
export const ContourApproximation = {
  get NONE(): ContourMethod {
    return { name: 'NONE', method: getCV().CHAIN_APPROX_NONE };
  },
  get SIMPLE(): ContourMethod {
    return { name: 'SIMPLE', method: getCV().CHAIN_APPROX_SIMPLE };
  },
  get TC89_L1(): ContourMethod {
    return { name: 'TC89_L1', method: getCV().CHAIN_APPROX_TC89_L1 };
  },
  get TC89_KCOS(): ContourMethod {
    return { name: 'TC89_KCOS', method: getCV().CHAIN_APPROX_TC89_KCOS };
  },
} as const;

/**
 * Data types
 */
export const DataTypes = {
  get CV_8U(): DataType {
    return { name: 'CV_8U', type: getCV().CV_8U };
  },
  get CV_8S(): DataType {
    return { name: 'CV_8S', type: getCV().CV_8S };
  },
  get CV_16U(): DataType {
    return { name: 'CV_16U', type: getCV().CV_16U };
  },
  get CV_16S(): DataType {
    return { name: 'CV_16S', type: getCV().CV_16S };
  },
  get CV_32S(): DataType {
    return { name: 'CV_32S', type: getCV().CV_32S };
  },
  get CV_32F(): DataType {
    return { name: 'CV_32F', type: getCV().CV_32F };
  },
  get CV_64F(): DataType {
    return { name: 'CV_64F', type: getCV().CV_64F };
  },
  get CV_8UC1(): DataType {
    return { name: 'CV_8UC1', type: getCV().CV_8UC1 };
  },
  get CV_8UC3(): DataType {
    return { name: 'CV_8UC3', type: getCV().CV_8UC3 };
  },
  get CV_8UC4(): DataType {
    return { name: 'CV_8UC4', type: getCV().CV_8UC4 };
  },
  get CV_32FC1(): DataType {
    return { name: 'CV_32FC1', type: getCV().CV_32FC1 };
  },
} as const;

/**
 * Font faces
 */
export const FontFace = {
  get SIMPLEX(): number {
    return getCV().FONT_HERSHEY_SIMPLEX;
  },
  get PLAIN(): number {
    return getCV().FONT_HERSHEY_PLAIN;
  },
  get DUPLEX(): number {
    return getCV().FONT_HERSHEY_DUPLEX;
  },
  get COMPLEX(): number {
    return getCV().FONT_HERSHEY_COMPLEX;
  },
  get TRIPLEX(): number {
    return getCV().FONT_HERSHEY_TRIPLEX;
  },
  get COMPLEX_SMALL(): number {
    return getCV().FONT_HERSHEY_COMPLEX_SMALL;
  },
  get SCRIPT_SIMPLEX(): number {
    return getCV().FONT_HERSHEY_SCRIPT_SIMPLEX;
  },
  get SCRIPT_COMPLEX(): number {
    return getCV().FONT_HERSHEY_SCRIPT_COMPLEX;
  },
  get ITALIC(): number {
    return getCV().FONT_ITALIC;
  },
} as const;

/**
 * Line types
 */
export const LineType = {
  get FILLED(): number {
    return getCV().FILLED;
  },
  get LINE_4(): number {
    return getCV().LINE_4;
  },
  get LINE_8(): number {
    return getCV().LINE_8;
  },
  get LINE_AA(): number {
    return getCV().LINE_AA;
  },
} as const;

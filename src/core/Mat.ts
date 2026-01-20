/**
 * Type-safe Mat wrapper class
 */

import type { Mat as CVMat, Size, Rect } from '../types/opencv.d';
import { getCV, safeDelete } from '../core/utils';
import type { ImageSource } from '../core/types';

export class Mat {
  private mat: CVMat;
  private shouldDelete: boolean;

  constructor(mat: CVMat, shouldDelete = true) {
    this.mat = mat;
    this.shouldDelete = shouldDelete;
  }

  /**
   * Create a new Mat from dimensions and type
   */
  static create(
    rows: number,
    cols: number,
    type: number,
    data?: number[] | Uint8Array | Float32Array
  ): Mat {
    const cv = getCV();
    const mat = data 
      ? new cv.Mat(rows, cols, type, data)
      : new cv.Mat(rows, cols, type);
    return new Mat(mat);
  }

  /**
   * Create Mat from an image element
   */
  static fromImage(image: HTMLImageElement | HTMLCanvasElement): Mat {
    const cv = getCV();
    const mat = cv.imread(image);
    return new Mat(mat);
  }

  /**
   * Create Mat from ImageData
   */
  static fromImageData(imageData: ImageData): Mat {
    const cv = getCV();
    const mat = cv.matFromImageData(imageData);
    return new Mat(mat);
  }

  /**
   * Create Mat from an array
   */
  static fromArray(rows: number, cols: number, type: number, array: number[]): Mat {
    const cv = getCV();
    const mat = cv.matFromArray(rows, cols, type, array);
    return new Mat(mat);
  }

  /**
   * Create an empty Mat
   */
  static empty(): Mat {
    const cv = getCV();
    const mat = new cv.Mat();
    return new Mat(mat);
  }

  /**
   * Get the underlying OpenCV Mat object
   */
  getMat(): CVMat {
    return this.mat;
  }

  /**
   * Get number of rows
   */
  get rows(): number {
    return this.mat.rows;
  }

  /**
   * Get number of columns
   */
  get cols(): number {
    return this.mat.cols;
  }

  /**
   * Get the data type
   */
  type(): number {
    return this.mat.type();
  }

  /**
   * Get number of channels
   */
  channels(): number {
    return this.mat.channels();
  }

  /**
   * Get the depth of the Mat
   */
  depth(): number {
    return this.mat.depth();
  }

  /**
   * Check if Mat is empty
   */
  isEmpty(): boolean {
    return this.mat.empty();
  }

  /**
   * Get the size of the Mat
   */
  size(): Size {
    return this.mat.size();
  }

  /**
   * Get width (cols)
   */
  get width(): number {
    return this.mat.cols;
  }

  /**
   * Get height (rows)
   */
  get height(): number {
    return this.mat.rows;
  }

  /**
   * Clone the Mat
   */
  clone(): Mat {
    const cloned = this.mat.clone();
    return new Mat(cloned);
  }

  /**
   * Copy Mat to another Mat
   */
  copyTo(dst: Mat): void {
    this.mat.copyTo(dst.getMat());
  }

  /**
   * Convert Mat type
   */
  convertTo(rtype: number, alpha?: number, beta?: number): Mat {
    const dst = Mat.empty();
    this.mat.convertTo(dst.getMat(), rtype, alpha, beta);
    return dst;
  }

  /**
   * Set all elements to a value
   */
  setTo(value: any): Mat {
    this.mat.setTo(value);
    return this;
  }

  /**
   * Get a row
   */
  row(y: number): Mat {
    const row = this.mat.row(y);
    return new Mat(row, false);
  }

  /**
   * Get a column
   */
  col(x: number): Mat {
    const col = this.mat.col(x);
    return new Mat(col, false);
  }

  /**
   * Get a region of interest
   */
  roi(rect: Rect): Mat {
    const roi = this.mat.roi(rect);
    return new Mat(roi, false);
  }

  /**
   * Get data as Uint8Array
   */
  get data(): Uint8Array {
    return this.mat.data as Uint8Array;
  }

  /**
   * Get data as Uint8Array
   */
  get data8U(): Uint8Array {
    return this.mat.data8U;
  }

  /**
   * Get data as Float32Array
   */
  get data32F(): Float32Array {
    return this.mat.data32F;
  }

  /**
   * Get value at position
   */
  at(row: number, col: number): number {
    return this.mat.ucharAt(row, col);
  }

  /**
   * Get integer value at position
   */
  intAt(row: number, col: number): number {
    return this.mat.intAt(row, col);
  }

  /**
   * Get float value at position
   */
  floatAt(row: number, col: number): number {
    return this.mat.floatAt(row, col);
  }

  /**
   * Display Mat on canvas
   */
  imshow(canvas: HTMLCanvasElement | string): void {
    const cv = getCV();
    cv.imshow(canvas, this.mat);
  }

  /**
   * Delete the Mat and free memory
   */
  delete(): void {
    if (this.shouldDelete) {
      safeDelete(this.mat);
    }
  }

  /**
   * Convert to ImageData (for canvas)
   */
  toImageData(): ImageData {
    const channels = this.channels();
    const data = channels === 1 ? this.data8U : this.data;
    
    // Convert grayscale to RGBA if needed
    if (channels === 1) {
      const rgba = new Uint8ClampedArray(this.rows * this.cols * 4);
      for (let i = 0; i < data.length; i++) {
        rgba[i * 4] = data[i]!;
        rgba[i * 4 + 1] = data[i]!;
        rgba[i * 4 + 2] = data[i]!;
        rgba[i * 4 + 3] = 255;
      }
      return new ImageData(rgba, this.cols, this.rows);
    }
    
    return new ImageData(
      new Uint8ClampedArray(data),
      this.cols,
      this.rows
    );
  }
}

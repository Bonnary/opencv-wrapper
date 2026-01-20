/**
 * Type definitions for OpenCV.js
 * These types provide type safety for the opencv.js WebAssembly library
 */

export interface OpenCVModule {
  // Mat (Matrix) class
  Mat: new (
    rows?: number,
    cols?: number,
    type?: number,
    data?: number[] | Uint8Array | Float32Array
  ) => Mat;
  
  // MatVector for handling multiple Mat objects
  MatVector: new () => MatVector;
  
  // Basic types
  Size: new (width: number, height: number) => Size;
  Point: new (x: number, y: number) => Point;
  Scalar: new (v0: number, v1?: number, v2?: number, v3?: number) => Scalar;
  Rect: new (x: number, y: number, width: number, height: number) => Rect;
  RotatedRect: new () => RotatedRect;
  Range: new (start: number, end: number) => Range;
  
  // Color conversion codes
  COLOR_RGBA2GRAY: number;
  COLOR_RGB2GRAY: number;
  COLOR_GRAY2RGBA: number;
  COLOR_RGBA2BGR: number;
  COLOR_BGR2RGBA: number;
  COLOR_RGB2BGR: number;
  COLOR_BGR2RGB: number;
  COLOR_RGBA2RGB: number;
  COLOR_RGB2RGBA: number;
  COLOR_BGR2GRAY: number;
  COLOR_GRAY2BGR: number;
  COLOR_BGR2HSV: number;
  COLOR_RGB2HSV: number;
  COLOR_HSV2BGR: number;
  COLOR_HSV2RGB: number;
  
  // Data types
  CV_8U: number;
  CV_8S: number;
  CV_16U: number;
  CV_16S: number;
  CV_32S: number;
  CV_32F: number;
  CV_64F: number;
  CV_8UC1: number;
  CV_8UC2: number;
  CV_8UC3: number;
  CV_8UC4: number;
  CV_32SC2: number;
  CV_32FC1: number;
  CV_32FC2: number;
  CV_32FC3: number;
  CV_32FC4: number;
  
  // Border types
  BORDER_CONSTANT: number;
  BORDER_REPLICATE: number;
  BORDER_REFLECT: number;
  BORDER_WRAP: number;
  BORDER_REFLECT_101: number;
  BORDER_TRANSPARENT: number;
  BORDER_DEFAULT: number;
  BORDER_ISOLATED: number;
  
  // Threshold types
  THRESH_BINARY: number;
  THRESH_BINARY_INV: number;
  THRESH_TRUNC: number;
  THRESH_TOZERO: number;
  THRESH_TOZERO_INV: number;
  THRESH_OTSU: number;
  THRESH_TRIANGLE: number;
  
  // Morphological operations
  MORPH_RECT: number;
  MORPH_CROSS: number;
  MORPH_ELLIPSE: number;
  MORPH_ERODE: number;
  MORPH_DILATE: number;
  MORPH_OPEN: number;
  MORPH_CLOSE: number;
  MORPH_GRADIENT: number;
  MORPH_TOPHAT: number;
  MORPH_BLACKHAT: number;
  
  // Interpolation flags
  INTER_NEAREST: number;
  INTER_LINEAR: number;
  INTER_CUBIC: number;
  INTER_AREA: number;
  INTER_LANCZOS4: number;
  INTER_LINEAR_EXACT: number;
  INTER_MAX: number;
  WARP_FILL_OUTLIERS: number;
  WARP_INVERSE_MAP: number;
  
  // Image processing functions
  cvtColor(src: Mat, dst: Mat, code: number, dstCn?: number): void;
  resize(
    src: Mat,
    dst: Mat,
    dsize: Size,
    fx?: number,
    fy?: number,
    interpolation?: number
  ): void;
  threshold(
    src: Mat,
    dst: Mat,
    thresh: number,
    maxval: number,
    type: number
  ): number;
  adaptiveThreshold(
    src: Mat,
    dst: Mat,
    maxValue: number,
    adaptiveMethod: number,
    thresholdType: number,
    blockSize: number,
    C: number
  ): void;
  GaussianBlur(
    src: Mat,
    dst: Mat,
    ksize: Size,
    sigmaX: number,
    sigmaY?: number,
    borderType?: number
  ): void;
  medianBlur(src: Mat, dst: Mat, ksize: number): void;
  bilateralFilter(
    src: Mat,
    dst: Mat,
    d: number,
    sigmaColor: number,
    sigmaSpace: number,
    borderType?: number
  ): void;
  Canny(
    image: Mat,
    edges: Mat,
    threshold1: number,
    threshold2: number,
    apertureSize?: number,
    L2gradient?: boolean
  ): void;
  dilate(
    src: Mat,
    dst: Mat,
    kernel: Mat,
    anchor?: Point,
    iterations?: number,
    borderType?: number,
    borderValue?: Scalar
  ): void;
  erode(
    src: Mat,
    dst: Mat,
    kernel: Mat,
    anchor?: Point,
    iterations?: number,
    borderType?: number,
    borderValue?: Scalar
  ): void;
  morphologyEx(
    src: Mat,
    dst: Mat,
    op: number,
    kernel: Mat,
    anchor?: Point,
    iterations?: number,
    borderType?: number,
    borderValue?: Scalar
  ): void;
  getStructuringElement(shape: number, ksize: Size, anchor?: Point): Mat;
  
  // Contour functions
  findContours(
    image: Mat,
    contours: MatVector,
    hierarchy: Mat,
    mode: number,
    method: number,
    offset?: Point
  ): void;
  drawContours(
    image: Mat,
    contours: MatVector,
    contourIdx: number,
    color: Scalar,
    thickness?: number,
    lineType?: number,
    hierarchy?: Mat,
    maxLevel?: number,
    offset?: Point
  ): void;
  contourArea(contour: Mat, oriented?: boolean): number;
  arcLength(curve: Mat, closed: boolean): number;
  approxPolyDP(
    curve: Mat,
    approxCurve: Mat,
    epsilon: number,
    closed: boolean
  ): void;
  boundingRect(points: Mat): Rect;
  minAreaRect(points: Mat): RotatedRect;
  
  // Contour retrieval modes
  RETR_EXTERNAL: number;
  RETR_LIST: number;
  RETR_CCOMP: number;
  RETR_TREE: number;
  
  // Contour approximation methods
  CHAIN_APPROX_NONE: number;
  CHAIN_APPROX_SIMPLE: number;
  CHAIN_APPROX_TC89_L1: number;
  CHAIN_APPROX_TC89_KCOS: number;
  
  // Drawing functions
  line(
    img: Mat,
    pt1: Point,
    pt2: Point,
    color: Scalar,
    thickness?: number,
    lineType?: number,
    shift?: number
  ): void;
  rectangle(
    img: Mat,
    pt1: Point,
    pt2: Point,
    color: Scalar,
    thickness?: number,
    lineType?: number,
    shift?: number
  ): void;
  circle(
    img: Mat,
    center: Point,
    radius: number,
    color: Scalar,
    thickness?: number,
    lineType?: number,
    shift?: number
  ): void;
  ellipse(
    img: Mat,
    center: Point,
    axes: Size,
    angle: number,
    startAngle: number,
    endAngle: number,
    color: Scalar,
    thickness?: number,
    lineType?: number,
    shift?: number
  ): void;
  putText(
    img: Mat,
    text: string,
    org: Point,
    fontFace: number,
    fontScale: number,
    color: Scalar,
    thickness?: number,
    lineType?: number,
    bottomLeftOrigin?: boolean
  ): void;
  
  // Font faces
  FONT_HERSHEY_SIMPLEX: number;
  FONT_HERSHEY_PLAIN: number;
  FONT_HERSHEY_DUPLEX: number;
  FONT_HERSHEY_COMPLEX: number;
  FONT_HERSHEY_TRIPLEX: number;
  FONT_HERSHEY_COMPLEX_SMALL: number;
  FONT_HERSHEY_SCRIPT_SIMPLEX: number;
  FONT_HERSHEY_SCRIPT_COMPLEX: number;
  FONT_ITALIC: number;
  
  // Line types
  FILLED: number;
  LINE_4: number;
  LINE_8: number;
  LINE_AA: number;
  
  // Image reading
  imread(imageSource: HTMLImageElement | HTMLCanvasElement): Mat;
  imshow(canvas: HTMLCanvasElement | string, mat: Mat): void;
  
  // Utility functions
  matFromArray(rows: number, cols: number, type: number, array: number[]): Mat;
  matFromImageData(imageData: ImageData): Mat;
  
  // Video/Camera
  VideoCapture: new (videoSource: HTMLVideoElement | number) => VideoCapture;
  
  // Feature detection
  ORB: {
    create(nfeatures?: number): ORB;
  };
  
  // Cascade Classifier
  CascadeClassifier: new () => CascadeClassifier;
  
  // Module lifecycle
  onRuntimeInitialized?: () => void;
}

export interface Mat {
  rows: number;
  cols: number;
  data: Uint8Array | Int8Array | Uint16Array | Int16Array | Int32Array | Float32Array | Float64Array;
  data8U: Uint8Array;
  data8S: Int8Array;
  data16U: Uint16Array;
  data16S: Int16Array;
  data32S: Int32Array;
  data32F: Float32Array;
  data64F: Float64Array;
  type(): number;
  channels(): number;
  depth(): number;
  empty(): boolean;
  size(): Size;
  clone(): Mat;
  copyTo(dst: Mat, mask?: Mat): void;
  convertTo(dst: Mat, rtype: number, alpha?: number, beta?: number): void;
  setTo(value: Scalar, mask?: Mat): Mat;
  row(y: number): Mat;
  col(x: number): Mat;
  roi(rect: Rect): Mat;
  delete(): void;
  at(row: number, col: number): number;
  intAt(row: number, col: number): number;
  floatAt(row: number, col: number): number;
  doubleAt(row: number, col: number): number;
  charAt(row: number, col: number): number;
  ucharAt(row: number, col: number): number;
}

export interface MatVector {
  size(): number;
  get(index: number): Mat;
  set(index: number, mat: Mat): void;
  push_back(mat: Mat): void;
  delete(): void;
}

export interface Size {
  width: number;
  height: number;
}

export interface Point {
  x: number;
  y: number;
}

export interface Scalar {
  [index: number]: number;
}

export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface RotatedRect {
  center: Point;
  size: Size;
  angle: number;
}

export interface Range {
  start: number;
  end: number;
}

export interface VideoCapture {
  read(frame: Mat): boolean;
  delete(): void;
}

export interface ORB {
  detect(image: Mat): MatVector;
  compute(image: Mat, keypoints: MatVector, descriptors: Mat): void;
  detectAndCompute(
    image: Mat,
    mask: Mat,
    keypoints: MatVector,
    descriptors: Mat,
    useProvidedKeypoints?: boolean
  ): void;
  delete(): void;
}

export interface CascadeClassifier {
  load(filename: string): boolean;
  detectMultiScale(
    image: Mat,
    objects: MatVector,
    scaleFactor?: number,
    minNeighbors?: number,
    flags?: number,
    minSize?: Size,
    maxSize?: Size
  ): void;
  delete(): void;
}

declare global {
  const cv: OpenCVModule;
}

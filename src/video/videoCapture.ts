/**
 * Video capture wrapper
 */

import { Mat } from '../core/Mat';
import { getCV, safeDelete } from '../core/utils';
import type { VideoCapture as CVVideoCapture } from '../types/opencv.d';

/**
 * Video capture wrapper class
 */
export class VideoCapture {
  private capture: CVVideoCapture;

  constructor(videoSource: HTMLVideoElement | number) {
    const cv = getCV();
    this.capture = new cv.VideoCapture(videoSource);
  }

  /**
   * Read a frame from the video
   */
  read(): Mat | null {
    const frame = Mat.empty();
    const success = this.capture.read(frame.getMat());
    
    if (!success) {
      safeDelete(frame);
      return null;
    }
    
    return frame;
  }

  /**
   * Delete the video capture
   */
  delete(): void {
    safeDelete(this.capture);
  }
}

/**
 * Process video frames with a callback
 */
export function processVideo(
  video: HTMLVideoElement,
  canvas: HTMLCanvasElement,
  processFrame: (frame: Mat) => Mat | void,
  fps: number = 30
): () => void {
  const cv = getCV();
  const cap = new VideoCapture(video);
  let isRunning = true;
  let animationId: number;

  const process = () => {
    if (!isRunning) return;

    const frame = cap.read();
    if (frame) {
      const result = processFrame(frame);
      const displayFrame = result ?? frame;
      
      displayFrame.imshow(canvas);
      
      safeDelete(frame);
      if (result) safeDelete(result);
    }

    animationId = requestAnimationFrame(process);
  };

  // Start processing
  setTimeout(process, 1000 / fps);

  // Return stop function
  return () => {
    isRunning = false;
    if (animationId) cancelAnimationFrame(animationId);
    cap.delete();
  };
}

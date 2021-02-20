import * as tf from '@tensorflow/tfjs-node-gpu';
import { Image, createCanvas, loadImage as LI } from 'canvas';
import { isString, isFourDimensionalTensor } from './utils';
import path from 'path';
import fs from 'fs';
export const loadImage = (src: string): Promise<any> =>
  new Promise((resolve, reject) => {
    fs.readFile(src, (err, file) => {
      if (file) resolve(file);
      else reject(err);
    });
    // LI(src)
    //   .then((img) => {
    //     img.
    //     console.log(img);
    //     const canvas = createCanvas(img.width, img.height);
    //     const ctx = canvas.getContext('2d');
    //     console.log(canvas);
    //     ctx.drawImage(img, 0, 0);
    //     console.log(ctx);
    //     let data = ctx.getImageData(0, 0, img.width, img.height);
    //     resolve(new Uint8Array(data.data.buffer));
    //   })
    //   .catch(reject);
  });

export const getImageAsPixels = async (
  pixels: string | tf.Tensor,
): Promise<{
  tensor: tf.Tensor4D;
  type: 'string' | 'HTMLImageElement' | 'tensor';
}> => {
  if (isString(pixels)) {
    const img = await loadImage(pixels);
    let tensor = tf.node.decodeImage(img).expandDims(0) as tf.Tensor4D;
    return {
      tensor: tensor,
      type: 'string',
    };
  }

  if (isFourDimensionalTensor(pixels)) {
    return {
      tensor: pixels,
      type: 'tensor',
    };
  }

  if (pixels.shape.length === 3) {
    return {
      tensor: pixels.expandDims(0) as tf.Tensor4D,
      type: 'tensor',
    };
  }

  throw new Error(
    [
      `Unsupported dimensions for incoming pixels: ${pixels.shape.length}.`,
      'Only 3 or 4 dimension tensors are supported.',
    ].join(' '),
  );
};

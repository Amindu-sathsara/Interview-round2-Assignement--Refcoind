/*import { Injectable } from '@nestjs/common';

@Injectable()
export class CloudinaryService {}

*/
import { Injectable } from '@nestjs/common';
import cloudinary from './cloudinary.config';
import { UploadApiResponse } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  async uploadImage(file: Express.Multer.File): Promise<UploadApiResponse> {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        folder: 'properties',
        resource_type: 'auto',
      },
      (error, result) => {
        if (error) {
          return reject(error);
        }
        if (!result) {
          return reject(new Error('Cloudinary returned empty result'));
        }

        resolve(result);
      },
    ).end(file.buffer);
  });
}

  async deleteImage(publicId: string) {
    return cloudinary.uploader.destroy(publicId);
  }
}

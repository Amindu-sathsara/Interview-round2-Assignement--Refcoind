/*import { Module } from '@nestjs/common';

@Module({})
export class CloudinaryModule {}
*/

import { Module } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';

@Module({
  providers: [CloudinaryService],
  exports: [CloudinaryService],
})
export class CloudinaryModule {}

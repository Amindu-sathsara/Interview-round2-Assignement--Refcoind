/*import { Controller } from '@nestjs/common';

@Controller('properties')
export class PropertiesController {}
*/

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
  HttpCode,
  HttpStatus,
  UsePipes,
  ValidationPipe,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { PropertiesService } from './properties.service';
import { CreatePropertyDto } from 'src/dto/create-property.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Controller('properties')
export class PropertiesController {
  constructor(
    private readonly propertiesService: PropertiesService,
    private readonly cloudinary:CloudinaryService

  ) {}

   @Post('upload-image')
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    const uploaded = await this.cloudinary.uploadImage(file);
    return {
      url: uploaded.secure_url,
      public_id: uploaded.public_id,
    };
  }

  //@Post()
  //@HttpCode(HttpStatus.CREATED)
  //@UsePipes(new ValidationPipe({ whitelist: true }))
  //async create(@Body() createPropertyDto: CreatePropertyDto) {
  //  return this.propertiesService.create(createPropertyDto);
  //}
  /*@Post()
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FileInterceptor('image'))
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createPropertyDto: CreatePropertyDto,
  ) {
    if (!file) {
      throw new BadRequestException('Image file is required');
    }

    const uploadedImage = await this.cloudinary.uploadImage(file);
    createPropertyDto.image = uploadedImage.secure_url;

    return this.propertiesService.create(createPropertyDto);
  }
*/
 @Post()
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async create(@Body() createPropertyDto: CreatePropertyDto) {
    // Check if image is provided and is a valid URL
    if (!createPropertyDto.image) {
      throw new BadRequestException('Image URL is required');
    }

    // Validate it's a proper URL
    try {
      new URL(createPropertyDto.image);
    } catch {
      throw new BadRequestException('Invalid image URL format');
    }

    return this.propertiesService.create(createPropertyDto);
  }
  
  @Get()
  async findAll() {
    return this.propertiesService.findAll();
  }

  @Get('location/:location')
  async findByLocation(@Param('location') location: string) {
    return this.propertiesService.findByLocation(location);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      throw new BadRequestException('Invalid ID format');
    }
    return this.propertiesService.remove(id);
  }
}
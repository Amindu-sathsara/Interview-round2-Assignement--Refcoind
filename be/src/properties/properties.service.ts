/*import { Injectable } from '@nestjs/common';

@Injectable()
export class PropertiesService {}
*/

import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Property, PropertyDocument } from '../schemas/property.schemas';
import { CreatePropertyDto } from 'src/dto/create-property.dto';

@Injectable()
export class PropertiesService {
  constructor(
    @InjectModel(Property.name)
    private propertyModel: Model<PropertyDocument>,
  ) {}

  async create(dto: CreatePropertyDto): Promise<Property> {
    // Check slug uniqueness
    const existing = await this.propertyModel.findOne({ slug: dto.slug });
    if (existing) {
      throw new ConflictException('Property with this slug already exists');
    }

    const property = new this.propertyModel(dto);
    return property.save();
  }

  async findAll(): Promise<Property[]> {
    return this.propertyModel.find().sort({ createdAt: -1 }).exec();
  }

  async findByLocation(location: string): Promise<Property[]> {
    if (!['Colombo', 'Kandy', 'Galle'].includes(location)) {
      throw new NotFoundException('Invalid location');
    }
    return this.propertyModel.find({ location }).exec();
  }

  async remove(id: string): Promise<void> {
    const result = await this.propertyModel.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      throw new NotFoundException('Property not found');
    }
  }
}
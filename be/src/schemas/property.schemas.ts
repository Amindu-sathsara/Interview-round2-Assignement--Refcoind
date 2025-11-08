import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PropertyDocument = Property & Document;

@Schema({ timestamps: true })
export class Property {
  @Prop({ required: true, trim: true })
  title: string;

  @Prop({ required: true })
  image: string;

  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  slug: string;

  @Prop({
    required: true,
    enum: ['Colombo', 'Kandy', 'Galle'],
  })
  location: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, min: 0 })
  price: number;

  @Prop({
    required: true,
    enum: ['Single Family', 'Villa'],
  })
  type: string;

  @Prop({
    required: true,
    enum: ['For Sale', 'For Rent'],
  })
  status: string;

  @Prop({ required: true, min: 1 })
  area: number;
}

export const PropertySchema = SchemaFactory.createForClass(Property);

// Index for search
PropertySchema.index({ location: 1 });
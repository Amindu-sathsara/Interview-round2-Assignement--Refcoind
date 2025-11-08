/*import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
  IsUrl,
  Matches,
} from 'class-validator';

export class CreatePropertyDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsUrl()
  @IsNotEmpty()
  image: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-z0-9-]+$/i, {
    message: 'Slug must contain only letters, numbers, and hyphens',
  })
  slug: string;

  @IsEnum(['Colombo', 'Kandy', 'Galle'])
  location: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsEnum(['Single Family', 'Villa'])
  type: string;

  @IsEnum(['For Sale', 'For Rent'])
  status: string;

  @IsNumber()
  @Min(1)
  area: number;
}*/
import { IsString, IsNumber, IsUrl, IsOptional, IsEnum, Min } from 'class-validator';

export class CreatePropertyDto {
  @IsString()
  title: string;

  @IsString()
  slug: string;

  @IsEnum(['Colombo', 'Kandy', 'Galle'])
  location: string;

  @IsString()
  description: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsEnum(['Single Family', 'Villa']) 
  type: string;

  @IsEnum(['For Sale', 'For Rent'])
  status: string;

  @IsNumber()
  @Min(1)
  area: number;

  @IsOptional()
  @IsUrl()
  image?: string;
}
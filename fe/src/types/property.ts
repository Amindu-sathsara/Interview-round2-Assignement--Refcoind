export interface Property {
  _id: string;
  title: string;
  image: string;
  slug: string;
  location: 'Colombo' | 'Kandy' | 'Galle';
  description: string;
  price: number;
  type: 'Single Family' | 'Villa';
  status: 'For Sale' | 'For Rent';
  area: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreatePropertyDto {
  title: string;
  slug: string;
  location: 'Colombo' | 'Kandy' | 'Galle';
  description: string;
  price: number;
  type: 'Single Family' | 'Villa';
  status: 'For Sale' | 'For Rent';
  area: number;
  image?: string;
}

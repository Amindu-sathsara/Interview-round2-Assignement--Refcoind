import { Property, CreatePropertyDto } from '@/types/property';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const propertyApi = {
  // Get all properties
  async getAll(): Promise<Property[]> {
    const response = await fetch(`${API_BASE_URL}/properties`, {
      cache: 'no-store',
    });
    if (!response.ok) throw new Error('Failed to fetch properties');
    return response.json();
  },

  // Get properties by location
  async getByLocation(location: string): Promise<Property[]> {
    const response = await fetch(`${API_BASE_URL}/properties/location/${location}`, {
      cache: 'no-store',
    });
    if (!response.ok) throw new Error('Failed to fetch properties by location');
    return response.json();
  },

  // Create new property
  async create(data: CreatePropertyDto): Promise<Property> {
    const response = await fetch(`${API_BASE_URL}/properties`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create property');
    }
    return response.json();
  },

  // Upload image to Cloudinary
  async uploadImage(file: File): Promise<{ url: string; public_id: string }> {
    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch(`${API_BASE_URL}/properties/upload-image`, {
      method: 'POST',
      body: formData,
    });
    if (!response.ok) throw new Error('Failed to upload image');
    return response.json();
  },

  // Delete property
  async delete(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/properties/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete property');
  },
};

'use client';

import Image from 'next/image';
import { MapPin, Maximize2 } from 'lucide-react';
import { Property } from '@/types/property';

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
      <div className="relative h-64 w-full">
        <Image
          src={property.image || '/placeholder.jpg'}
          alt={property.title}
          fill
          className="object-cover"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm font-medium">
            {property.status}
          </span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
          {property.title}
        </h3>

        <div className="flex items-center text-gray-600 mb-3">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{property.location}</span>
        </div>

        <div className="flex items-center text-gray-700 mb-4">
          <span className="text-sm bg-gray-100 px-3 py-1 rounded-full">
            {property.type}
          </span>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div className="text-2xl font-bold text-blue-600">
            {formatPrice(property.price)}
          </div>
          <div className="flex items-center text-gray-600">
            <Maximize2 className="h-4 w-4 mr-1" />
            <span className="text-sm font-medium">{property.area} sq ft</span>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import SearchBar, { SearchFilters } from '@/components/SearchBar';
import PropertyCard from '@/components/PropertyCard';
import { propertyApi } from '@/lib/api';
import { Property } from '@/types/property';

export default function Home() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    loadProperties();
  }, []);

  const loadProperties = async () => {
    try {
      setLoading(true);
      const data = await propertyApi.getAll();
      setProperties(data);
      setFilteredProperties(data);
    } catch (error) {
      console.error('Failed to load properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (filters: SearchFilters) => {
    let filtered = [...properties];

    if (filters.location) {
      filtered = filtered.filter((p) => p.location === filters.location);
    }
    if (filters.status) {
      filtered = filtered.filter((p) => p.status === filters.status);
    }
    if (filters.type) {
      filtered = filtered.filter((p) => p.type === filters.type);
    }

    setFilteredProperties(filtered);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProperties = filteredProperties.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      
      <div className="relative bg-gradient-to-r from-gray-800 to-gray-900 text-white">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Looking To Buy or Rent a Property?
            </h1>
            <p className="text-xl md:text-2xl mb-12">Find Your Dream Home</p>
            <div className="max-w-4xl mx-auto">
              <SearchBar onSearch={handleSearch} />
            </div>
          </div>
        </div>
      </div>

      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Loading properties...</p>
          </div>
        ) : filteredProperties.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No properties found matching your criteria.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentProperties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>

            
            {totalPages > 1 && (
              <div className="flex justify-center mt-12">
               <div className="flex items-center gap-3 px-4 py-2 bg-gray-100 rounded-lg shadow-sm border border-gray-100">
                <span className="text-gray-600 mr-4">
                  Total {filteredProperties.length} items
                </span>
                <button
      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
      disabled={currentPage === 1}
      className="px-3 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <span className="font-mono text-sm p-1">&lt;</span>
    </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors border-1 ${
                      currentPage === page
                        ? 'border-yellow-500 text-yellow-600 bg-yellow-50'
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
      disabled={currentPage === totalPages}
      className="px-3 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <span className="font-mono text-sm p-1">&gt;</span>
    </button>
      </div>
      </div>
       )}
      </>
        )}
      </div>
      
    </div>
  );
}

'use client';

import { Search } from 'lucide-react';
import { useState } from 'react';

interface SearchBarProps {
  onSearch: (filters: SearchFilters) => void;
}

export interface SearchFilters {
  location: string;
  status: string;
  type: string;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [filters, setFilters] = useState<SearchFilters>({
    location: '',
    status: '',
    type: '',
  });

  const handleSearch = () => {
    onSearch(filters);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 flex flex-wrap gap-4 items-end">
      <div className="flex-1 min-w-[200px]">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Location
        </label>
        <select
          value={filters.location}
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white text-gray-900"
        >
          <option value="">All Main Locations</option>
          <option value="Colombo">Colombo</option>
          <option value="Kandy">Kandy</option>
          <option value="Galle">Galle</option>
        </select>
      </div>

      <div className="flex-1 min-w-[200px]">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Status
        </label>
        <select
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white text-gray-900"
        >
          <option value="">All Status</option>
          <option value="For Sale">For Sale</option>
          <option value="For Rent">For Rent</option>
        </select>
      </div>

      <div className="flex-1 min-w-[200px]">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Type
        </label>
        <select
          value={filters.type}
          onChange={(e) => setFilters({ ...filters, type: e.target.value })}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white text-gray-900"
        >
          <option value="">All Types</option>
          <option value="Single Family">Single Family</option>
          <option value="Villa">Villa</option>
        </select>
      </div>

      <button
        onClick={handleSearch}
        className="bg-blue-400 text-white px-8 py-2.5 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 font-medium"
      >
        <Search className="h-5 w-5" />
        Search
      </button>
    </div>
  );
}

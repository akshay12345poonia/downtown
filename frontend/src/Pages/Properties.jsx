import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Bed, Bath, Maximize, Search, SlidersHorizontal, X } from 'lucide-react';
import { getProperties } from '../Services/Api';

const PLACEHOLDER_IMG = 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80';

const formatPrice = (price) => {
  if (price >= 10000000) return `₹${(price / 10000000).toFixed(1)}Cr`;
  if (price >= 100000) return `₹${(price / 100000).toFixed(1)}L`;
  return `₹${price?.toLocaleString()}`;
};

const PropertyCard = ({ prop, onClick }) => (
  <div className="property-card cursor-pointer group" onClick={onClick}>
    <div className="relative overflow-hidden h-56">
      <img
        src={prop.images?.[0] || PLACEHOLDER_IMG}
        alt={prop.title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute top-4 left-4 flex flex-col gap-2">
        <span className={`badge ${prop.type === 'for-rent' ? 'badge-gold' : 'badge-blue'}`}>
          {prop.type === 'for-rent' ? 'For Rent' : 'For Sale'}
        </span>
        {prop.status === 'sold' && <span className="badge badge-red">Sold</span>}
        {prop.status === 'rented' && <span className="badge badge-gold">Rented</span>}
      </div>
      {prop.featured && (
        <div className="absolute top-4 right-4">
          <span className="badge badge-gold">⭐ Featured</span>
        </div>
      )}
    </div>
    <div className="property-card-body">
      <div className="property-price">{formatPrice(prop.price)}</div>
      <h3 className="property-title group-hover:text-brand transition-colors">{prop.title}</h3>
      <p className="property-location"><MapPin size={13} className="text-brand/70" /> {prop.location}</p>
      <div className="property-meta">
        <span className="property-meta-item"><Bed size={15} /> {prop.bedrooms} Bed</span>
        <span className="property-meta-item"><Bath size={15} /> {prop.bathrooms} Bath</span>
        <span className="property-meta-item"><Maximize size={15} /> {prop.area} sqft</span>
      </div>
      {prop.propertyType && (
        <div className="mt-4">
          <span className="badge badge-gray">{prop.propertyType}</span>
        </div>
      )}
    </div>
  </div>
);

const Properties = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ location: '', status: '', type: '', propertyType: '', minPrice: '', maxPrice: '' });
  const [applied, setApplied] = useState({});

  const fetchProperties = useCallback(async (params = {}) => {
    setLoading(true);
    try {
      const res = await getProperties(params);
      setProperties(res.data.data.properties);
    } catch {
      setProperties([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchProperties(); }, [fetchProperties]);

  const applyFilters = () => {
    const params = {};
    if (filters.location) params.location = filters.location;
    if (filters.status) params.status = filters.status;
    if (filters.type) params.type = filters.type;
    if (filters.minPrice) params.minPrice = filters.minPrice;
    if (filters.maxPrice) params.maxPrice = filters.maxPrice;
    setApplied(params);
    fetchProperties(params);
  };

  const clearFilters = () => {
    setFilters({ location: '', status: '', type: '', propertyType: '', minPrice: '', maxPrice: '' });
    setApplied({});
    fetchProperties();
  };

  const hasFilters = Object.values(applied).some(v => v);

  return (
    <div className="bg-surface-muted min-h-screen">
      {/* Page Hero */}
      <div className="relative bg-text py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand/20 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-2 mb-6 text-white/50 text-sm font-medium">
            <span onClick={() => navigate('/')} className="hover:text-brand transition-colors cursor-pointer">Home</span>
            <span>/</span>
            <span className="text-white">Properties</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">Discover Your Next Home</h1>
          <p className="text-white/60 text-lg max-w-2xl">Browse our carefully curated directory of residential and commercial properties.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Filter Section */}
        <div className="bg-white p-8 rounded-3xl shadow-lg shadow-brand/5 border border-border/40 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 items-end">
            <div className="lg:col-span-1">
              <label className="form-label">Location</label>
              <div className="input-group">
                <Search size={16} className="text-text-muted" />
                <input
                  className="form-input"
                  value={filters.location}
                  onChange={e => setFilters(p => ({ ...p, location: e.target.value }))}
                  onKeyDown={e => e.key === 'Enter' && applyFilters()}
                  placeholder="Anywhere..."
                />
              </div>
            </div>

            <div>
              <label className="form-label">Listing Type</label>
              <select
                className="input-group w-full appearance-none cursor-pointer outline-none text-sm"
                value={filters.type}
                onChange={e => setFilters(p => ({ ...p, type: e.target.value }))}
              >
                <option value="">All Types</option>
                <option value="for-sale">For Sale</option>
                <option value="for-rent">For Rent</option>
              </select>
            </div>

            <div>
              <label className="form-label">Min Price (₹)</label>
              <input
                className="input-group w-full outline-none text-sm"
                type="number"
                placeholder="5,00,000"
                value={filters.minPrice}
                onChange={e => setFilters(p => ({ ...p, minPrice: e.target.value }))}
              />
            </div>

            <div>
              <label className="form-label">Max Price (₹)</label>
              <input
                className="input-group w-full outline-none text-sm"
                type="number"
                placeholder="10,00,00,000"
                value={filters.maxPrice}
                onChange={e => setFilters(p => ({ ...p, maxPrice: e.target.value }))}
              />
            </div>

            <div className="flex gap-2">
              <button
                className="btn btn-primary flex-1 shadow-md"
                onClick={applyFilters}
              >
                <SlidersHorizontal size={16} /> Filter
              </button>
              {hasFilters && (
                <button
                  className="btn btn-secondary px-4 bg-red-50 text-red-600 hover:bg-red-100"
                  onClick={clearFilters}
                  title="Clear all filters"
                >
                  <X size={18} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-xl font-black text-text">{properties.length} Results</span>
            {hasFilters && <span className="ml-3 px-2 py-0.5 bg-brand/10 text-brand text-xs font-bold rounded">Filtered</span>}
          </div>
        </div>

        {/* Property Grid */}
        {loading ? (
          <div className="flex justify-center py-32">
            <div className="spinner" />
          </div>
        ) : properties.length === 0 ? (
          <div className="bg-white rounded-3xl p-20 text-center border-2 border-dashed border-border">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search size={40} className="text-slate-300" />
            </div>
            <h3 className="text-2xl font-bold text-text mb-2">No Matching Properties</h3>
            <p className="text-text-muted mb-8 max-w-md mx-auto">We couldn't find any listings matching your current criteria. Try widening your search or clearing filters.</p>
            <button className="btn btn-primary" onClick={clearFilters}>Clear Search Filters</button>
          </div>
        ) : (
          <div className="grid-3">
            {properties.map(p => (
              <PropertyCard key={p._id} prop={p} onClick={() => navigate(`/properties/${p._id}`)} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Properties;
import React, { useState, useMemo, useEffect } from 'react';
import ProductCard from './ProductCard';
import { Filter, SlidersHorizontal, Sparkles, Crown, Gem, Check, ChevronDown } from 'lucide-react';

export default function ProductGrid({ products = [], initialCategory = 'All' }) {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedSort, setSelectedSort] = useState('featured');
  const [priceFilter, setPriceFilter] = useState('all');

  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  const categories = [
    { label: 'All Celebrations', value: 'All' },
    { label: 'Men (Manyavar)', value: 'Men' },
    { label: 'Women (Mohey)', value: 'Women' },
    { label: 'Banarasi Sarees', value: 'Banarasi Sarees' },
    { label: 'Bridal Lehengas', value: 'Lehengas' },
    { label: 'Kurtis & Suits', value: 'Kurtis & Suits' },
    { label: 'Sherwanis', value: 'Sherwanis' },
    { label: 'Kurta Sets', value: 'Kurta Sets' }
  ];

  const filteredProducts = useMemo(() => {
    let list = [...products];

    if (selectedCategory !== 'All') {
      if (selectedCategory === 'Men') {
        list = list.filter(p => p.gender === 'Men' || p.category === 'Sherwanis' || p.category === 'Kurta Sets' || p.category === 'Indo-Western');
      } else if (selectedCategory === 'Women') {
        list = list.filter(p => p.gender === 'Women' || p.category === 'Banarasi Sarees' || p.category === 'Lehengas' || p.category === 'Kurtis & Suits' || p.category === 'Sarees');
      } else if (selectedCategory === 'Banarasi Sarees' || selectedCategory === 'Sarees') {
        list = list.filter(p => p.category.toLowerCase().includes('saree') || p.name.toLowerCase().includes('saree') || p.name.toLowerCase().includes('banarasi'));
      } else {
        list = list.filter(p => 
          p.category.toLowerCase() === selectedCategory.toLowerCase() ||
          p.subCategory?.toLowerCase() === selectedCategory.toLowerCase()
        );
      }
    }

    if (priceFilter === 'under25k') {
      list = list.filter(p => p.price < 25000);
    } else if (priceFilter === '25k-45k') {
      list = list.filter(p => p.price >= 25000 && p.price <= 45000);
    } else if (priceFilter === 'above45k') {
      list = list.filter(p => p.price > 45000);
    }

    if (selectedSort === 'price-low') {
      list.sort((a, b) => a.price - b.price);
    } else if (selectedSort === 'price-high') {
      list.sort((a, b) => b.price - a.price);
    } else if (selectedSort === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [products, selectedCategory, selectedSort, priceFilter]);

  return (
    <section id="products" className="max-w-7xl mx-auto px-6 py-16">
      {/* Title Header */}
      <div className="text-center mb-10 space-y-3">
        <div className="inline-flex items-center gap-2 text-gold font-cinzel text-xs tracking-[0.3em] uppercase font-semibold">
          <Sparkles size={13} />
          <span>Curated Festive & Bridal Catalog</span>
          <Sparkles size={13} />
        </div>

        <h2 className="font-display text-3xl sm:text-5xl font-normal text-ivory tracking-wide">
          Manyavar & Mohey Masterpieces
        </h2>

        <p className="font-editorial italic text-lg text-[#c4c0b8] max-w-2xl mx-auto">
          Handwoven Katan silk sarees, 32-kali royal bridal lehengas, and groom's shahi raw silk sherwanis tailored for unforgettable memories.
        </p>
      </div>

      {/* Category Tabs Strip */}
      <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.value;
          return (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-5 py-2.5 rounded-full font-cinzel text-xs tracking-wider uppercase whitespace-nowrap transition-all duration-300 cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-gold via-gold-bright to-gold-dark text-black font-bold shadow-lg shadow-gold/25'
                  : 'bg-[#14141a] text-[#d6cbb8] hover:bg-gold/15 hover:text-white border border-white/10'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Filter and Count Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 py-4 mb-8 border-y border-white/10 text-xs text-[#a09885]">
        <div className="font-cinzel tracking-wider text-gold-rich font-semibold uppercase">
          Showing <span className="text-white font-bold">{filteredProducts.length}</span> Masterpieces
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4">
          {/* Price Range Filter */}
          <div className="flex items-center gap-1.5 bg-[#14141a] border border-white/10 px-3 py-1.5 rounded-sm">
            <span className="text-white/60">Price:</span>
            <select
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
              className="bg-transparent text-gold font-cinzel outline-none cursor-pointer"
            >
              <option value="all" className="bg-[#121217]">All Prices</option>
              <option value="under25k" className="bg-[#121217]">Under ₹25,000</option>
              <option value="25k-45k" className="bg-[#121217]">₹25,000 - ₹45,000</option>
              <option value="above45k" className="bg-[#121217]">Above ₹45,000</option>
            </select>
          </div>

          {/* Sort By Filter */}
          <div className="flex items-center gap-1.5 bg-[#14141a] border border-white/10 px-3 py-1.5 rounded-sm">
            <span className="text-white/60">Sort:</span>
            <select
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value)}
              className="bg-transparent text-gold font-cinzel outline-none cursor-pointer"
            >
              <option value="featured" className="bg-[#121217]">Featured</option>
              <option value="price-low" className="bg-[#121217]">Price: Low to High</option>
              <option value="price-high" className="bg-[#121217]">Price: High to Low</option>
              <option value="rating" className="bg-[#121217]">Top Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

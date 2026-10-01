import React, { useState, useMemo } from 'react';
import ProductCard from './ProductCard';
import { Filter, SlidersHorizontal, Sparkles, LayoutGrid, Check } from 'lucide-react';

export default function ProductGrid({ products = [], initialCategory = 'All' }) {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedSort, setSelectedSort] = useState('featured');
  const [priceFilter, setPriceFilter] = useState('all');

  const categories = ['All', 'Banarasi Sarees', 'Lehengas', 'Sarees', 'Anarkalis'];

  const filteredProducts = useMemo(() => {
    let list = [...products];

    if (selectedCategory !== 'All') {
      if (selectedCategory === 'Sarees') {
        list = list.filter(p => p.category.toLowerCase().includes('saree'));
      } else {
        list = list.filter(p => p.category.toLowerCase() === selectedCategory.toLowerCase());
      }
    }

    if (priceFilter === 'under25k') {
      list = list.filter(p => p.price < 25000);
    } else if (priceFilter === '25k-40k') {
      list = list.filter(p => p.price >= 25000 && p.price <= 40000);
    } else if (priceFilter === 'above40k') {
      list = list.filter(p => p.price > 40000);
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
    <section 
      id="products"
      style={{
        maxWidth: '1440px',
        margin: '0 auto',
        padding: '80px 32px'
      }}
    >
      {/* Title & Editorial Subtext */}
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          color: '#c5a059',
          fontFamily: 'var(--font-cinzel)',
          fontSize: '0.78rem',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          marginBottom: '12px'
        }}>
          <Sparkles size={14} />
          <span>The Atelier Permanent Archive</span>
        </div>

        <h2 style={{
          fontFamily: 'var(--font-serif-display)',
          fontSize: 'clamp(2.4rem, 4.5vw, 3.6rem)',
          color: '#faf8f5',
          fontWeight: 400,
          letterSpacing: '0.03em'
        }}>
          Signature Silhouettes
        </h2>

        <p style={{
          fontFamily: 'var(--font-serif-editorial)',
          fontSize: '1.15rem',
          color: '#a0a0aa',
          maxWidth: '580px',
          margin: '12px auto 0 auto'
        }}>
          Handwoven silk tapestries, zari embroideries, and couture ensembles curated for weddings and grand soirées.
        </p>
      </div>

      {/* Filter & Sort Toolbar */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '20px',
        borderBottom: '1px solid rgba(197, 160, 89, 0.2)',
        paddingBottom: '24px',
        marginBottom: '40px'
      }}>
        {/* Category Tabs */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '8px 18px',
                background: selectedCategory === cat ? '#c5a059' : 'rgba(255, 255, 255, 0.04)',
                color: selectedCategory === cat ? '#0c0c0e' : '#d1cdc7',
                border: selectedCategory === cat ? '1px solid #c5a059' : '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '2px',
                fontFamily: 'var(--font-cinzel)',
                fontSize: '0.75rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontWeight: selectedCategory === cat ? 700 : 400
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sort & Price Filter Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-cinzel)', color: '#a0a0aa', letterSpacing: '0.1em' }}>
              PRICE:
            </span>
            <select
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
              style={{
                background: '#18181d',
                color: '#faf8f5',
                border: '1px solid rgba(197, 160, 89, 0.3)',
                padding: '7px 12px',
                fontSize: '0.75rem',
                fontFamily: 'var(--font-sans)',
                borderRadius: '2px',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="all">All Values</option>
              <option value="under25k">Under ₹25,000</option>
              <option value="25k-40k">₹25,000 - ₹40,000</option>
              <option value="above40k">Above ₹40,000</option>
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-cinzel)', color: '#a0a0aa', letterSpacing: '0.1em' }}>
              SORT:
            </span>
            <select
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value)}
              style={{
                background: '#18181d',
                color: '#faf8f5',
                border: '1px solid rgba(197, 160, 89, 0.3)',
                padding: '7px 12px',
                fontSize: '0.75rem',
                fontFamily: 'var(--font-sans)',
                borderRadius: '2px',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="featured">Editorial Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product Count Display */}
      <div style={{
        marginBottom: '24px',
        fontSize: '0.78rem',
        letterSpacing: '0.12em',
        color: '#8e8e99',
        fontFamily: 'var(--font-cinzel)'
      }}>
        SHOWING {filteredProducts.length} HAUTE COUTURE CREATIONS
      </div>

      {/* Grid of Products */}
      {filteredProducts.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '80px 20px',
          background: '#121217',
          border: '1px dashed rgba(197, 160, 89, 0.3)',
          borderRadius: '2px'
        }}>
          <Sparkles size={32} color="#c5a059" style={{ margin: '0 auto 16px auto' }} />
          <h3 style={{ fontFamily: 'var(--font-serif-display)', fontSize: '1.6rem', color: '#faf8f5', marginBottom: '8px' }}>
            No Silhouettes in this Filter
          </h3>
          <p style={{ color: '#9d9da6', fontSize: '0.9rem', marginBottom: '20px' }}>
            Kindly reset your filters to view the full Atelier collection.
          </p>
          <button 
            onClick={() => { setSelectedCategory('All'); setPriceFilter('all'); }}
            className="btn-couture"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '32px'
        }}>
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}

import React, { useState, useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';

export default function SearchModal({ products = [] }) {
  const { isSearchOpen, setIsSearchOpen, setSelectedProduct, formatPrice } = useShop();
  const [searchTerm, setSearchTerm] = useState('');

  const searchResults = useMemo(() => {
    if (!searchTerm.trim()) return [];
    const q = searchTerm.toLowerCase();
    return products.filter(p => 
      p.name.toLowerCase().includes(q) ||
      p.tagline.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    );
  }, [searchTerm, products]);

  if (!isSearchOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 220,
      background: 'rgba(9, 9, 11, 0.94)',
      backdropFilter: 'blur(20px)',
      display: 'flex',
      flexDirection: 'column',
      padding: '40px 20px',
      overflowY: 'auto'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        width: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Top Bar with Close */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
          <button
            onClick={() => setIsSearchOpen(false)}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#d1cdc7',
              cursor: 'pointer',
              padding: '6px'
            }}
          >
            <X size={26} />
          </button>
        </div>

        {/* Search Input */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          borderBottom: '2px solid #c5a059',
          paddingBottom: '16px',
          marginBottom: '32px'
        }}>
          <Search size={28} color="#c5a059" />
          <input
            type="text"
            placeholder="Search organza sarees, tilla lehengas, banarasi weaves..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              color: '#faf8f5',
              fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
              fontFamily: 'var(--font-serif-display)',
              outline: 'none',
              letterSpacing: '0.04em'
            }}
          />
        </div>

        {/* Quick Suggestion Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '32px' }}>
          <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-cinzel)', color: '#888894', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Sparkles size={12} color="#c5a059" /> POPULAR SEARCHES:
          </span>
          {['Organza Saree', 'Tilla Lehenga', 'Banarasi Silk', 'Cape Set', 'Polki Choker'].map(tag => (
            <button
              key={tag}
              onClick={() => setSearchTerm(tag)}
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(197, 160, 89, 0.25)',
                color: '#eaddc5',
                padding: '4px 12px',
                borderRadius: '100px',
                fontSize: '0.75rem',
                cursor: 'pointer'
              }}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results Showcase */}
        <div>
          {searchTerm.trim() !== '' && (
            <div style={{
              fontFamily: 'var(--font-cinzel)',
              fontSize: '0.78rem',
              color: '#a0a0aa',
              letterSpacing: '0.12em',
              marginBottom: '20px'
            }}>
              FOUND {searchResults.length} SILHOUETTES
            </div>
          )}

          {searchResults.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {searchResults.map(prod => (
                <div
                  key={prod.id}
                  onClick={() => {
                    setSelectedProduct(prod);
                    setIsSearchOpen(false);
                  }}
                  className="glass-card"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '20px',
                    padding: '14px',
                    borderRadius: '2px',
                    cursor: 'pointer',
                    border: '1px solid rgba(255, 255, 255, 0.08)'
                  }}
                >
                  <img 
                    src={prod.images?.[0]} 
                    alt={prod.name}
                    style={{ width: '60px', height: '80px', objectFit: 'cover', borderRadius: '2px' }}
                  />

                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.68rem', fontFamily: 'var(--font-cinzel)', color: '#c5a059', letterSpacing: '0.15em' }}>
                      {prod.category} • {prod.collection}
                    </div>
                    <h4 style={{ fontFamily: 'var(--font-serif-display)', fontSize: '1.2rem', color: '#faf8f5' }}>
                      {prod.name}
                    </h4>
                    <p style={{ fontSize: '0.82rem', color: '#9d9da6' }}>
                      {prod.tagline}
                    </p>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontFamily: 'var(--font-cinzel)', fontSize: '1rem', color: '#faf8f5', fontWeight: 600 }}>
                      {formatPrice(prod.price)}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#c5a059', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'flex-end' }}>
                      <span>View</span>
                      <ArrowRight size={12} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : searchTerm.trim() !== '' ? (
            <div style={{ textAlign: 'center', padding: '40px 0', color: '#888894' }}>
              No masterworks found matching "{searchTerm}".
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

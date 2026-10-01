import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import ProductCard from './ProductCard';
import { ArrowLeft, Sparkles, Layers, ShieldCheck, Crown, Flame, Gem } from 'lucide-react';

export default function CollectionsPage({ collections = [], products = [], onBackHome }) {
  const [selectedCollectionId, setSelectedCollectionId] = useState('all');
  const [selectedCategoryType, setSelectedCategoryType] = useState('All');
  const { setSelectedProduct, setIsBespokeOpen } = useShop();

  const categories = [
    { name: 'All', icon: Sparkles },
    { name: 'Banarasi Sarees', icon: Crown },
    { name: 'Lehengas', icon: Gem },
    { name: 'Sarees', icon: Layers },
    { name: 'Anarkalis', icon: Flame }
  ];

  // Filter collections by selected tab
  const activeCollections = selectedCollectionId === 'all'
    ? collections
    : collections.filter(c => c.id === selectedCollectionId);

  return (
    <div style={{
      minHeight: '100vh',
      background: '#070709',
      color: '#faf8f5',
      paddingTop: '40px',
      paddingBottom: '120px'
    }}>
      {/* Top Header & Breadcrumb */}
      <div style={{
        maxWidth: '1440px',
        margin: '0 auto',
        padding: '0 32px',
        marginBottom: '40px'
      }}>
        <button
          onClick={onBackHome}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#c5a059',
            fontFamily: 'var(--font-cinzel)',
            fontSize: '0.78rem',
            letterSpacing: '0.18em',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            padding: '8px 0',
            textTransform: 'uppercase',
            marginBottom: '24px',
            transition: 'transform 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateX(-4px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateX(0)'}
        >
          <ArrowLeft size={16} />
          <span>Return to Atelier Salon</span>
        </button>

        {/* Editorial Heading */}
        <div style={{ textAlign: 'center', maxWidth: '860px', margin: '0 auto 48px auto' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: '#c5a059',
            fontFamily: 'var(--font-cinzel)',
            fontSize: '0.8rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            marginBottom: '14px'
          }}>
            <Crown size={15} color="#c5a059" />
            <span>The Imperial Haute Couture Archives</span>
            <Crown size={15} color="#c5a059" />
          </div>

          <h1 style={{
            fontFamily: 'var(--font-serif-display)',
            fontSize: 'clamp(2.5rem, 5vw, 4.4rem)',
            fontWeight: 400,
            lineHeight: 1.08,
            color: '#faf8f5',
            letterSpacing: '0.02em',
            marginBottom: '16px'
          }}>
            Sacred Banarasi & Royal Lehenga Editions
          </h1>

          <p style={{
            fontFamily: 'var(--font-serif-editorial)',
            fontSize: '1.25rem',
            color: '#c4c0b8',
            lineHeight: 1.6
          }}>
            Immerse in the timeless opulence of authentic Varanasi Kadwa silk sarees, 32-kali bridal lehengas laden in pure Kashmiri Tilla wirework, and pure heirloom handlooms.
          </p>
        </div>

        {/* Category Pill Filters */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '10px',
          marginBottom: '28px'
        }}>
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = selectedCategoryType === cat.name;
            return (
              <button
                key={cat.name}
                onClick={() => setSelectedCategoryType(cat.name)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 20px',
                  borderRadius: '30px',
                  background: isActive ? '#c5a059' : 'rgba(22, 22, 28, 0.7)',
                  color: isActive ? '#09090b' : '#d6cbb8',
                  border: isActive ? '1px solid #c5a059' : '1px solid rgba(197, 160, 89, 0.25)',
                  fontSize: '0.76rem',
                  fontFamily: 'var(--font-cinzel)',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  fontWeight: isActive ? 700 : 500,
                  transition: 'all 0.3s ease'
                }}
              >
                <Icon size={13} color={isActive ? '#09090b' : '#c5a059'} />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Collection Filter Tabs */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '12px',
          borderBottom: '1px solid rgba(197, 160, 89, 0.2)',
          paddingBottom: '24px',
          marginBottom: '50px'
        }}>
          <button
            onClick={() => setSelectedCollectionId('all')}
            style={{
              padding: '10px 24px',
              background: selectedCollectionId === 'all' ? '#c5a059' : 'rgba(24, 24, 29, 0.6)',
              color: selectedCollectionId === 'all' ? '#0c0c0e' : '#eaddc5',
              border: selectedCollectionId === 'all' ? '1px solid #c5a059' : '1px solid rgba(197, 160, 89, 0.3)',
              borderRadius: '2px',
              fontFamily: 'var(--font-cinzel)',
              fontSize: '0.78rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              fontWeight: selectedCollectionId === 'all' ? 700 : 500,
              transition: 'all 0.3s'
            }}
          >
            All Archives ({collections.length})
          </button>

          {collections.map(col => (
            <button
              key={col.id}
              onClick={() => setSelectedCollectionId(col.id)}
              style={{
                padding: '10px 24px',
                background: selectedCollectionId === col.id ? '#c5a059' : 'rgba(24, 24, 29, 0.6)',
                color: selectedCollectionId === col.id ? '#0c0c0e' : '#eaddc5',
                border: selectedCollectionId === col.id ? '1px solid #c5a059' : '1px solid rgba(197, 160, 89, 0.3)',
                borderRadius: '2px',
                fontFamily: 'var(--font-cinzel)',
                fontSize: '0.78rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                fontWeight: selectedCollectionId === col.id ? 700 : 500,
                transition: 'all 0.3s'
              }}
            >
              {col.title}
            </button>
          ))}
        </div>
      </div>

      {/* Main Collections List */}
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 32px', display: 'flex', flexDirection: 'column', gap: '80px' }}>
        {activeCollections.map((collection) => {
          // Find products in this collection with optional category filter
          let colProducts = products.filter(p => 
            p.collection.toLowerCase().includes(collection.title.toLowerCase()) || 
            p.collection.toLowerCase() === collection.id.toLowerCase() ||
            (collection.id === 'banarasi-kashi-heritage' && (p.category === 'Banarasi Sarees' || p.name.includes('Banarasi'))) ||
            (collection.id === 'imperial-bridal-lehengas' && (p.category === 'Lehengas' || p.name.includes('Lehenga'))) ||
            (collection.id === 'spring-atelier-2026' && p.collection.includes('Spring')) ||
            (collection.id === 'regalia-handlooms' && (p.category.includes('Saree') || p.collection.includes('Regalia')))
          );

          if (selectedCategoryType !== 'All') {
            colProducts = colProducts.filter(p => 
              p.category.toLowerCase() === selectedCategoryType.toLowerCase() ||
              (selectedCategoryType === 'Sarees' && (p.category === 'Sarees' || p.category === 'Banarasi Sarees'))
            );
          }

          if (colProducts.length === 0 && selectedCategoryType !== 'All') {
            return null;
          }

          return (
            <div 
              key={collection.id}
              style={{
                background: '#0d0d12',
                border: '1px solid rgba(197, 160, 89, 0.3)',
                borderRadius: '4px',
                overflow: 'hidden',
                boxShadow: '0 20px 60px rgba(0,0,0,0.7)'
              }}
            >
              {/* Collection Feature Banner */}
              <div style={{
                position: 'relative',
                minHeight: '440px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: '48px',
                overflow: 'hidden'
              }}>
                <img 
                  src={collection.image} 
                  alt={collection.title}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    zIndex: 0,
                    filter: 'brightness(0.55) contrast(1.1)'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(0deg, #0d0d12 0%, rgba(13,13,18,0.7) 45%, rgba(13,13,18,0.2) 100%)',
                  zIndex: 1
                }} />

                <div style={{ position: 'relative', zIndex: 2, maxWidth: '780px' }}>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '14px' }}>
                    <span style={{
                      background: '#c5a059',
                      color: '#09090b',
                      fontSize: '0.72rem',
                      fontFamily: 'var(--font-cinzel)',
                      fontWeight: 700,
                      letterSpacing: '0.15em',
                      padding: '4px 12px',
                      textTransform: 'uppercase',
                      borderRadius: '2px'
                    }}>
                      {collection.badge}
                    </span>
                    <span style={{
                      fontSize: '0.8rem',
                      color: '#eaddc5',
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      fontFamily: 'var(--font-cinzel)'
                    }}>
                      {collection.itemCount}
                    </span>
                  </div>

                  <h2 style={{
                    fontFamily: 'var(--font-serif-display)',
                    fontSize: 'clamp(2rem, 4vw, 3.2rem)',
                    fontWeight: 400,
                    lineHeight: 1.12,
                    marginBottom: '10px',
                    color: '#faf8f5'
                  }}>
                    {collection.title}
                  </h2>

                  <p style={{
                    fontFamily: 'var(--font-serif-editorial)',
                    fontStyle: 'italic',
                    fontSize: '1.25rem',
                    color: '#c5a059',
                    marginBottom: '14px'
                  }}>
                    {collection.subtitle}
                  </p>

                  <p style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.98rem',
                    color: '#c4c0b8',
                    lineHeight: 1.6,
                    maxWidth: '640px',
                    marginBottom: '24px'
                  }}>
                    {collection.description}
                  </p>

                  <button
                    onClick={() => setIsBespokeOpen(true)}
                    style={{
                      padding: '12px 28px',
                      background: 'linear-gradient(135deg, #c5a059 0%, #a47e3b 100%)',
                      color: '#0a0a0c',
                      border: 'none',
                      fontFamily: 'var(--font-cinzel)',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      boxShadow: '0 8px 24px rgba(197, 160, 89, 0.35)',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <Sparkles size={14} />
                    <span>Book Private Salon Consultation</span>
                  </button>
                </div>
              </div>

              {/* Products in Collection Grid */}
              <div style={{ padding: '40px 32px 50px 32px' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '28px',
                  borderBottom: '1px solid rgba(197, 160, 89, 0.15)',
                  paddingBottom: '16px'
                }}>
                  <div style={{
                    fontFamily: 'var(--font-cinzel)',
                    fontSize: '0.85rem',
                    letterSpacing: '0.2em',
                    color: '#c5a059',
                    textTransform: 'uppercase'
                  }}>
                    Curated Silhouettes ({colProducts.length})
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#a09885', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <ShieldCheck size={14} color="#c5a059" />
                    <span>Silk Mark & Karigar Certified</span>
                  </div>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                  gap: '28px'
                }}>
                  {colProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

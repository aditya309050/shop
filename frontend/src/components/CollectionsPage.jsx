import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import ProductCard from './ProductCard';
import { ArrowLeft, Sparkles, Layers, Compass, ShieldCheck, Star } from 'lucide-react';

export default function CollectionsPage({ collections = [], products = [], onBackHome }) {
  const [selectedCollectionId, setSelectedCollectionId] = useState('all');
  const { setSelectedProduct } = useShop();

  const filteredCollections = selectedCollectionId === 'all'
    ? collections
    : collections.filter(c => c.id === selectedCollectionId);

  return (
    <div style={{
      minHeight: '100vh',
      background: '#09090b',
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
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 48px auto' }}>
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
            <Sparkles size={14} />
            <span>The Permanent Haute Couture Archives</span>
          </div>

          <h1 style={{
            fontFamily: 'var(--font-serif-display)',
            fontSize: 'clamp(2.5rem, 5vw, 4.2rem)',
            fontWeight: 400,
            lineHeight: 1.08,
            color: '#faf8f5',
            letterSpacing: '0.02em',
            marginBottom: '16px'
          }}>
            All Atelier Collections
          </h1>

          <p style={{
            fontFamily: 'var(--font-serif-editorial)',
            fontSize: '1.2rem',
            color: '#c4c0b8',
            lineHeight: 1.6
          }}>
            Explore our curated seasonal campaigns, sacred handloom archives, and bespoke bridal masterpieces.
            Each collection represents hundreds of hours of devoted Indian karigar handcraft.
          </p>
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
            All Collections ({collections.length})
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
        {filteredCollections.map((collection, idx) => {
          // Find products in this collection
          const collectionProducts = products.filter(p => 
            p.collection.toLowerCase().includes(collection.title.toLowerCase()) || 
            p.collection.toLowerCase() === collection.id.toLowerCase() ||
            (collection.id === 'spring-atelier-2026' && p.collection.includes('Spring')) ||
            (collection.id === 'nocturne-heritage' && p.collection.includes('Nocturne')) ||
            (collection.id === 'regalia-2026' && p.collection.includes('Regalia'))
          );

          return (
            <div 
              key={collection.id}
              style={{
                background: '#121217',
                border: '1px solid rgba(197, 160, 89, 0.25)',
                borderRadius: '2px',
                overflow: 'hidden'
              }}
            >
              {/* Collection Feature Banner */}
              <div style={{
                position: 'relative',
                minHeight: '420px',
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
                    filter: 'brightness(0.65) contrast(1.1)'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(9,9,11,0.2) 0%, rgba(9,9,11,0.6) 40%, rgba(18,18,23,0.98) 100%)'
                }} />

                <div style={{ position: 'relative', zIndex: 10, maxWidth: '780px' }}>
                  <div style={{
                    display: 'inline-block',
                    background: 'rgba(197, 160, 89, 0.25)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(197, 160, 89, 0.4)',
                    color: '#f8e8cf',
                    padding: '4px 14px',
                    fontSize: '0.72rem',
                    fontFamily: 'var(--font-cinzel)',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    marginBottom: '14px'
                  }}>
                    {collection.badge || collection.tag || 'Haute Edition'}
                  </div>

                  <div style={{
                    fontSize: '0.85rem',
                    fontFamily: 'var(--font-cinzel)',
                    letterSpacing: '0.22em',
                    color: '#c5a059',
                    textTransform: 'uppercase',
                    marginBottom: '6px'
                  }}>
                    {collection.subtitle}
                  </div>

                  <h2 style={{
                    fontFamily: 'var(--font-serif-display)',
                    fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
                    color: '#faf8f5',
                    marginBottom: '14px',
                    fontWeight: 400
                  }}>
                    {collection.title}
                  </h2>

                  <p style={{
                    fontFamily: 'var(--font-serif-editorial)',
                    fontSize: '1.15rem',
                    color: '#d6d2ca',
                    lineHeight: 1.6,
                    marginBottom: '16px'
                  }}>
                    {collection.description}
                  </p>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '24px',
                    fontSize: '0.78rem',
                    fontFamily: 'var(--font-cinzel)',
                    color: '#a0a0aa'
                  }}>
                    <span>{collectionProducts.length} Silhouettes in Atelier Archive</span>
                    <span>•</span>
                    <span style={{ color: '#22c55e', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <ShieldCheck size={14} /> Ready for Private Viewing & Bespoke Draping
                    </span>
                  </div>
                </div>
              </div>

              {/* Products in this Collection */}
              <div style={{ padding: '40px' }}>
                <div style={{
                  fontSize: '0.82rem',
                  fontFamily: 'var(--font-cinzel)',
                  color: '#c5a059',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  marginBottom: '28px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <Sparkles size={14} />
                  <span>Silhouettes from {collection.title}</span>
                </div>

                {collectionProducts.length > 0 ? (
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: '30px'
                  }}>
                    {collectionProducts.map(product => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                ) : (
                  <div style={{
                    padding: '40px',
                    textAlign: 'center',
                    background: '#09090b',
                    border: '1px dashed rgba(197, 160, 89, 0.25)',
                    borderRadius: '2px'
                  }}>
                    <p style={{ color: '#9d9da6' }}>
                      All bespoke silhouettes in this capsule are currently reserved for salon viewings.
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

import React from 'react';
import { ArrowRight, Sparkles, Layers } from 'lucide-react';

export default function CollectionBanner({ collections = [], onSelectCollection }) {
  if (!collections.length) return null;

  const primary = collections[0];
  const secondary = collections[1] || collections[0];

  return (
    <section 
      id="collections" 
      style={{
        maxWidth: '1440px',
        margin: '0 auto',
        padding: '100px 32px 60px 32px'
      }}
    >
      {/* Section Header */}
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
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
          <span>Curated Editions & Haute Couture</span>
        </div>
        
        <h2 style={{
          fontFamily: 'var(--font-serif-display)',
          fontSize: 'clamp(2.2rem, 4vw, 3.4rem)',
          fontWeight: 400,
          letterSpacing: '0.04em',
          color: '#faf8f5'
        }}>
          Seasonal Campaigns & Capsule Collections
        </h2>
      </div>

      {/* Grid of Collection Showcases */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
        gap: '32px'
      }}>
        {collections.map((col, idx) => (
          <div 
            key={col.id}
            className="glass-card"
            style={{
              position: 'relative',
              borderRadius: '2px',
              overflow: 'hidden',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              minHeight: '560px',
              justifyContent: 'flex-end',
              padding: '40px',
              border: '1px solid rgba(197, 160, 89, 0.2)'
            }}
            onClick={() => onSelectCollection && onSelectCollection(col)}
          >
            {/* Background Image with Zoom & Gradient */}
            <div style={{ position: 'absolute', inset: 0, zIndex: 1 }} className="img-zoom-container">
              <img 
                src={col.image} 
                alt={col.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'brightness(0.75) contrast(1.05)'
                }}
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, rgba(9,9,11,0.2) 0%, rgba(9,9,11,0.5) 50%, rgba(9,9,11,0.95) 100%)'
              }} />
            </div>

            {/* Content Overlay */}
            <div style={{ position: 'relative', zIndex: 10 }}>
              <div style={{
                display: 'inline-block',
                background: 'rgba(197, 160, 89, 0.25)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(197, 160, 89, 0.4)',
                color: '#f8e8cf',
                padding: '4px 12px',
                fontSize: '0.68rem',
                fontFamily: 'var(--font-cinzel)',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                marginBottom: '16px'
              }}>
                {col.badge || col.tag}
              </div>

              <div style={{
                fontSize: '0.85rem',
                fontFamily: 'var(--font-cinzel)',
                letterSpacing: '0.2em',
                color: '#c5a059',
                textTransform: 'uppercase',
                marginBottom: '6px'
              }}>
                {col.subtitle}
              </div>

              <h3 style={{
                fontFamily: 'var(--font-serif-display)',
                fontSize: '2.2rem',
                color: '#faf8f5',
                marginBottom: '14px',
                lineHeight: 1.15
              }}>
                {col.title}
              </h3>

              <p style={{
                fontFamily: 'var(--font-serif-editorial)',
                fontSize: '1.05rem',
                color: '#d1cdc7',
                lineHeight: 1.5,
                marginBottom: '24px',
                maxWidth: '440px'
              }}>
                {col.description}
              </p>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderTop: '1px solid rgba(255,255,255,0.1)',
                paddingTop: '16px'
              }}>
                <span style={{ fontSize: '0.75rem', letterSpacing: '0.1em', color: '#9d9da6' }}>
                  {col.itemCount}
                </span>

                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#c5a059',
                  fontFamily: 'var(--font-cinzel)',
                  fontSize: '0.75rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase'
                }}>
                  <span>Discover Lookbook</span>
                  <ArrowRight size={14} />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

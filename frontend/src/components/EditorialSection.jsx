import React from 'react';
import { Sparkles, Award, Feather, Compass } from 'lucide-react';

export default function EditorialSection({ stories = [] }) {
  return (
    <section 
      id="editorial"
      style={{
        maxWidth: '1440px',
        margin: '0 auto',
        padding: '120px 32px 80px 32px'
      }}
    >
      {/* Editorial Headline */}
      <div style={{ textAlign: 'center', marginBottom: '70px' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          color: '#c5a059',
          fontFamily: 'var(--font-cinzel)',
          fontSize: '0.78rem',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          marginBottom: '14px'
        }}>
          <Sparkles size={14} />
          <span>The Karigar Chronicle • Volume IV</span>
        </div>

        <h2 style={{
          fontFamily: 'var(--font-serif-display)',
          fontSize: 'clamp(2.6rem, 5vw, 4.2rem)',
          fontWeight: 400,
          color: '#faf8f5',
          lineHeight: 1.08
        }}>
          The Soul of Indian Craftsmanship
        </h2>
      </div>

      {/* Featured Big Magazine Layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
        gap: '48px',
        alignItems: 'center',
        marginBottom: '90px'
      }}>
        {/* Left Big Visual Frame */}
        <div 
          className="img-zoom-container"
          style={{
            position: 'relative',
            borderRadius: '2px',
            overflow: 'hidden',
            aspectRatio: '4/5',
            border: '1px solid rgba(197, 160, 89, 0.25)',
            boxShadow: '0 25px 60px rgba(0,0,0,0.8)'
          }}
        >
          <img 
            src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=85" 
            alt="Artisan Karigar at Loom" 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{
            position: 'absolute',
            bottom: '24px',
            left: '24px',
            right: '24px',
            background: 'rgba(9, 9, 11, 0.88)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(197, 160, 89, 0.3)',
            padding: '20px'
          }}>
            <div style={{
              fontFamily: 'var(--font-cinzel)',
              fontSize: '0.7rem',
              color: '#c5a059',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              marginBottom: '4px'
            }}>
              Master Weaver Spotlight
            </div>
            <div style={{ fontFamily: 'var(--font-serif-editorial)', fontSize: '1.1rem', color: '#faf8f5' }}>
              Ustad Farooq Ansari • 4th Generation Varanasi Kadwa Weaver
            </div>
          </div>
        </div>

        {/* Right Editorial Story & Manifesto */}
        <div style={{ padding: '0 10px' }}>
          <div style={{
            fontSize: '0.8rem',
            fontFamily: 'var(--font-cinzel)',
            letterSpacing: '0.22em',
            color: '#c5a059',
            textTransform: 'uppercase',
            marginBottom: '16px'
          }}>
            Manifesto of Slow Luxury
          </div>

          <h3 style={{
            fontFamily: 'var(--font-serif-display)',
            fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
            color: '#faf8f5',
            lineHeight: 1.15,
            marginBottom: '24px',
            fontWeight: 400
          }}>
            "A sari is not simply draped. It carries the heartbeat of centuries."
          </h3>

          <p style={{
            fontFamily: 'var(--font-serif-editorial)',
            fontSize: '1.2rem',
            color: '#d1cdc7',
            lineHeight: 1.6,
            marginBottom: '24px'
          }}>
            At Atelier Véronique, we reject mass industrial speed. Each garment is born on wooden handlooms 
            where silver-gilded threads interlace with pure mulberry silk. A single bridal creation 
            often requires 350 to 500 hours of devoted human patience.
          </p>

          <p style={{
            fontFamily: 'var(--font-serif-editorial)',
            fontSize: '1.15rem',
            color: '#9d9da6',
            lineHeight: 1.6,
            marginBottom: '36px'
          }}>
            From the misty valleys of Kashmir practicing royal Tilla wire needlework to the sacred riverbanks 
            of Kashi, our patron collective supports over 320 artisan families.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '20px',
            borderTop: '1px solid rgba(197, 160, 89, 0.2)',
            paddingTop: '24px'
          }}>
            <div>
              <div style={{ fontFamily: 'var(--font-serif-display)', fontSize: '2rem', color: '#c5a059' }}>
                480+
              </div>
              <div style={{ fontSize: '0.75rem', color: '#888894', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Hours Per Bridal Piece
              </div>
            </div>

            <div>
              <div style={{ fontFamily: 'var(--font-serif-display)', fontSize: '2rem', color: '#c5a059' }}>
                100%
              </div>
              <div style={{ fontSize: '0.75rem', color: '#888894', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Zero Waste Handcrafted
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid of Secondary Stories */}
      {stories.length > 0 && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '30px'
        }}>
          {stories.map(story => (
            <div 
              key={story.id}
              className="glass-card"
              style={{
                borderRadius: '2px',
                overflow: 'hidden',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                padding: '24px'
              }}
            >
              <div style={{
                position: 'relative',
                aspectRatio: '16/10',
                borderRadius: '2px',
                overflow: 'hidden',
                marginBottom: '18px'
              }}>
                <img 
                  src={story.image} 
                  alt={story.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '0.7rem',
                fontFamily: 'var(--font-cinzel)',
                color: '#c5a059',
                letterSpacing: '0.12em',
                marginBottom: '8px'
              }}>
                <span>{story.category}</span>
                <span>{story.readTime}</span>
              </div>

              <h4 style={{
                fontFamily: 'var(--font-serif-display)',
                fontSize: '1.3rem',
                color: '#faf8f5',
                marginBottom: '10px'
              }}>
                {story.title}
              </h4>

              <p style={{
                fontFamily: 'var(--font-serif-editorial)',
                fontSize: '0.98rem',
                color: '#a0a0aa',
                lineHeight: 1.5,
                marginBottom: '16px'
              }}>
                {story.excerpt}
              </p>

              <div style={{
                fontStyle: 'italic',
                fontFamily: 'var(--font-serif-editorial)',
                fontSize: '0.92rem',
                color: '#e2c17c',
                borderLeft: '2px solid #c5a059',
                paddingLeft: '12px'
              }}>
                "{story.quote}"
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

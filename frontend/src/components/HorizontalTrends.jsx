import React, { useRef } from 'react';
import { useShop } from '../context/ShopContext';
import { ArrowLeft, ArrowRight, Sparkles, Plus } from 'lucide-react';

const TREND_LOOKS = [
  {
    id: "trend-1",
    tag: "RUNWAY HIGHLIGHT",
    title: "The Ethereal Ivory Sheer",
    caption: "Organza layers infused with hand-cut French lace and antique gold micro-zari.",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85",
    productId: "ivory-organza-bloom",
    quote: "Transcending seasons through weightless silk architecture."
  },
  {
    id: "trend-2",
    tag: "MIDNIGHT OPULENCE",
    title: "Obsidian & Kashmiri Tilla",
    caption: "Heavy micro-velvets tailored with intricate 24-kali flared hems.",
    image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1200&q=85",
    productId: "royal-kashmiri-tilla-lehenga",
    quote: "A royal testament to the master needleworkers of Kashmir."
  },
  {
    id: "trend-3",
    tag: "HERITAGE REBORN",
    title: "Molten Banarasi Kadwa",
    caption: "Pure metallic gold threads spun on historic pit looms in Varanasi.",
    image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1200&q=85",
    productId: "banarasi-tissue-gold-saree",
    quote: "Echoing the sacred ghats and molten gold sunrises."
  },
  {
    id: "trend-4",
    tag: "MODERN RED CARPET",
    title: "Sculpted Cape Couture",
    caption: "Pearls, bugle beads, and fluid trousers engineered for evening galas.",
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1200&q=85",
    productId: "celestial-embroidered-cape-set",
    quote: "Fluid movement meets structural corsetry."
  },
  {
    id: "trend-5",
    tag: "TIMELESS HEIRLOOM",
    title: "Scarlet Crimson Zardozi",
    caption: "Pure mulberry raw silk with 32 kalis and mukaish dupatta accents.",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=85",
    productId: "scarlet-raw-silk-anarkali",
    quote: "An heirloom crafted to be cherished for generations."
  }
];

export default function HorizontalTrends({ products = [] }) {
  const scrollContainerRef = useRef(null);
  const { setSelectedProduct } = useShop();

  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -460 : 460;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleLookClick = (trend) => {
    const matched = products.find(p => p.id === trend.productId);
    if (matched) {
      setSelectedProduct(matched);
    }
  };

  return (
    <section 
      id="trends"
      style={{
        background: '#09090b',
        borderTop: '1px solid rgba(197, 160, 89, 0.2)',
        borderBottom: '1px solid rgba(197, 160, 89, 0.2)',
        padding: '100px 0',
        overflow: 'hidden'
      }}
    >
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 32px 40px 32px' }}>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          gap: '24px'
        }}>
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              color: '#c5a059',
              fontFamily: 'var(--font-cinzel)',
              fontSize: '0.78rem',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              marginBottom: '12px'
            }}>
              <Sparkles size={14} />
              <span>Editorial Lookbook & Runway Vision</span>
            </div>

            <h2 style={{
              fontFamily: 'var(--font-serif-display)',
              fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)',
              color: '#faf8f5',
              lineHeight: 1.05,
              fontWeight: 400
            }}>
              Latest Trends Gallery
            </h2>
          </div>

          {/* Navigation Scroll Buttons */}
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={() => handleScroll('left')}
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: '#18181d',
                border: '1px solid rgba(197, 160, 89, 0.3)',
                color: '#faf8f5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#c5a059';
                e.currentTarget.style.color = '#0c0c0e';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#18181d';
                e.currentTarget.style.color = '#faf8f5';
              }}
              aria-label="Scroll Left"
            >
              <ArrowLeft size={18} />
            </button>

            <button
              onClick={() => handleScroll('right')}
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: '#18181d',
                border: '1px solid rgba(197, 160, 89, 0.3)',
                color: '#faf8f5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#c5a059';
                e.currentTarget.style.color = '#0c0c0e';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#18181d';
                e.currentTarget.style.color = '#faf8f5';
              }}
              aria-label="Scroll Right"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Scrolling Cards Strip */}
      <div 
        ref={scrollContainerRef}
        className="no-scrollbar"
        style={{
          display: 'flex',
          gap: '30px',
          overflowX: 'auto',
          paddingLeft: 'max(32px, calc((100vw - 1440px) / 2 + 32px))',
          paddingRight: '32px',
          scrollSnapType: 'x mandatory',
          cursor: 'grab'
        }}
      >
        {TREND_LOOKS.map((trend, index) => (
          <div
            key={trend.id}
            onClick={() => handleLookClick(trend)}
            className="glass-card"
            style={{
              flex: '0 0 380px',
              height: '540px',
              position: 'relative',
              borderRadius: '2px',
              overflow: 'hidden',
              cursor: 'pointer',
              scrollSnapAlign: 'start',
              border: '1px solid rgba(197, 160, 89, 0.25)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '30px'
            }}
          >
            {/* Background High-Fashion Image */}
            <div style={{ position: 'absolute', inset: 0, zIndex: 1 }} className="img-zoom-container">
              <img 
                src={trend.image} 
                alt={trend.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'brightness(0.72) contrast(1.1)'
                }}
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, rgba(9,9,11,0.4) 0%, rgba(9,9,11,0.1) 40%, rgba(9,9,11,0.92) 100%)'
              }} />
            </div>

            {/* Top Tag & Number */}
            <div style={{
              position: 'relative',
              zIndex: 10,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span style={{
                background: 'rgba(9, 9, 11, 0.8)',
                backdropFilter: 'blur(8px)',
                border: '1px solid #c5a059',
                color: '#c5a059',
                fontSize: '0.65rem',
                fontFamily: 'var(--font-cinzel)',
                letterSpacing: '0.18em',
                padding: '4px 10px',
                textTransform: 'uppercase'
              }}>
                {trend.tag}
              </span>

              <span style={{
                fontFamily: 'var(--font-serif-display)',
                fontSize: '1.4rem',
                color: 'rgba(255, 255, 255, 0.4)'
              }}>
                0{index + 1}
              </span>
            </div>

            {/* Bottom Content & Quote */}
            <div style={{ position: 'relative', zIndex: 10 }}>
              <div style={{
                fontFamily: 'var(--font-serif-editorial)',
                fontStyle: 'italic',
                fontSize: '1rem',
                color: '#e2c17c',
                marginBottom: '10px'
              }}>
                "{trend.quote}"
              </div>

              <h3 style={{
                fontFamily: 'var(--font-serif-display)',
                fontSize: '1.8rem',
                color: '#faf8f5',
                lineHeight: 1.15,
                marginBottom: '8px'
              }}>
                {trend.title}
              </h3>

              <p style={{
                fontSize: '0.85rem',
                color: '#d1cdc7',
                lineHeight: 1.4,
                marginBottom: '16px'
              }}>
                {trend.caption}
              </p>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: '#c5a059',
                fontFamily: 'var(--font-cinzel)',
                fontSize: '0.72rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase'
              }}>
                <Plus size={14} />
                <span>Inspect Silhouette</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

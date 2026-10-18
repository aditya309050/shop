import React from 'react';
import { Sparkles, Crown, Gem, Flame, Layers } from 'lucide-react';

export default function CategoryStories({ onSelectCategory, activeCategory }) {
  const stories = [
    {
      id: 'All',
      title: 'View All',
      subtitle: 'All Celebrations',
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=400&q=80',
      badge: 'All'
    },
    {
      id: 'Banarasi Sarees',
      title: 'Banarasi Sarees',
      subtitle: 'Kadwa & Katan',
      image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=400&q=80',
      badge: 'Chunnilal Silk'
    },
    {
      id: 'Lehengas',
      title: 'Bridal Lehengas',
      subtitle: '32-Kali Flare',
      image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=400&q=80',
      badge: 'Bridal'
    },
    {
      id: 'Sherwanis',
      title: 'Men Sherwanis',
      subtitle: 'Royal Groom',
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=400&q=80',
      badge: 'Chunnilal'
    },
    {
      id: 'Kurtis & Suits',
      title: 'Kurtis & Suits',
      subtitle: 'Chikankari & Silk',
      image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=400&q=80',
      badge: 'Festive'
    },
    {
      id: 'Kurta Sets',
      title: 'Kurta & Nehru Jacket',
      subtitle: 'Brocade Bundi',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
      badge: 'Chunnilal'
    },
    {
      id: 'Indo-Western',
      title: 'Indo-Western',
      subtitle: 'Velvet Bandhgala',
      image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=400&q=80',
      badge: 'Cocktail'
    }
  ];

  return (
    <div style={{
      maxWidth: '1440px',
      margin: '0 auto',
      padding: '30px 24px 20px 24px',
      borderBottom: '1px solid rgba(197, 160, 89, 0.15)'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: '24px',
        overflowX: 'auto',
        paddingBottom: '14px',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none'
      }}>
        {stories.map((story) => {
          const isActive = activeCategory === story.id;
          return (
            <button
              key={story.id}
              onClick={() => onSelectCategory(story.id)}
              style={{
                background: 'transparent',
                border: 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
                flexShrink: 0,
                outline: 'none',
                transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              {/* Outer Golden Gradient Ring */}
              <div style={{
                position: 'relative',
                width: '84px',
                height: '84px',
                borderRadius: '50%',
                padding: '3px',
                background: isActive 
                  ? 'linear-gradient(135deg, #c5a059 0%, #faf8f5 50%, #c5a059 100%)' 
                  : 'linear-gradient(135deg, rgba(197, 160, 89, 0.4) 0%, rgba(255,255,255,0.1) 100%)',
                boxShadow: isActive ? '0 0 20px rgba(197, 160, 89, 0.6)' : '0 4px 15px rgba(0,0,0,0.5)',
                marginBottom: '10px'
              }}>
                {/* Inner Image Container */}
                <div style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  position: 'relative',
                  border: '2px solid #09090b'
                }}>
                  <img
                    src={story.image}
                    alt={story.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      filter: isActive ? 'brightness(1.05)' : 'brightness(0.9)'
                    }}
                  />
                </div>

                {/* Badge Tag */}
                <div style={{
                  position: 'absolute',
                  bottom: '-4px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: isActive ? '#c5a059' : '#141418',
                  color: isActive ? '#09090b' : '#eaddc5',
                  fontSize: '0.58rem',
                  fontWeight: 700,
                  fontFamily: 'var(--font-cinzel)',
                  letterSpacing: '0.1em',
                  padding: '2px 8px',
                  borderRadius: '10px',
                  border: '1px solid rgba(197, 160, 89, 0.5)',
                  whiteSpace: 'nowrap'
                }}>
                  {story.badge}
                </div>
              </div>

              {/* Title & Subtitle */}
              <span style={{
                fontFamily: 'var(--font-cinzel)',
                fontSize: '0.74rem',
                fontWeight: isActive ? 700 : 500,
                color: isActive ? '#c5a059' : '#eaddc5',
                letterSpacing: '0.08em',
                textAlign: 'center',
                marginTop: '4px'
              }}>
                {story.title}
              </span>
              <span style={{
                fontSize: '0.64rem',
                color: '#a09885',
                letterSpacing: '0.04em'
              }}>
                {story.subtitle}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

import React from 'react';
import { Sparkles, ArrowRight, Crown, Heart, Wine, PartyPopper } from 'lucide-react';

export default function OccasionsGrid({ onSelectOccasion }) {
  const occasions = [
    {
      id: 'The Royal Wedding',
      title: 'The Grand Wedding',
      subtitle: 'Rajputana Crimson & Groom Sherwanis',
      image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=85',
      tag: 'Varmala & Pheras',
      icon: Crown
    },
    {
      id: 'Sangeet & Sangeet',
      title: 'Sangeet & Cocktail',
      subtitle: 'Glittering Sequins & Velvet Indo-Western',
      image: 'https://images.unsplash.com/photo-1583391733975-081dd793ac02?auto=format&fit=crop&w=800&q=85',
      tag: 'Music & Dance',
      icon: PartyPopper
    },
    {
      id: 'Haldi & Mehendi',
      title: 'Haldi & Mehendi',
      subtitle: 'Sunlit Yellows & Silk Chikankari Kurta Sets',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=85',
      tag: 'Festive Radiance',
      icon: Sparkles
    },
    {
      id: 'Reception & Cocktail',
      title: 'Royal Reception',
      subtitle: 'Molten Gold Tissue & Structured Bandhgalas',
      image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=85',
      tag: 'Grand Soirée',
      icon: Wine
    }
  ];

  return (
    <section style={{
      maxWidth: '1440px',
      margin: '0 auto',
      padding: '70px 24px',
      borderBottom: '1px solid rgba(197, 160, 89, 0.15)'
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          color: '#c5a059',
          fontFamily: 'var(--font-cinzel)',
          fontSize: '0.78rem',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          marginBottom: '10px'
        }}>
          <Sparkles size={14} color="#c5a059" />
          <span>Curated For Every Celebration</span>
          <Sparkles size={14} color="#c5a059" />
        </div>

        <h2 style={{
          fontFamily: 'var(--font-serif-display)',
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: 400,
          color: '#faf8f5',
          marginBottom: '12px'
        }}>
          Shop By Celebration
        </h2>

        <p style={{
          fontFamily: 'var(--font-serif-editorial)',
          fontSize: '1.15rem',
          color: '#c4c0b8',
          maxWidth: '650px',
          margin: '0 auto'
        }}>
          From joyous Haldi rituals to the monumental Grand Wedding: discover bespoke looks tailored for the bride, groom, and family.
        </p>
      </div>

      {/* 4-Card Occasion Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '24px'
      }}>
        {occasions.map((occ) => {
          const Icon = occ.icon;
          return (
            <div
              key={occ.id}
              onClick={() => onSelectOccasion && onSelectOccasion(occ.id)}
              style={{
                position: 'relative',
                height: '420px',
                borderRadius: '6px',
                overflow: 'hidden',
                cursor: 'pointer',
                border: '1px solid rgba(197, 160, 89, 0.25)',
                boxShadow: '0 15px 40px rgba(0,0,0,0.6)',
                transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = '0 25px 60px rgba(197, 160, 89, 0.25)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 15px 40px rgba(0,0,0,0.6)';
              }}
            >
              {/* Background Image */}
              <img
                src={occ.image}
                alt={occ.title}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'brightness(0.7) contrast(1.05)',
                  transition: 'transform 0.6s ease'
                }}
              />

              {/* Gradient Overlay */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(0deg, #09090c 0%, rgba(9,9,12,0.4) 50%, rgba(0,0,0,0.1) 100%)'
              }} />

              {/* Tag in Top Left */}
              <div style={{
                position: 'absolute',
                top: '20px',
                left: '20px',
                background: 'rgba(12, 12, 16, 0.85)',
                border: '1px solid rgba(197, 160, 89, 0.5)',
                borderRadius: '20px',
                padding: '4px 14px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                color: '#eaddc5',
                fontSize: '0.7rem',
                fontFamily: 'var(--font-cinzel)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase'
              }}>
                <Icon size={12} color="#c5a059" />
                <span>{occ.tag}</span>
              </div>

              {/* Content in Bottom */}
              <div style={{
                position: 'absolute',
                bottom: '24px',
                left: '24px',
                right: '24px',
                zIndex: 2
              }}>
                <h3 style={{
                  fontFamily: 'var(--font-serif-display)',
                  fontSize: '1.6rem',
                  fontWeight: 400,
                  color: '#faf8f5',
                  marginBottom: '6px'
                }}>
                  {occ.title}
                </h3>
                <p style={{
                  fontSize: '0.85rem',
                  color: '#c4c0b8',
                  marginBottom: '14px',
                  lineHeight: 1.4
                }}>
                  {occ.subtitle}
                </p>

                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: '#c5a059',
                  fontFamily: 'var(--font-cinzel)',
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase'
                }}>
                  <span>Explore Outfits</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

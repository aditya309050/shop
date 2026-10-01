import React, { useState, useEffect } from 'react';
import { Sparkles, Crown, KeyRound } from 'lucide-react';

export default function RoyalGateEntrance({ onFinish }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Smooth progress counter before gate opens
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 4;
      });
    }, 40);

    // Exactly 1.1s majestic pause then gates swing open with high-end physics
    const openTimer = setTimeout(() => {
      setIsOpen(true);
    }, 1100);

    // Graceful fadeout and cleanup
    const removeTimer = setTimeout(() => {
      setIsRemoved(true);
      if (onFinish) onFinish();
    }, 2500);

    return () => {
      clearInterval(interval);
      clearTimeout(openTimer);
      clearTimeout(removeTimer);
    };
  }, [onFinish]);

  const handleInstantOpen = () => {
    setIsOpen(true);
    setTimeout(() => {
      setIsRemoved(true);
      if (onFinish) onFinish();
    }, 600);
  };

  if (isRemoved) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: '#050507',
        pointerEvents: isOpen ? 'none' : 'all',
        transition: 'opacity 1.1s cubic-bezier(0.16, 1, 0.3, 1), transform 1.1s cubic-bezier(0.16, 1, 0.3, 1)',
        opacity: isOpen ? 0 : 1,
        transform: isOpen ? 'scale(1.03)' : 'scale(1)'
      }}
    >
      {/* Background Volumetric Gold Glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 50% 50%, rgba(212, 175, 55, 0.22) 0%, rgba(18, 16, 22, 0.95) 55%, #050507 100%)',
          backdropFilter: 'blur(45px)',
          WebkitBackdropFilter: 'blur(45px)',
          zIndex: 1
        }}
      />

      {/* Floating Gold Dust Particle Orbs */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 2, pointerEvents: 'none' }}>
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: `${(i * 19 + 7) % 95}%`,
              left: `${(i * 23 + 11) % 92}%`,
              width: `${(i % 3) * 3 + 3}px`,
              height: `${(i % 3) * 3 + 3}px`,
              borderRadius: '50%',
              background: '#c5a059',
              boxShadow: '0 0 14px #eaddc5, 0 0 28px #c5a059',
              opacity: isOpen ? 0 : 0.75,
              transform: isOpen ? 'translateY(-40px) scale(1.5)' : 'translateY(0) scale(1)',
              transition: `all ${1.2 + (i % 5) * 0.2}s cubic-bezier(0.16, 1, 0.3, 1)`
            }}
          />
        ))}
      </div>

      {/* Outer Royal Arch Frame */}
      <div
        style={{
          position: 'absolute',
          inset: '20px',
          border: '1px solid rgba(197, 160, 89, 0.35)',
          borderRadius: '12px',
          zIndex: 3,
          pointerEvents: 'none',
          boxShadow: 'inset 0 0 60px rgba(0,0,0,0.8)'
        }}
      />

      {/* 3D PALACE DOUBLE GATES */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          perspective: '1800px',
          display: 'flex',
          zIndex: 4
        }}
      >
        {/* LEFT PALACE GATE DOOR */}
        <div
          style={{
            flex: 1,
            height: '100%',
            background: 'linear-gradient(135deg, rgba(14, 14, 18, 0.98) 0%, rgba(26, 21, 15, 0.96) 100%)',
            borderRight: '2px solid rgba(212, 175, 55, 0.85)',
            boxShadow: 'inset -30px 0 80px rgba(0,0,0,0.9), 15px 0 50px rgba(197, 160, 89, 0.2)',
            transformOrigin: 'left center',
            transition: 'transform 1.4s cubic-bezier(0.65, 0, 0.15, 1), opacity 1.2s ease',
            transform: isOpen ? 'rotateY(-92deg)' : 'rotateY(0deg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            paddingRight: '40px',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Ornate Gold Filigree Jaali Pattern */}
          <div
            style={{
              position: 'absolute',
              inset: '30px 15px 30px 30px',
              border: '1px solid rgba(197, 160, 89, 0.4)',
              borderRadius: '6px',
              backgroundImage: `
                radial-gradient(circle at 50% 50%, rgba(197, 160, 89, 0.15) 1px, transparent 1px),
                linear-gradient(rgba(197, 160, 89, 0.08) 1px, transparent 1px),
                linear-gradient(90deg, rgba(197, 160, 89, 0.08) 1px, transparent 1px)
              `,
              backgroundSize: '36px 36px',
              boxShadow: 'inset 0 0 30px rgba(0,0,0,0.6)'
            }}
          />

          {/* Heavy Antique Gold Door Handle */}
          <div
            style={{
              position: 'relative',
              zIndex: 5,
              width: '18px',
              height: '120px',
              background: 'linear-gradient(180deg, #f3e5ab 0%, #c5a059 50%, #7a5c20 100%)',
              borderRadius: '10px',
              boxShadow: '0 0 20px rgba(197, 160, 89, 0.7), -4px 0 10px rgba(0,0,0,0.8)',
              border: '1px solid #ffe89e',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#fff' }} />
          </div>
        </div>

        {/* RIGHT PALACE GATE DOOR */}
        <div
          style={{
            flex: 1,
            height: '100%',
            background: 'linear-gradient(225deg, rgba(14, 14, 18, 0.98) 0%, rgba(26, 21, 15, 0.96) 100%)',
            borderLeft: '2px solid rgba(212, 175, 55, 0.85)',
            boxShadow: 'inset 30px 0 80px rgba(0,0,0,0.9), -15px 0 50px rgba(197, 160, 89, 0.2)',
            transformOrigin: 'right center',
            transition: 'transform 1.4s cubic-bezier(0.65, 0, 0.15, 1), opacity 1.2s ease',
            transform: isOpen ? 'rotateY(92deg)' : 'rotateY(0deg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            paddingLeft: '40px',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Ornate Gold Filigree Jaali Pattern */}
          <div
            style={{
              position: 'absolute',
              inset: '30px 30px 30px 15px',
              border: '1px solid rgba(197, 160, 89, 0.4)',
              borderRadius: '6px',
              backgroundImage: `
                radial-gradient(circle at 50% 50%, rgba(197, 160, 89, 0.15) 1px, transparent 1px),
                linear-gradient(rgba(197, 160, 89, 0.08) 1px, transparent 1px),
                linear-gradient(90deg, rgba(197, 160, 89, 0.08) 1px, transparent 1px)
              `,
              backgroundSize: '36px 36px',
              boxShadow: 'inset 0 0 30px rgba(0,0,0,0.6)'
            }}
          />

          {/* Heavy Antique Gold Door Handle */}
          <div
            style={{
              position: 'relative',
              zIndex: 5,
              width: '18px',
              height: '120px',
              background: 'linear-gradient(180deg, #f3e5ab 0%, #c5a059 50%, #7a5c20 100%)',
              borderRadius: '10px',
              boxShadow: '0 0 20px rgba(197, 160, 89, 0.7), 4px 0 10px rgba(0,0,0,0.8)',
              border: '1px solid #ffe89e',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#fff' }} />
          </div>
        </div>
      </div>

      {/* CENTER GILDED CREST & EMBLEM (Floating Glass Shield) */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          maxWidth: '560px',
          width: '90%',
          padding: '48px 36px',
          background: 'rgba(12, 12, 16, 0.88)',
          backdropFilter: 'blur(28px)',
          WebkitBackdropFilter: 'blur(28px)',
          border: '1px solid rgba(212, 175, 55, 0.6)',
          borderRadius: '16px',
          boxShadow: '0 30px 90px rgba(0,0,0,0.95), 0 0 60px rgba(197, 160, 89, 0.3)',
          transition: 'transform 1s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s ease',
          transform: isOpen ? 'scale(1.2) translateY(-25px)' : 'scale(1) translateY(0)',
          opacity: isOpen ? 0 : 1
        }}
      >
        {/* Crown & Royal Monogram */}
        <div style={{
          width: '84px',
          height: '84px',
          margin: '0 auto 20px auto',
          borderRadius: '50%',
          background: 'radial-gradient(circle, #2a2215 0%, #0c0b0f 100%)',
          border: '2px solid #c5a059',
          boxShadow: '0 0 35px rgba(197, 160, 89, 0.5), inset 0 0 15px rgba(197, 160, 89, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#eaddc5'
        }}>
          <Crown size={40} color="#c5a059" style={{ filter: 'drop-shadow(0 0 10px rgba(197,160,89,0.9))' }} />
        </div>

        {/* Haute Couture Tagline */}
        <div style={{
          fontFamily: 'var(--font-cinzel)',
          fontSize: '0.82rem',
          letterSpacing: '0.35em',
          color: '#c5a059',
          textTransform: 'uppercase',
          marginBottom: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px'
        }}>
          <Sparkles size={14} color="#c5a059" />
          <span>Haute Couture Sanctuary</span>
          <Sparkles size={14} color="#c5a059" />
        </div>

        {/* Brand Name */}
        <h1 style={{
          fontFamily: 'var(--font-serif-display)',
          fontSize: 'clamp(2rem, 5vw, 2.9rem)',
          fontWeight: 400,
          color: '#faf8f5',
          letterSpacing: '0.04em',
          lineHeight: 1.1,
          marginBottom: '12px',
          textShadow: '0 4px 25px rgba(0,0,0,0.9)'
        }}>
          ATELIER VÉRONIQUE
        </h1>

        <p style={{
          fontFamily: 'var(--font-serif-editorial)',
          fontStyle: 'italic',
          fontSize: '1.15rem',
          color: '#d6cbb8',
          lineHeight: 1.5,
          marginBottom: '28px'
        }}>
          Sacred Banarasi Silk Looms • Royal Bridal Lehengas • Designer Kurtis
        </p>

        {/* Progress Bar Loader */}
        <div style={{ width: '240px', margin: '0 auto 24px auto' }}>
          <div style={{
            height: '2px',
            background: 'rgba(197, 160, 89, 0.25)',
            borderRadius: '2px',
            overflow: 'hidden',
            marginBottom: '10px'
          }}>
            <div style={{
              height: '100%',
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #c5a059 0%, #faf8f5 100%)',
              transition: 'width 0.08s linear',
              boxShadow: '0 0 12px #c5a059'
            }} />
          </div>
          <div style={{
            fontSize: '0.7rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#a09885',
            fontFamily: 'var(--font-cinzel)'
          }}>
            Unveiling Royal Palace Salon...
          </div>
        </div>

        {/* Skip Button */}
        <button
          onClick={handleInstantOpen}
          style={{
            background: 'rgba(197, 160, 89, 0.1)',
            border: '1px solid rgba(197, 160, 89, 0.45)',
            color: '#eaddc5',
            padding: '10px 24px',
            borderRadius: '30px',
            fontSize: '0.74rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            fontFamily: 'var(--font-cinzel)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 15px rgba(0,0,0,0.5)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(197, 160, 89, 0.25)';
            e.currentTarget.style.borderColor = '#c5a059';
            e.currentTarget.style.color = '#fff';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(197, 160, 89, 0.1)';
            e.currentTarget.style.borderColor = 'rgba(197, 160, 89, 0.45)';
            e.currentTarget.style.color = '#eaddc5';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <KeyRound size={13} color="#c5a059" />
          <span>Enter Instantly</span>
        </button>
      </div>
    </div>
  );
}

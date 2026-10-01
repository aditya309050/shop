import React, { useState, useEffect } from 'react';
import { Sparkles, Crown, KeyRound } from 'lucide-react';

export default function RoyalGateEntrance({ onFinish }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Progress loader before gates part open
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 45);

    // Exactly 1 second delay before the majestic royal gates swing open
    const openTimer = setTimeout(() => {
      setIsOpen(true);
    }, 1100);

    // Smooth fade out and unmount after gates fully part
    const removeTimer = setTimeout(() => {
      setIsRemoved(true);
      if (onFinish) onFinish();
    }, 2400);

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
    }, 800);
  };

  if (isRemoved) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: '#070709',
        pointerEvents: isOpen ? 'none' : 'all',
        transition: 'opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1), transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)',
        opacity: isOpen ? 0 : 1,
        transform: isOpen ? 'scale(1.04)' : 'scale(1)'
      }}
    >
      {/* Ambient Glowing Backdrop & Radial Light */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 50% 50%, rgba(197, 160, 89, 0.18) 0%, rgba(11, 11, 15, 0.96) 60%, #060608 100%)',
          backdropFilter: 'blur(32px)',
          WebkitBackdropFilter: 'blur(32px)',
          zIndex: 1
        }}
      />

      {/* 3D PERSPECTIVE PALACE GATE CONTAINER */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          perspective: '1600px',
          display: 'flex',
          zIndex: 2
        }}
      >
        {/* LEFT PALACE GATE DOOR */}
        <div
          style={{
            flex: 1,
            height: '100%',
            background: 'linear-gradient(135deg, rgba(18, 18, 24, 0.96) 0%, rgba(28, 23, 18, 0.94) 100%)',
            borderRight: '2px solid rgba(197, 160, 89, 0.6)',
            boxShadow: 'inset -20px 0 60px rgba(0,0,0,0.8), 10px 0 40px rgba(197, 160, 89, 0.15)',
            transformOrigin: 'left center',
            transition: 'transform 1.4s cubic-bezier(0.7, 0, 0.2, 1), opacity 1.2s ease',
            transform: isOpen ? 'rotateY(-92deg)' : 'rotateY(0deg)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-end',
            paddingRight: '30px',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Ornate Gate Filigree Grid */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `
                linear-gradient(rgba(197, 160, 89, 0.08) 1px, transparent 1px),
                linear-gradient(90deg, rgba(197, 160, 89, 0.08) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px',
              opacity: 0.7
            }}
          />
          {/* Royal Brass Door Studs */}
          <div style={{
            position: 'absolute',
            top: '20%',
            right: '25px',
            width: '14px',
            height: '14px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, #eaddc5, #c5a059)',
            boxShadow: '0 0 12px rgba(197,160,89,0.8)'
          }} />
          <div style={{
            position: 'absolute',
            bottom: '20%',
            right: '25px',
            width: '14px',
            height: '14px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, #eaddc5, #c5a059)',
            boxShadow: '0 0 12px rgba(197,160,89,0.8)'
          }} />

          {/* Left Door Golden Royal Arch Border */}
          <div style={{
            position: 'absolute',
            inset: '30px 15px 30px 30px',
            border: '1px solid rgba(197, 160, 89, 0.3)',
            borderRadius: '8px',
            pointerEvents: 'none'
          }} />
        </div>

        {/* RIGHT PALACE GATE DOOR */}
        <div
          style={{
            flex: 1,
            height: '100%',
            background: 'linear-gradient(225deg, rgba(18, 18, 24, 0.96) 0%, rgba(28, 23, 18, 0.94) 100%)',
            borderLeft: '2px solid rgba(197, 160, 89, 0.6)',
            boxShadow: 'inset 20px 0 60px rgba(0,0,0,0.8), -10px 0 40px rgba(197, 160, 89, 0.15)',
            transformOrigin: 'right center',
            transition: 'transform 1.4s cubic-bezier(0.7, 0, 0.2, 1), opacity 1.2s ease',
            transform: isOpen ? 'rotateY(92deg)' : 'rotateY(0deg)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            paddingLeft: '30px',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Ornate Gate Filigree Grid */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `
                linear-gradient(rgba(197, 160, 89, 0.08) 1px, transparent 1px),
                linear-gradient(90deg, rgba(197, 160, 89, 0.08) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px',
              opacity: 0.7
            }}
          />
          {/* Royal Brass Door Studs */}
          <div style={{
            position: 'absolute',
            top: '20%',
            left: '25px',
            width: '14px',
            height: '14px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, #eaddc5, #c5a059)',
            boxShadow: '0 0 12px rgba(197,160,89,0.8)'
          }} />
          <div style={{
            position: 'absolute',
            bottom: '20%',
            left: '25px',
            width: '14px',
            height: '14px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, #eaddc5, #c5a059)',
            boxShadow: '0 0 12px rgba(197,160,89,0.8)'
          }} />

          {/* Right Door Golden Royal Arch Border */}
          <div style={{
            position: 'absolute',
            inset: '30px 30px 30px 15px',
            border: '1px solid rgba(197, 160, 89, 0.3)',
            borderRadius: '8px',
            pointerEvents: 'none'
          }} />
        </div>
      </div>

      {/* CENTER ROYAL EMBLEM & GLASS SEAL */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          maxWidth: '560px',
          padding: '40px 30px',
          background: 'rgba(15, 15, 20, 0.85)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(197, 160, 89, 0.45)',
          borderRadius: '16px',
          boxShadow: '0 25px 70px rgba(0,0,0,0.9), 0 0 50px rgba(197, 160, 89, 0.25)',
          transition: 'transform 0.9s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s ease',
          transform: isOpen ? 'scale(1.15) translateY(-20px)' : 'scale(1) translateY(0)',
          opacity: isOpen ? 0 : 1
        }}
      >
        {/* Crown Icon & Golden Crest */}
        <div style={{
          width: '74px',
          height: '74px',
          margin: '0 auto 20px auto',
          borderRadius: '50%',
          background: 'radial-gradient(circle, #252018 0%, #0e0d11 100%)',
          border: '2px solid #c5a059',
          boxShadow: '0 0 25px rgba(197, 160, 89, 0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#c5a059'
        }}>
          <Crown size={34} style={{ filter: 'drop-shadow(0 0 8px rgba(197,160,89,0.8))' }} />
        </div>

        {/* Haute Couture Brand Title */}
        <div style={{
          fontFamily: 'var(--font-cinzel)',
          fontSize: '0.8rem',
          letterSpacing: '0.35em',
          color: '#c5a059',
          textTransform: 'uppercase',
          marginBottom: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px'
        }}>
          <Sparkles size={13} />
          <span>Haute Couture Sanctuary</span>
          <Sparkles size={13} />
        </div>

        <h1 style={{
          fontFamily: 'var(--font-serif-display)',
          fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
          fontWeight: 400,
          color: '#faf8f5',
          letterSpacing: '0.04em',
          lineHeight: 1.15,
          marginBottom: '14px',
          textShadow: '0 4px 20px rgba(0,0,0,0.8)'
        }}>
          ATELIER VÉRONIQUE
        </h1>

        <p style={{
          fontFamily: 'var(--font-serif-editorial)',
          fontStyle: 'italic',
          fontSize: '1.05rem',
          color: '#d6cbb8',
          lineHeight: 1.5,
          marginBottom: '28px'
        }}>
          Sacred Banarasi Silk Looms & Imperial Rajputana Lehengas
        </p>

        {/* Progress Bar & Status */}
        <div style={{ width: '220px', margin: '0 auto 22px auto' }}>
          <div style={{
            height: '2px',
            background: 'rgba(197, 160, 89, 0.2)',
            borderRadius: '2px',
            overflow: 'hidden',
            marginBottom: '8px'
          }}>
            <div style={{
              height: '100%',
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #c5a059, #faf8f5)',
              transition: 'width 0.1s linear',
              boxShadow: '0 0 10px #c5a059'
            }} />
          </div>
          <div style={{
            fontSize: '0.68rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#a09885',
            fontFamily: 'var(--font-cinzel)'
          }}>
            Opening Grand Palace Gate...
          </div>
        </div>

        {/* Instant Enter Button */}
        <button
          onClick={handleInstantOpen}
          style={{
            background: 'transparent',
            border: '1px solid rgba(197, 160, 89, 0.4)',
            color: '#eaddc5',
            padding: '8px 20px',
            borderRadius: '30px',
            fontSize: '0.72rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            fontFamily: 'var(--font-cinzel)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(197, 160, 89, 0.15)';
            e.currentTarget.style.borderColor = '#c5a059';
            e.currentTarget.style.color = '#fff';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.borderColor = 'rgba(197, 160, 89, 0.4)';
            e.currentTarget.style.color = '#eaddc5';
          }}
        >
          <KeyRound size={13} color="#c5a059" />
          <span>Enter Instantly</span>
        </button>
      </div>
    </div>
  );
}

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowRight, Sparkles, Compass, ShieldCheck } from 'lucide-react';

export default function Hero({ onExploreClick, onViewLookbook }) {
  const heroRef = useRef(null);
  const headlineRef = useRef(null);
  const subtextRef = useRef(null);
  const imageRef = useRef(null);
  const badgesRef = useRef(null);
  const marqueeRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Cinematic Entrance Timeline
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from(imageRef.current, {
        scale: 1.25,
        opacity: 0,
        duration: 1.8,
        ease: 'power2.out'
      })
      .from(headlineRef.current?.querySelectorAll('.reveal-text'), {
        y: 60,
        opacity: 0,
        stagger: 0.15,
        duration: 1.2,
      }, '-=1.2')
      .from(subtextRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.9,
      }, '-=0.8');

    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={heroRef}
      style={{
        position: 'relative',
        minHeight: '88vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        overflow: 'hidden',
        background: 'radial-gradient(ellipse at center, #18181f 0%, #09090b 100%)',
        borderBottom: '1px solid rgba(197, 160, 89, 0.2)'
      }}
    >
      {/* Background Cinematic Visual with Vignette */}
      <div 
        ref={imageRef}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          overflow: 'hidden'
        }}
      >
        <img 
          src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=2000&q=85" 
          alt="Haute Couture Campaign" 
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 20%',
            opacity: 0.42,
            filter: 'contrast(1.1) brightness(0.95)'
          }}
        />
        {/* Luxury Vignette & Grain Gradients */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(9,9,11,0.6) 0%, rgba(9,9,11,0.2) 40%, rgba(9,9,11,0.95) 100%)'
        }} />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 70% 30%, rgba(197, 160, 89, 0.12) 0%, transparent 60%)'
        }} />
      </div>

      {/* Main Hero Typography & Call to Action */}
      <div 
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '1440px',
          margin: '0 auto',
          width: '100%',
          padding: '80px 32px 80px 32px'
        }}
      >
        <div style={{ maxWidth: '880px' }}>
          <div ref={headlineRef} style={{ marginBottom: '24px' }}>
            <div 
              className="reveal-text"
              style={{
                fontFamily: 'var(--font-cinzel)',
                fontSize: 'clamp(0.85rem, 2vw, 1.1rem)',
                letterSpacing: '0.35em',
                color: '#c5a059',
                textTransform: 'uppercase',
                marginBottom: '12px'
              }}
            >
              The Architecture of Ethereal Silk
            </div>
            
            <h1 
              className="reveal-text font-display"
              style={{
                fontSize: 'clamp(2.8rem, 6.5vw, 5.8rem)',
                lineHeight: 1.02,
                fontWeight: 400,
                letterSpacing: '0.04em',
                color: '#faf8f5',
                textShadow: '0 10px 40px rgba(0,0,0,0.8)'
              }}
            >
              Artisanal Grandeur <br />
              <span style={{ fontStyle: 'italic', fontFamily: 'var(--font-serif-editorial)', color: '#f3e6cf' }}>
                Reimagined in Organza & Tilla.
              </span>
            </h1>
          </div>

          <p 
            ref={subtextRef}
            style={{
              fontFamily: 'var(--font-serif-editorial)',
              fontSize: 'clamp(1.1rem, 2.2vw, 1.45rem)',
              lineHeight: 1.6,
              color: '#d6d2ca',
              maxWidth: '640px',
              marginBottom: '36px',
              fontWeight: 300
            }}
          >
            Whisper-light hand-painted botanicals, molten Banarasi kadwa weaves, and 
            sculpted royal silhouettes designed for discerning patrons worldwide.
          </p>

          {/* Action Button Suite */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '18px', alignItems: 'center' }}>
            <button 
              onClick={onExploreClick}
              className="btn-couture"
              style={{
                padding: '16px 36px',
                fontSize: '0.85rem'
              }}
            >
              <span>Explore Collections</span>
              <ArrowRight size={16} style={{ marginLeft: '10px' }} />
            </button>

            <button 
              onClick={onViewLookbook}
              className="btn-outline-gold"
              style={{
                padding: '15px 30px'
              }}
            >
              <Compass size={15} style={{ marginRight: '8px' }} />
              <span>View 2026 Lookbook</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

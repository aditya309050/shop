import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowRight, Sparkles, Crown, ShieldCheck, Gem } from 'lucide-react';

export default function Hero({ onExploreClick, onViewCategory }) {
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(imgRef.current, {
        scale: 1.15,
        opacity: 0,
        duration: 1.6,
        ease: 'power2.out'
      });
      gsap.from(textRef.current?.children, {
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: 'power3.out'
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative min-h-[85vh] flex flex-col justify-center overflow-hidden bg-gradient-to-b from-[#121015] via-[#09090b] to-[#09090b] border-b border-gold/20"
    >
      {/* Background Campaign Visual */}
      <div ref={imgRef} className="absolute inset-0 z-0 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=2000&q=85" 
          alt="Manyavar & Mohey Grand Wedding Campaign" 
          className="w-full h-full object-cover object-center opacity-40 filter brightness-90 contrast-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-[#09090b]/80" />
        <div className="absolute inset-0 bg-radial-gradient from-gold/15 via-transparent to-transparent opacity-60" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 py-16">
        <div ref={textRef} className="max-w-3xl space-y-6">
          {/* Tagline Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1c1822]/90 border border-gold/40 backdrop-blur-md shadow-lg">
            <Crown size={14} className="text-gold animate-pulse" />
            <span className="font-cinzel text-xs tracking-[0.25em] text-gold uppercase font-bold">
              Taiyaar Hoke Aaiye
            </span>
            <span className="text-white/40">|</span>
            <span className="font-cinzel text-xs tracking-wider text-gold-rich">
              The Grand Wedding Edit 2026
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-normal leading-[1.08] text-ivory tracking-wide">
            Celebrate In <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-light via-gold to-gold-dark font-medium">
              Imperial Grandeur
            </span>
          </h1>

          {/* Subtitle */}
          <p className="font-editorial italic text-xl sm:text-2xl text-[#d4cdbf] leading-relaxed max-w-2xl">
            From the sacred handlooms of Varanasi to Rajputana bridal zardozi and groom's shahi sherwanis: elevate every celebration with Manyavar & Mohey.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button
              onClick={() => onViewCategory ? onViewCategory('Women') : onExploreClick()}
              className="px-8 py-4 rounded-sm bg-gradient-to-r from-gold via-gold-bright to-gold-dark text-black font-cinzel font-bold text-xs tracking-[0.2em] uppercase shadow-lg shadow-gold/30 hover:shadow-gold/60 hover:scale-[1.02] transition-all flex items-center gap-2 cursor-pointer"
            >
              <Gem size={14} />
              <span>Shop Women (Mohey)</span>
            </button>

            <button
              onClick={() => onViewCategory ? onViewCategory('Men') : onExploreClick()}
              className="px-8 py-4 rounded-sm bg-[#181820]/90 border border-gold/50 text-gold-rich font-cinzel font-semibold text-xs tracking-[0.2em] uppercase hover:bg-gold/20 hover:text-white transition-all flex items-center gap-2 cursor-pointer backdrop-blur-md"
            >
              <Crown size={14} className="text-gold" />
              <span>Shop Men (Manyavar)</span>
            </button>
          </div>

          {/* Trust Highlights */}
          <div className="grid grid-cols-3 gap-4 pt-8 border-t border-gold/20 max-w-xl">
            <div className="space-y-1">
              <div className="font-cinzel text-lg font-bold text-gold">100%</div>
              <div className="text-xs text-[#a09885] tracking-wider uppercase">Authentic Silk Mark</div>
            </div>
            <div className="space-y-1">
              <div className="font-cinzel text-lg font-bold text-gold">Bespoke</div>
              <div className="text-xs text-[#a09885] tracking-wider uppercase">Made-to-Measure Fit</div>
            </div>
            <div className="space-y-1">
              <div className="font-cinzel text-lg font-bold text-gold">Global</div>
              <div className="text-xs text-[#a09885] tracking-wider uppercase">Express Concierge</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

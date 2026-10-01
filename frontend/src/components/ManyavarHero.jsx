import React from 'react';
import { ArrowRight, ChevronRight } from 'lucide-react';

export default function ManyavarHero({ activeTab = 'MEN', onSelectFilter }) {
  // Dynamic content based on active gender tab
  const heroData = {
    MEN: {
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=2000&q=85',
      title: 'This Wedding Season',
      subtext: 'Curated royal sherwanis, festive kurtas and bespoke bandhgalas for the modern groom and groomsmen.',
      pills: [
        { label: 'Shop As A Groom', filter: 'Sherwanis' },
        { label: 'Shop As A Wedding Attendee', filter: 'Indo-Western' },
        { label: 'Shop As A Festive Buyer', filter: 'Kurta Sets', isPrimary: true }
      ]
    },
    WOMEN: {
      image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=2000&q=85',
      title: 'The Mohey Bridal Era',
      subtext: 'Sacred Katan silk Banarasi sarees, 32-kali bridal lehengas, and ethereal pastel bridesmaid sets.',
      pills: [
        { label: 'Shop As A Bride', filter: 'Lehengas' },
        { label: 'Shop Banarasi Sarees', filter: 'Banarasi Sarees' },
        { label: 'Shop Festive Kurtis & Suits', filter: 'Kurtis & Suits', isPrimary: true }
      ]
    },
    KIDS: {
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=2000&q=85',
      title: 'Little Celebrations',
      subtext: 'Adorable miniature brocade sherwanis for boys and twirl-ready lehenga cholis for young princesses.',
      pills: [
        { label: "Boys' Sherwanis & Kurtas", filter: 'Kids' },
        { label: "Girls' Lehengas & Frocks", filter: 'Kids' },
        { label: 'Shop Kids Festive Edit', filter: 'Kids', isPrimary: true }
      ]
    },
    BLOGS: {
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=2000&q=85',
      title: 'The Shaadi Chronicle',
      subtext: 'Trend reports, karigar weaving stories, and celebrity wedding styling guides.',
      pills: [
        { label: 'Groom Styling Trends', filter: 'Men' },
        { label: 'Bridal Heritage Guide', filter: 'Women' },
        { label: 'Explore Celebration Blogs', filter: 'All', isPrimary: true }
      ]
    }
  };

  const current = heroData[activeTab] || heroData.MEN;

  return (
    <section className="relative w-full h-[72vh] min-h-[520px] max-h-[700px] overflow-hidden bg-[#e8dfd1]">
      {/* Background Campaign Visual */}
      <img
        src={current.image}
        alt={current.title}
        className="absolute inset-0 w-full h-full object-cover object-center filter brightness-95 contrast-105 transition-all duration-700"
      />

      {/* Gentle Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto h-full px-6 flex flex-col justify-end pb-12 sm:pb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          
          {/* Left: Typography */}
          <div className="max-w-xl space-y-3">
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal text-white drop-shadow-md tracking-tight">
              {current.title}
            </h1>
            <p className="text-white/90 text-sm sm:text-base font-sans drop-shadow-sm line-clamp-2 max-w-lg">
              {current.subtext}
            </p>
          </div>

          {/* Right: Manyavar Action Pills */}
          <div className="flex flex-col sm:items-end gap-3">
            {current.pills.map((pill, idx) => (
              <button
                key={idx}
                onClick={() => onSelectFilter && onSelectFilter(pill.filter)}
                className={`text-xs font-semibold tracking-wider transition-all duration-300 flex items-center justify-between gap-4 cursor-pointer text-left ${
                  pill.isPrimary
                    ? 'bg-[#e25822] hover:bg-[#c84412] text-white px-6 py-3.5 rounded-sm shadow-md font-bold'
                    : 'text-white/90 hover:text-white px-4 py-2 hover:bg-black/30 rounded-sm'
                }`}
              >
                <span>{pill.label}</span>
                {pill.isPrimary && <ArrowRight size={14} />}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Slider Indicator Dots on Right */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-2 z-20">
        <div className="w-2 h-2 rounded-full bg-[#e25822]" />
        <div className="w-2 h-2 rounded-full bg-white/60" />
        <div className="w-2 h-2 rounded-full bg-white/60" />
      </div>
    </section>
  );
}

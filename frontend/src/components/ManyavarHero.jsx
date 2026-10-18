import React from 'react';
import { ArrowRight, ChevronRight } from 'lucide-react';

export default function ManyavarHero({ activeTab = 'MEN', onSelectFilter }) {
  // Dynamic content based on active gender tab
  const heroData = {
    MEN: {
      image: '/images/vibe/men_royal_sherwani.jpg',
      title: 'This Wedding Season',
      subtext: 'Curated royal sherwanis, festive kurtas and bespoke bandhgalas by Chunnilal Megamart for the modern groom and groomsmen.',
      pills: [
        { label: 'Shop As A Groom', filter: 'Sherwanis' },
        { label: 'Shop As A Wedding Attendee', filter: 'Indo-Western' },
        { label: 'Shop As A Festive Buyer', filter: 'Kurta Sets', isPrimary: true }
      ]
    },
    WOMEN: {
      image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=2000&q=85',
      title: 'The Royal Bridal Era',
      subtext: 'Sacred Katan silk Banarasi sarees, 32-kali royal bridal lehengas, and ethereal pastel bridesmaid sets by Chunnilal Megamart.',
      pills: [
        { label: 'Shop As A Bride', filter: 'Lehengas' },
        { label: 'Shop Banarasi Sarees', filter: 'Banarasi Sarees' },
        { label: 'Shop Festive Kurtis & Suits', filter: 'Kurtis & Suits', isPrimary: true }
      ]
    }
  };

  const current = heroData[activeTab] || heroData.MEN;

  return (
    <section className="relative w-full h-[72vh] min-h-[520px] max-h-[720px] overflow-hidden bg-[#260e0a]">
      {/* Background Campaign Visuals with Silky Crossfade Transit */}
      {Object.entries(heroData).map(([tabKey, data]) => {
        const isCurrent = (activeTab === tabKey) || (!heroData[activeTab] && tabKey === 'MEN');
        return (
          <div
            key={tabKey}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              isCurrent 
                ? 'opacity-100 scale-100 z-1 pointer-events-auto' 
                : 'opacity-0 scale-105 z-0 pointer-events-none'
            }`}
          >
            <img
              src={data.image}
              alt={data.title}
              className="w-full h-full object-cover object-center filter brightness-95 contrast-105"
            />
          </div>
        );
      })}

      {/* Gentle Vignette Overlay */}
      <div className="absolute inset-0 z-2 bg-gradient-to-r from-black/60 via-black/20 to-black/30 pointer-events-none" />
      <div className="absolute inset-0 z-2 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />

      {/* Hero Content Container with Smooth Entrance */}
      <div className="relative z-10 w-full h-full px-4 sm:px-[30px] flex flex-col justify-end pb-12 sm:pb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          
          {/* Left: Typography with Keyed Slide Transition */}
          <div key={`text-${activeTab}`} className="max-w-2xl space-y-3 animate-heroContentSlide">
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal text-white drop-shadow-md tracking-tight">
              {current.title}
            </h1>
            <p className="text-white/90 text-sm sm:text-base font-sans drop-shadow-sm line-clamp-2 max-w-xl">
              {current.subtext}
            </p>
          </div>

          {/* Right: Action Pills with Smooth Motion */}
          <div key={`pills-${activeTab}`} className="flex flex-col sm:items-end gap-3 animate-heroPillSlide">
            {current.pills.map((pill, idx) => (
              <button
                key={idx}
                onClick={() => onSelectFilter && onSelectFilter(pill.filter)}
                className={`text-xs font-semibold tracking-wider transition-all duration-300 flex items-center justify-between gap-4 cursor-pointer text-left ${
                  pill.isPrimary
                    ? 'bg-[#e25822] hover:bg-[#c84412] text-white px-6 py-3.5 rounded-xs shadow-md font-bold hover:shadow-xl hover:scale-[1.02]'
                    : 'text-white/90 hover:text-white px-4 py-2 hover:bg-black/40 rounded-xs backdrop-blur-xs'
                }`}
                style={{ animationDelay: `${idx * 80}ms` }}
              >
                <span>{pill.label}</span>
                {pill.isPrimary && <ArrowRight size={14} />}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Slider Indicator Bar on Right */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-2.5 z-20">
        {['MEN', 'WOMEN'].map((tabKey) => {
          const isCurrent = (activeTab === tabKey) || (!heroData[activeTab] && tabKey === 'MEN');
          return (
            <div
              key={tabKey}
              className={`rounded-full transition-all duration-500 ${
                isCurrent 
                  ? 'w-2 h-6 bg-[#e25822] shadow-md' 
                  : 'w-2 h-2 bg-white/50 hover:bg-white'
              }`}
            />
          );
        })}
      </div>
    </section>
  );
}

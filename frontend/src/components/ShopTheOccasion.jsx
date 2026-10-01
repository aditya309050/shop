import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function ShopTheOccasion({ onSelectOccasion }) {
  const occasions = [
    {
      id: 'WEDDING',
      title: 'WEDDING',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=85',
      filter: 'Wedding'
    },
    {
      id: 'RECEPTION',
      title: 'RECEPTION',
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=85',
      filter: 'Reception'
    },
    {
      id: 'ENGAGEMENT',
      title: 'ENGAGEMENT',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=85',
      filter: 'Engagement'
    },
    {
      id: 'SANGEET',
      title: 'SANGEET',
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=85',
      filter: 'Sangeet'
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      {/* Decorative Motif & Heading */}
      <div className="text-center mb-10 space-y-2">
        <div className="flex justify-center mb-1">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#b33a10]">
            <path d="M12 2L14.5 8.5L21 9.5L16 14L17.5 21L12 17.5L6.5 21L8 14L3 9.5L9.5 8.5L12 2Z" fill="currentColor" opacity="0.85" />
          </svg>
        </div>

        <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal tracking-[0.15em] text-[#2b241e] uppercase">
          SHOP THE OCCASION
        </h2>
      </div>

      {/* 4 Cards Grid */}
      <div className="relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {occasions.map((occ) => (
            <div
              key={occ.id}
              onClick={() => onSelectOccasion && onSelectOccasion(occ.filter || occ.title)}
              className="group relative cursor-pointer overflow-hidden rounded-sm border border-[#e6dccf] bg-[#ede3d2] shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1.5"
              style={{ height: '420px' }}
            >
              <img
                src={occ.image}
                alt={occ.title}
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Bottom Dark Maroon Gradient Banner */}
              <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#260e0a] via-[#3b1812]/85 to-transparent flex items-end justify-center pb-4">
                <span className="font-serif text-white text-base sm:text-lg font-bold tracking-[0.14em] uppercase text-center px-4 drop-shadow-md group-hover:text-[#f7e0b5] transition-colors">
                  {occ.title}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Circular Arrows */}
        <button className="hidden xl:flex absolute -left-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-md border border-[#e8dfd1] text-[#2b241e] hover:bg-[#e25822] hover:text-white items-center justify-center transition-all cursor-pointer">
          <ChevronLeft size={20} />
        </button>
        <button className="hidden xl:flex absolute -right-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-md border border-[#e8dfd1] text-[#2b241e] hover:bg-[#e25822] hover:text-white items-center justify-center transition-all cursor-pointer">
          <ChevronRight size={20} />
        </button>
      </div>
    </section>
  );
}

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function WhatsYourVibe({ activeTab = 'MEN', onSelectVibe }) {
  const vibesByGender = {
    MEN: [
      {
        id: 'SHERWANI',
        title: 'SHERWANI',
        image: 'https://images.unsplash.com/photo-1597983073493-88cd35cf93b0?auto=format&fit=crop&w=800&q=85',
        filter: 'Sherwanis'
      },
      {
        id: 'INDO WESTERN',
        title: 'INDO WESTERN',
        image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=85',
        filter: 'Indo-Western'
      },
      {
        id: 'JODHPURI',
        title: 'JODHPURI',
        image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=85',
        filter: 'Indo-Western'
      },
      {
        id: 'KURTA JACKET SET',
        title: 'KURTA JACKET SET',
        image: 'https://images.unsplash.com/photo-1565708097881-bbf4ecf47cc1?auto=format&fit=crop&w=800&q=85',
        filter: 'Kurta Sets'
      }
    ],
    WOMEN: [
      {
        id: 'BANARASI SAREE',
        title: 'BANARASI SAREE',
        image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=85',
        filter: 'Banarasi Sarees'
      },
      {
        id: 'BRIDAL LEHENGA',
        title: 'BRIDAL LEHENGA',
        image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=85',
        filter: 'Lehengas'
      },
      {
        id: 'KURTI & SUITS',
        title: 'KURTI & SUITS',
        image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=85',
        filter: 'Kurtis & Suits'
      },
      {
        id: 'GOWNS & ANARKALIS',
        title: 'GOWNS & ANARKALIS',
        image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=85',
        filter: 'Anarkalis'
      }
    ],
    KIDS: [
      {
        id: 'BOYS SHERWANI',
        title: 'BOYS SHERWANI',
        image: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=800&q=85',
        filter: 'Kids'
      },
      {
        id: 'GIRLS LEHENGA',
        title: 'GIRLS LEHENGA',
        image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=800&q=85',
        filter: 'Kids'
      },
      {
        id: 'BOYS KURTA SET',
        title: 'BOYS KURTA SET',
        image: 'https://images.unsplash.com/photo-1471286174890-9c112ffca56a?auto=format&fit=crop&w=800&q=85',
        filter: 'Kids'
      },
      {
        id: 'GIRLS ANARKALI',
        title: 'GIRLS ANARKALI',
        image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=800&q=85',
        filter: 'Kids'
      }
    ]
  };

  const vibes = vibesByGender[activeTab] || vibesByGender.MEN;

  return (
    <section className="w-full px-4 sm:px-[30px] py-14 bg-[#fbf8f2]">
      {/* Centered Decorative Motif & Heading */}
      <div className="text-center mb-10 space-y-2">
        {/* Manyavar Floral Motif Icon */}
        <div className="flex justify-center mb-1">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-[#b33a10]">
            <path d="M12 2L14.5 8.5L21 9.5L16 14L17.5 21L12 17.5L6.5 21L8 14L3 9.5L9.5 8.5L12 2Z" fill="currentColor" opacity="0.9" />
          </svg>
        </div>

        <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal tracking-[0.16em] text-[#2b241e] uppercase">
          WHAT'S YOUR VIBE?
        </h2>
      </div>

      {/* 4 Arch Cards Container */}
      <div className="relative w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {vibes.map((item, idx) => (
            <div
              key={idx}
              onClick={() => onSelectVibe && onSelectVibe(item.filter || item.title)}
              className="group relative cursor-pointer overflow-hidden rounded-t-[140px] rounded-b-sm border border-[#e6dccf] bg-[#ede3d2] shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
              style={{ height: '460px' }}
            >
              {/* Portrait Image */}
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Bottom Dark Maroon Gradient Banner */}
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#260e0a] via-[#3b1812]/80 to-transparent flex items-end justify-center pb-5">
                <span className="font-serif text-white text-sm sm:text-base font-bold tracking-[0.15em] uppercase text-center px-4 drop-shadow-md group-hover:text-[#f7e0b5] transition-colors">
                  {item.title}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Circular Left & Right Navigation Arrows */}
        <button className="hidden 2xl:flex absolute -left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-md border border-[#e8dfd1] text-[#2b241e] hover:bg-[#e25822] hover:text-white items-center justify-center transition-all cursor-pointer z-10">
          <ChevronLeft size={20} />
        </button>
        <button className="hidden 2xl:flex absolute -right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-md border border-[#e8dfd1] text-[#2b241e] hover:bg-[#e25822] hover:text-white items-center justify-center transition-all cursor-pointer z-10">
          <ChevronRight size={20} />
        </button>
      </div>
    </section>
  );
}

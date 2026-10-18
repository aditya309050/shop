import React from 'react';

export default function ShopTheOccasion({ activeTab = 'MEN', onSelectOccasion }) {
  const occasionsByGender = {
    MEN: [
      {
        id: 'WEDDING',
        title: 'WEDDING',
        subtitle: 'Royal Grooms & Grand Weddings',
        image: '/images/vibe/men_royal_sherwani.jpg',
        filter: 'Wedding'
      },
      {
        id: 'RECEPTION',
        title: 'RECEPTION',
        subtitle: 'Imperial Velvet Bandhgalas',
        image: '/images/vibe/men_reception_wear.jpg',
        filter: 'Reception'
      },
      {
        id: 'ENGAGEMENT',
        title: 'ENGAGEMENT',
        subtitle: 'Sculpted Indo-Western Ensembles',
        image: '/images/vibe/men_indo_western.jpg',
        filter: 'Engagement'
      },
      {
        id: 'SANGEET',
        title: 'SANGEET',
        subtitle: 'Celebration Silk Kurta Jackets',
        image: '/images/vibe/men_sangeet_wear.jpg',
        filter: 'Sangeet'
      },
      {
        id: 'CASUAL WEAR',
        title: 'CASUAL WEAR',
        subtitle: 'Relaxed Luxury Linen & Silk Kurtas',
        image: '/images/vibe/men_casual_wear.jpg',
        filter: 'Casual'
      }
    ],
    WOMEN: [
      {
        id: 'WEDDING',
        title: 'WEDDING',
        subtitle: 'Heirloom Royal Bridal Lehengas',
        image: '/images/vibe/bridal_lehenga.jpg',
        filter: 'Wedding'
      },
      {
        id: 'RECEPTION',
        title: 'RECEPTION',
        subtitle: 'Flared Royal Anarkalis & Gowns',
        image: '/images/vibe/gowns_anarkalis.jpg',
        filter: 'Reception'
      },
      {
        id: 'ENGAGEMENT',
        title: 'ENGAGEMENT',
        subtitle: 'Statement Cocktail Ensembles',
        image: '/images/vibe/engagement_wear.jpg',
        filter: 'Engagement'
      },
      {
        id: 'SANGEET',
        title: 'SANGEET',
        subtitle: 'Dramatic Twirl Shararas & Ghararas',
        image: '/images/vibe/sharara_gharara.jpg',
        filter: 'Sangeet'
      },
      {
        id: 'CASUAL WEAR',
        title: 'CASUAL WEAR',
        subtitle: 'Chanderi Suits & Festive Kurtis',
        image: '/images/vibe/kurti_suits.jpg',
        filter: 'Casual'
      }
    ]
  };

  const occasions = occasionsByGender[activeTab] || occasionsByGender.MEN;

  return (
    <section className="w-full px-4 sm:px-[30px] py-14 bg-[#fbf8f2]">
      {/* Decorative Motif & Heading */}
      <div className="text-center mb-10 space-y-2">
        <div className="flex justify-center mb-1">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-[#b33a10]">
            <path d="M12 2L14.5 8.5L21 9.5L16 14L17.5 21L12 17.5L6.5 21L8 14L3 9.5L9.5 8.5L12 2Z" fill="currentColor" opacity="0.9" />
          </svg>
        </div>

        <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal tracking-[0.16em] text-[#2b241e] uppercase">
          SHOP THE OCCASION
        </h2>
        <p className="font-sans text-xs sm:text-sm text-[#786e62] tracking-wider uppercase font-semibold">
          Curated Ensembles for Every Grand Celebration
        </p>
      </div>

      {/* 5 Cards Responsive Grid */}
      <div className="relative w-full">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
          {occasions.map((occ) => (
            <div
              key={occ.id}
              onClick={() => onSelectOccasion && onSelectOccasion(occ.filter || occ.title)}
              className="group relative cursor-pointer overflow-hidden rounded-md border border-[#e6dccf] bg-[#ede3d2] shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 select-none"
              style={{ height: '440px' }}
            >
              {/* Card Image */}
              <img
                src={occ.image}
                alt={occ.title}
                loading="eager"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = activeTab === 'WOMEN'
                    ? '/images/vibe/bridal_lehenga.jpg'
                    : '/images/vibe/men_royal_sherwani.jpg';
                }}
                className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-108"
              />

              {/* Subtle Ambient Vignette */}
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300 pointer-events-none" />

              {/* Bottom Dark Maroon Gradient Banner with Title and Subtitle */}
              <div className="absolute inset-x-0 bottom-0 min-h-[110px] bg-gradient-to-t from-[#260e0a] via-[#3b1812]/90 via-60% to-transparent flex flex-col justify-end items-center pb-5 px-3 text-center transition-all duration-300">
                <span className="font-serif text-white text-sm sm:text-base font-bold tracking-[0.16em] uppercase drop-shadow-md group-hover:text-[#f7e0b5] transition-colors">
                  {occ.title}
                </span>
                {occ.subtitle && (
                  <span className="text-[#eaddc5]/80 text-[11px] font-sans tracking-wider uppercase mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-1">
                    {occ.subtitle}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

export default function WhatsYourVibe({ activeTab = 'MEN', onSelectVibe }) {
  const carouselRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isAutoPlayActive, setIsAutoPlayActive] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const isInteractingRef = useRef(false);
  const scrollPosRef = useRef(0);
  const rafIdRef = useRef(null);
  const lastTimeRef = useRef(null);

  const vibesByGender = {
    WOMEN: [
      {
        id: 'BRIDAL LEHENGA',
        title: 'BRIDAL LEHENGA',
        description: 'Grand royal wedding lehengas with heirloom 32-kali flare and Mughal zardozi embroidery.',
        image: '/images/vibe/bridal_lehenga.jpg',
        filter: 'Lehengas'
      },
      {
        id: 'BANARASI SAREE',
        title: 'BANARASI SAREE',
        description: 'Pure Katan and Kadwa silk weaves from the timeless heritage weavers of Varanasi.',
        image: '/images/vibe/banarasi_saree.jpg',
        filter: 'Banarasi Sarees'
      },
      {
        id: 'KURTI & SUITS',
        title: 'KURTI & SUITS',
        description: 'Everyday festive luxury, embroidered Chanderi suits, and elegant palazzo ensembles.',
        image: '/images/vibe/kurti_suits.jpg',
        filter: 'Kurtis & Suits'
      },
      {
        id: 'GOWNS & ANARKALIS',
        title: 'GOWNS & ANARKALIS',
        description: 'Floor-length flared royal Anarkalis and modern evening celebration gowns.',
        image: '/images/vibe/gowns_anarkalis.jpg',
        filter: 'Indo-Western'
      },
      {
        id: 'SHARARA & GHARARA',
        title: 'SHARARA & GHARARA',
        description: 'Dramatic festive silhouettes crafted for Sangeet nights and Mehendi twirls.',
        image: '/images/vibe/sharara_gharara.jpg',
        filter: 'Kurtis & Suits'
      },
      {
        id: 'FESTIVE EDIT',
        title: 'FESTIVE EDIT',
        description: 'Luminous pastel and jewel-tone ensembles for Diwali, Eid, and family celebrations.',
        image: '/images/vibe/festive_edit.jpg',
        filter: 'Festive'
      },
      {
        id: 'ENGAGEMENT WEAR',
        title: 'ENGAGEMENT WEAR',
        description: 'Sophisticated contemporary cocktail sarees and pre-wedding statement looks.',
        image: '/images/vibe/engagement_wear.jpg',
        filter: 'Engagement'
      },
      {
        id: 'DUPATTAS & ACCESSORIES',
        title: 'DUPATTAS & ACCESSORIES',
        description: 'Rich Banarasi brocade odhanis, heirloom sheer dupattas, potlis, and royal jewellery.',
        image: '/images/vibe/dupattas_accessories.jpg',
        filter: 'Accessories'
      }
    ],
    MEN: [
      {
        id: 'SHERWANI',
        title: 'ROYAL SHERWANI',
        description: 'Handcrafted zardozi & raw silk sherwanis for grooms and grand weddings.',
        image: '/images/vibe/men_royal_sherwani.jpg',
        filter: 'Sherwanis'
      },
      {
        id: 'INDO WESTERN',
        title: 'INDO WESTERN',
        description: 'Contemporary asymmetric sculpted jackets, cowl drapes and tailored royal ensembles.',
        image: '/images/vibe/men_indo_western.jpg',
        filter: 'Indo-Western'
      },
      {
        id: 'JODHPURI',
        title: 'JODHPURI BANDHGALA',
        description: 'Regal structured high-collar bandhgalas for receptions and royal formal celebrations.',
        image: '/images/vibe/men_jodhpuri.jpg',
        filter: 'Indo-Western'
      },
      {
        id: 'KURTA JACKET SET',
        title: 'KURTA & BUNDI JACKET',
        description: 'Pure silk kurtas paired with embroidered Nehru jackets for Haldi & Mehendi.',
        image: '/images/vibe/men_kurta_jacket.jpg',
        filter: 'Kurta Sets'
      },
      {
        id: 'FESTIVE KURTA',
        title: 'FESTIVE KURTA PAJAMA',
        description: 'Classic festive silk and chikankari kurtas tailored for pujas and celebrations.',
        image: '/images/vibe/men_kurta_pajama.jpg',
        filter: 'Kurta Sets'
      },
      {
        id: 'HALDI & MEHENDI',
        title: 'HALDI & MEHENDI WEAR',
        description: 'Auspicious vibrant mustard yellow and mint green raw silk festive kurtas.',
        image: '/images/vibe/men_dhoti_angrakha.jpg',
        filter: 'Kurta Sets'
      },
      {
        id: 'VELVET SHERWANI',
        title: 'ROYAL VELVET SHERWANI',
        description: 'Opulent crimson and antique gold embroidered velvet groom sherwanis.',
        image: '/images/vibe/men_velvet_sherwani.jpg',
        filter: 'Sherwanis'
      },
      {
        id: 'SAFAS & ACCESSORIES',
        title: 'SAFAS & ACCESSORIES',
        description: 'Royal groom pagris, kalgi jewels, pearl malas, silk stoles, and handcrafted mojaris.',
        image: '/images/vibe/men_safas_accessories.jpg',
        filter: 'Accessories'
      }
    ]
  };

  const vibes = vibesByGender[activeTab] || vibesByGender.MEN;

  // Render 3 seamless repeating sets for endless, smooth linear drift
  const displayVibes = [...vibes, ...vibes, ...vibes];

  // Calculate the exact width of a single 8-card set (including gaps)
  const getSingleSetWidth = useCallback(() => {
    if (!carouselRef.current) return 0;
    const cards = carouselRef.current.querySelectorAll('.vibe-card');
    if (cards.length >= vibes.length * 2) {
      const card0 = cards[0];
      const card8 = cards[vibes.length];
      if (card0 && card8) {
        return card8.offsetLeft - card0.offsetLeft;
      }
    }
    return 0;
  }, [vibes.length]);

  // Soft continuous motion speed: ~28 pixels per second (calm, royal, readable)
  const SPEED = 28;

  // Continuous animation frame loop
  useEffect(() => {
    const container = carouselRef.current;
    if (!container) return;

    // Reset position on tab switch
    scrollPosRef.current = 0;
    container.scrollLeft = 0;
    lastTimeRef.current = null;

    let singleSetWidth = getSingleSetWidth();

    const loop = (currentTime) => {
      if (!lastTimeRef.current) {
        lastTimeRef.current = currentTime;
      }
      const deltaTime = Math.min((currentTime - lastTimeRef.current) / 1000, 0.1);
      lastTimeRef.current = currentTime;

      if (isAutoPlayActive && !isHovered && !isInteractingRef.current && container) {
        if (!singleSetWidth) {
          singleSetWidth = getSingleSetWidth();
        }

        if (singleSetWidth > 0) {
          scrollPosRef.current += SPEED * deltaTime;

          // Seamless loop when passing singleSetWidth with ZERO visual jump
          if (scrollPosRef.current >= singleSetWidth) {
            scrollPosRef.current -= singleSetWidth;
          }

          container.scrollLeft = scrollPosRef.current;

          // Continuous progress indicator calculation (0 - 100%)
          const progress = ((scrollPosRef.current % singleSetWidth) / singleSetWidth) * 100;
          setScrollProgress(progress);
        }
      }

      rafIdRef.current = requestAnimationFrame(loop);
    };

    rafIdRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      lastTimeRef.current = null;
    };
  }, [isAutoPlayActive, isHovered, activeTab, getSingleSetWidth]);

  // Sync scroll position when user manually drags or scrolls
  const handleScroll = () => {
    if (isInteractingRef.current && carouselRef.current) {
      const singleSetWidth = getSingleSetWidth();
      let current = carouselRef.current.scrollLeft;
      if (singleSetWidth > 0) {
        if (current >= singleSetWidth * 2) {
          current -= singleSetWidth;
          carouselRef.current.scrollLeft = current;
        } else if (current < 0) {
          current += singleSetWidth;
          carouselRef.current.scrollLeft = current;
        }
        scrollPosRef.current = current;
        setScrollProgress(((current % singleSetWidth) / singleSetWidth) * 100);
      }
    }
  };

  // Arrow button click: glide smoothly forward or backward by 1 card
  const handleArrowScroll = (direction) => {
    const container = carouselRef.current;
    if (!container) return;
    isInteractingRef.current = true;

    const cards = container.querySelectorAll('.vibe-card');
    const step = cards[0] ? cards[0].offsetWidth + 24 : 350;
    const singleSetWidth = getSingleSetWidth();

    let target = direction === 'right' 
      ? container.scrollLeft + step 
      : container.scrollLeft - step;

    if (singleSetWidth > 0) {
      if (target >= singleSetWidth * 2) {
        target -= singleSetWidth;
      } else if (target < 0) {
        target += singleSetWidth;
      }
    }

    container.scrollTo({
      left: target,
      behavior: 'smooth'
    });

    setTimeout(() => {
      if (carouselRef.current) {
        scrollPosRef.current = carouselRef.current.scrollLeft;
      }
      isInteractingRef.current = false;
    }, 450);
  };

  return (
    <section className="w-full py-16 bg-[#fbf8f2] relative overflow-hidden">
      {/* Centered Decorative Motif & Heading */}
      <div className="text-center mb-10 space-y-2 px-4">
        <div className="flex justify-center items-center gap-2 mb-1">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#e25822]">
            <path d="M12 2L14.5 8.5L21 9.5L16 14L17.5 21L12 17.5L6.5 21L8 14L3 9.5L9.5 8.5L12 2Z" fill="currentColor" opacity="0.9" />
          </svg>
        </div>

        <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal tracking-[0.16em] text-[#2b241e] uppercase">
          WHAT'S YOUR VIBE?
        </h2>
        <p className="font-sans text-xs sm:text-sm text-[#786e62] tracking-wider uppercase font-semibold">
          Curated Royal Celebration & Ethnic Edits
        </p>
      </div>

      {/* True Full-Width Arched Cards Carousel Container with Pause on Hover/Touch */}
      <div 
        className="relative w-full px-3 sm:px-6 md:px-10 lg:px-14 xl:px-16"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={() => {
          isInteractingRef.current = true;
          setIsHovered(true);
        }}
        onTouchEnd={() => {
          setTimeout(() => {
            isInteractingRef.current = false;
            setIsHovered(false);
            if (carouselRef.current) {
              scrollPosRef.current = carouselRef.current.scrollLeft;
            }
          }, 1200);
        }}
      >
        
        {/* Left Arrow Button */}
        <button 
          onClick={() => handleArrowScroll('left')}
          className="absolute left-2 sm:left-4 lg:left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/95 backdrop-blur-sm shadow-xl border border-[#e8dfd1] text-[#2b241e] flex items-center justify-center transition-all duration-300 z-30 hover:bg-[#e25822] hover:text-white hover:scale-110 cursor-pointer shadow-lg"
          aria-label="Previous vibe"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Continuous Soft Moving Scrollable Track */}
        <div 
          ref={carouselRef}
          onScroll={handleScroll}
          className="flex items-stretch gap-5 sm:gap-6 overflow-x-auto no-scrollbar py-4 px-1 select-none"
        >
          {displayVibes.map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              onClick={() => onSelectVibe && onSelectVibe(item.filter || item.title)}
              className="vibe-card flex-none w-[270px] sm:w-[300px] md:w-[325px] lg:w-[340px] xl:w-[355px] group relative cursor-pointer overflow-hidden rounded-t-[140px] sm:rounded-t-[160px] rounded-b-md border border-[#e6dccf] bg-[#ede3d2] shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 select-none"
              style={{ height: '500px' }}
            >
              {/* Authentic High-Resolution Portrait Visual with Fallback */}
              <img
                src={item.image}
                alt={item.title}
                loading="eager"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = activeTab === 'WOMEN' 
                    ? '/images/vibe/bridal_lehenga.jpg' 
                    : '/images/vibe/men_royal_sherwani.jpg';
                }}
                className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-108"
              />

              {/* Arch Framing Border Highlight */}
              <div className="absolute inset-0 rounded-t-[140px] sm:rounded-t-[160px] border-2 border-transparent group-hover:border-[#e25822]/50 transition-colors duration-500 pointer-events-none" />

              {/* Bottom Dark Maroon Gradient Overlay with Title and Description */}
              <div className="absolute inset-x-0 bottom-0 min-h-[175px] bg-gradient-to-t from-[#260e0a] via-[#3b1812]/92 via-50% to-transparent flex flex-col justify-end items-center px-4 pb-6 pt-10 text-center transition-all duration-300">
                
                {/* Category Title */}
                <span className="font-cinzel text-white text-sm sm:text-base font-bold tracking-[0.16em] uppercase drop-shadow-md group-hover:text-[#f7e0b5] transition-colors">
                  {item.title}
                </span>

                {/* Specific Descriptive Text */}
                <p className="text-[#eaddc5]/90 text-[11px] sm:text-xs font-sans font-normal line-clamp-2 mt-2 leading-relaxed tracking-normal group-hover:text-white transition-colors max-w-[280px]">
                  {item.description}
                </p>

                {/* Micro-Interaction CTA */}
                <div className="mt-2.5 flex items-center gap-1.5 text-[#e25822] text-[11px] font-cinzel font-bold tracking-widest uppercase opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  <span>Explore Vibe</span>
                  <ChevronRight size={13} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Arrow Button */}
        <button 
          onClick={() => handleArrowScroll('right')}
          className="absolute right-2 sm:right-4 lg:right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/95 backdrop-blur-sm shadow-xl border border-[#e8dfd1] text-[#2b241e] flex items-center justify-center transition-all duration-300 z-30 hover:bg-[#e25822] hover:text-white hover:scale-110 cursor-pointer shadow-lg"
          aria-label="Next vibe"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Carousel Progress Track & Continuous Animation Status */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 px-4">
        <div className="flex items-center gap-3">
          <div className="w-36 sm:w-48 h-1.5 bg-[#e8dfd1] rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#e25822] transition-all duration-150 rounded-full"
              style={{ width: `${Math.max(8, scrollProgress)}%` }}
            />
          </div>
          <span className="text-[11px] font-cinzel tracking-wider text-[#786e62] uppercase font-semibold">
            Explore all {vibes.length} festive vibes
          </span>
        </div>

        {/* Luxury Continuous Animation Status & Toggle Button */}
        <button
          onClick={() => setIsAutoPlayActive(prev => !prev)}
          className={`flex items-center gap-2 px-3.5 py-1 rounded-full text-[11px] font-cinzel font-semibold tracking-wider transition-all border cursor-pointer ${
            isAutoPlayActive 
              ? 'bg-white text-[#2b241e] border-[#e25822]/40 shadow-xs hover:border-[#e25822]' 
              : 'bg-[#ede3d2]/60 text-[#786e62] border-[#e8dfd1] hover:text-[#2b241e]'
          }`}
          title={isAutoPlayActive ? "Click to pause continuous motion" : "Click to resume continuous motion"}
        >
          {isAutoPlayActive ? (
            <>
              <span className={`w-1.5 h-1.5 rounded-full ${isHovered ? 'bg-[#9c9182]' : 'bg-[#e25822] animate-pulse'}`} />
              <Pause size={12} className="text-[#e25822]" />
              <span>{isHovered ? 'Paused (Hovered)' : 'Soft Continuous Flow'}</span>
            </>
          ) : (
            <>
              <Play size={12} className="text-[#786e62]" />
              <span>Flow Paused</span>
            </>
          )}
        </button>
      </div>
    </section>
  );
}

import React, { useState, useRef, useEffect } from 'react';
import { Search, ShoppingBag, User, Menu, X, ChevronRight, ChevronDown } from 'lucide-react';
import { useShop } from '../context/ShopContext';

// Traditional ornamental motif matching the luxury Indian festive Manyavar branding
function FestiveFanMotif({ className = "w-3.5 h-3.5 text-[#e25822]" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="3.5" r="1.3" />
      <circle cx="6.8" cy="6.2" r="1.3" />
      <circle cx="17.2" cy="6.2" r="1.3" />
      <circle cx="3.8" cy="11.5" r="1.3" />
      <circle cx="20.2" cy="11.5" r="1.3" />
      <path d="M12 13.5c-1.8 0-3.3-1.4-3.3-3.2 0-1.1.5-2.1 1.4-2.7-.9-.5-1.4-1.5-1.4-2.6 0-1.8 1.5-3.2 3.3-3.2s3.3 1.4 3.3 3.2c0 1.1-.5 2.1-1.4 2.6.9.6 1.4 1.6 1.4 2.7 0 1.8-1.5 3.2-3.3 3.2z" opacity="0.38" />
      <path d="M12 14.5v5.5M9.5 17.5h5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

// Background decorative watermark motif
function WatermarkMotif({ className = "w-6 h-6 text-[#e25822]/20" }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="2.5" fill="currentColor" opacity="0.5" />
      <circle cx="16" cy="6" r="1.8" fill="currentColor" opacity="0.4" />
      <circle cx="9" cy="9" r="1.8" fill="currentColor" opacity="0.4" />
      <circle cx="23" cy="9" r="1.8" fill="currentColor" opacity="0.4" />
      <circle cx="6" cy="16" r="1.8" fill="currentColor" opacity="0.4" />
      <circle cx="26" cy="16" r="1.8" fill="currentColor" opacity="0.4" />
      <path d="M16 16L16 7M16 16L10 10M16 16L22 10M16 16L7 16M16 16L25 16" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.35" />
    </svg>
  );
}

// Mega Menu Navigation Data
const MEGA_MENU_DATA = {
  WOMEN: {
    gender: 'Women',
    highlights: [
      { label: 'RASHMIKA & VIJAY', isOrange: true, hasMotif: true, filter: 'Celebrity' },
      { label: 'BRIDAL LEHENGAS', isOrange: true, filter: 'Lehengas' },
      { label: 'BESTSELLER', isOrange: false, filter: 'Bestseller' },
      { label: 'NEW ARRIVALS', isOrange: false, hasAsterisk: true, filter: 'New' },
      { label: 'EXPLORE MORE', isOrange: false, isCollection: true, filter: 'All' }
    ],
    shopByProduct: [
      { label: 'Lehenga', filter: 'Lehengas' },
      { label: 'Sarees', filter: 'Banarasi Sarees' },
      { label: 'Indo Western', filter: 'Indo-Western' },
      { label: 'Stitched Suit', filter: 'Kurtis & Suits' },
      { label: 'Blouse', filter: 'Kurtis & Suits' },
      { label: 'Accessories', filter: 'Accessories' }
    ],
    shopByOccasion: [
      { label: 'Wedding', filter: 'Wedding' },
      { label: 'Engagement', filter: 'Engagement' },
      { label: 'Sangeet', filter: 'Sangeet' },
      { label: 'Reception', filter: 'Reception' },
      { label: 'Mehendi', filter: 'Mehendi' },
      { label: 'Haldi', filter: 'Haldi' },
      { label: 'Cocktail', filter: 'Cocktail' }
    ],
    shopByCollection: [
      { label: 'Celebrity Wardrobe', filter: 'Celebrity' },
      { label: 'Casual', filter: 'Casual' },
      { label: 'Festive', filter: 'Festive' },
      { label: 'Wedding', filter: 'Wedding' }
    ],
    banners: [
      {
        id: 'bride',
        title: 'BRIDE',
        prefix1: "I'M",
        prefix2: "THE",
        filter: 'Lehengas',
        bgGradient: 'from-[#8a1c2c] via-[#b32637] to-[#cc3b4b]',
        image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=700&q=85'
      },
      {
        id: 'bridesmaid',
        title: 'BRIDESMAID',
        prefix1: "I'M",
        prefix2: "THE",
        filter: 'Kurtis & Suits',
        bgGradient: 'from-[#d97706] via-[#ea580c] to-[#f59e0b]',
        image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=700&q=85'
      }
    ]
  },
  MEN: {
    gender: 'Men',
    highlights: [
      { label: 'RANBEER & VARUN', isOrange: true, hasMotif: true, filter: 'Celebrity' },
      { label: 'GROOM SHERWANIS', isOrange: true, filter: 'Sherwanis' },
      { label: 'BESTSELLER', isOrange: false, filter: 'Bestseller' },
      { label: 'NEW ARRIVALS', isOrange: false, hasAsterisk: true, filter: 'New' },
      { label: 'EXPLORE MORE', isOrange: false, isCollection: true, filter: 'All' }
    ],
    shopByProduct: [
      { label: 'Sherwani', filter: 'Sherwanis' },
      { label: 'Kurta Sets', filter: 'Kurta Sets' },
      { label: 'Indo Western', filter: 'Indo-Western' },
      { label: 'Nehru Jackets', filter: 'Kurta Sets' },
      { label: 'Bandhgala & Suits', filter: 'Indo-Western' },
      { label: 'Accessories', filter: 'Accessories' }
    ],
    shopByOccasion: [
      { label: 'Wedding', filter: 'Wedding' },
      { label: 'Engagement', filter: 'Engagement' },
      { label: 'Sangeet & Baraat', filter: 'Sangeet' },
      { label: 'Reception', filter: 'Reception' },
      { label: 'Mehendi & Haldi', filter: 'Mehendi' },
      { label: 'Festive & Puja', filter: 'Festive' },
      { label: 'Cocktail', filter: 'Cocktail' }
    ],
    shopByCollection: [
      { label: 'Celebrity Wardrobe', filter: 'Celebrity' },
      { label: 'Royal Heritage', filter: 'Sherwanis' },
      { label: 'Modern Festive', filter: 'Indo-Western' },
      { label: 'Wedding', filter: 'Wedding' }
    ],
    banners: [
      {
        id: 'groom',
        title: 'GROOM',
        prefix1: "I'M",
        prefix2: "THE",
        filter: 'Sherwanis',
        bgGradient: 'from-[#42140c] via-[#652014] to-[#913120]',
        image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=700&q=85'
      },
      {
        id: 'bestman',
        title: 'BEST MAN',
        prefix1: "I'M",
        prefix2: "THE",
        filter: 'Kurta Sets',
        bgGradient: 'from-[#a23412] via-[#ca410b] to-[#ea580c]',
        image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=700&q=85'
      }
    ]
  }
};

export default function ManyavarNavbar({ 
  activeTab, 
  onSelectTab, 
  onSelectFilter,
  onNavigateCollections,
  onOpenSearch, 
  onOpenCart, 
  onOpenWishlist 
}) {
  const { cartCount } = useShop();
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpandedTab, setMobileExpandedTab] = useState('WOMEN');
  
  // Transition-friendly state management
  const [displayedNavTab, setDisplayedNavTab] = useState(activeTab || 'MEN');
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [hoveredNavTab, setHoveredNavTab] = useState(null); // 'MEN' | 'WOMEN' | null
  
  const leaveTimerRef = useRef(null);
  const navContainerRef = useRef(null);
  const tabRefs = useRef({});
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });

  // Cleaned navigation: ONLY MEN and WOMEN
  const tabs = [
    { id: 'MEN', label: 'MEN' },
    { id: 'WOMEN', label: 'WOMEN' }
  ];

  // Keep displayedNavTab in sync when activeTab changes externally
  useEffect(() => {
    if (!isDropdownVisible) {
      setDisplayedNavTab(activeTab);
    }
  }, [activeTab, isDropdownVisible]);

  // Smooth sliding underline indicator tracking active/hovered tab
  useEffect(() => {
    const currentTarget = hoveredNavTab || activeTab;
    const el = tabRefs.current[currentTarget];
    if (el && navContainerRef.current) {
      const navRect = navContainerRef.current.getBoundingClientRect();
      const tabRect = el.getBoundingClientRect();
      setIndicatorStyle({
        left: tabRect.left - navRect.left,
        width: tabRect.width,
        opacity: 1
      });
    }
  }, [hoveredNavTab, activeTab]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onOpenSearch) onOpenSearch(searchQuery);
  };

  const handleNavMouseEnter = (tabId) => {
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current);
      leaveTimerRef.current = null;
    }
    setHoveredNavTab(tabId);
    setDisplayedNavTab(tabId);
    setIsDropdownVisible(true);
  };

  const handleNavMouseLeave = () => {
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current);
    }
    leaveTimerRef.current = setTimeout(() => {
      setHoveredNavTab(null);
      setIsDropdownVisible(false);
    }, 240);
  };

  const handleDropdownMouseEnter = () => {
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current);
      leaveTimerRef.current = null;
    }
    setIsDropdownVisible(true);
  };

  const handleDropdownMouseLeave = () => {
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current);
    }
    leaveTimerRef.current = setTimeout(() => {
      setHoveredNavTab(null);
      setIsDropdownVisible(false);
    }, 240);
  };

  const handleItemClick = (genderId, filterTerm, isCollection = false) => {
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current);
    }
    setHoveredNavTab(null);
    setIsDropdownVisible(false);
    setMobileMenuOpen(false);
    onSelectTab(genderId);

    if (isCollection && onNavigateCollections) {
      onNavigateCollections();
    } else if (onSelectFilter) {
      onSelectFilter(filterTerm);
    }
  };

  // Close dropdown on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setHoveredNavTab(null);
        setIsDropdownVisible(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const currentMegaData = MEGA_MENU_DATA[displayedNavTab] || MEGA_MENU_DATA.MEN;

  return (
    <header 
      className="sticky top-0 z-40 bg-[#fbf8f2] border-b border-[#e8dfd1] shadow-xs w-full relative"
      onMouseLeave={handleNavMouseLeave}
    >
      <div className="w-full px-4 sm:px-[30px] h-20 flex items-center justify-between gap-6">
        
        {/* Left: Navigation Categories with Sliding Indicator */}
        <nav 
          ref={navContainerRef}
          className="hidden lg:flex items-center gap-8 font-cinzel text-xs tracking-[0.16em] font-bold text-[#2b241e] h-full relative"
        >
          {tabs.map((tab) => {
            const isTabActive = activeTab === tab.id;
            const isHovered = hoveredNavTab === tab.id;
            return (
              <div
                key={tab.id}
                ref={(el) => (tabRefs.current[tab.id] = el)}
                className="h-full flex items-center"
                onMouseEnter={() => handleNavMouseEnter(tab.id)}
              >
                <button
                  onClick={() => {
                    onSelectTab(tab.id);
                    setHoveredNavTab(null);
                    setIsDropdownVisible(false);
                  }}
                  className={`py-2 h-full flex items-center relative transition-colors duration-200 cursor-pointer uppercase ${
                    isTabActive || isHovered ? 'text-[#e25822]' : 'hover:text-[#e25822]'
                  }`}
                >
                  <span>{tab.label}</span>
                </button>
              </div>
            );
          })}

          {/* Smooth Sliding Underline Indicator Bar */}
          <div 
            className="absolute bottom-0 h-0.5 bg-[#e25822] transition-all duration-300 ease-out pointer-events-none rounded-full"
            style={{
              left: `${indicatorStyle.left}px`,
              width: `${indicatorStyle.width}px`,
              opacity: indicatorStyle.opacity
            }}
          />
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-[#2b241e]"
          aria-label="Toggle Mobile Navigation"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Center: Iconic Chunnilal Megamart Royal Logo */}
        <div 
          onClick={() => {
            onSelectTab('MEN');
            setHoveredNavTab(null);
            setIsDropdownVisible(false);
          }}
          className="cursor-pointer text-center flex items-center gap-2 select-none group py-1"
          title="Chunnilal Megamart"
        >
          <span className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#d4752b] drop-shadow-xs transition-colors group-hover:text-[#e25822]">
            Chunnilal
          </span>
          <div className="w-7 h-7 rounded-sm bg-gradient-to-br from-[#ea580c] via-[#e25822] to-[#c84412] text-[#fbf8f2] flex items-center justify-center font-cinzel font-bold text-[11px] tracking-wider shadow-sm border border-[#fbf8f2]/40 transition-transform duration-300 group-hover:scale-105">
            CM
          </div>
          <span className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#d4752b] drop-shadow-xs transition-colors group-hover:text-[#e25822]">
            Megamart
          </span>
        </div>

        {/* Right: Search Input & Account/Bag */}
        <div className="flex items-center gap-5">
          {/* Search Bar with Orange Action Button */}
          <form 
            onSubmit={handleSearchSubmit}
            className="hidden sm:flex items-center border border-[#d8cfbe] rounded-sm overflow-hidden bg-white shadow-inner focus-within:border-[#e25822] transition-colors"
          >
            <input
              type="text"
              placeholder={activeTab === 'WOMEN' ? 'Search for Bridal Lehenga, Saree...' : 'Search for Sherwani, Kurta...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-3.5 py-1.5 text-xs text-[#2b241e] placeholder-[#9c9182] outline-none w-52 md:w-64 bg-transparent font-sans"
            />
            <button
              type="submit"
              className="bg-[#e25822] hover:bg-[#c84412] text-white px-3.5 py-2 flex items-center justify-center transition-colors cursor-pointer"
            >
              <Search size={14} />
            </button>
          </form>

          {/* My Account */}
          <button 
            onClick={() => onOpenSearch && onOpenSearch()}
            className="hidden md:flex items-center gap-1.5 text-xs font-cinzel font-semibold text-[#2b241e] hover:text-[#e25822] transition-colors cursor-pointer uppercase tracking-wider"
          >
            <User size={15} />
            <span>MY ACCOUNT</span>
          </button>

          {/* Cart Bag */}
          <button
            onClick={onOpenCart}
            className="relative p-2 text-[#2b241e] hover:text-[#e25822] transition-colors cursor-pointer flex items-center gap-1"
            title="Shopping Bag"
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="bg-[#e25822] text-white text-[0.65rem] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* ============================================================ */}
      {/* DESKTOP MEGA DROPDOWN (Smooth Transit Architecture) */}
      {/* ============================================================ */}
      <div 
        onMouseEnter={handleDropdownMouseEnter}
        onMouseLeave={handleDropdownMouseLeave}
        className={`hidden lg:block absolute top-full left-0 w-full bg-[#fbf8f2] border-t border-[#e8dfd1] border-b border-[#ded3c3] shadow-2xl z-50 before:absolute before:inset-x-0 before:-top-3 before:h-4 before:content-[''] transition-all duration-300 ${
          isDropdownVisible 
            ? 'opacity-100 translate-y-0 pointer-events-auto visible' 
            : 'opacity-0 -translate-y-2 pointer-events-none invisible'
        }`}
        style={{
          transitionProperty: 'opacity, transform, visibility',
          transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
          transitionDuration: '240ms'
        }}
      >
        {/* Subtle floral watermark accents matching heritage design */}
        <div className="absolute top-6 left-6 pointer-events-none select-none">
          <WatermarkMotif className="w-8 h-8 text-[#e25822]/20" />
        </div>
        <div className="absolute bottom-6 left-1/3 pointer-events-none select-none">
          <WatermarkMotif className="w-7 h-7 text-[#e25822]/20" />
        </div>

        {/* Dynamic Mega Menu Contents with Smooth Crossfade & Staggered Transitions */}
        <div 
          key={displayedNavTab}
          className="animate-menuTransit max-w-[1400px] mx-auto px-8 sm:px-12 py-9 flex justify-between items-start gap-8 relative"
        >
          
          {/* Column 1: Featured Quick Links & Highlights */}
          <div className="w-[190px] shrink-0 flex flex-col space-y-4 pt-1">
            {currentMegaData.highlights.map((item, idx) => (
              <div 
                key={idx}
                onClick={() => handleItemClick(displayedNavTab, item.filter, item.isCollection)}
                className={`text-[13px] tracking-wider uppercase font-cinzel font-bold flex items-center gap-1.5 cursor-pointer transition-all duration-200 hover:translate-x-1 ${
                  item.isOrange 
                    ? 'text-[#e25822] hover:text-[#c84412]' 
                    : 'text-[#2b241e] hover:text-[#e25822]'
                }`}
              >
                <span>{item.label}</span>
                {item.hasMotif && <FestiveFanMotif className="w-3.5 h-3.5 text-[#e25822] shrink-0" />}
                {item.hasAsterisk && <span className="text-[#e25822] font-black text-sm leading-none">*</span>}
              </div>
            ))}
          </div>

          {/* Column 2: SHOP BY PRODUCT */}
          <div className="flex-1 min-w-[160px]">
            <h3 className="font-cinzel text-xs font-bold tracking-[0.14em] text-[#2b241e] uppercase mb-4">
              SHOP BY PRODUCT
            </h3>
            <ul className="space-y-2.5 font-sans text-[13px] text-[#423a31]">
              {currentMegaData.shopByProduct.map((prod, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => handleItemClick(displayedNavTab, prod.filter)}
                    className="hover:text-[#e25822] hover:translate-x-1 transition-all duration-200 cursor-pointer text-left block"
                  >
                    {prod.label}
                  </button>
                </li>
              ))}
              <li className="pt-2">
                <button
                  onClick={() => handleItemClick(displayedNavTab, 'All', true)}
                  className="font-bold text-[#2b241e] hover:text-[#e25822] hover:translate-x-1 flex items-center gap-1 transition-all duration-200 cursor-pointer text-left"
                >
                  <span>View All &gt;</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: SHOP BY OCCASION */}
          <div className="flex-1 min-w-[160px]">
            <h3 className="font-cinzel text-xs font-bold tracking-[0.14em] text-[#2b241e] uppercase mb-4">
              SHOP BY OCCASION
            </h3>
            <ul className="space-y-2.5 font-sans text-[13px] text-[#423a31]">
              {currentMegaData.shopByOccasion.map((occ, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => handleItemClick(displayedNavTab, occ.filter)}
                    className="hover:text-[#e25822] hover:translate-x-1 transition-all duration-200 cursor-pointer text-left block"
                  >
                    {occ.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: SHOP BY COLLECTION */}
          <div className="flex-1 min-w-[160px]">
            <h3 className="font-cinzel text-xs font-bold tracking-[0.14em] text-[#2b241e] uppercase mb-4">
              SHOP BY COLLECTION
            </h3>
            <ul className="space-y-2.5 font-sans text-[13px] text-[#423a31]">
              {currentMegaData.shopByCollection.map((col, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => handleItemClick(displayedNavTab, col.filter)}
                    className="hover:text-[#e25822] hover:translate-x-1 transition-all duration-200 cursor-pointer text-left block"
                  >
                    {col.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Columns 5 & 6: Featured Festive Promotional Cards (Matching Screenshot) */}
          <div className="w-[300px] shrink-0 flex flex-col gap-3.5 pt-0.5">
            {currentMegaData.banners.map((b) => (
              <div
                key={b.id}
                onClick={() => handleItemClick(displayedNavTab, b.filter)}
                className={`relative w-full h-[104px] rounded-xs overflow-hidden shadow-sm hover:shadow-lg cursor-pointer transition-all duration-300 hover:-translate-y-0.5 group bg-gradient-to-r ${b.bgGradient}`}
              >
                  {/* Left typography overlay styled identically to screenshot */}
                  <div className="absolute left-4 top-0 bottom-0 flex flex-col justify-center z-10 select-none text-left">
                    <span className="text-white font-black text-[15px] tracking-wider leading-none drop-shadow-xs font-sans">
                      {b.prefix1}
                    </span>
                    <span className="text-white font-black text-[15px] tracking-wider leading-none mt-1 drop-shadow-xs font-sans">
                      {b.prefix2}
                    </span>
                    <span className="text-white font-black tracking-wider uppercase border border-white/95 px-2 py-0.5 mt-1.5 shadow-sm text-[12px] bg-black/10 backdrop-blur-xs inline-block w-fit font-sans">
                      {b.title}
                    </span>
                  </div>

                  {/* Right model image with seamless gradient masking */}
                  <div className="absolute right-0 top-0 bottom-0 w-[140px] overflow-hidden">
                    <img 
                      src={b.image} 
                      alt={b.title}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Seamless gradient mask to blend image into the card background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent pointer-events-none" />
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

      {/* ============================================================ */}
      {/* MOBILE MENU (MEN & WOMEN ONLY, KIDS & BLOGS REMOVED) */}
      {/* ============================================================ */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#f5efe4] border-t border-[#e8dfd1] p-4 flex flex-col gap-4 font-cinzel text-xs font-bold text-[#2b241e] max-h-[85vh] overflow-y-auto">
          {/* Mobile Gender Switchers */}
          <div className="flex border-b border-[#ded3c3] pb-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setMobileExpandedTab(tab.id);
                  onSelectTab(tab.id);
                }}
                className={`flex-1 py-2 text-center text-sm font-bold uppercase transition-colors ${
                  mobileExpandedTab === tab.id 
                    ? 'text-[#e25822] border-b-2 border-[#e25822]' 
                    : 'text-[#786e62]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Expanded Mobile Submenu for the Selected Gender */}
          {mobileExpandedTab && MEGA_MENU_DATA[mobileExpandedTab] && (
            <div className="flex flex-col gap-4 pt-1">
              {/* Highlights */}
              <div className="flex flex-wrap gap-2">
                {MEGA_MENU_DATA[mobileExpandedTab].highlights.map((h, i) => (
                  <button
                    key={i}
                    onClick={() => handleItemClick(mobileExpandedTab, h.filter, h.isCollection)}
                    className={`text-[11px] px-2.5 py-1 rounded-sm border uppercase font-bold ${
                      h.isOrange 
                        ? 'bg-[#e25822]/10 border-[#e25822] text-[#e25822]' 
                        : 'bg-white border-[#d8cfbe] text-[#2b241e]'
                    }`}
                  >
                    {h.label}
                  </button>
                ))}
              </div>

              {/* Shop by Product */}
              <div className="bg-white p-3 rounded-sm border border-[#e8dfd1]">
                <h4 className="text-[11px] text-[#e25822] uppercase tracking-wider mb-2 font-bold">Shop By Product</h4>
                <div className="grid grid-cols-2 gap-2 font-sans font-normal text-xs text-[#423a31]">
                  {MEGA_MENU_DATA[mobileExpandedTab].shopByProduct.map((p, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleItemClick(mobileExpandedTab, p.filter)}
                      className="text-left py-1 hover:text-[#e25822]"
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Shop by Occasion */}
              <div className="bg-white p-3 rounded-sm border border-[#e8dfd1]">
                <h4 className="text-[11px] text-[#e25822] uppercase tracking-wider mb-2 font-bold">Shop By Occasion</h4>
                <div className="grid grid-cols-2 gap-2 font-sans font-normal text-xs text-[#423a31]">
                  {MEGA_MENU_DATA[mobileExpandedTab].shopByOccasion.map((o, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleItemClick(mobileExpandedTab, o.filter)}
                      className="text-left py-1 hover:text-[#e25822]"
                    >
                      {o.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Featured Banner Cards */}
              <div className="flex flex-col gap-2 pt-1">
                {MEGA_MENU_DATA[mobileExpandedTab].banners.map((b) => (
                  <div
                    key={b.id}
                    onClick={() => handleItemClick(mobileExpandedTab, b.filter)}
                    className={`relative w-full h-[76px] rounded-xs overflow-hidden shadow-xs cursor-pointer bg-gradient-to-r ${b.bgGradient}`}
                  >
                    <div className="absolute left-3 top-0 bottom-0 flex flex-col justify-center z-10 text-left">
                      <span className="text-white font-extrabold text-xs">{b.prefix1} {b.prefix2}</span>
                      <span className="text-white font-black text-xs tracking-wider uppercase border border-white/95 px-1.5 py-0.5 mt-0.5 rounded-[1px] w-fit bg-black/10">
                        {b.title}
                      </span>
                    </div>
                    <img 
                      src={b.image} 
                      alt={b.title}
                      className="absolute right-0 top-0 bottom-0 w-[100px] h-full object-cover object-top"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Search bar in mobile menu */}
          <div className="pt-2">
            <form onSubmit={handleSearchSubmit} className="flex border border-[#d8cfbe] rounded-sm overflow-hidden bg-white">
              <input
                type="text"
                placeholder="Search outfits..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-3 py-2 text-xs text-[#2b241e] outline-none flex-1 font-sans"
              />
              <button type="submit" className="bg-[#e25822] text-white px-4 py-2 cursor-pointer">
                <Search size={14} />
              </button>
            </form>
          </div>
        </div>
      )}
    </header>
  );
}


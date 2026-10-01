import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  Menu, 
  X, 
  Sparkles, 
  Crown,
  Volume2, 
  VolumeX, 
  PhoneCall, 
  ChevronDown,
  Compass,
  CalendarCheck
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function Navbar({ onNavigateSection, onNavigatePage, currentPage, audioPlaying, toggleAudio }) {
  const { 
    cartCount, 
    wishlistCount, 
    setIsCartOpen, 
    setIsWishlistOpen, 
    setIsSearchOpen,
    openBespoke,
    currency,
    setCurrency,
    currencies 
  } = useShop();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  const [activeGenderTab, setActiveGenderTab] = useState('ALL'); // 'ALL' | 'MEN' | 'WOMEN'

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'HOME', page: 'home' },
    { label: 'MEN (MANYAVAR)', category: 'Men', id: 'products' },
    { label: 'WOMEN (MOHEY)', category: 'Women', id: 'products' },
    { label: 'BANARASI SAREES', category: 'Banarasi Sarees', id: 'products' },
    { label: 'BRIDAL LEHENGAS', category: 'Lehengas', id: 'products' },
    { label: 'KURTIS & SUITS', category: 'Kurtis & Suits', id: 'products' },
    { label: 'COLLECTIONS', page: 'collections' },
    { label: 'BESPOKE APPOINTMENT', action: () => openBespoke() },
  ];

  const handleLinkClick = (link) => {
    setMobileMenuOpen(false);
    if (link.action) {
      link.action();
      return;
    }
    if (link.page) {
      if (onNavigatePage) onNavigatePage(link.page);
      return;
    }
    if (onNavigateSection) {
      onNavigateSection(link.id || 'products', link.category);
    }
  };

  return (
    <>
      {/* Top Luxury Announcement Bar */}
      <div style={{
        background: 'linear-gradient(90deg, #121014 0%, #2a0810 50%, #121014 100%)',
        borderBottom: '1px solid rgba(197, 160, 89, 0.25)',
        padding: '8px 24px',
        fontSize: '0.74rem',
        letterSpacing: '0.16em',
        textTransform: 'uppercase',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: '#eaddc5',
        position: 'relative',
        zIndex: 51
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Crown size={13} color="#c5a059" />
          <span style={{ fontWeight: 600, color: '#f3e5ab' }}>TAIYAAR HOKE AAIYE</span>
          <span style={{ opacity: 0.6 }}>|</span>
          <span style={{ display: 'none', md: 'inline' }}>Grand Festive & Wedding Edit 2026</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button
            onClick={() => openBespoke()}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#c5a059',
              fontSize: '0.72rem',
              fontFamily: 'var(--font-cinzel)',
              letterSpacing: '0.12em',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer'
            }}
          >
            <CalendarCheck size={12} />
            <span>Book Video Call / Salon Appointment</span>
          </button>

          {/* Audio Atmosphere Toggle */}
          <button
            onClick={toggleAudio}
            style={{
              background: 'rgba(197, 160, 89, 0.1)',
              border: '1px solid rgba(197, 160, 89, 0.3)',
              borderRadius: '20px',
              padding: '2px 10px',
              color: audioPlaying ? '#c5a059' : '#888',
              fontSize: '0.68rem',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              cursor: 'pointer'
            }}
          >
            {audioPlaying ? <Volume2 size={11} /> : <VolumeX size={11} />}
            <span>{audioPlaying ? 'Sound On' : 'Sound Off'}</span>
          </button>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header 
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
          background: isScrolled ? 'rgba(10, 10, 14, 0.96)' : 'rgba(12, 12, 16, 0.90)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(197, 160, 89, 0.25)',
          boxShadow: isScrolled ? '0 10px 30px rgba(0,0,0,0.8)' : 'none'
        }}
      >
        <div style={{
          maxWidth: '1440px',
          margin: '0 auto',
          padding: '0 24px',
          height: isScrolled ? '72px' : '82px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          transition: 'height 0.3s ease'
        }}>
          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#eaddc5',
              cursor: 'pointer',
              display: 'none',
              alignItems: 'center',
              padding: '6px'
            }}
            className="mobile-menu-btn"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Brand Logo - Manyavar & Mohey Heritage Style */}
          <div 
            onClick={() => onNavigatePage && onNavigatePage('home')}
            style={{ cursor: 'pointer', textAlign: 'left' }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span style={{
                fontFamily: 'var(--font-serif-display)',
                fontSize: isScrolled ? '1.55rem' : '1.85rem',
                fontWeight: 600,
                letterSpacing: '0.06em',
                color: '#faf8f5',
                transition: 'font-size 0.3s ease',
                textShadow: '0 2px 10px rgba(0,0,0,0.5)'
              }}>
                MANYAVAR <span style={{ color: '#c5a059', fontWeight: 300 }}>&</span> MOHEY
              </span>
            </div>
            <div style={{
              fontSize: '0.62rem',
              letterSpacing: '0.3em',
              color: '#c5a059',
              fontFamily: 'var(--font-cinzel)',
              textTransform: 'uppercase',
              marginTop: '-2px'
            }}>
              Celebration Wear • Paris • Mumbai • Varanasi
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav 
            className="desktop-nav"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '24px'
            }}
          >
            {navLinks.map((link) => {
              const isCollectionsActive = link.page === 'collections' && currentPage === 'collections';
              const isHomeActive = link.page === 'home' && currentPage === 'home';
              const isActive = isCollectionsActive || (isHomeActive && !link.category);

              return (
                <button
                  key={link.label}
                  onClick={() => handleLinkClick(link)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    fontFamily: 'var(--font-cinzel)',
                    fontSize: '0.75rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: isActive ? '#c5a059' : '#e0d8cc',
                    fontWeight: isActive ? 700 : 500,
                    cursor: 'pointer',
                    padding: '8px 4px',
                    position: 'relative',
                    transition: 'color 0.25s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#c5a059'}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.color = '#e0d8cc';
                  }}
                >
                  {link.label}
                  {isActive && (
                    <div style={{
                      position: 'absolute',
                      bottom: '0',
                      left: '0',
                      right: '0',
                      height: '2px',
                      background: 'linear-gradient(90deg, #c5a059, #faf8f5)',
                      borderRadius: '1px'
                    }} />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Actions: Currency, Search, Wishlist, Bag */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
            {/* Currency Selector */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
                style={{
                  background: 'rgba(25, 25, 32, 0.7)',
                  border: '1px solid rgba(197, 160, 89, 0.3)',
                  borderRadius: '30px',
                  padding: '6px 14px',
                  color: '#eaddc5',
                  fontSize: '0.74rem',
                  fontFamily: 'var(--font-cinzel)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <span>{currency}</span>
                <ChevronDown size={12} color="#c5a059" />
              </button>

              {showCurrencyDropdown && (
                <div style={{
                  position: 'absolute',
                  top: '110%',
                  right: 0,
                  background: '#121217',
                  border: '1px solid rgba(197, 160, 89, 0.4)',
                  borderRadius: '6px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.8)',
                  zIndex: 60,
                  minWidth: '100px',
                  overflow: 'hidden'
                }}>
                  {currencies.map(c => (
                    <div
                      key={c}
                      onClick={() => {
                        setCurrency(c);
                        setShowCurrencyDropdown(false);
                      }}
                      style={{
                        padding: '8px 14px',
                        fontSize: '0.75rem',
                        color: currency === c ? '#c5a059' : '#faf8f5',
                        cursor: 'pointer',
                        fontFamily: 'var(--font-cinzel)',
                        background: currency === c ? 'rgba(197,160,89,0.15)' : 'transparent'
                      }}
                    >
                      {c}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#eaddc5',
                cursor: 'pointer',
                padding: '6px',
                display: 'flex',
                alignItems: 'center',
                transition: 'color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#c5a059'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#eaddc5'}
              title="Search Collections"
            >
              <Search size={20} />
            </button>

            {/* Wishlist Icon with Counter Badge */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#eaddc5',
                cursor: 'pointer',
                padding: '6px',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                transition: 'color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#c5a059'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#eaddc5'}
              title="Wishlist"
            >
              <Heart size={20} />
              {wishlistCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-2px',
                  right: '-2px',
                  background: '#8A1C2C',
                  color: '#fff',
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid #c5a059'
                }}>
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Bag Icon with Counter Badge */}
            <button
              onClick={() => setIsCartOpen(true)}
              style={{
                background: 'linear-gradient(135deg, #c5a059 0%, #9a7632 100%)',
                border: 'none',
                color: '#0a0a0d',
                borderRadius: '30px',
                padding: '8px 18px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontFamily: 'var(--font-cinzel)',
                fontWeight: 700,
                fontSize: '0.78rem',
                letterSpacing: '0.1em',
                boxShadow: '0 4px 15px rgba(197, 160, 89, 0.35)',
                transition: 'transform 0.2s, box-shadow 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 22px rgba(197, 160, 89, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(197, 160, 89, 0.35)';
              }}
            >
              <ShoppingBag size={16} />
              <span>BAG ({cartCount})</span>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div style={{
            background: '#0d0d12',
            borderTop: '1px solid rgba(197, 160, 89, 0.3)',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleLinkClick(link)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#eaddc5',
                  fontFamily: 'var(--font-cinzel)',
                  fontSize: '0.85rem',
                  letterSpacing: '0.14em',
                  textAlign: 'left',
                  padding: '8px 0',
                  borderBottom: '1px solid rgba(255,255,255,0.06)'
                }}
              >
                {link.label}
              </button>
            ))}
          </div>
        )}
      </header>
    </>
  );
}

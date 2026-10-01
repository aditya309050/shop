import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  Menu, 
  X, 
  ChevronDown, 
  Sparkles,
  Volume2,
  VolumeX,
  Globe
} from 'lucide-react';

export default function Navbar({ onNavigateSection, onNavigatePage, currentPage, audioPlaying, toggleAudio }) {
  const { 
    cartCount, 
    wishlist, 
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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', id: 'home', page: 'home' },
    { label: 'Banarasi Sarees', id: 'products', category: 'Banarasi Sarees' },
    { label: 'Royal Lehengas', id: 'products', category: 'Lehengas' },
    { label: 'Collections', page: 'collections' },
    { label: 'Lookbook', id: 'trends' },
    { label: 'Bespoke Salon', action: () => openBespoke() },
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
      onNavigateSection(link.id, link.category);
    }
  };

  return (
    <>
      {/* Top Luxury Announcement Bar */}
      <div style={{
        background: 'linear-gradient(90deg, #111115 0%, #1c1812 50%, #111115 100%)',
        borderBottom: '1px solid rgba(197, 160, 89, 0.2)',
        padding: '7px 20px',
        fontSize: '0.72rem',
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#d6c29e'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sparkles size={12} color="#c5a059" />
          <span>Complimentary Global Bespoke Concierge & White-Glove Shipping</span>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header 
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          background: isScrolled ? 'rgba(9, 9, 11, 0.94)' : 'rgba(9, 9, 11, 0.75)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: isScrolled ? '1px solid rgba(197, 160, 89, 0.2)' : '1px solid rgba(255, 255, 255, 0.05)',
          padding: isScrolled ? '14px 32px' : '22px 32px'
        }}
      >
        <div style={{
          maxWidth: '1440px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#faf8f5',
              cursor: 'pointer',
              display: 'none',
              padding: '6px'
            }}
            className="mobile-only-btn"
            aria-label="Open Navigation Menu"
          >
            <Menu size={22} />
          </button>

          {/* Desktop Left Navigation Links */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '28px' }} className="desktop-nav">
            {navLinks.slice(0, 3).map((link) => {
              const isActive = (link.page === 'home' && currentPage === 'home') || (link.page && link.page === currentPage);
              return (
                <button
                  key={link.label}
                  onClick={() => handleLinkClick(link)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: isActive ? '#c5a059' : '#d1cdc7',
                    fontSize: '0.78rem',
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-cinzel)',
                    position: 'relative',
                    padding: '4px 0',
                    transition: 'color 0.3s',
                    fontWeight: isActive ? 600 : 400
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#c5a059'}
                  onMouseLeave={(e) => e.target.style.color = isActive ? '#c5a059' : '#d1cdc7'}
                >
                  {link.label}
                  {isActive && (
                    <span style={{
                      position: 'absolute',
                      bottom: 0,
                      left: '15%',
                      right: '15%',
                      height: '1px',
                      background: '#c5a059'
                    }} />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Center Brand Identity */}
          <div 
            onClick={() => {
              if (onNavigatePage) onNavigatePage('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            style={{ 
              textAlign: 'center', 
              cursor: 'pointer',
              userSelect: 'none'
            }}
          >
            <div style={{
              fontFamily: 'var(--font-serif-display)',
              fontSize: isScrolled ? '1.5rem' : '1.85rem',
              letterSpacing: '0.22em',
              fontWeight: 400,
              color: '#faf8f5',
              transition: 'font-size 0.3s'
            }}>
              ATELIER VÉRONIQUE
            </div>
            <div style={{
              fontSize: '0.58rem',
              letterSpacing: '0.45em',
              color: '#c5a059',
              textTransform: 'uppercase',
              marginTop: '-2px'
            }}>
              Haute Couture • Paris • Mumbai
            </div>
          </div>

          {/* Desktop Right Navigation Links */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '28px' }} className="desktop-nav">
            {navLinks.slice(3).map((link) => {
              const isActive = link.page && link.page === currentPage;
              return (
                <button
                  key={link.label}
                  onClick={() => handleLinkClick(link)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: isActive ? '#c5a059' : '#d1cdc7',
                    fontSize: '0.78rem',
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-cinzel)',
                    position: 'relative',
                    padding: '4px 0',
                    transition: 'color 0.3s',
                    fontWeight: isActive ? 600 : 400
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#c5a059'}
                  onMouseLeave={(e) => e.target.style.color = isActive ? '#c5a059' : '#d1cdc7'}
                >
                  {link.label}
                  {isActive && (
                    <span style={{
                      position: 'absolute',
                      bottom: 0,
                      left: '15%',
                      right: '15%',
                      height: '1px',
                      background: '#c5a059'
                    }} />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action Icons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
            {/* Search Icon */}
            <button
              onClick={() => setIsSearchOpen(true)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#faf8f5',
                cursor: 'pointer',
                padding: '6px',
                transition: 'transform 0.2s, color 0.2s'
              }}
              aria-label="Search Silhouettes"
              onMouseEnter={(e) => e.currentTarget.style.color = '#c5a059'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#faf8f5'}
            >
              <Search size={19} />
            </button>

            {/* Wishlist Icon */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#faf8f5',
                cursor: 'pointer',
                padding: '6px',
                position: 'relative',
                transition: 'transform 0.2s, color 0.2s'
              }}
              aria-label="View Wishlist"
              onMouseEnter={(e) => e.currentTarget.style.color = '#c5a059'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#faf8f5'}
            >
              <Heart size={19} />
              {wishlist.length > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '0px',
                  right: '0px',
                  background: '#c5a059',
                  color: '#0c0c0e',
                  fontSize: '0.62rem',
                  fontWeight: 700,
                  width: '15px',
                  height: '15px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart / Atelier Bag Icon */}
            <button
              onClick={() => setIsCartOpen(true)}
              style={{
                background: 'rgba(197, 160, 89, 0.12)',
                border: '1px solid rgba(197, 160, 89, 0.35)',
                color: '#faf8f5',
                cursor: 'pointer',
                padding: '7px 14px',
                borderRadius: '2px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.75rem',
                fontFamily: 'var(--font-cinzel)',
                letterSpacing: '0.12em',
                transition: 'all 0.3s ease'
              }}
              aria-label="Open Shopping Bag"
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(197, 160, 89, 0.25)';
                e.currentTarget.style.borderColor = '#c5a059';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(197, 160, 89, 0.12)';
                e.currentTarget.style.borderColor = 'rgba(197, 160, 89, 0.35)';
              }}
            >
              <ShoppingBag size={17} color="#c5a059" />
              <span>BAG ({cartCount})</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(9, 9, 11, 0.98)',
          zIndex: 100,
          padding: '30px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backdropFilter: 'blur(25px)'
        }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
              <div style={{ fontFamily: 'var(--font-serif-display)', fontSize: '1.3rem', letterSpacing: '0.2em' }}>
                ATELIER VÉRONIQUE
              </div>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                style={{ background: 'transparent', border: 'none', color: '#faf8f5', cursor: 'pointer' }}
              >
                <X size={26} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleLinkClick(link)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    textAlign: 'left',
                    color: '#faf8f5',
                    fontSize: '1.25rem',
                    fontFamily: 'var(--font-serif-display)',
                    letterSpacing: '0.1em',
                    cursor: 'pointer',
                    padding: '8px 0',
                    borderBottom: '1px solid rgba(255,255,255,0.06)'
                  }}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          <div style={{ paddingTop: '20px', borderTop: '1px solid rgba(197, 160, 89, 0.2)', fontSize: '0.8rem', color: '#a0a0aa' }}>
            <p>Concierge WhatsApp: +91 (0) 98200 12000</p>
            <p style={{ marginTop: '6px' }}>Private Salon Viewings by Appointment</p>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 1024px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-only-btn {
            display: block !important;
          }
        }
      `}</style>
    </>
  );
}

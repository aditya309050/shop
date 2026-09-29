import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { 
  X, 
  Heart, 
  ShoppingBag, 
  Sparkles, 
  Star, 
  ShieldCheck, 
  Truck, 
  Ruler, 
  ChevronRight, 
  Check,
  MessageCircle
} from 'lucide-react';

export default function ProductDetailModal() {
  const { 
    selectedProduct, 
    setSelectedProduct, 
    formatPrice, 
    addToCart, 
    toggleWishlist, 
    isInWishlist,
    openBespoke,
    showToast
  } = useShop();

  if (!selectedProduct) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(selectedProduct.colors?.[0]);
  const [selectedSize, setSelectedSize] = useState(selectedProduct.sizes?.[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('details');
  const [isAdding, setIsAdding] = useState(false);
  const [lightPreset, setLightPreset] = useState('natural'); // natural, soirée, runway, moonlight
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50, active: false });
  const [patronReviews, setPatronReviews] = useState([
    {
      author: "Princess Maya R.",
      rating: 5,
      date: "February 2026",
      comment: "The weightless pure organza is unlike anything in European haute couture. The zari shines with noble subtlety.",
      verified: true
    },
    {
      author: "Aditi S. (London)",
      rating: 5,
      date: "January 2026",
      comment: "Wore this to our high-commission gala. The drape holds structure flawlessly for over 8 hours.",
      verified: true
    }
  ]);
  const [newReview, setNewReview] = useState({ name: '', comment: '', rating: 5 });
  const [isWritingReview, setIsWritingReview] = useState(false);

  useEffect(() => {
    setActiveImageIndex(0);
    setSelectedColor(selectedProduct.colors?.[0]);
    setSelectedSize(selectedProduct.sizes?.[0]);
    setQuantity(1);
  }, [selectedProduct]);

  const isWishlisted = isInWishlist(selectedProduct.id);

  const handleAddToCart = () => {
    setIsAdding(true);
    setTimeout(() => {
      addToCart(selectedProduct, selectedColor, selectedSize, quantity);
      setIsAdding(false);
    }, 400);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 200,
      background: 'rgba(9, 9, 11, 0.92)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      overflowY: 'auto'
    }}>
      {/* Modal Container */}
      <div 
        className="glass-panel"
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '1200px',
          maxHeight: '92vh',
          background: '#121217',
          border: '1px solid rgba(197, 160, 89, 0.3)',
          borderRadius: '2px',
          boxShadow: '0 30px 80px rgba(0, 0, 0, 0.95)',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Floating Close Button */}
        <button
          onClick={() => setSelectedProduct(null)}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            zIndex: 50,
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'rgba(24, 24, 29, 0.8)',
            border: '1px solid rgba(197, 160, 89, 0.3)',
            color: '#faf8f5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#c5a059';
            e.currentTarget.style.color = '#0c0c0e';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(24, 24, 29, 0.8)';
            e.currentTarget.style.color = '#faf8f5';
          }}
          aria-label="Close Modal"
        >
          <X size={20} />
        </button>

        {/* Modal Body: Left Thumbnail Gallery + Main Image, Right Product Form */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '40px',
          padding: '40px'
        }}>
          {/* Left Column: Thumbnails & Main Image Showcase with Studio Lighting Controls */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', gap: '16px', flexDirection: 'row' }} className="product-modal-gallery">
              {/* Vertical Thumbnail Strip */}
              {selectedProduct.images?.length > 1 && (
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  width: '80px',
                  flexShrink: 0
                }}>
                  {selectedProduct.images.map((img, idx) => (
                    <div
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      style={{
                        aspectRatio: '3/4',
                        borderRadius: '2px',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        border: activeImageIndex === idx ? '2px solid #c5a059' : '1px solid rgba(255, 255, 255, 0.1)',
                        opacity: activeImageIndex === idx ? 1 : 0.6,
                        transition: 'all 0.3s'
                      }}
                    >
                      <img 
                        src={img} 
                        alt={`Thumbnail ${idx + 1}`}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Main Stage Image with Interactive Lens Zoom & Lighting Filters */}
              <div 
                style={{
                  flex: 1,
                  position: 'relative',
                  aspectRatio: '3/4',
                  borderRadius: '2px',
                  overflow: 'hidden',
                  backgroundColor: '#18181d',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  cursor: 'crosshair'
                }}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = ((e.clientX - rect.left) / rect.width) * 100;
                  const y = ((e.clientY - rect.top) / rect.height) * 100;
                  setZoomPos({ x, y, active: true });
                }}
                onMouseLeave={() => setZoomPos(prev => ({ ...prev, active: false }))}
              >
                <img 
                  src={selectedProduct.images?.[activeImageIndex] || selectedProduct.images?.[0]} 
                  alt={selectedProduct.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: lightPreset === 'soirée'
                      ? 'sepia(0.25) saturate(1.25) contrast(1.1) brightness(0.95)'
                      : lightPreset === 'runway'
                      ? 'contrast(1.2) brightness(1.08) drop-shadow(0 0 15px rgba(255,255,255,0.2))'
                      : lightPreset === 'moonlight'
                      ? 'hue-rotate(210deg) saturate(0.85) contrast(1.15) brightness(0.9)'
                      : 'none',
                    transition: 'filter 0.5s ease'
                  }}
                />

                {/* Interactive Zoom Magnifier Lens */}
                {zoomPos.active && (
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `url(${selectedProduct.images?.[activeImageIndex] || selectedProduct.images?.[0]})`,
                    backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`,
                    backgroundSize: '250%',
                    backgroundRepeat: 'no-repeat',
                    pointerEvents: 'none',
                    zIndex: 15,
                    border: '1px solid #c5a059',
                    boxShadow: 'inset 0 0 40px rgba(0,0,0,0.8)'
                  }}>
                    <div style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      background: 'rgba(9,9,11,0.85)',
                      backdropFilter: 'blur(8px)',
                      border: '1px solid #c5a059',
                      padding: '3px 8px',
                      color: '#c5a059',
                      fontSize: '0.62rem',
                      fontFamily: 'var(--font-cinzel)',
                      letterSpacing: '0.15em'
                    }}>
                      2.5X PURE WEAVE MAGNIFICATION
                    </div>
                  </div>
                )}

                {/* Wishlist toggle badge */}
                <button
                  onClick={() => toggleWishlist(selectedProduct)}
                  style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    zIndex: 20,
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    background: 'rgba(9, 9, 11, 0.8)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(197, 160, 89, 0.3)',
                    color: isWishlisted ? '#c5a059' : '#faf8f5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <Heart size={18} fill={isWishlisted ? '#c5a059' : 'none'} color={isWishlisted ? '#c5a059' : '#faf8f5'} />
                </button>
              </div>
            </div>

            {/* Interactive Atelier Fabric Lighting Studio Controller */}
            <div style={{
              background: 'rgba(24, 24, 29, 0.8)',
              border: '1px solid rgba(197, 160, 89, 0.25)',
              borderRadius: '2px',
              padding: '12px 16px'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '0.7rem',
                fontFamily: 'var(--font-cinzel)',
                color: '#eaddc5',
                letterSpacing: '0.14em',
                marginBottom: '8px'
              }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Sparkles size={12} color="#c5a059" /> FABRIC LIGHTING STUDIO
                </span>
                <span style={{ color: '#888894' }}>Simulate Real Ambiance</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
                {[
                  { id: 'natural', label: 'Daylight' },
                  { id: 'soirée', label: 'Soirée' },
                  { id: 'runway', label: 'Runway' },
                  { id: 'moonlight', label: 'Moonlight' }
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => setLightPreset(item.id)}
                    style={{
                      padding: '6px 8px',
                      background: lightPreset === item.id ? '#c5a059' : '#09090b',
                      color: lightPreset === item.id ? '#0c0c0e' : '#faf8f5',
                      border: lightPreset === item.id ? '1px solid #c5a059' : '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '2px',
                      fontSize: '0.68rem',
                      fontFamily: 'var(--font-cinzel)',
                      fontWeight: lightPreset === item.id ? 700 : 400,
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Information & Atelier Customization */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              {/* Category & Collection Tag */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.75rem',
                fontFamily: 'var(--font-cinzel)',
                color: '#c5a059',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                marginBottom: '10px'
              }}>
                <span>{selectedProduct.collection}</span>
                <span>•</span>
                <span>{selectedProduct.category}</span>
              </div>

              {/* Product Title */}
              <h2 style={{
                fontFamily: 'var(--font-serif-display)',
                fontSize: 'clamp(1.8rem, 3.2vw, 2.4rem)',
                color: '#faf8f5',
                lineHeight: 1.15,
                fontWeight: 400,
                marginBottom: '10px'
              }}>
                {selectedProduct.name}
              </h2>

              {/* Reviews & Authenticity */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#e2c17c', fontSize: '0.85rem' }}>
                  <Star size={14} fill="#e2c17c" color="#e2c17c" />
                  <span style={{ fontWeight: 600 }}>{selectedProduct.rating}</span>
                  <span style={{ color: '#888894' }}>({selectedProduct.reviewsCount} Masterpiece Reviews)</span>
                </div>
                <span style={{ color: 'rgba(255,255,255,0.2)' }}>|</span>
                <span style={{ fontSize: '0.75rem', color: '#22c55e', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <ShieldCheck size={14} /> In Stock ({selectedProduct.stock} Available)
                </span>
              </div>

              {/* Price Display */}
              <div style={{
                padding: '16px 20px',
                background: 'rgba(24, 24, 29, 0.7)',
                border: '1px solid rgba(197, 160, 89, 0.2)',
                borderRadius: '2px',
                display: 'flex',
                alignItems: 'baseline',
                gap: '14px',
                marginBottom: '24px'
              }}>
                <span style={{
                  fontFamily: 'var(--font-cinzel)',
                  fontSize: '1.8rem',
                  fontWeight: 700,
                  color: '#faf8f5'
                }}>
                  {formatPrice(selectedProduct.price)}
                </span>
                {selectedProduct.originalPrice && (
                  <span style={{
                    fontSize: '1.1rem',
                    color: '#71717a',
                    textDecoration: 'line-through'
                  }}>
                    {formatPrice(selectedProduct.originalPrice)}
                  </span>
                )}
                <span style={{ fontSize: '0.72rem', color: '#a0a0aa', marginLeft: 'auto' }}>
                  Complimentary Insured Courier
                </span>
              </div>

              {/* Description */}
              <p style={{
                fontFamily: 'var(--font-serif-editorial)',
                fontSize: '1.12rem',
                color: '#d1cdc7',
                lineHeight: 1.6,
                marginBottom: '28px'
              }}>
                {selectedProduct.description}
              </p>

              {/* Color Swatches */}
              {selectedProduct.colors?.length > 0 && (
                <div style={{ marginBottom: '24px' }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '0.78rem',
                    fontFamily: 'var(--font-cinzel)',
                    letterSpacing: '0.12em',
                    color: '#eaddc5',
                    marginBottom: '10px'
                  }}>
                    <span>ROYAL PALETTE:</span>
                    <span style={{ color: '#c5a059' }}>{selectedColor?.name}</span>
                  </div>

                  <div style={{ display: 'flex', gap: '12px' }}>
                    {selectedProduct.colors.map(col => (
                      <button
                        key={col.name}
                        onClick={() => setSelectedColor(col)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '6px 14px',
                          background: selectedColor?.name === col.name ? 'rgba(197, 160, 89, 0.15)' : 'rgba(255,255,255,0.04)',
                          border: selectedColor?.name === col.name ? '1px solid #c5a059' : '1px solid rgba(255,255,255,0.1)',
                          borderRadius: '2px',
                          cursor: 'pointer',
                          color: '#faf8f5',
                          fontSize: '0.75rem',
                          fontFamily: 'var(--font-sans)'
                        }}
                      >
                        <span style={{
                          width: '14px',
                          height: '14px',
                          borderRadius: '50%',
                          backgroundColor: col.hex,
                          border: '1px solid rgba(255,255,255,0.3)',
                          display: 'inline-block'
                        }} />
                        <span>{col.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selectors */}
              {selectedProduct.sizes?.length > 0 && (
                <div style={{ marginBottom: '28px' }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '0.78rem',
                    fontFamily: 'var(--font-cinzel)',
                    letterSpacing: '0.12em',
                    color: '#eaddc5',
                    marginBottom: '10px'
                  }}>
                    <span>DRAPING & TAILORING:</span>
                    <span style={{ color: '#c5a059', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Ruler size={12} /> Size Consultation
                    </span>
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                    {selectedProduct.sizes.map(sz => (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(sz)}
                        style={{
                          padding: '10px 16px',
                          background: selectedSize === sz ? '#c5a059' : 'rgba(255, 255, 255, 0.05)',
                          color: selectedSize === sz ? '#0c0c0e' : '#faf8f5',
                          border: selectedSize === sz ? '1px solid #c5a059' : '1px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: '2px',
                          fontFamily: 'var(--font-cinzel)',
                          fontSize: '0.75rem',
                          letterSpacing: '0.1em',
                          cursor: 'pointer',
                          fontWeight: selectedSize === sz ? 700 : 400
                        }}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons: Add to Bag + Bespoke Virtual Fitting */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    background: '#18181d',
                    border: '1px solid rgba(197, 160, 89, 0.3)',
                    borderRadius: '2px'
                  }}>
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      style={{
                        padding: '12px 16px',
                        background: 'transparent',
                        border: 'none',
                        color: '#faf8f5',
                        cursor: 'pointer',
                        fontSize: '1rem'
                      }}
                    >
                      -
                    </button>
                    <span style={{ padding: '0 10px', fontFamily: 'var(--font-cinzel)', fontSize: '0.9rem' }}>
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      style={{
                        padding: '12px 16px',
                        background: 'transparent',
                        border: 'none',
                        color: '#faf8f5',
                        cursor: 'pointer',
                        fontSize: '1rem'
                      }}
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    disabled={isAdding}
                    className="btn-couture"
                    style={{
                      flex: 1,
                      padding: '16px 28px',
                      fontSize: '0.85rem'
                    }}
                  >
                    <ShoppingBag size={18} style={{ marginRight: '10px' }} />
                    <span>{isAdding ? 'ACQUIRING SILHOUETTE...' : 'ADD TO ATELIER BAG'}</span>
                  </button>
                </div>

                <button
                  onClick={() => openBespoke(selectedProduct)}
                  className="btn-outline-gold"
                  style={{
                    width: '100%',
                    padding: '13px',
                    fontSize: '0.78rem'
                  }}
                >
                  <Sparkles size={14} style={{ marginRight: '8px' }} />
                  <span>BOOK BESPOKE MEASUREMENT & VIRTUAL FITTING</span>
                </button>
              </div>

              {/* Accordion Tabs for Craftsmanship, Reviews, Dimensions, and Concierge */}
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '12px 0' }}>
                  <button
                    onClick={() => setActiveTab('details')}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: activeTab === 'details' ? '#c5a059' : '#a0a0aa',
                      fontFamily: 'var(--font-cinzel)',
                      fontSize: '0.75rem',
                      letterSpacing: '0.14em',
                      cursor: 'pointer',
                      textTransform: 'uppercase'
                    }}
                  >
                    Craftsmanship & Fabric
                  </button>
                  <button
                    onClick={() => setActiveTab('reviews')}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: activeTab === 'reviews' ? '#c5a059' : '#a0a0aa',
                      fontFamily: 'var(--font-cinzel)',
                      fontSize: '0.75rem',
                      letterSpacing: '0.14em',
                      cursor: 'pointer',
                      textTransform: 'uppercase'
                    }}
                  >
                    Patron Reviews ({patronReviews.length})
                  </button>
                  <button
                    onClick={() => setActiveTab('shipping')}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: activeTab === 'shipping' ? '#c5a059' : '#a0a0aa',
                      fontFamily: 'var(--font-cinzel)',
                      fontSize: '0.75rem',
                      letterSpacing: '0.14em',
                      cursor: 'pointer',
                      textTransform: 'uppercase'
                    }}
                  >
                    White-Glove Shipping
                  </button>
                  <button
                    onClick={() => setActiveTab('concierge')}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: activeTab === 'concierge' ? '#c5a059' : '#a0a0aa',
                      fontFamily: 'var(--font-cinzel)',
                      fontSize: '0.75rem',
                      letterSpacing: '0.14em',
                      cursor: 'pointer',
                      textTransform: 'uppercase'
                    }}
                  >
                    Virtual Concierge
                  </button>
                </div>

                <div style={{ padding: '16px 0', fontSize: '0.88rem', color: '#c4c0b8', lineHeight: 1.6 }}>
                  {activeTab === 'details' && (
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                      {selectedProduct.details?.map((dt, i) => (
                        <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                          <Sparkles size={12} color="#c5a059" />
                          <span>{dt}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {activeTab === 'reviews' && (
                    <div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '20px' }}>
                        {patronReviews.map((rev, i) => (
                          <div key={i} style={{
                            padding: '12px 16px',
                            background: 'rgba(24, 24, 29, 0.6)',
                            border: '1px solid rgba(255, 255, 255, 0.06)',
                            borderRadius: '2px'
                          }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                              <span style={{ fontFamily: 'var(--font-cinzel)', fontSize: '0.78rem', color: '#faf8f5', fontWeight: 600 }}>
                                {rev.author}
                              </span>
                              <div style={{ display: 'flex', gap: '2px', color: '#e2c17c' }}>
                                {[...Array(rev.rating)].map((_, idx) => (
                                  <Star key={idx} size={11} fill="#e2c17c" />
                                ))}
                              </div>
                            </div>
                            <p style={{ fontStyle: 'italic', fontFamily: 'var(--font-serif-editorial)', color: '#d1cdc7', fontSize: '0.92rem' }}>
                              "{rev.comment}"
                            </p>
                            <span style={{ fontSize: '0.65rem', color: '#22c55e', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '6px' }}>
                              <ShieldCheck size={11} /> Verified Haute Couture Acquisition • {rev.date}
                            </span>
                          </div>
                        ))}
                      </div>

                      {isWritingReview ? (
                        <div style={{
                          background: '#09090b',
                          border: '1px solid rgba(197, 160, 89, 0.3)',
                          padding: '16px',
                          borderRadius: '2px'
                        }}>
                          <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-cinzel)', color: '#c5a059', marginBottom: '8px' }}>
                            WRITE PATRON FEEDBACK
                          </div>
                          <input
                            type="text"
                            placeholder="Your Name / Royal Title"
                            value={newReview.name}
                            onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                            style={{
                              width: '100%',
                              padding: '8px 12px',
                              background: '#18181d',
                              border: '1px solid rgba(255,255,255,0.1)',
                              color: '#faf8f5',
                              fontSize: '0.8rem',
                              marginBottom: '8px',
                              borderRadius: '2px',
                              outline: 'none'
                            }}
                          />
                          <textarea
                            placeholder="Describe the silhouette drape, silk touch, and karigar needlework..."
                            rows={2}
                            value={newReview.comment}
                            onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                            style={{
                              width: '100%',
                              padding: '8px 12px',
                              background: '#18181d',
                              border: '1px solid rgba(255,255,255,0.1)',
                              color: '#faf8f5',
                              fontSize: '0.8rem',
                              marginBottom: '10px',
                              borderRadius: '2px',
                              outline: 'none'
                            }}
                          />
                          <div style={{ display: 'flex', gap: '10px' }}>
                            <button
                              onClick={() => {
                                if (newReview.name && newReview.comment) {
                                  setPatronReviews([
                                    {
                                      author: newReview.name,
                                      rating: 5,
                                      date: "Just now",
                                      comment: newReview.comment,
                                      verified: true
                                    },
                                    ...patronReviews
                                  ]);
                                  setNewReview({ name: '', comment: '', rating: 5 });
                                  setIsWritingReview(false);
                                  showToast('Thank you for your patronage feedback.');
                                }
                              }}
                              className="btn-couture"
                              style={{ padding: '8px 18px', fontSize: '0.72rem' }}
                            >
                              Post Review
                            </button>
                            <button
                              onClick={() => setIsWritingReview(false)}
                              style={{ background: 'transparent', border: 'none', color: '#a0a0aa', cursor: 'pointer', fontSize: '0.75rem' }}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => setIsWritingReview(true)}
                          className="btn-outline-gold"
                          style={{ padding: '8px 16px', fontSize: '0.72rem' }}
                        >
                          + Write Patron Review
                        </button>
                      )}
                    </div>
                  )}

                  {activeTab === 'shipping' && (
                    <div>
                      <p style={{ marginBottom: '8px' }}>• Express Insured Courier across India: Delivered in 3-4 business days.</p>
                      <p style={{ marginBottom: '8px' }}>• Global DHL Express (USA, UK, UAE, Europe): Delivered in 5-7 business days.</p>
                      <p>• Packaged in our archival gold-embossed keepsake garment box with cedar moth-protection sachets.</p>
                    </div>
                  )}

                  {activeTab === 'concierge' && (
                    <div>
                      <p style={{ marginBottom: '12px' }}>
                        Connect with our master stylist via live video consultation to personalize measurements, blouse sleeve designs, or dupatta draping.
                      </p>
                      <button
                        onClick={() => openBespoke(selectedProduct)}
                        className="btn-couture"
                        style={{
                          padding: '10px 20px',
                          fontSize: '0.75rem',
                          marginBottom: '10px'
                        }}
                      >
                        Book Virtual Drape Fitting
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

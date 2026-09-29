import React from 'react';
import { useShop } from '../context/ShopContext';
import { X, Heart, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';

export default function WishlistDrawer() {
  const { 
    wishlist, 
    isWishlistOpen, 
    setIsWishlistOpen, 
    toggleWishlist, 
    setSelectedProduct, 
    formatPrice, 
    addToCart 
  } = useShop();

  if (!isWishlistOpen) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(9, 9, 11, 0.8)',
        backdropFilter: 'blur(8px)',
        zIndex: 210,
        display: 'flex',
        justifyContent: 'flex-end'
      }}
      onClick={() => setIsWishlistOpen(false)}
    >
      <div 
        style={{
          width: '100%',
          maxWidth: '460px',
          height: '100%',
          background: '#121217',
          borderLeft: '1px solid rgba(197, 160, 89, 0.3)',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '-10px 0 50px rgba(0,0,0,0.9)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          padding: '24px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Heart size={20} color="#c5a059" fill="#c5a059" />
            <h2 style={{
              fontFamily: 'var(--font-serif-display)',
              fontSize: '1.4rem',
              color: '#faf8f5',
              letterSpacing: '0.08em'
            }}>
              Saved Wishlist ({wishlist.length})
            </h2>
          </div>

          <button
            onClick={() => setIsWishlistOpen(false)}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#d1cdc7',
              cursor: 'pointer',
              padding: '4px'
            }}
          >
            <X size={22} />
          </button>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
          {wishlist.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
              <Heart size={44} color="#c5a059" style={{ margin: '0 auto 16px auto', opacity: 0.4 }} />
              <h3 style={{ fontFamily: 'var(--font-serif-display)', fontSize: '1.3rem', color: '#faf8f5', marginBottom: '8px' }}>
                Your Wishlist is Empty
              </h3>
              <p style={{ color: '#9d9da6', fontSize: '0.88rem', marginBottom: '20px' }}>
                Tap the heart icon on any silhouette to reserve it for your special celebrations.
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {wishlist.map(product => (
                <div
                  key={product.id}
                  style={{
                    display: 'flex',
                    gap: '14px',
                    paddingBottom: '16px',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.06)'
                  }}
                >
                  <img 
                    src={product.images?.[0]} 
                    alt={product.name}
                    style={{ width: '80px', height: '105px', objectFit: 'cover', borderRadius: '2px', cursor: 'pointer' }}
                    onClick={() => {
                      setSelectedProduct(product);
                      setIsWishlistOpen(false);
                    }}
                  />

                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <h4 
                          onClick={() => {
                            setSelectedProduct(product);
                            setIsWishlistOpen(false);
                          }}
                          style={{
                            fontFamily: 'var(--font-serif-display)',
                            fontSize: '1.05rem',
                            color: '#faf8f5',
                            cursor: 'pointer'
                          }}
                        >
                          {product.name}
                        </h4>
                        <button
                          onClick={() => toggleWishlist(product)}
                          style={{ background: 'transparent', border: 'none', color: '#71717a', cursor: 'pointer' }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>

                      <div style={{ fontSize: '0.72rem', color: '#c5a059', fontFamily: 'var(--font-cinzel)', marginTop: '2px' }}>
                        {product.category}
                      </div>

                      <div style={{ fontFamily: 'var(--font-cinzel)', fontSize: '0.95rem', color: '#faf8f5', marginTop: '6px', fontWeight: 600 }}>
                        {formatPrice(product.price)}
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        addToCart(product, product.colors?.[0], product.sizes?.[0], 1);
                        toggleWishlist(product);
                      }}
                      style={{
                        padding: '6px 12px',
                        background: '#c5a059',
                        color: '#0c0c0e',
                        border: 'none',
                        borderRadius: '2px',
                        fontSize: '0.7rem',
                        fontFamily: 'var(--font-cinzel)',
                        letterSpacing: '0.1em',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        alignSelf: 'flex-start',
                        fontWeight: 600
                      }}
                    >
                      <ShoppingBag size={12} />
                      <span>Move to Bag</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

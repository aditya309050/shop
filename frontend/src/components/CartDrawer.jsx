import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Gift, Sparkles } from 'lucide-react';
import CheckoutModal from './CheckoutModal';

export default function CartDrawer() {
  const { 
    cart, 
    isCartOpen, 
    setIsCartOpen, 
    removeFromCart, 
    updateQuantity, 
    formatPrice, 
    cartTotal, 
    cartCount 
  } = useShop();

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [giftNote, setGiftNote] = useState('');
  const [isGiftChecked, setIsGiftChecked] = useState(false);

  if (!isCartOpen) return null;

  return (
    <>
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
        onClick={() => setIsCartOpen(false)}
      >
        {/* Drawer Panel */}
        <div 
          style={{
            width: '100%',
            maxWidth: '480px',
            height: '100%',
            background: '#121217',
            borderLeft: '1px solid rgba(197, 160, 89, 0.3)',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '-10px 0 50px rgba(0,0,0,0.9)',
            animation: 'slideLeft 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
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
              <ShoppingBag size={20} color="#c5a059" />
              <h2 style={{
                fontFamily: 'var(--font-serif-display)',
                fontSize: '1.4rem',
                color: '#faf8f5',
                letterSpacing: '0.08em'
              }}>
                Atelier Bag ({cartCount})
              </h2>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#d1cdc7',
                cursor: 'pointer',
                padding: '4px'
              }}
              aria-label="Close Bag"
            >
              <X size={22} />
            </button>
          </div>

          {/* Free Shipping & VIP Archival Tier Progress */}
          <div style={{
            background: 'rgba(197, 160, 89, 0.08)',
            padding: '16px 24px',
            borderBottom: '1px solid rgba(197, 160, 89, 0.2)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#eaddc5', marginBottom: '8px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Sparkles size={13} color="#c5a059" />
                {cartTotal >= 50000 
                  ? 'VIP Patron Tier: Complimentary Archival Keepsake Trunk & Silk Stole Unlocked!' 
                  : cartTotal >= 30000
                  ? 'Archival Keepsake Box Unlocked!'
                  : `Add ${formatPrice(30000 - cartTotal)} more for Archival Keepsake Box`}
              </span>
              <span style={{ color: '#c5a059', fontWeight: 600 }}>
                {Math.min(100, Math.round((cartTotal / 50000) * 100))}%
              </span>
            </div>

            <div style={{
              width: '100%',
              height: '4px',
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '2px',
              overflow: 'hidden'
            }}>
              <div style={{
                height: '100%',
                width: `${Math.min(100, (cartTotal / 50000) * 100)}%`,
                background: 'linear-gradient(90deg, #c5a059, #faf8f5)',
                transition: 'width 0.5s ease'
              }} />
            </div>
          </div>

          {/* Cart Items List */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '24px'
          }}>
            {cart.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                <ShoppingBag size={48} color="#c5a059" style={{ margin: '0 auto 16px auto', opacity: 0.5 }} />
                <h3 style={{ fontFamily: 'var(--font-serif-display)', fontSize: '1.4rem', color: '#faf8f5', marginBottom: '8px' }}>
                  Your Atelier Bag is Empty
                </h3>
                <p style={{ color: '#9d9da6', fontSize: '0.88rem', marginBottom: '24px' }}>
                  Explore our pure silk organza sarees, royal lehengas, and contemporary couture edits.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="btn-couture"
                >
                  Discover Collections
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {cart.map((item) => (
                  <div 
                    key={item.cartItemId}
                    style={{
                      display: 'flex',
                      gap: '16px',
                      paddingBottom: '20px',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.06)'
                    }}
                  >
                    {/* Item Image */}
                    <div style={{
                      width: '84px',
                      height: '110px',
                      borderRadius: '2px',
                      overflow: 'hidden',
                      flexShrink: 0,
                      backgroundColor: '#18181d'
                    }}>
                      <img 
                        src={item.images?.[0]} 
                        alt={item.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>

                    {/* Item Details */}
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <h4 style={{
                            fontFamily: 'var(--font-serif-display)',
                            fontSize: '1.05rem',
                            color: '#faf8f5',
                            lineHeight: 1.2
                          }}>
                            {item.name}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.cartItemId)}
                            style={{
                              background: 'transparent',
                              border: 'none',
                              color: '#71717a',
                              cursor: 'pointer',
                              padding: '2px'
                            }}
                            title="Remove silhouette"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>

                        <div style={{ fontSize: '0.75rem', color: '#a0a0aa', marginTop: '4px' }}>
                          <span>Color: {item.selectedColor?.name || 'Ivory'}</span>
                          <span style={{ margin: '0 6px' }}>•</span>
                          <span>Size: {item.selectedSize || 'Standard'}</span>
                        </div>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        {/* Quantity controls */}
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          border: '1px solid rgba(255,255,255,0.15)',
                          borderRadius: '2px'
                        }}>
                          <button
                            onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                            style={{
                              padding: '2px 8px',
                              background: 'transparent',
                              border: 'none',
                              color: '#faf8f5',
                              cursor: 'pointer'
                            }}
                          >
                            -
                          </button>
                          <span style={{ fontSize: '0.8rem', padding: '0 6px', fontFamily: 'var(--font-cinzel)' }}>
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                            style={{
                              padding: '2px 8px',
                              background: 'transparent',
                              border: 'none',
                              color: '#faf8f5',
                              cursor: 'pointer'
                            }}
                          >
                            +
                          </button>
                        </div>

                        {/* Price */}
                        <span style={{
                          fontFamily: 'var(--font-cinzel)',
                          fontSize: '1rem',
                          color: '#faf8f5',
                          fontWeight: 600
                        }}>
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Gift Option */}
                <div style={{
                  padding: '14px',
                  background: 'rgba(24, 24, 29, 0.6)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '2px'
                }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.78rem', color: '#eaddc5' }}>
                    <input 
                      type="checkbox" 
                      checked={isGiftChecked} 
                      onChange={(e) => setIsGiftChecked(e.target.checked)} 
                    />
                    <Gift size={14} color="#c5a059" />
                    <span>Include Hand-Written Calligraphy Note (Complimentary)</span>
                  </label>
                  {isGiftChecked && (
                    <textarea 
                      placeholder="Enter your bespoke personal message..."
                      value={giftNote}
                      onChange={(e) => setGiftNote(e.target.value)}
                      rows={2}
                      style={{
                        width: '100%',
                        marginTop: '10px',
                        background: '#09090b',
                        border: '1px solid rgba(197, 160, 89, 0.3)',
                        borderRadius: '2px',
                        padding: '8px',
                        color: '#faf8f5',
                        fontSize: '0.8rem',
                        fontFamily: 'var(--font-sans)',
                        outline: 'none'
                      }}
                    />
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Footer Checkout Summary */}
          {cart.length > 0 && (
            <div style={{
              padding: '24px',
              borderTop: '1px solid rgba(197, 160, 89, 0.2)',
              background: '#0e0e12'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.85rem', color: '#a0a0aa' }}>
                <span>Subtotal</span>
                <span style={{ fontFamily: 'var(--font-cinzel)', color: '#faf8f5' }}>{formatPrice(cartTotal)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontSize: '0.85rem', color: '#a0a0aa' }}>
                <span>Insured Global Courier</span>
                <span style={{ color: '#22c55e', fontSize: '0.8rem' }}>COMPLIMENTARY</span>
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '20px',
                borderTop: '1px solid rgba(255,255,255,0.08)',
                paddingTop: '14px',
                fontSize: '1.15rem'
              }}>
                <span style={{ fontFamily: 'var(--font-serif-display)', color: '#faf8f5' }}>Total Investment</span>
                <span style={{ fontFamily: 'var(--font-cinzel)', fontWeight: 700, color: '#c5a059' }}>
                  {formatPrice(cartTotal)}
                </span>
              </div>

              <button
                onClick={() => {
                  setIsCheckoutOpen(true);
                }}
                className="btn-couture"
                style={{
                  width: '100%',
                  padding: '16px',
                  fontSize: '0.85rem'
                }}
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight size={16} style={{ marginLeft: '8px' }} />
              </button>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                marginTop: '12px',
                fontSize: '0.7rem',
                color: '#888894'
              }}>
                <ShieldCheck size={13} color="#c5a059" />
                <span>256-Bit SSL Encrypted Luxury Transaction</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Checkout Modal Trigger */}
      {isCheckoutOpen && (
        <CheckoutModal 
          onClose={() => setIsCheckoutOpen(false)}
          onSuccess={() => {
            setIsCheckoutOpen(false);
            setIsCartOpen(false);
          }}
          giftNote={isGiftChecked ? giftNote : ''}
        />
      )}
    </>
  );
}

import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import confetti from 'canvas-confetti';
import { 
  X, 
  CheckCircle2, 
  CreditCard, 
  Truck, 
  ShieldCheck, 
  Sparkles, 
  Lock, 
  ArrowRight,
  Download,
  PhoneCall
} from 'lucide-react';

export default function CheckoutModal({ onClose, onSuccess, giftNote }) {
  const { cart, cartTotal, formatPrice, clearCart } = useShop();

  const [formData, setFormData] = useState({
    fullName: 'Lady Evelyn Sinclair',
    email: 'evelyn.sinclair@atelierpatron.com',
    phone: '+91 98200 88776',
    address: 'Penthouse 42, Altamount Road',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400026',
    country: 'India',
    paymentMethod: 'card'
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const API_BASE = import.meta.env.VITE_API_BASE_URL || 'https://shop-ipvf.onrender.com';
      // Send to backend
      const response = await fetch(`${API_BASE}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer: {
            name: formData.fullName,
            email: formData.email,
            phone: formData.phone
          },
          items: cart,
          totalAmount: cartTotal,
          shippingAddress: {
            address: formData.address,
            city: formData.city,
            state: formData.state,
            pincode: formData.pincode,
            country: formData.country
          },
          paymentMethod: formData.paymentMethod === 'card' 
            ? 'Concierge Centurion / Visa Infinite' 
            : formData.paymentMethod === 'upi' 
            ? 'Instant UPI Sovereign Pay' 
            : 'White Glove Concierge Delivery'
        })
      });

      let orderData;
      if (response.ok) {
        const json = await response.json();
        orderData = json.order;
      } else {
        // Fallback local mock if backend offline
        orderData = {
          id: 'ATELIER-' + Math.floor(100000 + Math.random() * 900000),
          customer: { name: formData.fullName, email: formData.email },
          items: cart,
          totalAmount: cartTotal,
          status: 'Confirmed & In Handloom Weaving',
          estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
          })
        };
      }

      // Trigger gold luxury confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#c5a059', '#eaddc5', '#faf8f5', '#9a7632']
      });

      setCompletedOrder(orderData);
      clearCart();
    } catch (err) {
      console.error(err);
      // Fallback local order
      const mockOrder = {
        id: 'ATELIER-' + Math.floor(100000 + Math.random() * 900000),
        customer: { name: formData.fullName, email: formData.email },
        items: cart,
        totalAmount: cartTotal,
        status: 'Confirmed & In Handloom Weaving',
        estimatedDelivery: 'Within 5 Business Days'
      };
      setCompletedOrder(mockOrder);
      clearCart();
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 250,
      background: 'rgba(9, 9, 11, 0.95)',
      backdropFilter: 'blur(20px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      overflowY: 'auto'
    }}>
      <div 
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '840px',
          maxHeight: '94vh',
          background: '#121217',
          border: '1px solid rgba(197, 160, 89, 0.35)',
          borderRadius: '2px',
          overflowY: 'auto',
          position: 'relative',
          padding: '40px'
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'transparent',
            border: 'none',
            color: '#a0a0aa',
            cursor: 'pointer'
          }}
        >
          <X size={22} />
        </button>

        {completedOrder ? (
          /* Order Confirmation View */
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              background: 'rgba(197, 160, 89, 0.15)',
              border: '1px solid #c5a059',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px auto',
              color: '#c5a059'
            }}>
              <CheckCircle2 size={36} />
            </div>

            <div style={{
              fontFamily: 'var(--font-cinzel)',
              fontSize: '0.8rem',
              letterSpacing: '0.3em',
              color: '#c5a059',
              textTransform: 'uppercase',
              marginBottom: '8px'
            }}>
              Haute Couture Acquisition Confirmed
            </div>

            <h2 style={{
              fontFamily: 'var(--font-serif-display)',
              fontSize: 'clamp(2rem, 4vw, 2.8rem)',
              color: '#faf8f5',
              marginBottom: '16px',
              fontWeight: 400
            }}>
              Thank You, {completedOrder.customer?.name}
            </h2>

            <p style={{
              fontFamily: 'var(--font-serif-editorial)',
              fontSize: '1.15rem',
              color: '#d1cdc7',
              maxWidth: '560px',
              margin: '0 auto 30px auto'
            }}>
              Your order <strong style={{ color: '#faf8f5' }}>{completedOrder.id}</strong> has been received by our 
              head master karigar. We have dispatched our formal bespoke confirmation letter to your email.
            </p>

            {/* Receipt Summary Card */}
            <div style={{
              background: '#18181d',
              border: '1px solid rgba(197, 160, 89, 0.25)',
              padding: '24px',
              borderRadius: '2px',
              textAlign: 'left',
              maxWidth: '560px',
              margin: '0 auto 36px auto'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '0.85rem' }}>
                <span style={{ color: '#888894' }}>Order Reference:</span>
                <span style={{ fontFamily: 'var(--font-cinzel)', color: '#c5a059' }}>{completedOrder.id}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '0.85rem' }}>
                <span style={{ color: '#888894' }}>Estimated Delivery:</span>
                <span style={{ color: '#faf8f5' }}>{completedOrder.estimatedDelivery || '5-7 Days'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '0.85rem' }}>
                <span style={{ color: '#888894' }}>Total Value:</span>
                <span style={{ fontFamily: 'var(--font-cinzel)', color: '#faf8f5', fontWeight: 600 }}>
                  {formatPrice(completedOrder.totalAmount)}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                <span style={{ color: '#888894' }}>Status:</span>
                <span style={{ color: '#22c55e', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Sparkles size={12} /> {completedOrder.status}
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
              <button
                onClick={onSuccess}
                className="btn-couture"
                style={{ padding: '14px 32px' }}
              >
                Return to Atelier Salon
              </button>
            </div>
          </div>
        ) : (
          /* Checkout Input Form */
          <div>
            <div style={{ marginBottom: '30px' }}>
              <div style={{
                fontFamily: 'var(--font-cinzel)',
                fontSize: '0.75rem',
                letterSpacing: '0.22em',
                color: '#c5a059',
                textTransform: 'uppercase',
                marginBottom: '6px'
              }}>
                Concierge Checkout & Direct Acquisition
              </div>
              <h2 style={{ fontFamily: 'var(--font-serif-display)', fontSize: '2.2rem', color: '#faf8f5', fontWeight: 400 }}>
                Patron & Shipping Details
              </h2>
            </div>

            <form onSubmit={handlePlaceOrder}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '18px', marginBottom: '24px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.72rem', fontFamily: 'var(--font-cinzel)', color: '#a0a0aa', marginBottom: '6px' }}>
                    PATRON FULL NAME *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '12px',
                      background: '#09090b',
                      border: '1px solid rgba(197, 160, 89, 0.25)',
                      color: '#faf8f5',
                      borderRadius: '2px',
                      outline: 'none',
                      fontSize: '0.85rem'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.72rem', fontFamily: 'var(--font-cinzel)', color: '#a0a0aa', marginBottom: '6px' }}>
                    OFFICIAL CORRESPONDENCE EMAIL *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '12px',
                      background: '#09090b',
                      border: '1px solid rgba(197, 160, 89, 0.25)',
                      color: '#faf8f5',
                      borderRadius: '2px',
                      outline: 'none',
                      fontSize: '0.85rem'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.72rem', fontFamily: 'var(--font-cinzel)', color: '#a0a0aa', marginBottom: '6px' }}>
                    WHATSAPP / PHONE FOR TRACKING *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '12px',
                      background: '#09090b',
                      border: '1px solid rgba(197, 160, 89, 0.25)',
                      color: '#faf8f5',
                      borderRadius: '2px',
                      outline: 'none',
                      fontSize: '0.85rem'
                    }}
                  />
                </div>
              </div>

              {/* Address Fields */}
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '0.72rem', fontFamily: 'var(--font-cinzel)', color: '#a0a0aa', marginBottom: '6px' }}>
                  DELIVERY RESIDENCE / SUITE ADDRESS *
                </label>
                <input
                  type="text"
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '12px',
                    background: '#09090b',
                    border: '1px solid rgba(197, 160, 89, 0.25)',
                    color: '#faf8f5',
                    borderRadius: '2px',
                    outline: 'none',
                    fontSize: '0.85rem'
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '18px', marginBottom: '28px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.72rem', fontFamily: 'var(--font-cinzel)', color: '#a0a0aa', marginBottom: '6px' }}>
                    CITY
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '12px',
                      background: '#09090b',
                      border: '1px solid rgba(197, 160, 89, 0.25)',
                      color: '#faf8f5',
                      borderRadius: '2px',
                      outline: 'none',
                      fontSize: '0.85rem'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.72rem', fontFamily: 'var(--font-cinzel)', color: '#a0a0aa', marginBottom: '6px' }}>
                    STATE / PROVINCE
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '12px',
                      background: '#09090b',
                      border: '1px solid rgba(197, 160, 89, 0.25)',
                      color: '#faf8f5',
                      borderRadius: '2px',
                      outline: 'none',
                      fontSize: '0.85rem'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.72rem', fontFamily: 'var(--font-cinzel)', color: '#a0a0aa', marginBottom: '6px' }}>
                    PINCODE / ZIP
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '12px',
                      background: '#09090b',
                      border: '1px solid rgba(197, 160, 89, 0.25)',
                      color: '#faf8f5',
                      borderRadius: '2px',
                      outline: 'none',
                      fontSize: '0.85rem'
                    }}
                  />
                </div>
              </div>

              {/* Payment Method Selector */}
              <div style={{ marginBottom: '32px' }}>
                <label style={{ display: 'block', fontSize: '0.72rem', fontFamily: 'var(--font-cinzel)', color: '#a0a0aa', marginBottom: '10px' }}>
                  SELECT SECURE PAYMENT METHOD
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
                  {[
                    { id: 'card', label: 'Luxury Card (Visa/Amex/MC)', icon: CreditCard },
                    { id: 'upi', label: 'Instant UPI / Sovereign Pay', icon: Sparkles },
                    { id: 'cod', label: 'White Glove Concierge POD', icon: Truck }
                  ].map(pm => {
                    const Icon = pm.icon;
                    return (
                      <div
                        key={pm.id}
                        onClick={() => setFormData({ ...formData, paymentMethod: pm.id })}
                        style={{
                          padding: '14px',
                          background: formData.paymentMethod === pm.id ? 'rgba(197, 160, 89, 0.15)' : '#09090b',
                          border: formData.paymentMethod === pm.id ? '1px solid #c5a059' : '1px solid rgba(255,255,255,0.1)',
                          borderRadius: '2px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px'
                        }}
                      >
                        <Icon size={18} color={formData.paymentMethod === pm.id ? '#c5a059' : '#888894'} />
                        <span style={{ fontSize: '0.78rem', color: formData.paymentMethod === pm.id ? '#faf8f5' : '#a0a0aa' }}>
                          {pm.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Order Final Submit */}
              <div style={{
                borderTop: '1px solid rgba(197, 160, 89, 0.2)',
                paddingTop: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '16px'
              }}>
                <div>
                  <div style={{ fontSize: '0.72rem', color: '#888894' }}>Total Payable</div>
                  <div style={{ fontFamily: 'var(--font-cinzel)', fontSize: '1.4rem', color: '#c5a059', fontWeight: 700 }}>
                    {formatPrice(cartTotal)}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="btn-couture"
                  style={{ padding: '16px 36px' }}
                >
                  <Lock size={15} style={{ marginRight: '8px' }} />
                  <span>{isProcessing ? 'AUTHORIZING ACQUISITION...' : 'CONFIRM ORDER & TAILORING'}</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Mail, MapPin, Phone, Compass } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function Footer() {
  const { showToast } = useShop();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    try {
      await fetch('http://localhost:5000/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
    } catch {}

    setIsSubscribed(true);
    showToast('Welcome to the inner circle of Atelier Véronique');
    setEmail('');
  };

  return (
    <footer style={{
      background: '#070709',
      borderTop: '1px solid rgba(197, 160, 89, 0.25)',
      color: '#faf8f5',
      position: 'relative'
    }}>
      {/* Newsletter VIP Club Banner */}
      <div style={{
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '70px 32px',
        maxWidth: '1440px',
        margin: '0 auto'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '40px',
          alignItems: 'center'
        }}>
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              color: '#c5a059',
              fontFamily: 'var(--font-cinzel)',
              fontSize: '0.75rem',
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
              marginBottom: '10px'
            }}>
              <Sparkles size={14} />
              <span>Privé Correspondence</span>
            </div>

            <h3 style={{
              fontFamily: 'var(--font-serif-display)',
              fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
              color: '#faf8f5',
              fontWeight: 400
            }}>
              Join the Haute Couture Salon
            </h3>

            <p style={{
              fontFamily: 'var(--font-serif-editorial)',
              fontSize: '1.1rem',
              color: '#a0a0aa',
              marginTop: '8px',
              maxWidth: '480px'
            }}>
              Receive private salon invitations, preview upcoming runway capsules, and read our Karigar heritage journals.
            </p>
          </div>

          <div>
            {isSubscribed ? (
              <div style={{
                padding: '16px 24px',
                background: 'rgba(197, 160, 89, 0.15)',
                border: '1px solid #c5a059',
                borderRadius: '2px',
                color: '#eaddc5',
                fontFamily: 'var(--font-serif-editorial)',
                fontSize: '1.15rem'
              }}>
                ✨ You are now enlisted in our Private Correspondence circle.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '10px' }}>
                <input
                  type="email"
                  required
                  placeholder="Enter your patron correspondence email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    flex: 1,
                    padding: '16px 20px',
                    background: '#121217',
                    border: '1px solid rgba(197, 160, 89, 0.3)',
                    color: '#faf8f5',
                    fontSize: '0.85rem',
                    borderRadius: '2px',
                    outline: 'none'
                  }}
                />
                <button
                  type="submit"
                  className="btn-couture"
                  style={{ padding: '16px 28px', whiteSpace: 'nowrap' }}
                >
                  <span>Enlist</span>
                  <ArrowRight size={15} style={{ marginLeft: '6px' }} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div style={{
        maxWidth: '1440px',
        margin: '0 auto',
        padding: '70px 32px 50px 32px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '40px'
      }}>
        {/* Brand Col */}
        <div>
          <div style={{
            fontFamily: 'var(--font-serif-display)',
            fontSize: '1.6rem',
            letterSpacing: '0.18em',
            marginBottom: '10px',
            color: '#faf8f5'
          }}>
            ATELIER VÉRONIQUE
          </div>
          <p style={{
            fontFamily: 'var(--font-serif-editorial)',
            fontSize: '1.05rem',
            color: '#8e8e99',
            lineHeight: 1.6,
            marginBottom: '20px'
          }}>
            Purveyors of ultra-fine Indian handloom weaves, pure silk organza, and bespoke bridal couture.
          </p>
          <div style={{ fontSize: '0.78rem', color: '#c5a059', fontFamily: 'var(--font-cinzel)', letterSpacing: '0.12em' }}>
            PARIS • MUMBAI • LONDON • DUBAI • NEW YORK
          </div>
        </div>

        {/* Collections Col */}
        <div>
          <h4 style={{
            fontFamily: 'var(--font-cinzel)',
            fontSize: '0.82rem',
            letterSpacing: '0.2em',
            color: '#c5a059',
            textTransform: 'uppercase',
            marginBottom: '20px'
          }}>
            HAUTE EDITIONS
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {['Spring Atelier 2026', 'Nocturne Velvet Heritage', 'Kashi Banarasi Weaves', 'Sculpted Cape Ensembles', 'Kashmiri Tilla Silhouettes', 'Polki & Moissanite Jewels'].map(item => (
              <li key={item}>
                <a href="#products" style={{ color: '#d1cdc7', textDecoration: 'none', fontSize: '0.88rem', transition: 'color 0.2s' }}
                   onMouseEnter={(e) => e.target.style.color = '#c5a059'}
                   onMouseLeave={(e) => e.target.style.color = '#d1cdc7'}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Concierge Col */}
        <div>
          <h4 style={{
            fontFamily: 'var(--font-cinzel)',
            fontSize: '0.82rem',
            letterSpacing: '0.2em',
            color: '#c5a059',
            textTransform: 'uppercase',
            marginBottom: '20px'
          }}>
            CLIENT CONCIERGE
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {['Virtual Salon Fitting', 'Bespoke Bridal Consultations', 'Silk Mark Certification', 'White-Glove Global Delivery', 'Silk Preservation Guide', 'Private Salon Appointments'].map(item => (
              <li key={item}>
                <a href="#editorial" style={{ color: '#d1cdc7', textDecoration: 'none', fontSize: '0.88rem', transition: 'color 0.2s' }}
                   onMouseEnter={(e) => e.target.style.color = '#c5a059'}
                   onMouseLeave={(e) => e.target.style.color = '#d1cdc7'}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Boutiques */}
        <div>
          <h4 style={{
            fontFamily: 'var(--font-cinzel)',
            fontSize: '0.82rem',
            letterSpacing: '0.2em',
            color: '#c5a059',
            textTransform: 'uppercase',
            marginBottom: '20px'
          }}>
            FLAGSHIP SALONS
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.85rem', color: '#a0a0aa' }}>
            <div>
              <strong style={{ color: '#faf8f5', display: 'block' }}>MUMBAI ATELIER</strong>
              Altamount Road, Cumballa Hill, Mumbai 400026
            </div>
            <div>
              <strong style={{ color: '#faf8f5', display: 'block' }}>PARISIAN SHOWROOM</strong>
              18 Place Vendôme, 75001 Paris, France
            </div>
            <div>
              <strong style={{ color: '#faf8f5', display: 'block' }}>DUBAI LOUNGE</strong>
              Dubai Mall Fashion Avenue, Level 1, UAE
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright & Guarantee */}
      <div style={{
        borderTop: '1px solid rgba(255, 255, 255, 0.06)',
        padding: '24px 32px',
        maxWidth: '1440px',
        margin: '0 auto',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '16px',
        fontSize: '0.75rem',
        color: '#71717a'
      }}>
        <div>
          © {new Date().getFullYear()} ATELIER VÉRONIQUE HAUTE COUTURE. ALL RIGHTS RESERVED.
        </div>
        <div style={{ display: 'flex', gap: '20px' }}>
          <span>Privacy Covenant</span>
          <span>Terms of Patronage</span>
          <span>Authenticity Guarantee</span>
        </div>
      </div>
    </footer>
  );
}

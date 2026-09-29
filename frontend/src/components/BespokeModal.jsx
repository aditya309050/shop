import React, { useState } from 'react';
import { X, Sparkles, Ruler, Calendar, CheckCircle2, ShieldCheck, Send } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useShop } from '../context/ShopContext';

export default function BespokeModal({ isOpen, onClose, preselectedProduct }) {
  const { showToast } = useShop();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: 'Her Highness / Patron',
    email: '',
    phone: '',
    date: '2026-04-15',
    timeSlot: '14:00 - 15:00 IST',
    occasion: 'Bridal Reception',
    bust: '36',
    waist: '28',
    hip: '38',
    height: "5'6\"",
    silhouette: preselectedProduct?.name || 'Ivory Organza Bloom Saree',
    specialNotes: 'Require golden zari border extension on pallu.'
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#c5a059', '#faf8f5', '#eaddc5']
    });
    setStep(2);
    showToast('Virtual Salon Consultation Reserved');
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 260,
      background: 'rgba(9, 9, 11, 0.94)',
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
          maxWidth: '760px',
          background: '#121217',
          border: '1px solid rgba(197, 160, 89, 0.4)',
          borderRadius: '2px',
          padding: '40px',
          position: 'relative',
          maxHeight: '92vh',
          overflowY: 'auto'
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

        {step === 2 ? (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{
              width: '68px',
              height: '68px',
              borderRadius: '50%',
              background: 'rgba(197, 160, 89, 0.15)',
              border: '1px solid #c5a059',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px auto',
              color: '#c5a059'
            }}>
              <CheckCircle2 size={34} />
            </div>

            <div style={{
              fontFamily: 'var(--font-cinzel)',
              fontSize: '0.78rem',
              color: '#c5a059',
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
              marginBottom: '6px'
            }}>
              Bespoke Fitting Reserved
            </div>

            <h2 style={{ fontFamily: 'var(--font-serif-display)', fontSize: '2.2rem', color: '#faf8f5', marginBottom: '14px' }}>
              Salon Appointment Confirmed
            </h2>

            <p style={{
              fontFamily: 'var(--font-serif-editorial)',
              fontSize: '1.15rem',
              color: '#d1cdc7',
              maxWidth: '520px',
              margin: '0 auto 24px auto',
              lineHeight: 1.6
            }}>
              Our Senior Master Drape Karigar will host your private 1-on-1 virtual styling session on <strong>{formData.date}</strong> at <strong>{formData.timeSlot}</strong>.
            </p>

            <div style={{
              background: '#18181d',
              border: '1px solid rgba(197, 160, 89, 0.25)',
              borderRadius: '2px',
              padding: '20px',
              maxWidth: '480px',
              margin: '0 auto 30px auto',
              textAlign: 'left'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.85rem' }}>
                <span style={{ color: '#888894' }}>Patron:</span>
                <span style={{ color: '#faf8f5' }}>{formData.name}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.85rem' }}>
                <span style={{ color: '#888894' }}>Selected Silhouette:</span>
                <span style={{ color: '#c5a059', fontFamily: 'var(--font-cinzel)' }}>{formData.silhouette}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                <span style={{ color: '#888894' }}>Measurements:</span>
                <span style={{ color: '#faf8f5' }}>B: {formData.bust}" | W: {formData.waist}" | H: {formData.hip}"</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="btn-couture"
              style={{ padding: '14px 36px' }}
            >
              Return to Haute Atelier
            </button>
          </div>
        ) : (
          <div>
            <div style={{ marginBottom: '28px' }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                color: '#c5a059',
                fontFamily: 'var(--font-cinzel)',
                fontSize: '0.75rem',
                letterSpacing: '0.24em',
                textTransform: 'uppercase',
                marginBottom: '8px'
              }}>
                <Sparkles size={14} />
                <span>Virtual Karigar Salon</span>
              </div>

              <h2 style={{
                fontFamily: 'var(--font-serif-display)',
                fontSize: '2.2rem',
                color: '#faf8f5',
                fontWeight: 400
              }}>
                Bespoke Measurement & Drape Consultation
              </h2>
              <p style={{ fontFamily: 'var(--font-serif-editorial)', fontSize: '1.05rem', color: '#a0a0aa', marginTop: '6px' }}>
                Personalize every stitch with our master tailors for a glove-like haute couture fit.
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.72rem', fontFamily: 'var(--font-cinzel)', color: '#a0a0aa', marginBottom: '6px' }}>
                    PATRON NAME
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      background: '#09090b',
                      border: '1px solid rgba(197, 160, 89, 0.3)',
                      color: '#faf8f5',
                      borderRadius: '2px',
                      outline: 'none',
                      fontSize: '0.85rem'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.72rem', fontFamily: 'var(--font-cinzel)', color: '#a0a0aa', marginBottom: '6px' }}>
                    CONTACT WHATSAPP / PHONE
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="+91 98200 00000"
                    value={formData.phone}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      background: '#09090b',
                      border: '1px solid rgba(197, 160, 89, 0.3)',
                      color: '#faf8f5',
                      borderRadius: '2px',
                      outline: 'none',
                      fontSize: '0.85rem'
                    }}
                  />
                </div>
              </div>

              {/* Measurements row */}
              <div style={{
                background: 'rgba(24, 24, 29, 0.7)',
                border: '1px solid rgba(197, 160, 89, 0.2)',
                padding: '16px',
                borderRadius: '2px',
                marginBottom: '20px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.75rem',
                  fontFamily: 'var(--font-cinzel)',
                  color: '#eaddc5',
                  marginBottom: '12px'
                }}>
                  <Ruler size={14} color="#c5a059" />
                  <span>CUSTOM MEASUREMENTS (INCHES)</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
                  <div>
                    <span style={{ fontSize: '0.7rem', color: '#8e8e99' }}>Bust</span>
                    <input
                      type="text"
                      name="bust"
                      value={formData.bust}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: '8px',
                        background: '#09090b',
                        border: '1px solid rgba(255,255,255,0.1)',
                        color: '#faf8f5',
                        textAlign: 'center',
                        fontSize: '0.85rem'
                      }}
                    />
                  </div>

                  <div>
                    <span style={{ fontSize: '0.7rem', color: '#8e8e99' }}>Waist</span>
                    <input
                      type="text"
                      name="waist"
                      value={formData.waist}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: '8px',
                        background: '#09090b',
                        border: '1px solid rgba(255,255,255,0.1)',
                        color: '#faf8f5',
                        textAlign: 'center',
                        fontSize: '0.85rem'
                      }}
                    />
                  </div>

                  <div>
                    <span style={{ fontSize: '0.7rem', color: '#8e8e99' }}>Hip</span>
                    <input
                      type="text"
                      name="hip"
                      value={formData.hip}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: '8px',
                        background: '#09090b',
                        border: '1px solid rgba(255,255,255,0.1)',
                        color: '#faf8f5',
                        textAlign: 'center',
                        fontSize: '0.85rem'
                      }}
                    />
                  </div>

                  <div>
                    <span style={{ fontSize: '0.7rem', color: '#8e8e99' }}>Height</span>
                    <input
                      type="text"
                      name="height"
                      value={formData.height}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: '8px',
                        background: '#09090b',
                        border: '1px solid rgba(255,255,255,0.1)',
                        color: '#faf8f5',
                        textAlign: 'center',
                        fontSize: '0.85rem'
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Date & Time */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '24px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.72rem', fontFamily: 'var(--font-cinzel)', color: '#a0a0aa', marginBottom: '6px' }}>
                    PREFERRED SALON DATE
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '10px',
                      background: '#09090b',
                      border: '1px solid rgba(197, 160, 89, 0.3)',
                      color: '#faf8f5',
                      fontSize: '0.85rem'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.72rem', fontFamily: 'var(--font-cinzel)', color: '#a0a0aa', marginBottom: '6px' }}>
                    TIME SLOT
                  </label>
                  <select
                    name="timeSlot"
                    value={formData.timeSlot}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '10px',
                      background: '#09090b',
                      border: '1px solid rgba(197, 160, 89, 0.3)',
                      color: '#faf8f5',
                      fontSize: '0.85rem'
                    }}
                  >
                    <option value="11:00 - 12:00 IST">11:00 - 12:00 IST (Morning Salon)</option>
                    <option value="14:00 - 15:00 IST">14:00 - 15:00 IST (Afternoon Salon)</option>
                    <option value="17:00 - 18:00 IST">17:00 - 18:00 IST (Sunset Salon)</option>
                    <option value="20:00 - 21:00 IST">20:00 - 21:00 IST (London / Dubai Evening)</option>
                  </select>
                </div>
              </div>

              <div style={{
                borderTop: '1px solid rgba(255,255,255,0.08)',
                paddingTop: '20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div style={{ fontSize: '0.72rem', color: '#8e8e99', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <ShieldCheck size={14} color="#c5a059" />
                  <span>Complimentary Bespoke Service</span>
                </div>

                <button
                  type="submit"
                  className="btn-couture"
                  style={{ padding: '14px 32px' }}
                >
                  <Send size={15} style={{ marginRight: '8px' }} />
                  <span>CONFIRM APPOINTMENT</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

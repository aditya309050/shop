import React from 'react';
import { ShieldCheck, Truck, RotateCcw, Award, Phone, Mail, MapPin } from 'lucide-react';

export default function ManyavarFooter() {
  return (
    <footer className="bg-[#260e0a] text-[#eaddc5] pt-16 pb-12 border-t border-[#4a1c14]">
      {/* Trust Highlights Bar */}
      <div className="max-w-7xl mx-auto px-6 pb-12 border-b border-[#4a1c14]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center sm:text-left">
          <div className="flex items-center gap-4 justify-center sm:justify-start">
            <div className="w-12 h-12 rounded-full bg-[#3b1812] border border-[#e25822]/40 flex items-center justify-center text-[#e25822]">
              <Truck size={22} />
            </div>
            <div>
              <h4 className="font-serif font-bold text-sm text-white">Free Express Shipping</h4>
              <p className="text-xs text-[#b8a996]">Complimentary delivery across India</p>
            </div>
          </div>

          <div className="flex items-center gap-4 justify-center sm:justify-start">
            <div className="w-12 h-12 rounded-full bg-[#3b1812] border border-[#e25822]/40 flex items-center justify-center text-[#e25822]">
              <ShieldCheck size={22} />
            </div>
            <div>
              <h4 className="font-serif font-bold text-sm text-white">100% Authentic</h4>
              <p className="text-xs text-[#b8a996]">Direct from Varanasi & master artisans</p>
            </div>
          </div>

          <div className="flex items-center gap-4 justify-center sm:justify-start">
            <div className="w-12 h-12 rounded-full bg-[#3b1812] border border-[#e25822]/40 flex items-center justify-center text-[#e25822]">
              <Award size={22} />
            </div>
            <div>
              <h4 className="font-serif font-bold text-sm text-white">Bespoke Tailoring</h4>
              <p className="text-xs text-[#b8a996]">Custom fit by master drapers</p>
            </div>
          </div>

          <div className="flex items-center gap-4 justify-center sm:justify-start">
            <div className="w-12 h-12 rounded-full bg-[#3b1812] border border-[#e25822]/40 flex items-center justify-center text-[#e25822]">
              <RotateCcw size={22} />
            </div>
            <div>
              <h4 className="font-serif font-bold text-sm text-white">Hassle-Free Returns</h4>
              <p className="text-xs text-[#b8a996]">15 days seamless exchange policy</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Links Grid */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 text-xs">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-1.5 select-none">
              <span className="font-display text-2xl font-bold tracking-tight text-[#d4752b]">
                Manyavar
              </span>
              <span className="w-5 h-5 rounded-sm bg-[#e25822] text-[#fbf8f2] flex items-center justify-center font-bold text-xs">
                M
              </span>
              <span className="font-display text-2xl font-bold tracking-tight text-[#d4752b]">
                Mohey
              </span>
            </div>
            <p className="text-[#b8a996] text-xs leading-relaxed max-w-sm">
              India's leading celebration wear brand. Redefining Indian weddings and festive heritage with timeless sherwanis, lehengas, and handloom silk sarees since 1999.
            </p>
            <div className="pt-2 text-xs space-y-1 text-[#b8a996]">
              <p>📍 650+ Stores Across 240+ Cities & Worldwide</p>
              <p>📞 Concierge: +91 1800 120 0005 (Mon-Sat, 9 AM - 7 PM)</p>
            </div>
          </div>

          {/* Men's Links */}
          <div className="space-y-3">
            <h5 className="font-cinzel font-bold text-sm text-white tracking-wider uppercase">
              MEN (MANYAVAR)
            </h5>
            <ul className="space-y-2 text-[#b8a996]">
              <li className="hover:text-white cursor-pointer transition-colors">Groom Sherwanis</li>
              <li className="hover:text-white cursor-pointer transition-colors">Indo Western Sets</li>
              <li className="hover:text-white cursor-pointer transition-colors">Jodhpuri Bandhgalas</li>
              <li className="hover:text-white cursor-pointer transition-colors">Kurta Pajama Sets</li>
              <li className="hover:text-white cursor-pointer transition-colors">Nehru Bundi Jackets</li>
              <li className="hover:text-white cursor-pointer transition-colors">Safas & Stoles</li>
            </ul>
          </div>

          {/* Women's Links */}
          <div className="space-y-3">
            <h5 className="font-cinzel font-bold text-sm text-white tracking-wider uppercase">
              WOMEN (MOHEY)
            </h5>
            <ul className="space-y-2 text-[#b8a996]">
              <li className="hover:text-white cursor-pointer transition-colors">Bridal Lehengas</li>
              <li className="hover:text-white cursor-pointer transition-colors">Banarasi Silk Sarees</li>
              <li className="hover:text-white cursor-pointer transition-colors">Organza Tissue Sarees</li>
              <li className="hover:text-white cursor-pointer transition-colors">Festive Kurti Sets</li>
              <li className="hover:text-white cursor-pointer transition-colors">Cocktail Gowns</li>
              <li className="hover:text-white cursor-pointer transition-colors">Mughal Anarkalis</li>
            </ul>
          </div>

          {/* Kids & Services */}
          <div className="space-y-3">
            <h5 className="font-cinzel font-bold text-sm text-white tracking-wider uppercase">
              KIDS & SERVICES
            </h5>
            <ul className="space-y-2 text-[#b8a996]">
              <li className="hover:text-white cursor-pointer transition-colors">Boys' Sherwanis</li>
              <li className="hover:text-white cursor-pointer transition-colors">Girls' Lehengas</li>
              <li className="hover:text-white cursor-pointer transition-colors">Book Video Appointment</li>
              <li className="hover:text-white cursor-pointer transition-colors">Store Locator</li>
              <li className="hover:text-white cursor-pointer transition-colors">Track Your Order</li>
              <li className="hover:text-white cursor-pointer transition-colors">Customer Care</li>
            </ul>
          </div>

        </div>
      </div>

      {/* Copyright Bar */}
      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-[#3e1810] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8f8272]">
        <p>© 2026 Manyavar & Mohey Celebration Wear. All Rights Reserved.</p>
        <p className="font-cinzel">Taiyaar Hoke Aaiye • Handcrafted in India</p>
      </div>
    </footer>
  );
}

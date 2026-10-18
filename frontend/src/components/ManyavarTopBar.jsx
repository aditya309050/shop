import React from 'react';
import { Heart, Calendar, Store, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function ManyavarTopBar({ onOpenAppointments, onOpenWishlist }) {
  const { wishlistCount } = useShop();

  return (
    <div className="w-full bg-[#3e1e16] text-[#eaddc5] text-[0.72rem] tracking-wider py-2 px-4 sm:px-[30px] border-b border-[#52291e] flex flex-wrap justify-between items-center z-50 relative">
      {/* Left: Country & Currency */}
      <div className="flex items-center gap-2">
        <span className="text-sm">🇮🇳</span>
        <span className="font-semibold text-white tracking-widest uppercase">INDIA | ₹ INR</span>
      </div>

      {/* Center: Brand Trust Message */}
      <div className="hidden md:flex items-center gap-1.5 text-[#d8cab7]">
        <Sparkles size={11} className="text-[#e25822]" />
        <span>Welcome to Chunnilal Megamart • Trusted since 1999 • 100% Authentic Handloom Guarantee</span>
      </div>

      {/* Right: Quick Utility Links */}
      <div className="flex items-center gap-5 text-[#d8cab7] text-[0.68rem] tracking-widest font-semibold uppercase">
        <button 
          onClick={onOpenWishlist}
          className="hover:text-white transition-colors cursor-pointer flex items-center gap-1"
        >
          <span>WISHLIST</span>
          {wishlistCount > 0 && <span className="bg-[#e25822] text-white px-1.5 py-0.2 rounded-full text-[0.6rem]">{wishlistCount}</span>}
        </button>
        <span className="opacity-40">|</span>
        <button 
          onClick={onOpenAppointments}
          className="hover:text-white transition-colors cursor-pointer"
        >
          APPOINTMENTS
        </button>
        <span className="opacity-40">|</span>
        <button 
          onClick={onOpenAppointments}
          className="hover:text-white transition-colors cursor-pointer"
        >
          STORES
        </button>
      </div>
    </div>
  );
}

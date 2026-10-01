import React, { useState } from 'react';
import { 
  ShieldCheck, 
  CreditCard, 
  Award, 
  Sparkles, 
  ArrowRight,
  Globe
} from 'lucide-react';

export default function ManyavarFooter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail('');
    }
  };

  return (
    <footer className="w-full bg-[#fbf8f2] text-[#221e1a]">
      {/* 1. Top Editorial 3-Column Stories Banner */}
      <div className="w-full border-t border-[#e8dfd1] bg-[#fbf8f2] py-12 px-4 sm:px-[30px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          
          {/* Column 1 */}
          <div className="space-y-3">
            <h4 className="font-cinzel font-bold text-sm tracking-widest text-[#e25822] uppercase">
              WEDDING X DAZZLE
            </h4>
            <p className="text-xs text-[#5a5043] leading-relaxed">
              Explore Celebration Wear that spans design and styles that will floor you.
            </p>
            <div>
              <a 
                href="#most-loved-section" 
                className="inline-block text-xs font-cinzel font-bold text-[#2b241e] hover:text-[#e25822] underline underline-offset-4 tracking-wider uppercase transition-colors"
              >
                Shop Now
              </a>
            </div>
          </div>

          {/* Column 2 */}
          <div className="space-y-3">
            <h4 className="font-cinzel font-bold text-sm tracking-widest text-[#e25822] uppercase">
              TAIYAAR LIKE A STAR
            </h4>
            <p className="text-xs text-[#5a5043] leading-relaxed">
              Best man or her man, you will look your best as The Man when TAIYAAR.
            </p>
            <div>
              <a 
                href="#most-loved-section" 
                className="inline-block text-xs font-cinzel font-bold text-[#2b241e] hover:text-[#e25822] underline underline-offset-4 tracking-wider uppercase transition-colors"
              >
                Shop Now
              </a>
            </div>
          </div>

          {/* Column 3 */}
          <div className="space-y-3">
            <h4 className="font-cinzel font-bold text-sm tracking-widest text-[#e25822] uppercase">
              WEDDING X CONTEMPORARY
            </h4>
            <p className="text-xs text-[#5a5043] leading-relaxed">
              How wonderful would it be to regard an invitation simply by dressing well.
            </p>
            <div>
              <a 
                href="#most-loved-section" 
                className="inline-block text-xs font-cinzel font-bold text-[#2b241e] hover:text-[#e25822] underline underline-offset-4 tracking-wider uppercase transition-colors"
              >
                Shop Now
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* 2. Trust Icons Bar (4 Items) */}
      <div className="w-full border-y border-[#e8dfd1] bg-[#fbf8f2] py-8 px-4 sm:px-[30px]">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          
          {/* Trust 1: Made In India */}
          <div className="flex flex-col items-center justify-center gap-2 group">
            <div className="w-12 h-12 flex items-center justify-center text-[#784a36] group-hover:text-[#e25822] transition-colors">
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
              </svg>
            </div>
            <span className="font-cinzel text-xs font-bold tracking-widest text-[#3b2d24] uppercase">
              MADE IN INDIA
            </span>
          </div>

          {/* Trust 2: Assured Quality */}
          <div className="flex flex-col items-center justify-center gap-2 group">
            <div className="w-12 h-12 flex items-center justify-center text-[#784a36] group-hover:text-[#e25822] transition-colors">
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="8" r="6" />
                <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
                <path d="m12 5 1 2 2.2.3-1.6 1.5.4 2.2-2-1.1-2 1.1.4-2.2L8.8 7.3 11 7z" fill="currentColor" />
              </svg>
            </div>
            <span className="font-cinzel text-xs font-bold tracking-widest text-[#3b2d24] uppercase">
              ASSURED QUALITY
            </span>
          </div>

          {/* Trust 3: Secure Payments */}
          <div className="flex flex-col items-center justify-center gap-2 group">
            <div className="w-12 h-12 flex items-center justify-center text-[#784a36] group-hover:text-[#e25822] transition-colors">
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="14" x="2" y="5" rx="2" />
                <line x1="2" x2="22" y1="10" y2="10" />
                <circle cx="7" cy="15" r="1" fill="currentColor" />
              </svg>
            </div>
            <span className="font-cinzel text-xs font-bold tracking-widest text-[#3b2d24] uppercase">
              SECURE PAYMENTS
            </span>
          </div>

          {/* Trust 4: Empowering Weavers */}
          <div className="flex flex-col items-center justify-center gap-2 group">
            <div className="w-12 h-12 flex items-center justify-center text-[#784a36] group-hover:text-[#e25822] transition-colors">
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0"/>
                <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2"/>
                <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8"/>
                <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/>
              </svg>
            </div>
            <span className="font-cinzel text-xs font-bold tracking-widest text-[#3b2d24] uppercase">
              EMPOWERING WEAVERS
            </span>
          </div>

        </div>
      </div>

      {/* 3. Deep Chocolate Maroon Manyavar Footer */}
      <div className="w-full bg-[#2c120c] text-[#e8ded2] pt-12 pb-8 px-4 sm:px-[30px] border-t border-[#461e15]">
        
        {/* Top Header inside Footer: Logo + Newsletter */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-10 border-b border-[#461e15]">
          
          {/* Manyavar & Mohey Brand Title */}
          <div className="flex items-center gap-2 select-none cursor-pointer">
            <span className="font-display text-3xl font-bold tracking-tight text-[#e8903c]">
              Manyavar
            </span>
            <span className="w-6 h-6 rounded-xs bg-[#e25822] text-[#fbf8f2] flex items-center justify-center font-bold text-xs">
              M
            </span>
            <span className="font-display text-3xl font-bold tracking-tight text-[#e8903c]">
              Mohey
            </span>
          </div>

          {/* Newsletter Input Box */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full lg:w-auto">
            <span className="font-cinzel text-xs sm:text-sm font-semibold tracking-wider text-white">
              Subscribe to our Newsletter
            </span>
            <form onSubmit={handleSubscribe} className="flex items-center w-full sm:w-80 border border-[#6b3528] bg-[#1d0a06] rounded-xs overflow-hidden">
              <input 
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-transparent px-3.5 py-2 text-xs text-white placeholder-[#8e7a70] outline-none font-sans"
              />
              <button 
                type="submit" 
                className="px-3.5 py-2 bg-[#1d0a06] hover:bg-[#e25822] text-white transition-colors cursor-pointer border-l border-[#6b3528]"
              >
                <ArrowRight size={15} />
              </button>
            </form>
            {subscribed && (
              <span className="text-xs text-[#52c41a] font-cinzel">Subscribed successfully!</span>
            )}
          </div>
        </div>

        {/* 5-Column Navigation Links */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 py-10 text-xs">
          
          {/* Column 1: CATEGORIES */}
          <div className="space-y-3">
            <h5 className="font-cinzel font-bold text-xs tracking-widest text-white uppercase">
              CATEGORIES
            </h5>
            <ul className="space-y-2 text-[#b5a396]">
              <li className="hover:text-white cursor-pointer transition-colors">Kurta Pajama</li>
              <li className="hover:text-white cursor-pointer transition-colors">Kurta Jacket Sets</li>
              <li className="hover:text-white cursor-pointer transition-colors">Kurta</li>
              <li className="hover:text-white cursor-pointer transition-colors">Nehru Jackets</li>
              <li className="hover:text-white cursor-pointer transition-colors">Indo Western</li>
              <li className="hover:text-white cursor-pointer transition-colors">Sherwani</li>
              <li className="hover:text-white cursor-pointer transition-colors">Lehenga</li>
              <li className="hover:text-white cursor-pointer transition-colors">Saree</li>
              <li className="hover:text-white cursor-pointer transition-colors">Kidswear</li>
              <li className="hover:text-white cursor-pointer transition-colors">Accessories</li>
            </ul>
          </div>

          {/* Column 2: SUPPORT */}
          <div className="space-y-3">
            <h5 className="font-cinzel font-bold text-xs tracking-widest text-white uppercase">
              SUPPORT
            </h5>
            <ul className="space-y-2 text-[#b5a396]">
              <li className="hover:text-white cursor-pointer transition-colors">Track Order</li>
              <li className="hover:text-white cursor-pointer transition-colors">Contact Us</li>
              <li className="hover:text-white cursor-pointer transition-colors">My Account</li>
            </ul>
          </div>

          {/* Column 3: QUICK LINKS */}
          <div className="space-y-3">
            <h5 className="font-cinzel font-bold text-xs tracking-widest text-white uppercase">
              QUICK LINKS
            </h5>
            <ul className="space-y-2 text-[#b5a396]">
              <li className="hover:text-white cursor-pointer transition-colors">About Us</li>
              <li className="hover:text-white cursor-pointer transition-colors">Brand Story</li>
              <li className="hover:text-white cursor-pointer transition-colors">Blogs</li>
              <li className="hover:text-white cursor-pointer transition-colors">Careers</li>
              <li className="hover:text-white cursor-pointer transition-colors">Store Locator</li>
            </ul>
          </div>

          {/* Column 4: OUR POLICIES */}
          <div className="space-y-3">
            <h5 className="font-cinzel font-bold text-xs tracking-widest text-white uppercase">
              OUR POLICIES
            </h5>
            <ul className="space-y-2 text-[#b5a396]">
              <li className="hover:text-white cursor-pointer transition-colors">FAQs</li>
              <li className="hover:text-white cursor-pointer transition-colors">Shipping Details</li>
              <li className="hover:text-white cursor-pointer transition-colors">Return, Exchange and Refund Policy</li>
              <li className="hover:text-white cursor-pointer transition-colors">Terms of Use</li>
              <li className="hover:text-white cursor-pointer transition-colors">Privacy Policy</li>
              <li className="hover:text-white cursor-pointer transition-colors">Cookie Policy</li>
            </ul>
          </div>

          {/* Column 5: CONTACT */}
          <div className="space-y-4">
            <h5 className="font-cinzel font-bold text-xs tracking-widest text-white uppercase">
              CONTACT
            </h5>
            <div className="space-y-2 text-[#b5a396]">
              <p className="text-white hover:underline cursor-pointer">care@vedantfashions.com</p>
              <p className="leading-relaxed">
                Call us at : <span className="text-white font-medium">1800-120-000-500</span> (India) / <br />
                <span className="text-white font-medium">+91 9674373838</span> (International)
              </p>
              <p className="text-[#8e7a70]">10am - 7pm IST, 7 Days a Week</p>
            </div>

            {/* Social Icons */}
            <div className="pt-2">
              <h6 className="font-cinzel font-bold text-[0.7rem] tracking-widest text-white uppercase mb-2.5">
                KEEP IN TOUCH
              </h6>
              <div className="flex items-center gap-3.5 text-[#d8cab7]">
                {/* Facebook */}
                <a href="#" className="hover:text-[#e25822] transition-colors" title="Facebook">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                  </svg>
                </a>
                {/* Twitter / X */}
                <a href="#" className="hover:text-[#e25822] transition-colors" title="Twitter">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                {/* LinkedIn */}
                <a href="#" className="hover:text-[#e25822] transition-colors" title="LinkedIn">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 6a2 2 0 1 1-2-2 2 2 0 0 1 2 2z"/>
                  </svg>
                </a>
                {/* Instagram */}
                <a href="#" className="hover:text-[#e25822] transition-colors" title="Instagram">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                  </svg>
                </a>
                {/* YouTube */}
                <a href="#" className="hover:text-[#e25822] transition-colors" title="YouTube">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33zM9.75 15.02V8.48l5.75 3.27-5.75 3.27z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* 4. Bottom Row: Shipping, Copyright & Payment Badges */}
        <div className="pt-8 border-t border-[#461e15] flex flex-col lg:flex-row items-center justify-between gap-6 text-xs text-[#8e7a70]">
          
          {/* Left: Country + Couriers */}
          <div className="flex items-center flex-wrap gap-4 font-sans text-xs">
            <div className="flex items-center gap-1.5 text-white font-medium">
              <Globe size={14} className="text-[#e25822]" />
              <span>India</span>
            </div>
            <span className="text-[#553026]">|</span>
            <span className="font-bold tracking-tight text-white/90">FedEx.</span>
            <span className="text-[#553026]">|</span>
            <span className="font-bold tracking-tight text-[#29b6f6]">BLUE DART &gt;</span>
            <span className="text-[#553026]">|</span>
            <span className="font-bold tracking-tight text-[#e25822]">DELHIVERY</span>
          </div>

          {/* Center: Copyright */}
          <div className="text-center font-sans text-xs text-[#a39285]">
            © 2026 Vedant Fashions Ltd. All rights reserved.
          </div>

          {/* Right: Payment Badges */}
          <div className="flex items-center flex-wrap gap-2 text-xs">
            <span className="text-white/80 font-cinzel mr-2 text-[0.7rem] uppercase tracking-wider">100% Secure Payments</span>
            <div className="flex items-center gap-1.5">
              <span className="bg-[#1d0a06] border border-[#553026] text-white font-bold text-[0.65rem] px-2 py-0.5 rounded-2xs">VISA</span>
              <span className="bg-[#1d0a06] border border-[#553026] text-[#eb001b] font-bold text-[0.65rem] px-2 py-0.5 rounded-2xs">Mastercard</span>
              <span className="bg-[#1d0a06] border border-[#553026] text-[#006fcf] font-bold text-[0.65rem] px-2 py-0.5 rounded-2xs">Amex</span>
              <span className="bg-[#1d0a06] border border-[#553026] text-[#003087] font-bold text-[0.65rem] px-2 py-0.5 rounded-2xs">PayPal</span>
              <span className="bg-[#1d0a06] border border-[#553026] text-[#5cb85c] font-bold text-[0.65rem] px-2 py-0.5 rounded-2xs">UPI</span>
              <span className="bg-[#1d0a06] border border-[#553026] text-white text-[0.65rem] px-2 py-0.5 rounded-2xs">NetBanking</span>
            </div>
          </div>

        </div>

      </div>
    </footer>
  );
}

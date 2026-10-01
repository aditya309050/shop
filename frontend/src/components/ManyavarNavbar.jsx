import React, { useState } from 'react';
import { Search, ShoppingBag, User, Heart, Menu, X } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function ManyavarNavbar({ activeTab, onSelectTab, onOpenSearch, onOpenCart, onOpenWishlist }) {
  const { cartCount, wishlistCount } = useShop();
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const tabs = [
    { id: 'MEN', label: 'MEN' },
    { id: 'WOMEN', label: 'WOMEN' },
    { id: 'KIDS', label: 'KIDS' },
    { id: 'BLOGS', label: 'BLOGS' }
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onOpenSearch) onOpenSearch(searchQuery);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#fbf8f2] border-b border-[#e8dfd1] shadow-xs">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-6">
        
        {/* Left: Navigation Categories */}
        <nav className="hidden lg:flex items-center gap-8 font-cinzel text-xs tracking-[0.16em] font-bold text-[#2b241e]">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onSelectTab(tab.id)}
                className={`py-2 relative transition-colors cursor-pointer uppercase ${
                  isActive ? 'text-[#e25822]' : 'hover:text-[#e25822]'
                }`}
              >
                {tab.label}
                {isActive && (
                  <div className="absolute bottom-0 inset-x-0 h-0.5 bg-[#e25822]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-[#2b241e]"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Center: Iconic Manyavar & Mohey Logo */}
        <div 
          onClick={() => onSelectTab('MEN')}
          className="cursor-pointer text-center flex items-center gap-1.5 select-none"
        >
          <span className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#d4752b] drop-shadow-xs">
            Manyavar
          </span>
          <span className="w-6 h-6 rounded-sm bg-[#e25822] text-[#fbf8f2] flex items-center justify-center font-bold text-xs shadow-xs">
            M
          </span>
          <span className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#d4752b] drop-shadow-xs">
            Mohey
          </span>
        </div>

        {/* Right: Search Input & Account/Bag */}
        <div className="flex items-center gap-5">
          {/* Search Bar with Orange Action Button */}
          <form 
            onSubmit={handleSearchSubmit}
            className="hidden sm:flex items-center border border-[#d8cfbe] rounded-sm overflow-hidden bg-white shadow-inner focus-within:border-[#e25822] transition-colors"
          >
            <input
              type="text"
              placeholder={activeTab === 'WOMEN' ? 'Search for Bridal Lehenga, Saree...' : 'Search for Sherwani, Kurta...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-3 py-1.5 text-xs text-[#2b241e] placeholder-[#9c9182] outline-none w-52 md:w-64 bg-transparent font-sans"
            />
            <button
              type="submit"
              className="bg-[#e25822] hover:bg-[#c84412] text-white px-3 py-2 flex items-center justify-center transition-colors cursor-pointer"
            >
              <Search size={14} />
            </button>
          </form>

          {/* My Account */}
          <button 
            onClick={() => onOpenSearch && onOpenSearch()}
            className="hidden md:flex items-center gap-1.5 text-xs font-cinzel font-semibold text-[#2b241e] hover:text-[#e25822] transition-colors cursor-pointer uppercase tracking-wider"
          >
            <User size={15} />
            <span>MY ACCOUNT</span>
          </button>

          {/* Cart Bag */}
          <button
            onClick={onOpenCart}
            className="relative p-2 text-[#2b241e] hover:text-[#e25822] transition-colors cursor-pointer flex items-center gap-1"
            title="Shopping Bag"
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="bg-[#e25822] text-white text-[0.65rem] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#f5efe4] border-t border-[#e8dfd1] p-4 flex flex-col gap-3 font-cinzel text-xs font-bold text-[#2b241e]">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                onSelectTab(tab.id);
                setMobileMenuOpen(false);
              }}
              className={`text-left py-2 border-b border-[#e0d6c5] ${
                activeTab === tab.id ? 'text-[#e25822]' : ''
              }`}
            >
              {tab.label}
            </button>
          ))}
          <div className="pt-2">
            <form onSubmit={handleSearchSubmit} className="flex border border-[#d8cfbe] rounded-sm overflow-hidden bg-white">
              <input
                type="text"
                placeholder="Search outfits..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-3 py-2 text-xs text-[#2b241e] outline-none flex-1"
              />
              <button type="submit" className="bg-[#e25822] text-white px-4 py-2">
                <Search size={14} />
              </button>
            </form>
          </div>
        </div>
      )}
    </header>
  );
}

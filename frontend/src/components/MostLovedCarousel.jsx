import React, { useState } from 'react';
import { Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function MostLovedCarousel({ title = 'MOST LOVED', products = [], onSelectProduct }) {
  const { formatPrice, isInWishlist, toggleWishlist, setSelectedProduct, addToCart } = useShop();
  const [activeCategory, setActiveCategory] = useState('Men');

  const categories = ['Men', 'Women', 'Kids'];

  // Filter products by active tab category
  const filtered = products.filter(p => {
    if (activeCategory === 'Men') return p.gender === 'Men';
    if (activeCategory === 'Women') return p.gender === 'Women';
    if (activeCategory === 'Kids') return p.gender === 'Kids';
    return true;
  });

  return (
    <section className="w-full px-4 sm:px-[30px] py-14">
      {/* Centered Motif & Title */}
      <div className="text-center mb-6 space-y-2">
        <div className="flex justify-center mb-1">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-[#b33a10]">
            <path d="M12 2L14.5 8.5L21 9.5L16 14L17.5 21L12 17.5L6.5 21L8 14L3 9.5L9.5 8.5L12 2Z" fill="currentColor" opacity="0.9" />
          </svg>
        </div>

        <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal tracking-[0.16em] text-[#2b241e] uppercase">
          {title}
        </h2>
      </div>

      {/* Tabs: Men, Women, Kids */}
      <div className="flex justify-center items-center gap-8 mb-10 border-b border-[#e6dccf] pb-3 font-cinzel text-sm font-semibold tracking-wider">
        {categories.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`pb-2 relative transition-colors cursor-pointer uppercase ${
                isActive ? 'text-[#e25822] font-bold' : 'text-[#786e62] hover:text-[#2b241e]'
              }`}
            >
              {cat}
              {isActive && (
                <div className="absolute bottom-0 inset-x-0 h-0.5 bg-[#e25822]" />
              )}
            </button>
          );
        })}
      </div>

      {/* 4-Card Carousel Grid */}
      <div className="relative w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.slice(0, 4).map((product) => {
            const isWishlisted = isInWishlist(product.id);
            return (
              <div
                key={product.id}
                onClick={() => setSelectedProduct(product)}
                className="group flex flex-col bg-white border border-[#e8dfd1] rounded-sm overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                {/* Image Container */}
                <div className="relative w-full pt-[135%] overflow-hidden bg-[#f0e8dc]">
                  <img
                    src={product.images?.[0]}
                    alt={product.name}
                    className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Wishlist Heart */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product);
                    }}
                    className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 z-10 cursor-pointer ${
                      isWishlisted 
                        ? 'bg-[#e25822] text-white shadow-md' 
                        : 'bg-white/80 hover:bg-white text-[#2b241e] shadow-xs'
                    }`}
                  >
                    <Heart size={15} fill={isWishlisted ? "currentColor" : "none"} />
                  </button>

                  {/* Quick Add To Bag overlay on hover */}
                  <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product, 1);
                      }}
                      className="w-full py-2.5 bg-[#e25822] hover:bg-[#c84412] text-white font-cinzel text-xs font-bold tracking-wider uppercase rounded-sm shadow-md transition-colors"
                    >
                      Add To Bag
                    </button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-4 flex flex-col justify-between flex-1 space-y-2 bg-white">
                  <div>
                    {/* Badge */}
                    {product.badge && (
                      <span className="inline-block bg-[#e25822] text-white text-[0.62rem] font-bold font-cinzel px-2 py-0.5 rounded-2xs tracking-widest uppercase mb-1.5">
                        {product.badge}
                      </span>
                    )}

                    {/* Title */}
                    <h3 className="text-xs font-medium text-[#2b241e] line-clamp-2 leading-relaxed">
                      {product.name}
                    </h3>
                  </div>

                  {/* Price */}
                  <div className="pt-2 border-t border-[#f0e8dc] flex items-baseline gap-2">
                    <span className="font-bold text-sm text-[#2b241e]">
                      {formatPrice(product.price)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs text-[#9c9182] line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Circular Left and Right Arrows */}
        <button className="hidden 2xl:flex absolute -left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-md border border-[#e8dfd1] text-[#2b241e] hover:bg-[#e25822] hover:text-white items-center justify-center transition-all cursor-pointer z-10">
          <ChevronLeft size={20} />
        </button>
        <button className="hidden 2xl:flex absolute -right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-md border border-[#e8dfd1] text-[#2b241e] hover:bg-[#e25822] hover:text-white items-center justify-center transition-all cursor-pointer z-10">
          <ChevronRight size={20} />
        </button>
      </div>
    </section>
  );
}

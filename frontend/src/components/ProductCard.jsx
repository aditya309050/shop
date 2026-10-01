import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Heart, Eye, ShoppingBag, Star, Sparkles, ShieldCheck } from 'lucide-react';

export default function ProductCard({ product }) {
  const { 
    formatPrice, 
    toggleWishlist, 
    isInWishlist, 
    setSelectedProduct, 
    addToCart 
  } = useShop();

  const [isHovered, setIsHovered] = useState(false);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]);
  const isWishlisted = isInWishlist(product.id);

  const primaryImg = product.images?.[0];
  const secondaryImg = product.images?.[1] || primaryImg;

  // Calculate discount percent
  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <div 
      className="group relative flex flex-col bg-[#111116] border border-white/10 hover:border-gold/50 rounded-sm overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-gold/15 hover:-translate-y-1.5"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Showcase Container */}
      <div 
        className="relative w-full pt-[136%] overflow-hidden bg-[#18181f] cursor-pointer"
        onClick={() => setSelectedProduct(product)}
      >
        <img 
          src={isHovered ? secondaryImg : primaryImg} 
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Gradient Shadow Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#111116] via-transparent to-black/20 opacity-60" />

        {/* Brand / Edition Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.brand && (
            <span className="bg-black/85 backdrop-blur-md text-gold text-[0.62rem] font-cinzel font-bold tracking-wider px-2.5 py-0.5 rounded-sm border border-gold/40 uppercase">
              {product.brand}
            </span>
          )}
          {product.isBestseller && (
            <span className="bg-royal-crimson text-white text-[0.6rem] font-cinzel font-bold tracking-wider px-2 py-0.5 rounded-sm uppercase">
              Bestseller
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 z-20 cursor-pointer ${
            isWishlisted 
              ? 'bg-royal-crimson text-white scale-110 shadow-lg' 
              : 'bg-black/60 text-white/80 hover:bg-gold hover:text-black border border-white/10'
          }`}
          title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
        >
          <Heart size={16} fill={isWishlisted ? "currentColor" : "none"} />
        </button>

        {/* Floating Quick Action Buttons on Hover */}
        <div className="absolute inset-x-3 bottom-3 flex gap-2 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product, 1, selectedColor?.name || 'Standard');
            }}
            className="flex-1 py-2.5 bg-gradient-to-r from-gold via-gold-bright to-gold-dark text-black font-cinzel font-bold text-[0.7rem] tracking-wider uppercase rounded-sm flex items-center justify-center gap-1.5 shadow-lg cursor-pointer hover:brightness-110 transition-all"
          >
            <ShoppingBag size={13} />
            <span>Add To Bag</span>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedProduct(product);
            }}
            className="w-10 h-10 bg-black/80 hover:bg-white hover:text-black border border-white/20 text-white rounded-sm flex items-center justify-center transition-all cursor-pointer"
            title="Quick View"
          >
            <Eye size={15} />
          </button>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="p-4 flex flex-col flex-1 justify-between bg-[#111116] space-y-3">
        <div>
          {/* Subcategory & Rating */}
          <div className="flex items-center justify-between text-xs text-[#a09885] mb-1">
            <span className="font-cinzel tracking-wider uppercase text-[0.68rem] text-gold/80">
              {product.subCategory || product.category}
            </span>
            <div className="flex items-center gap-1 text-gold text-[0.7rem] font-semibold">
              <Star size={11} fill="currentColor" />
              <span>{product.rating || '4.9'}</span>
              <span className="text-white/40">({product.reviewsCount || 24})</span>
            </div>
          </div>

          {/* Product Title */}
          <h3 
            onClick={() => setSelectedProduct(product)}
            className="font-serif-display text-base font-normal text-ivory tracking-wide hover:text-gold transition-colors cursor-pointer line-clamp-1"
          >
            {product.name}
          </h3>

          {/* Tagline */}
          <p className="text-xs text-[#b0a89a] line-clamp-1 mt-1 font-editorial italic">
            {product.tagline}
          </p>
        </div>

        {/* Colors Swatches & Pricing */}
        <div className="pt-2 border-t border-white/5 flex items-center justify-between">
          {/* Price with Discount */}
          <div className="flex items-baseline gap-2">
            <span className="font-cinzel text-base font-bold text-gold">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-white/40 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
            {discountPercent && (
              <span className="text-[0.65rem] text-emerald-400 font-bold tracking-wider">
                {discountPercent}% OFF
              </span>
            )}
          </div>

          {/* Color Dots */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center gap-1.5">
              {product.colors.slice(0, 3).map((col, idx) => (
                <div
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedColor(col);
                  }}
                  className={`w-3 h-3 rounded-full cursor-pointer transition-transform ${
                    selectedColor?.name === col.name ? 'ring-1 ring-gold scale-125' : 'opacity-70 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: col.hex }}
                  title={col.name}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

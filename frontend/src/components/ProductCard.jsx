import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Heart, Eye, ShoppingBag, Star, Sparkles } from 'lucide-react';

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
  const [tilt, setTilt] = useState({ x: 0, y: 0, mouseX: 50, mouseY: 50 });
  const isWishlisted = isInWishlist(product.id);

  const primaryImg = product.images?.[0];
  const secondaryImg = product.images?.[1] || primaryImg;

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;
    const mousePercentX = (x / rect.width) * 100;
    const mousePercentY = (y / rect.height) * 100;

    setTilt({ x: rotateX, y: rotateY, mouseX: mousePercentX, mouseY: mousePercentY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0, mouseX: 50, mouseY: 50 });
  };

  return (
    <div 
      className="glass-card"
      data-cursor="VIEW"
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '2px',
        overflow: 'hidden',
        background: '#121217',
        border: '1px solid rgba(255, 255, 255, 0.07)',
        transform: isHovered ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(-6px)` : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)',
        boxShadow: isHovered ? '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 30px rgba(197, 160, 89, 0.12)' : 'none',
        transition: isHovered ? 'transform 0.1s ease-out, box-shadow 0.3s ease' : 'transform 0.5s ease, box-shadow 0.5s ease',
        '--mouse-x': `${tilt.mouseX}%`,
        '--mouse-y': `${tilt.mouseY}%`
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* Specular Golden Shine Overlay */}
      <div className="card-shine-effect" />
      {/* Image Showcase Container */}
      <div 
        style={{
          position: 'relative',
          width: '100%',
          paddingTop: '135%', // Elegant 3:4 high-fashion aspect ratio
          overflow: 'hidden',
          backgroundColor: '#18181d',
          cursor: 'pointer'
        }}
        onClick={() => setSelectedProduct(product)}
      >
        <img 
          src={isHovered ? secondaryImg : primaryImg} 
          alt={product.name}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 1.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease',
            transform: isHovered ? 'scale(1.06)' : 'scale(1)',
            opacity: 1
          }}
        />

        {/* Badge Ribbons */}
        <div style={{
          position: 'absolute',
          top: '14px',
          left: '14px',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
          zIndex: 5
        }}>
          {product.isNew && (
            <span style={{
              background: 'rgba(9, 9, 11, 0.85)',
              backdropFilter: 'blur(8px)',
              border: '1px solid #c5a059',
              color: '#c5a059',
              fontSize: '0.62rem',
              fontFamily: 'var(--font-cinzel)',
              letterSpacing: '0.16em',
              padding: '3px 8px',
              textTransform: 'uppercase'
            }}>
              New Edition
            </span>
          )}
          {product.isBestseller && (
            <span style={{
              background: 'rgba(104, 17, 32, 0.85)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(216, 159, 146, 0.4)',
              color: '#faf8f5',
              fontSize: '0.62rem',
              fontFamily: 'var(--font-cinzel)',
              letterSpacing: '0.16em',
              padding: '3px 8px',
              textTransform: 'uppercase'
            }}>
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
          style={{
            position: 'absolute',
            top: '14px',
            right: '14px',
            zIndex: 10,
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'rgba(9, 9, 11, 0.75)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            color: isWishlisted ? '#c5a059' : '#faf8f5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          aria-label="Save to Wishlist"
        >
          <Heart size={16} fill={isWishlisted ? '#c5a059' : 'none'} color={isWishlisted ? '#c5a059' : '#faf8f5'} />
        </button>

        {/* Quick View Hover Curtain */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '16px',
          background: 'linear-gradient(180deg, transparent 0%, rgba(9, 9, 11, 0.95) 100%)',
          display: 'flex',
          justifyContent: 'center',
          gap: '10px',
          transform: isHovered ? 'translateY(0)' : 'translateY(100%)',
          opacity: isHovered ? 1 : 0,
          transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
          zIndex: 10
        }}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedProduct(product);
            }}
            style={{
              flex: 1,
              padding: '10px 14px',
              background: 'rgba(255, 255, 255, 0.9)',
              color: '#0c0c0e',
              border: 'none',
              fontFamily: 'var(--font-cinzel)',
              fontSize: '0.72rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              fontWeight: 600
            }}
          >
            <Eye size={14} />
            <span>Quick View</span>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product, selectedColor, product.sizes[0], 1);
            }}
            style={{
              padding: '10px 14px',
              background: '#c5a059',
              color: '#0c0c0e',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            title="Add to Atelier Bag"
          >
            <ShoppingBag size={15} />
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
        <div>
          {/* Category & Rating */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{
              fontSize: '0.68rem',
              fontFamily: 'var(--font-cinzel)',
              letterSpacing: '0.16em',
              color: '#c5a059',
              textTransform: 'uppercase'
            }}>
              {product.category} • {product.subCategory}
            </span>

            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.72rem', color: '#e2c17c' }}>
              <Star size={12} fill="#e2c17c" color="#e2c17c" />
              <span>{product.rating}</span>
            </div>
          </div>

          {/* Title */}
          <h3 
            onClick={() => setSelectedProduct(product)}
            style={{
              fontFamily: 'var(--font-serif-display)',
              fontSize: '1.25rem',
              fontWeight: 400,
              color: '#faf8f5',
              cursor: 'pointer',
              lineHeight: 1.3,
              marginBottom: '6px',
              transition: 'color 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.color = '#c5a059'}
            onMouseLeave={(e) => e.target.style.color = '#faf8f5'}
          >
            {product.name}
          </h3>

          {/* Tagline / Subtitle */}
          <p style={{
            fontFamily: 'var(--font-serif-editorial)',
            fontSize: '0.9rem',
            color: '#a0a0aa',
            lineHeight: 1.4,
            marginBottom: '14px',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}>
            {product.tagline}
          </p>
        </div>

        <div>
          {/* Swatches */}
          {product.colors && product.colors.length > 0 && (
            <div style={{ display: 'flex', gap: '6px', marginBottom: '14px', alignItems: 'center' }}>
              {product.colors.map(color => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color)}
                  style={{
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    backgroundColor: color.hex,
                    border: selectedColor?.name === color.name ? '2px solid #c5a059' : '1px solid rgba(255,255,255,0.2)',
                    cursor: 'pointer',
                    outline: selectedColor?.name === color.name ? '1px solid #c5a059' : 'none',
                    outlineOffset: '2px',
                    padding: 0
                  }}
                  title={color.name}
                />
              ))}
              <span style={{ fontSize: '0.68rem', color: '#888894', marginLeft: '6px' }}>
                {selectedColor?.name || product.colors[0]?.name}
              </span>
            </div>
          )}

          {/* Pricing & Add to Cart footer */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            paddingTop: '12px'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                <span style={{
                  fontFamily: 'var(--font-cinzel)',
                  fontSize: '1.15rem',
                  fontWeight: 600,
                  color: '#faf8f5'
                }}>
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span style={{
                    fontSize: '0.8rem',
                    color: '#71717a',
                    textDecoration: 'line-through'
                  }}>
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>
              <div style={{ fontSize: '0.62rem', color: '#a1a1aa' }}>
                Inclusive of all taxes
              </div>
            </div>

            <button
              onClick={() => setSelectedProduct(product)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#c5a059',
                fontFamily: 'var(--font-cinzel)',
                fontSize: '0.72rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                padding: '4px 0'
              }}
            >
              Details →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

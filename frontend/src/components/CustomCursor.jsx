import React, { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseOver = (e) => {
      const target = e.target.closest('[data-cursor], button, a, .glass-card, input, select');
      if (target) {
        setIsHovered(true);
        const customText = target.getAttribute('data-cursor');
        setCursorText(customText || '');
      } else {
        setIsHovered(false);
        setCursorText('');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      <div 
        className="custom-cursor-dot"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          opacity: cursorText ? 0 : 1
        }}
      />
      <div 
        className={`custom-cursor-ring ${isHovered ? 'cursor-hover' : ''}`}
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '0.55rem',
          fontFamily: 'var(--font-cinzel)',
          letterSpacing: '0.12em',
          color: '#fff',
          fontWeight: 700
        }}
      >
        {cursorText && (
          <span style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
            {cursorText}
          </span>
        )}
      </div>
    </>
  );
}

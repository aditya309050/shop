import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { ShopProvider, useShop } from './context/ShopContext';
import { defaultProducts, defaultCollections, defaultStories } from './data/defaultData';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CollectionBanner from './components/CollectionBanner';
import ProductGrid from './components/ProductGrid';
import HorizontalTrends from './components/HorizontalTrends';
import EditorialSection from './components/EditorialSection';
import CollectionsPage from './components/CollectionsPage';
import ProductDetailModal from './components/ProductDetailModal';
import CartDrawer from './components/CartDrawer';
import WishlistDrawer from './components/WishlistDrawer';
import SearchModal from './components/SearchModal';
import BespokeModal from './components/BespokeModal';
import Footer from './components/Footer';
import LuxuryAudio from './components/LuxuryAudio';

gsap.registerPlugin(ScrollTrigger);

function MainContent() {
  const { toastMessage, setSelectedProduct, isBespokeOpen, setIsBespokeOpen, bespokeProduct } = useShop();
  const [currentPage, setCurrentPage] = useState('home'); // 'home' | 'collections'
  const [products, setProducts] = useState(defaultProducts);
  const [collections, setCollections] = useState(defaultCollections);
  const [stories, setStories] = useState(defaultStories);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('All');

  // Initialize Lenis Smooth Scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
  }, []);

  // Fetch from Node.js Express Backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, colRes, storRes] = await Promise.all([
          fetch('http://localhost:5000/api/products').catch(() => null),
          fetch('http://localhost:5000/api/collections').catch(() => null),
          fetch('http://localhost:5000/api/stories').catch(() => null)
        ]);

        if (prodRes && prodRes.ok) {
          const prodData = await prodRes.json();
          if (prodData.products && prodData.products.length) {
            setProducts(prodData.products);
          }
        }

        if (colRes && colRes.ok) {
          const colData = await colRes.json();
          if (colData.collections && colData.collections.length) {
            setCollections(colData.collections);
          }
        }

        if (storRes && storRes.ok) {
          const storData = await storRes.json();
          if (storData.stories && storData.stories.length) {
            setStories(storData.stories);
          }
        }
      } catch (err) {
        console.log('Using integrated default luxury archives:', err);
      }
    };

    fetchData();
  }, []);

  const handleNavigatePage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (sectionId, category) => {
    if (currentPage !== 'home') {
      setCurrentPage('home');
      setTimeout(() => {
        if (category) setActiveCategoryFilter(category);
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
      return;
    }

    if (category) {
      setActiveCategoryFilter(category);
    }
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectCollection = (col) => {
    // Open dedicated collections page or view matched product
    setCurrentPage('collections');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: '#09090b' }}>
      {/* Luxury Background Ambient Audio */}
      <LuxuryAudio isPlaying={audioPlaying} />

      {/* Navigation */}
      <Navbar 
        onNavigateSection={handleNavigate}
        onNavigatePage={handleNavigatePage}
        currentPage={currentPage}
        audioPlaying={audioPlaying}
        toggleAudio={() => setAudioPlaying(!audioPlaying)}
      />

      {currentPage === 'collections' ? (
        /* Dedicated Collections Archive Page */
        <CollectionsPage 
          collections={collections}
          products={products}
          onBackHome={() => handleNavigatePage('home')}
        />
      ) : (
        /* Salon Home Experience */
        <>
          {/* Hero Runway Section */}
          <Hero 
            onExploreClick={() => handleNavigatePage('collections')}
            onViewLookbook={() => handleNavigate('trends')}
          />

          {/* Collection Campaigns Banner */}
          <CollectionBanner 
            collections={collections}
            onSelectCollection={handleSelectCollection}
          />

          {/* Signature Silhouettes Product Grid */}
          <ProductGrid 
            products={products}
            initialCategory={activeCategoryFilter}
          />

          {/* Horizontal Trends Lookbook Strip */}
          <HorizontalTrends 
            products={products}
          />

          {/* Editorial & Karigar Chronicle */}
          <EditorialSection 
            stories={stories}
          />
        </>
      )}

      {/* Footer */}
      <Footer />

      {/* Interactive Floating Modals & Drawers */}
      <ProductDetailModal />
      <CartDrawer />
      <WishlistDrawer />
      <SearchModal products={products} />
      <BespokeModal 
        isOpen={isBespokeOpen} 
        onClose={() => setIsBespokeOpen(false)} 
        preselectedProduct={bespokeProduct}
      />

      {/* Toast Notification Alert */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          zIndex: 300,
          background: 'rgba(24, 24, 29, 0.95)',
          border: '1px solid #c5a059',
          boxShadow: '0 10px 40px rgba(0,0,0,0.8)',
          borderRadius: '2px',
          padding: '14px 24px',
          color: '#faf8f5',
          fontFamily: 'var(--font-cinzel)',
          fontSize: '0.8rem',
          letterSpacing: '0.12em',
          backdropFilter: 'blur(12px)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          animation: 'fadeIn 0.3s ease'
        }}>
          <span style={{ color: '#c5a059' }}>✦</span>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <ShopProvider>
      <MainContent />
    </ShopProvider>
  );
}

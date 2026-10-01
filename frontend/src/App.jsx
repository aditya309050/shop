import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { ShopProvider, useShop } from './context/ShopContext';
import { defaultProducts, defaultCollections, defaultStories } from './data/defaultData';

import Navbar from './components/Navbar';
import CategoryStories from './components/CategoryStories';
import Hero from './components/Hero';
import OccasionsGrid from './components/OccasionsGrid';
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
import RoyalGateEntrance from './components/RoyalGateEntrance';

gsap.registerPlugin(ScrollTrigger);

function MainContent() {
  const { toastMessage, setSelectedProduct, isBespokeOpen, setIsBespokeOpen, bespokeProduct } = useShop();
  
  // Read initial path for /collections direct URL support
  const initialPage = typeof window !== 'undefined' && window.location.pathname.startsWith('/collections') 
    ? 'collections' 
    : 'home';
    
  const [currentPage, setCurrentPage] = useState(initialPage); // 'home' | 'collections'
  const [products, setProducts] = useState(defaultProducts);
  const [collections, setCollections] = useState(defaultCollections);
  const [stories, setStories] = useState(defaultStories);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('All');
  const [showGateEntrance, setShowGateEntrance] = useState(true);

  // Sync browser back/forward buttons (Popstate)
  useEffect(() => {
    const handlePopState = () => {
      if (window.location.pathname.startsWith('/collections')) {
        setCurrentPage('collections');
      } else {
        setCurrentPage('home');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

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

  // Fetch from Node.js Express Backend with intelligent live cloud fallback
  useEffect(() => {
    const primaryApi = import.meta.env.VITE_API_BASE_URL || (
      window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
        ? 'http://localhost:5000'
        : 'https://shop-ipvf.onrender.com'
    );
    const backupApi = 'https://shop-ipvf.onrender.com';

    const fetchData = async () => {
      try {
        let prodRes = await fetch(`${primaryApi}/api/products`).catch(() => null);
        let colRes = await fetch(`${primaryApi}/api/collections`).catch(() => null);
        let storRes = await fetch(`${primaryApi}/api/stories`).catch(() => null);

        // Fallback to live Render backend if local API is not running
        if (!prodRes || !prodRes.ok) {
          prodRes = await fetch(`${backupApi}/api/products`).catch(() => null);
          colRes = await fetch(`${backupApi}/api/collections`).catch(() => null);
          storRes = await fetch(`${backupApi}/api/stories`).catch(() => null);
        }

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
    const targetUrl = page === 'collections' ? '/collections' : '/';
    if (window.location.pathname !== targetUrl) {
      window.history.pushState({ page }, '', targetUrl);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (sectionId, category) => {
    if (currentPage !== 'home') {
      handleNavigatePage('home');
      setTimeout(() => {
        if (category) setActiveCategoryFilter(category);
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 80);
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
    handleNavigatePage('collections');
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
        /* Manyavar & Mohey Celebration Home Experience */
        <>
          {/* Circular Category Story Highlights (Manyavar Style) */}
          <CategoryStories 
            activeCategory={activeCategoryFilter}
            onSelectCategory={(cat) => handleNavigate('products', cat)}
          />

          {/* Hero Festive Wedding Campaign */}
          <Hero 
            onExploreClick={() => handleNavigatePage('collections')}
            onViewCategory={(gender) => handleNavigate('products', gender)}
          />

          {/* Shop By Celebration Occasions (Manyavar Feature) */}
          <OccasionsGrid 
            onSelectOccasion={(occ) => handleNavigate('products', occ)}
          />

          {/* Signature Catalog & Filter Grid */}
          <ProductGrid 
            products={products}
            initialCategory={activeCategoryFilter}
          />

          {/* Collection Campaigns Banner */}
          <CollectionBanner 
            collections={collections}
            onSelectCollection={handleSelectCollection}
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

      {/* 3D Glass Royal Palace Gate Opening Animation */}
      {showGateEntrance && (
        <RoyalGateEntrance onFinish={() => setShowGateEntrance(false)} />
      )}

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

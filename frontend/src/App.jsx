import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';

import { ShopProvider, useShop } from './context/ShopContext';
import { defaultProducts, defaultCollections, defaultStories } from './data/defaultData';

import ManyavarTopBar from './components/ManyavarTopBar';
import ManyavarNavbar from './components/ManyavarNavbar';
import ManyavarHero from './components/ManyavarHero';
import WhatsYourVibe from './components/WhatsYourVibe';
import ShopTheOccasion from './components/ShopTheOccasion';
import MostLovedCarousel from './components/MostLovedCarousel';
import CollectionsPage from './components/CollectionsPage';
import ProductDetailModal from './components/ProductDetailModal';
import CartDrawer from './components/CartDrawer';
import WishlistDrawer from './components/WishlistDrawer';
import SearchModal from './components/SearchModal';
import BespokeModal from './components/BespokeModal';
import ManyavarFooter from './components/ManyavarFooter';

function MainContent() {
  const { 
    toastMessage, 
    setSelectedProduct, 
    isBespokeOpen, 
    setIsBespokeOpen, 
    bespokeProduct,
    setIsCartOpen,
    setIsWishlistOpen,
    setIsSearchOpen
  } = useShop();
  
  // Read initial path for /collections direct URL support
  const initialPage = typeof window !== 'undefined' && window.location.pathname.startsWith('/collections') 
    ? 'collections' 
    : 'home';
    
  const [currentPage, setCurrentPage] = useState(initialPage); // 'home' | 'collections'
  const [activeGenderTab, setActiveGenderTab] = useState('MEN'); // 'MEN' | 'WOMEN' | 'KIDS' | 'BLOGS'
  const [products, setProducts] = useState(defaultProducts);
  const [collections, setCollections] = useState(defaultCollections);

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
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  // Fetch from Express Backend with automatic live Render fallback
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

        if (!prodRes || !prodRes.ok) {
          prodRes = await fetch(`${backupApi}/api/products`).catch(() => null);
          colRes = await fetch(`${backupApi}/api/collections`).catch(() => null);
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
      } catch (err) {
        console.log('Using integrated Manyavar default data.');
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

  const handleSelectTab = (tab) => {
    if (currentPage !== 'home') {
      handleNavigatePage('home');
    }
    setActiveGenderTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFilterClick = (filterTerm) => {
    const element = document.getElementById('most-loved-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#fbf8f2] text-[#221e1a] flex flex-col justify-between selection:bg-[#e25822] selection:text-white">
      {/* Top Brown Utility Bar */}
      <ManyavarTopBar 
        onOpenAppointments={() => setIsBespokeOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
      />

      {/* Main Header with Logo & Tabs */}
      <ManyavarNavbar 
        activeTab={activeGenderTab}
        onSelectTab={handleSelectTab}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
      />

      {currentPage === 'collections' ? (
        /* Dedicated Collections Archive Page */
        <CollectionsPage 
          collections={collections}
          products={products}
          onBackHome={() => handleNavigatePage('home')}
        />
      ) : (
        /* Manyavar & Mohey Main Home Experience */
        <main className="flex-1">
          {/* 1. Hero Section ("This Wedding Season") */}
          <ManyavarHero 
            activeTab={activeGenderTab}
            onSelectFilter={handleFilterClick}
          />

          {/* 2. What's Your Vibe (4 Arched Cards) */}
          <WhatsYourVibe 
            activeTab={activeGenderTab}
            onSelectVibe={handleFilterClick}
          />

          {/* 3. Shop The Occasion (4 Photo Tiles) */}
          <ShopTheOccasion 
            onSelectOccasion={handleFilterClick}
          />

          {/* 4. Most Loved Section (With Men, Women, Kids Tabs) */}
          <div id="most-loved-section">
            <MostLovedCarousel 
              title="MOST LOVED"
              products={products}
            />
          </div>

          {/* 5. Recommended For You Section */}
          <div className="bg-[#f5efe4] py-2 border-y border-[#e8dfd1]">
            <MostLovedCarousel 
              title="RECOMMENDED FOR YOU"
              products={[...products].reverse()}
            />
          </div>
        </main>
      )}

      {/* Footer */}
      <ManyavarFooter />

      {/* Interactive Modals & Drawers */}
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
        <div className="fixed bottom-6 right-6 z-50 bg-[#260e0a] text-[#fbf8f2] border border-[#e25822] shadow-2xl px-6 py-3.5 rounded-sm flex items-center gap-3 font-cinzel text-xs tracking-wider animate-bounce">
          <span className="text-[#e25822] text-sm">✦</span>
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

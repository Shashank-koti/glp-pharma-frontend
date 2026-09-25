import React, { useState, useEffect } from 'react';
import { FiEye, FiX, FiShoppingCart, FiHeart } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import ProductShareButton from '../common/ProductShareButton';

export default function RecentlyViewedWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [recentProducts, setRecentProducts] = useState([]);
  const { addToCart, cartItems } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const loadRecentlyViewed = () => {
    try {
      const stored = localStorage.getItem('recentlyViewed');
      if (stored) {
        setRecentProducts(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to load recently viewed products', e);
    }
  };

  useEffect(() => {
    loadRecentlyViewed();

    window.addEventListener('storage', loadRecentlyViewed);
    window.addEventListener('recentlyViewedUpdated', loadRecentlyViewed);

    return () => {
      window.removeEventListener('storage', loadRecentlyViewed);
      window.removeEventListener('recentlyViewedUpdated', loadRecentlyViewed);
    };
  }, []);

  // Optionally hide if no recently viewed products? 
  // Let's keep it visible so user knows the feature exists, or hide it if empty.
  if (recentProducts.length === 0) return null;

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-36 right-6 sm:bottom-40 sm:right-4 z-50 bg-white text-[#1AA3B6] border border-[#1AA3B6]/20 p-2 sm:p-3 rounded-full shadow-[0_4px_14px_0_rgba(26,163,182,0.15)] hover:shadow-[0_6px_20px_rgba(26,163,182,0.3)] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center group"
        aria-label="Recently Viewed Products"
      >
        <FiEye className="text-[20px] sm:text-[24px]" />

        {/* Tooltip */}
        <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white text-[#1AA3B6] text-sm font-bold py-2 px-4 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap hidden md:block">
          Recently Viewed
          <div className="absolute top-1/2 -translate-y-1/2 -right-1.5 border-y-8 border-y-transparent border-l-8 border-l-white"></div>
        </span>
      </button>

      {/* Sidebar Drawer */}
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] transition-opacity duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onClick={() => setIsOpen(false)}
      />

      {/* Drawer */}
      <div 
        className={`fixed top-0 right-0 h-full w-[90vw] sm:w-[400px] bg-white z-[70] shadow-[-10px_0_40px_rgba(0,0,0,0.1)] transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Header */}
        <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-white to-[#F8FDFE]">
          <div className="flex items-center gap-2">
            <div className="bg-[#E8F4F6] p-2 rounded-lg text-[#1AA3B6]">
              <FiEye className="text-xl" />
            </div>
            <h3 className="font-extrabold text-heading text-lg">Recently Viewed</h3>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-red-500"
          >
            <FiX className="text-xl" />
          </button>
        </div>

        {/* Products List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
          {recentProducts.map(product => (
            <div key={product._id} className="bg-white border border-gray-100 rounded-2xl p-3 flex gap-4 hover:shadow-md transition-shadow">
              <div className="w-20 h-20 bg-gray-50 rounded-xl flex items-center justify-center p-2 shrink-0 border border-gray-50">
                <img 
                  src={product.image || "/images/demoprod.gif"} 
                  alt={product.name} 
                  className="w-full h-full object-contain mix-blend-multiply"
                />
              </div>
              <div className="flex flex-col justify-between flex-1 min-w-0">
                <div>
                  <Link 
                    to={`/products/${product.slug}`} 
                    onClick={() => setIsOpen(false)}
                    className="font-bold text-sm text-heading hover:text-[#1AA3B6] line-clamp-2 leading-tight mb-1"
                  >
                    {product.name?.split(';')[0]}
                  </Link>
                  <p className="text-[11px] text-gray-500 truncate">
                    CAT No: <span className="font-semibold text-gray-700">{product.specifications?.catalogueNumber || product.catalogueNumber || 'N/A'}</span>
                  </p>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <button
                    onClick={() => addToCart(product)}
                    className={`flex-1 py-1.5 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1.5 transition-colors ${
                      cartItems.some(item => item.id === product._id) 
                        ? 'bg-green-50 text-green-600 border border-green-200' 
                        : 'bg-[#E8F4F6] text-[#1AA3B6] border border-[#1AA3B6]/20 hover:bg-[#1AA3B6] hover:text-white'
                    }`}
                  >
                    <FiShoppingCart />
                    {cartItems.some(item => item.id === product._id) ? 'Added' : 'Add to RFQ'}
                  </button>
                  <button
                    onClick={() => toggleWishlist(product)}
                    className={`p-1.5 rounded-lg text-sm border transition-all ${
                      isInWishlist(product._id)
                        ? 'bg-rose-50 text-rose-500 border-rose-200 shadow-sm'
                        : 'bg-gray-50 text-gray-400 border-gray-100 hover:bg-rose-50 hover:text-rose-500 hover:border-rose-200'
                    }`}
                    title={isInWishlist(product._id) ? "Remove from Wishlist" : "Add to Wishlist"}
                  >
                    <FiHeart className={isInWishlist(product._id) ? "fill-rose-500" : ""} />
                  </button>
                  <ProductShareButton product={product} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

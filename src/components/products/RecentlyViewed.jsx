import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiEye, FiShoppingCart, FiCheckCircle, FiHeart } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import ProductShareButton from '../common/ProductShareButton';

export default function RecentlyViewed({ currentProductId }) {
  const [recentProducts, setRecentProducts] = useState([]);
  const { addToCart, cartItems } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const loadRecentlyViewed = () => {
    try {
      const stored = localStorage.getItem('recentlyViewed');
      if (stored) {
        let parsed = JSON.parse(stored);
        // Filter out the current product if we are on a product details page
        if (currentProductId) {
          parsed = parsed.filter(p => p._id !== currentProductId);
        }
        setRecentProducts(parsed);
      }
    } catch (e) {
      console.error('Failed to load recently viewed products', e);
    }
  };

  useEffect(() => {
    loadRecentlyViewed();

    // Listen for changes from other tabs or from the current tab
    window.addEventListener('storage', loadRecentlyViewed);
    window.addEventListener('recentlyViewedUpdated', loadRecentlyViewed);

    return () => {
      window.removeEventListener('storage', loadRecentlyViewed);
      window.removeEventListener('recentlyViewedUpdated', loadRecentlyViewed);
    };
  }, [currentProductId]);

  if (recentProducts.length === 0) return null;

  return (
    <div className="container mx-auto px-4 w-full xl:w-[95%] 2xl:w-[92%] max-w-[1500px] mt-16 mb-12">
      <div className="flex flex-col mb-8">
        <h2 className="font-extrabold text-heading flex items-center gap-2 text-2xl">
          <FiEye className="text-[#1AA3B6]" /> Recently Viewed
        </h2>
        <p className="text-body mt-1 font-medium text-sm">Pick up right where you left off.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {recentProducts.slice(0, 5).map(product => (
          <Link
            to={`/products/${product.slug}`}
            key={product._id}
            className="group bg-white rounded-2xl border border-[#D9E8EC] shadow-[0_10px_30px_rgba(26,163,182,0.03)] hover:shadow-[0_15px_40px_rgba(26,163,182,0.08)] hover:border-[#1AA3B6]/20 transition-all duration-300 p-4 flex flex-col"
          >
            <div className="flex justify-between items-start mb-3">
              <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border-0 tracking-wider uppercase shadow-sm flex items-center gap-1.5 ${(product.availability || 'In Stock').toLowerCase() === 'in stock' ? 'bg-[#1AA3B6] text-white' : 'bg-orange-50 text-orange-600 border border-orange-100'}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${(product.availability || 'In Stock').toLowerCase() === 'in stock' ? 'bg-white animate-pulse' : 'bg-orange-500'}`}></span>
                {product.availability || 'In Stock'}
              </span>
              <div className="flex items-center gap-2">
                <div className="relative group/wishlist">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleWishlist(product);
                    }}
                    className={`p-1.5 rounded-md transition-all duration-300 active:scale-90 hover:scale-110 hover:shadow-md ${
                      isInWishlist(product._id)
                        ? 'bg-rose-50 text-rose-500 border border-rose-200 shadow-sm'
                        : 'bg-[#E8F4F6] text-[#0B7285] hover:bg-rose-50 hover:text-rose-500'
                    }`}
                    title={isInWishlist(product._id) ? "Remove from Wishlist" : "Add to Wishlist"}
                  >
                    <FiHeart size={16} className={isInWishlist(product._id) ? "fill-rose-500" : ""} />
                  </button>
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#12344D] text-white text-[10px] font-bold py-1 px-2 rounded opacity-0 group-hover/wishlist:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-50 shadow-sm">
                    {isInWishlist(product._id) ? 'In Wishlist' : 'Add to Wishlist'}
                    <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#12344D] rotate-45"></div>
                  </span>
                </div>
                <ProductShareButton product={product} />
                <div className="relative group/whatsapp">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      const url = `${window.location.origin}/products/${product.slug}`;
                      const text = `GLP Pharma Product Details:\n\nProduct: ${product.name?.split(';')[0] || 'N/A'}\nCAT No.: ${product.specifications?.catalogueNumber || product.catalogueNumber || 'N/A'}\nCAS No.: ${product.specifications?.casNumber || product.casNumber || 'N/A'}\nMolecular Formula: ${product.specifications?.molecularFormula || product.molecularFormula || 'N/A'}\nMolecular Weight: ${product.specifications?.molecularWeight || product.molecularWeight || 'N/A'}\nCategory: ${(product.category?.categoryName || product.category || 'N/A').replace('API IMPURITIES & REFERENCE STANDARDS', 'API Impurities & Reference Standards')}\nAPI Family: ${product.mainProduct?.heading || product.mainProduct?.name || 'N/A'}\nAvailability: ${product.availability || 'In Stock'}\n\nView Product: ${url}`;
                      window.open(`https://wa.me/919866074638?text=${encodeURIComponent(text)}`, '_blank');
                    }}
                    className="p-1.5 rounded-md transition-all duration-300 active:scale-90 hover:scale-110 hover:shadow-md bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white"
                  >
                    <FaWhatsapp size={16} />
                  </button>
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#12344D] text-white text-[10px] font-bold py-1 px-2 rounded opacity-0 group-hover/whatsapp:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-50 shadow-sm">
                    WhatsApp Enquiry
                    <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#12344D] rotate-45"></div>
                  </span>
                </div>
              </div>
            </div>

            {/* Image Area */}
            <div className="relative w-full aspect-square max-h-[220px] mx-auto flex items-center justify-center p-2">
              <img
                src={product.image || "/images/demoprod.gif"}
                alt={product.name}
                className="w-full h-full object-contain mix-blend-multiply drop-shadow-sm group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="text-center mb-1">
              <h3 className="font-extrabold text-heading text-[14px] leading-snug line-clamp-2 transition-colors group-hover:text-[#1AA3B6]">
                {product.name?.split(';')[0]}
              </h3>
            </div>

            <div className="border border-[#EAF2F4] rounded-[12px] overflow-hidden mb-2">
              {/* row 0 */}
              <div className="flex items-center p-1.5 border-b border-[#EAF2F4] text-[11px] bg-white group/row hover:bg-[#F8FAFC] transition-colors relative">
                <div className="flex items-center gap-2 text-slate-700 font-bold tracking-wide w-1/2">
                  <span className="truncate">CAT No.</span>
                </div>
                <div className="block w-[1.5px] h-5 bg-slate-300 group-hover/row:bg-[#1AA3B6]/50 transition-colors mx-2"></div>
                <span className="font-semibold text-heading text-left w-1/2 truncate pl-1">{product.specifications?.catalogueNumber || product.catalogueNumber || 'N/A'}</span>
              </div>
              {/* row 1 */}
              <div className="flex items-center p-1.5 border-b border-[#EAF2F4] text-[11px] bg-white group/row hover:bg-[#F8FAFC] transition-colors relative">
                <div className="flex items-center gap-2 text-slate-700 font-bold tracking-wide w-1/2">
                  <span className="truncate">CAS</span>
                </div>
                <div className="block w-[1.5px] h-5 bg-slate-300 group-hover/row:bg-[#1AA3B6]/50 transition-colors mx-2"></div>
                <span className="font-semibold text-heading text-left w-1/2 truncate pl-1">{product.casNumber || product.specifications?.casNumber || 'N/A'}</span>
              </div>
              {/* row 2 */}
              <div className="flex items-center p-1.5 border-b border-[#EAF2F4] text-[11px] bg-white group/row hover:bg-[#F8FAFC] transition-colors relative">
                <div className="flex items-center gap-2 text-slate-700 font-bold tracking-wide w-1/2">
                  <span className="truncate">Mol. Formula</span>
                </div>
                <div className="block w-[1.5px] h-5 bg-slate-300 group-hover/row:bg-[#1AA3B6]/50 transition-colors mx-2"></div>
                <span className="font-semibold text-heading text-left uppercase w-1/2 truncate pl-1">{product.molecularFormula || 'N/A'}</span>
              </div>
              {/* row 3 */}
              <div className="flex items-center p-1.5 text-[11px] bg-white group/row hover:bg-[#F8FAFC] transition-colors relative">
                <div className="flex items-center gap-2 text-slate-700 font-bold tracking-wide w-1/2">
                  <span className="truncate">Mol. Weight</span>
                </div>
                <div className="block w-[1.5px] h-5 bg-slate-300 group-hover/row:bg-[#1AA3B6]/50 transition-colors mx-2"></div>
                <span className="font-semibold text-heading text-left w-1/2 truncate pl-1">{product.molecularWeight || 'N/A'}</span>
              </div>
            </div>

            <div className="mt-auto">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  addToCart(product);
                }}
                className="w-full flex items-center justify-center gap-1.5 bg-[#E8F4F6] text-[#1AA3B6] border border-[#D9E8EC] font-bold py-2 rounded-xl hover:bg-[#1AA3B6] hover:text-white transition-colors text-[12.5px]"
              >
                {cartItems.some(item => item.id === product._id) ? (
                  <>
                    <FiCheckCircle className="text-[14px]" /> Added to RFQ
                  </>
                ) : (
                  <>
                    <FiShoppingCart className="text-[14px]" /> Add to RFQ
                  </>
                )}
              </button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

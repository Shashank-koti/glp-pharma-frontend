import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FiHeart,
  FiTrash2,
  FiShoppingCart,
  FiArrowLeft,
  FiTag,
  FiCheck,
  FiInfo
} from 'react-icons/fi';
import { FaFlask, FaBalanceScale, FaWhatsapp } from 'react-icons/fa';
import { LuPanelRightDashed } from 'react-icons/lu';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useCompare } from '../context/CompareContext';
import ProductShareButton from '../components/common/ProductShareButton';

const Whislist = () => {
  const { wishlist, removeFromWishlist, clearWishlist, toggleWishlist, isInWishlist, wishlistCount } = useWishlist();
  const { addToCart, cartItems } = useCart();
  const { addToCompare, removeFromCompare, compareItems } = useCompare();

  const displayItems = wishlist;
  const isEmpty = displayItems.length === 0;

  if (isEmpty) {
    return (
      <div className="min-h-[75vh] bg-[#F8FBFC] flex flex-col items-center justify-center px-4 py-16">
        <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-sm border border-[#EAF2F4] text-center max-w-lg w-full">
          <div className="w-20 h-20 bg-[#F0F7F9] rounded-full flex items-center justify-center mx-auto mb-6 text-[#1AA3B6]">
            <FiHeart size={38} className="stroke-[1.5]" />
          </div>
          <h2 className="font-extrabold text-[#084553] text-2xl sm:text-3xl mb-3 tracking-tight">
            Your Wishlist is Empty
          </h2>
          <p className="text-[#5B7280] text-sm sm:text-base leading-relaxed mb-8">
            You haven't saved any pharmaceutical standards or impurities yet. Browse our catalog to bookmark products for quick enquiry.
          </p>
          <Link
            to="/product-categories-view/api-impurities-and-reference-standards"
            className="inline-flex items-center justify-center gap-2 w-full py-3.5 bg-[#1AA3B6] hover:bg-[#0B7285] text-white font-bold rounded-xl transition-all shadow-sm hover:shadow"
          >
            <FiArrowLeft size={18} />
            Explore Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FBFC] font-sans pb-24 pt-8 px-4 sm:px-6 lg:px-8 flex flex-col">
      <div className="max-w-[1600px] w-full mx-auto flex-1 flex flex-col">

        {/* Top Breadcrumbs / Back Navigation */}
        <div className="mb-6">
          <Link
            to="/product-categories-view/api-impurities-and-reference-standards"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#5B7280] hover:text-[#1AA3B6] transition-colors"
          >
            <FiArrowLeft size={16} />
            Back to Products
          </Link>
        </div>

        {/* Page Header Bar */}
        <div className="bg-white rounded-2xl border border-[#D9E8EC] p-6 sm:p-8 mb-8 shadow-[0_4px_20px_rgba(26,163,182,0.04)] flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-[#DDF8FB] rounded-2xl flex items-center justify-center text-[#1AA3B6] shadow-sm shrink-0">
              <FiHeart size={28} className="fill-[#1AA3B6]/20" />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#084553] tracking-tight">
                  My Wishlist
                </h1>
                <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-[#E8F4F6] text-[#0B7285] border border-[#DDF8FB]">
                  {displayItems.length} {displayItems.length === 1 ? 'item' : 'items'}
                </span>
              </div>
              <p className="text-[#5B7280] text-sm mt-1">
                Keep track of reference standards, peptides, and impurities of your interest.
              </p>
            </div>
          </div>

          {/* Clear All Button */}
          <button
            onClick={clearWishlist}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 rounded-xl border border-red-100 transition-all cursor-pointer"
          >
            <FiTrash2 size={16} />
            Clear Wishlist
          </button>
        </div>

        {/* Wishlist Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map((product, idx) => (
            <motion.div
              key={product._id || product.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="w-full flex flex-col bg-white rounded-[20px] border border-[#EAF2F4] shadow-sm p-4 hover:shadow-[0_4px_20px_rgb(0,0,0,0.06)] hover:-translate-y-0.5 transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-2">
                <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border-0 tracking-wide shadow-sm flex items-center gap-1.5 ${(product.availability || 'In Stock').toLowerCase() === 'in stock' ? 'bg-[#1AA3B6] text-white' : 'bg-orange-50 text-orange-600 border border-orange-100'}`}>
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
                        isInWishlist(product._id || product.id)
                          ? 'bg-rose-50 text-rose-500 border border-rose-200 shadow-sm'
                          : 'bg-[#E8F4F6] text-[#0B7285] hover:bg-rose-50 hover:text-rose-500'
                      }`}
                      title={isInWishlist(product._id || product.id) ? "Remove from Wishlist" : "Add to Wishlist"}
                    >
                      <FiHeart size={16} className={isInWishlist(product._id || product.id) ? "fill-rose-500" : ""} />
                    </button>
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#12344D] text-white text-[10px] font-bold py-1 px-2 rounded opacity-0 group-hover/wishlist:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-50 shadow-sm">
                      {isInWishlist(product._id || product.id) ? 'In Wishlist' : 'Add to Wishlist'}
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
                  <div className="relative group/compare">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        const pId = product._id || product.id;
                        if (compareItems.some(item => (item._id || item.id) === pId)) {
                          removeFromCompare(pId);
                        } else {
                          addToCompare(product);
                        }
                      }}
                      className={`p-1.5 rounded-md transition-all duration-300 active:scale-90 hover:scale-110 hover:shadow-md ${compareItems.some(item => (item._id || item.id) === (product._id || product.id)) ? 'bg-[#1AA3B6] text-white' : 'bg-[#E8F4F6] text-[#0B7285] hover:bg-[#1AA3B6] hover:text-white'}`}
                    >
                      <LuPanelRightDashed size={16} />
                    </button>
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#12344D] text-white text-[10px] font-bold py-1 px-2 rounded opacity-0 group-hover/compare:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-50 shadow-sm">
                      Add To Compare
                      <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#12344D] rotate-45"></div>
                    </span>
                  </div>
                </div>
              </div>

              <div className="relative w-full aspect-square max-h-[250px] mx-auto flex items-center justify-center group/img">
                <img
                  src={product.image || "/images/demoprod.gif"}
                  alt={product.name}
                  className="w-full h-full object-contain mix-blend-multiply drop-shadow-sm group-hover/img:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Title */}
              <div className="text-center mb-1">
                <h3 className="font-bold text-[#1AA3B6] text-[15px] leading-snug min-h-[40px] flex items-center justify-center line-clamp-2 hover:text-heading">
                  {product.name?.split(';')[0]}
                </h3>
              </div>

              {/* Details Table */}
              <div className="border border-[#EAF2F4] rounded-[12px] overflow-hidden mb-2">
                {/* row 0 */}
                <div className="flex items-center p-1.5 border-b border-[#EAF2F4] text-[12px] bg-white group/row hover:bg-[#F8FAFC] transition-colors relative">
                  <div className="flex items-center gap-2 text-slate-700 font-bold tracking-wide w-1/2">
                    <FiTag className="text-[#0B7285] text-[13px]" />
                    <span>CAT No.</span>
                  </div>
                  <div className="block w-[1.5px] h-5 bg-slate-300 group-hover/row:bg-[#1AA3B6]/50 transition-colors mx-2"></div>
                  <span className="font-semibold text-heading text-leftt w-1/2 truncate pl-1">{product.specifications?.catalogueNumber || product.catalogueNumber || 'N/A'}</span>
                </div>
                {/* row 1 */}
                <div className="flex items-center p-1.5 border-b border-[#EAF2F4] text-[12px] bg-white group/row hover:bg-[#F8FAFC] transition-colors relative">
                  <div className="flex items-center gap-2 text-slate-700 font-bold tracking-wide w-1/2">
                    <FaFlask className="text-[#0B7285] text-[13px]" />
                    <span>CAS Number</span>
                  </div>
                  <div className="block w-[1.5px] h-5 bg-slate-300 group-hover/row:bg-[#1AA3B6]/50 transition-colors mx-2"></div>
                  <span className="font-semibold text-heading text-left w-1/2 truncate pl-1">{product.specifications?.casNumber || product.casNumber || 'N/A'}</span>
                </div>
                {/* row 2 */}
                <div className="flex items-center p-1.5 border-b border-[#EAF2F4] text-[12px] bg-white group/row hover:bg-[#F8FAFC] transition-colors relative">
                  <div className="flex items-center gap-2 text-slate-700 font-bold  tracking-wide w-1/2">
                    <FiTag className="text-[#0B7285] text-[13px]" />
                    <span>Mol. Formula</span>
                  </div>
                  <div className="block w-[1.5px] h-5 bg-slate-300 group-hover/row:bg-[#1AA3B6]/50 transition-colors mx-2"></div>
                  <span className="font-semibold text-heading text-left uppercase w-1/2 truncate pl-1">{product.specifications?.molecularFormula || product.molecularFormula || 'N/A'}</span>
                </div>
                {/* row 3 */}
                <div className="flex items-center p-1.5 text-[12px] bg-white group/row hover:bg-[#F8FAFC] transition-colors relative">
                  <div className="flex items-center gap-2 text-slate-700 font-bold tracking-wide w-1/2">
                    <FaBalanceScale className="text-[#0B7285] text-[13px]" />
                    <span>Mol. Weight</span>
                  </div>
                  <div className="block w-[1.5px] h-5 bg-slate-300 group-hover/row:bg-[#1AA3B6]/50 transition-colors mx-2"></div>
                  <span className="font-semibold text-heading text-left w-1/2 truncate pl-1">{product.specifications?.molecularWeight || product.molecularWeight || 'N/A'}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2.5 mt-auto">
                <Link
                  to={`/products/${product.slug}`}
                  className="flex-1 flex items-center justify-center gap-1.5 border border-[#0B7285] text-[#0B7285] font-bold py-2 rounded-[10px] hover:bg-[#F8FBFC] transition-colors text-[14px]"
                >
                  <FiInfo className="text-sm" />
                  More Info
                </Link>
                <button
                  onClick={() => addToCart(product)}
                  className="flex-1 flex items-center justify-center gap-1.5 bg-[#0B7285] text-white font-bold py-2 rounded-[10px] hover:bg-[#0B7285] transition-colors text-[14px]"
                >
                  {cartItems.some(item => (item.id === product._id || item._id === product._id || item.id === product.id)) ? (
                    <>
                      <FiCheck className="text-sm" />
                      Added to RFQ
                    </>
                  ) : (
                    <>
                      <FiShoppingCart className="text-sm" />
                      Add to RFQ
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Banner / Inquiry Hint */}
        <div className="mt-12 bg-white rounded-2xl border border-[#D9E8EC] p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div>
            <h4 className="font-bold text-[#084553] text-base">
              Need custom synthesis or bulk quantities?
            </h4>
            <p className="text-xs sm:text-sm text-[#5B7280] mt-0.5">
              Contact our technical team for custom synthesis and bulk quotation for all items in your wishlist.
            </p>
          </div>
          <Link
            to="/quick-enquiry"
            className="whitespace-nowrap px-5 py-2.5 bg-[#084553] hover:bg-[#06323c] text-white font-bold text-xs sm:text-sm rounded-xl transition-colors shrink-0"
          >
            Submit Inquiry
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Whislist;
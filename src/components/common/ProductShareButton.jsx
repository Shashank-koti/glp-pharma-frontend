import React, { useState, useRef } from 'react';
import { FiShare2, FiCopy, FiCheck } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

export default function ProductShareButton({ product, className = "", align = "right" }) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef(null);

  if (!product) return null;

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 250);
  };

  const getProductDetailsText = () => {
    const name = product.name?.split(';')[0] || product.name || 'N/A';
    const catNo = product.specifications?.catalogueNumber || product.catalogueNumber || 'N/A';
    const casNo = product.specifications?.casNumber || product.casNumber || 'N/A';
    const formula = product.specifications?.molecularFormula || product.molecularFormula || 'N/A';
    const molWeight = product.specifications?.molecularWeight || product.molecularWeight || 'N/A';
    const availability = product.availability || 'In Stock';
    const url = `${window.location.origin}/products/${product.slug || ''}`;

    return `GLP Pharma - Product Details\n\n` +
      `Product: ${name}\n` +
      `CAT No.: ${catNo}\n` +
      `CAS No.: ${casNo}\n` +
      `Mol. Formula: ${formula}\n` +
      `Mol. Weight: ${molWeight}\n` +
      `Availability: ${availability}\n\n` +
      `Link: ${url}`;
  };

  const handleShareWhatsApp = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const text = getProductDetailsText();
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
    setIsOpen(false);
  };

  const handleCopyDetails = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const text = getProductDetailsText();

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }).catch((err) => {
        console.error('Failed to copy', err);
      });
    } else {
      // Fallback for non-secure contexts
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Fallback copy failed', err);
      }
      document.body.removeChild(textArea);
    }
  };

  return (
    <div
      className={`relative inline-block ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Share Button Trigger */}
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsOpen(prev => !prev);
        }}
        className={`p-1.5 rounded-md transition-all duration-300 active:scale-90 hover:scale-110 hover:shadow-md cursor-pointer ${isOpen
            ? 'bg-[#1AA3B6] text-white shadow-sm'
            : 'bg-[#E8F4F6] text-[#0B7285] hover:bg-[#1AA3B6] hover:text-white'
          }`}
        title="Share Product"
        aria-label="Share Product"
      >
        <FiShare2 size={16} />
      </button>

      {/* Share Dropdown Menu on Hover / Active */}
      <div
        className={`absolute ${align === 'left' ? 'left-0 origin-top-left' : 'right-0 origin-top-right'} top-full mt-2 w-56 bg-white/95 backdrop-blur-md rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.15)] border border-[#D9E8EC] p-1.5 z-50 transition-all duration-200 ${isOpen
            ? 'opacity-100 scale-100 visible pointer-events-auto'
            : 'opacity-0 scale-95 invisible pointer-events-none'
          }`}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        {/* Pointer Arrow */}
        <div className={`absolute -top-1.5 ${align === 'left' ? 'left-3' : 'right-3'} w-3 h-3 bg-white border-t border-l border-[#D9E8EC] rotate-45`}></div>

        <div className="flex flex-col gap-1 relative z-10">
          {/* Option 1: Share through WhatsApp */}
          <button
            type="button"
            onClick={handleShareWhatsApp}
            className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-left text-xs font-semibold text-slate-700 hover:bg-[#25D366]/10 hover:text-[#128C7E] transition-colors cursor-pointer group/wa"
          >
            <div className="w-6 h-6 rounded-full bg-[#25D366]/15 flex items-center justify-center text-[#25D366] group-hover/wa:bg-[#25D366] group-hover/wa:text-white transition-colors shrink-0">
              <FaWhatsapp size={13} />
            </div>
            <span className="truncate">Share On WhatsApp</span>
          </button>

          {/* Option 2: Copy Product Details */}
          <button
            type="button"
            onClick={handleCopyDetails}
            className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-left text-xs font-semibold transition-colors cursor-pointer group/copy ${copied
                ? 'bg-emerald-50 text-emerald-700'
                : 'text-slate-700 hover:bg-[#E8F4F6] hover:text-[#0B7285]'
              }`}
          >
            <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors shrink-0 ${copied
                ? 'bg-emerald-500 text-white'
                : 'bg-slate-100 text-slate-500 group-hover/copy:bg-[#1AA3B6] group-hover/copy:text-white'
              }`}>
              {copied ? <FiCheck size={13} /> : <FiCopy size={13} />}
            </div>
            <span className="truncate">
              {copied ? 'Copied Details!' : 'Copy Details'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

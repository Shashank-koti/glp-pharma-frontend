import { Link, useLocation } from 'react-router-dom';
import { FiMail, FiPhone, FiMapPin, FiLinkedin, FiTwitter, FiFacebook } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import navImg from "/navImg.png";

export default function Footer() {
  const { t } = useTranslation();
  const location = useLocation();

  if (location.pathname === '/login' || location.pathname === '/register') {
    return null;
  }

  return (
    <footer className="relative bg-gradient-to-r from-[#031525] via-[#07243D] to-[#0E3A5D] pt-12 pb-6 border-t border-[#1AA3B6]/30 shadow-[0_-12px_40px_rgba(3,21,37,0.2)] overflow-hidden text-white">

      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-8">
          {/* Company Info */}
          <div className="space-y-5">
            <Link to="/" className="inline-block transition-transform hover:scale-105 duration-300 bg-white/95 backdrop-blur-sm px-3.5 py-2 rounded-xl shadow-md border border-white/20">
              <img
                src={navImg}
                alt="GLP Pharma Logo"
                className="h-11 w-auto object-contain"
              />
            </Link>
            <p className="text-slate-200 font-normal text-[15px] leading-relaxed pr-4">
              {t('footer.desc')}
            </p>
            <div className="flex space-x-3 pt-1">
              <a href="#" aria-label="LinkedIn" className="w-9 h-9 rounded-xl bg-white/10 border border-white/15 shadow-sm flex items-center justify-center text-white/90 hover:bg-[#1AA3B6] hover:text-white hover:scale-110 transition-all duration-300">
                <FiLinkedin size={16} />
              </a>
              <a href="#" aria-label="Twitter" className="w-9 h-9 rounded-xl bg-white/10 border border-white/15 shadow-sm flex items-center justify-center text-white/90 hover:bg-[#1AA3B6] hover:text-white hover:scale-110 transition-all duration-300">
                <FiTwitter size={16} />
              </a>
              <a href="#" aria-label="Facebook" className="w-9 h-9 rounded-xl bg-white/10 border border-white/15 shadow-sm flex items-center justify-center text-white/90 hover:bg-[#1AA3B6] hover:text-white hover:scale-110 transition-all duration-300">
                <FiFacebook size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:pl-8">
            <div className="mb-5">
              <h4 className="text-white font-extrabold text-lg tracking-wide">{t('footer.quickLinks')}</h4>
            </div>
            <ul className="space-y-3.5">
              <li><Link to="/about" className="text-slate-200 hover:text-white hover:translate-x-1.5 transition-all duration-200 text-[15px] font-medium inline-block">{t('footer.aboutUs')}</Link></li>
              <li><Link to="/careers" className="text-slate-200 hover:text-white hover:translate-x-1.5 transition-all duration-200 text-[15px] font-medium inline-block">{t('footer.careers')}</Link></li>
              <li><Link to="/news" className="text-slate-200 hover:text-white hover:translate-x-1.5 transition-all duration-200 text-[15px] font-medium inline-block">{t('footer.latestNews')}</Link></li>
              <li><Link to="/gallery" className="text-slate-200 hover:text-white hover:translate-x-1.5 transition-all duration-200 text-[15px] font-medium inline-block">{t('footer.gallery')}</Link></li>
              <li><Link to="/contact" className="text-slate-200 hover:text-white hover:translate-x-1.5 transition-all duration-200 text-[15px] font-medium inline-block">{t('footer.contactUs')}</Link></li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <div className="mb-5">
              <h4 className="text-white font-extrabold text-lg tracking-wide">{t('footer.products')}</h4>
            </div>
            <ul className="space-y-3.5">
              <li className="text-slate-200 hover:text-white hover:translate-x-1.5 transition-all duration-200 text-[15px] font-medium cursor-pointer inline-block">{t('footer.api')}</li>
              <li className="text-slate-200 hover:text-white hover:translate-x-1.5 transition-all duration-200 text-[15px] font-medium cursor-pointer block">Certificate of Analysis</li>
              <li className="text-slate-200 hover:text-white hover:translate-x-1.5 transition-all duration-200 text-[15px] font-medium cursor-pointer block">{t('footer.impurities')}</li>
              <li className="text-slate-200 hover:text-white hover:translate-x-1.5 transition-all duration-200 text-[15px] font-medium cursor-pointer block">{t('footer.catalogue')}</li>
              <li className="text-slate-200 hover:text-white hover:translate-x-1.5 transition-all duration-200 text-[15px] font-medium cursor-pointer block">{t('footer.technicalDocs')}</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div className="mb-5">
              <h4 className="text-white font-extrabold tracking-wide text-lg">Contact Us</h4>
            </div>
            <ul className="space-y-4 text-slate-200 font-medium">
              <li className="flex items-start gap-3 group cursor-pointer">
                <div className="mt-0.5 w-7 h-7 rounded-lg bg-white/10 border border-white/15 shadow-sm flex items-center justify-center text-[#5CE1E6] group-hover:bg-[#1AA3B6] group-hover:text-white transition-all duration-300 shrink-0">
                  <FiMapPin size={13} />
                </div>
                <span className="text-[14.5px] leading-relaxed text-slate-200 group-hover:text-white transition-colors">
                  Plot No:1, Shakti Puram Phase-2, Prashanti Nagar,<br />Industrial Estate(IE), Kukatpally, Hyderabad,<br />Telangana State, India, PIN: 500072
                </span>
              </li>
              <li className="flex items-center gap-3 group cursor-pointer">
                <div className="w-7 h-7 rounded-lg bg-white/10 border border-white/15 shadow-sm flex items-center justify-center text-[#5CE1E6] group-hover:bg-[#1AA3B6] group-hover:text-white transition-all duration-300 shrink-0">
                  <FiPhone size={13} />
                </div>
                <a href="tel:+919866074638" className="text-[15px] text-slate-200 group-hover:text-white transition-colors">+91 9866074638</a>
              </li>
              <li className="flex items-center gap-3 group cursor-pointer">
                <div className="w-7 h-7 rounded-lg bg-white/10 border border-white/15 shadow-sm flex items-center justify-center text-[#5CE1E6] group-hover:bg-[#1AA3B6] group-hover:text-white transition-all duration-300 shrink-0">
                  <FiMail size={13} />
                </div>
                <a href="mailto:info@glppharmastandards.com" className="text-[15px] text-slate-200 group-hover:text-white transition-colors">info@glppharmastandards.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-4 flex flex-col md:flex-row justify-between items-center gap-3 text-[14.5px] text-slate-300 font-medium">
          <p>&copy; {new Date().getFullYear()} GLP Pharma. All Rights Reserved.</p>
          <div className="flex space-x-6">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

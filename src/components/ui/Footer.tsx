import React from 'react';
import Link from './link';
import { useLocation } from 'react-router-dom';

const Footer: React.FC = () => {
    const location = useLocation();

    const navItems = [
      { name: 'About Us', path: '/about' },
      { name: 'FAQ', path: '/faq' },
      { name: 'Contact Us', path: '/contact' },
    ];

    const socialLinks = [
      { name: 'LinkedIn', url: 'https://linkedin.com' },
      { name: 'Twitter', url: 'https://twitter.com' },
      { name: 'Instagram', url: 'https://instagram.com' },
      { name: 'Facebook', url: 'https://facebook.com' },
      { name: 'YouTube', url: 'https://youtube.com' },
    ];

    const legalLinks = [
      { name: 'Privacy Policy', path: '/privacy-policy' },
      { name: 'Terms & Conditions', path: '/terms-and-conditions' },
      { name: 'Cookie Policy', path: '/cookie-policy' },
    ];
  
  return (
    <footer className="max-w-7xl mx-auto px-4 py-12 mt-24">
      <div className="grid md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-[#4A90E2] rounded-full"></div>
            <span className="font-bold">AllSports.AI</span>
          </div>
          <p className="text-sm text-[#666666]">
            Empowering athletes with data-driven insights for smarter recruitment decisions.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Menu</h4>
          <ul className="space-y-2 text-[#666666]">
            <li>
              <Link to="/" className="text-xl font-bold hover:text-[#333333]">USPORT.AI</Link>
            </li>
            {navItems.map((item) => (
              location.pathname !== item.path && (
                <li key={item.name}>
                  <Link to={item.path} className="navFooterLinks">
                    {item.name}
                  </Link>
                </li>
              )
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Follow Us</h4>
          <ul className="space-y-2 text-[#666666]">
            {socialLinks.map((link) => (
              <li key={link.name}>
                <Link to={link.url} className="socialFooterLink">{link.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Newsletter</h4>
          <p className="text-sm text-[#666666] mb-2">Stay updated with our latest news and offers.</p>
          <form className="flex">
            <input
              type="email"
              placeholder="Your email"
              className="flex-grow px-3 py-2 text-sm border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-[#4A90E2]"
            />
            <button
              type="submit"
              className="px-4 py-2 text-sm text-white bg-[#4A90E2] rounded-r-md hover:bg-[#3A80D2] transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
      <div className="border-t border-gray-200 mt-12 pt-8 text-sm text-[#666666] flex flex-wrap gap-4">
        {legalLinks.map((link, index) => (
          <React.Fragment key={link.name}>
            <Link to={link.path} className="leagalFooterLinks">{link.name}</Link>
            {index < legalLinks.length - 1 && <span>|</span>}
          </React.Fragment>
        ))}
        <span className="ml-auto">© AllSports.AI {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
};

export default Footer;
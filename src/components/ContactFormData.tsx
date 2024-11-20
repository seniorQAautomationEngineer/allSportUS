import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

const FacebookIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const InstagramIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const TwitterIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
  </svg>
);

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-[#4A90E2] rounded-full"></div>
            <span className="text-2xl font-bold text-[#333333]">AllSports.AI</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-[#666666] hover:text-[#333333] transition-colors">About Us</a>
            <a href="#" className="text-[#666666] hover:text-[#333333] transition-colors">FAQ</a>
            <a href="#" className="text-[#666666] hover:text-[#333333] transition-colors">Contact Us</a>
            <Link to="/login" className="text-[#666666] hover:text-[#333333] transition-colors">Login</Link>
            <button className="px-4 py-2 rounded-full border border-[#4A90E2] text-[#4A90E2] hover:bg-[#4A90E2] hover:text-white transition-colors">
              Sign Up
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-16">
        {/* Contact Form Section */}
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-between items-start mb-12">
            <div>
              <h2 className="text-lg text-[#666666] mb-2">Stay Connected</h2>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Reliable support.<br />
                Just a message away.
              </h1>
            </div>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:border-[#4A90E2] hover:text-[#4A90E2] transition-colors">
                <FacebookIcon />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:border-[#4A90E2] hover:text-[#4A90E2] transition-colors">
                <InstagramIcon />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:border-[#4A90E2] hover:text-[#4A90E2] transition-colors">
                <TwitterIcon />
                <span className="sr-only">Twitter</span>
              </a>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-100 border-transparent focus:border-[#4A90E2] focus:bg-white focus:ring-0"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-100 border-transparent focus:border-[#4A90E2] focus:bg-white focus:ring-0"
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={6}
                className="w-full px-4 py-3 rounded-lg bg-gray-100 border-transparent focus:border-[#4A90E2] focus:bg-white focus:ring-0"
                required
              />
            </div>
            <button type="submit" className="px-6 py-3 bg-[#4A90E2] text-white rounded-lg hover:bg-[#3A7BC2] transition-colors">
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Info Section */}
        <div className="mt-24 bg-[#4A90E2] rounded-3xl text-white">
          <div className="max-w-3xl mx-auto px-8 py-16">
            <h2 className="text-xl mb-12">Connect with Ease</h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-3xl font-bold leading-tight mb-8">
                  Get in touch for<br />
                  answers, assistance,<br />
                  or feedback.
                </h3>
              </div>
              <div>
                <div className="mb-8">
                  <h4 className="text-white/60 mb-2">Email Address</h4>
                  <p className="text-xl">help@info.com</p>
                </div>
                <div>
                  <h4 className="text-white/60 mb-2">Assistance hours:</h4>
                  <p>Monday - Friday 6 am to<br />8 pm EST</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
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
              <li><a href="#" className="hover:text-[#333333]">About Us</a></li>
              <li><a href="#" className="hover:text-[#333333]">Contacts</a></li>
              <li><a href="#" className="hover:text-[#333333]">FAQ</a></li>
              <li><a href="#" className="hover:text-[#333333]">Get Started</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <ul className="space-y-2 text-[#666666]">
              <li><a href="#" className="hover:text-[#333333]">LinkedIn</a></li>
              <li><a href="#" className="hover:text-[#333333]">Twitter</a></li>
              <li><a href="#" className="hover:text-[#333333]">Instagram</a></li>
              <li><a href="#" className="hover:text-[#333333]">Facebook</a></li>
              <li><a href="#" className="hover:text-[#333333]">YouTube</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-12 pt-8 text-sm text-[#666666] flex flex-wrap gap-4">
          <a href="#" className="hover:text-[#333333]">Privacy Policy</a>
          <span>|</span>
          <a href="#" className="hover:text-[#333333]">Terms & Conditions</a>
          <span>|</span>
          <a href="#" className="hover:text-[#333333]">Cookie Policy</a>
          <span className="ml-auto">© AllSports.AI 2024</span>
        </div>
      </footer>
    </div>
  );
}
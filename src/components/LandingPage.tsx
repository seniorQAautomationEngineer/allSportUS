import React from 'react';
import { Link } from 'react-router-dom';
import Header from './ui/Header';
import Footer from './ui/Footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
    <Header />

      <main>
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 py-16 md:py-24 text-center">
          <h1 className="text-4xl md:text-6xl font-bold max-w-4xl mx-auto leading-tight mb-4">
            Your College<br />
            Athletic Journey,<br />
            <span className="relative inline-block">
              Simplified
              <span className="absolute bottom-1 left-0 w-full h-3 bg-[#4A90E2] opacity-50 -rotate-1"></span>
            </span>
          </h1>
          <p className="text-[#666666] text-lg md:text-xl max-w-2xl mx-auto mb-8">
            Unlock the door to scholarships with data-driven AI matches based on real sports season insights.
          </p>
          <div className="max-w-md mx-auto relative">
            {/* <input 
              type="email" 
              placeholder="Your Email" 
              className="w-full px-6 py-3 pr-32 rounded-full border border-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-[#4A90E2] focus:border-transparent"
            />
            <button className="absolute right-1 top-1 bottom-1 px-6 bg-[#4A90E2] hover:bg-[#3A7BC2] text-white rounded-full transition-colors">
              Start For Free
            </button> */}
          </div>
        </section>

        {/* Feature Cards */}
        <section className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-6 mb-24">
          <div className="bg-[#4A90E2] text-white rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-3">No Recruitment Agent Fees</h2>
            <p className="text-white/90">
              Say goodbye to costly recruitment agents. You'll have the power to navigate the entire process yourself, equipped with all the tools and information you need to succeed.
            </p>
          </div>
          <div className="bg-[#4A90E2] text-white rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-3">Direct Access to Recruitment Contacts</h2>
            <p className="text-white/90">
              Get essential contacts for athletic programs and colleges, allowing you to take control of your recruitment process, communicate with coaches, and secure your spot—all on your own terms.
            </p>
          </div>
          <div className="bg-[#4A90E2] text-white rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-3">Data-Driven Insights</h2>
            <p className="text-white/90">
              Our AI doesn't just rely on your current data—it pulls from the results of past college sports seasons to match you with schools that have historically recruited athletes like you.
            </p>
          </div>
        </section>

        {/* Stats Section */}
        <section className="max-w-7xl mx-auto px-4 text-center py-16">
          <h2 className="text-4xl font-bold mb-4">
            Powered by Data, Designed for Results
          </h2>
          <p className="text-[#666666] text-lg md:text-xl max-w-2xl mx-auto mb-16">
            Our platform uses real athletic data to match athletes with scholarships and teams that fit their profile.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-5xl font-bold mb-2">500+</h3>
              <p className="text-[#666666]">
                NCAA Teams<br />
                Available for Matching
              </p>
            </div>
            <div>
              <h3 className="text-5xl font-bold mb-2">$3.6B+</h3>
              <p className="text-[#666666]">
                In NCAA Athletic Scholarships<br />
                Available Each Year
              </p>
            </div>
            <div>
              <h3 className="text-5xl font-bold mb-2">150+</h3>
              <p className="text-[#666666]">
                Sports Variables Analysed<br />
                For Precise College Matches
              </p>
            </div>
          </div>
        </section>

        {/* 10x Faster Section */}
        <section className="bg-[#4A90E2] py-24 text-white">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-4">
              Your College<br />
              Recruitment Process
            </h2>
            <p className="text-3xl md:text-5xl font-bold mb-8">10x faster</p>
            <p className="text-xl mb-12">Always focused & direct with direct access to coaches</p>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 max-w-4xl mx-auto">
              <div className="grid md:grid-cols-5 gap-4">
                <div className="md:col-span-1 space-y-2">
                  <button className="w-full text-left px-4 py-2 rounded bg-white/20 hover:bg-white/30">Select Your Sport</button>
                  <button className="w-full text-left px-4 py-2 rounded">Swimming</button>
                  <button className="w-full text-left px-4 py-2 rounded">Basketball</button>
                  <button className="w-full text-left px-4 py-2 rounded">Track and Field</button>
                </div>
                <div className="md:col-span-4 bg-white/20 rounded-xl p-6">
                  {/* Dashboard Preview Content */}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Three-Step Process */}
        <section className="max-w-7xl mx-auto px-4 py-24 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Three-Step Shortcut to<br />
            College Recruitment
          </h2>
          <p className="text-[#666666] mb-12">Find the right college fast, and manage offers efficiently</p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6">
              <div className="w-16 h-16 bg-[#FFB74D] rounded-xl mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold mb-2">Build Your Profile</h3>
              <p className="text-[#666666]">Our tool evaluates the college sports based on your performance profile</p>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 bg-[#4A90E2] rounded-xl mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold mb-2">Discover Your Top Matches</h3>
              <p className="text-[#666666]">Our algorithm selects colleges with ideal scholarship opportunities and team fit</p>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 bg-[#4CAF50] rounded-xl mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold mb-2">Begin Your Recruitment</h3>
              <p className="text-[#666666]">Get access to key contacts and take control of your recruitment process</p>
            </div>
          </div>
          <button className="mt-12 px-8 py-3 bg-[#4A90E2] text-white rounded-full hover:bg-[#3A7BC2] transition-colors">
            Start For Free
          </button>
        </section>

        {/* Contact Form Section */}
        <section className="bg-[#4A90E2] py-24">
          <div className="max-w-7xl mx-auto px-4 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">We're Here to<br />Make Things Easy</h2>
            <p className="mb-12">Fill out the form and we'll be in touch with personalized recommendations</p>
            <form className="max-w-md mx-auto space-y-4">
              <input type="text" placeholder="Name" className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30" />
              <input type="email" placeholder="Email" className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30" />
              <input type="tel" placeholder="Phone" className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30" />
              <button type="submit" className="w-full py-3 bg-white text-[#4A90E2] rounded-lg font-semibold hover:bg-white/90 transition-colors">
                Submit
              </button>
            </form>
          </div>
        </section>
        <Footer />
      
      </main>
    </div>
  )
}
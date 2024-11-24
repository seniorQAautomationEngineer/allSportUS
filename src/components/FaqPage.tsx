import React from 'react';
import { FileText, Users, DollarSign, Globe, RefreshCw, Activity } from 'lucide-react';
import Header from './ui/Header';
import Footer from './ui/Footer';

interface FAQItem {
  icon: React.ReactNode;
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    icon: <FileText className="w-6 h-6 text-[#4A90E2]" />,
    question: "Why should I use AllSports.AI for my college recruitment?",
    answer: "Our app makes college recruitment simple, using data and AI to match you with NCAA programs that fit your athletic and academic profile. You'll get tailored college matches, direct coach contacts, and updated scholarship opportunities—all without needing to pay for an expensive recruiting service. By analyzing real NCAA stats and over 150 athletic variables, our app helps you connect with schools and access valuable scholarships."
  },
  {
    icon: <Users className="w-6 h-6 text-[#4A90E2]" />,
    question: "How does the app help me find colleges?",
    answer: "Our app uses AI and data analytics to match you with NCAA programs based on your athletic profile. Once matched, we provide verified contact details for coaches, allowing you to reach out directly to schools of interest."
  },
  {
    icon: <DollarSign className="w-6 h-6 text-[#4A90E2]" />,
    question: "What types of scholarships can I find through AllSports.AI?",
    answer: "We help you identify NCAA Division I and II programs that offer athletic scholarships, which together provide over $3.6 billion annually."
  },
  {
    icon: <Activity className="w-6 h-6 text-[#4A90E2]" />,
    question: "Do I need to pay to use the app?",
    answer: "No, the app is completely free to use. Our goal is to make college recruitment accessible to all athletes by providing a tool that helps you independently reach out to coaches and schools."
  },
  {
    icon: <Globe className="w-6 h-6 text-[#4A90E2]" />,
    question: "Does the app support international athletes?",
    answer: "Yes, we support international athletes who want to connect with NCAA programs. You'll find coach contact information and additional resources to help navigate the recruitment process."
  },
  {
    icon: <RefreshCw className="w-6 h-6 text-[#4A90E2]" />,
    question: "Can I update my profile if my stats change?",
    answer: "Absolutely. Simply update your profile as needed, and the app will adjust your matches based on your latest information."
  }
];

const FAQPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />
    

      <main className="max-w-7xl mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Got <span className="text-[#4A90E2]">Questions?</span><br />
            We've Got <span className="relative inline-block">
              Answers
              <span className="absolute bottom-1 left-0 w-full h-3 bg-[#4A90E2] opacity-50 -rotate-1"></span>
            </span>
          </h1>
          <p className="text-[#666666] text-lg max-w-2xl mx-auto">
            Browse through common questions to maximize your recruitment experience with AllSports.AI.
          </p>
        </div>

        {/* FAQ Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {faqItems.map((item, index) => (
            <div key={index} className="p-6 bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-[#4A90E2]/10 rounded-lg">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">{item.question}</h3>
                  <p className="text-[#666666]">{item.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FAQPage;
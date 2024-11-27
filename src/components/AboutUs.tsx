import React from 'react';
import { Award, Users, Zap, BarChart, Mail } from 'lucide-react';
import Header from '../components/ui/Header';
import Footer from '../components/ui/Footer';

const AboutUs: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-blue-600 text-white">
          <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-center mb-4">
              Empowering Athletes, Transforming Futures
            </h1>
            <p className="text-xl text-center max-w-3xl mx-auto">
              USPORT.AI is revolutionizing college athletic recruitment with cutting-edge AI technology, 
              connecting talented athletes with their ideal NCAA programs.
            </p>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              To democratize the college recruitment process, making it accessible, efficient, and 
              equitable for all athletes, regardless of their background or resources.
            </p>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-white">
          <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose USPORT.AI?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <Award className="w-8 h-8 text-blue-500" />,
                  title: "AI-Powered Matching",
                  description: "Our advanced algorithms ensure you're connected with the most suitable NCAA programs based on your athletic and academic profile."
                },
                {
                  icon: <Users className="w-8 h-8 text-blue-500" />,
                  title: "Direct Coach Connections",
                  description: "Get verified contact information for coaches, allowing you to reach out directly and make a lasting impression."
                },
                {
                  icon: <Zap className="w-8 h-8 text-blue-500" />,
                  title: "Real-Time Updates",
                  description: "Stay informed with the latest scholarship opportunities and program changes as they happen."
                },
                {
                  icon: <BarChart className="w-8 h-8 text-blue-500" />,
                  title: "Comprehensive Analytics",
                  description: "Gain insights into your athletic performance and how you stack up against NCAA standards."
                }
              ].map((feature, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">{feature.title}</h3>
                  <p className="text-gray-600 text-center">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonial Section */}
        <div className="bg-gray-100">
          <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">What Our Athletes Say</h2>
            <div className="bg-white rounded-lg shadow-md p-8">
              <p className="text-lg text-gray-600 italic mb-4">
                "USPORT.AI completely transformed my college recruitment journey. I found my dream school 
                and secured a scholarship, all thanks to their incredible platform!"
              </p>
              <p className="text-gray-900 font-semibold">- Sarah Johnson, Freshman at Stanford University</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-blue-600">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready to Start Your Journey?
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                Join thousands of athletes who've found their perfect college match with USPORT.AI
              </p>
              <button className="bg-white text-blue-600 font-bold py-3 px-8 rounded-full hover:bg-blue-50 transition-colors duration-300">
                Get Started Now
              </button>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Have Questions?</h2>
            <p className="text-xl text-gray-600 mb-8">Our team is here to help you every step of the way.</p>
            <a 
              href="mailto:support@usport.ai" 
              className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-300"
            >
              <Mail className="w-5 h-5 mr-2" />
              support@usport.ai
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutUs;


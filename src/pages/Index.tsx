
import React from 'react';
import Navigation from '../components/Navigation';
import HeroSection from '../components/HeroSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      <HeroSection />
      
      {/* Placeholder sections for demonstration */}
      <section className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-4xl font-bold mb-4 font-inter">Why Join?</h2>
          <p className="text-xl">Content coming soon...</p>
        </div>
      </section>
      
      <section className="min-h-screen bg-gray-800 flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-4xl font-bold mb-4 font-inter">Partnership Opportunities</h2>
          <p className="text-xl">Content coming soon...</p>
        </div>
      </section>
    </div>
  );
};

export default Index;

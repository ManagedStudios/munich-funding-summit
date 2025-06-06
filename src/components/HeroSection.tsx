
import React, { useState, useEffect } from 'react';

const HeroSection = () => {
  const [scrollY, setScrollY] = useState(0);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      
      // Show details after scrolling half of viewport height
      setShowDetails(currentScrollY > window.innerHeight * 0.3);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen bg-black overflow-hidden font-inter">
      {/* Background Stage Lighting - Coming from Above */}
      <div className="absolute inset-0">
        {/* Back Layer - Atmospheric gradient from top */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(ellipse 80% 60% at 50% 0%, 
              rgba(147, 51, 234, 0.4) 0%, 
              rgba(59, 130, 246, 0.3) 30%, 
              rgba(0, 0, 0, 0.9) 60%, 
              rgba(0, 0, 0, 1) 100%)`,
            transform: `translateY(${scrollY * 0.2}px)`,
          }}
        />

        {/* Mid Layer - Overhead spotlights */}
        <div className="absolute inset-0">
          {/* Main center spotlight from above */}
          <div 
            className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 rounded-full opacity-40"
            style={{
              background: `radial-gradient(circle, 
                rgba(249, 186, 63, 0.6) 0%, 
                rgba(249, 186, 63, 0.3) 30%, 
                rgba(249, 186, 63, 0.1) 50%, 
                transparent 70%)`,
              filter: 'blur(40px)',
              transform: `translateX(-50%) translateY(${scrollY * 0.3}px)`,
            }}
          />
          
          {/* Left overhead light */}
          <div 
            className="absolute top-0 left-1/4 w-64 h-64 rounded-full opacity-25"
            style={{
              background: `radial-gradient(circle, 
                rgba(255, 255, 255, 0.4) 0%, 
                rgba(255, 255, 255, 0.2) 40%, 
                transparent 70%)`,
              filter: 'blur(60px)',
              transform: `translateY(${scrollY * 0.25}px)`,
            }}
          />
          
          {/* Right overhead light */}
          <div 
            className="absolute top-0 right-1/4 w-64 h-64 rounded-full opacity-25"
            style={{
              background: `radial-gradient(circle, 
                rgba(255, 255, 255, 0.4) 0%, 
                rgba(255, 255, 255, 0.2) 40%, 
                transparent 70%)`,
              filter: 'blur(60px)',
              transform: `translateY(${scrollY * 0.35}px)`,
            }}
          />
        </div>

        {/* Front Layer - Light beams from above */}
        <div className="absolute inset-0">
          {/* Central light beam */}
          <div 
            className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2 h-full opacity-20"
            style={{
              background: `linear-gradient(180deg, 
                rgba(249, 186, 63, 0.8) 0%, 
                rgba(249, 186, 63, 0.6) 20%, 
                rgba(249, 186, 63, 0.3) 40%, 
                transparent 70%)`,
              filter: 'blur(8px)',
              transform: `translateX(-50%) translateY(${scrollY * 0.15}px)`,
            }}
          />
          
          {/* Left diagonal beam */}
          <div 
            className="absolute top-0 left-1/3 w-1 h-3/4 opacity-15"
            style={{
              background: `linear-gradient(180deg, 
                rgba(255, 255, 255, 0.6) 0%, 
                rgba(255, 255, 255, 0.4) 30%, 
                rgba(255, 255, 255, 0.2) 50%, 
                transparent 70%)`,
              filter: 'blur(4px)',
              transform: `translateY(${scrollY * 0.1}px) rotate(-15deg)`,
              transformOrigin: 'top center'
            }}
          />
          
          {/* Right diagonal beam */}
          <div 
            className="absolute top-0 right-1/3 w-1 h-3/4 opacity-15"
            style={{
              background: `linear-gradient(180deg, 
                rgba(255, 255, 255, 0.6) 0%, 
                rgba(255, 255, 255, 0.4) 30%, 
                rgba(255, 255, 255, 0.2) 50%, 
                transparent 70%)`,
              filter: 'blur(4px)',
              transform: `translateY(${scrollY * 0.1}px) rotate(15deg)`,
              transformOrigin: 'top center'
            }}
          />
        </div>

        {/* Stage floor glow effect */}
        <div className="absolute inset-0">
          <div 
            className="absolute bottom-0 left-0 right-0 h-32 opacity-20"
            style={{
              background: `linear-gradient(0deg, 
                rgba(249, 186, 63, 0.3) 0%, 
                rgba(249, 186, 63, 0.1) 50%, 
                transparent 100%)`,
              filter: 'blur(20px)',
              transform: `translateY(${-scrollY * 0.1}px)`,
            }}
          />
        </div>

        {/* Atmospheric particles */}
        <div className="absolute inset-0 opacity-10">
          <div 
            className="absolute top-1/4 left-1/5 w-2 h-2 bg-white rounded-full"
            style={{
              filter: 'blur(1px)',
              transform: `translate(${scrollY * 0.05}px, ${scrollY * 0.08}px)`,
            }}
          />
          <div 
            className="absolute top-1/3 right-1/4 w-1 h-1 bg-primary rounded-full"
            style={{
              filter: 'blur(0.5px)',
              transform: `translate(${-scrollY * 0.03}px, ${scrollY * 0.12}px)`,
            }}
          />
          <div 
            className="absolute top-1/2 left-2/3 w-1.5 h-1.5 bg-white rounded-full"
            style={{
              filter: 'blur(1px)',
              transform: `translate(${scrollY * 0.07}px, ${scrollY * 0.06}px)`,
            }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6">
        <div className="text-center max-w-5xl mx-auto">
          {/* Main Headline */}
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black uppercase text-white mb-8 tracking-tight leading-none">
            <span 
              className="block"
              style={{
                textShadow: '0 0 40px rgba(249, 186, 63, 0.3), 0 0 80px rgba(249, 186, 63, 0.1)',
                filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.5))'
              }}
            >
              Munich
            </span>
            <span 
              className="block text-primary"
              style={{
                textShadow: '0 0 40px rgba(249, 186, 63, 0.5), 0 0 80px rgba(249, 186, 63, 0.2)',
                filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.5))'
              }}
            >
              Funding
            </span>
            <span 
              className="block"
              style={{
                textShadow: '0 0 40px rgba(249, 186, 63, 0.3), 0 0 80px rgba(249, 186, 63, 0.1)',
                filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.5))'
              }}
            >
              Summit
            </span>
          </h1>

          {/* Subheadline */}
          <h2 className="text-xl md:text-2xl lg:text-3xl font-medium text-white/90 mb-12 tracking-wide leading-relaxed">
            <span className="hover:text-primary transition-colors duration-300 cursor-default">
              Connecting Europe's Innovators with VCs
            </span>
          </h2>

          {/* Date & Location - Revealed on scroll */}
          <div 
            className={`transition-all duration-800 ease-out ${
              showDetails 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
          >
            <p className="text-lg md:text-xl font-light text-white/80 tracking-wide">
              <span className="text-primary font-medium">Fall 2025</span>
              <span className="mx-4 text-white/40">|</span>
              <span>Audimax, Technical University of Munich</span>
            </p>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center space-y-2 opacity-60">
            <span className="text-white/60 text-sm font-light tracking-widest uppercase">Scroll</span>
            <div className="w-px h-12 bg-gradient-to-b from-white/60 to-transparent"></div>
          </div>
        </div>
      </div>

      {/* Subtle grain overlay for texture */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </section>
  );
};

export default HeroSection;

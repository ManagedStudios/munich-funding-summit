
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
      {/* Background Stage Lighting */}
      <div className="absolute inset-0">
        {/* Back Layer - Atmospheric gradient */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            background: `radial-gradient(ellipse at center, 
              rgba(147, 51, 234, 0.3) 0%, 
              rgba(59, 130, 246, 0.2) 40%, 
              rgba(0, 0, 0, 0.8) 70%, 
              rgba(0, 0, 0, 1) 100%)`,
            transform: `translateY(${scrollY * 0.1}px)`,
          }}
        />

        {/* Mid Layer - Volumetric glows */}
        <div className="absolute inset-0">
          <div 
            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-30"
            style={{
              background: `radial-gradient(circle, 
                rgba(249, 186, 63, 0.4) 0%, 
                rgba(249, 186, 63, 0.1) 40%, 
                transparent 70%)`,
              filter: 'blur(60px)',
              transform: `translate(${scrollY * 0.15}px, ${scrollY * 0.08}px)`,
            }}
          />
          <div 
            className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full opacity-25"
            style={{
              background: `radial-gradient(circle, 
                rgba(255, 255, 255, 0.3) 0%, 
                rgba(255, 255, 255, 0.1) 50%, 
                transparent 70%)`,
              filter: 'blur(80px)',
              transform: `translate(${-scrollY * 0.12}px, ${scrollY * 0.06}px)`,
            }}
          />
        </div>

        {/* Front Layer - Light streaks */}
        <div className="absolute inset-0">
          <div 
            className="absolute top-1/2 left-0 w-full h-1 opacity-20"
            style={{
              background: `linear-gradient(90deg, 
                transparent 0%, 
                rgba(249, 186, 63, 0.8) 30%, 
                rgba(255, 255, 255, 0.6) 50%, 
                rgba(249, 186, 63, 0.8) 70%, 
                transparent 100%)`,
              filter: 'blur(2px)',
              transform: `translateX(${scrollY * 0.2}px) rotate(-2deg)`,
            }}
          />
          <div 
            className="absolute top-1/3 right-0 w-3/4 h-0.5 opacity-15"
            style={{
              background: `linear-gradient(90deg, 
                transparent 0%, 
                rgba(255, 255, 255, 0.6) 40%, 
                rgba(249, 186, 63, 0.4) 60%, 
                transparent 100%)`,
              filter: 'blur(1px)',
              transform: `translateX(${-scrollY * 0.25}px) rotate(1deg)`,
            }}
          />
        </div>

        {/* Converging spotlights */}
        <div className="absolute inset-0">
          <div 
            className="absolute top-0 left-1/4 w-1 h-full opacity-10"
            style={{
              background: `linear-gradient(180deg, 
                rgba(249, 186, 63, 0.6) 0%, 
                rgba(249, 186, 63, 0.3) 30%, 
                transparent 60%)`,
              filter: 'blur(20px)',
              transform: `translateX(${scrollY * 0.05}px) skewX(-5deg)`,
            }}
          />
          <div 
            className="absolute top-0 right-1/4 w-1 h-full opacity-10"
            style={{
              background: `linear-gradient(180deg, 
                rgba(255, 255, 255, 0.5) 0%, 
                rgba(255, 255, 255, 0.2) 30%, 
                transparent 60%)`,
              filter: 'blur(25px)',
              transform: `translateX(${-scrollY * 0.05}px) skewX(5deg)`,
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

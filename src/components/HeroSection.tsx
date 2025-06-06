
import React from 'react';

const HeroSection = () => {
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
          }}
        />

        {/* Mid Layer - Overhead spotlights with enhanced animation */}
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
              animation: 'lightPulse 6s ease-in-out infinite',
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
              animation: 'lightSway 8s ease-in-out infinite',
              animationDelay: '1s',
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
              animation: 'lightSway 7s ease-in-out infinite reverse',
              animationDelay: '2s',
            }}
          />
        </div>

        {/* Front Layer - Enhanced light beams from above */}
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
              animation: 'beamGlow 5s ease-in-out infinite',
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
              transform: 'rotate(-15deg)',
              transformOrigin: 'top center',
              animation: 'beamSway 9s ease-in-out infinite',
              animationDelay: '1.5s',
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
              transform: 'rotate(15deg)',
              transformOrigin: 'top center',
              animation: 'beamSway 8s ease-in-out infinite reverse',
              animationDelay: '3s',
            }}
          />

          {/* Additional moving light streaks */}
          <div 
            className="absolute top-0 left-2/3 w-0.5 h-2/3 opacity-10"
            style={{
              background: `linear-gradient(180deg, 
                rgba(249, 186, 63, 0.5) 0%, 
                rgba(249, 186, 63, 0.3) 40%, 
                transparent 70%)`,
              filter: 'blur(2px)',
              transform: 'rotate(-8deg)',
              transformOrigin: 'top center',
              animation: 'subtleBeam 12s ease-in-out infinite',
              animationDelay: '4s',
            }}
          />

          <div 
            className="absolute top-0 right-2/3 w-0.5 h-2/3 opacity-10"
            style={{
              background: `linear-gradient(180deg, 
                rgba(255, 255, 255, 0.4) 0%, 
                rgba(255, 255, 255, 0.2) 40%, 
                transparent 70%)`,
              filter: 'blur(2px)',
              transform: 'rotate(8deg)',
              transformOrigin: 'top center',
              animation: 'subtleBeam 10s ease-in-out infinite reverse',
              animationDelay: '6s',
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
              animation: 'floorGlow 8s ease-in-out infinite',
            }}
          />
        </div>

        {/* Enhanced atmospheric particles */}
        <div className="absolute inset-0 opacity-10">
          <div 
            className="absolute top-1/4 left-1/5 w-2 h-2 bg-white rounded-full"
            style={{
              filter: 'blur(1px)',
              animation: 'particleFloat 8s ease-in-out infinite',
            }}
          />
          <div 
            className="absolute top-1/3 right-1/4 w-1 h-1 bg-primary rounded-full"
            style={{
              filter: 'blur(0.5px)',
              animation: 'particleFloat 6s ease-in-out infinite',
              animationDelay: '2s',
            }}
          />
          <div 
            className="absolute top-1/2 left-2/3 w-1.5 h-1.5 bg-white rounded-full"
            style={{
              filter: 'blur(1px)',
              animation: 'particleFloat 7s ease-in-out infinite',
              animationDelay: '4s',
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

          {/* Date & Location - Now visible immediately */}
          <div className="opacity-100">
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

      {/* Custom keyframes for enhanced animations */}
      <style jsx>{`
        @keyframes lightPulse {
          0%, 100% { 
            opacity: 0.4; 
            transform: translateX(-50%) scale(1);
          }
          50% { 
            opacity: 0.6; 
            transform: translateX(-50%) scale(1.1);
          }
        }

        @keyframes lightSway {
          0%, 100% { 
            opacity: 0.25; 
            transform: translateX(0) translateY(0);
          }
          33% { 
            opacity: 0.15; 
            transform: translateX(-10px) translateY(5px);
          }
          66% { 
            opacity: 0.35; 
            transform: translateX(10px) translateY(-5px);
          }
        }

        @keyframes beamGlow {
          0%, 100% { 
            opacity: 0.2; 
            filter: blur(8px);
          }
          50% { 
            opacity: 0.35; 
            filter: blur(6px);
          }
        }

        @keyframes beamSway {
          0%, 100% { 
            opacity: 0.15; 
            transform: rotate(-15deg) translateX(0);
          }
          50% { 
            opacity: 0.25; 
            transform: rotate(-12deg) translateX(3px);
          }
        }

        @keyframes subtleBeam {
          0%, 100% { 
            opacity: 0.1; 
            transform: rotate(-8deg) translateY(0);
          }
          50% { 
            opacity: 0.05; 
            transform: rotate(-10deg) translateY(2px);
          }
        }

        @keyframes floorGlow {
          0%, 100% { 
            opacity: 0.2; 
          }
          50% { 
            opacity: 0.3; 
          }
        }

        @keyframes particleFloat {
          0%, 100% { 
            opacity: 0.1; 
            transform: translateY(0) scale(1);
          }
          33% { 
            opacity: 0.05; 
            transform: translateY(-3px) scale(0.8);
          }
          66% { 
            opacity: 0.15; 
            transform: translateY(2px) scale(1.2);
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;

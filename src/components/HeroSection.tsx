import React from 'react';

const HeroSection = () => {
    return (
        <section className="relative min-h-screen bg-black overflow-hidden font-inter">
            {/* Background Lighting Gradient */}
            <div className="absolute inset-0">
                {/* Backdrop Radial Glow */}
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

                {/* Overhead Spotlights */}
                <div className="absolute inset-0">
                    <div
                        className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 rounded-full opacity-40 animate-glow"
                        style={{
                            background: `radial-gradient(circle, 
                rgba(249, 186, 63, 0.6) 0%, 
                rgba(249, 186, 63, 0.3) 30%, 
                rgba(249, 186, 63, 0.1) 50%, 
                transparent 70%)`,
                            filter: 'blur(40px)',
                            animationDuration: '4s',
                        }}
                    />
                    <div
                        className="absolute top-0 left-1/4 w-64 h-64 rounded-full opacity-25 animate-glow"
                        style={{
                            background: `radial-gradient(circle, 
                rgba(255, 255, 255, 0.4) 0%, 
                rgba(255, 255, 255, 0.2) 40%, 
                transparent 70%)`,
                            filter: 'blur(60px)',
                            animationDuration: '6s',
                            animationDelay: '1s',
                        }}
                    />
                    <div
                        className="absolute top-0 right-1/4 w-64 h-64 rounded-full opacity-25 animate-glow"
                        style={{
                            background: `radial-gradient(circle, 
                rgba(255, 255, 255, 0.4) 0%, 
                rgba(255, 255, 255, 0.2) 40%, 
                transparent 70%)`,
                            filter: 'blur(60px)',
                            animationDuration: '5s',
                            animationDelay: '2s',
                        }}
                    />
                </div>

                {/* Animated Light Beams */}
                <div className="absolute inset-0">
                    <div
                        className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2 h-full opacity-20 animate-beam-shimmer"
                        style={{
                            background: `linear-gradient(180deg, 
                rgba(249, 186, 63, 0.8) 0%, 
                rgba(249, 186, 63, 0.6) 20%, 
                rgba(249, 186, 63, 0.3) 40%, 
                transparent 70%)`,
                            filter: 'blur(8px)',
                        }}
                    />
                    <div
                        className="absolute top-0 left-1/3 w-1 h-3/4 opacity-15 animate-beam-shimmer"
                        style={{
                            background: `linear-gradient(180deg, 
                rgba(255, 255, 255, 0.6) 0%, 
                rgba(255, 255, 255, 0.4) 30%, 
                rgba(255, 255, 255, 0.2) 50%, 
                transparent 70%)`,
                            filter: 'blur(4px)',
                            transform: 'rotate(-15deg)',
                            transformOrigin: 'top center',
                            animationDelay: '1.5s',
                        }}
                    />
                    <div
                        className="absolute top-0 right-1/3 w-1 h-3/4 opacity-15 animate-beam-shimmer"
                        style={{
                            background: `linear-gradient(180deg, 
                rgba(255, 255, 255, 0.6) 0%, 
                rgba(255, 255, 255, 0.4) 30%, 
                rgba(255, 255, 255, 0.2) 50%, 
                transparent 70%)`,
                            filter: 'blur(4px)',
                            transform: 'rotate(15deg)',
                            transformOrigin: 'top center',
                            animationDelay: '3s',
                        }}
                    />
                </div>

                {/* Stage Floor Glow */}
                <div className="absolute inset-0">
                    <div
                        className="absolute bottom-0 left-0 right-0 h-32 opacity-20"
                        style={{
                            background: `linear-gradient(0deg, 
                rgba(249, 186, 63, 0.3) 0%, 
                rgba(249, 186, 63, 0.1) 50%, 
                transparent 100%)`,
                            filter: 'blur(20px)',
                        }}
                    />
                </div>

                {/* Particles */}
                <div className="absolute inset-0 opacity-10">
                    <div
                        className="absolute top-1/4 left-1/5 w-2 h-2 bg-white rounded-full animate-glow"
                        style={{ filter: 'blur(1px)', animationDuration: '8s' }}
                    />
                    <div
                        className="absolute top-1/3 right-1/4 w-1 h-1 bg-primary rounded-full animate-glow"
                        style={{ filter: 'blur(0.5px)', animationDuration: '6s', animationDelay: '2s' }}
                    />
                    <div
                        className="absolute top-1/2 left-2/3 w-1.5 h-1.5 bg-white rounded-full animate-glow"
                        style={{ filter: 'blur(1px)', animationDuration: '7s', animationDelay: '4s' }}
                    />
                </div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6">
                <div className="text-center max-w-5xl mx-auto">
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

                    <h2 className="text-xl md:text-2xl lg:text-3xl font-medium text-white/90 mb-12 tracking-wide leading-relaxed">
            <span className="hover:text-primary transition-colors duration-300 cursor-default">
              Connecting Europe's Innovators with VCs
            </span>
                    </h2>

                    <div className="opacity-100">
                        <p className="text-lg md:text-xl font-light text-white/80 tracking-wide">
                            <span className="text-primary font-medium">Fall 2025</span>
                            <span className="mx-4 text-white/40">|</span>
                            <span>Audimax, Technical University of Munich</span>
                        </p>
                    </div>
                </div>

                {/* Presented by Section */}
                <div className="mt-12 mb-16 text-center">
                    <p className="text-sm md:text-base text-white/70 tracking-wider uppercase mb-6">
                        Presented by Enactus Munich
                    </p>
                </div>

                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                    <div className="flex flex-col items-center space-y-2 opacity-60">
                        <span className="text-white/60 text-sm font-light tracking-widest uppercase">Scroll</span>
                        <div className="w-px h-12 bg-gradient-to-b from-white/60 to-transparent"></div>
                    </div>
                </div>
            </div>

            {/* Grain Overlay */}
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

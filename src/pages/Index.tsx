
import React from 'react';
import Navigation from '../components/Navigation';
import HeroSection from '../components/HeroSection';
import { Button } from '../components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Separator } from '../components/ui/separator';

const Index = () => {
  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      <HeroSection />
      
      {/* Section 2: The Big Idea */}
      <section className="min-h-screen bg-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black text-black mb-8 font-inter">
              The Big Idea
            </h2>
            <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              An intimate, high-caliber gathering of innovation, investment, and impact.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 mb-16">
            <div className="text-center">
              <div className="text-6xl mb-4">🎤</div>
              <h3 className="text-2xl font-bold mb-3 font-inter">1 iconic stage</h3>
              <p className="text-gray-600">No side tracks.</p>
            </div>
            <div className="text-center">
              <div className="text-6xl mb-4">🍽️</div>
              <h3 className="text-2xl font-bold mb-3 font-inter">1 exclusive founders dinner</h3>
              <p className="text-gray-600">Selected from 100+ applicants.</p>
            </div>
            <div className="text-center">
              <div className="text-6xl mb-4">🤝</div>
              <h3 className="text-2xl font-bold mb-3 font-inter">200 hand-picked guests</h3>
              <p className="text-gray-600">Every seat matters.</p>
            </div>
          </div>

          <div className="text-center max-w-3xl mx-auto">
            <p className="text-xl text-gray-800 leading-relaxed">
              Not just another summit. Not just another student pitch night. 
              A showcase of founders who build real businesses with real impact.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: VC Invitation */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-8 font-inter">
            Built for early believers. Curated for dealmakers.
          </h2>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Want a first look at the boldest ideas coming out of Europe's top universities?
            Get access to raw talent, curated pitches, and 1:1 interactions.
          </p>
          <p className="text-lg text-primary mb-12 font-medium">
            You're not just in the audience — you're in the dealflow.
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-black font-bold">
            Request VC Access →
          </Button>
        </div>
      </section>

      {/* Section 4: Our Philosophy */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-black mb-8 font-inter">
            Our Philosophy
          </h2>
          <p className="text-xl text-gray-700 mb-8 leading-relaxed">
            We don't believe in "social" startups or "commercial" startups.
            We believe in solving problems that matter — and scaling them.
          </p>
          <blockquote className="text-2xl text-gray-800 italic border-l-4 border-primary pl-6 max-w-3xl mx-auto">
            "We started with a bias for impact — and discovered the future of business 
            isn't in choosing between purpose and profit. It's in combining them."
          </blockquote>
        </div>
      </section>

      {/* Section 5: Hosting Clubs */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-black text-center text-black mb-16 font-inter">
            Presented by
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="invisible">

            </Card>
            <Card className="text-center">
              <CardHeader>
                <CardTitle className="text-primary font-inter">Enactus Munich</CardTitle>
                <CardDescription>Empowering Impact Entrepreneurs.</CardDescription>
              </CardHeader>
            </Card>

          </div>
        </div>
      </section>

      {/* Section 6: The Stage & Venue */}
      <section className="py-20 bg-black">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-8 font-inter">
            📍 Audimax, Technical University of Munich
          </h2>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Munich's most iconic academic stage.
          </p>
          <p className="text-lg text-primary mb-8">
            One evening. No distractions. No fluff.<br />
            Just founders, funders, and the future.
          </p>
        </div>
      </section>

      {/* Section 7: Partner With Us */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-black mb-8 font-inter">
            Be More Than a Sponsor. Shape the Future.
          </h2>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <h3 className="text-xl font-bold mb-3 font-inter">Visibility</h3>
              <p className="text-gray-600">In front of students & VCs</p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold mb-3 font-inter">Brand Placement</h3>
              <p className="text-gray-600">In a TED-like environment</p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold mb-3 font-inter">Co-host</h3>
              <p className="text-gray-600">Judge, mentor, or speak</p>
            </div>
          </div>
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-black font-bold">
            Request Partner Deck
          </Button>
        </div>
      </section>

      {/* Section 8: Stay in the Loop */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-8 font-inter">
            Stay in the Loop
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Applications. Lineups. The big names. First to know.
          </p>
          <div className="flex justify-center">
            <div className="flex max-w-md w-full">
              <input 
                type="email" 
                placeholder="Your email"
                className="flex-1 px-4 py-3 rounded-l-md border-0 focus:ring-2 focus:ring-primary"
              />
              <Button className="bg-primary hover:bg-primary/90 text-black font-bold rounded-l-none">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 9: Footer */}
      <footer className="bg-black py-12">
        <div className="max-w-6xl mx-auto px-6">
          <Separator className="mb-8 bg-gray-800" />
          <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <h3 className="text-white font-bold mb-4 font-inter">Contact</h3>
              <p className="text-gray-400">events@enactusmunich.de</p>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4 font-inter">Follow Us</h3>
              <div className="flex justify-center md:justify-start space-x-4">
                <a href="#" className="text-gray-400 hover:text-primary">LinkedIn</a>
                <a href="#" className="text-gray-400 hover:text-primary">Instagram</a>
              </div>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4 font-inter">Legal</h3>
              <div className="flex justify-center md:justify-start space-x-4">
                <a href="#" className="text-gray-400 hover:text-primary text-sm">Imprint</a>
                <a href="#" className="text-gray-400 hover:text-primary text-sm">Privacy</a>
              </div>
            </div>
          </div>
          <div className="text-center mt-8 pt-8 border-t border-gray-800">
            <p className="text-gray-400 text-sm">
              © 2024 Munich Funding Summit. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

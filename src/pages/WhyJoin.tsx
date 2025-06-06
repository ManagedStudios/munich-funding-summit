
import React from 'react';
import Navigation from '../components/Navigation';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

const WhyJoin = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-black">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-black text-white mb-8 font-inter">
            Why Join the Summit?
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed">
            This isn't just another networking event. It's your gateway to Europe's most ambitious startup ecosystem.
          </p>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <div className="text-4xl mb-4">🚀</div>
                <CardTitle className="font-inter">Direct Access to VCs</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Skip the cold emails. Meet Europe's top VCs in an intimate setting where every conversation counts.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="text-4xl mb-4">🎯</div>
                <CardTitle className="font-inter">Curated Audience</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  200 carefully selected attendees. No tourists, no time-wasters. Just serious players in the startup game.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="text-4xl mb-4">💡</div>
                <CardTitle className="font-inter">Learn from the Best</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Watch 10 exceptional startups pitch. Learn what works, what doesn't, and what investors really want.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="text-4xl mb-4">🤝</div>
                <CardTitle className="font-inter">Network That Matters</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Connect with fellow founders, potential co-founders, and mentors who've walked the path before you.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="text-4xl mb-4">🏆</div>
                <CardTitle className="font-inter">Pitch Opportunity</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Selected startups get to pitch on Munich's most iconic academic stage to a room full of investors.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="text-4xl mb-4">🌍</div>
                <CardTitle className="font-inter">European Focus</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Tap into Europe's thriving startup ecosystem and understand the unique opportunities this market offers.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-black text-white mb-8 font-inter">
            Ready to Join?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Applications open soon. Be the first to know when they go live.
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-black font-bold">
            Get Notified
          </Button>
        </div>
      </section>
    </div>
  );
};

export default WhyJoin;

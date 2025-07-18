
import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { CheckCircle } from 'lucide-react';
import WaitlistForm from '../components/WaitlistForm';

const Partners = () => {
  const [showWaitlistForm, setShowWaitlistForm] = useState(false);

  const handlePartnerRequest = () => {
    const subject = 'Partnership Anfrage - Munich Funding Summit';
    const body = `Hallo,

ich interessiere mich für eine Partnerschaft mit dem Munich Funding Summit.

Bitte senden Sie mir weitere Informationen zu:
- Partnership Deck
- Verfügbare Sponsoring-Pakete
- Individuelle Kooperationsmöglichkeiten

Unternehmen: [Ihr Unternehmen]
Kontaktperson: [Ihr Name]
E-Mail: [Ihre E-Mail]
Telefon: [Ihre Telefonnummer]
Gewünschter Termin für ein Gespräch: [Datum/Uhrzeit]

Bevorzugte Partnership-Stufe:
□ Title Partner
□ Stage Partner  
□ Supporting Partner
□ Custom Partnership

Vielen Dank!

Mit freundlichen Grüßen
[Ihr Name]`;
    
    window.location.href = `mailto:events@enactusmunich.de?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-black">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-black text-white mb-8 font-inter">
            Partner With Us
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed">
            Be more than a sponsor. Shape the future of European innovation.
          </p>
        </div>
      </section>

      {/* Partnership Benefits */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-black text-center mb-16 font-inter">
            Why Partner With Munich Funding Summit?
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h3 className="text-2xl font-bold mb-6 font-inter">Reach the Right Audience</h3>
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
                  Europe's most ambitious student entrepreneurs
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
                  Leading VCs actively seeking dealflow
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
                  University leaders and innovation ecosystem builders
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold mb-6 font-inter">Premium Brand Positioning</h3>
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
                  Associate your brand with innovation and impact
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
                  TED-like environment ensures quality perception
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
                  Intimate setting creates meaningful connections
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Tiers */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-black text-center mb-16 font-inter">
            Partnership Opportunities
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 border-primary">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-inter text-primary">Title Partner</CardTitle>
                <p className="text-gray-600">Lead the conversation</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                    Co-branding on all materials
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                    Speaking slot during event
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                    VIP networking access
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                    Judge on selection panel
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                    Premium stage branding
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-inter">Stage Partner</CardTitle>
                <p className="text-gray-600">Be center stage</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                    Logo on main stage backdrop
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                    Networking reception sponsor
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                    Direct access to startups
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                    Brand mention during pitches
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                    Social media features
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-inter">Supporting Partner</CardTitle>
                <p className="text-gray-600">Join the ecosystem</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                    Logo in event materials
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                    Networking access
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                    Startup directory access
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                    Event photography rights
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                    Post-event report
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Custom Partnerships */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-black mb-8 font-inter">
            Custom Partnerships Welcome
          </h2>
          <p className="text-xl text-gray-700 mb-8 leading-relaxed">
            Have a specific vision for how you'd like to be involved? 
            We're open to creative partnerships that align with our mission.
          </p>
          <div className="grid md:grid-cols-2 gap-8 mb-12 text-left">
            <div>
              <h3 className="text-xl font-bold mb-4 font-inter">Potential Collaborations:</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                  Mentor matching programs
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                  Workshop hosting
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                  Award sponsorship
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                  Follow-up program partnership
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 font-inter">Industries We're Targeting:</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Sustainability & CleanTech</li>
                <li>• FinTech & Digital Innovation</li>
                <li>• HealthTech & BioTech</li>
                <li>• Social Impact & EdTech</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-black text-white mb-8 font-inter">
            Ready to Shape Europe's Future?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Request our partner deck or schedule a call to discuss custom opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-black font-bold shadow-lg"
              onClick={handlePartnerRequest}
            >
              Request Partner Deck
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-black font-bold shadow-lg hover:bg-white hover:text-black shadow-lg"
              onClick={() => setShowWaitlistForm(true)}
            >
              Join Waitlist
            </Button>
          </div>
        </div>
      </section>

      {/* Multi-Step Waitlist Form */}
      <WaitlistForm 
        isVisible={showWaitlistForm}
        onClose={() => setShowWaitlistForm(false)}
      />
    </div>
  );
};

export default Partners;

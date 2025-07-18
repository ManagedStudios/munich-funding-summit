import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { CheckCircle, Mail, Calendar, Users } from 'lucide-react';

interface WaitlistConfirmationProps {
  isVisible: boolean;
  onClose: () => void;
  userEmail: string;
}

const WaitlistConfirmation: React.FC<WaitlistConfirmationProps> = ({
  isVisible,
  onClose,
  userEmail
}) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-primary rounded-full flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-black" />
          </div>
          <CardTitle className="text-2xl font-black font-inter text-gray-900">
            Willkommen an Bord! 🎉
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="text-center">
            <p className="text-lg text-gray-700 mb-2">
              Sie sind erfolgreich zur Warteliste hinzugefügt!
            </p>
            <p className="text-sm text-gray-600">
              Bestätigung wurde an <strong>{userEmail}</strong> gesendet
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 space-y-4">
            <h3 className="font-bold text-gray-900 mb-3">Was passiert als nächstes?</h3>
            
            <div className="flex items-start space-x-3">
              <Mail className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-gray-900">Updates erhalten</p>
                <p className="text-sm text-gray-600">
                  Sie erhalten exklusive Updates zu Speakern, Programm und Anmeldung
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Calendar className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-gray-900">Früher Zugang</p>
                <p className="text-sm text-gray-600">
                  Wartelisten-Mitglieder erhalten bevorzugten Zugang zur Anmeldung
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Users className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-gray-900">Exklusive Einladungen</p>
                <p className="text-sm text-gray-600">
                  Vorab-Events und Networking-Möglichkeiten nur für Wartelisten-Mitglieder
                </p>
              </div>
            </div>
          </div>

          <div className="text-center space-y-4">
            <div className="bg-primary/10 rounded-lg p-4">
              <p className="text-sm text-gray-700">
                <strong>Tipp:</strong> Folgen Sie uns auf LinkedIn und Instagram für die neuesten Updates 
                und Behind-the-Scenes Content!
              </p>
            </div>
            
            <div className="flex justify-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open('https://linkedin.com', '_blank')}
              >
                LinkedIn
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open('https://instagram.com', '_blank')}
              >
                Instagram
              </Button>
            </div>
          </div>

          <div className="text-center">
            <Button
              onClick={onClose}
              className="bg-primary hover:bg-primary/90 text-black font-bold w-full"
            >
              Schließen
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WaitlistConfirmation;

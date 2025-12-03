import React from 'react';
import { useApp } from '@/context/AppContext';
import { Language, languageNames } from '@/lib/translations';
import { Recycle, Leaf } from 'lucide-react';

const languages: Language[] = ['en', 'hi', 'kn', 'ta', 'te', 'ml', 'mr', 'bn', 'gu', 'pa', 'or'];

const LanguageSelector: React.FC = () => {
  const { language, setLanguage, t, setStep } = useApp();

  const handleContinue = () => {
    setStep(2);
  };

  return (
    <div className="min-h-screen eco-gradient-radial flex items-center justify-center p-4">
      <div className="w-full max-w-2xl animate-fade-in">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl eco-gradient shadow-lg shadow-primary/30 mb-6 animate-float">
            <Recycle className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            {t.welcome}
          </h1>
          <p className="text-muted-foreground text-lg flex items-center justify-center gap-2">
            <Leaf className="w-5 h-5 text-primary" />
            {t.welcomeSubtitle}
            <Leaf className="w-5 h-5 text-primary" />
          </p>
        </div>

        {/* Language Selection Card */}
        <div className="card-eco p-6 md:p-8">
          <h2 className="text-xl font-semibold text-center mb-6 text-foreground">
            {t.selectLanguage}
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-8">
            {languages.map((lang, index) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`language-btn opacity-0 animate-fade-in stagger-${Math.min(index % 5 + 1, 5)} ${
                  language === lang ? 'language-btn-active' : ''
                }`}
              >
                {languageNames[lang]}
              </button>
            ))}
          </div>

          <button onClick={handleContinue} className="btn-eco w-full">
            {t.continueBtn}
          </button>
        </div>

        {/* Decorative Elements */}
        <div className="flex justify-center mt-8 gap-2">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <div className="w-2 h-2 rounded-full bg-primary/60" />
          <div className="w-2 h-2 rounded-full bg-primary/30" />
        </div>
      </div>
    </div>
  );
};

export default LanguageSelector;

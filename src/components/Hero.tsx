/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Compass, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import heroBg from '../assets/images/laura_hero_bg_1781026625367.png';

interface HeroProps {
  onScrollToSection: (sectionId: string) => void;
}

export default function Hero({ onScrollToSection }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-12 bg-warm-silk"
    >
      {/* Background Image with Elegant Gradient Overlays */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBg}
          alt="Serene daylight filtering through sage leaves, glowing warm light, spiritual atmosphere"
          className="w-full h-full object-cover object-center scale-102 select-none opacity-85"
          referrerPolicy="no-referrer"
        />
        {/* Multilayered radial/linear gradients for soft contrast and seamless integration with warm-silk background */}
        <div className="absolute inset-0 bg-gradient-to-r from-warm-silk/98 via-warm-silk/90 to-transparent md:bg-gradient-to-r" />
        <div className="absolute inset-0 bg-gradient-to-t from-warm-silk via-transparent to-warm-silk/60" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-warm-silk/40 to-warm-silk/95" />
      </div>

      {/* Floating Sparkles in Background for Subtle Ambient Motion */}
      <div className="absolute inset-0 z-1 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-2 h-2 rounded-full bg-satin-gold/35 blur-xs animate-pulse duration-[4000ms]" />
        <div className="absolute top-1/3 right-1/4 w-3.5 h-3.5 rounded-full bg-satin-gold/20 blur-xs animate-pulse duration-[6000ms]" />
        <div className="absolute bottom-1/3 left-1/5 w-2 h-2 rounded-full bg-satin-gold/40 blur-none animate-bounce duration-[8000ms]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12 md:py-24 text-left select-text">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text content */}
          <div className="lg:col-span-7 space-y-6">
            {/* Spiritual Tagline Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-sm bg-sage-forest/5 border border-satin-gold/20 text-sage-forest text-xs tracking-widest uppercase font-bold mb-2 shadow-xs"
            >
              <Compass className="w-3.5 h-3.5 text-satin-gold animate-spin-slow" />
              <span className="font-sans">Laura Olistica • Spazio dell'Anima</span>
            </motion.div>

            {/* Main Title paired with Cormorant Garamond */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.4 }}
              className="font-serif text-5xl sm:text-7xl lg:text-8xl font-light text-charcoal-deep tracking-tight leading-[1.05] mb-4"
            >
              Ritrova il tuo <br />
              <span className="relative inline-block mt-2">
                <span className="font-serif italic text-satin-gold">equilibrio</span>
                <span className="absolute bottom-1 left-0 h-[1.5px] bg-sage-forest/40 w-full rounded-full" />
              </span>{' '}
              interiore.
            </motion.h1>

            {/* Calming subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.6 }}
              className="font-sans text-base sm:text-lg text-sage-forest/90 leading-relaxed max-w-xl mb-8 font-light"
            >
              Trattamenti energetici e percorsi spirituali su misura, ideati per sciogliere i blocchi fisici ed emotivi, risvegliare l'energia vitale e favorire la rinascita di mente e anima.
            </motion.p>

            {/* Call To Actions with rect structure / serif italic */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-5 sm:items-center pt-2"
            >
              <button
                id="hero-cta-treatments"
                onClick={() => onScrollToSection('trattamenti')}
                className="px-8 py-4.5 rounded-sm bg-satin-gold hover:bg-satin-gold-dark text-white font-serif italic text-lg shadow-sm hover:shadow-md transition-all duration-300 transform active:scale-98 cursor-pointer text-center"
              >
                Scopri i Trattamenti
              </button>
              <button
                id="hero-cta-contact"
                onClick={() => onScrollToSection('prenota')}
                className="px-8 py-4.5 rounded-sm bg-transparent border border-satin-gold hover:bg-satin-gold/10 text-charcoal-deep font-serif italic text-lg transition-all duration-300 transform active:scale-98 cursor-pointer text-center flex items-center justify-center space-x-2"
              >
                <Sparkles className="w-4 h-4 text-satin-gold" />
                <span>Chiedi una Consulenza</span>
              </button>
              
              <span className="text-xs uppercase tracking-widest font-bold text-sage-forest/40 italic hidden sm:inline pl-2">
                01 / IL TUO VIAGGIO
              </span>
            </motion.div>
          </div>

          {/* Right ornamental arch design from Design Draft */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="hidden lg:flex lg:col-span-5 relative h-full items-center justify-center min-h-[500px]"
          >
            {/* outer arch frame */}
            <div className="absolute w-[360px] h-[480px] bg-sage-forest/5 rounded-t-full border border-satin-gold/30 translate-x-4 translate-y-4" />
            
            {/* inner arch frame with golden seal */}
            <div className="relative z-10 w-[320px] h-[440px] bg-white border border-[#EDEDE4] rounded-t-full flex flex-col items-center justify-center p-8 text-center shadow-[0_12px_40px_rgba(47,51,48,0.03)]">
              {/* Vertical timeline divider line */}
              <div className="w-px h-16 bg-satin-gold mb-6" />
              
              <p className="font-serif italic text-xl text-charcoal-deep leading-relaxed mb-6">
                "L'anima ha bisogno di silenzio per fiorire."
              </p>
              
              {/* Three elegant dots spacing */}
              <div className="flex gap-2.5">
                <div className="w-2 h-2 rounded-full bg-satin-gold" />
                <div className="w-1.5 h-1.5 rounded-full bg-satin-gold/40" />
                <div className="w-1.5 h-1.5 rounded-full bg-satin-gold/20" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating subtle indicator to scroll */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10 hidden sm:flex flex-col items-center opacity-60">
        <span className="font-sans text-[9px] tracking-widest text-[#8A8F8A] uppercase mb-1">Scorri</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="w-1 h-5 rounded-full bg-satin-gold"
        />
      </div>
    </section>
  );
}

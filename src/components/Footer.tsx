/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Phone, Mail, MapPin, Sparkles, Send, Heart } from 'lucide-react';
import { motion } from 'motion/react';

interface FooterProps {
  onScrollToSection: (sectionId: string) => void;
}

export default function Footer({ onScrollToSection }: FooterProps) {
  const handleItemClick = (id: string) => {
    onScrollToSection(id);
  };

  return (
    <footer className="bg-[#2F3330] text-[#EDEDE4] py-16 relative overflow-hidden">
      {/* Subtle overlay lines */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-satin-gold via-transparent to-sage-forest" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 pb-12 border-b border-white/[0.08]">
          
          {/* Logo & Slogan Column */}
          <div className="md:col-span-4 space-y-4 text-left">
            <div className="flex items-center space-x-2 cursor-pointer group" onClick={() => handleItemClick('hero')}>
              <Sparkles className="w-5 h-5 text-satin-gold" />
              <span className="font-serif text-2xl tracking-widest font-semibold text-white group-hover:text-satin-gold transition-colors duration-300">
                LAURA
              </span>
            </div>
            
            <p className="font-sans text-xs sm:text-sm text-white/70 leading-relaxed font-light">
              Studio di Trattamenti Olistici & Spirituali. Un ponte di sintonizzazione tra corpo, mente ed anima per ridestare la tua naturale frequenza vitale.
            </p>

            <div className="pt-2 font-sans text-xs text-satin-gold-dark font-medium italic block">
              "Fai splendere il tuo nucleo originario."
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-2 space-y-3 text-left">
            <h4 className="font-serif text-sm font-semibold text-white tracking-wider uppercase">Esplora</h4>
            <div className="flex flex-col space-y-2 text-xs sm:text-sm text-white/75 font-light">
              <button onClick={() => handleItemClick('filosofia')} className="cursor-pointer hover:text-satin-gold text-left transition-all">Filosofia</button>
              <button onClick={() => handleItemClick('trattamenti')} className="cursor-pointer hover:text-satin-gold text-left transition-all">I Trattamenti</button>
              <button onClick={() => handleItemClick('chi-sono')} className="cursor-pointer hover:text-satin-gold text-left transition-all">Chi Sono</button>
              <button onClick={() => handleItemClick('recensioni')} className="cursor-pointer hover:text-satin-gold text-left transition-all">Recensioni</button>
              <button onClick={() => handleItemClick('prenota')} className="cursor-pointer hover:text-satin-gold text-left transition-all">Pianifica Sessione</button>
            </div>
          </div>

          {/* Opening Hours Column */}
          <div className="md:col-span-3 space-y-3 text-left font-sans">
            <h4 className="font-serif text-sm font-semibold text-white tracking-wider uppercase">Orari di Ricevimento</h4>
            <ul className="text-xs sm:text-sm text-white/75 space-y-2 font-light">
              <li>Lunedì — Venerdì: <strong className="text-white font-medium">09:00 - 19:30</strong></li>
              <li>Sabato mattina: <strong className="text-white font-medium">09:00 - 13:00</strong></li>
              <li className="text-white/40">Domenica: <strong className="text-satin-gold font-medium">Chiuso per Riposo</strong></li>
              <li className="text-xs text-satin-gold/80 italic pt-1">* Si riceve esclusivamente previo appuntamento.</li>
            </ul>
          </div>

          {/* Direct Address Column */}
          <div className="md:col-span-3 space-y-3 text-left font-sans">
            <h4 className="font-serif text-sm font-semibold text-white tracking-wider uppercase">Contatti & Sede</h4>
            <div className="text-xs sm:text-sm text-white/75 space-y-3.5 font-light">
              <div className="flex items-start">
                <MapPin className="w-4 h-4 text-satin-gold mr-3 flex-shrink-0 mt-0.5" />
                <span>Via dell'Armonia Sottile 11, Firenze, Italia</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-4 h-4 text-satin-gold mr-3 flex-shrink-0" />
                <span>+39 333 0000000</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 text-satin-gold mr-3 flex-shrink-0" />
                <span>laura.trattamenti@benessere.it</span>
              </div>
            </div>
          </div>

        </div>

        {/* copyright row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] font-sans text-white/45 font-light">
          <p>© {new Date().getFullYear()} Laura Trattamenti Energetici & Spirituali • P.IVA 01234567890 • Tutti i diritti riservati.</p>
          <p className="flex items-center mt-2 sm:mt-0">
            <span>Scolpito con</span>
            <Heart className="w-3.5 h-3.5 text-rose-400 mx-1 fill-rose-400" />
            <span>per un riequilibrio interiore</span>
          </p>
        </div>

      </div>
    </footer>
  );
}

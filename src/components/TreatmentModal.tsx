/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { Treatment } from '../types';
import { CATEGORIES } from '../data';
import { X, Clock, Gem, Check, ArrowRight, Heart, Sparkles, Compass } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface TreatmentModalProps {
  treatment: Treatment | null;
  onClose: () => void;
  onBook: (treatmentId: string) => void;
}

export default function TreatmentModal({ treatment, onClose, onBook }: TreatmentModalProps) {
  // Prevent background scroll when modal is open
  useEffect(() => {
    if (treatment) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [treatment]);

  if (!treatment) return null;

  const categoryInfo = CATEGORIES.find(c => c.id === treatment.category);

  const getHeaderIcon = (catId: string) => {
    switch (catId) {
      case 'riequilibrio':
        return <Heart className="w-5 h-5 text-rose-400" />;
      case 'evoluzione':
        return <Compass className="w-5 h-5 text-amber-500" />;
      case 'vibrazionale':
        return <Sparkles className="w-5 h-5 text-emerald-500" />;
      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      <div 
        role="dialog"
        aria-modal="true"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
      >
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#2F3330]/50 backdrop-blur-xs transition-opacity"
        />

        {/* Modal body container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className="relative bg-warm-silk rounded-sm overflow-hidden shadow-[0_25px_60px_-15px_rgba(47,51,48,0.15)] w-full max-w-3xl z-10 border border-satin-gold/20"
        >
          {/* Header Theme Strip */}
          <div className={`h-2.5 w-full ${
            treatment.category === 'riequilibrio' 
              ? 'bg-satin-gold/40' 
              : treatment.category === 'evoluzione' 
              ? 'bg-sage-forest/45' 
              : 'bg-satin-gold'
          }`} />

          {/* Close corner button */}
          <button
            id="close-treatment-modal"
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-sm bg-white hover:bg-warm-silk text-charcoal-deep/60 hover:text-charcoal-deep shadow-xs border border-satin-gold/20 transition-all cursor-pointer"
            aria-label="Chiudi finestra"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="p-6 sm:p-10 max-h-[85vh] overflow-y-auto">
            {/* Meta Category and Stats Row */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <div className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-sm bg-white border border-satin-gold/15 text-xs font-bold text-charcoal-deep shadow-xs">
                {getHeaderIcon(treatment.category)}
                <span className="font-sans uppercase tracking-widest">{categoryInfo?.title}</span>
              </div>
              
              <div className="flex items-center space-x-1 px-3.5 py-1.5 rounded-sm bg-[#EDEDE4] border border-transparent text-xs font-bold text-sage-forest">
                <Clock className="w-3.5 h-3.5 text-satin-gold mr-1" />
                <span className="font-sans">{treatment.duration}</span>
              </div>

              {treatment.price && (
                <div className="flex items-center space-x-1 px-3.5 py-1.5 rounded-sm bg-white border border-satin-gold/30 text-xs font-bold text-satin-gold">
                  <Gem className="w-3.5 h-3.5 mr-1" />
                  <span className="font-sans">{treatment.price} SCAMBIO</span>
                </div>
              )}
            </div>

            {/* Treatment Title */}
            <h3 className="font-serif text-3xl sm:text-4xl text-charcoal-deep font-semibold leading-tight mb-6 select-text">
              {treatment.title}
            </h3>

            {/* Layout division */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              {/* Left 3 cols: Description and Benefits */}
              <div className="md:col-span-3 space-y-6 select-text">
                <div>
                  <h4 className="font-serif text-lg font-semibold text-sage-forest mb-2">
                    L'Essenza del Trattamento
                  </h4>
                  <p className="font-sans text-sm sm:text-base text-sage-forest/90 leading-relaxed font-light">
                    {treatment.fullDesc}
                  </p>
                </div>

                {treatment.ritualStep && (
                  <div className="p-4 bg-white rounded-sm border border-satin-gold/15 shadow-xs">
                    <h5 className="font-sans text-xs uppercase tracking-widest text-[#8A8F8A] font-bold mb-1.5">
                      Come si svolge la seduta
                    </h5>
                    <p className="font-sans text-xs sm:text-sm italic text-charcoal-deep/85 leading-relaxed">
                      {treatment.ritualStep}
                    </p>
                  </div>
                )}

                <div>
                  <h4 className="font-serif text-lg font-semibold text-sage-forest mb-3">
                    Benefici Principali
                  </h4>
                  <ul className="space-y-2.5">
                    {treatment.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start text-xs sm:text-sm text-sage-forest/90">
                        <div className="mr-2.5 mt-1 p-0.5 rounded-sm bg-warm-silk border border-satin-gold/20 text-satin-gold flex-shrink-0">
                          <Check className="w-3 h-3" />
                        </div>
                        <span className="font-sans font-light leading-snug">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right 2 cols: Side card summary */}
              <div className="md:col-span-2 space-y-6">
                <div className="p-6 bg-[#F5F2EA] rounded-sm border border-satin-gold/25 shadow-xs">
                  <h4 className="font-serif text-base font-semibold text-charcoal-deep mb-3">
                    Informazioni Utili
                  </h4>
                  
                  <div className="space-y-4 text-xs sm:text-sm">
                    <div>
                      <span className="font-sans uppercase font-bold text-satin-gold text-[10px] tracking-widest block mb-1">
                        Consigliato per:
                      </span>
                      <p className="font-sans text-sage-forest/90 leading-relaxed italic border-l-2 border-satin-gold pl-2">
                        {treatment.idealFor}
                      </p>
                    </div>

                    <div>
                      <span className="font-sans uppercase font-bold text-satin-gold text-[10px] tracking-widest block mb-1">
                        Abbigliamento consigliato:
                      </span>
                      <p className="font-sans text-sage-forest/80 leading-relaxed font-light">
                        Si suggeriscono indumenti comodi, nei toni del bianco o colori tenui per facilitare la pulizia energetica.
                      </p>
                    </div>

                    <div className="pt-2">
                      <span className="font-sans uppercase font-bold text-satin-gold text-[10px] tracking-widest block mb-1">
                        Sconto Benvenuto:
                      </span>
                      <p className="font-sans text-sage-forest/80 leading-relaxed font-light">
                        Ogni nuovo percorso prevede un colloquio iniziale gratuito di 15 minuti compreso nel prezzo.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Confirm choose action */}
                <button
                  id="book-this-treatment"
                  onClick={() => onBook(treatment.id)}
                  className="cursor-pointer w-full inline-flex items-center justify-center py-4 rounded-sm bg-satin-gold hover:bg-satin-gold-dark text-white font-serif italic text-base shadow-sm hover:shadow-md transition-all duration-300 transform active:scale-98 space-x-2"
                >
                  <span>Metti in Schedulatore</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

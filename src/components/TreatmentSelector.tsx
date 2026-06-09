/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CATEGORIES, TREATMENTS } from '../data';
import { Treatment, CategoryId } from '../types';
import { Clock, Tag, Sparkles, Compass, Heart, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface TreatmentSelectorProps {
  onSelectTreatment: (treatment: Treatment) => void;
  onBookTreatmentDirectly: (treatmentId: string) => void;
}

export default function TreatmentSelector({ 
  onSelectTreatment, 
  onBookTreatmentDirectly 
}: TreatmentSelectorProps) {
  const [activeCategory, setActiveCategory] = useState<CategoryId | 'all'>('all');

  const filteredTreatments = activeCategory === 'all'
    ? TREATMENTS
    : TREATMENTS.filter(t => t.category === activeCategory);

  const getCategoryIcon = (catId: CategoryId) => {
    switch (catId) {
      case 'riequilibrio':
        return <Heart className="w-4 h-4" />;
      case 'evoluzione':
        return <Compass className="w-4 h-4" />;
      case 'vibrazionale':
        return <Sparkles className="w-4 h-4" />;
    }
  };

  return (
    <section id="trattamenti" className="py-24 bg-warm-silk relative scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-sans text-xs tracking-widest text-satin-gold uppercase font-bold block mb-2">
            I Percorsi di Cura
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-charcoal-deep font-semibold tracking-tight mb-4">
            Trattamenti Olistici & Spirituali
          </h2>
          <p className="font-sans text-base text-charcoal-deep/80 leading-relaxed font-light">
            Esplora le discipline e i percorsi studiati per sbloccare il fluire vitale del tuo campo energetico. Scegli l'approccio più affine alle tue esigenze del presente.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-16 max-w-4xl mx-auto">
          <button
            onClick={() => setActiveCategory('all')}
            className={`cursor-pointer px-6 py-3 rounded-sm text-xs sm:text-sm font-sans tracking-widest font-bold uppercase transition-all duration-300 shadow-xs ${
              activeCategory === 'all'
                ? 'bg-sage-forest text-white border border-sage-forest'
                : 'bg-white hover:bg-warm-silk border border-satin-gold/20 text-charcoal-deep'
            }`}
          >
            Tutti i Trattamenti
          </button>
          
          {CATEGORIES.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`cursor-pointer px-6 py-3 rounded-sm text-xs sm:text-sm font-sans tracking-widest font-bold uppercase transition-all duration-300 flex items-center space-x-2 border shadow-xs ${
                activeCategory === category.id
                  ? 'bg-sage-forest text-white border-sage-forest'
                  : 'bg-white hover:bg-warm-silk border-satin-gold/20 text-charcoal-deep'
              }`}
            >
              {getCategoryIcon(category.id)}
              <span>{category.title}</span>
            </button>
          ))}
        </div>

        {/* Category Description Banner (if single selected) */}
        <AnimatePresence mode="wait">
          {activeCategory !== 'all' && (
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="mb-12 p-6 md:p-8 bg-[#F5F2EA] rounded-sm border border-satin-gold/25 max-w-4xl mx-auto text-left flex flex-col md:flex-row gap-6 items-start md:items-center justify-between shadow-xs"
            >
              <div className="flex-1">
                <span className="font-sans text-[10px] uppercase font-bold text-satin-gold tracking-widest block mb-1">
                  Focus Categoria
                </span>
                <p className="font-sans text-sm text-charcoal-deep/90 font-medium mb-2">
                  {CATEGORIES.find(c => c.id === activeCategory)?.description}
                </p>
                <p className="font-sans text-xs text-charcoal-deep/75">
                  <strong className="text-sage-forest font-bold">Ideale per:</strong>{' '}
                  {CATEGORIES.find(c => c.id === activeCategory)?.idealFor}
                </p>
              </div>
              <div className="text-xs font-sans tracking-widest text-satin-gold border border-satin-gold/30 rounded-sm px-4 py-2 bg-white font-bold uppercase">
                {CATEGORIES.find(c => c.id === activeCategory)?.focus.split(', ')[0]}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Treatments Grid Display */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredTreatments.map((treatment) => (
              <motion.div
                key={treatment.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="bg-white rounded-sm border border-[#EDEDE4] hover:border-satin-gold/50 shadow-[0_4px_24px_rgba(47,51,48,0.02)] hover:shadow-[0_12px_36px_rgba(197,160,89,0.05)] transition-all duration-300 flex flex-col justify-between overflow-hidden group h-full"
              >
                {/* Visual Top Accent Indicator by Category with unified spiritual tones */}
                <div className={`h-1.5 w-full ${
                  treatment.category === 'riequilibrio' 
                    ? 'bg-satin-gold/40' 
                    : treatment.category === 'evoluzione' 
                    ? 'bg-sage-forest/45' 
                    : 'bg-satin-gold'
                }`} />

                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Header: Icons and Badges */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-sans text-[10px] tracking-widest text-sage-forest/60 font-bold bg-warm-silk border border-satin-gold/10 px-2.5 py-1 rounded-sm uppercase">
                        {CATEGORIES.find(c => c.id === treatment.category)?.title}
                      </span>
                      
                      <div className="flex items-center space-x-1.5 text-xs text-charcoal-deep/70 bg-warm-silk px-2.5 py-1 rounded-sm border border-satin-gold/10">
                        <Clock className="w-3 h-3 text-satin-gold" />
                        <span className="font-sans font-semibold">{treatment.duration}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="font-serif text-2xl font-semibold text-charcoal-deep leading-snug mb-3 group-hover:text-satin-gold transition-colors duration-200">
                      {treatment.title}
                    </h3>

                    {/* Short description */}
                    <p className="font-sans text-sm text-sage-forest/85 leading-relaxed font-light mb-6 line-clamp-3">
                      {treatment.shortDesc}
                    </p>
                  </div>

                  {/* Highlights section inside card */}
                  <div className="pt-4 border-t border-[#EDEDE4]/60">
                    {/* Ideal for hint */}
                    <p className="font-sans text-xs text-sage-forest/85 mb-6">
                      <strong className="text-charcoal-deep font-bold tracking-wider block mb-1 uppercase text-[10px]">Indicato per:</strong>
                      <span className="italic block pl-2.5 border-l border-satin-gold">{treatment.idealFor}</span>
                    </p>

                    {/* Action Links & Scambio */}
                    <div className="flex items-center justify-between mt-auto">
                      {treatment.price && (
                        <div className="flex items-baseline space-x-0.5">
                          <span className="font-sans text-[10px] font-bold uppercase text-satin-gold tracking-wider mr-1">Scambio:</span>
                          <span className="font-sans text-lg font-bold text-charcoal-deep">{treatment.price}</span>
                        </div>
                      )}
                      
                      <button
                        onClick={() => onSelectTreatment(treatment)}
                        className="cursor-pointer inline-flex items-center text-xs tracking-widest uppercase font-bold text-satin-gold hover:text-satin-gold-dark font-sans transition-colors duration-200"
                      >
                        <span>Approfondisci</span>
                        <ArrowRight className="w-3.5 h-3.5 ml-1 transform group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Direct quick book CTA strip */}
                <button
                  id={`quick-book-${treatment.id}`}
                  onClick={() => onBookTreatmentDirectly(treatment.id)}
                  className="cursor-pointer py-4 text-center bg-warm-silk/60 border-t border-[#EDEDE4] group-hover:bg-satin-gold text-sage-forest/70 group-hover:text-white text-[11px] font-sans font-bold uppercase tracking-widest transition-all duration-300"
                >
                  Scegli e Prenota Ora
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

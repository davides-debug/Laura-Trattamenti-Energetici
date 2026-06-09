/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Heart, Sun, Activity, Star } from 'lucide-react';
import { motion } from 'motion/react';

export default function Philosophy() {
  const cards = [
    {
      id: 'p1',
      icon: Heart,
      title: 'Ascolto Profondo',
      subtitle: 'Il valore dell\'empatia',
      description: 'Ogni seduta inizia con un accogliente spazio di ascolto verbale. Prima di trattare i tuoi corpi energetici, mi dedico a comprendere le risonanze emotive e i vissuti che la tua anima desidera rilasciare.',
      accent: 'text-sage-forest bg-sage-forest/5'
    },
    {
      id: 'p2',
      icon: Activity,
      title: 'Energia Vitale',
      subtitle: 'La forza risorgente',
      description: 'Tramite l\'armonizzazione dei chakra e la fluidificazione dei canali energetici principali, liberiamo le congestioni bioenergetiche accumulate a causa dello stress, ristabilendo la stabilità profonda di mente e corpo.',
      accent: 'text-sage-forest bg-sage-forest/5'
    },
    {
      id: 'p3',
      icon: Sun,
      title: 'Rinascita Interiore',
      subtitle: 'Consapevolezza d\'Anima',
      description: 'Ritornando a vibrare alle giuste frequenze divine, risveglierai lo scopo originario e i talenti spirituali della tua anima, riscoprendo una pace incondizionata che illumina i contesti quotidiani privati e lavorativi.',
      accent: 'text-sage-forest bg-sage-forest/5'
    }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.75, ease: 'easeOut' }
    }
  };

  return (
    <section id="filosofia" className="py-24 bg-sage-pale relative">
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#EDEDE4] to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Intro quote / block */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="flex justify-center mb-6"
          >
            <Star className="w-6 h-6 text-satin-gold" />
          </motion.div>
          
          <motion.blockquote
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="font-serif text-2xl sm:text-3xl italic text-charcoal-deep leading-relaxed px-4 text-center select-text"
          >
            "La guarigione energetica non è l'aggiunta di qualcosa che ti manca, ma il felice rilascio di ciò che non ti appartiene più, per riscoprire la pura armonia e pace che già risiedono in te."
          </motion.blockquote>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-4 flex flex-col items-center"
          >
            <div className="w-12 h-[1px] bg-satin-gold/60 mb-2" />
            <cite className="font-sans text-xs tracking-widest text-[#8A8F8A] uppercase not-italic font-semibold">
              — Laura, Operatrice Olistica e Canale Spirituale
            </cite>
          </motion.div>
        </div>

        {/* 3 Columns Section */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10"
        >
          {cards.map((card) => {
            const IconComponent = card.icon;
            return (
              <motion.div
                key={card.id}
                variants={itemVariants}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="bg-white border border-[#EDEDE4] hover:border-satin-gold/50 rounded-sm p-8 shadow-[0_4px_24px_rgba(47,51,48,0.02)] hover:shadow-[0_12px_36px_rgba(197,160,89,0.05)] transition-all duration-300 relative group overflow-hidden"
              >
                {/* Visual subtle card pattern */}
                <div className="absolute top-0 right-0 -mr-6 -mt-6 w-24 h-24 rounded-full bg-satin-gold/2 group-hover:bg-satin-gold/8 transition-colors duration-300 blur-xl" />
                
                {/* Icon Container with elegant rectangular shape and golden outline */}
                <div className={`w-12 h-12 rounded-sm flex items-center justify-center mb-6 text-satin-gold border border-satin-gold/20 shadow-xs ${card.accent}`}>
                  <IconComponent className="w-5 h-5 text-satin-gold" />
                </div>
                
                {/* Card Titles */}
                <span className="font-sans text-[10px] uppercase tracking-widest text-sage-forest/50 font-bold block mb-1.5 italic">
                  {card.subtitle}
                </span>
                <h3 className="font-serif text-2xl text-charcoal-deep font-semibold mb-4 leading-snug group-hover:text-satin-gold transition-colors duration-200">
                  {card.title}
                </h3>
                
                {/* Card description */}
                <p className="font-sans text-sm text-sage-forest/85 leading-relaxed font-light">
                  {card.description}
                </p>
                
                {/* Elegant subtle bottom bar effect */}
                <div className="absolute bottom-0 left-0 h-[2px] bg-satin-gold w-0 group-hover:w-full transition-all duration-500 ease-out" />
              </motion.div>
            );
          })}
        </motion.div>
        
      </div>
    </section>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Award, ShieldCheck, Heart, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import lauraPortrait from '../assets/images/laura_portrait_1781026890375.png';

export default function AboutLaura() {
  const bioBullets = [
    {
      icon: Award,
      title: 'Master Reiki Unificato',
      desc: 'Formazione solida secondo il metodo tradizionale Usui e integrazioni bioenergetiche moderne.'
    },
    {
      icon: Award,
      title: 'Specialista Campane Tibetane',
      desc: 'Specializzata a Kathmandu in massaggio sonoro armonico e sintonizzazione di campane planetarie.'
    },
    {
      icon: ShieldCheck,
      title: 'Pratica Etica & Protetta',
      desc: 'Nessun dogma imposto. Un ascolto laico, puro, radicato nella scienza del benessere bio-frequenziale.'
    }
  ];

  return (
    <section id="chi-sono" className="py-24 bg-sage-pale/60 relative scroll-mt-12 overflow-hidden">
      {/* Decorative ambient blurred nodes */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 rounded-full bg-satin-gold/3 blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 rounded-full bg-sage-forest/3 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Image with organic curves */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.85 }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative">
              {/* Outer Golden Arch Frameline */}
              <div className="absolute inset-0 border border-satin-gold rounded-t-full translate-x-3.5 translate-y-3.5 z-0" />
              
              {/* Image Container with high shadow & elegant arch shape */}
              <div className="relative z-10 rounded-t-full overflow-hidden shadow-[0_12px_40px_rgba(47,51,48,0.08)] max-w-xs sm:max-w-sm border border-[#EDEDE4]">
                <img
                  src={lauraPortrait}
                  alt="Laura, Operatrice Olistica e Consulente Spirituale"
                  className="w-full h-auto object-cover transform hover:scale-102 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />
                
                {/* Embedded badge over photo */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur-xs py-2.5 px-4 rounded-sm shadow-sm border border-satin-gold/20 text-center w-[85%]">
                  <p className="font-serif text-sm font-bold text-charcoal-deep">Laura, Operatrice Olistica</p>
                  <p className="font-sans text-[9px] text-satin-gold font-bold uppercase tracking-widest mt-0.5">Spazio d'Anima</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Bio Details */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.85, delay: 0.15 }}
            className="lg:col-span-7 space-y-6 text-left select-text"
          >
            <div>
              <span className="font-sans text-xs tracking-widest text-[#8A8F8A] uppercase font-bold block mb-2">
                Chi si prenderà cura di te
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-charcoal-deep font-semibold tracking-tight leading-tight">
                Il mio nome è Laura, <br />
                <span className="text-sage-forest italic font-serif">custode del tuo viaggio.</span>
              </h2>
            </div>

            <p className="font-sans text-sm sm:text-base text-charcoal-deep/80 leading-relaxed font-light">
              Fin da bambina ho avvertito che la realtà materiale è abbracciata da un sottile mare di energie invisibili. Il mio percorso di risveglio spirituale mi ha spinto a viaggiare, studiare e codificare l'interazione tra intenzione, suono armonico e materia cristallina.
            </p>

            <p className="font-sans text-sm text-charcoal-deep/75 leading-relaxed font-light">
              Il mio studio nasce per essere un’oasi di decompressione: un luogo sacro immune dal giudizio e dai ritmi serrati del mondo esterno, in cui il silenzio, il profumo delle resine naturali e le onde vibrazionali ti guideranno dolcemente a riallineare i tuoi corpi sottili con la parte più nobile e dimenticata del tuo essere.
            </p>

            {/* Certification / Accreditation Bullets */}
            <div className="pt-6 border-t border-[#EDEDE4]/80 space-y-5">
              {bioBullets.map((b, i) => {
                const IconComponent = b.icon;
                return (
                  <div key={i} className="flex items-start">
                    <div className="mr-3.5 mt-0.5 p-2 rounded-sm bg-warm-silk text-satin-gold border border-satin-gold/20 flex-shrink-0 animate-pulse">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-sans text-xs sm:text-sm font-bold text-charcoal-deep uppercase tracking-widest">
                        {b.title}
                      </h4>
                      <p className="font-sans text-xs sm:text-sm text-sage-forest/80 font-light mt-1 leading-relaxed">
                        {b.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            
          </motion.div>

        </div>
      </div>
    </section>
  );
}

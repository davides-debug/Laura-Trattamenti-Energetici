/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { TESTIMONIALS } from '../data';
import { Star, MessageSquare } from 'lucide-react';
import { motion } from 'motion/react';

export default function Testimonials() {
  return (
    <section id="recensioni" className="py-24 bg-warm-silk relative border-t border-b border-[#EDEDE4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="font-sans text-xs tracking-widest text-satin-gold uppercase font-bold block mb-2">
            La Parola agli Ospiti
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-charcoal-deep font-semibold tracking-tight mb-4">
            Testimonianze di Luce
          </h2>
          <p className="font-sans text-sm sm:text-base text-charcoal-deep/80 leading-relaxed font-light">
            Leggi le parole e le esperienze condivise da chi ha sperimentato l'ascolto e i percorsi energetici condotti da Laura.
          </p>
        </div>

        {/* Testimonials layout grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {TESTIMONIALS.map((t, idx) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="bg-[#F5F2EA] border border-satin-gold/15 rounded-sm p-6 sm:p-8 shadow-[0_4px_24px_rgba(47,51,48,0.02)] relative flex flex-col justify-between"
            >
              <div>
                {/* Rating stars */}
                <div className="flex items-center space-x-1 mb-5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-satin-gold text-satin-gold" />
                  ))}
                </div>

                {/* Testimonial body text */}
                <p className="font-sans text-sm sm:text-base italic text-charcoal-deep/85 leading-relaxed font-light mb-6">
                  "{t.text}"
                </p>
              </div>

              {/* Author bio details */}
              <div className="pt-4 border-t border-[#EDEDE4] mt-auto">
                <h4 className="font-sans text-sm font-semibold text-charcoal-deep block leading-none mb-1">
                  {t.name}
                </h4>
                <span className="font-sans text-[10px] uppercase font-bold tracking-wider text-sage-forest bg-sage-light/50 px-2 py-0.5 rounded-sm inline-block">
                  {t.treatmentName}
                </span>
              </div>

              {/* Graphic watermark */}
              <div className="absolute top-6 right-6 text-satin-gold/10">
                <MessageSquare className="w-8 h-8" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Disclaimer row */}
        <p className="text-center font-sans text-[11px] text-[#8A8F8A] mt-12 italic max-w-lg mx-auto">
          * Le testimonianze sono tratte da interviste reali redatte su autorizzazione. Gli effetti dei trattamenti variano a seconda della recettività individuale di ogni corpo sottile.
        </p>

      </div>
    </section>
  );
}

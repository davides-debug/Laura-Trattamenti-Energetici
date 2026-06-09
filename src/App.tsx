/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Philosophy from './components/Philosophy';
import TreatmentSelector from './components/TreatmentSelector';
import TreatmentModal from './components/TreatmentModal';
import InteractiveScheduler from './components/InteractiveScheduler';
import Testimonials from './components/Testimonials';
import AboutLaura from './components/AboutLaura';
import Footer from './components/Footer';
import { Treatment } from './types';

export default function App() {
  const [selectedTreatmentForModal, setSelectedTreatmentForModal] = useState<Treatment | null>(null);
  const [preselectedTreatmentId, setPreselectedTreatmentId] = useState<string>('');

  // Smooth scrolls helper
  const handleScrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Triggered when booking a treatment from detail modal or card lists
  const handleBookTreatment = (treatmentId: string) => {
    setSelectedTreatmentForModal(null); // Close the detail popup
    setPreselectedTreatmentId(treatmentId); // Pre-fill dropdown option
    
    // Smooth-scroll down to prenota section
    setTimeout(() => {
      handleScrollToSection('prenota');
    }, 150);
  };

  return (
    <div className="min-h-screen bg-warm-silk text-charcoal-deep font-sans selection:bg-satin-gold/25 antialiased">
      {/* Decorative top-most energy line */}
      <div className="h-1 bg-gradient-to-r from-satin-gold via-sage-forest to-satin-gold w-full fixed top-0 left-0 right-0 z-100" />

      {/* Sticky Header */}
      <Navbar onScrollToSection={handleScrollToSection} />

      {/* Hero Banner */}
      <Hero onScrollToSection={handleScrollToSection} />

      {/* Core Values & Quote philosophy */}
      <Philosophy />

      {/* Multi-category Treatment catalog search/explorer */}
      <TreatmentSelector 
        onSelectTreatment={setSelectedTreatmentForModal}
        onBookTreatmentDirectly={handleBookTreatment}
      />

      {/* Dynamic detailed view popup */}
      <TreatmentModal
        treatment={selectedTreatmentForModal}
        onClose={() => setSelectedTreatmentForModal(null)}
        onBook={handleBookTreatment}
      />

      {/* Detailed interactive booking calendar for June 2026 */}
      <InteractiveScheduler
        preselectedTreatmentId={preselectedTreatmentId}
        onSetPreselectedTreatmentId={setPreselectedTreatmentId}
      />

      {/* Testimonials Review Section */}
      <Testimonials />

      {/* Biography and certifications of Laura */}
      <AboutLaura />

      {/* Footer Details */}
      <Footer onScrollToSection={handleScrollToSection} />
    </div>
  );
}

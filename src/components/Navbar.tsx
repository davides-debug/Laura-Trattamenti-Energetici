/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  onScrollToSection: (sectionId: string) => void;
}

export default function Navbar({ onScrollToSection }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Filosofia', id: 'filosofia' },
    { label: 'Trattamenti', id: 'trattamenti' },
    { label: 'Chi Sono', id: 'chi-sono' },
    { label: 'Recensioni', id: 'recensioni' },
  ];

  const handleItemClick = (id: string) => {
    onScrollToSection(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#F9F7F2]/80 backdrop-blur-md shadow-sm border-b border-[#EDEDE4]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo / Branding */}
          <div 
            onClick={() => handleItemClick('hero')} 
            className="flex items-center space-x-2 cursor-pointer group"
          >
            <Sparkles className="w-5 h-5 text-satin-gold transition-transform duration-500 group-hover:rotate-12" />
            <span className="font-serif text-2xl tracking-widest text-charcoal-deep font-semibold group-hover:text-sage-forest transition-colors duration-300">
              LAURA
            </span>
            <span className="hidden sm:inline font-sans text-[10px] tracking-wider text-satin-gold uppercase pt-1">
              Trattamenti Olistici
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className="font-sans text-sm tracking-wide text-charcoal-deep/80 hover:text-sage-forest font-medium transition-colors duration-200 cursor-pointer relative py-2 group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-satin-gold transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
            
            <button
              id="nav-cta-booking"
              onClick={() => handleItemClick('prenota')}
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-sm border border-satin-gold text-charcoal-deep hover:text-white bg-transparent hover:bg-satin-gold font-sans text-xs uppercase tracking-widest font-bold transition-all duration-300 shadow-xs cursor-pointer hover:shadow-sm active:scale-95 space-x-2"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Prenota Sessione</span>
            </button>
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-charcoal-deep/80 hover:text-sage-forest focus:outline-none cursor-pointer"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-[#F9F7F2] border-b border-[#EDEDE4] px-4 pt-2 pb-6 space-y-4 shadow-lg"
          >
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className="w-full text-left font-sans text-base py-2.5 px-3 rounded-lg text-charcoal-deep hover:bg-sage-light hover:text-sage-forest font-medium transition-all"
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-2 border-t border-[#EDEDE4]">
                <button
                  onClick={() => handleItemClick('prenota')}
                  className="w-full inline-flex items-center justify-center py-3 rounded-sm bg-satin-gold text-white font-sans text-xs uppercase tracking-widest font-bold transition-all cursor-pointer shadow-xs active:scale-95"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Prenota Sessione
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { TREATMENTS } from '../data';
import { Appointment } from '../types';
import { Calendar as CalendarIcon, Clock, User, Phone, Mail, FileText, CheckCircle2, ChevronRight, XCircle, Trash2, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface InteractiveSchedulerProps {
  preselectedTreatmentId?: string;
  onSetPreselectedTreatmentId?: (id: string) => void;
}

export default function InteractiveScheduler({ 
  preselectedTreatmentId,
  onSetPreselectedTreatmentId
}: InteractiveSchedulerProps) {
  // Booking state
  const [selectedTreatmentId, setSelectedTreatmentId] = useState<string>('');
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [note, setNote] = useState('');
  
  // Wizards state step: 1 = Service, 2 = Date/Time, 3 = Personal Info, 4 = Success Receipt
  const [step, setStep] = useState<number>(1);
  const [recentBooking, setRecentBooking] = useState<Appointment | null>(null);
  const [savedBookings, setSavedBookings] = useState<Appointment[]>([]);

  // Selected treatment object
  const currentTreatment = TREATMENTS.find(t => t.id === selectedTreatmentId);

  // Sync props change
  useEffect(() => {
    if (preselectedTreatmentId) {
      setSelectedTreatmentId(preselectedTreatmentId);
      setStep(1); // Keep them on step 1 to review the selection, or push to step 2
    }
  }, [preselectedTreatmentId]);

  // Load bookings from localstorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('laura_bookings');
      if (stored) {
        setSavedBookings(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load localstorage bookings", e);
    }
  }, []);

  // Save bookings helper
  const saveToLocalStorage = (newList: Appointment[]) => {
    try {
      localStorage.setItem('laura_bookings', JSON.stringify(newList));
      setSavedBookings(newList);
    } catch (e) {
      console.error("Failed to save localstorage bookings", e);
    }
  };

  // June 2026 calendar specs (June 1st is Monday, 30 Days)
  const totalDays = 30;
  const monthName = "Giugno 2026";
  const currentLocalDay = 9; // Based on local date 2026-06-09
  const weekdays = ["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"];

  // Slot timing selection list
  const getAvailableSlots = (dayNum: number) => {
    const isSaturday = dayNum % 7 === 6; // 6, 13, 20, 27 are Saturdays
    if (isSaturday) {
      return ["09:30", "11:00", "12:30"];
    }
    return ["09:30", "11:00", "14:30", "16:00", "17:30", "19:00"];
  };

  const handleDaySelect = (dayNum: number) => {
    setSelectedDay(dayNum);
    setSelectedTime('');
  };

  // Check if date can be booked (past days and Sundays are blocked)
  const isDaySelectable = (dayNum: number) => {
    if (dayNum <= currentLocalDay) return false; // Past or today (same-day booking blocked)
    const isSunday = dayNum % 7 === 0; // June 7, 14, 21, 28 are Sundays
    if (isSunday) return false;
    return true;
  };

  // Form validations for Step 1 & 2
  const isStep1Valid = !!selectedTreatmentId;
  const isStep2Valid = selectedDay !== null && !!selectedTime;
  const isStep3Valid = name.trim().length >= 3 && email.includes('@') && phone.trim().length >= 6;

  const handleNextStep = () => {
    if (step === 1 && isStep1Valid) setStep(2);
    else if (step === 2 && isStep2Valid) setStep(3);
  };

  const handlePrevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isStep3Valid || !selectedDay || !currentTreatment) return;

    // Form appointment details
    const newBooking: Appointment = {
      id: 'book_' + Date.now(),
      treatmentId: selectedTreatmentId,
      treatmentTitle: currentTreatment.title,
      date: `${selectedDay} Giugno 2026`,
      time: selectedTime,
      clientName: name,
      clientEmail: email,
      clientPhone: phone,
      notes: note,
      createdAt: new Date().toISOString()
    };

    const updatedList = [newBooking, ...savedBookings];
    saveToLocalStorage(updatedList);
    setRecentBooking(newBooking);
    setStep(4); // Show spiritual receipt!
    
    // Cleanup parent prop if we booked successfully
    if (onSetPreselectedTreatmentId) {
      onSetPreselectedTreatmentId('');
    }
  };

  const handleCancelBooking = (bookingId: string) => {
    if (window.confirm("Sei sicuro di voler disdire questa sessione di trattamento energetico?")) {
      const filtered = savedBookings.filter(b => b.id !== bookingId);
      saveToLocalStorage(filtered);
    }
  };

  // Reset form to book another session
  const resetForm = () => {
    setSelectedTreatmentId('');
    setSelectedDay(null);
    setSelectedTime('');
    setName('');
    setEmail('');
    setPhone('');
    setNote('');
    setRecentBooking(null);
    setStep(1);
  };

  // Generate WhatsApp message string
  const getWhatsAppMessage = (b: Appointment) => {
    const text = `Ciao Laura, sono ${b.clientName}. Desidero richiedere la conferma per il trattamento "${b.treatmentTitle}" prenotato tramite il sito per il giorno ${b.date} alle ore ${b.time}. Grazie!`;
    return `https://wa.me/393330000000?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="prenota" className="py-24 bg-sage-pale scroll-mt-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Title Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="font-sans text-xs tracking-widest text-[#8A8F8A] font-bold uppercase block mb-2">
            Schedulatore Olistico
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-charcoal-deep font-semibold tracking-tight mb-4">
            Pianifica la tua Sessione
          </h2>
          <p className="font-sans text-sm sm:text-base text-charcoal-deep/85 leading-relaxed font-light">
            Scegli il tuo trattamento, seleziona la data del calendario e compila i tuoi dettagli per riservare il tuo spazio di rilascio energetico.
          </p>
        </div>

        {/* Wizard Multi-step Indicator */}
        {step < 4 && (
          <div className="flex items-center justify-center space-x-2 md:space-x-4 mb-10 select-none">
            {[
              { num: 1, label: "Trattamento" },
              { num: 2, label: "Data & Ora" },
              { num: 3, label: "Dati & Note" }
            ].map((s) => (
              <React.Fragment key={s.num}>
                <div className="flex items-center space-x-2">
                  <div className={`w-8 h-8 rounded-sm flex items-center justify-center text-xs font-bold transition-all ${
                    step === s.num
                      ? 'bg-sage-forest text-white shadow-xs'
                      : step > s.num
                      ? 'bg-satin-gold text-white'
                      : 'bg-white border border-[#EDEDE4] text-charcoal-deep/50'
                  }`}>
                    {s.num}
                  </div>
                  <span className={`font-sans text-xs hidden sm:inline ${
                    step === s.num ? 'font-semibold text-charcoal-deep' : 'text-charcoal-deep/60'
                  }`}>
                    {s.label}
                  </span>
                </div>
                {s.num < 3 && (
                  <ChevronRight className="w-4 h-4 text-charcoal-deep/20" />
                )}
              </React.Fragment>
            ))}
          </div>
        )}

        {/* Wizard Core Content Box */}
        <div className="bg-white rounded-sm border border-[#EDEDE4] shadow-[0_8px_32px_rgba(47,51,48,0.02)] p-6 sm:p-10 mb-12">
          
          <AnimatePresence mode="wait">
            
            {/* STEP 1: Treatment Choice */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.25 }}
                className="space-y-6 text-left"
              >
                <div>
                  <label htmlFor="treatment-selector" className="font-serif text-lg font-semibold text-sage-forest block mb-3">
                    Seleziona un Trattamento Energetico o Spirituale
                  </label>
                  <p className="font-sans text-xs text-[#8A8F8A] mb-4">
                    Scegli uno dei trattamenti disponibili per visualizzarne la durata complessiva e attivare il calendario.
                  </p>
                  
                  <select
                    id="treatment-selector"
                    value={selectedTreatmentId}
                    onChange={(e) => {
                      setSelectedTreatmentId(e.target.value);
                      if (onSetPreselectedTreatmentId) onSetPreselectedTreatmentId('');
                    }}
                    className="w-full font-sans text-sm rounded-sm border border-[#EDEDE4] bg-[#F9F7F2]/50 p-4 text-charcoal-deep font-semibold focus:border-satin-gold focus:ring-1 focus:ring-satin-gold outline-none transition-all cursor-pointer"
                  >
                    <option value="" disabled>-- Scegli un Trattamento --</option>
                    <optgroup label="Riequilibrio Energetico">
                      {TREATMENTS.filter(t => t.category === 'riequilibrio').map(t => (
                        <option key={t.id} value={t.id}>{t.title} ({t.duration} - {t.price})</option>
                      ))}
                    </optgroup>
                    <optgroup label="Evoluzione Spirituale">
                      {TREATMENTS.filter(t => t.category === 'evoluzione').map(t => (
                        <option key={t.id} value={t.id}>{t.title} ({t.duration} - {t.price})</option>
                      ))}
                    </optgroup>
                    <optgroup label="Guarigione Vibrazionale">
                      {TREATMENTS.filter(t => t.category === 'vibrazionale').map(t => (
                        <option key={t.id} value={t.id}>{t.title} ({t.duration} - {t.price})</option>
                      ))}
                    </optgroup>
                  </select>
                </div>

                {currentTreatment && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-5 bg-sage-pale rounded-sm border border-satin-gold/25 flex items-start space-x-4"
                  >
                    <div className="pt-0.5 text-satin-gold">
                      <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                    </div>
                    <div>
                      <h4 className="font-serif text-base font-semibold text-charcoal-deep mb-1">
                        Dettaglio Scelta: {currentTreatment.title}
                      </h4>
                      <p className="font-sans text-xs sm:text-sm text-charcoal-deep/75 leading-relaxed font-light mb-2">
                        {currentTreatment.shortDesc}
                      </p>
                      <div className="flex items-center space-x-4 text-xs font-semibold text-sage-forest">
                        <span className="bg-white px-2.5 py-1 rounded-sm border border-[#EDEDE4]">Durata: {currentTreatment.duration}</span>
                        {currentTreatment.price && (
                          <span className="bg-white px-2.5 py-1 rounded-sm border border-[#EDEDE4]">Scambio: {currentTreatment.price}</span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Navigation Button */}
                <div className="pt-4 flex justify-end">
                  <button
                    id="wizard-step1-next"
                    disabled={!isStep1Valid}
                    onClick={handleNextStep}
                    className="cursor-pointer inline-flex items-center justify-center px-6 py-3 rounded-sm bg-sage-forest text-white font-sans text-xs font-bold uppercase tracking-wider transition-all shadow-xs hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer active:scale-95 space-x-1.5"
                  >
                    <span>Continua</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 2: Calendar & Slot picker */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.25 }}
                className="space-y-8 text-left"
              >
                <div>
                  <h4 className="font-serif text-lg font-semibold text-sage-forest mb-1">
                    Scegli Giorno e Ora
                  </h4>
                  <p className="font-sans text-xs text-[#8A8F8A] mb-5">
                    Seleziona un giorno disponibile in <strong className="text-charcoal-deep">{monthName}</strong> (i giorni passati e le domeniche di riposo non sono selezionabili).
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                    
                    {/* June Calendar grid column (7 columns on grid layout) */}
                    <div className="md:col-span-7">
                      <div className="flex items-center justify-between mb-3 bg-sage-pale rounded-lg px-4 py-2 border border-black/[0.01]">
                        <span className="font-sans text-xs font-bold text-sage-forest uppercase tracking-widest">{monthName}</span>
                        <span className="font-sans text-[10px] uppercase text-[#8A8F8A] font-semibold">Consulenze in Sede & Online</span>
                      </div>
                      
                      {/* Weekday headers */}
                      <div className="grid grid-cols-7 gap-1 text-center mb-1.5">
                        {weekdays.map((w, i) => (
                          <span key={i} className={`font-sans text-[10px] font-bold uppercase ${w === 'Dom' ? 'text-red-400' : 'text-charcoal-deep/60'}`}>
                            {w}
                          </span>
                        ))}
                      </div>

                      {/* Days grid June 2026 (Starts Monday, 30 Days) */}
                      <div className="grid grid-cols-7 gap-1.5 select-none">
                        {Array.from({ length: totalDays }, (_, i) => {
                          const dayNum = i + 1;
                          const selectable = isDaySelectable(dayNum);
                          const isSunday = dayNum % 7 === 0;
                          const isSelected = selectedDay === dayNum;

                          return (
                            <button
                              key={i}
                              type="button"
                              id={`calendar-day-${dayNum}`}
                              disabled={!selectable}
                              onClick={() => handleDaySelect(dayNum)}
                              className={`aspect-square sm:p-2 flex flex-col items-center justify-center rounded-sm text-xs sm:text-sm font-sans tracking-wide transition-all ${
                                isSelected
                                  ? 'bg-satin-gold text-white font-bold scale-102 ring-2 ring-satin-gold/40'
                                  : selectable
                                  ? 'bg-[#F9F7F2] border border-[#EDEDE4] text-charcoal-deep hover:bg-sage-light hover:border-satin-gold/20 font-medium cursor-pointer'
                                  : isSunday
                                  ? 'bg-rose-50 text-red-300 border border-rose-100/50 cursor-not-allowed'
                                  : 'bg-black/[0.02] text-black/20 cursor-not-allowed border border-transparent'
                              }`}
                            >
                              <span>{dayNum}</span>
                              {isSunday && (
                                <span className="text-[7px] text-red-400/80 uppercase font-semibold hidden sm:inline leading-none font-sans">Chiuse</span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Time Slots column */}
                    <div className="md:col-span-5 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center space-x-1.5 mb-3">
                          <Clock className="w-4 h-4 text-satin-gold" />
                          <h5 className="font-serif text-sm font-bold text-charcoal-deep uppercase tracking-wider">Ora della sessione</h5>
                        </div>
                        
                        {selectedDay ? (
                          <div className="space-y-4">
                            <p className="font-sans text-xs text-charcoal-deep/80 leading-relaxed font-light">
                              Orari disponibili per il <strong className="text-sage-forest">{selectedDay} Giugno 2026</strong>:
                            </p>
                            
                            <div className="grid grid-cols-3 gap-2">
                              {getAvailableSlots(selectedDay).map((slot) => {
                                const isTimeSelected = selectedTime === slot;
                                return (
                                  <button
                                    key={slot}
                                    type="button"
                                    id={`time-slot-${slot.replace(':', '-')}`}
                                    onClick={() => setSelectedTime(slot)}
                                    className={`cursor-pointer border py-2.5 rounded-sm text-xs font-sans tracking-wide transition-all ${
                                      isTimeSelected
                                        ? 'bg-sage-forest text-white border-sage-forest font-bold shadow-xs'
                                        : 'bg-white hover:bg-sage-light border-[#EDEDE4] text-charcoal-deep font-semibold'
                                    }`}
                                  >
                                    {slot}
                                  </button>
                                );
                              })}
                            </div>
                            
                            <div className="p-3 bg-warm-silk rounded-sm text-[10px] text-charcoal-deep/75 font-light leading-relaxed border border-satin-gold/15">
                              * Ogni seduta è programmata per assicurare ventilazione, sanificazione e purificazione rituale dello studio tra un paziente e l'altro.
                            </div>
                          </div>
                        ) : (
                          <div className="flex-1 flex flex-col items-center justify-center p-6 bg-warm-silk rounded-sm border border-[#EDEDE4]/60 text-center h-[200px]">
                            <CalendarIcon className="w-8 h-8 text-[#8A8F8A]/40 mb-2" />
                            <p className="font-sans text-xs text-[#8A8F8A] italic leading-normal">
                              Seleziona un giorno idoneo sul calendario per esporre le fasce orarie libere.
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                  </div>
                </div>

                {/* Back and Forward Step Actions */}
                <div className="pt-4 border-t border-[#EDEDE4] flex items-center justify-between">
                  <button
                    id="wizard-step2-back"
                    onClick={handlePrevStep}
                    className="cursor-pointer px-5 py-2.5 rounded-sm border border-[#EDEDE4] text-charcoal-deep/80 hover:bg-sage-pale font-sans text-xs uppercase tracking-widest font-bold transition-all"
                  >
                    Indietro
                  </button>
                  <button
                    id="wizard-step2-next"
                    disabled={!isStep2Valid}
                    onClick={handleNextStep}
                    className="inline-flex items-center justify-center px-6 py-3 rounded-sm bg-sage-forest text-white font-sans text-xs font-bold uppercase tracking-widest transition-all shadow-xs hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer active:scale-95 space-x-1.5"
                  >
                    <span>Continua</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: Personal Credentials */}
            {step === 3 && (
              <motion.form
                key="step3"
                onSubmit={handleFormSubmit}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.25 }}
                className="space-y-6 text-left"
              >
                <div>
                  <h4 className="font-serif text-lg font-semibold text-sage-forest mb-1">
                    I Tuoi Riferimenti
                  </h4>
                  <p className="font-sans text-xs text-[#8A8F8A] mb-5">
                    Compila i tuoi recapiti reali. Laura ti risponderà con i chiarimenti logistici e l'indirizzo esatto dello studio.
                  </p>

                  <div className="space-y-4">
                    {/* Full Name */}
                    <div>
                      <label htmlFor="client-name" className="font-sans text-xs font-bold text-charcoal-deep block mb-1.5 uppercase tracking-wider">
                        Nome Completo *
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8A8F8A]">
                          <User className="w-4 h-4" />
                        </div>
                        <input
                          id="client-name"
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="es. Francesca Rossi"
                          className="w-full font-sans text-sm rounded-sm border border-[#EDEDE4] bg-white p-3.5 pl-10 text-charcoal-deep focus:border-satin-gold focus:ring-1 focus:ring-satin-gold outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Email */}
                      <div>
                        <label htmlFor="client-email" className="font-sans text-xs font-bold text-charcoal-deep block mb-1.5 uppercase tracking-wider">
                          Indirizzo Email *
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8A8F8A]">
                            <Mail className="w-4 h-4" />
                          </div>
                          <input
                            id="client-email"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="es. f.rossi@email.it"
                            className="w-full font-sans text-sm rounded-sm border border-[#EDEDE4] bg-white p-3.5 pl-10 text-charcoal-deep focus:border-satin-gold focus:ring-1 focus:ring-satin-gold outline-none transition-all"
                          />
                        </div>
                      </div>

                      {/* Phone */}
                      <div>
                        <label htmlFor="client-phone" className="font-sans text-xs font-bold text-charcoal-deep block mb-1.5 uppercase tracking-wider">
                          Telefono Cellulare (WhatsApp) *
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8A8F8A]">
                            <Phone className="w-4 h-4" />
                          </div>
                          <input
                            id="client-phone"
                            type="tel"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="es. 333 1234567"
                            className="w-full font-sans text-sm rounded-sm border border-[#EDEDE4] bg-white p-3.5 pl-10 text-charcoal-deep focus:border-satin-gold focus:ring-1 focus:ring-satin-gold outline-none transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Personal intent / note */}
                    <div>
                      <label htmlFor="client-notes" className="font-sans text-xs font-bold text-charcoal-deep block mb-1.5 uppercase tracking-wider">
                        Intento o eventuali note personali (Opzionale)
                      </label>
                      <div className="relative">
                        <div className="absolute top-3.5 left-3.5 text-[#8A8F8A]">
                          <FileText className="w-4 h-4" />
                        </div>
                        <textarea
                          id="client-notes"
                          rows={3}
                          value={note}
                          onChange={(e) => setNote(e.target.value)}
                          placeholder="es. Sento molta rigidità al collo / Desidero chiarire un blocco affettivo / È il mio primo trattamento..."
                          className="w-full font-sans text-sm rounded-sm border border-[#EDEDE4] bg-white p-3.5 pl-10 text-charcoal-deep focus:border-satin-gold focus:ring-1 focus:ring-satin-gold outline-none transition-all resize-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-sage-light/40 border border-sage-forest/10 rounded-sm mt-6 text-xs text-charcoal-deep/70">
                    🔒 <strong className="text-sage-forest font-semibold">Informativa Riservatezza:</strong> I tuoi dati vengono custoditi con il massimo segreto professionale spirituale. Non saranno mai condivisi né usati per scopi pubblicitari.
                  </div>
                </div>

                {/* Back and confirm Submit actions */}
                <div className="pt-4 border-t border-[#EDEDE4] flex items-center justify-between">
                  <button
                    id="wizard-step3-back"
                    type="button"
                    onClick={handlePrevStep}
                    className="cursor-pointer px-5 py-2.5 rounded-sm border border-[#EDEDE4] text-charcoal-deep/80 hover:bg-sage-pale font-sans text-xs uppercase tracking-widest font-bold transition-all"
                  >
                    Indietro
                  </button>
                  <button
                    id="wizard-step3-submit"
                    type="submit"
                    disabled={!isStep3Valid}
                    className="cursor-pointer inline-flex items-center justify-center px-8 py-3.5 rounded-sm bg-satin-gold text-white font-sans text-xs font-bold uppercase tracking-widest hover:bg-satin-gold-dark transition-all shadow-md hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer active:scale-95 space-x-2"
                  >
                    <span>Conferma e Prenota</span>
                    <CheckCircle2 className="w-4.5 h-4.5" />
                  </button>
                </div>
              </motion.form>
            )}

            {/* STEP 4: Success - Golden Spiritual Receipt */}
            {step === 4 && recentBooking && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-6"
              >
                {/* Gold Seal Graphic */}
                <div className="flex flex-col items-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.1, 1] }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="w-16 h-16 rounded-sm bg-satin-gold/20 flex items-center justify-center text-satin-gold mb-3 border border-satin-gold/40 shadow-xs"
                  >
                    <CheckCircle2 className="w-10 h-10 text-satin-gold-dark" />
                  </motion.div>
                  <span className="font-sans text-[10px] uppercase font-bold tracking-widest text-satin-gold">Sessione Riservata</span>
                  <h4 className="font-serif text-2xl sm:text-3xl font-semibold text-sage-forest mt-1">Prenotazione Inoltrata!</h4>
                </div>

                {/* Receipt Card */}
                <div className="mx-auto max-w-md p-6 bg-[#F5F2EA] rounded-sm border border-satin-gold/30 text-left space-y-4">
                  <div className="flex justify-between items-center text-[10px] font-sans text-[#8A8F8A] border-b border-[#EDEDE4] pb-2">
                    <span>CODICE: {recentBooking.id.substring(5, 12).toUpperCase()}</span>
                    <span>{new Date(recentBooking.createdAt).toLocaleDateString('it-IT')}</span>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <span className="font-sans text-[9px] uppercase font-bold tracking-wider text-[#8A8F8A] block">Trattamento:</span>
                      <span className="font-sans text-sm font-semibold text-charcoal-deep">{recentBooking.treatmentTitle}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="font-sans text-[9px] uppercase font-bold tracking-wider text-[#8A8F8A] block">Data pianificata:</span>
                        <span className="font-sans text-sm font-semibold text-charcoal-deep">{recentBooking.date}</span>
                      </div>
                      <div>
                        <span className="font-sans text-[9px] uppercase font-bold tracking-wider text-[#8A8F8A] block">Ora stabilita:</span>
                        <span className="font-sans text-sm font-semibold text-charcoal-deep">{recentBooking.time}</span>
                      </div>
                    </div>

                    <div>
                      <span className="font-sans text-[9px] uppercase font-bold tracking-wider text-[#8A8F8A] block">Nominativo ospite:</span>
                      <span className="font-sans text-sm font-medium text-charcoal-deep">{recentBooking.clientName}</span>
                    </div>
                  </div>

                  {/* Spiritual Advices */}
                  <div className="pt-3 border-t border-black/[0.05]">
                    <span className="font-serif text-xs font-bold text-sage-forest block mb-1.5">Preparazione consigliata prima del trattamento:</span>
                    <ul className="text-[11px] font-sans text-[#8A8F8A] space-y-1 leading-normal font-light list-disc list-inside">
                      <li>Bevi un bicchiere d'acqua naturale un'ora prima per favorire la risonanza bioenergetica.</li>
                      <li>Indossa vestiti comodi, preferibilmente chiari e di tessuti biologici naturali (cotone, lino).</li>
                      <li>Spegni lo smartphone con 30 minuti di anticipo per facilitare il rilascio mentale.</li>
                    </ul>
                  </div>
                </div>

                {/* Next Steps CTA */}
                <div className="space-y-4 pt-2">
                  <p className="font-sans text-xs text-charcoal-deep/80 max-w-md mx-auto leading-relaxed">
                    Per accelerare la conferma o per chiarimenti immediati, puoi inviare una pre-compilata direttamente a Laura cliccando sotto:
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
                    <a
                      href={getWhatsAppMessage(recentBooking)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-6 py-3 rounded-sm bg-[#25D366] hover:bg-[#20ba59] text-white font-sans text-xs font-bold uppercase tracking-widest shadow-xs transition-all active:scale-95"
                    >
                      <span>Invia su WhatsApp</span>
                    </a>
                    
                    <button
                      onClick={resetForm}
                      className="px-6 py-2.5 rounded-sm border border-[#EDEDE4] hover:bg-sage-pale text-charcoal-deep/80 font-sans text-xs uppercase tracking-widest font-bold transition-all cursor-pointer"
                    >
                      Pianifica Altro
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Saved Bookings Panel (Client Personal Storage History) */}
        {savedBookings.length > 0 && (
          <div className="text-left border border-satin-gold/25 bg-[#F5F2EA] rounded-sm p-6 sm:p-8">
            <h4 className="font-serif text-lg font-semibold text-charcoal-deep mb-4 flex items-center justify-between">
              <span>Le tue Sessioni Programmate ({savedBookings.length})</span>
              <span className="text-[10px] font-sans tracking-widest text-[#8A8F8A] uppercase font-bold">Resoconto Locale</span>
            </h4>
            
            <div className="space-y-3.5 max-h-[300px] overflow-y-auto pr-1">
              {savedBookings.map((b) => (
                <div 
                   key={b.id}
                   className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between p-4 bg-white border border-[#EDEDE4] rounded-sm shadow-xs"
                >
                  <div>
                    <h5 className="font-serif text-sm font-bold text-sage-forest mb-0.5">{b.treatmentTitle}</h5>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#8A8F8A] font-light">
                      <span>📆 {b.date}</span>
                      <span>⏰ {b.time}</span>
                      <span>👤 {b.clientName}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
                    <a
                      href={getWhatsAppMessage(b)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border border-[#25D366] hover:bg-[#25D366] text-[#25D366] hover:text-white px-3 py-1.5 rounded-sm text-[10px] font-sans font-bold uppercase tracking-widest transition-all"
                    >
                      Invia Copia WA
                    </a>
                    <button
                      onClick={() => handleCancelBooking(b.id)}
                      className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-sm transition-all cursor-pointer"
                      title="Disdici Trattamento"
                    >
                      <Trash2 className="w-4.5 h-4.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}

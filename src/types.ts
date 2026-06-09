/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type CategoryId = 'riequilibrio' | 'evoluzione' | 'vibrazionale';

export interface TreatmentCategory {
  id: CategoryId;
  title: string;
  description: string;
  focus: string;
  idealFor: string;
}

export interface Treatment {
  id: string;
  title: string;
  category: CategoryId;
  shortDesc: string;
  fullDesc: string;
  duration: string;
  price?: string; // Scambio energetico
  idealFor: string;
  benefits: string[];
  ritualStep?: string; // An elegant description of how the diagnostic/treatment happens
}

export interface Testimonial {
  id: string;
  name: string;
  text: string;
  treatmentName: string;
  rating: number;
}

export interface Appointment {
  id: string;
  treatmentId: string;
  treatmentTitle: string;
  date: string;
  time: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  notes?: string;
  createdAt: string;
}

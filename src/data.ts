/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { TreatmentCategory, Treatment, Testimonial } from './types';

export const CATEGORIES: TreatmentCategory[] = [
  {
    id: 'riequilibrio',
    title: 'Riequilibrio Energetico',
    description: 'Sblocca, purifica e ridistribuisci le tue energie primarie per ritrovare vigore vitale e armonia emotiva.',
    focus: 'Pulizia dell\'Aura, Armonizzazione dei Chakra, Sblocco de-contratturante sottile',
    idealFor: 'Chi si sente stanco, emotivamente instabile, svuotato o oppresso da pensieri ricorrenti.'
  },
  {
    id: 'evoluzione',
    title: 'Evoluzione Spirituale',
    description: 'Percorsi profondi di ascolto dell\'anima, connessione sottile e risveglio di risposte evolutive interiori.',
    focus: 'Lettura Registri Akashici, Medianità Protetta, Canalizzazioni e Sessioni Intuitive',
    idealFor: 'Chi sta attraversando un momento di transizione e cerca la propria direzione spirituale o scopo di vita.'
  },
  {
    id: 'vibrazionale',
    title: 'Guarigione Vibrazionale',
    description: 'Rilassamento profondo del sistema nervoso e delle cellule corporee attraverso l\'interazione di elementi sonori e terrestri.',
    focus: 'Campane Tibetane, Massaggio Sonoro e Trattamenti con Pietre e Cristalli Naturali',
    idealFor: 'Chi desidera allentare lo stress mentale cronico e ritrovare se stesso tramite suoni e frequenze rinfrescanti.'
  }
];

export const TREATMENTS: Treatment[] = [
  {
    id: 'reiki',
    title: 'Trattamento e Allineamento Reiki',
    category: 'riequilibrio',
    shortDesc: 'Antica tecnica di canalizzazione energetica giapponese per ridurre lo stress, rilassare i muscoli sottili e risvegliare l\'autorigenerazione.',
    fullDesc: 'Il Reiki è una disciplina basata sulla trasmissione dell\'energia universale attraverso l\'imposizione delle mani. Agisce sui livelli fisico, mentale ed emotivo per dissolvere i nodi che ostacolano il fluire della forza vitale.',
    duration: '60 min',
    price: '60 €',
    idealFor: 'Chi convive con stati d\'ansia, stanchezza cronica, insonnia e sente il bisogno di una profonda coccola dell\'anima.',
    benefits: [
      'Disintossicazione e purificazione delle tossine bioenergetiche',
      'Profondo rilassamento muscolare e riduzione dell\'ormone dello stress',
      'Riallineamento dei sette chakra principali',
      'Miglioramento della qualità del sonno e dei livelli complessivi di energia'
    ],
    ritualStep: 'Il trattamento si svolge distesi su un comodo lettino, vestiti in abiti leggeri, accompagnati da una delicata profumazione di salvia bianca e una campana sonora iniziale.'
  },
  {
    id: 'cristalloterapia',
    title: 'Cristalloterapia & Chakra Cleansing',
    category: 'riequilibrio',
    shortDesc: 'Utilizzo mirato dell\'energia risonante dei minerali per dissolvere le pesantezze energetiche e riarmonizzare i centri vitali.',
    fullDesc: 'Ogni minerale vibra a una frequenza specifica. Applicando pietre selezionate sui principali nodi energetici (Chakra), si avvia un processo di risonanza armonica che purifica le negatività e promuove una rinnovata stabilità emotiva.',
    duration: '75 min',
    price: '70 €',
    idealFor: 'Chi accusa sbalzi emotivi, sente una sensazione di "blocco" nel petto o alle vie respiratorie e desidera ritrovare radicamento.',
    benefits: [
      'Rimozione di sovraccarichi emotivi e tensioni mentali',
      'Radicamento a terra (grounding) ed eliminazione della nebbia cognitiva',
      'Potenziamento della forza di volontà e centratura',
      'Comprensione dell\'abbinamento minerale idoneo alle proprie esigenze'
    ],
    ritualStep: 'Diagnostica iniziale tramite pendolo di cristallo di rocca, posizionamento studiato dei minerali, e visualizzazione guidata dei colori e della luce.'
  },
  {
    id: 'lettura-aura',
    title: 'Ascolto e Lettura Spirituale dell\'Aura',
    category: 'riequilibrio',
    shortDesc: 'Un viaggio di consapevolezza per decodificare i colori del tuo campo energetico, scoprendo i tuoi talenti ed i nodi karmici del momento.',
    fullDesc: 'La lettura dell\'aura permette di comprendere lo stato energetico attuale dell\'individuo. Laura accede con profondo rispetto visivo ed emotivo al disegno cromatico del tuo campo, traducendo in parole le dinamiche interiori attive e i passi utili da compiere.',
    duration: '90 min',
    price: '85 €',
    idealFor: 'Chi vuole conoscersi meglio sul piano spirituale ed evidenziare i filtri emotivi che condizionano le scelte nel presente.',
    benefits: [
      'Maggiore comprensione delle relazioni interpersonali e dei nodi ricorrenti',
      'Integrazione e valorizzazione dei propri talenti innati emersi',
      'Chiarificazione di scelte professionali o personali attraverso la lente spirituale',
      'Consapevolezza e liberazione da auto-giudizi limitanti'
    ],
    ritualStep: 'Dialogo iniziale in presenza o online, respirazione condivisa di allineamento, disegno a colori del campo energetico ed esposizione delle vibrazioni lette.'
  },
  {
    id: 'registri-akashici',
    title: 'Lettura dei Registri Akashici',
    category: 'evoluzione',
    shortDesc: 'Apertura del tuo "Libro della Vita" nella memoria universale per ricevere risposte evolutive, chiarezza interiore e messaggi di pace.',
    fullDesc: 'Akasha è la sostanza primordiale dell\'universo che custodisce le memorie di ogni anima nel suo viaggio evolutivo. Accedendo ai tuoi Registri Akashici personali con il tuo consenso, Laura canalizza risposte dai Maestri ed Esseri di Luce per sciogliere i dubbi del tuo presente.',
    duration: '90 min',
    price: '90 €',
    idealFor: 'Chi cerca risposte profonde su blocchi karmici, dinamiche di vita ripetitive e desidera una prospettiva spirituale elevata.',
    benefits: [
      'Comprensione spirituale di schemi familiari o relazionali ridondanti',
      'Rilascio e perdono di contratti d\'anima obsoleti',
      'Ricezione di consigli d\'amore incondizionato e direzione evolutiva',
      'Incredibile senso di pace, sollievo e riconnessione cosmica'
    ],
    ritualStep: 'Apertura formale con preghiera sacra di transizione, formulazione delle 3-4 domande preparate insieme dall\'utente, canalizzazione e chiusura con ringraziamento.'
  },
  {
    id: 'medianita',
    title: 'Sedute di Medianità e Canalizzazione Protetta',
    category: 'evoluzione',
    shortDesc: 'Contatto guidato e protetto con le guide e le energie angeliche d\'amore che sostengono il cammino della tua anima.',
    fullDesc: 'Un momento di profonda delicatezza e spiritualità in cui Laura si fa da tramite (canale) per trasmettere messaggi o frequenze di guarigione animica dalle tue Guide Spirituali. L\'incontro si fonda sull\'amore, il rispetto e l\'evoluzione personale.',
    duration: '75 min',
    price: '85 €',
    idealFor: 'Chi sperimenta solitudine spirituale, cerca una spalla di saggezza invisibile e desidera riaprire il dialogo con il divino.',
    benefits: [
      'Consapevolezza di non essere soli nell\'universo invisibile',
      'Guarigione emotiva connessa a dolori latenti o separazioni',
      'Chiarificazione del senso degli ostacoli attuali nel percorso',
      'Incremento dell\'intuizione naturale ed autostima spirituale'
    ],
    ritualStep: 'Preparazione dello spazio protetto mediante purificazione, meditazione profonda, connessione ai regni della luce e sintonizzazione verbale.'
  },
  {
    id: 'campane-tibetane',
    title: 'Massaggio Sonoro con Campane Tibetane',
    category: 'vibrazionale',
    shortDesc: 'Trattamento acustico e corporeo in cui le campane vengono appoggiate sul corpo per accarezzare le cellule con vibrazioni curative.',
    fullDesc: 'Il suono delle campane tibetane induce istantaneamente onde rilassanti nel cervello, rallentando il flusso mentale. Collocando le campane sul corpo vestito, le vibrazioni si propagano all\'acqua corporea, destrutturando le rigidità psicosomatiche e fisiche.',
    duration: '60 min',
    price: '65 €',
    idealFor: 'Chi soffre di tensioni croniche alla schiena, rigidità muscolari da ansia, iperattività cerebrale e difficoltà a rilassarsi.',
    benefits: [
      'Totale abbandono del controllo mentale e rilascio dello stress muscolare',
      'Equilibrio emisferico cerebrale e calma profonda della mente',
      'Rigenerazione delle cellule interne ridistribuendo le cariche biologiche',
      'Miglioramento dell\'umore e sensazione di leggerezza fisica estrema'
    ],
    ritualStep: 'Sdraiati a pancia in giù o in su, posizionamento delle preziose campane su punti chakra/dolore, percussione controllata a diverse intensità, meditazione finale nel silenzio.'
  },
  {
    id: 'bagno-vibrazionale',
    title: 'Trattamento Frequenziale Cristalli e Suono',
    category: 'vibrazionale',
    shortDesc: 'Un\'esperienza multisensoriale che unisce la potenza focalizzante dei cristalli alla fluidità del suono curativo delle campane di quarzo.',
    fullDesc: 'La combinazione sinergica dei cristalli disposti sulla colonna e sui chakra principali unita alle risonanze cristalline delle campane di quarzo genera una camera di risonanza purissima. Aiuta a innalzare a livelli elevati la vibrazione energetica globale.',
    duration: '75 min',
    price: '75 €',
    idealFor: 'Chi vuole resettare completamente la propria energia dopo un forte dispiacere, spavento o evento stressante.',
    benefits: [
      'Resettaggio completo dei vettori energetici congestionati',
      'Riallineamento istantaneo dell\'asse mente-corpo-spirito',
      'Sensazione di espansione della coscienza e pace incondizionata',
      'Apertura dei canali intuitivi personali'
    ],
    ritualStep: 'Purificazione dello spazio con Palo Santo, sintonizzazione tramite campana di cristallo nota FA (Chakra del cuore), posizionamento pietre calde e concerto armonico.'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Eleonora M.',
    text: 'Il massaggio sonoro con le campane tibetane mi ha permesso di sperimentare per la prima volta un silenzio mentale assoluto. Laura ha un\'energia magica e accogliente, mi sono sentita protetta e compresa fin dal primo istante.',
    treatmentName: 'Massaggio Sonoro con Campane Tibetane',
    rating: 5
  },
  {
    id: 't2',
    name: 'Stefano R.',
    text: 'La lettura dei Registri Akashici mi ha svelato dettagli incredibili su una dinamica relazionale che mi bloccava da anni. Ne sono uscito leggero, colmo di perdono e con una direzione chiarissima per il mio domani. Grazie, Laura.',
    treatmentName: 'Lettura dei Registri Akashici',
    rating: 5
  },
  {
    id: 't3',
    name: 'Martina V.',
    text: 'La cristalloterapia combinata al reiki curato da Laura è stata una vera e propria rinascita. Soffrivo di insonnia cronica da stress e dopo una sola seduta sono tornata a riposare in pace. Non posso che consigliare questo percorso.',
    treatmentName: 'Cristalloterapia & Chakra Cleansing',
    rating: 5
  }
];

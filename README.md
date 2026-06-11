# Laura - Trattamenti Energetici

Sito professionale per Laura, operatrice olistica e spirituale. Un'esperienza fluida e rilassante per il benessere di corpo, mente e anima.

## Sviluppo Locale

**Prerequisiti:** Node.js (v22 o superiore)

1. Installa le dipendenze:
   `npm install`
2. Avvia l'ambiente di sviluppo:
   `npm run dev`
3. Apri `http://localhost:3000` nel browser.

## Deployment

Il sito è ottimizzato per **GitHub Pages** e offre due modalità di pubblicazione.

### Opzione A: GitHub Actions (Automatica - Consigliata)
Ogni volta che fai un `push` sul ramo `main`, il sito viene compilato e pubblicato automaticamente.
1. Carica il codice su GitHub.
2. Vai in **Settings > Pages**.
3. Sotto "Build and deployment > Source", seleziona **GitHub Actions**.
4. Il sito sarà online in pochi minuti.

### Opzione B: Manuale (Tramite script)
Se preferisci gestire il deploy manualmente dal tuo computer:
1. **Configurazione**: Assicurati che `base` in `vite.config.ts` corrisponda al nome della tua repo (es: `/Laura-Trattamenti-Energetici/`).
2. **Esegui**:
   ```bash
   npm run deploy
   ```
3. **Configurazione GitHub**: In **Settings > Pages**, imposta il branch su `gh-pages`.

### Note Importanti
- **Immagini**: Usa sempre gli import ESM in React (`import img from './assets/...'`) per garantire che i percorsi siano corretti dopo il build.
- **Base Path**: Se cambi il nome della repository, ricordati di aggiornare il campo `base` in `vite.config.ts`.

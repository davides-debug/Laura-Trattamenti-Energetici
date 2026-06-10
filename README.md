<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/9f6eab74-14a5-4e59-85c3-026c0b5b849c

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Deployment

Il sito è configurato per essere pubblicato su **GitHub Pages**.

### Passaggi per la pubblicazione:

1.  **Configurazione `vite.config.ts`**:
    Assicurati che il campo `base` in `vite.config.ts` corrisponda al nome della tua repository:
    ```typescript
    export default defineConfig({
      base: "/Laura-Trattamenti-Energetici/",
      // ...
    });
    ```

2.  **Build del progetto**:
    Esegui il comando per generare i file statici:
    ```bash
    npm run build
    ```
    I file verranno generati nella cartella `dist`.

3.  **Pubblicazione su GitHub Pages**:
    Il pacchetto `gh-pages` è già installato e configurato. Per pubblicare il sito, esegui semplicemente:
    ```bash
    npm run deploy
    ```

4.  **Configurazione GitHub**:
    Su GitHub, vai nelle impostazioni della repository (**Settings > Pages**) e assicurati che la sorgente sia impostata su `gh-pages` branch.

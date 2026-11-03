# L3G — Frontend

Frontend del sito L3G, con pagine pubbliche dedicate a camere, dintorni, galleria e contatti, e un'area amministrativa per la gestione dei contenuti.

Realizzato con React 19, TypeScript e Vite. Usa React Router per la navigazione, Sass per gli stili e Ant Design per i componenti di interfaccia.

## Avvio locale

Prerequisiti: Node.js e npm installati e compatibili con Vite 7.

Dal terminale, partendo dalla cartella principale `L3G`:

```powershell
cd l3g_frontend
npm install
Copy-Item .env.example .env.local
npm run dev
```

L'installazione delle dipendenze e la copia della configurazione servono al primo avvio. Se `.env.local` esiste già, conserva la tua configurazione.

Apri l'indirizzo indicato dal terminale, normalmente http://localhost:5173. Se la porta è occupata, Vite può sceglierne un'altra. Lascia il terminale aperto durante lo sviluppo e premi **Ctrl+C** per arrestare il server.

## Configurazione

Il file `.env.example` contiene le variabili da copiare in `.env.local`:

| Variabile | Utilizzo |
| --- | --- |
| `VITE_API_BASE_URL` | Indirizzo base delle API; valore predefinito `http://localhost:8000/api`. |
| `VITE_CLOUDINARY_CLOUD_NAME` | Cloud Cloudinary usato per il caricamento delle immagini dall'area amministrativa. |
| `VITE_CLOUDINARY_UPLOAD_PRESET` | Preset di caricamento Cloudinary. |

Dopo aver modificato queste variabili, riavvia il server di sviluppo. Le variabili con prefisso `VITE_` sono visibili nel browser: non inserirvi password o chiavi segrete.

Il backend si trova nella cartella sorella `../l3g_backend`: per avviarlo consulta il relativo [README](../l3g_backend/README.md). Login e gestione dei contenuti amministrativi richiedono le API attive. Alcuni contenuti pubblici prevedono dati statici di fallback; la galleria pubblica usa attualmente immagini locali di esempio.

## Comandi disponibili

Esegui questi comandi dalla cartella `l3g_frontend`:

| Comando | Descrizione |
| --- | --- |
| `npm run dev` | Avvia il server di sviluppo. |
| `npm run build` | Verifica TypeScript e genera la versione di produzione in `dist/`. |
| `npm run preview` | Mostra in locale la build generata; eseguire prima `npm run build`. |
| `npm run lint` | Esegue i controlli ESLint. |

## Pagine principali

| Percorso | Pagina |
| --- | --- |
| `/` | Home |
| `/camere` | Elenco camere |
| `/room/:roomId` | Dettaglio camera |
| `/places` | Luoghi da visitare |
| `/galleria` | Galleria fotografica |
| `/contatti` | Contatti |
| `/admin/login` | Accesso amministratore |
| `/admin` | Area amministrativa con dashboard e gestione dei contenuti |

## Struttura del progetto

```text
src/
  admin/       Area amministrativa, autenticazione e gestione contenuti
  assets/      Immagini e risorse statiche
  components/  Componenti dell'interfaccia
  data/        Dati statici
  hooks/       Hook React condivisi
  pages/       Pagine pubbliche
  saas/        Stili Sass (nome attuale della cartella)
  services/    Accesso alle API e servizi per i contenuti
  utils/       Funzioni di utilità
  App.tsx      Percorsi dell'applicazione
  main.tsx     Punto di ingresso
docs/          Documentazione, inclusa la palette colori
public/        Risorse pubbliche
react-native/  Progetto mobile separato, con un proprio README
```

Per i riferimenti visivi consulta la [palette colori](docs/palette-colori.md). Per il progetto mobile consulta il [README React Native](react-native/README.md).

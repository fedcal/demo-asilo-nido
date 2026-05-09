# Piano Tariffario e Tier di Funzionalità

## Panorama Tier

Il template **Asilo Nido / Materna Privata** è disponibile in 3 livelli di funzionalità, progettati per crescere con il tuo asilo:

| Tier | Prezzo | Ore sviluppo | Pubblico ideale |
|------|--------|-------------|-----------------|
| **Base** | €500–800 | 75h | Piccoli asili, visibilità web |
| **Intermedio** | €1.500–2.200 | 240h | Asili medi, comunicazioni genitori digitali |
| **Avanzato** | €4.000–6.000 | 480h | Asili grandi, app mobile + AI + photo tracking |

---

## Tier Base — €500–800 (75h)

**Obiettivo**: Sito vetrina statico, credibilità professionale, SEO locale.

### Funzionalità incluse

- **Hero section** con filosofia pedagogica, foto struttura
- **Attività didattiche** — psicomotricità, musica, inglese, laboratori
- **Team educatrici** — nomi, foto, qualifiche, specializzazioni
- **Gallery struttura** — aule, giardino, sala da pranzo, spazi esterni
- **Calendario eventi** — iscrizioni anno nuovo, feste, gite, chiusure estive
- **Blog parenting** — consigli crescita bimbi, ricette sane, sviluppo cognitivo
- **Schema.org EducationalOrganization (preschool)** — JSON-LD SEO
- **Contatti + Orari** — form contatti, telefono, email, orari sportello
- **Design system** — CSS tokens light theme (GitHub Primer)
- **Prerender statico** — ultra-fast, 99.9% uptime
- **Responsive mobile** — Lighthouse target ≥90 SEO

### Cosa NON è incluso

- Area riservata genitori
- Chat comunicazioni educatrici-genitori
- Feed quotidiano foto giornata
- Iscrizioni online
- Pagamenti
- App mobile

---

## Tier Intermedio — €1.500–2.200 (240h)

**Obiettivo**: Portale family-first, comunicazioni giornaliere centralizzate, gestione amministrativa.

### Funzionalità incluse (Tier Base +)

- **Login genitori** — area riservata con vista cronologia figlio
- **Feed quotidiano foto** — educatrici condividono giornata bimbo
  - Privacy-first: watermark automatico foto
  - Notifica push genitori (push opt-in)
  - Archivio scorribile per data
  - **Consenso doppio genitori** per pubblicazione foto (GDPR)

- **Chat protetta educatrici-genitori** — comunicazioni istantanee
  - Thread-based per continuità
  - Notifiche mute-opzionali
  - No screenshot guarantee (watermark)
  - Archivio cercabile

- **Iscrizioni online** — pre-iscrizioni list d'attesa
  - Form modulare con dati bimbo (data nascita, allergie, contatti)
  - Smart allocation automatica posti
  - Notifica genitore su cambio status (iscritto, lista d'attesa, rifiutato)
  - Pagamento cauzione pre-iscrizione Stripe

- **Pagamenti retta Stripe + Satispay** — online, tracciati, ricevute
  - Rette mensili ricorrenti
  - Laboratori extra
  - Gite, merende speciali
  - Ricevuta detraibile PDF auto-generata

- **Newsletter segmentata** — comunicazioni bulk protette GDPR
  - Genitori attuali
  - Genitori ex-iscritti (per word-of-mouth)
  - Educatrici (comunicazioni interne)

- **Multi-lingua IT/EN** — sito completamente tradotto
- **GDPR completo** — cookie banner, informativa, consensi minori

### Cosa NON è incluso

- App mobile
- AI face recognition
- Milestone tracking
- Telecamere live
- Gestione allergie avanzata

---

## Tier Avanzato — €4.000–6.000 (480h)

**Obiettivo**: Ecosistema complete per asilo, AI-driven, tracking sviluppo bimbo.

### Funzionalità incluse (Tier Base + Intermedio +)

- **App mobile companion** — iOS + Android (React Native o Flutter wrapper)
  - Notifiche push foto giornata
  - Chat genitori-educatrici on-app
  - Calendario sincronizzato
  - Payment tracker (importi dovuti, cronologia pagamenti)
  - Accesso offline (foto downloaded, sync al reconnect)

- **AI Face Recognition** — organizzazione automatica foto
  - Algoritmo open-source (mediapy/facenet, no cloud)
  - Consenso doppio genitori ESPLICITO pre-attivazione
  - Autorizzazione revocabile uno-click
  - Conformità GDPR Art. 9 (biometria = dato sensibile)
  - Gallery auto-organizzata per bimbo (taps per sfogliare sue foto)

- **Milestone Tracker** — sviluppo psicomotorio + cognitivo + linguistico
  - Template standard (Griffiths, Denver, Bayley-adapted)
  - Check-in mensile educatrice (motorio, cognitivo, linguaggio, socio-emotivo)
  - Grafici progresso per genitore (visual trend)
  - Export PDF report genitori
  - Red flag alert (sviluppo sottotone → consiglia pediatra)

- **Telecamere live class** — streaming genitori (opt-in consent strict)
  - Integrazione RTSP generico (Hikvision, Dahua, IP cam standard)
  - Dual authentication: PIN educatrice + autenticazione genitore
  - Recording consent ESPLICITO per ogni sessione
  - Timestamp watermark, no export consentito
  - Auto-disconnect dopo 30min inattività

- **Gestione menu + allergie** — database centralizzato, PDF genitori
  - Menu settimanale visibile genitori 7 giorni prima
  - Flag allergie per bimbo (arachidi, lattosio, glutine, etc.)
  - Auto-check piatti vs allergie
  - Notifica educatrice se piatto contiene allergene bimbo
  - Export allergie per fornitore catering

- **Tablet anniversari/feste integrate** — celebrazioni in-app
  - Compleanno bimbo → notifica app, foto speciale
  - Festa della mamma/papà → task educatrici, gallery dedicata
  - Festività nazionali + tematiche asilo (Pasqua, Natale, eco-day)
  - Certificato partecipazione scaricabile genitori

- **Dashboard educatrici analytics** — insights sviluppo collettivo
  - Tasso partecipazione attività per classe
  - Trending milestone (dove maggior number bimbi indietro)
  - Engagement genitori (chi accede app, frequenza)
  - Report mensile direttrice (trend benessere classe)

---

## Dettagli implementativi per Tier

### Tier Base: Stack semplice

```
Frontend: Angular 21 SSR prerender-only
Backend: API REST mock (no DB)
Hosting: Vercel CDN
Docs: VitePress GitHub Pages
```

### Tier Intermedio: Stack full-stack leggero

```
Frontend: Angular 21 SSR + login, chat UI
Backend: Spring Boot 3.4 + PostgreSQL + Redis
Auth: JWT proprietario
Email: Brevo / Resend SMTP
Payments: Stripe SDK
Hosting: Vercel (frontend) + VPS own (backend)
```

### Tier Avanzato: Stack complete + mobile

```
Frontend: Angular 21 SSR + Signals
App mobile: React Native (codice condiviso fetch API)
Backend: Spring Boot clean-arch 4-layer
AI: Face recognition open-source (mediapy/facenet on-prem)
Video: RTSP client (ffmpeg, motion detection)
DB: PostgreSQL 16 + Redis Stack
Auth: JWT + opt-in OAuth (Google Sign-In)
Hosting: VPS Hetzner CCX23 (3 microservizi) + Nginx SSL
```

---

## Scegliere il Tier giusto

### **Base** se:
- Asilo piccolo (<30 bimbi)
- Budget <€1k
- Genitori cercano info, no aspettativa comunicazioni digitali
- Assenza staff time per addestrare portali

### **Intermedio** se:
- Asilo medio (30–60 bimbi)
- Genitori digital-native, chiedono app + chat
- Budget €1.500–2.200
- Voglia ridurre WhatsApp (comunicazioni centralizzate)

### **Avanzato** se:
- Asilo grande (60–120+ bimbi)
- Voglia differenziarsi con tech (app, AI photo, milestone tracker)
- Budget €4k–6k, ROI stimato 18–24 mesi
- Staff willing to learn new tools
- Visione: app è strumento retention genitori, not cost center

---

## Costi aggiuntivi (extra-tier)

| Servizio | Costo mensile | Note |
|----------|---------------|------|
| Catering integrazione (menu API) | €50–150 | Contatti fornitore catering, sincronizzazione Menu |
| App store deployment (iOS + Android) | €0 (annual) | Uno-time: Apple Developer €99, Google Play €25 |
| Telecamere IP (3–4 camere HD) | €300–600 | Uno-time hardware + installazione |
| Backup incremental cloud | €20–50 | Storage Photos archivio 2+ anni |
| AI face recognition setup (tuning) | €500–800 | Uno-time fine-tuning su dati asilo specifici |
| Consulenza GDPR (avv. specializzato) | €500–1.500 | Opzionale, highly recommended tier Avanzato |

---

## Timeline tipica per Tier

| Fase | Base | Intermedio | Avanzato |
|------|------|-----------|----------|
| Discovery | 1 sett | 1 sett | 2 sett |
| Sviluppo | 2–2.5 sett | 6 sett | 12–13 sett |
| Testing + UAT | 0.5 sett | 1.5 sett | 2–3 sett |
| Deploy + training | 0.5 sett | 1 sett | 1–2 sett |
| **Totale** | **4 sett** | **9.5 sett** | **17–20 sett** |

---

## GDPR e Minori — Conformità per Tier

### Tier Base
- Informativa privacy footer
- Cookie banner
- NO raccolta dati minori

### Tier Intermedio
- **Doppio consenso genitori** PER OGNI foto minore (GDPR Art. 6 legittimità)
- Informativa estesa minori + GDPR
- Crittografia password genitori
- Retention policy: foto 2 anni, comunicazioni 1 anno

### Tier Avanzato (aggiunto)
- **GDPR Art. 9 – Dati sensibili**:
  - Biometria (face recognition) → consenso esplicito + diritto revoca
  - Video streaming → consenso ad-hoc sessione + recording policy
- Registro trattamenti (Data Protection Impact Assessment)
- DPA con fornitori (Stripe, Brevo, catering API)
- Diritto oblio: delete account → scrub all photos, messages, milestone data
- Consulenza avvocato specializzato consigliata

---

## Prossimi step

1. **Contatta Federico** — dimensione asilo, budget, pain point prioritario
2. **Demo live** — accesso Tier Base con foto/dati mock tuo asilo
3. **Proposta personalizzata** — timeline, SLA uptime 99.5%, training staff incluso
4. **Contratto e kickoff** — discovery call, mappatura integrazioni (catering, provider telecamere)

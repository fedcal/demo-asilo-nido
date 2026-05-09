# Customization

## Cambiare i dati mock

Edita i file in `src/assets/mock/`. Vedi [Mock Data](/mock-data).

## Cambiare i colori

I design tokens sono in `src/styles.css`:

```css
:root {
  --color-accent: #0969da;        /* Cambia qui per il colore primario */
  --color-bg-default: #ffffff;
  --color-fg-default: #1f2328;
  /* ... */
}
```

## Cambiare il logo

Sostituisci `public/favicon.ico` e aggiungi il logo SVG in `public/logo.svg`.

## Aggiungere route

1. Crea il componente in `src/app/pages/{nome}/`
2. Aggiungi la route in `src/app/app.routes.ts`:

```typescript
{
  path: 'servizi',
  loadComponent: () => import('./pages/servizi/servizi.component').then((m) => m.ServiziComponent),
  title: 'Servizi — Asilo Nido'
}
```

## Cambiare i metadati SEO

Edita `src/index.html` per:
- `<title>` globale
- `<meta name="description">`
- Open Graph

Per metadati per-route usa `Title` e `Meta` di `@angular/platform-browser`.

## Disabilitare il prerender

In `angular.json`:

```json
"prerender": false
```

In questo caso il sito gira solo in modalità SSR runtime (più lento al cold start, più dinamico).

## White-label per cliente

1. Fork del repo o copia in nuova cartella
2. Sostituisci `asilo-nido` con nome cliente (`acme-pizzeria`)
3. Sostituisci footer rimuovendo riferimento a Federico (modifica `footer.component.ts`)
4. Personalizza `vercel.json` con domain custom cliente
5. Deploy su Vercel cliente con loro account

---

## Possibili sviluppi customizzabili

Oltre ai Tier standard, il template Asilo Nido supporta numerose estensioni:

### Comunicazioni Family-First
1. **Chat genitori-educatrici avanzata** — thread per tema (allergie, attività, news), notifiche push selective (Tier Intermedio+)
2. **Feed foto giornata con IA tagging** — auto-caption attività (musica, gioco, riposo), search per keyword (Tier Avanzato)
3. **Notifiche smart push** — pickup reminder, evento speciale, allerta allergia; frequenza customizzabile (Tier Intermedio+)
4. **Feedback educatrici settimanale** — report narrativo settimanale (cosa ha fatto, progresso, note comportamento) (custom)

### Tracking Sviluppo Bimbo
5. **Milestone tracker AI-assisted** — suggerimenti automati basati su foto (bimbo sorride = socio-emotivo ok; disegna = motorio fine) (Tier Avanzato+)
6. **Diario audio genitori** — genitori registrano voicenote giornaliere (sera), educatrici possono ascoltare mattina (custom)
7. **Comparison anonyma milestone** — benchmarking vs bambini stessa fascia età (GDPR-compliant, anonimizzato) (custom)

### App Mobile e Offline
8. **App mobile React Native** — iOS + Android unica codebase, feed offline, push notification (Tier Avanzato)
9. **Apple Wallet badge** — tessera virtuale asilo (sconto ristorante partner, accesso virtuale) (custom)
10. **Smartwatch parent notifications** — push micro su orologio genitori (allergia, pickup time) (custom)

### Media e Privacy
11. **AI face recognition avanzato** — gallery auto-organizzata per bimbo, smart albums (Tier Avanzato)
12. **Video live streaming safeguard** — dual-auth PIN educatrice + genitore, watermark timestamp, no export (Tier Avanzato)
13. **Photo editing AI** — auto-blur sfondi, highlight bimbo target (privacy bimbi altri asili nelle foto) (custom)

### Integrazioni Amministrative
14. **Catering menu API live** — sincronizzazione menu da fornitore, allergia check auto per bimbo (Tier Intermedio+)
15. **Pagamenti ricorrenti intelligenti** — auto-retry falliti, invoice PDF, deduzione IRPEF automatica (Tier Intermedio)

**Nota**: Contatta Federico per valutazione tempo + costi specifici di ogni feature custom.

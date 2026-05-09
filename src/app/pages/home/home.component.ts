import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

import { MockDataService } from '../../data/mock-data.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AsyncPipe, CurrencyPipe, NgFor, NgIf, RouterLink],
  template: `
    <section class="hero">
      <div class="demo-container">
        <p class="hero-eyebrow">Nido d'infanzia autorizzato Comune di Bologna</p>
        <h1>Un posto caldo<br />per crescere 0–3 anni</h1>
        <p class="hero-tagline">
          A Bologna, nel cuore del quartiere universitario, Nido Arcobaleno accoglie i bambini dai
          3 ai 36 mesi in tre sezioni a misura di bambino, con mensa biologica e pedagogista dedicata.
        </p>
        <div class="hero-actions">
          <a routerLink="/iscrizioni" class="btn btn-primary">Iscriviti al nido</a>
          <a routerLink="/progetto-educativo" class="btn btn-secondary">Il nostro progetto</a>
        </div>
      </div>
    </section>

    <section class="features demo-container">
      <h2>Perché scegliere Nido Arcobaleno</h2>
      <ul class="feature-grid">
        <li>
          <span class="feature-icon" aria-hidden="true">🥕</span>
          <h3>Mensa biologica</h3>
          <p>Ingredienti certificati BIO e stagionali, menù adattato alle intolleranze di ogni bambino.</p>
        </li>
        <li>
          <span class="feature-icon" aria-hidden="true">👩‍🏫</span>
          <h3>Pedagogista dedicata</h3>
          <p>Dott.ssa Moretti coordina il progetto educativo e supporta le famiglie in ogni fase.</p>
        </li>
        <li>
          <span class="feature-icon" aria-hidden="true">🌿</span>
          <h3>Approccio Montessori</h3>
          <p>Materiali strutturati, angoli autonomi e rispetto dei ritmi naturali di ogni bambino.</p>
        </li>
        <li>
          <span class="feature-icon" aria-hidden="true">🤝</span>
          <h3>Inserimento graduale</h3>
          <p>Ogni bambino viene accolto con un percorso personalizzato di 5-10 giorni con il genitore.</p>
        </li>
      </ul>
    </section>

    <section class="sezioni-featured demo-container" *ngIf="sezioni$ | async as data">
      <div class="section-header">
        <h2>Le tre sezioni</h2>
        <a routerLink="/sezioni" class="link-more">Scopri tutte le sezioni →</a>
      </div>
      <ul class="sezioni-grid">
        <li *ngFor="let s of data.sezioni" class="sezione-card" [style.border-top-color]="s.colorAccent">
          <div class="sezione-card__header" [style.background]="s.colorBg">
            <span class="sezione-card__emoji" aria-hidden="true">{{ s.emoji }}</span>
            <div>
              <h3>{{ s.nome }}</h3>
              <p class="sezione-card__eta">{{ s.etaRange }}</p>
            </div>
          </div>
          <p class="sezione-card__desc">{{ s.descrizione.slice(0, 120) }}...</p>
          <p class="sezione-card__retta">
            Retta: <strong>{{ s.rettaMensile | currency: 'EUR' : 'symbol' : '1.0-0' }}/mese</strong>
          </p>
        </li>
      </ul>
    </section>

    <section class="cta-band">
      <div class="demo-container">
        <h2>Vieni a conoscerci</h2>
        <p>
          Organizziamo giornate porte aperte a ottobre e marzo. Puoi anche prenotare una visita
          individuale con la pedagogista in qualsiasi momento dell'anno.
        </p>
        <div class="hero-actions">
          <a routerLink="/iscrizioni" class="btn btn-primary">Prenota una visita</a>
          <a routerLink="/team" class="btn btn-secondary btn-secondary--light">Conosci il team</a>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .hero {
        padding: 5rem 1rem;
        text-align: center;
        background: linear-gradient(180deg, #fff7ed 0%, #ffffff 100%);
        border-bottom: 1px solid var(--color-border);
      }
      .hero-eyebrow {
        font-size: 0.85rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        color: var(--color-accent);
        margin: 0 0 1rem;
      }
      .hero h1 {
        font-size: clamp(2rem, 5vw, 3.5rem);
        line-height: 1.2;
        margin: 0 0 1rem;
        color: var(--color-fg-default);
      }
      .hero-tagline {
        font-size: 1.1rem;
        color: var(--color-fg-muted);
        margin: 0 0 2rem;
        max-width: 600px;
        margin-left: auto;
        margin-right: auto;
      }
      .hero-actions {
        display: flex;
        gap: 0.75rem;
        justify-content: center;
        flex-wrap: wrap;
      }
      .btn {
        display: inline-block;
        padding: 0.7rem 1.5rem;
        border-radius: var(--radius-md);
        text-decoration: none;
        font-weight: 600;
        transition: all 0.15s ease;
      }
      .btn-primary {
        background: var(--color-accent);
        color: #ffffff;
      }
      .btn-primary:hover {
        background: #ea6c0c;
      }
      .btn-secondary {
        background: #ffffff;
        color: var(--color-fg-default);
        border: 1px solid var(--color-border);
      }
      .btn-secondary:hover {
        background: var(--color-bg-subtle);
      }
      .features {
        padding: 4rem 1rem;
      }
      .features h2 {
        text-align: center;
        margin-bottom: 2rem;
      }
      .feature-grid {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 1.5rem;
      }
      .feature-grid li {
        text-align: center;
      }
      .feature-icon {
        font-size: 2.5rem;
        display: block;
        margin-bottom: 0.5rem;
      }
      .feature-grid h3 {
        margin: 0 0 0.5rem;
        font-size: 1.1rem;
      }
      .feature-grid p {
        margin: 0;
        color: var(--color-fg-muted);
        font-size: 0.95rem;
      }
      .sezioni-featured {
        padding: 4rem 1rem;
        background: var(--color-bg-subtle);
        border-radius: var(--radius-lg);
        margin: 0 1rem 4rem;
      }
      .section-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;
        flex-wrap: wrap;
        gap: 0.5rem;
      }
      .section-header h2 {
        margin: 0;
      }
      .link-more {
        color: var(--color-accent);
        text-decoration: none;
        font-weight: 600;
      }
      .sezioni-grid {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 1.25rem;
      }
      .sezione-card {
        background: #ffffff;
        border: 1px solid var(--color-border);
        border-top: 4px solid var(--color-accent);
        border-radius: var(--radius-md);
        overflow: hidden;
      }
      .sezione-card__header {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 1rem;
      }
      .sezione-card__emoji {
        font-size: 2rem;
      }
      .sezione-card__header h3 {
        margin: 0 0 0.1rem;
        font-size: 1.05rem;
      }
      .sezione-card__eta {
        margin: 0;
        font-size: 0.85rem;
        color: var(--color-fg-muted);
      }
      .sezione-card__desc {
        padding: 0 1rem;
        font-size: 0.9rem;
        color: var(--color-fg-muted);
        margin: 0 0 0.75rem;
      }
      .sezione-card__retta {
        padding: 0.75rem 1rem;
        border-top: 1px solid var(--color-border);
        font-size: 0.9rem;
        margin: 0;
      }
      .cta-band {
        padding: 4rem 1rem;
        background: var(--color-fg-default);
        color: #ffffff;
        text-align: center;
      }
      .cta-band h2 {
        margin: 0 0 0.75rem;
        color: #ffffff;
      }
      .cta-band p {
        color: rgba(255, 255, 255, 0.85);
        margin: 0 0 2rem;
        max-width: 560px;
        margin-left: auto;
        margin-right: auto;
      }
      .btn-secondary--light {
        background: transparent;
        color: #ffffff;
        border-color: rgba(255, 255, 255, 0.3);
      }
      .btn-secondary--light:hover {
        background: rgba(255, 255, 255, 0.1);
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  private readonly mockData = inject(MockDataService);

  readonly sezioni$ = this.mockData.sezioni$;
}

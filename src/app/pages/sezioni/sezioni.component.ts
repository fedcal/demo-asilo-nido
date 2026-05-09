import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, CurrencyPipe, NgFor, NgIf } from '@angular/common';

import { MockDataService } from '../../data/mock-data.service';

@Component({
  selector: 'app-sezioni',
  standalone: true,
  imports: [AsyncPipe, CurrencyPipe, NgFor, NgIf],
  template: `
    <section class="page-header">
      <div class="demo-container">
        <h1>Le tre sezioni</h1>
        <p>Piccoli (3-12m) · Medi (12-24m) · Grandi (24-36m) — retta €450-700/mese</p>
      </div>
    </section>

    <article class="demo-container content" *ngIf="sezioni$ | async as data">
      <section *ngFor="let s of data.sezioni" class="sezione-section" [id]="s.id">
        <div class="sezione-intro" [style.background]="s.colorBg">
          <span class="sezione-emoji" aria-hidden="true">{{ s.emoji }}</span>
          <div>
            <h2>{{ s.nome }}</h2>
            <p class="sezione-eta">{{ s.etaRange }} · max {{ s.bambinoMax }} bambini</p>
          </div>
          <p class="sezione-retta">{{ s.rettaMensile | currency: 'EUR' : 'symbol' : '1.0-0' }}<span>/mese</span></p>
        </div>

        <p class="sezione-desc">{{ s.descrizione }}</p>

        <div class="sezione-details">
          <div class="sezione-detail-block">
            <h3>Attività principali</h3>
            <ul class="attivita-list">
              <li *ngFor="let a of s.attivita">{{ a }}</li>
            </ul>
          </div>
          <div class="sezione-detail-block">
            <h3>Educatrici di sezione</h3>
            <ul class="educatrici-list">
              <li *ngFor="let e of s.educatrici">
                <span class="educatrice-avatar" aria-hidden="true">{{ e.charAt(0) }}</span>
                {{ e }}
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section class="rette-summary">
        <h2>Riepilogo rette mensili</h2>
        <table class="rette-table" aria-label="Riepilogo rette mensili per sezione">
          <thead>
            <tr>
              <th scope="col">Sezione</th>
              <th scope="col">Età</th>
              <th scope="col">Max bambini</th>
              <th scope="col">Retta mensile</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let s of data.sezioni">
              <td>{{ s.nome }}</td>
              <td>{{ s.etaRange }}</td>
              <td>{{ s.bambinoMax }}</td>
              <td><strong>{{ s.rettaMensile | currency: 'EUR' : 'symbol' : '1.0-0' }}</strong></td>
            </tr>
          </tbody>
        </table>
        <p class="rette-note">
          La retta include mensa biologica, materiali didattici e documentazione fotografica mensile.
          Non include pasti aggiuntivi per allergie speciali o uscite extra. Agevolazioni ISEE disponibili
          su richiesta. Contattaci per maggiori informazioni.
        </p>
      </section>
    </article>
  `,
  styles: [
    `
      .page-header {
        padding: 4rem 1rem 3rem;
        background: var(--color-bg-subtle);
        text-align: center;
        border-bottom: 1px solid var(--color-border);
      }
      .page-header h1 {
        margin: 0 0 0.5rem;
      }
      .page-header p {
        color: var(--color-fg-muted);
        margin: 0;
      }
      .content {
        padding: 3rem 1rem;
        display: flex;
        flex-direction: column;
        gap: 4rem;
      }
      .sezione-section {
        scroll-margin-top: 80px;
      }
      .sezione-intro {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1.5rem;
        border-radius: var(--radius-lg);
        margin-bottom: 1.5rem;
        flex-wrap: wrap;
      }
      .sezione-emoji {
        font-size: 3rem;
        flex-shrink: 0;
      }
      .sezione-intro > div {
        flex: 1;
      }
      .sezione-intro h2 {
        margin: 0 0 0.25rem;
      }
      .sezione-eta {
        margin: 0;
        font-size: 0.9rem;
        color: var(--color-fg-muted);
      }
      .sezione-retta {
        font-size: 1.75rem;
        font-weight: 700;
        color: var(--color-accent);
        margin: 0;
      }
      .sezione-retta span {
        font-size: 0.9rem;
        font-weight: 400;
        color: var(--color-fg-muted);
      }
      .sezione-desc {
        line-height: 1.75;
        color: var(--color-fg-muted);
        margin-bottom: 1.5rem;
      }
      .sezione-details {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
        gap: 2rem;
      }
      .sezione-detail-block h3 {
        margin: 0 0 0.75rem;
        font-size: 1rem;
        color: var(--color-accent);
      }
      .attivita-list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 0.4rem;
      }
      .attivita-list li {
        padding: 0.4rem 0.6rem;
        background: var(--color-bg-subtle);
        border-radius: var(--radius-sm);
        font-size: 0.9rem;
      }
      .attivita-list li::before {
        content: '✦ ';
        color: var(--color-accent);
      }
      .educatrici-list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }
      .educatrici-list li {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        font-size: 0.9rem;
      }
      .educatrice-avatar {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background: var(--color-accent);
        color: #ffffff;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        flex-shrink: 0;
      }
      .rette-summary h2 {
        margin-bottom: 1.25rem;
      }
      .rette-table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 1rem;
      }
      .rette-table th,
      .rette-table td {
        text-align: left;
        padding: 0.75rem 1rem;
        border-bottom: 1px solid var(--color-border);
        font-size: 0.95rem;
      }
      .rette-table th {
        background: var(--color-bg-subtle);
        font-weight: 600;
        font-size: 0.85rem;
        text-transform: uppercase;
        letter-spacing: 0.04em;
        color: var(--color-fg-muted);
      }
      .rette-note {
        font-size: 0.85rem;
        color: var(--color-fg-muted);
        font-style: italic;
        line-height: 1.6;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SezioniComponent {
  private readonly mockData = inject(MockDataService);

  readonly sezioni$ = this.mockData.sezioni$;
}

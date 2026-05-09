import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';

import { MockDataService } from '../../data/mock-data.service';

@Component({
  selector: 'app-progetto-educativo',
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf],
  template: `
    <section class="page-header">
      <div class="demo-container">
        <h1>Il progetto educativo</h1>
        <p>Un ambiente di cura che rispetta i ritmi naturali di ogni bambino.</p>
      </div>
    </section>

    <article class="demo-container content">
      <section class="philosophy">
        <h2>La nostra filosofia</h2>
        <p>
          Nido Arcobaleno nasce dall'incontro tra l'approccio Reggiana — nato a Reggio Emilia e
          riconosciuto come modello di eccellenza mondiale — e la metodologia Montessori per la
          fascia 0-3 anni. Crediamo che ogni bambino sia portatore di potenziale, curiosità e
          competenza fin dalla nascita.
        </p>
        <p>
          Il nido non è un luogo dove il bambino viene "tenuto" in attesa del ritorno dei genitori:
          è uno spazio educativo autentico, dove le relazioni con educatrici stabili, con i pari e
          con gli oggetti dell'ambiente costruiscono le fondamenta dello sviluppo cognitivo,
          emotivo e sociale.
        </p>
      </section>

      <section class="pillars">
        <h2>I quattro pilastri</h2>
        <ul class="pillars-grid">
          <li>
            <span class="pillar-icon" aria-hidden="true">💛</span>
            <h3>Relazione</h3>
            <p>
              Ogni bambino ha una "educatrice di riferimento" stabile per tutto l'anno scolastico.
              La continuità relazionale è il cuore del benessere al nido.
            </p>
          </li>
          <li>
            <span class="pillar-icon" aria-hidden="true">🌱</span>
            <h3>Ambiente</h3>
            <p>
              Gli spazi sono pensati come "terzo educatore": angoli strutturati, materiali naturali
              di Montessori, luce naturale, altezze e proporzioni a misura di bambino.
            </p>
          </li>
          <li>
            <span class="pillar-icon" aria-hidden="true">🎭</span>
            <h3>Gioco</h3>
            <p>
              Il gioco libero e il gioco strutturato si alternano. I laboratori settimanali di
              pittura, musica, manipolazione e teatro nascono dalle osservazioni delle educatrici.
            </p>
          </li>
          <li>
            <span class="pillar-icon" aria-hidden="true">🤝</span>
            <h3>Famiglia</h3>
            <p>
              I genitori sono partner del progetto. Colloqui trimestrali, giornate di condivisione
              e documentazione fotografica condivisa tengono famiglie e nido in dialogo continuo.
            </p>
          </li>
        </ul>
      </section>

      <section class="routine">
        <h2>La giornata tipo</h2>
        <ul class="timeline">
          <li>
            <span class="timeline__time">07:30 – 09:30</span>
            <div class="timeline__content">
              <h3>Accoglienza</h3>
              <p>Ingresso flessibile, saluto rituale con educatrice di riferimento, gioco libero negli angoli.</p>
            </div>
          </li>
          <li>
            <span class="timeline__time">09:30 – 10:30</span>
            <div class="timeline__content">
              <h3>Attività del mattino</h3>
              <p>Laboratorio settimanale (pittura, musica, manipolazione, esplorazione outdoor), momento assembleare in cerchio.</p>
            </div>
          </li>
          <li>
            <span class="timeline__time">10:30 – 11:30</span>
            <div class="timeline__content">
              <h3>Igiene e pranzo</h3>
              <p>Cambio, lavaggio mani rituale, pranzo con ingredienti biologici. Per i Piccoli: pappa personalizzata.</p>
            </div>
          </li>
          <li>
            <span class="timeline__time">11:30 – 14:30</span>
            <div class="timeline__content">
              <h3>Riposo</h3>
              <p>Riposino proposto (non imposto). Lettino personale, ninne nanne, presenza dell'educatrice per tutta la durata.</p>
            </div>
          </li>
          <li>
            <span class="timeline__time">14:30 – 15:30</span>
            <div class="timeline__content">
              <h3>Merenda e gioco</h3>
              <p>Merenda biologica, gioco libero negli angoli o in giardino secondo le condizioni meteo.</p>
            </div>
          </li>
          <li>
            <span class="timeline__time">15:30 – 17:30</span>
            <div class="timeline__content">
              <h3>Uscita flessibile</h3>
              <p>Saluto rituale, condivisione breve della giornata con il genitore, consegna del diario giornaliero.</p>
            </div>
          </li>
        </ul>
      </section>

      <section class="faq-section" *ngIf="faq$ | async as faqData">
        <h2>Domande frequenti</h2>
        <ul class="faq-list">
          <li *ngFor="let item of faqData.faq" class="faq-item">
            <h3>{{ item.domanda }}</h3>
            <p>{{ item.risposta }}</p>
          </li>
        </ul>
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
      }
      .philosophy {
        max-width: 720px;
        margin: 0 auto 4rem;
      }
      .philosophy h2 {
        margin-bottom: 1rem;
      }
      .philosophy p {
        line-height: 1.75;
        margin-bottom: 1rem;
        color: var(--color-fg-muted);
      }
      .pillars {
        margin-bottom: 4rem;
      }
      .pillars h2 {
        text-align: center;
        margin-bottom: 2rem;
      }
      .pillars-grid {
        list-style: none;
        padding: 0;
        margin: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 1.5rem;
      }
      .pillars-grid li {
        padding: 1.5rem;
        background: var(--color-bg-subtle);
        border-radius: var(--radius-md);
        text-align: center;
      }
      .pillar-icon {
        font-size: 2.5rem;
        display: block;
        margin-bottom: 0.75rem;
      }
      .pillars-grid h3 {
        margin: 0 0 0.5rem;
        color: var(--color-accent);
      }
      .pillars-grid p {
        margin: 0;
        color: var(--color-fg-muted);
        font-size: 0.9rem;
      }
      .routine {
        margin-bottom: 4rem;
      }
      .routine h2 {
        margin-bottom: 2rem;
      }
      .timeline {
        list-style: none;
        padding: 0;
        margin: 0;
        border-left: 3px solid var(--color-accent);
        padding-left: 1.5rem;
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
      }
      .timeline li {
        display: flex;
        gap: 1rem;
        align-items: flex-start;
      }
      .timeline__time {
        font-size: 0.8rem;
        font-weight: 700;
        color: var(--color-accent);
        white-space: nowrap;
        min-width: 110px;
        padding-top: 0.1rem;
      }
      .timeline__content h3 {
        margin: 0 0 0.25rem;
        font-size: 1rem;
      }
      .timeline__content p {
        margin: 0;
        font-size: 0.9rem;
        color: var(--color-fg-muted);
      }
      .faq-section h2 {
        margin-bottom: 1.5rem;
      }
      .faq-list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
      .faq-item {
        padding: 1.25rem;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
      }
      .faq-item h3 {
        margin: 0 0 0.5rem;
        font-size: 1rem;
        color: var(--color-fg-default);
      }
      .faq-item p {
        margin: 0;
        font-size: 0.9rem;
        color: var(--color-fg-muted);
        line-height: 1.6;
      }
      @media (max-width: 600px) {
        .timeline li {
          flex-direction: column;
          gap: 0.25rem;
        }
        .timeline__time {
          min-width: unset;
        }
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgettoEducativoComponent {
  private readonly mockData = inject(MockDataService);

  readonly faq$ = this.mockData.faq$;
}

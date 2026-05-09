import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { MockDataService } from '../../data/mock-data.service';

@Component({
  selector: 'app-iscrizioni',
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf, ReactiveFormsModule],
  template: `
    <section class="page-header">
      <div class="demo-container">
        <h1>Iscrizioni</h1>
        <p>Compila il modulo per richiedere informazioni o prenotare una visita al nido.</p>
      </div>
    </section>

    <article class="demo-container content">
      <div class="iscrizioni-grid">
        <!-- Colonna info -->
        <section class="info-block" *ngIf="info$ | async as info">
          <h2>Come iscriversi</h2>
          <ol class="steps-list">
            <li>
              <span class="step-num">1</span>
              <div>
                <strong>Visita al nido</strong>
                <p>Prenota una visita gratuita con la pedagogista. Potrai vedere gli spazi e porre domande.</p>
              </div>
            </li>
            <li>
              <span class="step-num">2</span>
              <div>
                <strong>Colloquio pre-iscrizione</strong>
                <p>Incontro di 30-40 minuti con la pedagogista e l'educatrice di riferimento assegnata.</p>
              </div>
            </li>
            <li>
              <span class="step-num">3</span>
              <div>
                <strong>Documentazione</strong>
                <p>Modulo di iscrizione, libretto vaccinale, ISEE (per agevolazioni), eventuale dieta speciale.</p>
              </div>
            </li>
            <li>
              <span class="step-num">4</span>
              <div>
                <strong>Inserimento graduale</strong>
                <p>Il calendario di inserimento viene concordato insieme. Primo giorno: genitore presente.</p>
              </div>
            </li>
          </ol>

          <h2>Contatti diretti</h2>
          <ul class="contact-list">
            <li>
              <strong>Telefono:</strong>
              <a [href]="'tel:' + info.contatti.telefono">{{ info.contatti.telefono }}</a>
            </li>
            <li>
              <strong>Email:</strong>
              <a [href]="'mailto:' + info.contatti.email">{{ info.contatti.email }}</a>
            </li>
            <li>
              <strong>WhatsApp:</strong>
              <a [href]="whatsAppLink(info.contatti.whatsapp)" target="_blank" rel="noopener">{{ info.contatti.whatsapp }}</a>
            </li>
          </ul>

          <div class="sezioni-disponibili" *ngIf="sezioni$ | async as sezioniData">
            <h2>Sezioni disponibili</h2>
            <ul class="sezioni-list">
              <li *ngFor="let s of sezioniData.sezioni" class="sezione-item">
                <span aria-hidden="true">{{ s.emoji }}</span>
                <div>
                  <strong>{{ s.nome }}</strong> — {{ s.etaRange }}
                  <br />
                  <span class="sezione-retta">€{{ s.rettaMensile }}/mese</span>
                </div>
              </li>
            </ul>
          </div>
        </section>

        <!-- Colonna form -->
        <section class="form-block">
          <h2>Modulo di richiesta</h2>
          <form [formGroup]="form" (ngSubmit)="onSubmit()" *ngIf="!submitted(); else thankyou">

            <fieldset class="fieldset">
              <legend>Dati del genitore / tutore</legend>

              <div class="field">
                <label for="genitoreNome">Nome e cognome del genitore *</label>
                <input
                  id="genitoreNome"
                  type="text"
                  formControlName="genitoreNome"
                  autocomplete="name"
                  required
                />
              </div>

              <div class="row">
                <div class="field">
                  <label for="genitoreEmail">Email *</label>
                  <input
                    id="genitoreEmail"
                    type="email"
                    formControlName="genitoreEmail"
                    autocomplete="email"
                    required
                  />
                </div>
                <div class="field">
                  <label for="genitoreTelefono">Telefono *</label>
                  <input
                    id="genitoreTelefono"
                    type="tel"
                    formControlName="genitoreTelefono"
                    autocomplete="tel"
                    required
                  />
                </div>
              </div>

              <div class="field field--checkbox">
                <input id="privacyGenitore" type="checkbox" formControlName="privacyGenitore" />
                <label for="privacyGenitore">
                  Acconsento al trattamento dei miei dati personali (genitore/tutore) ai sensi del
                  Regolamento UE 2016/679 (GDPR) per finalità di gestione della richiesta di
                  iscrizione. *
                </label>
              </div>
            </fieldset>

            <fieldset class="fieldset">
              <legend>Dati del bambino</legend>
              <p class="fieldset-note">
                I dati del minore sono trattati separatamente in conformità all'art. 8 GDPR e al
                provvedimento del Garante Privacy sull'infanzia.
              </p>

              <div class="field">
                <label for="bambinNome">Nome del bambino / della bambina *</label>
                <input id="bambinNome" type="text" formControlName="bambinNome" required />
              </div>

              <div class="row">
                <div class="field">
                  <label for="bambinDataNascita">Data di nascita *</label>
                  <input
                    id="bambinDataNascita"
                    type="date"
                    formControlName="bambinDataNascita"
                    required
                  />
                </div>
                <div class="field">
                  <label for="sezioneRichiesta">Sezione richiesta *</label>
                  <select id="sezioneRichiesta" formControlName="sezioneRichiesta" required>
                    <option value="">-- Seleziona --</option>
                    <option value="piccoli">Piccoli (3-12 mesi)</option>
                    <option value="medi">Medi (12-24 mesi)</option>
                    <option value="grandi">Grandi (24-36 mesi)</option>
                  </select>
                </div>
              </div>

              <div class="field">
                <label for="allergie">Allergie o intolleranze alimentari</label>
                <input
                  id="allergie"
                  type="text"
                  formControlName="allergie"
                  placeholder="es. latte vaccino, frutta secca — lascia vuoto se nessuna"
                />
              </div>

              <div class="field field--checkbox">
                <input id="privacyBambino" type="checkbox" formControlName="privacyBambino" />
                <label for="privacyBambino">
                  In qualità di genitore/tutore esercente la responsabilità genitoriale, acconsento
                  al trattamento dei dati personali del minore ai sensi dell'art. 8 GDPR e del
                  D.Lgs. 196/2003 per finalità educative e di gestione del servizio. *
                </label>
              </div>
            </fieldset>

            <div class="field">
              <label for="note">Note aggiuntive o domande</label>
              <textarea id="note" formControlName="note" rows="4" placeholder="Scrivi qui eventuali domande o informazioni rilevanti..."></textarea>
            </div>

            <button type="submit" class="btn btn-primary" [disabled]="form.invalid">
              Invia richiesta
            </button>
            <p class="form-disclaimer">
              Demo non funzionale: nessun dato viene realmente inviato o memorizzato.
              Per iscrivere il tuo bambino contatta direttamente il nido al numero indicato.
            </p>
          </form>

          <ng-template #thankyou>
            <div class="thankyou">
              <span class="thankyou-icon" aria-hidden="true">🌈</span>
              <h3>Grazie, {{ form.value.genitoreNome }}!</h3>
              <p>
                La richiesta per <strong>{{ form.value.bambinNome }}</strong> nella sezione
                <strong>{{ labelSezione(form.value.sezioneRichiesta) }}</strong> è stata simulata.
              </p>
              <p>
                In un sito reale riceveresti un'email di conferma entro 24 ore con i dettagli del
                colloquio pre-iscrizione con la pedagogista.
              </p>
              <button type="button" class="btn btn-secondary" (click)="reset()">
                Nuova richiesta
              </button>
            </div>
          </ng-template>
        </section>
      </div>
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
      .iscrizioni-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: 3rem;
      }
      .info-block h2 {
        margin: 1.5rem 0 0.75rem;
        font-size: 1.15rem;
      }
      .info-block h2:first-child {
        margin-top: 0;
      }
      .steps-list {
        list-style: none;
        padding: 0;
        margin: 0 0 0.5rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
      .steps-list li {
        display: flex;
        gap: 0.75rem;
        align-items: flex-start;
      }
      .step-num {
        width: 28px;
        height: 28px;
        border-radius: 50%;
        background: var(--color-accent);
        color: #ffffff;
        font-size: 0.85rem;
        font-weight: 700;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }
      .steps-list strong {
        display: block;
        margin-bottom: 0.1rem;
      }
      .steps-list p {
        margin: 0;
        font-size: 0.85rem;
        color: var(--color-fg-muted);
      }
      .contact-list {
        list-style: none;
        padding: 0;
        margin: 0 0 0.5rem;
        display: flex;
        flex-direction: column;
        gap: 0.4rem;
      }
      .contact-list li {
        font-size: 0.95rem;
      }
      .sezioni-list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }
      .sezione-item {
        display: flex;
        gap: 0.75rem;
        align-items: center;
        padding: 0.5rem 0.75rem;
        background: var(--color-bg-subtle);
        border-radius: var(--radius-sm);
        font-size: 0.9rem;
      }
      .sezione-item span {
        font-size: 1.25rem;
      }
      .sezione-retta {
        font-size: 0.8rem;
        color: var(--color-accent);
        font-weight: 600;
      }
      .form-block {
        background: var(--color-bg-subtle);
        padding: 2rem;
        border-radius: var(--radius-lg);
      }
      .form-block h2 {
        margin: 0 0 1.5rem;
      }
      .fieldset {
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        padding: 1.25rem;
        margin-bottom: 1.5rem;
      }
      .fieldset legend {
        padding: 0 0.5rem;
        font-weight: 700;
        font-size: 0.95rem;
        color: var(--color-fg-default);
      }
      .fieldset-note {
        font-size: 0.8rem;
        color: var(--color-fg-muted);
        font-style: italic;
        margin: 0 0 1rem;
        background: #fff7ed;
        padding: 0.5rem 0.75rem;
        border-radius: var(--radius-sm);
        border-left: 3px solid var(--color-accent);
      }
      .field {
        margin-bottom: 1rem;
        display: flex;
        flex-direction: column;
      }
      .field label {
        font-size: 0.85rem;
        font-weight: 600;
        margin-bottom: 0.25rem;
      }
      .field input,
      .field select,
      .field textarea {
        padding: 0.5rem 0.75rem;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-sm);
        font-family: inherit;
        font-size: 0.95rem;
        background: #ffffff;
      }
      .field input:focus,
      .field select:focus,
      .field textarea:focus {
        outline: 2px solid var(--color-accent);
        outline-offset: 1px;
        border-color: var(--color-accent);
      }
      .field--checkbox {
        flex-direction: row;
        align-items: flex-start;
        gap: 0.5rem;
      }
      .field--checkbox input[type="checkbox"] {
        margin-top: 0.2rem;
        flex-shrink: 0;
        width: 16px;
        height: 16px;
        padding: 0;
      }
      .field--checkbox label {
        font-weight: 400;
        font-size: 0.82rem;
        color: var(--color-fg-muted);
        line-height: 1.5;
      }
      .row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0.75rem;
      }
      .btn {
        display: inline-block;
        padding: 0.7rem 1.5rem;
        border-radius: var(--radius-md);
        text-decoration: none;
        font-weight: 600;
        border: none;
        cursor: pointer;
        font-size: 0.95rem;
      }
      .btn-primary {
        background: var(--color-accent);
        color: #ffffff;
      }
      .btn-primary:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
      .btn-secondary {
        background: #ffffff;
        color: var(--color-fg-default);
        border: 1px solid var(--color-border);
      }
      .form-disclaimer {
        font-size: 0.8rem;
        color: var(--color-fg-muted);
        font-style: italic;
        margin-top: 0.75rem;
      }
      .thankyou {
        text-align: center;
        padding: 2rem 1rem;
      }
      .thankyou-icon {
        font-size: 3rem;
        display: block;
        margin-bottom: 1rem;
      }
      .thankyou h3 {
        color: var(--color-success);
        margin-bottom: 0.75rem;
      }
      .thankyou p {
        color: var(--color-fg-muted);
        margin-bottom: 0.75rem;
        font-size: 0.95rem;
      }
      @media (max-width: 600px) {
        .row {
          grid-template-columns: 1fr;
        }
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IscrizioniComponent {
  private readonly mockData = inject(MockDataService);
  private readonly fb = inject(FormBuilder);

  readonly info$ = this.mockData.info$;
  readonly sezioni$ = this.mockData.sezioni$;
  readonly submitted = signal(false);

  readonly form: FormGroup = this.fb.nonNullable.group({
    genitoreNome: ['', [Validators.required, Validators.minLength(2)]],
    genitoreEmail: ['', [Validators.required, Validators.email]],
    genitoreTelefono: ['', [Validators.required, Validators.pattern(/^[+0-9 ]{6,}$/)]],
    privacyGenitore: [false, Validators.requiredTrue],
    bambinNome: ['', [Validators.required, Validators.minLength(2)]],
    bambinDataNascita: ['', Validators.required],
    sezioneRichiesta: ['', Validators.required],
    allergie: [''],
    privacyBambino: [false, Validators.requiredTrue],
    note: ['']
  });

  readonly sezioneLabels: Record<string, string> = {
    piccoli: 'Piccoli (3-12 mesi)',
    medi: 'Medi (12-24 mesi)',
    grandi: 'Grandi (24-36 mesi)'
  };

  whatsAppLink(num: string): string {
    const clean = num.replace(/[^0-9]/g, '');
    return `https://wa.me/${clean}`;
  }

  labelSezione(id: string): string {
    return this.sezioneLabels[id] ?? id;
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.submitted.set(true);
    }
  }

  reset(): void {
    this.form.reset({ privacyGenitore: false, privacyBambino: false });
    this.submitted.set(false);
  }
}

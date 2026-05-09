import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { map } from 'rxjs';

import { MockDataService } from '../../data/mock-data.service';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf],
  template: `
    <section class="page-header">
      <div class="demo-container">
        <h1>Il team</h1>
        <p>8 educatrici + pedagogista + 2 ausiliarie — persone appassionate al servizio di famiglie e bambini.</p>
      </div>
    </section>

    <article class="demo-container content" *ngIf="view$ | async as view">
      <section class="team-group">
        <h2>Pedagogista</h2>
        <ul class="team-grid">
          <li *ngFor="let m of view.pedagogiste" class="team-card team-card--featured">
            <div class="team-card__avatar" aria-hidden="true">{{ m.nome.charAt(0) }}</div>
            <h3>{{ m.nome }}</h3>
            <p class="team-card__role">{{ m.ruolo }}</p>
            <p class="team-card__bio">{{ m.bio }}</p>
            <p class="team-card__exp">{{ m.anniEsperienza }} anni di esperienza</p>
            <ul class="team-card__skills">
              <li *ngFor="let s of m.specialita">{{ s }}</li>
            </ul>
          </li>
        </ul>
      </section>

      <section class="team-group">
        <h2>Educatrici</h2>
        <ul class="team-grid">
          <li *ngFor="let m of view.educatrici" class="team-card">
            <div class="team-card__avatar" aria-hidden="true">{{ m.nome.charAt(0) }}</div>
            <h3>{{ m.nome }}</h3>
            <p class="team-card__role">{{ m.ruolo }}</p>
            <p class="team-card__bio">{{ m.bio }}</p>
            <p class="team-card__exp">{{ m.anniEsperienza }} anni di esperienza</p>
            <ul class="team-card__skills">
              <li *ngFor="let s of m.specialita">{{ s }}</li>
            </ul>
          </li>
        </ul>
      </section>

      <section class="team-group">
        <h2>Staff di supporto</h2>
        <ul class="team-grid">
          <li *ngFor="let m of view.ausiliarie" class="team-card">
            <div class="team-card__avatar" aria-hidden="true">{{ m.nome.charAt(0) }}</div>
            <h3>{{ m.nome }}</h3>
            <p class="team-card__role">{{ m.ruolo }}</p>
            <p class="team-card__bio">{{ m.bio }}</p>
            <p class="team-card__exp">{{ m.anniEsperienza }} anni di esperienza</p>
            <ul class="team-card__skills">
              <li *ngFor="let s of m.specialita">{{ s }}</li>
            </ul>
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
        display: flex;
        flex-direction: column;
        gap: 3rem;
      }
      .team-group h2 {
        margin-bottom: 1.5rem;
        padding-bottom: 0.5rem;
        border-bottom: 2px solid var(--color-accent);
        display: inline-block;
      }
      .team-grid {
        list-style: none;
        padding: 0;
        margin: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
        gap: 1.5rem;
      }
      .team-card {
        padding: 1.5rem;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        text-align: center;
      }
      .team-card--featured {
        border-color: var(--color-accent);
        border-width: 2px;
        background: #fff7ed;
      }
      .team-card__avatar {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        background: var(--color-accent);
        color: #ffffff;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2rem;
        font-weight: 700;
        margin: 0 auto 1rem;
      }
      .team-card h3 {
        margin: 0 0 0.25rem;
      }
      .team-card__role {
        margin: 0 0 0.75rem;
        color: var(--color-accent);
        font-weight: 600;
        font-size: 0.9rem;
      }
      .team-card__bio {
        font-size: 0.9rem;
        color: var(--color-fg-muted);
        margin-bottom: 0.5rem;
        text-align: left;
        line-height: 1.6;
      }
      .team-card__exp {
        font-size: 0.8rem;
        font-weight: 600;
        margin-bottom: 0.75rem;
      }
      .team-card__skills {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        gap: 0.4rem;
        flex-wrap: wrap;
        justify-content: center;
      }
      .team-card__skills li {
        font-size: 0.7rem;
        background: var(--color-bg-subtle);
        padding: 0.25rem 0.5rem;
        border-radius: 9999px;
        color: var(--color-fg-muted);
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeamComponent {
  private readonly mockData = inject(MockDataService);

  readonly view$ = this.mockData.team$.pipe(
    map((data) => ({
      pedagogiste: data.team.filter((m) => m.tipo === 'pedagogista'),
      educatrici: data.team.filter((m) => m.tipo === 'educatrice'),
      ausiliarie: data.team.filter((m) => m.tipo === 'ausiliaria')
    }))
  );
}

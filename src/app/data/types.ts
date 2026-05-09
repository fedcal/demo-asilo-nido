// Tipi TypeScript per i dati mock del Nido Arcobaleno

export interface Indirizzo {
  via: string;
  citta: string;
  provincia: string;
  cap: string;
  regione: string;
  paese: string;
  lat: number;
  lng: number;
}

export interface Contatti {
  telefono: string;
  whatsapp: string;
  email: string;
  pec: string;
  social: {
    instagram?: string;
    facebook?: string;
  };
}

export interface OrariApertura {
  lunedi: string;
  martedi: string;
  mercoledi: string;
  giovedi: string;
  venerdi: string;
  sabato: string;
  domenica: string;
}

export interface ServiziNido {
  mensaBiologica: boolean;
  riposino: boolean;
  attivitaEsterne: boolean;
  pedagogista: boolean;
  accessibileDisabili: boolean;
  parcheggioVicino: boolean;
  trasportoScuolabus: boolean;
}

export interface MetaSeo {
  title: string;
  description: string;
  keywords: string[];
}

export interface InfoAttivita {
  ragioneSociale: string;
  nomeCommerciale: string;
  tagline: string;
  autorizzazione: string;
  capienza: number;
  indirizzo: Indirizzo;
  contatti: Contatti;
  orari: OrariApertura;
  servizi: ServiziNido;
  metaSeo: MetaSeo;
}

export interface Sezione {
  id: string;
  nome: string;
  etaRange: string;
  etaMin: number;
  etaMax: number;
  bambinoMax: number;
  rettaMensile: number;
  educatrici: string[];
  descrizione: string;
  attivita: string[];
  emoji: string;
  colorBg: string;
  colorAccent: string;
}

export interface SezioniData {
  sezioni: Sezione[];
}

export interface MembroTeam {
  id: number;
  nome: string;
  ruolo: string;
  tipo: 'pedagogista' | 'educatrice' | 'ausiliaria';
  bio: string;
  anniEsperienza: number;
  specialita: string[];
  sezione: string | null;
}

export interface TeamData {
  team: MembroTeam[];
}

export interface FaqItem {
  domanda: string;
  risposta: string;
}

export interface FaqData {
  faq: FaqItem[];
}

export type Deal = {
  id: string;
  name: string;
  sector: string;
  round: string;
  revenue: number;
  geo: string;
  leadScore: number;
};

export type Lead = Deal;

export type PortfolioCompany = {
  id: string;
  name: string;
  fund: string;
  sector: string;
  status: string;
  irr: number;
  mom: number;
  revenue: number;
  kpis: { date: string; value: number }[];
};

export type Alert = {
  message: string;
  time: string;
};

export type UserRole = 'analyst' | 'partner' | 'lp';

export type ValuationResult = {
  EV: number;
  Equity: number;
  IRR: number;
}; 
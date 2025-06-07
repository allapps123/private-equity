import { create } from 'zustand';
import { PortfolioCompany } from '../kinds';

const now = new Date();
const months = Array.from({ length: 6 }, (_, i) => {
  const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
  return d.toISOString().slice(0, 7);
}).reverse();

const mockCompanies: PortfolioCompany[] = [
  {
    id: 'c1',
    name: 'Acme Health',
    fund: 'Fund I',
    sector: 'Healthcare',
    status: 'Active',
    irr: 18.2,
    mom: 2.1,
    revenue: 12,
    kpis: months.map((m, i) => ({ date: m, value: 10 + i })),
  },
  {
    id: 'c2',
    name: 'FinTechX',
    fund: 'Fund II',
    sector: 'Finance',
    status: 'Exited',
    irr: 25.5,
    mom: 3.4,
    revenue: 20,
    kpis: months.map((m, i) => ({ date: m, value: 15 + i * 2 })),
  },
];

interface KPIState {
  companies: PortfolioCompany[];
  selectedCompany: string | null;
  selectCompany: (id: string) => void;
}

export const usePortfolioStore = create<KPIState>(set => ({
  companies: mockCompanies,
  selectedCompany: null,
  selectCompany: (id) => set({ selectedCompany: id }),
}));

// TODO: Replace with real WebSocket. Simulate live update every 10s.
setInterval(() => {
  usePortfolioStore.setState(state => ({
    companies: state.companies.map(c => ({
      ...c,
      kpis: c.kpis.map(kpi => ({ ...kpi, value: +(kpi.value + Math.random() - 0.5).toFixed(2) })),
      revenue: +(c.revenue + Math.random() - 0.5).toFixed(2),
    }))
  }));
}, 10000); 
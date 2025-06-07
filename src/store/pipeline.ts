import { create } from 'zustand';
import { Deal, Alert } from '../kinds';

const mockLeads = [
  {
    id: '1',
    name: 'Acme HealthTech',
    sector: 'Healthcare',
    round: 'Series B',
    revenue: 45,
    growthRate: 120,
    founded: 2019,
    geo: 'SF Bay Area',
    leadScore: 87
  },
  {
    id: '2', 
    name: 'FinanceAI Corp',
    sector: 'FinTech',
    round: 'Series A',
    revenue: 25,
    growthRate: 85,
    founded: 2020,
    geo: 'New York',
    leadScore: 92
  },
  {
    id: '3',
    name: 'CloudifyPro',
    sector: 'SaaS',
    round: 'Growth',
    revenue: 75,
    growthRate: 65,
    founded: 2017,
    geo: 'Austin',
    leadScore: 78
  }
];

interface DealSearchState {
  leads: Deal[];
  filters: { sector: string; round: string; minRevenue: string; geo: string };
  loading: boolean;
  searchDeals: (filters: { sector?: string; round?: string; minRevenue?: string; geo?: string }) => void;
}

export const useDealSearchStore = create<DealSearchState>((set) => ({
  leads: mockLeads,
  filters: { sector: '', round: '', minRevenue: '', geo: '' },
  loading: false,
  searchDeals: async (filters) => {
    set({ loading: true });
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    const filtered = mockLeads.filter(lead => {
      if (filters.sector && lead.sector !== filters.sector) return false;
      if (filters.round && lead.round !== filters.round) return false;
      if (filters.minRevenue && lead.revenue < Number(filters.minRevenue)) return false;
      if (filters.geo && !lead.geo.toLowerCase().includes(filters.geo.toLowerCase())) return false;
      return true;
    });
    
    // Update filters with defaults for missing properties
    const updatedFilters = {
      sector: filters.sector || '',
      round: filters.round || '',
      minRevenue: filters.minRevenue || '',
      geo: filters.geo || ''
    };
    
    set({ leads: filtered, filters: updatedFilters, loading: false });
  }
}));

interface AlertState {
  alerts: Alert[];
  alertCount: number;
  addAlert: (a: Alert) => void;
}

export const useAlertStore = create<AlertState>(set => ({
  alerts: [],
  alertCount: 0,
  addAlert: (a) => set(state => ({ alerts: [...state.alerts, a], alertCount: state.alertCount + 1 })),
})); 
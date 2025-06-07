import { Router, type Router as ExpressRouter } from 'express';
const router: ExpressRouter = Router();

const now = new Date();
const months = Array.from({ length: 6 }, (_, i) => {
  const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
  return d.toISOString().slice(0, 7);
}).reverse();

const mockCompanies = [
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

router.get('/', (req, res) => {
  setTimeout(() => res.json(mockCompanies), 800);
});

export default router; 
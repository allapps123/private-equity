import { Router, type Router as ExpressRouter } from 'express';
const router: ExpressRouter = Router();

const mockDeals = [
  { id: '1', name: 'Acme Health', sector: 'Healthcare', round: 'Series A', revenue: 12, geo: 'US', leadScore: 88 },
  { id: '2', name: 'FinTechX', sector: 'Finance', round: 'Seed', revenue: 2, geo: 'EU', leadScore: 75 },
  { id: '3', name: 'Cloudify', sector: 'Tech', round: 'Growth', revenue: 30, geo: 'US', leadScore: 92 },
];

router.get('/', (req, res) => {
  const { sector, round, revenueMin, geo } = req.query;
  let results = mockDeals;
  if (sector) results = results.filter(d => d.sector === sector);
  if (round) results = results.filter(d => d.round === round);
  if (geo) results = results.filter(d => d.geo === geo);
  if (revenueMin) results = results.filter(d => d.revenue >= Number(revenueMin));
  setTimeout(() => res.json(results), 800); // Simulate async
});

// TODO: Add CRUD endpoints

export default router; 
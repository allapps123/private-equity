import { Router, type Router as ExpressRouter } from 'express';
const router: ExpressRouter = Router();

router.post('/', (req, res) => {
  const { revenue, ebitda, exitMultiple, wacc, growthRate } = req.body;
  // TODO: Replace with real DCF logic
  const EV = +(ebitda * exitMultiple).toFixed(2);
  const Equity = +(EV * 0.8).toFixed(2);
  const IRR = +((ebitda / EV) * 100).toFixed(2);
  setTimeout(() => res.json({ EV, Equity, IRR }), 800);
});

export default router; 
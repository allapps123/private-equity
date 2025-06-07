import { Router, type Router as ExpressRouter } from 'express';
const router: ExpressRouter = Router();

router.post('/login', (req, res) => {
  const { role } = req.body;
  // TODO: Replace with real JWT logic
  if (!['analyst', 'partner', 'lp'].includes(role)) return res.status(400).json({ error: 'Invalid role' });
  res.json({ token: role });
});

export default router; 
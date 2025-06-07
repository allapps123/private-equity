import express from 'express';
import cors from 'cors';
import dealsRouter from './routes/deals.js';
import valuationRouter from './routes/valuation.js';
import portfolioRouter from './routes/portfolio.js';
import authRouter from './routes/auth.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/deals', dealsRouter);
app.use('/api/valuation', valuationRouter);
app.use('/api/portfolio', portfolioRouter);
app.use('/api/auth', authRouter);

// TODO: Plug in real DB/API here

app.listen(4000, () => {
  console.log('Mock API server running on http://localhost:4000');
}); 
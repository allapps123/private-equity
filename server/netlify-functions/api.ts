import express from 'express';
import cors from 'cors';
import { Handler } from '@netlify/functions';
import serverless from 'serverless-http';

// Import routes
import dealsRouter from '../routes/deals.js';
import valuationRouter from '../routes/valuation.js';
import portfolioRouter from '../routes/portfolio.js';
import authRouter from '../routes/auth.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/deals', dealsRouter);
app.use('/api/valuation', valuationRouter);
app.use('/api/portfolio', portfolioRouter);
app.use('/api/auth', authRouter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Export handler for Netlify Functions
export const handler: Handler = serverless(app); 
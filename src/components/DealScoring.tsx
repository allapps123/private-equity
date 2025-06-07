import { useState, useEffect } from 'react';

interface DealScore {
  overall: number;
  market: number;
  financial: number;
  team: number;
  risk: number;
  recommendation: 'Strong Buy' | 'Buy' | 'Hold' | 'Pass';
}

interface DealScoringProps {
  deal: {
    name: string;
    sector: string;
    revenue: number;
    growthRate: number;
    round: string;
  };
}

const ScoreBar = ({ label, score, color }: { label: string; score: number; color: string }) => (
  <div className="flex items-center gap-3">
    <span className="text-sm font-medium w-20">{label}</span>
    <div className="flex-1 bg-gray-200 rounded-full h-2">
      <div 
        className={`h-2 rounded-full ${color}`}
        style={{ width: `${score}%` }}
      />
    </div>
    <span className="text-sm font-bold w-8">{score}</span>
  </div>
);

export default function DealScoring({ deal }: DealScoringProps) {
  const [score, setScore] = useState<DealScore | null>(null);
  const [loading, setLoading] = useState(false);

  const calculateScore = () => {
    setLoading(true);
    
    // Simulate AI scoring algorithm
    setTimeout(() => {
      const sectorMultiplier = {
        'Healthcare': 0.9,
        'FinTech': 0.95,
        'AI/ML': 1.0,
        'SaaS': 0.85,
        'E-commerce': 0.8
      }[deal.sector] || 0.7;

      const revenueScore = Math.min(deal.revenue / 50 * 100, 100);
      const growthScore = Math.min(deal.growthRate * 2, 100);
      const roundScore = {
        'Seed': 60,
        'Series A': 75,
        'Series B': 85,
        'Series C': 90,
        'Growth': 95
      }[deal.round] || 50;

      const market = Math.round(sectorMultiplier * 100);
      const financial = Math.round((revenueScore + growthScore) / 2);
      const team = Math.round(70 + Math.random() * 30); // Simulated
      const risk = Math.round(100 - (financial * 0.3 + market * 0.2 + team * 0.2));
      const overall = Math.round((market + financial + team - risk/2) / 3);

      let recommendation: DealScore['recommendation'];
      if (overall >= 85) recommendation = 'Strong Buy';
      else if (overall >= 70) recommendation = 'Buy';
      else if (overall >= 55) recommendation = 'Hold';
      else recommendation = 'Pass';

      setScore({
        overall,
        market,
        financial,
        team,
        risk: 100 - risk,
        recommendation
      });
      setLoading(false);
    }, 1500);
  };

  useEffect(() => {
    if (deal.name) {
      calculateScore();
    }
  }, [deal]);

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">AI Deal Scoring</h3>
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2">Analyzing deal quality...</span>
        </div>
      </div>
    );
  }

  if (!score) return null;

  const recommendationColors = {
    'Strong Buy': 'bg-green-100 text-green-800 border-green-200',
    'Buy': 'bg-blue-100 text-blue-800 border-blue-200',
    'Hold': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'Pass': 'bg-red-100 text-red-800 border-red-200'
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <h3 className="text-lg font-semibold mb-4">AI Deal Scoring</h3>
      
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Overall Score</span>
          <span className="text-2xl font-bold text-blue-600">{score.overall}/100</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-600"
            style={{ width: `${score.overall}%` }}
          />
        </div>
      </div>

      <div className="space-y-3 mb-6">
        <ScoreBar label="Market" score={score.market} color="bg-green-500" />
        <ScoreBar label="Financial" score={score.financial} color="bg-blue-500" />
        <ScoreBar label="Team" score={score.team} color="bg-purple-500" />
        <ScoreBar label="Risk" score={score.risk} color="bg-orange-500" />
      </div>

      <div className="border-t pt-4">
        <div className="flex items-center justify-between">
          <span className="font-medium">Recommendation:</span>
          <span className={`px-3 py-1 rounded-full text-sm font-medium border ${recommendationColors[score.recommendation]}`}>
            {score.recommendation}
          </span>
        </div>
        
        <div className="mt-3 text-sm text-gray-600">
          {score.recommendation === 'Strong Buy' && "Exceptional opportunity with strong fundamentals"}
          {score.recommendation === 'Buy' && "Solid investment with good growth potential"}
          {score.recommendation === 'Hold' && "Moderate opportunity, requires further analysis"}
          {score.recommendation === 'Pass' && "High risk or limited upside potential"}
        </div>
      </div>

      <button 
        className="w-full mt-4 shadcn-btn-secondary text-sm"
        onClick={() => window.open('/ai-analysis-report.pdf', '_blank')}
      >
        📄 Download Full AI Analysis Report
      </button>
    </div>
  );
} 
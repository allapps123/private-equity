import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const mockPerformanceData = [
  { month: 'Jan', portfolioValue: 850, irr: 22, deals: 12, nav: 920 },
  { month: 'Feb', portfolioValue: 890, irr: 24, deals: 15, nav: 965 },
  { month: 'Mar', portfolioValue: 925, irr: 26, deals: 18, nav: 1010 },
  { month: 'Apr', portfolioValue: 980, irr: 28, deals: 22, nav: 1080 },
  { month: 'May', portfolioValue: 1050, irr: 30, deals: 25, nav: 1150 },
  { month: 'Jun', portfolioValue: 1120, irr: 32, deals: 28, nav: 1220 }
];

interface PerformanceChartProps {
  timeframe?: '6M' | '1Y' | '3Y' | 'All';
}

export default function PerformanceChart({ timeframe = '6M' }: PerformanceChartProps) {
  const [activeMetric, setActiveMetric] = useState<'portfolioValue' | 'irr' | 'nav'>('portfolioValue');
  const [chartType, setChartType] = useState<'line' | 'area'>('area');

  const metrics = [
    { key: 'portfolioValue', label: 'Portfolio Value', color: '#3b82f6', suffix: 'M' },
    { key: 'irr', label: 'IRR', color: '#10b981', suffix: '%' },
    { key: 'nav', label: 'NAV', color: '#f59e0b', suffix: 'M' }
  ];

  const activeMetricConfig = metrics.find(m => m.key === activeMetric)!;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold">Portfolio Performance</h3>
          <p className="text-sm text-gray-600">Track key metrics over time</p>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex bg-gray-100 rounded-lg p-1">
            {['6M', '1Y', '3Y', 'All'].map(period => (
              <button
                key={period}
                className={`px-3 py-1 text-xs rounded ${
                  timeframe === period 
                    ? 'bg-white shadow-sm font-medium' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {period}
              </button>
            ))}
          </div>
          
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setChartType('line')}
              className={`px-3 py-1 text-xs rounded ${
                chartType === 'line' ? 'bg-white shadow-sm' : 'text-gray-600'
              }`}
            >
              📈 Line
            </button>
            <button
              onClick={() => setChartType('area')}
              className={`px-3 py-1 text-xs rounded ${
                chartType === 'area' ? 'bg-white shadow-sm' : 'text-gray-600'
              }`}
            >
              📊 Area
            </button>
          </div>
        </div>
      </div>

      <div className="flex gap-4 mb-4">
        {metrics.map(metric => (
          <button
            key={metric.key}
            onClick={() => setActiveMetric(metric.key as any)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-colors ${
              activeMetric === metric.key
                ? 'border-blue-200 bg-blue-50 text-blue-700'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: metric.color }}
            />
            <span className="text-sm font-medium">{metric.label}</span>
            {activeMetric === metric.key && (
              <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                Active
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'area' ? (
            <AreaChart data={mockPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
                formatter={(value: any) => [`${value}${activeMetricConfig.suffix}`, activeMetricConfig.label]}
              />
              <Area
                type="monotone"
                dataKey={activeMetric}
                stroke={activeMetricConfig.color}
                strokeWidth={2}
                fill={activeMetricConfig.color}
                fillOpacity={0.1}
              />
            </AreaChart>
          ) : (
            <LineChart data={mockPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
                formatter={(value: any) => [`${value}${activeMetricConfig.suffix}`, activeMetricConfig.label]}
              />
              <Line
                type="monotone"
                dataKey={activeMetric}
                stroke={activeMetricConfig.color}
                strokeWidth={3}
                dot={{ fill: activeMetricConfig.color, strokeWidth: 0, r: 4 }}
                activeDot={{ r: 6, stroke: activeMetricConfig.color, strokeWidth: 2, fill: 'white' }}
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">+18.5%</div>
          <div className="text-xs text-gray-600">vs Last Quarter</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">32.1%</div>
          <div className="text-xs text-gray-600">Current IRR</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-orange-600">2.8x</div>
          <div className="text-xs text-gray-600">Average MoM</div>
        </div>
      </div>
    </div>
  );
} 
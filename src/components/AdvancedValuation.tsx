import { useState } from 'react';
import { WaterfallChart } from './WaterfallChart';

interface ValuationMethod {
  method: 'DCF' | 'Comparables' | 'Precedent';
  value: number;
  weight: number;
}

interface Scenario {
  name: string;
  probability: number;
  revenue: number;
  ebitda: number;
  multiple: number;
  value: number;
}

export default function AdvancedValuation() {
  const [activeTab, setActiveTab] = useState<'methods' | 'scenarios' | 'sensitivity'>('methods');
  const [form, setForm] = useState({
    revenue: '100',
    ebitda: '25',
    growthRate: '15',
    wacc: '12',
    terminalMultiple: '12',
    comparableMultiple: '10',
    precedentMultiple: '11'
  });

  const [methods, setMethods] = useState<ValuationMethod[]>([
    { method: 'DCF', value: 425, weight: 40 },
    { method: 'Comparables', value: 380, weight: 35 },
    { method: 'Precedent', value: 410, weight: 25 }
  ]);

  const scenarios: Scenario[] = [
    { name: 'Bull Case', probability: 0.25, revenue: 120, ebitda: 35, multiple: 14, value: 490 },
    { name: 'Base Case', probability: 0.50, revenue: 100, ebitda: 25, multiple: 12, value: 425 },
    { name: 'Bear Case', probability: 0.25, revenue: 80, ebitda: 18, multiple: 10, value: 320 }
  ];

  const weightedValuation = methods.reduce((sum, m) => sum + (m.value * m.weight / 100), 0);
  const probabilityWeightedValue = scenarios.reduce((sum, s) => sum + (s.value * s.probability), 0);

  const updateWeight = (method: ValuationMethod['method'], newWeight: number) => {
    const totalOtherWeights = methods.filter(m => m.method !== method).reduce((sum, m) => sum + m.weight, 0);
    const maxWeight = 100 - totalOtherWeights;
    const adjustedWeight = Math.min(newWeight, maxWeight);
    
    setMethods(prev => prev.map(m => 
      m.method === method ? { ...m, weight: adjustedWeight } : m
    ));
  };

  const sensitivityData = [
    { wacc: '10%', multiple: '10x', value: 380, multiple12: 420, multiple14: 460 },
    { wacc: '11%', multiple: '11x', value: 400, multiple12: 440, multiple14: 480 },
    { wacc: '12%', multiple: '12x', value: 425, multiple12: 465, multiple14: 505 },
    { wacc: '13%', multiple: '13x', value: 440, multiple12: 480, multiple14: 520 },
    { wacc: '14%', multiple: '14x', value: 455, multiple12: 495, multiple14: 535 }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { key: 'methods', label: 'Valuation Methods' },
              { key: 'scenarios', label: 'Scenario Analysis' },
              { key: 'sensitivity', label: 'Sensitivity Analysis' }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.key
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'methods' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Inputs</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <label>
                      Revenue ($M)
                      <input 
                        type="number" 
                        className="shadcn-input mt-1"
                        value={form.revenue}
                        onChange={e => setForm(f => ({ ...f, revenue: e.target.value }))}
                      />
                    </label>
                    <label>
                      EBITDA ($M)
                      <input 
                        type="number" 
                        className="shadcn-input mt-1"
                        value={form.ebitda}
                        onChange={e => setForm(f => ({ ...f, ebitda: e.target.value }))}
                      />
                    </label>
                    <label>
                      Growth Rate (%)
                      <input 
                        type="number" 
                        className="shadcn-input mt-1"
                        value={form.growthRate}
                        onChange={e => setForm(f => ({ ...f, growthRate: e.target.value }))}
                      />
                    </label>
                    <label>
                      WACC (%)
                      <input 
                        type="number" 
                        className="shadcn-input mt-1"
                        value={form.wacc}
                        onChange={e => setForm(f => ({ ...f, wacc: e.target.value }))}
                      />
                    </label>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Method Weights</h3>
                  <div className="space-y-4">
                    {methods.map(method => (
                      <div key={method.method} className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium">{method.method}</span>
                            <span className="text-sm text-gray-600">${method.value}M</span>
                          </div>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={method.weight}
                            onChange={e => updateWeight(method.method, Number(e.target.value))}
                            className="w-full"
                          />
                        </div>
                        <span className="text-sm font-bold ml-4 w-12">{method.weight}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-lg mb-2">Weighted Average Valuation</h4>
                  <div className="text-3xl font-bold text-blue-600">${weightedValuation.toFixed(0)}M</div>
                  <div className="text-sm text-gray-600 mt-1">
                    Range: ${Math.min(...methods.map(m => m.value))}M - ${Math.max(...methods.map(m => m.value))}M
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="font-semibold mb-3">Valuation Bridge</h4>
                <WaterfallChart />
              </div>
            </div>
          )}

          {activeTab === 'scenarios' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Scenario Analysis</h3>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-200">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-200 px-4 py-2 text-left">Scenario</th>
                      <th className="border border-gray-200 px-4 py-2 text-left">Probability</th>
                      <th className="border border-gray-200 px-4 py-2 text-left">Revenue ($M)</th>
                      <th className="border border-gray-200 px-4 py-2 text-left">EBITDA ($M)</th>
                      <th className="border border-gray-200 px-4 py-2 text-left">Multiple</th>
                      <th className="border border-gray-200 px-4 py-2 text-left">Valuation ($M)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scenarios.map((scenario, i) => (
                      <tr key={i} className={scenario.name === 'Base Case' ? 'bg-blue-50' : ''}>
                        <td className="border border-gray-200 px-4 py-2 font-medium">{scenario.name}</td>
                        <td className="border border-gray-200 px-4 py-2">{(scenario.probability * 100).toFixed(0)}%</td>
                        <td className="border border-gray-200 px-4 py-2">${scenario.revenue}</td>
                        <td className="border border-gray-200 px-4 py-2">${scenario.ebitda}</td>
                        <td className="border border-gray-200 px-4 py-2">{scenario.multiple}x</td>
                        <td className="border border-gray-200 px-4 py-2 font-bold">${scenario.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-lg mb-2">Probability-Weighted Value</h4>
                <div className="text-3xl font-bold text-green-600">${probabilityWeightedValue.toFixed(0)}M</div>
                <div className="text-sm text-gray-600 mt-1">
                  Expected return based on scenario probabilities
                </div>
              </div>
            </div>
          )}

          {activeTab === 'sensitivity' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Sensitivity Analysis</h3>
              <p className="text-gray-600">Valuation sensitivity to WACC and exit multiple changes</p>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-200">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-200 px-4 py-2">WACC / Multiple</th>
                      <th className="border border-gray-200 px-4 py-2">10x</th>
                      <th className="border border-gray-200 px-4 py-2">12x</th>
                      <th className="border border-gray-200 px-4 py-2">14x</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sensitivityData.map((row, i) => (
                      <tr key={i}>
                        <td className="border border-gray-200 px-4 py-2 font-medium bg-gray-50">{row.wacc}</td>
                        <td className="border border-gray-200 px-4 py-2 text-center">${row.value}</td>
                        <td className="border border-gray-200 px-4 py-2 text-center font-bold bg-blue-50">${row.multiple12}</td>
                        <td className="border border-gray-200 px-4 py-2 text-center">${row.multiple14}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Key Insights</h4>
                  <ul className="text-sm space-y-1">
                    <li>• 1% WACC change = ~$15M value impact</li>
                    <li>• 1x multiple change = ~$25M value impact</li>
                    <li>• Base case assumes 12% WACC, 12x multiple</li>
                  </ul>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Risk Factors</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Market conditions affecting multiples</li>
                    <li>• Interest rate sensitivity via WACC</li>
                    <li>• Execution risk on growth assumptions</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 
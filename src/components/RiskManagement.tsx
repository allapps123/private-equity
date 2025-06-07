import { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const riskFactors = [
  { name: 'Market Risk', value: 35, severity: 'High', description: 'Economic downturn exposure' },
  { name: 'Operational Risk', value: 25, severity: 'Medium', description: 'Execution and management risk' },
  { name: 'Financial Risk', value: 20, severity: 'Medium', description: 'Leverage and liquidity concerns' },
  { name: 'Regulatory Risk', value: 15, severity: 'Low', description: 'Compliance and policy changes' },
  { name: 'Technology Risk', value: 5, severity: 'Low', description: 'Digital transformation risk' }
];

const stressTestScenarios = [
  { scenario: 'Base Case', portfolioValue: 1200, drawdown: 0, recovery: 0 },
  { scenario: 'Mild Recession', portfolioValue: 1050, drawdown: -12.5, recovery: 18 },
  { scenario: 'Severe Recession', portfolioValue: 840, drawdown: -30, recovery: 36 },
  { scenario: 'Market Crash', portfolioValue: 600, drawdown: -50, recovery: 60 }
];

const companyRisks = [
  { name: 'Acme HealthTech', riskScore: 75, factors: ['Market Competition', 'Regulatory Changes'] },
  { name: 'FinanceAI Corp', riskScore: 45, factors: ['Technology Obsolescence'] },
  { name: 'CloudifyPro', riskScore: 60, factors: ['Customer Concentration', 'Churn Risk'] }
];

const COLORS = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6'];

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'High': return 'bg-red-100 text-red-800 border-red-200';
    case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'Low': return 'bg-green-100 text-green-800 border-green-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

export default function RiskManagement() {
  const [activeTab, setActiveTab] = useState<'overview' | 'stress' | 'companies'>('overview');
  const [selectedRisk, setSelectedRisk] = useState<string | null>(null);

  const overallRiskScore = Math.round(
    riskFactors.reduce((sum, risk) => sum + (risk.value * (risk.severity === 'High' ? 3 : risk.severity === 'Medium' ? 2 : 1)), 0) / 3
  );

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { key: 'overview', label: 'Risk Overview', icon: '⚠️' },
              { key: 'stress', label: 'Stress Testing', icon: '📊' },
              { key: 'companies', label: 'Company Risk', icon: '🏢' }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                  activeTab === tab.key
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <h3 className="text-lg font-semibold mb-4">Portfolio Risk Distribution</h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={riskFactors}
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, value }) => `${name}: ${value}%`}
                        >
                          {riskFactors.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value: any) => [`${value}%`, 'Risk Allocation']} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-red-50 to-orange-50 p-6 rounded-lg border">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-red-600 mb-2">{overallRiskScore}</div>
                      <div className="text-sm text-gray-600">Overall Risk Score</div>
                      <div className="mt-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                          overallRiskScore >= 70 ? 'bg-red-100 text-red-800 border-red-200' :
                          overallRiskScore >= 40 ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                          'bg-green-100 text-green-800 border-green-200'
                        }`}>
                          {overallRiskScore >= 70 ? 'High Risk' : overallRiskScore >= 40 ? 'Medium Risk' : 'Low Risk'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm">Key Risk Alerts</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 p-2 bg-red-50 rounded border-l-4 border-red-400">
                        <span className="text-red-500">🔴</span>
                        <span className="text-sm">Market volatility increased 15%</span>
                      </div>
                      <div className="flex items-center gap-2 p-2 bg-yellow-50 rounded border-l-4 border-yellow-400">
                        <span className="text-yellow-500">🟡</span>
                        <span className="text-sm">2 companies below target IRR</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Risk Factor Analysis</h4>
                <div className="space-y-3">
                  {riskFactors.map((risk, index) => (
                    <div 
                      key={risk.name}
                      className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                        selectedRisk === risk.name ? 'border-blue-200 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedRisk(selectedRisk === risk.name ? null : risk.name)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: COLORS[index] }}
                          />
                          <div>
                            <div className="font-medium">{risk.name}</div>
                            <div className="text-sm text-gray-600">{risk.description}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(risk.severity)}`}>
                            {risk.severity}
                          </span>
                          <span className="font-bold">{risk.value}%</span>
                        </div>
                      </div>
                      
                      {selectedRisk === risk.name && (
                        <div className="mt-3 pt-3 border-t border-gray-200">
                          <div className="text-sm text-gray-600">
                            <strong>Mitigation Strategies:</strong>
                            <ul className="mt-1 ml-4 list-disc">
                              <li>Diversification across sectors and geographies</li>
                              <li>Regular stress testing and scenario planning</li>
                              <li>Enhanced due diligence processes</li>
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'stress' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Stress Test Results</h3>
                <p className="text-gray-600 mb-6">Portfolio performance under various economic scenarios</p>
              </div>

              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stressTestScenarios}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="scenario" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value: any, name: string) => [
                        name === 'portfolioValue' ? `$${value}M` : `${value}%`,
                        name === 'portfolioValue' ? 'Portfolio Value' : 
                        name === 'drawdown' ? 'Max Drawdown' : 'Recovery Time (months)'
                      ]}
                    />
                    <Bar dataKey="portfolioValue" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stressTestScenarios.map((scenario, index) => (
                  <div key={scenario.scenario} className="p-4 rounded-lg border">
                    <h4 className="font-semibold mb-2">{scenario.scenario}</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Portfolio Value</span>
                        <span className="font-medium">${scenario.portfolioValue}M</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Max Drawdown</span>
                        <span className={`font-medium ${scenario.drawdown < 0 ? 'text-red-600' : 'text-gray-900'}`}>
                          {scenario.drawdown}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Recovery Time</span>
                        <span className="font-medium">{scenario.recovery} months</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'companies' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Company Risk Assessment</h3>
                <p className="text-gray-600 mb-6">Individual risk profiles and monitoring</p>
              </div>

              <div className="space-y-4">
                {companyRisks.map(company => (
                  <div key={company.name} className="p-6 rounded-lg border">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-lg">{company.name}</h4>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-600">Risk Score</span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-2 bg-gray-200 rounded-full">
                            <div 
                              className={`h-2 rounded-full ${
                                company.riskScore >= 70 ? 'bg-red-500' :
                                company.riskScore >= 40 ? 'bg-yellow-500' :
                                'bg-green-500'
                              }`}
                              style={{ width: `${company.riskScore}%` }}
                            />
                          </div>
                          <span className="font-bold">{company.riskScore}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <span className="text-sm font-medium text-gray-700">Key Risk Factors:</span>
                      <div className="flex gap-2 mt-2">
                        {company.factors.map(factor => (
                          <span key={factor} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                            {factor}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 
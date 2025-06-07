import { useState, useEffect } from 'react';

export default function Valuation() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState('');
  const [valuationMethod, setValuationMethod] = useState('dcf');
  const [isCalculating, setIsCalculating] = useState(false);
  const [results, setResults] = useState<any>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const companies = [
    {
      id: 'vietpay',
      name: 'VietPay Solutions',
      industry: 'Fintech',
      stage: 'Series A',
      logo: '💳',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'edusmart',
      name: 'EduSmart Vietnam',
      industry: 'EdTech',
      stage: 'Seed',
      logo: '📚',
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'healthhub',
      name: 'HealthHub Digital',
      industry: 'HealthTech',
      stage: 'Series B',
      logo: '🏥',
      color: 'from-red-500 to-pink-500'
    }
  ];

  const valuationMethods = [
    {
      id: 'dcf',
      name: 'DCF Model',
      description: 'Mô hình định giá dòng tiền chiết khấu với AI forecasting',
      icon: '📊',
      complexity: 'Advanced',
      accuracy: 95
    },
    {
      id: 'comparable',
      name: 'Comparable Analysis',
      description: 'So sánh với các công ty tương tự trong cùng ngành',
      icon: '🔄',
      complexity: 'Medium',
      accuracy: 87
    },
    {
      id: 'venture',
      name: 'Venture Capital Method',
      description: 'Phương pháp định giá startup theo giai đoạn phát triển',
      icon: '🚀',
      complexity: 'Simple',
      accuracy: 78
    }
  ];

  const handleCalculate = async () => {
    setIsCalculating(true);
    // Simulate AI calculation
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Mock results
    setResults({
      baseCase: 125.6,
      optimistic: 189.4,
      pessimistic: 87.3,
      confidence: 92,
      keyMetrics: {
        revenue: { current: 12.5, projected: 45.8, growth: '267%' },
        ebitda: { current: 2.1, projected: 12.4, margin: '27%' },
        users: { current: '2.1M', projected: '8.7M', growth: '314%' }
      },
      risks: [
        { factor: 'Market Competition', impact: 'Medium', probability: 65 },
        { factor: 'Regulatory Changes', impact: 'High', probability: 35 },
        { factor: 'Technology Disruption', impact: 'Low', probability: 20 }
      ]
    });
    
    setIsCalculating(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      {/* Header */}
      <div className={`mb-8 transition-all duration-1000 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold text-transparent bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text animate-rainbow-pulse bg-500%">
              💰 AI Valuation Engine
            </h1>
            <p className="text-xl text-gray-300 mt-2">
              Định giá chính xác với sức mạnh trí tuệ nhân tạo và machine learning
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="px-4 py-2 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30 rounded-xl">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></span>
                <span className="text-green-400 font-semibold">AI Online</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Input Panel */}
        <div className="lg:col-span-1 space-y-6">
          {/* Company Selection */}
          <div className={`bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 transition-all duration-1000 delay-200 ${isVisible ? 'animate-slide-in-left' : 'opacity-0'}`}>
            <h2 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
              <span className="animate-magic-sparkle">🏢</span>
              <span>Chọn Công Ty</span>
            </h2>

            <div className="space-y-3">
              {companies.map((company, index) => (
                <button
                  key={company.id}
                  onClick={() => setSelectedCompany(company.id)}
                  className={`w-full p-4 rounded-xl transition-all duration-300 hover:scale-105 group ${
                    selectedCompany === company.id
                      ? `bg-gradient-to-r ${company.color} animate-pulse-glow`
                      : 'bg-white/5 border border-white/20 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl group-hover:animate-bounce-gentle">{company.logo}</span>
                    <div className="text-left">
                      <h3 className="font-semibold text-white">{company.name}</h3>
                      <p className="text-sm text-gray-400">{company.industry} • {company.stage}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Valuation Method */}
          <div className={`bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 transition-all duration-1000 delay-400 ${isVisible ? 'animate-slide-in-left' : 'opacity-0'}`}>
            <h2 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
              <span className="animate-magic-sparkle">⚙️</span>
              <span>Phương Pháp Định Giá</span>
            </h2>

            <div className="space-y-3">
              {valuationMethods.map((method, index) => (
                <button
                  key={method.id}
                  onClick={() => setValuationMethod(method.id)}
                  className={`w-full p-4 rounded-xl transition-all duration-300 hover:scale-105 group text-left ${
                    valuationMethod === method.id
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse-glow'
                      : 'bg-white/5 border border-white/20 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <span className="text-xl group-hover:animate-bounce-gentle">{method.icon}</span>
                    <div className="flex-1">
                      <h3 className="font-semibold text-white mb-1">{method.name}</h3>
                      <p className="text-sm text-gray-400 mb-2">{method.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-blue-400">{method.complexity}</span>
                        <span className="text-xs text-green-400">{method.accuracy}% accuracy</span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <button
              onClick={handleCalculate}
              disabled={!selectedCompany || isCalculating}
              className="w-full mt-6 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-xl font-semibold hover:from-emerald-600 hover:to-cyan-600 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isCalculating ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>AI Đang Tính Toán...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <span>🧠</span>
                  <span>Bắt Đầu Định Giá AI</span>
                </div>
              )}
            </button>
          </div>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-2 space-y-6">
          {results ? (
            <>
              {/* Valuation Results */}
              <div className={`bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 transition-all duration-1000 delay-600 ${isVisible ? 'animate-slide-in-right' : 'opacity-0'}`}>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
                    <span className="animate-magic-sparkle">💎</span>
                    <span>Kết Quả Định Giá</span>
                  </h2>
                  <div className={`px-4 py-2 rounded-full text-sm font-bold ${
                    results.confidence >= 90 ? 'bg-green-500/20 text-green-400' :
                    results.confidence >= 80 ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    Độ tin cậy: {results.confidence}%
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center p-6 rounded-xl bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30">
                    <h3 className="text-lg font-semibold text-red-400 mb-2">Pessimistic</h3>
                    <p className="text-3xl font-bold text-red-300">${results.pessimistic}M</p>
                    <p className="text-sm text-gray-400 mt-2">Worst case scenario</p>
                  </div>
                  
                  <div className="text-center p-6 rounded-xl bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30 animate-pulse-glow">
                    <h3 className="text-lg font-semibold text-emerald-400 mb-2">Base Case</h3>
                    <p className="text-4xl font-bold text-emerald-300">${results.baseCase}M</p>
                    <p className="text-sm text-gray-400 mt-2">Most likely valuation</p>
                  </div>
                  
                  <div className="text-center p-6 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30">
                    <h3 className="text-lg font-semibold text-blue-400 mb-2">Optimistic</h3>
                    <p className="text-3xl font-bold text-blue-300">${results.optimistic}M</p>
                    <p className="text-sm text-gray-400 mt-2">Best case scenario</p>
                  </div>
                </div>

                {/* Key Metrics */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
                    <span className="animate-magic-sparkle">📈</span>
                    <span>Chỉ Số Quan Trọng</span>
                  </h3>
                  
                  <div className="grid md:grid-cols-3 gap-4">
                    {Object.entries(results.keyMetrics).map(([key, metric]: [string, any], index) => (
                      <div
                        key={key}
                        className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 group"
                      >
                        <h4 className="font-semibold text-white mb-2 capitalize">{key}</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-400 text-sm">Hiện tại:</span>
                            <span className="text-white font-semibold">{metric.current}{key === 'revenue' || key === 'ebitda' ? 'M' : ''}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400 text-sm">Dự kiến:</span>
                            <span className="text-emerald-400 font-semibold">{metric.projected}{key === 'revenue' || key === 'ebitda' ? 'M' : ''}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400 text-sm">Tăng trưởng:</span>
                            <span className="text-blue-400 font-semibold">{metric.growth || metric.margin}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Risk Analysis */}
              <div className={`bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 transition-all duration-1000 delay-800 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
                <h2 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
                  <span className="animate-magic-sparkle">⚠️</span>
                  <span>Phân Tích Rủi Ro</span>
                </h2>

                <div className="space-y-4">
                  {results.risks.map((risk: any, index: number) => (
                    <div
                      key={index}
                      className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 group"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-white">{risk.factor}</h3>
                        <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                          risk.impact === 'High' ? 'bg-red-500/20 text-red-400' :
                          risk.impact === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-green-500/20 text-green-400'
                        }`}>
                          {risk.impact} Impact
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <span className="text-gray-400 text-sm">Probability:</span>
                        <div className="flex-1 bg-gray-700 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-1000 ${
                              risk.probability >= 70 ? 'bg-gradient-to-r from-red-400 to-red-500' :
                              risk.probability >= 40 ? 'bg-gradient-to-r from-yellow-400 to-yellow-500' :
                              'bg-gradient-to-r from-green-400 to-green-500'
                            }`}
                            style={{ width: `${risk.probability}%` }}
                          ></div>
                        </div>
                        <span className="text-white font-semibold text-sm">{risk.probability}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            /* Empty State */
            <div className={`bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-12 text-center transition-all duration-1000 delay-600 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
              <div className="text-8xl mb-6 animate-float">🧠</div>
              <h3 className="text-2xl font-bold text-white mb-4">AI Valuation Engine</h3>
              <p className="text-gray-400 mb-8 max-w-md mx-auto leading-relaxed">
                Chọn công ty và phương pháp định giá để bắt đầu phân tích với AI. 
                Kết quả sẽ có độ chính xác lên đến 95% với machine learning models.
              </p>
              
              <div className="grid grid-cols-3 gap-6 max-w-md mx-auto">
                {[
                  { icon: '⚡', label: 'Nhanh chóng', desc: '< 30 giây' },
                  { icon: '🎯', label: 'Chính xác', desc: '95% accuracy' },
                  { icon: '🧠', label: 'Thông minh', desc: 'AI-powered' }
                ].map((feature, index) => (
                  <div key={index} className="text-center">
                    <span className="text-3xl mb-2 block animate-bounce-gentle" style={{ animationDelay: `${index * 200}ms` }}>
                      {feature.icon}
                    </span>
                    <h4 className="font-semibold text-white text-sm mb-1">{feature.label}</h4>
                    <p className="text-xs text-gray-400">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-8 right-8">
        <button className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full shadow-magic hover:shadow-hologram transition-all duration-300 hover:scale-110 animate-levitate group">
          <span className="text-2xl group-hover:animate-magic-sparkle">💰</span>
        </button>
      </div>
    </div>
  );
} 
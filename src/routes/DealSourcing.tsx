import { useState, useEffect } from 'react';
import DealSearchPane from '../components/DealSearchPane';
import LeadCard from '../components/LeadCard';
import DealScoring from '../components/DealScoring';
import { useDealSearchStore } from '../store/pipeline';

export default function DealSourcing() {
  const { leads } = useDealSearchStore();
  const [selectedDeal, setSelectedDeal] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [aiMode, setAiMode] = useState(true);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const industries = [
    { name: 'Fintech', icon: '💳', color: 'from-blue-500 to-cyan-500', count: 23 },
    { name: 'EdTech', icon: '📚', color: 'from-green-500 to-emerald-500', count: 18 },
    { name: 'HealthTech', icon: '🏥', color: 'from-red-500 to-pink-500', count: 15 },
    { name: 'E-commerce', icon: '🛒', color: 'from-purple-500 to-indigo-500', count: 31 },
    { name: 'AI/ML', icon: '🤖', color: 'from-orange-500 to-yellow-500', count: 12 },
    { name: 'Blockchain', icon: '⛓️', color: 'from-gray-500 to-slate-500', count: 8 }
  ];

  const dealCards = [
    {
      id: 1,
      company: 'VietPay Solutions',
      industry: 'Fintech',
      stage: 'Series A',
      valuation: '$25M',
      growth: '+180%',
      aiScore: 94,
      description: 'Nền tảng thanh toán số hàng đầu Việt Nam với 2M+ người dùng',
      highlights: ['Payment Gateway', 'Digital Wallet', 'QR Payments'],
      founded: '2020',
      employees: '150+',
      location: 'TP.HCM',
      logo: '💳'
    },
    {
      id: 2,
      company: 'EduSmart Vietnam',
      industry: 'EdTech',
      stage: 'Seed',
      valuation: '$8M',
      growth: '+320%',
      aiScore: 89,
      description: 'Nền tảng học trực tuyến AI cho giáo dục phổ thông',
      highlights: ['Adaptive Learning', 'AI Tutoring', 'Progress Analytics'],
      founded: '2021',
      employees: '45+',
      location: 'Hà Nội',
      logo: '📚'
    },
    {
      id: 3,
      company: 'HealthHub Digital',
      industry: 'HealthTech',
      stage: 'Series B',
      valuation: '$45M',
      growth: '+95%',
      aiScore: 91,
      description: 'Hệ thống quản lý sức khỏe số cho bệnh viện và phòng khám',
      highlights: ['EMR System', 'Telemedicine', 'Health Analytics'],
      founded: '2019',
      employees: '200+',
      location: 'Đà Nẵng',
      logo: '🏥'
    },
    {
      id: 4,
      company: 'GreenLogistics Pro',
      industry: 'Logistics',
      stage: 'Series A',
      valuation: '$18M',
      growth: '+240%',
      aiScore: 87,
      description: 'Giải pháp logistics thông minh cho e-commerce',
      highlights: ['Route Optimization', 'Last-mile Delivery', 'Warehouse AI'],
      founded: '2020',
      employees: '80+',
      location: 'TP.HCM',
      logo: '🚚'
    }
  ];

  const handleSearch = async () => {
    setIsSearching(true);
    // Simulate AI search
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSearching(false);
  };

  const toggleFilter = (filter: string) => {
    setSelectedFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      {/* Header */}
      <div className={`mb-8 transition-all duration-1000 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text animate-rainbow-pulse bg-500%">
              🔍 AI Deal Sourcing
            </h1>
            <p className="text-xl text-gray-300 mt-2">
              Tìm kiếm cơ hội đầu tư với sức mạnh trí tuệ nhân tạo
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setAiMode(!aiMode)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 ${
                aiMode 
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 animate-glow' 
                  : 'bg-white/10 border border-white/20'
              }`}
            >
              <span className="text-xl animate-magic-sparkle">🤖</span>
              <span className="font-semibold text-white">AI Mode</span>
            </button>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className={`mb-8 transition-all duration-1000 delay-200 ${isVisible ? 'animate-slide-in-left' : 'opacity-0'}`}>
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Mô tả loại deal bạn muốn tìm (VD: 'Fintech startup Series A tại Việt Nam')"
                className="w-full px-6 py-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center animate-pulse">
                  <span className="text-sm">🧠</span>
                </div>
              </div>
            </div>
            
            <button
              onClick={handleSearch}
              disabled={isSearching}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 hover:scale-105 disabled:opacity-50"
            >
              {isSearching ? (
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Đang Tìm...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <span>⚡</span>
                  <span>Tìm Kiếm AI</span>
                </div>
              )}
            </button>
          </div>

          {/* Industry Filters */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
              <span className="animate-magic-sparkle">🎯</span>
              <span>Lĩnh Vực</span>
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {industries.map((industry, index) => (
                <button
                  key={index}
                  onClick={() => toggleFilter(industry.name)}
                  className={`group p-4 rounded-xl transition-all duration-300 hover:scale-105 ${
                    selectedFilters.includes(industry.name)
                      ? `bg-gradient-to-r ${industry.color} animate-pulse-glow`
                      : 'bg-white/5 border border-white/20 hover:bg-white/10'
                  }`}
                >
                  <div className="text-center">
                    <span className="text-2xl mb-2 block group-hover:animate-bounce-gentle">{industry.icon}</span>
                    <span className="text-sm font-semibold text-white block mb-1">{industry.name}</span>
                    <span className="text-xs text-gray-400">{industry.count} deals</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* AI Recommendations */}
      {aiMode && (
        <div className={`mb-8 transition-all duration-1000 delay-400 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-2xl p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center animate-glow">
                <span className="text-xl">🤖</span>
              </div>
              <h3 className="text-xl font-bold text-white">AI Gợi Ý Thông Minh</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                {
                  title: 'Hot Trend',
                  description: 'Fintech payments đang bùng nổ với 180% tăng trưởng',
                  confidence: 95,
                  icon: '🔥'
                },
                {
                  title: 'Emerging Sector',
                  description: 'EdTech K-12 có tiềm năng cao với thị trường 2.8B USD',
                  confidence: 87,
                  icon: '🌱'
                },
                {
                  title: 'Geographic Focus',
                  description: 'Thị trường Tier-2 cities đang thiếu solution logistics',
                  confidence: 78,
                  icon: '🗺️'
                }
              ].map((insight, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl bg-white/10 border border-white/20 hover:bg-white/15 transition-all duration-300 group cursor-pointer"
                >
                  <div className="flex items-start space-x-3">
                    <span className="text-xl group-hover:animate-magic-sparkle">{insight.icon}</span>
                    <div className="flex-1">
                      <h4 className="font-semibold text-white mb-2">{insight.title}</h4>
                      <p className="text-gray-300 text-sm mb-3">{insight.description}</p>
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-green-400 to-emerald-500 h-2 rounded-full"
                            style={{ width: `${insight.confidence}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-green-400 font-bold">{insight.confidence}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Deal Results */}
      <div className={`transition-all duration-1000 delay-600 ${isVisible ? 'animate-slide-in-right' : 'opacity-0'}`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
            <span className="animate-magic-sparkle">💎</span>
            <span>Deal Được Tìm Thấy</span>
            <span className="text-lg text-gray-400">({dealCards.length})</span>
          </h2>
          
          <div className="flex items-center space-x-4">
            <select className="px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500">
              <option>Sắp xếp theo AI Score</option>
              <option>Sắp xếp theo Valuation</option>
              <option>Sắp xếp theo Growth</option>
            </select>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {dealCards.map((deal, index) => (
            <div
              key={deal.id}
              className="group bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-500 hover:scale-105 cursor-pointer"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center group-hover:animate-bounce-gentle">
                    <span className="text-xl">{deal.logo}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300">
                      {deal.company}
                    </h3>
                    <p className="text-sm text-gray-400">{deal.industry} • {deal.stage}</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className={`px-3 py-1 rounded-full text-sm font-bold ${
                    deal.aiScore >= 90 ? 'bg-green-500/20 text-green-400' :
                    deal.aiScore >= 80 ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    AI Score: {deal.aiScore}%
                  </div>
                </div>
              </div>

              <p className="text-gray-300 mb-4 leading-relaxed">{deal.description}</p>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center p-3 rounded-xl bg-white/5">
                  <p className="text-2xl font-bold text-emerald-400">{deal.valuation}</p>
                  <p className="text-xs text-gray-400">Định Giá</p>
                </div>
                <div className="text-center p-3 rounded-xl bg-white/5">
                  <p className="text-2xl font-bold text-blue-400">{deal.growth}</p>
                  <p className="text-xs text-gray-400">Tăng Trưởng</p>
                </div>
                <div className="text-center p-3 rounded-xl bg-white/5">
                  <p className="text-2xl font-bold text-purple-400">{deal.employees}</p>
                  <p className="text-xs text-gray-400">Nhân Viên</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {deal.highlights.map((highlight, hIndex) => (
                  <span
                    key={hIndex}
                    className="px-3 py-1 text-xs bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full border border-blue-500/30 text-blue-300"
                  >
                    {highlight}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-gray-400">
                  <span>📅 {deal.founded}</span>
                  <span>📍 {deal.location}</span>
                </div>
                
                <button className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-sm font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 hover:scale-105">
                  Xem Chi Tiết →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-8 right-8">
        <button className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full shadow-magic hover:shadow-hologram transition-all duration-300 hover:scale-110 animate-levitate group">
          <span className="text-2xl group-hover:animate-magic-sparkle">🔍</span>
        </button>
      </div>
    </div>
  );
} 
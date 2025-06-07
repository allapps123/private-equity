import { useState, useEffect } from 'react';
import PortfolioGrid from '../components/PortfolioGrid';
import CompanyTile from '../components/CompanyTile';
import { usePortfolioStore } from '../store/kpi';

export default function Portfolio() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedView, setSelectedView] = useState('overview');
  const [selectedCompany, setSelectedCompany] = useState<any>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const portfolioStats = {
    totalAUM: '$2.8B',
    totalCompanies: 23,
    avgROI: '32.4%',
    avgHoldingPeriod: '3.2 years',
    successfulExits: 12,
    currentIRR: '28.7%'
  };

  const portfolioCompanies = [
    {
      id: 1,
      name: 'VietPay Solutions',
      industry: 'Fintech',
      stage: 'Series B',
      investmentDate: '2022-03-15',
      initialInvestment: 15,
      currentValuation: 45,
      ownership: 22.5,
      roi: 200,
      status: 'growing',
      logo: '💳',
      color: 'from-blue-500 to-cyan-500',
      metrics: {
        revenue: { current: 28.5, growth: '+180%' },
        users: { current: '3.2M', growth: '+240%' },
        marketShare: '15%'
      },
      milestones: [
        { date: '2024-01', event: 'Launched B2B payments', impact: 'positive' },
        { date: '2023-11', event: 'Series B funding', impact: 'positive' },
        { date: '2023-08', event: 'Partnership with major bank', impact: 'positive' }
      ]
    },
    {
      id: 2,
      name: 'EduSmart Vietnam',
      industry: 'EdTech',
      stage: 'Series A',
      investmentDate: '2021-09-22',
      initialInvestment: 8,
      currentValuation: 32,
      ownership: 18.7,
      roi: 300,
      status: 'scaling',
      logo: '📚',
      color: 'from-green-500 to-emerald-500',
      metrics: {
        revenue: { current: 12.3, growth: '+320%' },
        users: { current: '850K', growth: '+280%' },
        marketShare: '8%'
      },
      milestones: [
        { date: '2024-02', event: 'AI tutoring feature launch', impact: 'positive' },
        { date: '2023-12', event: 'Government partnership', impact: 'positive' },
        { date: '2023-09', event: 'Expanded to 5 provinces', impact: 'positive' }
      ]
    },
    {
      id: 3,
      name: 'HealthHub Digital',
      industry: 'HealthTech',
      stage: 'Series C',
      investmentDate: '2020-06-10',
      initialInvestment: 25,
      currentValuation: 85,
      ownership: 15.3,
      roi: 240,
      status: 'mature',
      logo: '🏥',
      color: 'from-red-500 to-pink-500',
      metrics: {
        revenue: { current: 45.2, growth: '+95%' },
        users: { current: '120K', growth: '+110%' },
        marketShare: '25%'
      },
      milestones: [
        { date: '2024-01', event: 'IPO preparation started', impact: 'positive' },
        { date: '2023-10', event: 'Series C completion', impact: 'positive' },
        { date: '2023-06', event: 'International expansion', impact: 'positive' }
      ]
    },
    {
      id: 4,
      name: 'FoodDelivery Plus',
      industry: 'Logistics',
      stage: 'Exit',
      investmentDate: '2019-04-18',
      initialInvestment: 12,
      currentValuation: 52,
      ownership: 0,
      roi: 333,
      status: 'exited',
      logo: '🚚',
      color: 'from-orange-500 to-yellow-500',
      metrics: {
        revenue: { current: 38.7, growth: '+250%' },
        users: { current: '2.1M', growth: '+300%' },
        marketShare: '18%'
      },
      milestones: [
        { date: '2024-01', event: 'Successful exit to Grab', impact: 'positive' },
        { date: '2023-09', event: 'Market leader position', impact: 'positive' },
        { date: '2023-04', event: 'Profitability achieved', impact: 'positive' }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'growing': return 'text-blue-400 bg-blue-500/20';
      case 'scaling': return 'text-green-400 bg-green-500/20';
      case 'mature': return 'text-purple-400 bg-purple-500/20';
      case 'exited': return 'text-orange-400 bg-orange-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'growing': return 'Đang Phát Triển';
      case 'scaling': return 'Mở Rộng Quy Mô';
      case 'mature': return 'Trưởng Thành';
      case 'exited': return 'Đã Exit';
      default: return status;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      {/* Header */}
      <div className={`mb-8 transition-all duration-1000 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text animate-rainbow-pulse bg-500%">
              📊 Portfolio Management
            </h1>
            <p className="text-xl text-gray-300 mt-2">
              Quản lý và theo dõi danh mục đầu tư với insights thông minh
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            {['overview', 'performance', 'companies'].map((view) => (
              <button
                key={view}
                onClick={() => setSelectedView(view)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 ${
                  selectedView === view
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse-glow'
                    : 'bg-white/10 border border-white/20 hover:bg-white/20'
                }`}
              >
                {view === 'overview' ? 'Tổng Quan' : 
                 view === 'performance' ? 'Hiệu Suất' : 'Công Ty'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Portfolio Stats */}
      <div className={`mb-8 transition-all duration-1000 delay-200 ${isVisible ? 'animate-slide-in-left' : 'opacity-0'}`}>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {[
            { label: 'Tổng AUM', value: portfolioStats.totalAUM, icon: '💰', color: 'from-emerald-500 to-teal-500' },
            { label: 'Số Công Ty', value: portfolioStats.totalCompanies, icon: '🏢', color: 'from-blue-500 to-cyan-500' },
            { label: 'ROI Trung Bình', value: portfolioStats.avgROI, icon: '📈', color: 'from-purple-500 to-pink-500' },
            { label: 'Thời Gian Nắm Giữ', value: portfolioStats.avgHoldingPeriod, icon: '⏰', color: 'from-orange-500 to-red-500' },
            { label: 'Exit Thành Công', value: portfolioStats.successfulExits, icon: '🎯', color: 'from-green-500 to-emerald-500' },
            { label: 'IRR Hiện Tại', value: portfolioStats.currentIRR, icon: '⚡', color: 'from-indigo-500 to-purple-500' }
          ].map((stat, index) => (
            <div
              key={index}
              className="group relative p-6 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/15 transition-all duration-500 hover:scale-105 cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-20 transition-all duration-500`}></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl animate-bounce-gentle">{stat.icon}</span>
                </div>
                
                <h3 className="text-sm font-medium text-gray-400 mb-2">{stat.label}</h3>
                <p className="text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300">
                  {stat.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedView === 'overview' && (
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Portfolio Distribution */}
          <div className={`lg:col-span-2 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 transition-all duration-1000 delay-400 ${isVisible ? 'animate-slide-in-left' : 'opacity-0'}`}>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
              <span className="animate-magic-sparkle">🎯</span>
              <span>Phân Bổ Danh Mục</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {/* By Industry */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Theo Ngành</h3>
                <div className="space-y-3">
                  {[
                    { name: 'Fintech', percentage: 35, color: 'bg-blue-500' },
                    { name: 'EdTech', percentage: 25, color: 'bg-green-500' },
                    { name: 'HealthTech', percentage: 20, color: 'bg-red-500' },
                    { name: 'Logistics', percentage: 20, color: 'bg-orange-500' }
                  ].map((industry, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-4 h-4 rounded-full animate-pulse" style={{ backgroundColor: industry.color.replace('bg-', '#') }}></div>
                      <span className="text-gray-300 flex-1">{industry.name}</span>
                      <span className="text-white font-semibold">{industry.percentage}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* By Stage */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Theo Giai Đoạn</h3>
                <div className="space-y-3">
                  {[
                    { name: 'Series A', percentage: 30, color: 'bg-purple-500' },
                    { name: 'Series B', percentage: 40, color: 'bg-pink-500' },
                    { name: 'Series C', percentage: 20, color: 'bg-indigo-500' },
                    { name: 'Exit', percentage: 10, color: 'bg-yellow-500' }
                  ].map((stage, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-4 h-4 rounded-full animate-pulse" style={{ backgroundColor: stage.color.replace('bg-', '#') }}></div>
                      <span className="text-gray-300 flex-1">{stage.name}</span>
                      <span className="text-white font-semibold">{stage.percentage}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activities */}
          <div className={`bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 transition-all duration-1000 delay-600 ${isVisible ? 'animate-slide-in-right' : 'opacity-0'}`}>
            <h2 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
              <span className="animate-magic-sparkle">⚡</span>
              <span>Hoạt Động Gần Đây</span>
            </h2>

            <div className="space-y-4">
              {[
                {
                  type: 'milestone',
                  company: 'VietPay Solutions',
                  event: 'Đạt 3M+ người dùng',
                  time: '2 giờ trước',
                  icon: '🎉',
                  color: 'text-green-400'
                },
                {
                  type: 'funding',
                  company: 'EduSmart Vietnam',
                  event: 'Hoàn tất Series A+',
                  time: '1 ngày trước',
                  icon: '💰',
                  color: 'text-blue-400'
                },
                {
                  type: 'partnership',
                  company: 'HealthHub Digital',
                  event: 'Partnership với Samsung',
                  time: '3 ngày trước',
                  icon: '🤝',
                  color: 'text-purple-400'
                },
                {
                  type: 'exit',
                  company: 'FoodDelivery Plus',
                  event: 'Exit thành công',
                  time: '1 tuần trước',
                  icon: '🚀',
                  color: 'text-orange-400'
                }
              ].map((activity, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 group cursor-pointer"
                >
                  <div className="flex items-start space-x-3">
                    <span className={`text-xl ${activity.color} group-hover:animate-bounce-gentle`}>
                      {activity.icon}
                    </span>
                    <div className="flex-1">
                      <h3 className="font-semibold text-white mb-1">{activity.company}</h3>
                      <p className="text-gray-400 text-sm mb-1">{activity.event}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {selectedView === 'companies' && (
        <div className={`transition-all duration-1000 delay-400 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <div className="grid lg:grid-cols-2 gap-6">
            {portfolioCompanies.map((company, index) => (
              <div
                key={company.id}
                className="group bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-500 hover:scale-105 cursor-pointer"
                style={{ animationDelay: `${index * 200}ms` }}
                onClick={() => setSelectedCompany(company)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${company.color} flex items-center justify-center group-hover:animate-bounce-gentle`}>
                      <span className="text-xl">{company.logo}</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300">
                        {company.name}
                      </h3>
                      <p className="text-sm text-gray-400">{company.industry} • {company.stage}</p>
                    </div>
                  </div>
                  
                  <div className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(company.status)}`}>
                    {getStatusLabel(company.status)}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center p-3 rounded-xl bg-white/5">
                    <p className="text-2xl font-bold text-emerald-400">${company.currentValuation}M</p>
                    <p className="text-xs text-gray-400">Định Giá</p>
                  </div>
                  <div className="text-center p-3 rounded-xl bg-white/5">
                    <p className="text-2xl font-bold text-blue-400">{company.roi}%</p>
                    <p className="text-xs text-gray-400">ROI</p>
                  </div>
                  <div className="text-center p-3 rounded-xl bg-white/5">
                    <p className="text-2xl font-bold text-purple-400">{company.ownership}%</p>
                    <p className="text-xs text-gray-400">Sở Hữu</p>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Doanh thu:</span>
                    <span className="text-white">${company.metrics.revenue.current}M ({company.metrics.revenue.growth})</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Người dùng:</span>
                    <span className="text-white">{company.metrics.users.current} ({company.metrics.users.growth})</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Thị phần:</span>
                    <span className="text-white">{company.metrics.marketShare}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">
                    Đầu tư: {new Date(company.investmentDate).toLocaleDateString('vi-VN')}
                  </span>
                  <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-sm font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 hover:scale-105">
                    Xem Chi Tiết →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Company Detail Modal */}
      {selectedCompany && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-slate-900/95 backdrop-blur-lg border border-white/20 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${selectedCompany.color} flex items-center justify-center animate-pulse-glow`}>
                    <span className="text-2xl">{selectedCompany.logo}</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">{selectedCompany.name}</h2>
                    <p className="text-gray-400">{selectedCompany.industry} • {selectedCompany.stage}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedCompany(null)}
                  className="p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300"
                >
                  <span className="text-xl">✕</span>
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Thông Tin Đầu Tư</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Đầu tư ban đầu:</span>
                      <span className="text-white">${selectedCompany.initialInvestment}M</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Định giá hiện tại:</span>
                      <span className="text-emerald-400">${selectedCompany.currentValuation}M</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">ROI:</span>
                      <span className="text-blue-400">{selectedCompany.roi}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Tỷ lệ sở hữu:</span>
                      <span className="text-purple-400">{selectedCompany.ownership}%</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Cột Mốc Quan Trọng</h3>
                  <div className="space-y-3">
                    {selectedCompany.milestones.map((milestone: any, index: number) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className={`w-3 h-3 rounded-full mt-2 ${
                          milestone.impact === 'positive' ? 'bg-green-400' : 'bg-red-400'
                        } animate-pulse`}></div>
                        <div>
                          <p className="text-white font-medium">{milestone.event}</p>
                          <p className="text-gray-400 text-sm">{milestone.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <div className="fixed bottom-8 right-8">
        <button className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-magic hover:shadow-hologram transition-all duration-300 hover:scale-110 animate-levitate group">
          <span className="text-2xl group-hover:animate-magic-sparkle">📊</span>
        </button>
      </div>
    </div>
  );
} 
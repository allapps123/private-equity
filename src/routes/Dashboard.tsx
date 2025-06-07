import { useState, useEffect } from 'react';
import { useUserStore } from '../store/user';
import DashboardSummary from '../components/DashboardSummary';
import PerformanceChart from '../components/PerformanceChart';
import RiskManagement from '../components/RiskManagement';

export default function Dashboard() {
  const { role } = useUserStore();
  const [isVisible, setIsVisible] = useState(false);
  const [activeCard, setActiveCard] = useState(0);
  const [timeOfDay, setTimeOfDay] = useState('');

  useEffect(() => {
    setIsVisible(true);
    
    // Set time-based greeting
    const hour = new Date().getHours();
    if (hour < 12) setTimeOfDay('Chào Buổi Sáng');
    else if (hour < 18) setTimeOfDay('Chào Buổi Chiều');
    else setTimeOfDay('Chào Buổi Tối');

    // Auto-rotate cards
    const interval = setInterval(() => {
      setActiveCard(prev => (prev + 1) % 6);
    }, 4000);
    
    return () => clearInterval(interval);
  }, []);

  const quickStats = [
    {
      title: 'Tổng AUM',
      value: '$2.5B',
      change: '+12.5%',
      icon: '💰',
      color: 'from-emerald-500 to-teal-500',
      trend: 'up'
    },
    {
      title: 'Deals Đang Theo Dõi',
      value: '47',
      change: '+8',
      icon: '🎯',
      color: 'from-blue-500 to-cyan-500',
      trend: 'up'
    },
    {
      title: 'ROI Trung Bình',
      value: '28.7%',
      change: '+3.2%',
      icon: '📈',
      color: 'from-purple-500 to-pink-500',
      trend: 'up'
    },
    {
      title: 'Công Ty Portfolio',
      value: '23',
      change: '+2',
      icon: '🏢',
      color: 'from-orange-500 to-red-500',
      trend: 'up'
    },
    {
      title: 'Deal Hoàn Tất',
      value: '156',
      change: '+12',
      icon: '✅',
      color: 'from-green-500 to-emerald-500',
      trend: 'up'
    },
    {
      title: 'IRR Danh Mục',
      value: '31.2%',
      change: '+2.8%',
      icon: '⚡',
      color: 'from-indigo-500 to-purple-500',
      trend: 'up'
    }
  ];

  const recentActivities = [
    {
      type: 'deal',
      title: 'Deal mới: TechStart Vietnam',
      description: 'AI phát hiện cơ hội đầu tư tiềm năng trong fintech',
      time: '15 phút trước',
      icon: '🚀',
      priority: 'high'
    },
    {
      type: 'alert',
      title: 'Cảnh báo định giá',
      description: 'CloudTech Corp vượt ngưỡng định giá target',
      time: '1 giờ trước',
      icon: '⚠️',
      priority: 'medium'
    },
    {
      type: 'success',
      title: 'Exit thành công',
      description: 'FoodDelivery Plus: Exit với ROI 340%',
      time: '3 giờ trước',
      icon: '🎉',
      priority: 'high'
    },
    {
      type: 'meeting',
      title: 'Cuộc họp sắp tới',
      description: 'Due Diligence call với EduTech Solutions',
      time: 'Trong 30 phút',
      icon: '📞',
      priority: 'urgent'
    }
  ];

  const aiInsights = [
    {
      title: 'Xu Hướng Ngành',
      description: 'Fintech và EdTech đang có tín hiệu tăng trưởng mạnh trong Q4',
      confidence: 95,
      icon: '🧠'
    },
    {
      title: 'Cơ Hội Đầu Tư',
      description: '3 công ty trong danh sách watchlist có tín hiệu tích cực',
      confidence: 87,
      icon: '💡'
    },
    {
      title: 'Cảnh Báo Rủi Ro',
      description: 'Biến động thị trường có thể ảnh hưởng đến 2 portfolio company',
      confidence: 78,
      icon: '🛡️'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      {/* Welcome Header */}
      <div className={`mb-8 transition-all duration-1000 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text animate-rainbow-pulse bg-500%">
              {timeOfDay} 👋
            </h1>
            <p className="text-xl text-gray-300 mt-2">
              Chào mừng trở lại Dashboard của bạn - nơi ma thuật đầu tư diễn ra
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center animate-levitate">
                <span className="text-2xl">🎯</span>
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
                <span className="text-xs text-white font-bold">3</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
        {quickStats.map((stat, index) => (
          <div
            key={index}
            className={`group relative p-6 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/15 transition-all duration-500 hover:scale-105 cursor-pointer ${
              activeCard === index ? 'animate-magic-sparkle shadow-magic' : ''
            } ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
            style={{ animationDelay: `${index * 100}ms` }}
            onMouseEnter={() => setActiveCard(index)}
          >
            <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-20 transition-all duration-500`}></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl animate-bounce-gentle">{stat.icon}</span>
                <div className={`px-2 py-1 rounded-full text-xs font-bold ${
                  stat.trend === 'up' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                }`}>
                  {stat.change}
                </div>
              </div>
              
              <h3 className="text-sm font-medium text-gray-400 mb-2">{stat.title}</h3>
              <p className="text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300">
                {stat.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recent Activities */}
        <div className="lg:col-span-2 space-y-6">
          <div className={`bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 transition-all duration-1000 ${isVisible ? 'animate-slide-in-left' : 'opacity-0'}`}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
                <span className="animate-magic-sparkle">⚡</span>
                <span>Hoạt Động Gần Đây</span>
              </h2>
              <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-sm font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 hover:scale-105">
                Xem Tất Cả
              </button>
            </div>

            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-102 group cursor-pointer ${
                    activity.priority === 'urgent' ? 'animate-pulse-glow' : ''
                  }`}
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      activity.priority === 'high' ? 'bg-red-500/20' :
                      activity.priority === 'urgent' ? 'bg-orange-500/20' :
                      'bg-blue-500/20'
                    } group-hover:animate-bounce-gentle`}>
                      <span className="text-xl">{activity.icon}</span>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-semibold text-white mb-1 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300">
                        {activity.title}
                      </h3>
                      <p className="text-gray-400 text-sm mb-2 leading-relaxed">{activity.description}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Insights Panel */}
        <div className="space-y-6">
          <div className={`bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 transition-all duration-1000 delay-300 ${isVisible ? 'animate-slide-in-right' : 'opacity-0'}`}>
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center animate-glow">
                <span className="text-xl">🤖</span>
              </div>
              <h2 className="text-xl font-bold text-white">AI Insights</h2>
            </div>

            <div className="space-y-4">
              {aiInsights.map((insight, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 hover:from-blue-500/20 hover:to-purple-500/20 transition-all duration-300 group cursor-pointer"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="flex items-start space-x-3">
                    <span className="text-xl group-hover:animate-magic-sparkle">{insight.icon}</span>
                    <div className="flex-1">
                      <h3 className="font-semibold text-white mb-2">{insight.title}</h3>
                      <p className="text-gray-300 text-sm mb-3 leading-relaxed">{insight.description}</p>
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-green-400 to-emerald-500 h-2 rounded-full transition-all duration-1000 animate-shimmer bg-size-300"
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

          {/* Quick Actions */}
          <div className={`bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 transition-all duration-1000 delay-500 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <h2 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
              <span className="animate-magic-sparkle">⚡</span>
              <span>Hành Động Nhanh</span>
            </h2>

            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Tìm Deal', icon: '🔍', color: 'from-blue-500 to-cyan-500' },
                { label: 'Định Giá', icon: '💰', color: 'from-emerald-500 to-teal-500' },
                { label: 'Báo Cáo', icon: '📊', color: 'from-purple-500 to-pink-500' },
                { label: 'Cảnh Báo', icon: '🚨', color: 'from-orange-500 to-red-500' }
              ].map((action, index) => (
                <button
                  key={index}
                  className={`p-4 rounded-xl bg-gradient-to-r ${action.color} hover:scale-105 transition-all duration-300 group hover:shadow-neon`}
                >
                  <div className="text-center">
                    <span className="text-2xl mb-2 block group-hover:animate-bounce-gentle">{action.icon}</span>
                    <span className="text-sm font-semibold text-white">{action.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-8 right-8">
        <button className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-magic hover:shadow-hologram transition-all duration-300 hover:scale-110 animate-levitate group">
          <span className="text-2xl group-hover:animate-magic-sparkle">✨</span>
        </button>
      </div>
    </div>
  );
} 
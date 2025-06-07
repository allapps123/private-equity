import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Landing() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentFeature, setCurrentFeature] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentFeature(prev => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: "🤖",
      title: "AI Tìm Kiếm Deal",
      description: "Trí tuệ nhân tạo phân tích và gợi ý các cơ hội đầu tư tiềm năng tốt nhất",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: "💰",
      title: "Định Giá Chuyên Nghiệp",
      description: "Công cụ định giá DCF và Comparable Analysis với độ chính xác cao",
      color: "from-emerald-500 to-teal-500"
    },
    {
      icon: "📊",
      title: "Dashboard Thời Gian Thực",
      description: "Theo dõi hiệu suất danh mục đầu tư với biểu đồ tương tác trực tiếp",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: "⚡",
      title: "Cảnh Báo Thông Minh",
      description: "Hệ thống cảnh báo proactive giúp quản lý rủi ro và nắm bắt cơ hội",
      color: "from-orange-500 to-red-500"
    }
  ];

  const stats = [
    { number: "50+", label: "Quỹ Đầu Tư", icon: "🏛️" },
    { number: "$2.5B", label: "Tài Sản Quản Lý", icon: "💎" },
    { number: "1000+", label: "Deal Đã Phân Tích", icon: "📈" },
    { number: "95%", label: "Độ Chính Xác AI", icon: "🎯" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-gradient-to-r from-blue-400 to-purple-600 opacity-20 animate-pulse-glow"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-600 opacity-20 animate-float"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-gradient-to-r from-pink-400 to-purple-600 opacity-10 animate-spin-slow"></div>
      </div>

      {/* Hero Section */}
      <div className="relative z-10">
        <nav className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className={`flex items-center space-x-3 transition-all duration-1000 ${isVisible ? 'animate-slide-in-left' : 'opacity-0'}`}>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center animate-glow">
                <span className="text-xl font-bold">🏛️</span>
              </div>
              <h1 className="text-2xl font-display font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                DealVault PE
              </h1>
            </div>
            
            <div className={`flex space-x-4 transition-all duration-1000 delay-300 ${isVisible ? 'animate-slide-in-right' : 'opacity-0'}`}>
              <Link 
                to="/login" 
                className="px-6 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:animate-glow"
              >
                Đăng Nhập
              </Link>
              <Link 
                to="/dashboard" 
                className="px-6 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 hover:scale-105 animate-pulse-glow"
              >
                Bắt Đầu Ngay
              </Link>
            </div>
          </div>
        </nav>

        {/* Main Hero */}
        <div className="container mx-auto px-6 py-20 text-center">
          <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <h1 className="text-6xl md:text-8xl font-display font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient bg-300%">
                Tương Lai
              </span>
              <br />
              <span className="text-white">
                Private Equity
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              Nền tảng AI đầu tiên tại Việt Nam dành cho quỹ đầu tư, 
              <span className="text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text font-semibold"> tự động hóa hoàn toàn</span> quy trình 
              tìm kiếm, định giá và quản lý danh mục đầu tư
            </p>

            <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6">
              <Link 
                to="/dashboard"
                className="group px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 hover:scale-110 animate-glow flex items-center space-x-2"
              >
                <span>🚀</span>
                <span>Khám Phá Ngay</span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </Link>
              
              <button className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-lg font-semibold hover:bg-white/20 transition-all duration-300 hover:scale-105 flex items-center space-x-2">
                <span>▶️</span>
                <span>Xem Demo</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative z-10 py-20">
        <div className="container mx-auto px-6">
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Tính Năng Vượt Trội
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Được tin dùng bởi hàng trăm quỹ đầu tư hàng đầu Châu Á
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:-translate-y-2 ${
                  currentFeature === index ? 'animate-pulse-glow' : ''
                } ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 mx-auto group-hover:animate-bounce-gentle`}>
                  <span className="text-2xl">{feature.icon}</span>
                </div>
                <h3 className="text-xl font-bold mb-4 text-center">{feature.title}</h3>
                <p className="text-gray-400 text-center leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="relative z-10 py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`text-center group transition-all duration-1000 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="text-4xl mb-4 group-hover:animate-bounce-gentle">{stat.icon}</div>
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2 group-hover:animate-pulse">
                  {stat.number}
                </div>
                <div className="text-gray-400 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative z-10 py-20">
        <div className="container mx-auto px-6 text-center">
          <div className={`transition-all duration-1000 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-8 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Sẵn Sàng Cách Mạng Hóa Đầu Tư?
            </h2>
            <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
              Tham gia cùng hàng trăm quỹ đầu tư đang sử dụng DealVault PE để tối ưu hóa hiệu suất
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6">
              <Link 
                to="/dashboard"
                className="px-10 py-5 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full text-xl font-bold hover:from-emerald-600 hover:to-cyan-600 transition-all duration-300 hover:scale-110 animate-pulse-glow"
              >
                Bắt Đầu Miễn Phí 🎯
              </Link>
              <Link 
                to="/about"
                className="px-10 py-5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-xl font-bold hover:bg-white/20 transition-all duration-300 hover:scale-105"
              >
                Tìm Hiểu Thêm 📚
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
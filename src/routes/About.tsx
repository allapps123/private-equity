import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const team = [
    {
      name: "Nguyễn Minh Anh",
      role: "CEO & Founder",
      avatar: "👨‍💼",
      description: "15+ năm kinh nghiệm tại Goldman Sachs và McKinsey. MBA từ Wharton School.",
      skills: ["Strategic Leadership", "PE Investment", "M&A"]
    },
    {
      name: "Trần Thị Hương",
      role: "CTO & Co-Founder", 
      avatar: "👩‍💻",
      description: "Cựu Senior Engineer tại Google và Microsoft. PhD Computer Science từ Stanford.",
      skills: ["AI/ML", "System Architecture", "Fintech"]
    },
    {
      name: "Lê Văn Nam",
      role: "Chief Investment Officer",
      avatar: "📈",
      description: "20+ năm kinh nghiệm đầu tư tại Dragon Capital và VinaCapital.",
      skills: ["Portfolio Management", "Risk Analysis", "Due Diligence"]
    },
    {
      name: "Phạm Thu Loan",
      role: "Head of Product",
      avatar: "🎨",
      description: "Cựu Product Manager tại Grab và Shopee. Master Design từ RISD.",
      skills: ["UX/UI Design", "Product Strategy", "User Research"]
    }
  ];

  const milestones = [
    {
      year: "2021",
      title: "Thành Lập Công Ty",
      description: "DealVault PE được thành lập với tầm nhìn cách mạng hóa ngành Private Equity tại Việt Nam",
      icon: "🚀"
    },
    {
      year: "2022",
      title: "Vòng Gọi Vốn Seed",
      description: "Hoàn thành vòng gọi vốn $2M từ các quỹ đầu tư hàng đầu Đông Nam Á",
      icon: "💰"
    },
    {
      year: "2023",
      title: "Ra Mắt MVP",
      description: "Phát hành phiên bản đầu tiên với 50+ quỹ đầu tư đầu tiên sử dụng nền tảng",
      icon: "🎯"
    },
    {
      year: "2024",
      title: "Mở Rộng Khu Vực",
      description: "Mở rộng ra thị trường Singapore, Malaysia và Philippines",
      icon: "🌏"
    }
  ];

  const values = [
    {
      title: "Đổi Mới Sáng Tạo",
      description: "Luôn tiên phong trong việc ứng dụng công nghệ AI tiên tiến nhất",
      icon: "💡",
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Chính Xác Tuyệt Đối", 
      description: "Cam kết độ chính xác 99.9% trong mọi phân tích và báo cáo",
      icon: "🎯",
      color: "from-emerald-500 to-teal-500"
    },
    {
      title: "Minh Bạch Hoàn Toàn",
      description: "Mọi quy trình và thuật toán đều được công khai và có thể kiểm tra",
      icon: "🔍",
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Khách Hàng Là Trung Tâm",
      description: "Mọi tính năng đều được phát triển dựa trên nhu cầu thực tế",
      icon: "❤️",
      color: "from-orange-500 to-red-500"
    }
  ];

  const tabs = ["Đội Ngũ", "Lịch Sử", "Giá Trị", "Công Nghệ"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-gradient-to-r from-blue-400 to-purple-600 opacity-20 animate-pulse-glow"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-600 opacity-20 animate-float"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-gradient-to-r from-pink-400 to-purple-600 opacity-10 animate-spin-slow"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <Link to="/" className={`flex items-center space-x-3 transition-all duration-1000 ${isVisible ? 'animate-slide-in-left' : 'opacity-0'}`}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center animate-glow">
              <span className="text-xl font-bold">🏛️</span>
            </div>
            <h1 className="text-2xl font-display font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              DealVault PE
            </h1>
          </Link>
          
          <Link 
            to="/" 
            className={`px-6 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 ${isVisible ? 'animate-slide-in-right' : 'opacity-0'}`}
          >
            ← Quay Lại Trang Chủ
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 container mx-auto px-6 py-20 text-center">
        <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <h1 className="text-6xl md:text-7xl font-display font-bold mb-8">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient bg-300%">
              Về Chúng Tôi
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            Chúng tôi là đội ngũ chuyên gia hàng đầu với sứ mệnh 
            <span className="text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text font-semibold"> cách mạng hóa</span> ngành 
            Private Equity tại Việt Nam và Đông Nam Á
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="relative z-10 container mx-auto px-6 mb-12">
        <div className="flex justify-center">
          <div className="flex space-x-2 p-2 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === index
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white animate-glow'
                    : 'text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="relative z-10 container mx-auto px-6 pb-20">
        
        {/* Team Tab */}
        {activeTab === 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 animate-fade-in-up">
            {team.map((member, index) => (
              <div
                key={index}
                className="group p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-500 hover:scale-105 hover:-translate-y-2"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-6xl mb-4 text-center group-hover:animate-bounce-gentle">{member.avatar}</div>
                <h3 className="text-xl font-bold mb-2 text-center">{member.name}</h3>
                <p className="text-blue-400 text-center mb-4 font-semibold">{member.role}</p>
                <p className="text-gray-300 text-sm mb-4 leading-relaxed">{member.description}</p>
                <div className="flex flex-wrap gap-2">
                  {member.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-2 py-1 text-xs bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full border border-blue-500/30"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* History Tab */}
        {activeTab === 1 && (
          <div className="max-w-4xl mx-auto animate-fade-in-up">
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-6 group"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center group-hover:animate-bounce-gentle">
                      <span className="text-2xl">{milestone.icon}</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-2">
                      <span className="text-2xl font-bold text-blue-400">{milestone.year}</span>
                      <h3 className="text-xl font-bold">{milestone.title}</h3>
                    </div>
                    <p className="text-gray-300 leading-relaxed">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Values Tab */}
        {activeTab === 2 && (
          <div className="grid md:grid-cols-2 gap-8 animate-fade-in-up">
            {values.map((value, index) => (
              <div
                key={index}
                className="group p-8 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-500 hover:scale-105"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${value.color} flex items-center justify-center mb-6 group-hover:animate-bounce-gentle`}>
                  <span className="text-2xl">{value.icon}</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">{value.title}</h3>
                <p className="text-gray-300 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* Technology Tab */}
        {activeTab === 3 && (
          <div className="animate-fade-in-up">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Công Nghệ Tiên Tiến
                </h3>
                
                <div className="space-y-6">
                  <div className="p-6 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
                    <h4 className="text-xl font-bold mb-2 text-emerald-400">🤖 Trí Tuệ Nhân Tạo</h4>
                    <p className="text-gray-300">Machine Learning và Deep Learning models được training trên hàng triệu data points từ deals thực tế</p>
                  </div>
                  
                  <div className="p-6 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
                    <h4 className="text-xl font-bold mb-2 text-blue-400">☁️ Cloud Infrastructure</h4>
                    <p className="text-gray-300">AWS và Google Cloud để đảm bảo tính bảo mật, khả năng mở rộng và hiệu suất cao</p>
                  </div>
                  
                  <div className="p-6 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
                    <h4 className="text-xl font-bold mb-2 text-purple-400">🔒 Blockchain & Security</h4>
                    <p className="text-gray-300">Immutable audit trails và end-to-end encryption để bảo vệ dữ liệu nhạy cảm</p>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <div className="relative">
                  <div className="w-64 h-64 mx-auto rounded-full bg-gradient-to-r from-blue-400 to-purple-600 opacity-20 animate-pulse-glow"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-8xl animate-float">⚡</div>
                  </div>
                </div>
                <h4 className="text-2xl font-bold mt-8 mb-4">99.9% Uptime</h4>
                <p className="text-gray-400">Cam kết dịch vụ luôn sẵn sàng 24/7</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="relative z-10 py-20 border-t border-white/20">
        <div className="container mx-auto px-6 text-center">
          <div className="animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-8 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Sẵn Sàng Hợp Tác?
            </h2>
            <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
              Hãy cùng chúng tôi định hình tương lai của ngành Private Equity
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6">
              <Link 
                to="/dashboard"
                className="px-10 py-5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-xl font-bold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 hover:scale-110 animate-glow"
              >
                Bắt Đầu Ngay 🚀
              </Link>
              <Link 
                to="/contact"
                className="px-10 py-5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-xl font-bold hover:bg-white/20 transition-all duration-300 hover:scale-105"
              >
                Liên Hệ Ngay 📞
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
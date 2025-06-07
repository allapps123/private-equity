import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUserStore } from '../store/user';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userType, setUserType] = useState<'analyst' | 'partner' | 'lp'>('analyst');
  const navigate = useNavigate();
  const login = useUserStore(state => state.login);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    await login(email, password);
    setIsLoading(false);
    navigate('/dashboard');
  };

  const demoAccounts = [
    { 
      type: 'analyst' as const, 
      title: 'Chuyên Viên Phân Tích', 
      email: 'analyst@dealvault.vn', 
      icon: '📊',
      description: 'Truy cập đầy đủ công cụ phân tích và định giá'
    },
    { 
      type: 'partner' as const, 
      title: 'Đối Tác Quản Lý', 
      email: 'partner@dealvault.vn', 
      icon: '👔',
      description: 'Quyền quản lý danh mục và phê duyệt đầu tư'
    },
    { 
      type: 'lp' as const, 
      title: 'Nhà Đầu Tư LP', 
      email: 'lp@dealvault.vn', 
      icon: '💼',
      description: 'Xem báo cáo hiệu suất và cập nhật định kỳ'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-6">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-gradient-to-r from-blue-400 to-purple-600 opacity-20 animate-pulse-glow"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-600 opacity-20 animate-float"></div>
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-4xl">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          
          {/* Left Side - Branding */}
          <div className="text-white space-y-8 animate-fade-in-up">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center animate-glow">
                  <span className="text-2xl font-bold">🏛️</span>
                </div>
                <h1 className="text-3xl font-display font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  DealVault PE
                </h1>
              </div>
              
              <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
                Chào Mừng Quay Lại
              </h2>
              
              <p className="text-xl text-gray-300 leading-relaxed">
                Truy cập vào nền tảng AI hàng đầu cho 
                <span className="text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text font-semibold"> Private Equity</span> tại Việt Nam
              </p>
            </div>

            {/* Demo Accounts */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-300">Tài Khoản Demo:</h3>
              <div className="space-y-3">
                {demoAccounts.map((account) => (
                  <button
                    key={account.type}
                    onClick={() => {
                      setEmail(account.email);
                      setPassword('demo123');
                      setUserType(account.type);
                    }}
                    className={`w-full p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 text-left group ${
                      userType === account.type ? 'animate-pulse-glow' : ''
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl group-hover:animate-bounce-gentle">{account.icon}</span>
                      <div>
                        <div className="font-semibold text-white">{account.title}</div>
                        <div className="text-sm text-gray-400">{account.description}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="animate-slide-in-right">
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-2xl">
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">Đăng Nhập</h3>
                  <p className="text-gray-400">Nhập thông tin để truy cập hệ thống</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email / Tên Đăng Nhập
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="your-email@dealvault.vn"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Mật Khẩu
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="••••••••"
                      required
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                      <span className="ml-2 text-sm text-gray-300">Ghi nhớ đăng nhập</span>
                    </label>
                    <button type="button" className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                      Quên mật khẩu?
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed animate-glow"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Đang Xử Lý...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <span>🚀</span>
                      <span>Đăng Nhập</span>
                    </div>
                  )}
                </button>

                <div className="text-center space-y-4">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-white/20"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-transparent text-gray-400">hoặc</span>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <button
                      type="button"
                      className="flex-1 py-3 bg-white/5 border border-white/20 rounded-xl text-white hover:bg-white/10 transition-all duration-300 hover:scale-105"
                    >
                      <div className="flex items-center justify-center space-x-2">
                        <span>📱</span>
                        <span>SSO</span>
                      </div>
                    </button>
                    <button
                      type="button"
                      className="flex-1 py-3 bg-white/5 border border-white/20 rounded-xl text-white hover:bg-white/10 transition-all duration-300 hover:scale-105"
                    >
                      <div className="flex items-center justify-center space-x-2">
                        <span>🔑</span>
                        <span>2FA</span>
                      </div>
                    </button>
                  </div>

                  <p className="text-gray-400">
                    Chưa có tài khoản?{' '}
                    <Link to="/register" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">
                      Đăng ký ngay
                    </Link>
                  </p>

                  <p className="text-gray-400">
                    <Link to="/" className="text-purple-400 hover:text-purple-300 font-semibold transition-colors">
                      ← Quay lại trang chủ
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
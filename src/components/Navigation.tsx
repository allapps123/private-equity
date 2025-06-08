import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useUserStore } from '../store/user';

export default function Navigation() {
  const location = useLocation();
  const { role, isAuthenticated, logout } = useUserStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { 
      path: '/dashboard', 
      label: 'Dashboard', 
      icon: '🏠',
      description: 'Tổng quan thông minh'
    },
    { 
      path: '/deal-sourcing', 
      label: 'Deal Sourcing', 
      icon: '🔍',
      description: 'Tìm kiếm AI'
    },
    { 
      path: '/valuation', 
      label: 'Valuation', 
      icon: '💰',
      description: 'Định giá thông minh'
    },
    { 
      path: '/portfolio', 
      label: 'Portfolio', 
      icon: '📊',
      description: 'Danh mục đầu tư'
    },
    { 
      path: '/risk', 
      label: 'Risk Management', 
      icon: '🛡️',
      description: 'Quản lý rủi ro'
    },
    { 
      path: '/reports', 
      label: 'Reports', 
      icon: '📈',
      description: 'Báo cáo chi tiết'
    }
  ];

  const isActive = (path: string) => location.pathname === path;

  if (!isAuthenticated) return null;

  return (
    <>
      {/* Main Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-slate-900/90 backdrop-blur-lg border-b border-white/10 shadow-2xl' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/dashboard" className="flex items-center space-x-3 group">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center group-hover:animate-magic-sparkle transition-all duration-300">
                <span className="text-2xl">💎</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">
                  DealVault PE
                </h1>
                <p className="text-xs text-gray-400">AI-Powered Investment</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`group relative px-4 py-3 rounded-xl transition-all duration-300 hover:scale-105 ${
                    isActive(item.path)
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white animate-pulse-glow'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <span className={`text-lg ${
                      isActive(item.path) ? 'animate-bounce-gentle' : 'group-hover:animate-magic-sparkle'
                    }`}>
                      {item.icon}
                    </span>
                    <span className="font-medium">{item.label}</span>
                  </div>
                  
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-slate-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap">
                    {item.description}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-800"></div>
                  </div>
                </Link>
              ))}
            </div>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <button className="relative p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 group">
                <span className="text-xl group-hover:animate-bounce-gentle">🔔</span>
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
                  <span className="text-xs text-white font-bold">3</span>
                </div>
              </button>

              {/* AI Status */}
              <div className="hidden md:flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30 rounded-xl">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                <span className="text-green-400 font-semibold text-sm">AI Active</span>
              </div>

              {/* User Avatar */}
              <div className="relative group">
                <button className="flex items-center space-x-3 p-2 rounded-xl hover:bg-white/10 transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center group-hover:animate-glow">
                    <span className="text-lg">👤</span>
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="text-white font-semibold">
                      {role === 'analyst' ? 'Chuyên Viên' : role === 'partner' ? 'Đối Tác' : 'Nhà Đầu Tư'}
                    </p>
                    <p className="text-gray-400 text-sm">{role}</p>
                  </div>
                </button>

                {/* Dropdown Menu */}
                <div className="absolute right-0 top-full mt-2 w-64 bg-slate-800/90 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto">
                  <div className="p-4 border-b border-white/10">
                    <p className="text-white font-semibold">
                      {role === 'analyst' ? 'Chuyên Viên' : role === 'partner' ? 'Đối Tác' : 'Nhà Đầu Tư'}
                    </p>
                    <p className="text-gray-400 text-sm">dealvault@example.com</p>
                    <p className="text-blue-400 text-xs mt-1">{role}</p>
                  </div>
                  
                  <div className="p-2">
                    {[
                      { icon: '👤', label: 'Hồ sơ', action: () => {} },
                      { icon: '⚙️', label: 'Cài đặt', action: () => {} },
                      { icon: '🌙', label: 'Chế độ tối', action: () => {} },
                      { icon: '🚪', label: 'Đăng xuất', action: logout }
                    ].map((item, index) => (
                      <button
                        key={index}
                        onClick={item.action}
                        className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-all duration-300 group/item"
                      >
                        <span className="group-hover/item:animate-magic-sparkle">{item.icon}</span>
                        <span className="text-gray-300 group-hover/item:text-white">{item.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300"
              >
                <span className="text-xl">{isMobileMenuOpen ? '✕' : '☰'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden transition-all duration-300 ${
          isMobileMenuOpen 
            ? 'max-h-screen opacity-100' 
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <div className="bg-slate-900/95 backdrop-blur-lg border-t border-white/10">
            <div className="px-6 py-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-4 rounded-xl transition-all duration-300 ${
                    isActive(item.path)
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <div>
                    <p className="font-medium">{item.label}</p>
                    <p className="text-sm text-gray-400">{item.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer */}
      <div className="h-20"></div>
    </>
  );
} 
import { BrowserRouter as Router, Routes, Route, NavLink, useLocation } from 'react-router-dom';
import { useUserStore } from './store/user';
import { useAlertStore } from './store/pipeline';

// Import pages
import Landing from './routes/Landing';
import Login from './routes/Login';
import About from './routes/About';
import Dashboard from './routes/Dashboard';
import DealSourcing from './routes/DealSourcing';
import Valuation from './routes/Valuation';
import Portfolio from './routes/Portfolio';
import Alerts from './routes/Alerts';
import Reports from './routes/Reports';

// Import components
import LoginButton from './components/LoginButton';

function AppContent() {
  const { role, isAuthenticated } = useUserStore();
  const alerts = useAlertStore(state => state.alerts);
  const location = useLocation();
  
  const criticalAlerts = alerts; // Show all alerts since priority is not defined in Alert type

  // Hide nav on landing and login pages
  const hideNav = ['/', '/login', '/about'].includes(location.pathname);

  if (hideNav) {
    return (
      <>
        {/* Show Login button only when not authenticated and not on login page */}
        {!isAuthenticated && location.pathname !== '/login' && <LoginButton />}
        
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/deal-sourcing" element={<DealSourcing />} />
          <Route path="/valuation" element={<Valuation />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/reports" element={<Reports />} />
        </Routes>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Show Login button when not authenticated */}
      {!isAuthenticated && <LoginButton />}
      
      {/* Navigation */}
      <nav className="bg-black/20 backdrop-blur-lg border-b border-white/10 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3 animate-slide-in-left">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center animate-glow">
                <span className="text-xl font-bold">🏛️</span>
              </div>
              <h1 className="text-2xl font-display font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                DealVault PE
              </h1>
            </div>

            {/* Navigation Links */}
            <div className="flex items-center space-x-6 animate-fade-in">
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 hover:scale-105 ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white animate-glow'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`
                }
              >
                <span>📊</span>
                <span className="font-medium">Dashboard</span>
              </NavLink>

              <NavLink
                to="/deal-sourcing"
                className={({ isActive }) =>
                  `flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 hover:scale-105 ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white animate-glow'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`
                }
              >
                <span>🔍</span>
                <span className="font-medium">Tìm Deal</span>
              </NavLink>

              <NavLink
                to="/valuation"
                className={({ isActive }) =>
                  `flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 hover:scale-105 ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white animate-glow'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`
                }
              >
                <span>💰</span>
                <span className="font-medium">Định Giá</span>
              </NavLink>

              <NavLink
                to="/portfolio"
                className={({ isActive }) =>
                  `flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 hover:scale-105 ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white animate-glow'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`
                }
              >
                <span>📈</span>
                <span className="font-medium">Danh Mục</span>
              </NavLink>

              <NavLink
                to="/reports"
                className={({ isActive }) =>
                  `flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 hover:scale-105 ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white animate-glow'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`
                }
              >
                <span>📑</span>
                <span className="font-medium">Báo Cáo</span>
              </NavLink>

              <NavLink
                to="/alerts"
                className={({ isActive }) =>
                  `relative flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 hover:scale-105 ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white animate-glow'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`
                }
              >
                <span>🚨</span>
                <span className="font-medium">Cảnh Báo</span>
                {criticalAlerts.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                    {criticalAlerts.length}
                  </span>
                )}
              </NavLink>
            </div>

            {/* User Info */}
            <div className="flex items-center space-x-4 animate-slide-in-right">
              <div className="text-right">
                <p className="text-sm text-gray-400">Chào mừng</p>
                <p className="text-white font-semibold capitalize">
                  {role === 'analyst' ? 'Chuyên Viên' : role === 'partner' ? 'Đối Tác' : 'Nhà Đầu Tư'}
                </p>
              </div>
              
              <div className="flex space-x-2">
                <button className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-105 text-gray-300 hover:text-white">
                  <span>⚙️</span>
                </button>
                <button className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-105 text-gray-300 hover:text-white">
                  <span>👤</span>
                </button>
                <button 
                  onClick={() => {
                    const { logout } = useUserStore.getState();
                    logout();
                    window.location.href = '/';
                  }}
                  className="p-2 rounded-xl bg-red-500/20 hover:bg-red-500/30 transition-all duration-300 hover:scale-105 text-red-300 hover:text-red-200"
                  title="Đăng xuất"
                >
                  <span>🚪</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="text-white">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/deal-sourcing" element={<DealSourcing />} />
          <Route path="/valuation" element={<Valuation />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/reports" element={<Reports />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="bg-black/20 backdrop-blur-lg border-t border-white/10 mt-20">
        <div className="container mx-auto px-6 py-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                  <span className="text-sm font-bold">🏛️</span>
                </div>
                <h3 className="text-lg font-bold text-white">DealVault PE</h3>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Nền tảng AI hàng đầu cho Private Equity tại Việt Nam và Đông Nam Á
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Sản Phẩm</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-blue-400 transition-colors">AI Deal Sourcing</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Valuation Toolkit</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Portfolio Management</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Risk Analytics</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Công Ty</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="/about" className="hover:text-blue-400 transition-colors">Về Chúng Tôi</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Tuyển Dụng</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Tin Tức</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Liên Hệ</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Hỗ Trợ</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-blue-400 transition-colors">Tài Liệu API</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Hướng Dẫn</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Cộng Đồng</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Bảo Mật</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between">
            <p className="text-gray-400 text-sm">
              © 2024 DealVault PE. Tất cả quyền được bảo lưu.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <span className="text-lg">📱</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <span className="text-lg">💼</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <span className="text-lg">🐦</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
} 
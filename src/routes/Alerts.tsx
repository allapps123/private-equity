import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Alert {
  id: string;
  title: string;
  message: string;
  type: 'critical' | 'warning' | 'info' | 'success';
  category: 'performance' | 'risk' | 'market' | 'portfolio' | 'system';
  timestamp: string;
  isRead: boolean;
  actionRequired: boolean;
  priority: 'high' | 'medium' | 'low';
  source: string;
}

const sampleAlerts: Alert[] = [
  {
    id: '1',
    title: 'Cảnh Báo Hiệu Suất Quan Trọng',
    message: 'Công ty TechStart có IRR giảm 15% so với quý trước. Cần xem xét chiến lược đầu tư.',
    type: 'critical',
    category: 'performance',
    timestamp: '2024-01-15T14:30:00',
    isRead: false,
    actionRequired: true,
    priority: 'high',
    source: 'AI Performance Monitor'
  },
  {
    id: '2',
    title: 'Cập Nhật Thị Trường',
    message: 'Lãi suất Fed tăng 0.25%, có thể ảnh hưởng đến định giá startup trong Q1.',
    type: 'warning',
    category: 'market',
    timestamp: '2024-01-15T10:15:00',
    isRead: false,
    actionRequired: false,
    priority: 'medium',
    source: 'Market Intelligence'
  },
  {
    id: '3',
    title: 'Thành Công Exit',
    message: 'CloudifyPro đã hoàn tất IPO với mức định giá $2.4B, đạt 8.5x multiple.',
    type: 'success',
    category: 'portfolio',
    timestamp: '2024-01-14T16:45:00',
    isRead: true,
    actionRequired: false,
    priority: 'high',
    source: 'Portfolio Tracker'
  },
  {
    id: '4',
    title: 'Phân Tích Rủi Ro',
    message: 'Phát hiện tăng rủi ro tập trung trong lĩnh vực fintech (45% portfolio).',
    type: 'warning',
    category: 'risk',
    timestamp: '2024-01-14T09:20:00',
    isRead: true,
    actionRequired: true,
    priority: 'medium',
    source: 'Risk Management AI'
  },
  {
    id: '5',
    title: 'Cập Nhật Hệ Thống',
    message: 'Đã cập nhật thuật toán định giá với mô hình ML mới, độ chính xác tăng 12%.',
    type: 'info',
    category: 'system',
    timestamp: '2024-01-13T11:00:00',
    isRead: true,
    actionRequired: false,
    priority: 'low',
    source: 'System Admin'
  }
];

const alertSettings = {
  performance: { enabled: true, threshold: 'medium' },
  risk: { enabled: true, threshold: 'low' },
  market: { enabled: true, threshold: 'medium' },
  portfolio: { enabled: true, threshold: 'low' },
  system: { enabled: false, threshold: 'high' }
};

const getAlertColor = (type: string) => {
  switch (type) {
    case 'critical': return 'border-red-500 bg-red-500/10 text-red-300';
    case 'warning': return 'border-yellow-500 bg-yellow-500/10 text-yellow-300';
    case 'info': return 'border-blue-500 bg-blue-500/10 text-blue-300';
    case 'success': return 'border-green-500 bg-green-500/10 text-green-300';
    default: return 'border-gray-500 bg-gray-500/10 text-gray-300';
  }
};

const getAlertIcon = (type: string) => {
  switch (type) {
    case 'critical': return '🚨';
    case 'warning': return '⚠️';
    case 'info': return 'ℹ️';
    case 'success': return '✅';
    default: return '📢';
  }
};

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'performance': return '📈';
    case 'risk': return '⚠️';
    case 'market': return '📊';
    case 'portfolio': return '💼';
    case 'system': return '⚙️';
    default: return '📝';
  }
};

const getCategoryName = (category: string) => {
  switch (category) {
    case 'performance': return 'Hiệu Suất';
    case 'risk': return 'Rủi Ro';
    case 'market': return 'Thị Trường';
    case 'portfolio': return 'Danh Mục';
    case 'system': return 'Hệ Thống';
    default: return 'Khác';
  }
};

const formatTime = (timestamp: string) => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);

  if (diffHours < 1) return 'Vừa xong';
  if (diffHours < 24) return `${diffHours} giờ trước`;
  if (diffDays < 7) return `${diffDays} ngày trước`;
  return date.toLocaleDateString('vi-VN');
};

const Alerts = () => {
  const [alerts, setAlerts] = useState<Alert[]>(sampleAlerts);
  const [filteredAlerts, setFilteredAlerts] = useState<Alert[]>(sampleAlerts);
  const [activeFilter, setActiveFilter] = useState<'all' | 'unread' | 'critical' | 'actionRequired'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let filtered = alerts;

    // Apply filter
    switch (activeFilter) {
      case 'unread':
        filtered = filtered.filter(alert => !alert.isRead);
        break;
      case 'critical':
        filtered = filtered.filter(alert => alert.type === 'critical');
        break;
      case 'actionRequired':
        filtered = filtered.filter(alert => alert.actionRequired);
        break;
    }

    // Apply category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(alert => alert.category === selectedCategory);
    }

    setFilteredAlerts(filtered);
  }, [alerts, activeFilter, selectedCategory]);

  const markAsRead = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, isRead: true } : alert
    ));
  };

  const markAllAsRead = () => {
    setAlerts(prev => prev.map(alert => ({ ...alert, isRead: true })));
  };

  const deleteAlert = (alertId: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== alertId));
  };

  const unreadCount = alerts.filter(alert => !alert.isRead).length;
  const criticalCount = alerts.filter(alert => alert.type === 'critical').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent mb-2">
                  🔔 Trung Tâm Cảnh Báo
                </h1>
                <p className="text-purple-200">Theo dõi và quản lý thông báo quan trọng</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-sm text-purple-200">Cảnh báo chưa đọc</div>
                  <div className="text-2xl font-bold text-white">{unreadCount}</div>
                </div>
                {criticalCount > 0 && (
                  <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3">
                    <div className="text-sm text-red-300">Khẩn cấp</div>
                    <div className="text-xl font-bold text-red-400">{criticalCount}</div>
                  </div>
                )}
                <motion.button
                  onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 bg-white/10 hover:bg-white/20 rounded-lg border border-white/20 transition-all duration-300"
                >
                  ⚙️
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            {/* Quick Actions */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
              <h3 className="text-lg font-semibold text-white mb-4">Thao Tác Nhanh</h3>
              <div className="space-y-3">
                <motion.button
                  onClick={markAllAsRead}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-2 px-4 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 rounded-lg transition-all duration-300 text-sm"
                >
                  ✅ Đánh dấu tất cả đã đọc
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-2 px-4 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 rounded-lg transition-all duration-300 text-sm"
                >
                  🔄 Làm mới cảnh báo
                </motion.button>
              </div>
            </div>

            {/* Filters */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
              <h3 className="text-lg font-semibold text-white mb-4">Bộ Lọc</h3>
              <div className="space-y-3">
                {[
                  { key: 'all', label: 'Tất cả', count: alerts.length },
                  { key: 'unread', label: 'Chưa đọc', count: unreadCount },
                  { key: 'critical', label: 'Khẩn cấp', count: criticalCount },
                  { key: 'actionRequired', label: 'Cần hành động', count: alerts.filter(a => a.actionRequired).length }
                ].map(filter => (
                  <button
                    key={filter.key}
                    onClick={() => setActiveFilter(filter.key as any)}
                    className={`w-full text-left py-2 px-3 rounded-lg transition-all duration-300 flex items-center justify-between ${
                      activeFilter === filter.key
                        ? 'bg-white/20 text-white'
                        : 'text-purple-200 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <span>{filter.label}</span>
                    <span className="text-xs bg-white/20 px-2 py-1 rounded-full">{filter.count}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
              <h3 className="text-lg font-semibold text-white mb-4">Danh Mục</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`w-full text-left py-2 px-3 rounded-lg transition-all duration-300 flex items-center gap-2 ${
                    selectedCategory === 'all'
                      ? 'bg-white/20 text-white'
                      : 'text-purple-200 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <span>📋</span>
                  <span>Tất cả</span>
                </button>
                {Object.keys(alertSettings).map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full text-left py-2 px-3 rounded-lg transition-all duration-300 flex items-center gap-2 ${
                      selectedCategory === category
                        ? 'bg-white/20 text-white'
                        : 'text-purple-200 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <span>{getCategoryIcon(category)}</span>
                    <span>{getCategoryName(category)}</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Stats */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-4 gap-4"
            >
              {[
                { label: 'Tổng cảnh báo', value: alerts.length, color: 'blue', icon: '📢' },
                { label: 'Chưa đọc', value: unreadCount, color: 'purple', icon: '👁️' },
                { label: 'Khẩn cấp', value: criticalCount, color: 'red', icon: '🚨' },
                { label: 'Cần hành động', value: alerts.filter(a => a.actionRequired).length, color: 'yellow', icon: '⚡' }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className={`bg-${stat.color}-500/10 border border-${stat.color}-500/30 rounded-xl p-4`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{stat.icon}</span>
                    <div>
                      <div className={`text-2xl font-bold text-${stat.color}-400`}>{stat.value}</div>
                      <div className={`text-sm text-${stat.color}-300`}>{stat.label}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Alerts List */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-4"
            >
              <AnimatePresence>
                {filteredAlerts.map((alert, index) => (
                  <motion.div
                    key={alert.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ delay: index * 0.05 }}
                    className={`p-6 rounded-2xl border transition-all duration-300 hover:scale-[1.02] ${
                      alert.isRead ? 'bg-white/5' : 'bg-white/10'
                    } ${getAlertColor(alert.type)} backdrop-blur-xl`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="text-2xl">{getAlertIcon(alert.type)}</div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className={`font-semibold ${alert.isRead ? 'text-gray-300' : 'text-white'}`}>
                              {alert.title}
                            </h3>
                            {!alert.isRead && (
                              <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
                            )}
                            {alert.actionRequired && (
                              <span className="px-2 py-1 bg-orange-500/20 text-orange-300 text-xs rounded-full border border-orange-500/30">
                                Cần hành động
                              </span>
                            )}
                          </div>
                          <p className={`mb-3 ${alert.isRead ? 'text-gray-400' : 'text-gray-200'}`}>
                            {alert.message}
                          </p>
                          <div className="flex items-center gap-4 text-sm text-gray-400">
                            <span className="flex items-center gap-1">
                              {getCategoryIcon(alert.category)}
                              {getCategoryName(alert.category)}
                            </span>
                            <span>📍 {alert.source}</span>
                            <span>🕐 {formatTime(alert.timestamp)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        {!alert.isRead && (
                          <motion.button
                            onClick={() => markAsRead(alert.id)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="p-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 rounded-lg transition-all duration-300"
                            title="Đánh dấu đã đọc"
                          >
                            ✅
                          </motion.button>
                        )}
                        <motion.button
                          onClick={() => deleteAlert(alert.id)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg transition-all duration-300"
                          title="Xóa cảnh báo"
                        >
                          🗑️
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {filteredAlerts.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12 bg-white/5 rounded-2xl border border-white/20"
                >
                  <div className="text-4xl mb-4">📭</div>
                  <h3 className="text-lg font-semibold text-white mb-2">Không có cảnh báo</h3>
                  <p className="text-purple-200">Tất cả đã được xử lý hoặc không có cảnh báo mới.</p>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>

        {/* Settings Modal */}
        <AnimatePresence>
          {isSettingsOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setIsSettingsOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 max-w-md w-full"
                onClick={e => e.stopPropagation()}
              >
                <h3 className="text-xl font-semibold text-white mb-6">⚙️ Cài Đặt Cảnh Báo</h3>
                
                <div className="space-y-4">
                  {Object.entries(alertSettings).map(([category, settings]) => (
                    <div key={category} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <div className="flex items-center gap-3">
                        <span>{getCategoryIcon(category)}</span>
                        <span className="text-white">{getCategoryName(category)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <select className="bg-white/10 border border-white/20 rounded px-2 py-1 text-white text-sm">
                          <option value="low">Thấp</option>
                          <option value="medium">Trung bình</option>
                          <option value="high">Cao</option>
                        </select>
                        <input 
                          type="checkbox" 
                          defaultChecked={settings.enabled}
                          className="w-4 h-4"
                        />
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => setIsSettingsOpen(false)}
                    className="flex-1 py-2 bg-gray-500/20 hover:bg-gray-500/30 text-gray-300 rounded-lg transition-all duration-300"
                  >
                    Hủy
                  </button>
                  <button
                    onClick={() => setIsSettingsOpen(false)}
                    className="flex-1 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 rounded-lg transition-all duration-300"
                  >
                    Lưu
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Alerts; 
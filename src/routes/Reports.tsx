import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Report {
  id: string;
  name: string;
  type: 'portfolio' | 'financial' | 'performance' | 'risk';
  status: 'completed' | 'generating' | 'scheduled';
  lastGenerated: string;
  format: 'PDF' | 'Excel' | 'PowerPoint';
  size: string;
  description: string;
}

const sampleReports: Report[] = [
  {
    id: '1',
    name: 'Báo Cáo Hiệu Suất Quý 4',
    type: 'performance',
    status: 'completed',
    lastGenerated: '2024-01-15',
    format: 'PDF',
    size: '2.4 MB',
    description: 'Tổng quan hiệu suất đầu tư và phân tích IRR của các công ty đầu tư'
  },
  {
    id: '2',
    name: 'Phân Tích Rủi Ro Danh Mục',
    type: 'risk',
    status: 'generating',
    lastGenerated: '2024-01-12',
    format: 'Excel',
    size: '1.8 MB',
    description: 'Đánh giá toàn diện các yếu tố rủi ro và stress test danh mục đầu tư'
  },
  {
    id: '3',
    name: 'Báo Cáo Tài Chính Tổng Hợp',
    type: 'financial',
    status: 'completed',
    lastGenerated: '2024-01-10',
    format: 'PowerPoint',
    size: '5.2 MB',
    description: 'Báo cáo tài chính chi tiết và dự báo cash flow của toàn bộ portfolio'
  },
  {
    id: '4',
    name: 'Tổng Quan Danh Mục Đầu Tư',
    type: 'portfolio',
    status: 'scheduled',
    lastGenerated: '2024-01-08',
    format: 'PDF',
    size: '3.1 MB',
    description: 'Báo cáo tổng quan về cấu trúc, hiệu suất và chiến lược của danh mục'
  }
];

const reportTemplates = [
  {
    id: 'monthly',
    name: 'Báo Cáo Tháng',
    description: 'Báo cáo hiệu suất và hoạt động hàng tháng',
    icon: '📅',
    estimatedTime: '15 phút'
  },
  {
    id: 'quarterly',
    name: 'Báo Cáo Quý',
    description: 'Phân tích toàn diện hiệu suất quý',
    icon: '📊',
    estimatedTime: '30 phút'
  },
  {
    id: 'annual',
    name: 'Báo Cáo Năm',
    description: 'Tổng kết và đánh giá hiệu suất cả năm',
    icon: '📈',
    estimatedTime: '45 phút'
  },
  {
    id: 'custom',
    name: 'Báo Cáo Tùy Chỉnh',
    description: 'Tạo báo cáo theo yêu cầu riêng',
    icon: '⚙️',
    estimatedTime: '20 phút'
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed': return 'bg-green-100 text-green-800 border-green-200';
    case 'generating': return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'scheduled': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'completed': return 'Hoàn Thành';
    case 'generating': return 'Đang Tạo';
    case 'scheduled': return 'Đã Lên Lịch';
    default: return 'Không Xác Định';
  }
};

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'portfolio': return '💼';
    case 'financial': return '💰';
    case 'performance': return '📈';
    case 'risk': return '⚠️';
    default: return '📄';
  }
};

export default function Reports() {
  const [activeTab, setActiveTab] = useState<'reports' | 'templates' | 'schedule'>('reports');
  const [reports, setReports] = useState<Report[]>(sampleReports);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const generateReport = async (templateId: string) => {
    setIsGenerating(true);
    setSelectedTemplate(templateId);
    
    // Simulate report generation
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const template = reportTemplates.find(t => t.id === templateId);
    const newReport: Report = {
      id: Date.now().toString(),
      name: template?.name || 'Báo Cáo Mới',
      type: 'portfolio',
      status: 'completed',
      lastGenerated: new Date().toISOString().split('T')[0],
      format: 'PDF',
      size: '2.1 MB',
      description: template?.description || 'Báo cáo được tạo tự động'
    };
    
    setReports(prev => [newReport, ...prev]);
    setIsGenerating(false);
    setSelectedTemplate(null);
  };

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Chào Buổi Sáng! ☀️';
    if (hour < 18) return 'Chào Buổi Chiều! 🌤️';
    return 'Chào Buổi Tối! 🌙';
  };

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
                  📊 Trung Tâm Báo Cáo
                </h1>
                <p className="text-purple-200">{getGreeting()} Tạo và quản lý báo cáo chuyên nghiệp</p>
              </div>
              <div className="text-right">
                <div className="text-sm text-purple-200">Thời gian hiện tại</div>
                <div className="text-lg font-mono text-white">
                  {currentTime.toLocaleTimeString('vi-VN')}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/10 backdrop-blur-xl rounded-2xl p-1 mb-8 border border-white/20"
        >
          <div className="flex gap-1">
            {[
              { key: 'reports', label: 'Báo Cáo Có Sẵn', icon: '📋' },
              { key: 'templates', label: 'Mẫu Báo Cáo', icon: '📝' },
              { key: 'schedule', label: 'Lịch Trình', icon: '⏰' }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`flex-1 py-3 px-4 rounded-xl font-medium text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                  activeTab === tab.key
                    ? 'bg-white/20 text-white shadow-lg'
                    : 'text-purple-200 hover:bg-white/10 hover:text-white'
                }`}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'reports' && (
            <motion.div
              key="reports"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6"
            >
              <div className="grid gap-6">
                {reports.map((report, index) => (
                  <motion.div
                    key={report.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="text-3xl">{getTypeIcon(report.type)}</div>
                        <div>
                          <h3 className="text-lg font-semibold text-white">{report.name}</h3>
                          <p className="text-purple-200 text-sm">{report.description}</p>
                          <div className="flex items-center gap-4 mt-2 text-sm text-purple-300">
                            <span>📅 {report.lastGenerated}</span>
                            <span>📁 {report.format}</span>
                            <span>💾 {report.size}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(report.status)}`}>
                          {getStatusText(report.status)}
                        </span>
                        <div className="flex gap-2">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 rounded-lg transition-all duration-300"
                          >
                            👁️ Xem
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-4 py-2 bg-green-500/20 hover:bg-green-500/30 text-green-300 rounded-lg transition-all duration-300"
                          >
                            ⬇️ Tải
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'templates' && (
            <motion.div
              key="templates"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {reportTemplates.map((template, index) => (
                  <motion.div
                    key={template.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 group"
                  >
                    <div className="text-center mb-4">
                      <div className="text-4xl mb-3">{template.icon}</div>
                      <h3 className="text-xl font-semibold text-white mb-2">{template.name}</h3>
                      <p className="text-purple-200 text-sm mb-4">{template.description}</p>
                      <div className="text-xs text-purple-300">
                        ⏱️ Thời gian ước tính: {template.estimatedTime}
                      </div>
                    </div>
                    
                    <motion.button
                      onClick={() => generateReport(template.id)}
                      disabled={isGenerating}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full py-3 rounded-xl font-medium transition-all duration-300 ${
                        isGenerating && selectedTemplate === template.id
                          ? 'bg-blue-500/30 text-blue-300 cursor-not-allowed'
                          : 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white shadow-lg hover:shadow-xl'
                      }`}
                    >
                      {isGenerating && selectedTemplate === template.id ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="animate-spin w-4 h-4 border-2 border-blue-300 border-t-transparent rounded-full"></div>
                          Đang Tạo Báo Cáo...
                        </div>
                      ) : (
                        <span>🚀 Tạo Báo Cáo</span>
                      )}
                    </motion.button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'schedule' && (
            <motion.div
              key="schedule"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6"
            >
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <h3 className="text-xl font-semibold text-white mb-6">📅 Lịch Trình Báo Cáo Tự Động</h3>
                
                <div className="space-y-4">
                  {[
                    { name: 'Báo Cáo Tuần', schedule: 'Thứ 2 hàng tuần', nextRun: '2024-01-22', status: 'active' },
                    { name: 'Báo Cáo Tháng', schedule: 'Ngày 1 hàng tháng', nextRun: '2024-02-01', status: 'active' },
                    { name: 'Báo Cáo Quý', schedule: 'Đầu mỗi quý', nextRun: '2024-04-01', status: 'paused' }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10"
                    >
                      <div>
                        <h4 className="font-medium text-white">{item.name}</h4>
                        <p className="text-sm text-purple-200">{item.schedule}</p>
                        <p className="text-xs text-purple-300">Lần chạy tiếp theo: {item.nextRun}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          item.status === 'active' 
                            ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                            : 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                        }`}>
                          {item.status === 'active' ? '🟢 Hoạt Động' : '⏸️ Tạm Dừng'}
                        </span>
                        <button className="text-purple-300 hover:text-white transition-colors">
                          ⚙️
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-6 w-full py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  ➕ Thêm Lịch Trình Mới
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
} 
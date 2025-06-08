import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ScreeningCriteria {
  id: string;
  name: string;
  operator: 'greater' | 'less' | 'equal' | 'between' | 'contains';
  value: string | number;
  weight: number;
  category: 'financial' | 'market' | 'team' | 'product' | 'risk';
}

interface Company {
  id: string;
  name: string;
  industry: string;
  stage: string;
  revenue: number;
  growthRate: number;
  teamSize: number;
  funding: number;
  marketSize: number;
  score: number;
  matchedCriteria: number;
  totalCriteria: number;
  aiInsights: string[];
  riskLevel: 'low' | 'medium' | 'high';
  founded: number;
  location: string;
  description: string;
}

const defaultCriteria: ScreeningCriteria[] = [
  {
    id: '1',
    name: 'Doanh Thu Tối Thiểu',
    operator: 'greater',
    value: 1000000,
    weight: 20,
    category: 'financial'
  },
  {
    id: '2',
    name: 'Tăng Trưởng Doanh Thu',
    operator: 'greater',
    value: 30,
    weight: 25,
    category: 'financial'
  },
  {
    id: '3',
    name: 'Quy Mô Thị Trường',
    operator: 'greater',
    value: 100000000,
    weight: 20,
    category: 'market'
  },
  {
    id: '4',
    name: 'Quy Mô Đội Ngũ',
    operator: 'greater',
    value: 10,
    weight: 15,
    category: 'team'
  },
  {
    id: '5',
    name: 'Giai Đoạn Phát Triển',
    operator: 'contains',
    value: 'Series A,Series B',
    weight: 20,
    category: 'product'
  }
];

const sampleCompanies: Company[] = [
  {
    id: '1',
    name: 'VietFintech Solutions',
    industry: 'FinTech',
    stage: 'Series A',
    revenue: 2500000,
    growthRate: 85,
    teamSize: 25,
    funding: 3000000,
    marketSize: 250000000,
    score: 92,
    matchedCriteria: 5,
    totalCriteria: 5,
    aiInsights: [
      'Tăng trưởng MRR ổn định 15% mỗi tháng',
      'Đội ngũ có kinh nghiệm mạnh trong fintech',
      'Sản phẩm có tính khác biệt cao'
    ],
    riskLevel: 'low',
    founded: 2021,
    location: 'TP.HCM',
    description: 'Nền tảng thanh toán số và cho vay P2P dành cho SME'
  },
  {
    id: '2',
    name: 'EduTech Vietnam',
    industry: 'EdTech',
    stage: 'Series B',
    revenue: 4200000,
    growthRate: 65,
    teamSize: 45,
    funding: 8000000,
    marketSize: 180000000,
    score: 88,
    matchedCriteria: 5,
    totalCriteria: 5,
    aiInsights: [
      'Tỷ lệ retention học viên 85%',
      'Mở rộng thành công ra 3 quốc gia',
      'AI-powered learning có độ chính xác cao'
    ],
    riskLevel: 'low',
    founded: 2020,
    location: 'Hà Nội',
    description: 'Nền tảng học tập trực tuyến với AI cá nhân hóa'
  },
  {
    id: '3',
    name: 'HealthCare AI Corp',
    industry: 'HealthTech',
    stage: 'Series A',
    revenue: 1800000,
    growthRate: 120,
    teamSize: 32,
    funding: 5500000,
    marketSize: 320000000,
    score: 95,
    matchedCriteria: 5,
    totalCriteria: 5,
    aiInsights: [
      'Công nghệ AI chẩn đoán độ chính xác 94%',
      'Đối tác với 50+ bệnh viện lớn',
      'Patent portfolio mạnh trong AI medical'
    ],
    riskLevel: 'medium',
    founded: 2019,
    location: 'Đà Nẵng',
    description: 'AI-powered diagnostic platform cho healthcare'
  },
  {
    id: '4',
    name: 'GreenEnergy Innovations',
    industry: 'CleanTech',
    stage: 'Seed',
    revenue: 800000,
    growthRate: 45,
    teamSize: 18,
    funding: 1200000,
    marketSize: 450000000,
    score: 72,
    matchedCriteria: 3,
    totalCriteria: 5,
    aiInsights: [
      'Công nghệ pin mặt trời hiệu suất cao',
      'Team có background kỹ thuật mạnh',
      'Cần tăng cường sales & marketing'
    ],
    riskLevel: 'high',
    founded: 2022,
    location: 'Cần Thơ',
    description: 'Giải pháp năng lượng sạch cho công nghiệp'
  },
  {
    id: '5',
    name: 'AgriTech Solutions',
    industry: 'AgTech',
    stage: 'Series A',
    revenue: 3100000,
    growthRate: 78,
    teamSize: 28,
    funding: 4200000,
    marketSize: 200000000,
    score: 86,
    matchedCriteria: 5,
    totalCriteria: 5,
    aiInsights: [
      'IoT platform quản lý nông trại hiệu quả',
      'Tăng năng suất nông nghiệp 35%',
      'Mô hình kinh doanh B2B2C bền vững'
    ],
    riskLevel: 'low',
    founded: 2020,
    location: 'Long An',
    description: 'Nền tảng IoT và AI cho nông nghiệp thông minh'
  }
];

const industryOptions = [
  'Tất cả ngành',
  'FinTech',
  'EdTech',
  'HealthTech',
  'CleanTech',
  'AgTech',
  'E-commerce',
  'SaaS',
  'GameTech',
  'FoodTech'
];

const stageOptions = [
  'Tất cả giai đoạn',
  'Pre-Seed',
  'Seed',
  'Series A',
  'Series B',
  'Series C',
  'Growth',
  'Pre-IPO'
];

export default function InvestmentScreening() {
  const [criteria, setCriteria] = useState<ScreeningCriteria[]>(defaultCriteria);
  const [companies, setCompanies] = useState<Company[]>(sampleCompanies);
  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>(sampleCompanies);
  const [isScreening, setIsScreening] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState('Tất cả ngành');
  const [selectedStage, setSelectedStage] = useState('Tất cả giai đoạn');
  const [sortBy, setSortBy] = useState<'score' | 'revenue' | 'growth'>('score');
  const [showCriteriaModal, setShowCriteriaModal] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

  useEffect(() => {
    let filtered = companies;

    // Apply industry filter
    if (selectedIndustry !== 'Tất cả ngành') {
      filtered = filtered.filter(company => company.industry === selectedIndustry);
    }

    // Apply stage filter
    if (selectedStage !== 'Tất cả giai đoạn') {
      filtered = filtered.filter(company => company.stage === selectedStage);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'score':
          return b.score - a.score;
        case 'revenue':
          return b.revenue - a.revenue;
        case 'growth':
          return b.growthRate - a.growthRate;
        default:
          return 0;
      }
    });

    setFilteredCompanies(filtered);
  }, [companies, selectedIndustry, selectedStage, sortBy]);

  const runScreening = async () => {
    setIsScreening(true);
    
    // Simulate AI screening process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Calculate scores based on criteria
    const updatedCompanies = companies.map(company => {
      let score = 0;
      let matchedCriteria = 0;
      
      criteria.forEach(criterion => {
        let matches = false;
        
        switch (criterion.name) {
          case 'Doanh Thu Tối Thiểu':
            matches = company.revenue >= Number(criterion.value);
            break;
          case 'Tăng Trưởng Doanh Thu':
            matches = company.growthRate >= Number(criterion.value);
            break;
          case 'Quy Mô Thị Trường':
            matches = company.marketSize >= Number(criterion.value);
            break;
          case 'Quy Mô Đội Ngũ':
            matches = company.teamSize >= Number(criterion.value);
            break;
          case 'Giai Đoạn Phát Triển':
            const stages = criterion.value.toString().split(',');
            matches = stages.includes(company.stage);
            break;
        }
        
        if (matches) {
          score += criterion.weight;
          matchedCriteria++;
        }
      });
      
      return {
        ...company,
        score,
        matchedCriteria,
        totalCriteria: criteria.length
      };
    });
    
    setCompanies(updatedCompanies);
    setIsScreening(false);
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-400 bg-green-500/20 border-green-500/30';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'high': return 'text-red-400 bg-red-500/20 border-red-500/30';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
    }
  };

  const getRiskText = (risk: string) => {
    switch (risk) {
      case 'low': return 'Thấp';
      case 'medium': return 'Trung Bình';
      case 'high': return 'Cao';
      default: return 'Không rõ';
    }
  };

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`;
    }
    return `$${(amount / 1000).toFixed(0)}K`;
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
                  🎯 Sàng Lọc Đầu Tư Thông Minh
                </h1>
                <p className="text-purple-200">AI-powered screening cho cơ hội đầu tư PE tối ưu</p>
              </div>
              <motion.button
                onClick={() => setShowCriteriaModal(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
              >
                ⚙️ Tùy Chỉnh Tiêu Chí
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Controls */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 mb-8"
        >
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <label className="text-purple-200 text-sm">Ngành:</label>
              <select
                value={selectedIndustry}
                onChange={(e) => setSelectedIndustry(e.target.value)}
                className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm"
              >
                {industryOptions.map(industry => (
                  <option key={industry} value={industry} className="bg-slate-800 text-white">
                    {industry}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-purple-200 text-sm">Giai đoạn:</label>
              <select
                value={selectedStage}
                onChange={(e) => setSelectedStage(e.target.value)}
                className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm"
              >
                {stageOptions.map(stage => (
                  <option key={stage} value={stage} className="bg-slate-800 text-white">
                    {stage}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-purple-200 text-sm">Sắp xếp:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm"
              >
                <option value="score" className="bg-slate-800 text-white">Điểm AI</option>
                <option value="revenue" className="bg-slate-800 text-white">Doanh thu</option>
                <option value="growth" className="bg-slate-800 text-white">Tăng trưởng</option>
              </select>
            </div>

            <motion.button
              onClick={runScreening}
              disabled={isScreening}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
                isScreening
                  ? 'bg-blue-500/30 text-blue-300 cursor-not-allowed'
                  : 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg hover:shadow-xl'
              }`}
            >
              {isScreening ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin w-4 h-4 border-2 border-blue-300 border-t-transparent rounded-full"></div>
                  Đang Sàng Lọc...
                </div>
              ) : (
                <span>🚀 Chạy Sàng Lọc AI</span>
              )}
            </motion.button>
          </div>

          {/* Criteria Summary */}
          <div className="mt-4 pt-4 border-t border-white/20">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm text-purple-200">Tiêu chí hiện tại:</span>
              <span className="text-sm text-white font-medium">{criteria.length} tiêu chí</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {criteria.map(criterion => (
                <span
                  key={criterion.id}
                  className="px-3 py-1 bg-white/10 text-white text-xs rounded-full border border-white/20"
                >
                  {criterion.name} ({criterion.weight}%)
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Results */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-white">
              Kết Quả Sàng Lọc ({filteredCompanies.length} công ty)
            </h3>
          </div>

          <div className="grid gap-6">
            {filteredCompanies.map((company, index) => (
              <motion.div
                key={company.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 group cursor-pointer"
                onClick={() => setSelectedCompany(company)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <div>
                        <h4 className="text-xl font-semibold text-white">{company.name}</h4>
                        <p className="text-purple-200 text-sm">{company.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getRiskColor(company.riskLevel)}`}>
                          Rủi ro: {getRiskText(company.riskLevel)}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="bg-white/5 rounded-lg p-3">
                        <div className="text-sm text-purple-200">Ngành</div>
                        <div className="text-white font-medium">{company.industry}</div>
                      </div>
                      <div className="bg-white/5 rounded-lg p-3">
                        <div className="text-sm text-purple-200">Giai đoạn</div>
                        <div className="text-white font-medium">{company.stage}</div>
                      </div>
                      <div className="bg-white/5 rounded-lg p-3">
                        <div className="text-sm text-purple-200">Doanh thu</div>
                        <div className="text-white font-medium">{formatCurrency(company.revenue)}</div>
                      </div>
                      <div className="bg-white/5 rounded-lg p-3">
                        <div className="text-sm text-purple-200">Tăng trưởng</div>
                        <div className="text-green-400 font-medium">+{company.growthRate}%</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-purple-300">
                      <span>📍 {company.location}</span>
                      <span>👥 {company.teamSize} nhân viên</span>
                      <span>📅 Thành lập {company.founded}</span>
                      <span>💰 Funding: {formatCurrency(company.funding)}</span>
                    </div>
                  </div>

                  <div className="ml-6 text-center">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl p-4 mb-3">
                      <div className="text-2xl font-bold">{company.score}</div>
                      <div className="text-xs">Điểm AI</div>
                    </div>
                    <div className="text-sm text-purple-200">
                      {company.matchedCriteria}/{company.totalCriteria} tiêu chí
                    </div>
                    <div className="w-20 bg-white/20 rounded-full h-2 mt-2">
                      <div 
                        className="bg-gradient-to-r from-green-400 to-emerald-400 h-2 rounded-full"
                        style={{ width: `${(company.matchedCriteria / company.totalCriteria) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Company Detail Modal */}
        <AnimatePresence>
          {selectedCompany && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedCompany(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
                onClick={e => e.stopPropagation()}
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white">{selectedCompany.name}</h3>
                    <p className="text-purple-200">{selectedCompany.description}</p>
                  </div>
                  <button
                    onClick={() => setSelectedCompany(null)}
                    className="text-purple-300 hover:text-white transition-colors"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/5 rounded-lg p-4">
                      <div className="text-sm text-purple-200 mb-2">Điểm AI Tổng Thể</div>
                      <div className="text-3xl font-bold text-green-400">{selectedCompany.score}</div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-4">
                      <div className="text-sm text-purple-200 mb-2">Quy Mô Thị Trường</div>
                      <div className="text-xl font-semibold text-white">{formatCurrency(selectedCompany.marketSize)}</div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">🤖 AI Insights</h4>
                    <div className="space-y-2">
                      {selectedCompany.aiInsights.map((insight, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
                          <span className="text-green-400">✓</span>
                          <span className="text-purple-200">{insight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      📊 Phân Tích Sâu
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      💼 Thêm Vào Portfolio
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Criteria Modal */}
        <AnimatePresence>
          {showCriteriaModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowCriteriaModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 max-w-4xl w-full max-h-[80vh] overflow-y-auto"
                onClick={e => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-white">⚙️ Tùy Chỉnh Tiêu Chí Sàng Lọc</h3>
                  <button
                    onClick={() => setShowCriteriaModal(false)}
                    className="text-purple-300 hover:text-white transition-colors"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-4">
                  {criteria.map((criterion, index) => (
                    <div key={criterion.id} className="p-4 bg-white/5 rounded-lg border border-white/20">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                          <label className="text-sm text-purple-200">Tên tiêu chí</label>
                          <input
                            type="text"
                            value={criterion.name}
                            onChange={(e) => {
                              const updated = [...criteria];
                              updated[index].name = e.target.value;
                              setCriteria(updated);
                            }}
                            className="w-full mt-1 bg-white/10 border border-white/20 rounded px-3 py-2 text-white text-sm"
                          />
                        </div>
                        <div>
                          <label className="text-sm text-purple-200">Toán tử</label>
                          <select
                            value={criterion.operator}
                            onChange={(e) => {
                              const updated = [...criteria];
                              updated[index].operator = e.target.value as any;
                              setCriteria(updated);
                            }}
                            className="w-full mt-1 bg-white/10 border border-white/20 rounded px-3 py-2 text-white text-sm"
                          >
                            <option value="greater" className="bg-slate-800 text-white">Lớn hơn</option>
                            <option value="less" className="bg-slate-800 text-white">Nhỏ hơn</option>
                            <option value="equal" className="bg-slate-800 text-white">Bằng</option>
                            <option value="contains" className="bg-slate-800 text-white">Chứa</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-sm text-purple-200">Giá trị</label>
                          <input
                            type="text"
                            value={criterion.value}
                            onChange={(e) => {
                              const updated = [...criteria];
                              updated[index].value = e.target.value;
                              setCriteria(updated);
                            }}
                            className="w-full mt-1 bg-white/10 border border-white/20 rounded px-3 py-2 text-white text-sm"
                          />
                        </div>
                        <div>
                          <label className="text-sm text-purple-200">Trọng số (%)</label>
                          <input
                            type="number"
                            value={criterion.weight}
                            onChange={(e) => {
                              const updated = [...criteria];
                              updated[index].weight = parseInt(e.target.value);
                              setCriteria(updated);
                            }}
                            className="w-full mt-1 bg-white/10 border border-white/20 rounded px-3 py-2 text-white text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => setShowCriteriaModal(false)}
                    className="flex-1 py-2 bg-gray-500/20 hover:bg-gray-500/30 text-gray-300 rounded-lg transition-all duration-300"
                  >
                    Hủy
                  </button>
                  <button
                    onClick={() => setShowCriteriaModal(false)}
                    className="flex-1 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 rounded-lg transition-all duration-300"
                  >
                    Lưu Tiêu Chí
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
} 
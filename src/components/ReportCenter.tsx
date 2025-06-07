import { useState } from 'react';

interface Report {
  id: string;
  title: string;
  type: 'Quarterly' | 'Due Diligence' | 'LP Update' | 'Valuation' | 'Risk Assessment';
  status: 'Draft' | 'In Review' | 'Completed';
  lastModified: string;
  author: string;
  size: string;
}

interface ReportTemplate {
  name: string;
  description: string;
  type: 'Quarterly' | 'Due Diligence' | 'LP Update' | 'Valuation' | 'Risk Assessment';
  icon: string;
  sections: string[];
}

const mockReports: Report[] = [
  {
    id: '1',
    title: 'Q2 2024 Portfolio Update',
    type: 'Quarterly',
    status: 'Completed',
    lastModified: '2024-06-30',
    author: 'John Smith',
    size: '2.4 MB'
  },
  {
    id: '2',
    title: 'Acme HealthTech Due Diligence',
    type: 'Due Diligence',
    status: 'In Review',
    lastModified: '2024-07-15',
    author: 'Sarah Wilson',
    size: '8.7 MB'
  },
  {
    id: '3',
    title: 'LP Monthly Communication',
    type: 'LP Update',
    status: 'Draft',
    lastModified: '2024-07-20',
    author: 'Michael Brown',
    size: '1.2 MB'
  }
];

const reportTemplates: ReportTemplate[] = [
  {
    name: 'Quarterly Portfolio Report',
    description: 'Comprehensive quarterly portfolio performance and outlook',
    type: 'Quarterly',
    icon: '📊',
    sections: ['Executive Summary', 'Portfolio Performance', 'Key Metrics', 'Market Outlook']
  },
  {
    name: 'Due Diligence Report',
    description: 'Investment committee presentation and analysis',
    type: 'Due Diligence',
    icon: '🔍',
    sections: ['Investment Thesis', 'Market Analysis', 'Financial Projections', 'Risk Assessment']
  },
  {
    name: 'LP Communication',
    description: 'Limited partner update and communication',
    type: 'LP Update',
    icon: '💼',
    sections: ['Fund Performance', 'New Investments', 'Exits', 'Market Commentary']
  },
  {
    name: 'Valuation Report',
    description: 'Detailed company valuation analysis',
    type: 'Valuation',
    icon: '💰',
    sections: ['Valuation Methods', 'Comparable Analysis', 'DCF Model', 'Risk Factors']
  }
];

const getStatusColor = (status: Report['status']) => {
  switch (status) {
    case 'Completed': return 'bg-green-100 text-green-800 border-green-200';
    case 'In Review': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'Draft': return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getTypeColor = (type: ReportTemplate['type']) => {
  switch (type) {
    case 'Quarterly': return 'bg-blue-100 text-blue-800';
    case 'Due Diligence': return 'bg-green-100 text-green-800';
    case 'LP Update': return 'bg-purple-100 text-purple-800';
    case 'Valuation': return 'bg-orange-100 text-orange-800';
    case 'Risk Assessment': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export default function ReportCenter() {
  const [activeTab, setActiveTab] = useState<'reports' | 'templates' | 'create'>('reports');
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [newReportForm, setNewReportForm] = useState({
    title: '',
    type: 'Quarterly' as Report['type'],
    description: ''
  });

  const handleCreateReport = () => {
    // TODO: Implement report creation logic
    alert(`Creating ${newReportForm.type} report: ${newReportForm.title}`);
  };

  const handleDownloadReport = (report: Report) => {
    // TODO: Implement report download
    alert(`Downloading ${report.title}`);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { key: 'reports', label: 'My Reports', icon: '📄' },
              { key: 'templates', label: 'Templates', icon: '📋' },
              { key: 'create', label: 'Create New', icon: '➕' }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                  activeTab === tab.key
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'reports' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">Report Library</h3>
                  <p className="text-gray-600">Manage and access your generated reports</p>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Search reports..."
                    className="shadcn-input"
                  />
                  <select className="shadcn-select">
                    <option value="">All Types</option>
                    <option value="Quarterly">Quarterly</option>
                    <option value="Due Diligence">Due Diligence</option>
                    <option value="LP Update">LP Update</option>
                  </select>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">Report</th>
                      <th className="text-left py-3 px-4 font-medium">Type</th>
                      <th className="text-left py-3 px-4 font-medium">Status</th>
                      <th className="text-left py-3 px-4 font-medium">Last Modified</th>
                      <th className="text-left py-3 px-4 font-medium">Author</th>
                      <th className="text-left py-3 px-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockReports.map(report => (
                      <tr key={report.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div>
                            <div className="font-medium">{report.title}</div>
                            <div className="text-sm text-gray-600">{report.size}</div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(report.type as Report['type'])}`}>
                            {report.type}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(report.status)}`}>
                            {report.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">
                          {new Date(report.lastModified).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4 text-sm">{report.author}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <button 
                              className="text-blue-600 hover:text-blue-800 text-sm"
                              onClick={() => handleDownloadReport(report)}
                            >
                              📥 Download
                            </button>
                            <button className="text-gray-600 hover:text-gray-800 text-sm">
                              ✏️ Edit
                            </button>
                            <button className="text-red-600 hover:text-red-800 text-sm">
                              🗑️ Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'templates' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Report Templates</h3>
                <p className="text-gray-600">Choose from professionally designed report templates</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {reportTemplates.map(template => (
                  <div 
                    key={template.name}
                    className={`p-6 rounded-lg border cursor-pointer transition-colors ${
                      selectedTemplate === template.name 
                        ? 'border-blue-200 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedTemplate(selectedTemplate === template.name ? null : template.name)}
                  >
                    <div className="flex items-start gap-4">
                      <div className="text-3xl">{template.icon}</div>
                      <div className="flex-1">
                        <h4 className="font-semibold mb-2">{template.name}</h4>
                        <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(template.type as ReportTemplate['type'])}`}>
                          {template.type}
                        </span>
                      </div>
                    </div>

                    {selectedTemplate === template.name && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="text-sm">
                          <strong>Included Sections:</strong>
                          <ul className="mt-2 space-y-1">
                            {template.sections.map(section => (
                              <li key={section} className="flex items-center gap-2">
                                <span className="text-green-500">✓</span>
                                {section}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <button 
                          className="shadcn-btn-primary mt-4 w-full text-sm"
                          onClick={() => {
                            setNewReportForm(f => ({ ...f, type: template.type as ReportTemplate['type'] }));
                            setActiveTab('create');
                          }}
                        >
                          Use This Template
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'create' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Create New Report</h3>
                <p className="text-gray-600">Generate a new report using our automated templates</p>
              </div>

              <div className="max-w-2xl space-y-4">
                <label>
                  Report Title
                  <input
                    type="text"
                    className="shadcn-input mt-1"
                    value={newReportForm.title}
                    onChange={e => setNewReportForm(f => ({ ...f, title: e.target.value }))}
                    placeholder="e.g., Q3 2024 Portfolio Report"
                  />
                </label>

                <label>
                  Report Type
                  <select
                    className="shadcn-select mt-1"
                    value={newReportForm.type}
                    onChange={e => setNewReportForm(f => ({ ...f, type: e.target.value as any }))}
                  >
                    <option value="Quarterly">Quarterly Report</option>
                    <option value="Due Diligence">Due Diligence Report</option>
                    <option value="LP Update">LP Update</option>
                    <option value="Valuation">Valuation Report</option>
                    <option value="Risk Assessment">Risk Assessment</option>
                  </select>
                </label>

                <label>
                  Description
                  <textarea
                    className="shadcn-input mt-1"
                    rows={3}
                    value={newReportForm.description}
                    onChange={e => setNewReportForm(f => ({ ...f, description: e.target.value }))}
                    placeholder="Brief description of the report content and purpose"
                  />
                </label>

                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h4 className="font-medium text-blue-900 mb-2">Report Generation Features</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Automated data population from portfolio systems</li>
                    <li>• Professional formatting and design</li>
                    <li>• Interactive charts and visualizations</li>
                    <li>• PDF export with watermarks</li>
                    <li>• Version control and collaboration</li>
                  </ul>
                </div>

                <div className="flex gap-3 pt-4">
                  <button 
                    className="shadcn-btn-primary"
                    onClick={handleCreateReport}
                    disabled={!newReportForm.title}
                  >
                    🚀 Generate Report
                  </button>
                  <button 
                    className="shadcn-btn-secondary"
                    onClick={() => setNewReportForm({ title: '', type: 'Quarterly', description: '' })}
                  >
                    Clear Form
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 
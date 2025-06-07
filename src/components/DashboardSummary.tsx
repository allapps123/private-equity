import { usePortfolioStore } from '../store/kpi';
import { useAlertStore } from '../store/pipeline';
import { useDealSearchStore } from '../store/pipeline';

const KPICard = ({ title, value, trend, icon }: { title: string; value: string; trend: string; icon: string }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm border">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <p className="text-sm text-green-600">{trend}</p>
      </div>
      <div className="text-3xl">{icon}</div>
    </div>
  </div>
);

export default function DashboardSummary() {
  const { companies } = usePortfolioStore();
  const { alertCount } = useAlertStore();
  const { leads } = useDealSearchStore();

  // Calculate portfolio metrics
  const totalPortfolioValue = companies.reduce((sum, c) => sum + c.revenue, 0);
  const avgIRR = companies.reduce((sum, c) => sum + c.irr, 0) / companies.length;
  const avgMoM = companies.reduce((sum, c) => sum + c.mom, 0) / companies.length;
  const activeDeals = leads.length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Portfolio Overview</h1>
        <p className="text-gray-600">Real-time insights into your PE investments</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard 
          title="Total Portfolio Value"
          value={`$${totalPortfolioValue.toFixed(1)}M`}
          trend="+12.5% vs last quarter"
          icon="💰"
        />
        <KPICard 
          title="Average IRR"
          value={`${avgIRR.toFixed(1)}%`}
          trend="+2.3% vs target"
          icon="📈"
        />
        <KPICard 
          title="Average MoM"
          value={`${avgMoM.toFixed(1)}x`}
          trend="On track"
          icon="🎯"
        />
        <KPICard 
          title="Active Pipeline"
          value={`${activeDeals}`}
          trend={`${alertCount} alerts`}
          icon="🔍"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b">
              <span className="text-sm">New deal: Acme Health</span>
              <span className="text-xs text-gray-500">2 hours ago</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b">
              <span className="text-sm">Valuation completed: FinTechX</span>
              <span className="text-xs text-gray-500">1 day ago</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm">Portfolio update: Cloudify</span>
              <span className="text-xs text-gray-500">3 days ago</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">Risk Alerts</h3>
          {alertCount === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <div className="text-4xl mb-2">✅</div>
              <p>All portfolio companies on track</p>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex items-center gap-2 p-2 bg-red-50 rounded">
                <span className="text-red-500">⚠️</span>
                <span className="text-sm">{alertCount} companies need attention</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 
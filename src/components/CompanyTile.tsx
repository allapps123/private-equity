import { usePortfolioStore } from '../store/kpi';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function CompanyTile() {
  const { selectedCompany, companies } = usePortfolioStore();
  const company = companies.find(c => c.id === selectedCompany);
  if (!company) return null;
  return (
    <div className="p-4 bg-white rounded shadow mt-4">
      <div className="font-bold text-lg mb-2">{company.name}</div>
      <div className="text-xs text-gray-500 mb-2">{company.sector} · {company.status}</div>
      <div className="mb-2">IRR: <b>{company.irr}%</b> | MoM: <b>{company.mom}x</b></div>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={company.kpis}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
} 
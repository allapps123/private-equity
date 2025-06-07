import { usePortfolioStore } from '../store/kpi';
import { useState } from 'react';

const funds = ['Fund I', 'Fund II'];
const sectors = ['Tech', 'Healthcare', 'Finance'];
const statuses = ['Active', 'Exited'];

export default function PortfolioGrid() {
  const { companies, selectCompany } = usePortfolioStore();
  const [filters, setFilters] = useState({ fund: '', sector: '', status: '' });

  const filtered = companies.filter(c =>
    (!filters.fund || c.fund === filters.fund) &&
    (!filters.sector || c.sector === filters.sector) &&
    (!filters.status || c.status === filters.status)
  );

  return (
    <div>
      <div className="flex gap-2 mb-4">
        {Object.entries(filters).map(([key, val]) => 
          val ? (
            <div key={key} className="flex gap-1">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">{key}: {val}</span>
              <button 
                className="text-blue-600 hover:text-blue-800"
                onClick={() => setFilters(f => ({ ...f, [key as keyof typeof filters]: f[key as keyof typeof filters] === val ? '' : val }))}
              >
                ×
              </button>
            </div>
          ) : null
        )}
      </div>
      <table className="min-w-full bg-white rounded shadow">
        <thead>
          <tr className="bg-gray-100 text-xs">
            <th className="p-2">Name</th>
            <th>IRR</th>
            <th>MoM</th>
            <th>Revenue</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(c => (
            <tr key={c.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => selectCompany(c.id)}>
              <td className="p-2 font-semibold">{c.name}</td>
              <td>{c.irr}%</td>
              <td>{c.mom}x</td>
              <td>${c.revenue}M</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 
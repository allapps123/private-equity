import { useState } from 'react';
import { useDealSearchStore } from '../store/pipeline';

const sectors = ['Tech', 'Healthcare', 'Finance', 'Consumer'];
const rounds = ['Seed', 'Series A', 'Series B', 'Growth'];
const geos = ['US', 'EU', 'Asia', 'Other'];

export default function DealSearchPane() {
  const [filters, setFilters] = useState({
    sector: '',
    round: '',
    revenueMin: '',
    geo: '',
  });
  const { searchDeals, loading } = useDealSearchStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <form className="flex flex-wrap gap-4 items-end" onSubmit={e => { e.preventDefault(); searchDeals(filters); }}>
      <div>
        <label className="block text-xs">Sector</label>
        <select name="sector" className="shadcn-input" value={filters.sector} onChange={handleChange}>
          <option value="">All</option>
          {sectors.map(s => <option key={s}>{s}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-xs">Round</label>
        <select name="round" className="shadcn-input" value={filters.round} onChange={handleChange}>
          <option value="">All</option>
          {rounds.map(r => <option key={r}>{r}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-xs">Revenue Min ($M)</label>
        <input name="revenueMin" type="number" className="shadcn-input" value={filters.revenueMin} onChange={handleChange} min={0} />
      </div>
      <div>
        <label className="block text-xs">Geo</label>
        <select name="geo" className="shadcn-input" value={filters.geo} onChange={handleChange}>
          <option value="">All</option>
          {geos.map(g => <option key={g}>{g}</option>)}
        </select>
      </div>
      <button type="submit" className="shadcn-btn-primary" disabled={loading}>
        {loading ? 'Searching...' : 'Search'}
      </button>
    </form>
  );
} 
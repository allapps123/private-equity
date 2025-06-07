import { Lead } from '../kinds';

export default function LeadCard({ lead }: { lead: any }) {
  const handleSave = () => {
    // TODO: Add to pipeline
    alert('Added to pipeline (TODO)');
  };

  return (
    <div className="bg-white p-4 border rounded shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-bold">{lead.name}</h3>
        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">{lead.round}</span>
      </div>
      <div className="text-sm text-gray-600 mb-2">
        {lead.sector} • {lead.geo} • ${lead.revenue}M revenue
      </div>
      <div className="text-xs text-gray-500 mb-3">
        Growth: {lead.growthRate}% • Founded: {lead.founded}
      </div>
      <button 
        className="shadcn-btn-primary text-xs w-full"
        onClick={handleSave}
      >
        💾 Save to Pipeline
      </button>
    </div>
  );
} 
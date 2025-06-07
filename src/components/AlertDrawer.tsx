import { useAlertStore } from '../store/pipeline';

export default function AlertDrawer() {
  const { alerts } = useAlertStore();
  return (
    <div className="bg-white rounded shadow p-4">
      <div className="font-bold mb-2">Alerts</div>
      {alerts.length === 0 ? (
        <div className="text-gray-400 text-sm">No alerts.</div>
      ) : (
        <ul className="space-y-2">
          {alerts.map((a, i) => (
            <li key={i} className="border-l-4 border-red-500 pl-2 text-sm">
              {a.message}
              <span className="ml-2 text-xs text-gray-400">({a.time})</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
} 
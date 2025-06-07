import { useState } from 'react';
import { WaterfallChart } from './WaterfallChart';
import jsPDF from 'jspdf';
import { postValuation } from '../services';

export default function ValuationForm() {
  const [form, setForm] = useState({
    revenue: '',
    ebitda: '',
    exitMultiple: '',
    wacc: '',
    growthRate: '',
  });
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);

  const validate = () => {
    for (const k in form) if (!form[k as keyof typeof form]) return false;
    return true;
  };

  const compute = async () => {
    if (!validate()) { setError('All fields required'); return; }
    setError('');
    setLoading(true);
    try {
      const res = await postValuation({
        revenue: Number(form.revenue),
        ebitda: Number(form.ebitda),
        exitMultiple: Number(form.exitMultiple),
        wacc: Number(form.wacc),
        growthRate: Number(form.growthRate),
      });
      setResult(res);
    } catch (e) {
      setError('Calculation failed');
    } finally {
      setLoading(false);
    }
  };

  const exportPDF = () => {
    setPdfLoading(true);
    setTimeout(() => {
      const doc = new jsPDF();
      doc.text('Valuation Report', 10, 10);
      doc.text(`EV: $${result.EV}M`, 10, 20);
      doc.text(`Equity: $${result.Equity}M`, 10, 30);
      doc.text(`IRR: ${result.IRR}%`, 10, 40);
      doc.save('valuation.pdf');
      setPdfLoading(false);
    }, 1000);
  };

  return (
    <form className="flex flex-col gap-4 max-w-md" onSubmit={e => { e.preventDefault(); compute(); }}>
      <div className="grid grid-cols-2 gap-2">
        <label>Revenue ($M)<input name="revenue" type="number" className="shadcn-input" value={form.revenue} onChange={e => setForm(f => ({ ...f, revenue: e.target.value }))} /></label>
        <label>EBITDA ($M)<input name="ebitda" type="number" className="shadcn-input" value={form.ebitda} onChange={e => setForm(f => ({ ...f, ebitda: e.target.value }))} /></label>
        <label>Exit Multiple<input name="exitMultiple" type="number" className="shadcn-input" value={form.exitMultiple} onChange={e => setForm(f => ({ ...f, exitMultiple: e.target.value }))} /></label>
        <label>WACC (%)<input name="wacc" type="number" className="shadcn-input" value={form.wacc} onChange={e => setForm(f => ({ ...f, wacc: e.target.value }))} /></label>
        <label>Growth Rate (%)<input name="growthRate" type="number" className="shadcn-input" value={form.growthRate} onChange={e => setForm(f => ({ ...f, growthRate: e.target.value }))} /></label>
      </div>
      {error && <div className="text-red-500 text-xs">{error}</div>}
      <button type="submit" className="shadcn-btn-primary" disabled={loading}>{loading ? 'Computing...' : 'Compute'}</button>
      {result && (
        <div className="bg-gray-50 p-4 rounded mt-2">
          <div>EV: <b>${result.EV}M</b></div>
          <div>Equity: <b>${result.Equity}M</b></div>
          <div>IRR: <b>{result.IRR}%</b></div>
          <div className="mt-2">
            <WaterfallChart />
          </div>
          <button type="button" className="shadcn-btn-secondary mt-2" onClick={exportPDF} disabled={pdfLoading}>
            {pdfLoading ? 'Exporting...' : 'Export PDF'}
          </button>
        </div>
      )}
    </form>
  );
} 
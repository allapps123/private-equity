import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockData = [
  { name: 'Initial', value: 100 },
  { name: 'Revenue Growth', value: 120 },
  { name: 'Cost Reduction', value: 130 },
  { name: 'Exit Value', value: 150 },
];

interface WaterfallChartProps {
  data?: typeof mockData;
}

export function WaterfallChart({ data = mockData }: WaterfallChartProps) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" fill="#3b82f6" />
      </BarChart>
    </ResponsiveContainer>
  );
} 
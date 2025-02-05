'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

type MaterialPriceChartProps = {
  data: {
    date: string;
    price: number;
  }[];
};

export function MaterialPriceChart({ data }: MaterialPriceChartProps) {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="date"
            tick={{ fontSize: 12 }}
          />
          <YAxis 
            tick={{ fontSize: 12 }}
            width={80}
            tickFormatter={(value) => `¥${value.toLocaleString()}`}
          />
          <Tooltip 
            formatter={(value: number) => [`¥${value.toLocaleString()}`, '価格']}
          />
          <Line 
            type="monotone" 
            dataKey="price" 
            stroke="#4f46e5"
            strokeWidth={2}
            dot={{ strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
} 
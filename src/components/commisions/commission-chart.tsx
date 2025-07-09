"use client"

import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { month: "Jan", commission: 45000, deals: 12 },
  { month: "Feb", commission: 52000, deals: 15 },
  { month: "Mar", commission: 48000, deals: 13 },
  { month: "Apr", commission: 61000, deals: 18 },
  { month: "May", commission: 55000, deals: 16 },
  { month: "Jun", commission: 67000, deals: 20 },
  { month: "Jul", commission: 71000, deals: 22 },
  { month: "Aug", commission: 69000, deals: 21 },
  { month: "Sep", commission: 78000, deals: 24 },
  { month: "Oct", commission: 82000, deals: 26 },
  { month: "Nov", commission: 89000, deals: 28 },
  { month: "Dec", commission: 127450, deals: 35 },
]

export function CommissionChart() {
  return (
    <div className="h-[300px] p-2">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorCommission" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <XAxis 
            dataKey="month" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 12, fill: '#6b7280' }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: '#6b7280' }}
            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
          />
          <Tooltip
            formatter={(value: number) => [`$${value.toLocaleString()}`, "Commission"]}
            labelStyle={{ color: "#374151", fontWeight: "bold" }}
            contentStyle={{
              backgroundColor: "white",
              border: "1px solid #bfdbfe",
              borderRadius: "8px",
              boxShadow: "0 4px 6px -1px rgba(59, 130, 246, 0.1), 0 2px 4px -1px rgba(59, 130, 246, 0.06)"
            }}
            cursor={{ stroke: '#3b82f6', strokeDasharray: '5 5' }}
          />
          <Area
            type="monotone"
            dataKey="commission"
            stroke="#3b82f6"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorCommission)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

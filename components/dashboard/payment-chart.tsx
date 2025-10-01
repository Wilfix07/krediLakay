'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface PaymentChartProps {
  data: Array<{
    month: string
    payments: number
    target: number
  }>
}

export function PaymentChart({ data }: PaymentChartProps) {
  return (
    <div className="banking-card h-full">
      <div className="banking-card-header">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Évolution des Paiements</h3>
            <p className="text-sm text-gray-600 mt-1">Analyse mensuelle des paiements reçus</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
            <span className="text-sm font-medium text-gray-700">Paiements</span>
            <div className="w-3 h-3 bg-gray-400 rounded-full ml-2"></div>
            <span className="text-sm font-medium text-gray-500">Objectif</span>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
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
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
                  fontSize: '14px'
                }}
                formatter={(value, name) => [
                  new Intl.NumberFormat('fr-HT', {
                    style: 'currency',
                    currency: 'HTG',
                  }).format(value as number),
                  name === 'payments' ? 'Paiements reçus' : 'Objectif mensuel'
                ]}
                labelStyle={{ color: '#374151' }}
              />
              <Line
                type="monotone"
                dataKey="payments"
                stroke="url(#paymentsGradient)"
                strokeWidth={3}
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8, stroke: '#3b82f6', strokeWidth: 2 }}
              />
              <Line
                type="monotone"
                dataKey="target"
                stroke="#9ca3af"
                strokeWidth={2}
                strokeDasharray="8 8"
                dot={{ fill: '#9ca3af', strokeWidth: 2, r: 4 }}
              />
              <defs>
                <linearGradient id="paymentsGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                </linearGradient>
              </defs>
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

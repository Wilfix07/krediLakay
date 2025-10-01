'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatCurrency } from '@/lib/utils'
import { TrendingUp, TrendingDown, Users, CreditCard, DollarSign, AlertTriangle } from 'lucide-react'

interface StatsCardsProps {
  data: {
    totalLoans: number
    totalAmount: number
    totalClients: number
    activeLoans: number
    totalPayments: number
    overdue: number
  }
}

export function StatsCards({ data }: StatsCardsProps) {
  const cards = [
    {
      title: 'Total des Prêts',
      value: data.totalLoans.toString(),
      change: '+12%',
      isPositive: true,
      icon: CreditCard,
      gradient: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Montant Total',
      value: formatCurrency(data.totalAmount),
      change: '+8.2%',
      isPositive: true,
      icon: DollarSign,
      gradient: 'from-emerald-500 to-emerald-600',
      bgColor: 'bg-emerald-50'
    },
    {
      title: 'Clients Actifs',
      value: data.totalClients.toString(),
      change: '+5.7%',
      isPositive: true,
      icon: Users,
      gradient: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Prêts en Retard',
      value: data.overdue.toString(),
      change: '-2.1%',
      isPositive: false,
      icon: AlertTriangle,
      gradient: 'from-amber-500 to-orange-500',
      bgColor: 'bg-amber-50'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => {
        const Icon = card.icon
        const TrendIcon = card.isPositive ? TrendingUp : TrendingDown

        return (
          <div key={index} className="banking-stat-card group">
            <div className="flex items-center justify-between mb-4">
              <div className={`banking-stat-icon ${card.bgColor}`}>
                <div className={`w-8 h-8 bg-gradient-to-br ${card.gradient} rounded-lg flex items-center justify-center`}>
                  <Icon className="h-4 w-4 text-white" />
                </div>
              </div>
              <div className={`banking-stat-change ${card.isPositive ? 'text-emerald-600' : 'text-red-600'}`}>
                <TrendIcon className="h-4 w-4 mr-1" />
                <span className="text-sm font-medium">{card.change}</span>
              </div>
            </div>

            <div className="space-y-1">
              <div className="banking-stat-value">{card.value}</div>
              <div className="banking-stat-label">{card.title}</div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center text-xs text-gray-500">
                <span>Dernière mise à jour: aujourd'hui</span>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

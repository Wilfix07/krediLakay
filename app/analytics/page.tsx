'use client'

import { useState } from 'react'
import { Header } from '@/components/layout/header'
import { Sidebar } from '@/components/layout/sidebar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CommissionCalculator } from '@/components/commission/commission-calculator'
import { formatCurrency } from '@/lib/utils'
import { calculateAgentCommissions } from '@/lib/commission'
import { TrendingUp, DollarSign, Percent, Users } from 'lucide-react'

// Données de démonstration
const mockAgentData = {
  loans: [
    { amount: 50000, disbursedAt: '2024-01-15', commissionRate: 3.0, commissionAmount: 1500 },
    { amount: 75000, disbursedAt: '2024-01-10', commissionRate: 2.5, commissionAmount: 1875 },
    { amount: 100000, disbursedAt: '2024-01-05', commissionRate: 2.0, commissionAmount: 2000 },
    { amount: 30000, disbursedAt: '2024-01-20', commissionRate: 3.0, commissionAmount: 900 }
  ]
}

const mockUser = {
  name: 'Agent Principal',
  role: 'manager'
}

export default function AnalyticsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Calcul des commissions du mois en cours
  const currentMonth = new Date()
  const startOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1)
  const endOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0)

  const monthlyCommissions = calculateAgentCommissions(
    mockAgentData.loans,
    startOfMonth,
    endOfMonth
  )

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          user={mockUser} 
          onMenuClick={() => setSidebarOpen(true)} 
        />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* En-tête */}
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900">Analytique des Commissions</h1>
              <p className="text-gray-600 mt-1">
                Calculez les commissions et analysez les performances
              </p>
            </div>

            {/* Statistiques des commissions ce mois */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Prêts ce Mois
                  </CardTitle>
                  <Users className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{monthlyCommissions.totalLoans}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    +15% vs mois dernier
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Montant Total
                  </CardTitle>
                  <DollarSign className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{formatCurrency(monthlyCommissions.totalLoanAmount)}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    +8.2% vs mois dernier
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Commissions Totales
                  </CardTitle>
                  <TrendingUp className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{formatCurrency(monthlyCommissions.totalCommission)}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    +12.1% vs mois dernier
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Taux Moyen
                  </CardTitle>
                  <Percent className="h-4 w-4 text-orange-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{monthlyCommissions.averageCommissionRate}%</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Stable vs mois dernier
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Calculateur de commission */}
            <CommissionCalculator />

            {/* Performance par agent */}
            <Card>
              <CardHeader>
                <CardTitle>Performance des Agents ce Mois</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: 'Jean Claude', loans: 15, amount: 750000, commission: 18750, rate: 2.5 },
                    { name: 'Marie Claire', loans: 12, amount: 600000, commission: 15000, rate: 2.5 },
                    { name: 'Pierre Louis', loans: 8, amount: 400000, commission: 10000, rate: 2.5 }
                  ].map((agent, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50"
                    >
                      <div className="flex-1">
                        <h4 className="font-medium">{agent.name}</h4>
                        <p className="text-sm text-gray-500">
                          {agent.loans} prêts • Taux moyen: {agent.rate}%
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{formatCurrency(agent.commission)}</p>
                        <p className="text-sm text-gray-500">
                          sur {formatCurrency(agent.amount)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}

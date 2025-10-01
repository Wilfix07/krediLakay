'use client'

import { Header } from '@/components/layout/header'
import { Sidebar } from '@/components/layout/sidebar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Target, TrendingUp, AlertTriangle } from 'lucide-react'

const mockUser = {
  name: 'Agent Principal',
  role: 'manager'
}

export default function ExpenseBudgetsPage() {
  const budgets = [
    {
      id: '1',
      category: 'Transport',
      budgetAmount: 50000,
      spentAmount: 42000,
      period: 'Janvier 2024',
      status: 'on_track'
    },
    {
      id: '2',
      category: 'Marketing',
      budgetAmount: 30000,
      spentAmount: 28000,
      period: 'Janvier 2024',
      status: 'on_track'
    },
    {
      id: '3',
      category: 'Fournitures Bureau',
      budgetAmount: 20000,
      spentAmount: 25000,
      period: 'Janvier 2024',
      status: 'over_budget'
    },
    {
      id: '4',
      category: 'Formation',
      budgetAmount: 15000,
      spentAmount: 8000,
      period: 'Janvier 2024',
      status: 'under_budget'
    }
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'over_budget':
        return <Badge className="bg-red-100 text-red-800">Dépassement</Badge>
      case 'on_track':
        return <Badge className="bg-green-100 text-green-800">En cours</Badge>
      case 'under_budget':
        return <Badge className="bg-blue-100 text-blue-800">Sous budget</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getProgressColor = (status: string) => {
    switch (status) {
      case 'over_budget':
        return 'bg-red-500'
      case 'on_track':
        return 'bg-green-500'
      case 'under_budget':
        return 'bg-blue-500'
      default:
        return 'bg-gray-500'
    }
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={mockUser} />
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Budgets et Contrôle des Dépenses</h1>
              <p className="text-gray-600">
                Suivi et contrôle des budgets par catégorie et période
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="banking-stat-card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="banking-stat-label">Budget Total</p>
                    <p className="banking-stat-value">HTG 115,000</p>
                  </div>
                  <Target className="h-8 w-8 text-blue-500" />
                </div>
              </Card>

              <Card className="banking-stat-card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="banking-stat-label">Dépenses Réelles</p>
                    <p className="banking-stat-value">HTG 103,000</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-500" />
                </div>
              </Card>

              <Card className="banking-stat-card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="banking-stat-label">Économie</p>
                    <p className="banking-stat-value">HTG 12,000</p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-orange-500" />
                </div>
              </Card>
            </div>

            <Card className="banking-card">
              <CardHeader>
                <CardTitle>Suivi des Budgets par Catégorie</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {budgets.map((budget) => {
                    const percentage = (budget.spentAmount / budget.budgetAmount) * 100
                    const isOverBudget = percentage > 100

                    return (
                      <div key={budget.id} className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h4 className="font-semibold text-gray-900">{budget.category}</h4>
                            <p className="text-sm text-gray-600">{budget.period}</p>
                          </div>
                          {getStatusBadge(budget.status)}
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Dépenses: HTG {budget.spentAmount.toLocaleString()}</span>
                            <span>Budget: HTG {budget.budgetAmount.toLocaleString()}</span>
                          </div>

                          <div className="relative">
                            <Progress
                              value={Math.min(percentage, 100)}
                              className="h-3"
                            />
                            {isOverBudget && (
                              <div className="absolute top-0 left-0 w-full h-3 bg-red-200 rounded-full opacity-50"></div>
                            )}
                          </div>

                          <div className="flex justify-between text-sm text-gray-600">
                            <span>{percentage.toFixed(1)}% utilisé</span>
                            <span>
                              {isOverBudget
                                ? `Dépassement: HTG ${(budget.spentAmount - budget.budgetAmount).toLocaleString()}`
                                : `Restant: HTG ${(budget.budgetAmount - budget.spentAmount).toLocaleString()}`
                              }
                            </span>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}

'use client'

import { Header } from '@/components/layout/header'
import { Sidebar } from '@/components/layout/sidebar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calculator, Percent, TrendingUp } from 'lucide-react'

const mockUser = {
  name: 'Agent Principal',
  role: 'manager'
}

export default function CommissionCalculationsPage() {
  const calculations = [
    {
      id: '1',
      agentName: 'Jean Claude',
      period: 'Janvier 2024',
      baseAmount: 150000,
      commissionRate: 5,
      calculatedCommission: 7500,
      status: 'calculated',
      approvedBy: null
    },
    {
      id: '2',
      agentName: 'Marie Claire',
      period: 'Janvier 2024',
      baseAmount: 125000,
      commissionRate: 4.5,
      calculatedCommission: 5625,
      status: 'approved',
      approvedBy: 'Admin'
    },
    {
      id: '3',
      agentName: 'Pierre Louis',
      period: 'Janvier 2024',
      baseAmount: 180000,
      commissionRate: 6,
      calculatedCommission: 10800,
      status: 'pending',
      approvedBy: null
    }
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'calculated':
        return <Badge className="bg-blue-100 text-blue-800">Calculé</Badge>
      case 'approved':
        return <Badge className="bg-green-100 text-green-800">Approuvé</Badge>
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">En attente</Badge>
      case 'paid':
        return <Badge className="bg-purple-100 text-purple-800">Payé</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Calculs de Commissions</h1>
              <p className="text-gray-600">
                Calcul automatique des commissions des agents basé sur les performances
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="banking-stat-card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="banking-stat-label">Commissions du Mois</p>
                    <p className="banking-stat-value">HTG 23,925</p>
                  </div>
                  <Calculator className="h-8 w-8 text-blue-500" />
                </div>
              </Card>

              <Card className="banking-stat-card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="banking-stat-label">Agents Actifs</p>
                    <p className="banking-stat-value">5</p>
                  </div>
                  <Percent className="h-8 w-8 text-green-500" />
                </div>
              </Card>

              <Card className="banking-stat-card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="banking-stat-label">Taux Moyen</p>
                    <p className="banking-stat-value">5.2%</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-purple-500" />
                </div>
              </Card>
            </div>

            <Card className="banking-card">
              <CardHeader>
                <CardTitle>Commissions Calculées - Janvier 2024</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {calculations.map((calc) => (
                    <div key={calc.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="font-semibold text-gray-900">{calc.agentName}</h4>
                          {getStatusBadge(calc.status)}
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                          <div>
                            <span className="font-medium">Base:</span> HTG {calc.baseAmount.toLocaleString()}
                          </div>
                          <div>
                            <span className="font-medium">Taux:</span> {calc.commissionRate}%
                          </div>
                          <div>
                            <span className="font-medium">Commission:</span> HTG {calc.calculatedCommission.toLocaleString()}
                          </div>
                          <div>
                            <span className="font-medium">Statut:</span> {calc.status}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {calc.status === 'calculated' && (
                          <Button variant="outline" size="sm">
                            Approuver
                          </Button>
                        )}
                        <Button variant="outline" size="sm">
                          Détails
                        </Button>
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

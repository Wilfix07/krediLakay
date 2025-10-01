'use client'

import { Header } from '@/components/layout/header'
import { Sidebar } from '@/components/layout/sidebar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Percent, TrendingUp, Calculator, Users } from 'lucide-react'

const mockUser = {
  name: 'Agent Principal',
  role: 'manager'
}

export default function CommissionsPage() {
  const commissionData = [
    {
      agent: 'Jean Claude',
      loansThisMonth: 45,
      collections: 42000,
      target: 50000,
      commission: 2100,
      status: 'on_track'
    },
    {
      agent: 'Marie Claire',
      loansThisMonth: 38,
      collections: 38000,
      target: 45000,
      commission: 1900,
      status: 'on_track'
    },
    {
      agent: 'Pierre Louis',
      loansThisMonth: 52,
      collections: 51000,
      target: 55000,
      commission: 2550,
      status: 'exceeding'
    }
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'exceeding':
        return <Badge className="bg-green-100 text-green-800">Dépassement</Badge>
      case 'on_track':
        return <Badge className="bg-blue-100 text-blue-800">En cours</Badge>
      case 'behind':
        return <Badge className="bg-red-100 text-red-800">En retard</Badge>
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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestion des Commissions</h1>
              <p className="text-gray-600">
                Calcul automatique et suivi des commissions des agents
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="banking-stat-card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="banking-stat-label">Commissions du Mois</p>
                    <p className="banking-stat-value">HTG 8,550</p>
                  </div>
                  <Percent className="h-8 w-8 text-blue-500" />
                </div>
              </Card>

              <Card className="banking-stat-card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="banking-stat-label">Agents Actifs</p>
                    <p className="banking-stat-value">5</p>
                  </div>
                  <Users className="h-8 w-8 text-green-500" />
                </div>
              </Card>

              <Card className="banking-stat-card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="banking-stat-label">Taux Moyen</p>
                    <p className="banking-stat-value">4.2%</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-purple-500" />
                </div>
              </Card>

              <Card className="banking-stat-card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="banking-stat-label">Objectif Global</p>
                    <p className="banking-stat-value">87%</p>
                  </div>
                  <Calculator className="h-8 w-8 text-orange-500" />
                </div>
              </Card>
            </div>

            <Card className="banking-card">
              <CardHeader>
                <CardTitle>Performance des Agents - Ce Mois</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {commissionData.map((agent, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-gray-900">{agent.agent}</h4>
                          <p className="text-sm text-gray-600">
                            {agent.loansThisMonth} prêts • {new Intl.NumberFormat('fr-HT', {
                              style: 'currency',
                              currency: 'HTG'
                            }).format(agent.collections)} collectés
                          </p>
                        </div>
                        {getStatusBadge(agent.status)}
                      </div>

                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Progression</p>
                          <div className="flex items-center">
                            <div className="flex-1 bg-gray-200 rounded-full h-2 mr-2">
                              <div
                                className="bg-blue-500 h-2 rounded-full"
                                style={{ width: `${(agent.collections / agent.target) * 100}%` }}
                              ></div>
                            </div>
                            <span className="text-xs font-medium">
                              {Math.round((agent.collections / agent.target) * 100)}%
                            </span>
                          </div>
                        </div>

                        <div>
                          <p className="text-gray-600">Commission</p>
                          <p className="font-semibold text-green-600">
                            {new Intl.NumberFormat('fr-HT', {
                              style: 'currency',
                              currency: 'HTG'
                            }).format(agent.commission)}
                          </p>
                        </div>

                        <div>
                          <p className="text-gray-600">Statut</p>
                          <p className="text-sm">
                            {agent.status === 'exceeding' ? 'Dépassement objectif' :
                             agent.status === 'on_track' ? 'En bonne voie' : 'À améliorer'}
                          </p>
                        </div>
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

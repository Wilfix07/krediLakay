'use client'

import { Header } from '@/components/layout/header'
import { Sidebar } from '@/components/layout/sidebar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Users, TrendingUp, Target, Award } from 'lucide-react'

const mockUser = {
  name: 'Analyste',
  role: 'manager'
}

export default function AgentAnalyticsPage() {
  const agents = [
    {
      name: 'Jean Claude',
      loans: 45,
      collections: 42000,
      target: 50000,
      performance: 84,
      rank: 1
    },
    {
      name: 'Marie Claire',
      loans: 38,
      collections: 38000,
      target: 45000,
      performance: 84,
      rank: 2
    },
    {
      name: 'Pierre Louis',
      loans: 52,
      collections: 51000,
      target: 55000,
      performance: 93,
      rank: 3
    }
  ]

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={mockUser} />
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Comparaison des Agents</h1>
              <p className="text-gray-600">
                Analyse comparative des performances des agents
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="banking-stat-card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="banking-stat-label">Meilleur Performeur</p>
                    <p className="banking-stat-value">Pierre Louis</p>
                  </div>
                  <Award className="h-8 w-8 text-yellow-500" />
                </div>
              </Card>

              <Card className="banking-stat-card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="banking-stat-label">Performance Moyenne</p>
                    <p className="banking-stat-value">87%</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-500" />
                </div>
              </Card>

              <Card className="banking-stat-card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="banking-stat-label">Agents Actifs</p>
                    <p className="banking-stat-value">5</p>
                  </div>
                  <Users className="h-8 w-8 text-blue-500" />
                </div>
              </Card>

              <Card className="banking-stat-card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="banking-stat-label">Objectif Global</p>
                    <p className="banking-stat-value">92%</p>
                  </div>
                  <Target className="h-8 w-8 text-purple-500" />
                </div>
              </Card>
            </div>

            <Card className="banking-card">
              <CardHeader>
                <CardTitle>Classement des Agents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {agents.map((agent, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold text-sm">#{agent.rank}</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{agent.name}</h4>
                          <p className="text-sm text-gray-600">
                            {agent.loans} prêts • {new Intl.NumberFormat('fr-HT', {
                              style: 'currency',
                              currency: 'HTG'
                            }).format(agent.collections)} collectés
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="text-sm text-gray-600">Performance</p>
                          <p className="font-semibold">{agent.performance}%</p>
                        </div>
                        <Badge variant={agent.performance >= 90 ? 'default' : agent.performance >= 80 ? 'secondary' : 'destructive'}>
                          {agent.performance >= 90 ? 'Excellent' : agent.performance >= 80 ? 'Bon' : 'À améliorer'}
                        </Badge>
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

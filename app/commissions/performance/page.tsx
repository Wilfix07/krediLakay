'use client'

import { Header } from '@/components/layout/header'
import { Sidebar } from '@/components/layout/sidebar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'
import { TrendingUp, Award, Target, Users } from 'lucide-react'

const mockUser = {
  name: 'Agent Principal',
  role: 'manager'
}

export default function CommissionPerformancePage() {
  const performanceData = [
    { month: 'Sep', collections: 38000, target: 45000 },
    { month: 'Oct', collections: 42000, target: 45000 },
    { month: 'Nov', collections: 48000, target: 50000 },
    { month: 'Dec', collections: 52000, target: 50000 },
    { month: 'Jan', collections: 51000, target: 55000 },
    { month: 'Feb', collections: 58000, target: 55000 }
  ]

  const agentPerformance = [
    { agent: 'Jean Claude', collections: 42000, target: 50000, achievement: 84 },
    { agent: 'Marie Claire', collections: 38000, target: 45000, achievement: 84 },
    { agent: 'Pierre Louis', collections: 51000, target: 55000, achievement: 93 },
    { agent: 'Sophie Martin', collections: 39000, target: 42000, achievement: 93 },
    { agent: 'Luc Dubois', collections: 33000, target: 38000, achievement: 87 }
  ]

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={mockUser} />
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Performance des Agents</h1>
              <p className="text-gray-600">
                Analyse détaillée des performances et commissions des agents
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="banking-stat-card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="banking-stat-label">Performance Globale</p>
                    <p className="banking-stat-value">87.3%</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-500" />
                </div>
              </Card>

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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Performance Trends */}
              <Card className="banking-card">
                <CardHeader>
                  <CardTitle>Évolution des Performances</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip
                        formatter={(value, name) => [
                          new Intl.NumberFormat('fr-HT', {
                            style: 'currency',
                            currency: 'HTG'
                          }).format(value as number),
                          name === 'collections' ? 'Collections' : 'Objectif'
                        ]}
                      />
                      <Line
                        type="monotone"
                        dataKey="collections"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        name="Collections"
                      />
                      <Line
                        type="monotone"
                        dataKey="target"
                        stroke="#e5e7eb"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        name="Objectif"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Agent Comparison */}
              <Card className="banking-card">
                <CardHeader>
                  <CardTitle>Comparaison Agents</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={agentPerformance}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="agent" />
                      <YAxis />
                      <Tooltip
                        formatter={(value, name) => [
                          new Intl.NumberFormat('fr-HT', {
                            style: 'currency',
                            currency: 'HTG'
                          }).format(value as number),
                          name === 'collections' ? 'Collections' : 'Objectif'
                        ]}
                      />
                      <Bar dataKey="collections" fill="#3b82f6" name="Collections Réalisées" />
                      <Bar dataKey="target" fill="#e5e7eb" name="Objectif" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Agent Performance Table */}
            <Card className="banking-card mt-6">
              <CardHeader>
                <CardTitle>Détail Performance par Agent</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {agentPerformance.map((agent, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold text-sm">#{index + 1}</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{agent.agent}</h4>
                          <p className="text-sm text-gray-600">
                            {new Intl.NumberFormat('fr-HT', {
                              style: 'currency',
                              currency: 'HTG'
                            }).format(agent.collections)} / {new Intl.NumberFormat('fr-HT', {
                              style: 'currency',
                              currency: 'HTG'
                            }).format(agent.target)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="text-sm text-gray-600">Taux de Réalisation</p>
                          <p className="font-semibold">{agent.achievement}%</p>
                        </div>
                        <Badge variant={agent.achievement >= 90 ? 'default' : agent.achievement >= 80 ? 'secondary' : 'destructive'}>
                          {agent.achievement >= 90 ? 'Excellent' : agent.achievement >= 80 ? 'Bon' : 'À améliorer'}
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

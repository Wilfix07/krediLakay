'use client'

import { Header } from '@/components/layout/header'
import { Sidebar } from '@/components/layout/sidebar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { BarChart3, Download, TrendingUp } from 'lucide-react'

const mockUser = {
  name: 'Agent Principal',
  role: 'manager'
}

export default function ExpenseReportsPage() {
  const expenseReports = [
    {
      id: '1',
      title: 'Rapport Mensuel - Janvier 2024',
      period: 'Janvier 2024',
      totalExpenses: 45000,
      categories: [
        { name: 'Transport', amount: 15000, percentage: 33 },
        { name: 'Marketing', amount: 12000, percentage: 27 },
        { name: 'Fournitures', amount: 8000, percentage: 18 },
        { name: 'Communication', amount: 6000, percentage: 13 },
        { name: 'Autres', amount: 4000, percentage: 9 }
      ],
      generatedAt: '2024-01-31T10:00:00Z',
      status: 'completed'
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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Rapports de Dépenses</h1>
              <p className="text-gray-600">
                Analyse et rapports détaillés des dépenses par catégorie et période
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="banking-stat-card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="banking-stat-label">Dépenses ce Mois</p>
                    <p className="banking-stat-value">HTG 45,000</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-blue-500" />
                </div>
              </Card>

              <Card className="banking-stat-card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="banking-stat-label">Catégories</p>
                    <p className="banking-stat-value">5</p>
                  </div>
                  <BarChart3 className="h-8 w-8 text-green-500" />
                </div>
              </Card>

              <Card className="banking-stat-card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="banking-stat-label">Rapports Générés</p>
                    <p className="banking-stat-value">12</p>
                  </div>
                  <Download className="h-8 w-8 text-purple-500" />
                </div>
              </Card>
            </div>

            <Card className="banking-card">
              <CardHeader>
                <CardTitle>Rapports de Dépenses Générés</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {expenseReports.map((report) => (
                    <div key={report.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="font-semibold text-gray-900">{report.title}</h4>
                          <Badge variant="outline">{report.period}</Badge>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                          <div>
                            <span className="font-medium">Total:</span> HTG {report.totalExpenses.toLocaleString()}
                          </div>
                          <div>
                            <span className="font-medium">Catégories:</span> {report.categories.length}
                          </div>
                          <div>
                            <span className="font-medium">Généré:</span> {new Date(report.generatedAt).toLocaleDateString('fr-HT')}
                          </div>
                          <div>
                            <Badge className="bg-green-100 text-green-800">Terminé</Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          Voir Détails
                        </Button>
                        <Button size="sm">
                          <Download className="h-4 w-4 mr-1" />
                          Télécharger
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

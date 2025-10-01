'use client'

import { Header } from '@/components/layout/header'
import { Sidebar } from '@/components/layout/sidebar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart3, TrendingUp, Users, DollarSign } from 'lucide-react'

const mockUser = {
  name: 'Analyste',
  role: 'manager'
}

export default function PortfolioAnalyticsPage() {
  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={mockUser} />
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Analyse du Portefeuille</h1>
              <p className="text-gray-600">
                Analyse détaillée de la performance du portefeuille de prêts
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="banking-stat-card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="banking-stat-label">Valeur Portefeuille</p>
                    <p className="banking-stat-value">$2.4M</p>
                  </div>
                  <BarChart3 className="h-8 w-8 text-blue-500" />
                </div>
              </Card>

              <Card className="banking-stat-card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="banking-stat-label">Croissance Mensuelle</p>
                    <p className="banking-stat-value">+12.5%</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-500" />
                </div>
              </Card>

              <Card className="banking-stat-card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="banking-stat-label">Clients Actifs</p>
                    <p className="banking-stat-value">1,247</p>
                  </div>
                  <Users className="h-8 w-8 text-purple-500" />
                </div>
              </Card>

              <Card className="banking-stat-card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="banking-stat-label">Revenus Mensuels</p>
                    <p className="banking-stat-value">$45.2K</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-emerald-500" />
                </div>
              </Card>
            </div>

            <Card className="banking-card">
              <CardHeader>
                <CardTitle>Analyse du Portefeuille</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <BarChart3 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Analyses Avancées du Portefeuille
                  </h3>
                  <p className="text-gray-600">
                    Tableaux de bord interactifs pour l'analyse de performance du portefeuille.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}

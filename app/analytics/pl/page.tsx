'use client'

import { Header } from '@/components/layout/header'
import { Sidebar } from '@/components/layout/sidebar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingUp, DollarSign, Calculator } from 'lucide-react'

const mockUser = {
  name: 'Analyste',
  role: 'manager'
}

export default function PLPage() {
  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={mockUser} />
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Compte de Résultat (P&L)</h1>
              <p className="text-gray-600">
                Analyse détaillée des revenus, dépenses et profitabilité
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="banking-stat-card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="banking-stat-label">Revenus du Mois</p>
                    <p className="banking-stat-value">+HTG 85,2K</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-500" />
                </div>
              </Card>

              <Card className="banking-stat-card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="banking-stat-label">Dépenses du Mois</p>
                    <p className="banking-stat-value">-HTG 42,8K</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-red-500" />
                </div>
              </Card>

              <Card className="banking-stat-card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="banking-stat-label">Bénéfice Net</p>
                    <p className="banking-stat-value">+HTG 42,4K</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-blue-500" />
                </div>
              </Card>
            </div>

            <Card className="banking-card">
              <CardHeader>
                <CardTitle>Compte de Résultat</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Calculator className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Analyse P&L
                  </h3>
                  <p className="text-gray-600">
                    États financiers détaillés avec calculs automatiques de rentabilité.
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

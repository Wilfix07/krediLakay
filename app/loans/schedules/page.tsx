'use client'

import { Header } from '@/components/layout/header'
import { Sidebar } from '@/components/layout/sidebar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar, Clock, DollarSign } from 'lucide-react'

const mockUser = {
  name: 'Agent Principal',
  role: 'manager'
}

export default function LoanSchedulesPage() {
  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={mockUser} />
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Échéanciers de Prêts</h1>
              <p className="text-gray-600">
                Gestion et suivi des calendriers de remboursement
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="banking-stat-card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="banking-stat-label">Paiements du Jour</p>
                    <p className="banking-stat-value">47</p>
                  </div>
                  <Calendar className="h-8 w-8 text-blue-500" />
                </div>
              </Card>

              <Card className="banking-stat-card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="banking-stat-label">Montant du Jour</p>
                    <p className="banking-stat-value">$127,450</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-green-500" />
                </div>
              </Card>

              <Card className="banking-stat-card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="banking-stat-label">En Retard</p>
                    <p className="banking-stat-value">12</p>
                  </div>
                  <Clock className="h-8 w-8 text-red-500" />
                </div>
              </Card>
            </div>

            <Card className="banking-card">
              <CardHeader>
                <CardTitle>Échéancier Mensuel</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Échéanciers de Prêts
                  </h3>
                  <p className="text-gray-600">
                    Gestion complète des calendriers de remboursement avec rappels automatiques.
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

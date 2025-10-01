'use client'

import { Header } from '@/components/layout/header'
import { Sidebar } from '@/components/layout/sidebar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { History, Download } from 'lucide-react'

const mockUser = {
  name: 'Caissier Principal',
  role: 'cashier'
}

export default function PaymentHistoryPage() {
  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={mockUser} />
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Historique des Paiements</h1>
              <p className="text-gray-600">
                Consultation complète de l'historique des paiements
              </p>
            </div>

            <Card className="banking-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <History className="h-5 w-5 mr-2" />
                  Historique des Paiements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <History className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Historique des Paiements
                  </h3>
                  <p className="text-gray-600">
                    Consultation détaillée de tous les paiements effectués.
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

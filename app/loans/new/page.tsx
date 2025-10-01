'use client'

import { LoanApplication } from '@/components/loans/loan-application'
import { Header } from '@/components/layout/header'
import { Sidebar } from '@/components/layout/sidebar'

const mockUser = {
  name: 'Agent Principal',
  role: 'manager'
}

export default function NewLoanPage() {
  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={mockUser} />
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Nouvelle Demande de Prêt</h1>
              <p className="text-gray-600">
                Créer une nouvelle demande de prêt avec calcul automatique
              </p>
            </div>
            <LoanApplication />
          </div>
        </main>
      </div>
    </div>
  )
}

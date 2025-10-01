'use client'

import { useState } from 'react'
import { Header } from '@/components/layout/header'
import { Sidebar } from '@/components/layout/sidebar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { PaymentProcessor } from '@/components/payments/payment-processor'
import { ExpenseManager } from '@/components/expenses/expense-manager'
import { Receipt, DollarSign, TrendingUp, Users } from 'lucide-react'

const mockUser = {
  name: 'Caissier Principal',
  role: 'cashier'
}

export default function PaymentsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('payments')

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          user={mockUser}
          onMenuClick={() => setSidebarOpen(true)}
        />

        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestion Financière</h1>
              <p className="text-gray-600">
                Traitement des paiements, suivi des dépenses et gestion comptable
              </p>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="payments" className="flex items-center">
                  <Receipt className="h-4 w-4 mr-2" />
                  Paiements
                </TabsTrigger>
                <TabsTrigger value="expenses" className="flex items-center">
                  <DollarSign className="h-4 w-4 mr-2" />
                  Dépenses
                </TabsTrigger>
              </TabsList>

              <TabsContent value="payments" className="space-y-6">
                <PaymentProcessor />
              </TabsContent>

              <TabsContent value="expenses" className="space-y-6">
                <ExpenseManager />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}

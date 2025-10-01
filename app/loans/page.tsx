'use client'

import { useState } from 'react'
import { Header } from '@/components/layout/header'
import { Sidebar } from '@/components/layout/sidebar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { formatCurrency, formatDate } from '@/lib/utils'
import { Plus, Search, Filter, Eye, Edit, FileText, Calculator } from 'lucide-react'
import { LoanApplication } from '@/components/loans/loan-application'
import { LoanTypesManager } from '@/components/loans/loan-types-manager'

const mockLoans = [
  {
    id: '1',
    client: { firstName: 'Marie', lastName: 'Dupont', phone: '+509 1234-5678' },
    amount: 50000,
    interestRate: 15,
    termMonths: 12,
    monthlyPayment: 4500,
    remainingBalance: 45000,
    status: 'active' as const,
    disbursedAt: '2024-01-15',
    dueDate: '2025-01-15',
    agent: 'Jean Claude'
  },
  {
    id: '2',
    client: { firstName: 'Jean', lastName: 'Baptiste', phone: '+509 2345-6789' },
    amount: 75000,
    interestRate: 18,
    termMonths: 18,
    monthlyPayment: 5200,
    remainingBalance: 72000,
    status: 'pending' as const,
    disbursedAt: null,
    dueDate: null,
    agent: 'Marie Claire'
  },
  {
    id: '3',
    client: { firstName: 'Claire', lastName: 'Michel', phone: '+509 3456-7890' },
    amount: 100000,
    interestRate: 12,
    termMonths: 24,
    monthlyPayment: 5100,
    remainingBalance: 85000,
    status: 'active' as const,
    disbursedAt: '2024-01-10',
    dueDate: '2026-01-10',
    agent: 'Pierre Louis'
  }
]

const mockUser = {
  name: 'Agent Principal',
  role: 'manager'
}

export default function LoansPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('loans')

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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestion des Prêts</h1>
              <p className="text-gray-600">
                Gérez vos produits de prêt, demandes et remboursements
              </p>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="loans">Prêts</TabsTrigger>
                <TabsTrigger value="applications">Nouvelles Demandes</TabsTrigger>
                <TabsTrigger value="products">Produits</TabsTrigger>
              </TabsList>

              <TabsContent value="loans" className="space-y-6">
                <div className="banking-card">
                  <CardHeader>
                    <CardTitle>Liste des Prêts</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12">
                      <Calculator className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        Interface DataTable en développement
                      </h3>
                      <p className="text-gray-600">
                        La liste des prêts avec tri et filtrage avancés sera bientôt disponible.
                      </p>
                    </div>
                  </CardContent>
                </div>
              </TabsContent>

              <TabsContent value="applications" className="space-y-6">
                <LoanApplication />
              </TabsContent>

              <TabsContent value="products" className="space-y-6">
                <LoanTypesManager />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}

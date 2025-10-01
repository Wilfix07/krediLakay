'use client'

import { useState } from 'react'
import { Header } from '@/components/layout/header'
import { Sidebar } from '@/components/layout/sidebar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { formatDate } from '@/lib/utils'
import { Plus, Search, Filter, Eye, Edit, Phone, Mail, Shield, Users } from 'lucide-react'
import { KycManager } from '@/components/clients/kyc-manager'

const mockClients = [
  {
    id: '1',
    firstName: 'Marie',
    lastName: 'Dupont',
    email: 'marie.dupont@email.com',
    phone: '+509 1234-5678',
    address: 'Port-au-Prince, Pétion-Ville',
    dateOfBirth: '1985-03-15',
    nationalId: 'ID123456789',
    createdAt: '2024-01-15',
    activeLoans: 2,
    totalBorrowed: 125000,
    creditScore: 750
  },
  {
    id: '2',
    firstName: 'Jean',
    lastName: 'Baptiste',
    email: 'jean.baptiste@email.com',
    phone: '+509 2345-6789',
    address: 'Cap-Haïtien, Centre-ville',
    dateOfBirth: '1978-08-22',
    nationalId: 'ID987654321',
    createdAt: '2024-01-10',
    activeLoans: 1,
    totalBorrowed: 75000,
    creditScore: 680
  },
  {
    id: '3',
    firstName: 'Claire',
    lastName: 'Michel',
    email: 'claire.michel@email.com',
    phone: '+509 3456-7890',
    address: 'Gonaïves, Raboteau',
    dateOfBirth: '1990-12-05',
    nationalId: 'ID456789123',
    createdAt: '2024-01-08',
    activeLoans: 0,
    totalBorrowed: 200000,
    creditScore: 820
  }
]

const mockUser = {
  name: 'Agent Principal',
  role: 'manager'
}

export default function ClientsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('clients')

  const getCreditScoreColor = (score: number) => {
    if (score >= 750) return 'text-green-600'
    if (score >= 650) return 'text-yellow-600'
    return 'text-red-600'
  }

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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestion des Clients</h1>
              <p className="text-gray-600">
                Gérez votre base de clients, leurs informations et leur conformité KYC
              </p>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="clients" className="flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  Clients
                </TabsTrigger>
                <TabsTrigger value="kyc" className="flex items-center">
                  <Shield className="h-4 w-4 mr-2" />
                  Vérification KYC
                </TabsTrigger>
              </TabsList>

              <TabsContent value="clients" className="space-y-6">
                <div className="banking-card">
                  <CardHeader>
                    <CardTitle>Liste des Clients</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12">
                      <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        Fonctionnalité en développement
                      </h3>
                      <p className="text-gray-600">
                        La liste complète des clients sera bientôt disponible avec toutes les fonctionnalités avancées.
                      </p>
                    </div>
                  </CardContent>
                </div>
              </TabsContent>

              <TabsContent value="kyc" className="space-y-6">
                <KycManager />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}

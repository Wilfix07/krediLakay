'use client'

import { useState } from 'react'
import { Header } from '@/components/layout/header'
import { Sidebar } from '@/components/layout/sidebar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Users, Search, Filter, Plus, Eye, Edit, Shield, Clock, TrendingUp } from 'lucide-react'
import { MemberManagement } from '@/components/admin/member-management'
import { KycReviewCenter } from '@/components/members/kyc-review-center'
import { MemberRegistrationForm } from '@/components/members/member-registration-form'

const mockUser = {
  name: 'Agent Principal',
  role: 'manager'
}

export default function MembersPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('list')

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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestion des Membres</h1>
              <p className="text-gray-600">
                Gestion complète de la base de membres et vérification KYC
              </p>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="list" className="flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  Liste
                </TabsTrigger>
                <TabsTrigger value="new" className="flex items-center">
                  <Plus className="h-4 w-4 mr-2" />
                  Nouveau
                </TabsTrigger>
                <TabsTrigger value="search" className="flex items-center">
                  <Search className="h-4 w-4 mr-2" />
                  Recherche
                </TabsTrigger>
                <TabsTrigger value="profiles" className="flex items-center">
                  <Eye className="h-4 w-4 mr-2" />
                  Profils
                </TabsTrigger>
                <TabsTrigger value="kyc" className="flex items-center">
                  <Shield className="h-4 w-4 mr-2" />
                  KYC
                </TabsTrigger>
              </TabsList>

              <TabsContent value="list" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Card className="banking-stat-card">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="banking-stat-label">Total Membres</p>
                        <p className="banking-stat-value">1,247</p>
                      </div>
                      <Users className="h-8 w-8 text-blue-500" />
                    </div>
                  </Card>

                  <Card className="banking-stat-card">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="banking-stat-label">Membres Actifs</p>
                        <p className="banking-stat-value">1,089</p>
                      </div>
                      <TrendingUp className="h-8 w-8 text-green-500" />
                    </div>
                  </Card>

                  <Card className="banking-stat-card">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="banking-stat-label">KYC Approuvé</p>
                        <p className="banking-stat-value">892</p>
                      </div>
                      <Shield className="h-8 w-8 text-emerald-500" />
                    </div>
                  </Card>

                  <Card className="banking-stat-card">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="banking-stat-label">En Attente</p>
                        <p className="banking-stat-value">128</p>
                      </div>
                      <Clock className="h-8 w-8 text-yellow-500" />
                    </div>
                  </Card>
                </div>

                <Card className="banking-card">
                  <CardHeader>
                    <CardTitle>Liste des Membres</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12">
                      <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        Interface en développement
                      </h3>
                      <p className="text-gray-600">
                        La liste complète des membres avec recherche avancée sera bientôt disponible.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="new" className="space-y-6">
                <MemberRegistrationForm />
              </TabsContent>

              <TabsContent value="search" className="space-y-6">
                <Card className="banking-card">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Search className="h-5 w-5 mr-2" />
                      Recherche Avancée
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12">
                      <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        Recherche Avancée
                      </h3>
                      <p className="text-gray-600">
                        Outils de recherche avancés pour trouver rapidement les membres selon différents critères.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="profiles" className="space-y-6">
                <Card className="banking-card">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Eye className="h-5 w-5 mr-2" />
                      Profils Détaillés
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12">
                      <Eye className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        Profils Détaillés
                      </h3>
                      <p className="text-gray-600">
                        Consultation détaillée des profils membres avec historique complet.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="kyc" className="space-y-6">
                <KycReviewCenter />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}

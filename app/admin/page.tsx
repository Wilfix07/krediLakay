'use client'

import { useState } from 'react'
import { Header } from '@/components/layout/header'
import { Sidebar } from '@/components/layout/sidebar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { UserManagement } from '@/components/admin/user-management'
import { SystemParameters } from '@/components/admin/system-parameters'
import { Shield, Settings, Users, Activity, Database, FileText } from 'lucide-react'

const mockUser = {
  name: 'Administrateur',
  role: 'admin'
}

export default function AdminPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')

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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Administration</h1>
              <p className="text-gray-600">
                Gestion complète du système et administration interne
              </p>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview" className="flex items-center">
                  <Activity className="h-4 w-4 mr-2" />
                  Vue d'ensemble
                </TabsTrigger>
                <TabsTrigger value="users" className="flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  Utilisateurs
                </TabsTrigger>
                <TabsTrigger value="parameters" className="flex items-center">
                  <Settings className="h-4 w-4 mr-2" />
                  Paramètres
                </TabsTrigger>
                <TabsTrigger value="system" className="flex items-center">
                  <Database className="h-4 w-4 mr-2" />
                  Système
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="banking-stat-card">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="banking-stat-label">Utilisateurs Actifs</p>
                        <p className="banking-stat-value">12</p>
                      </div>
                      <Users className="h-8 w-8 text-blue-500" />
                    </div>
                    <div className="mt-4">
                      <div className="flex items-center text-sm">
                        <span className="text-green-600">+2</span>
                        <span className="text-gray-500 ml-1">ce mois</span>
                      </div>
                    </div>
                  </div>

                  <div className="banking-stat-card">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="banking-stat-label">Types de Prêts</p>
                        <p className="banking-stat-value">3</p>
                      </div>
                      <FileText className="h-8 w-8 text-green-500" />
                    </div>
                    <div className="mt-4">
                      <div className="flex items-center text-sm">
                        <span className="text-gray-500">Actifs</span>
                      </div>
                    </div>
                  </div>

                  <div className="banking-stat-card">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="banking-stat-label">Sauvegardes</p>
                        <p className="banking-stat-value">7</p>
                      </div>
                      <Database className="h-8 w-8 text-purple-500" />
                    </div>
                    <div className="mt-4">
                      <div className="flex items-center text-sm">
                        <span className="text-gray-500">jours</span>
                      </div>
                    </div>
                  </div>

                  <div className="banking-stat-card">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="banking-stat-label">Sécurité</p>
                        <p className="banking-stat-value">OK</p>
                      </div>
                      <Shield className="h-8 w-8 text-emerald-500" />
                    </div>
                    <div className="mt-4">
                      <div className="flex items-center text-sm">
                        <span className="text-green-600">Sécurisé</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="banking-card">
                    <div className="banking-card-header">
                      <h3 className="text-lg font-semibold">Activité Récente</h3>
                    </div>
                    <div className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">Nouvel utilisateur créé</p>
                            <p className="text-xs text-gray-500">Il y a 2 heures</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">Sauvegarde automatique</p>
                            <p className="text-xs text-gray-500">Il y a 6 heures</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">Paramètres mis à jour</p>
                            <p className="text-xs text-gray-500">Hier</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="banking-card">
                    <div className="banking-card-header">
                      <h3 className="text-lg font-semibold">État du Système</h3>
                    </div>
                    <div className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Base de données</span>
                          <Badge className="bg-green-100 text-green-800">Connecté</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Service SMS</span>
                          <Badge className="bg-green-100 text-green-800">Actif</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Service Email</span>
                          <Badge className="bg-yellow-100 text-yellow-800">Maintenance</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Sauvegardes</span>
                          <Badge className="bg-green-100 text-green-800">Automatique</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="users" className="space-y-6">
                <UserManagement />
              </TabsContent>

              <TabsContent value="parameters" className="space-y-6">
                <SystemParameters />
              </TabsContent>

              <TabsContent value="system" className="space-y-6">
                <div className="banking-card">
                  <div className="banking-card-header">
                    <h3 className="text-lg font-semibold">Maintenance Système</h3>
                  </div>
                  <div className="p-6">
                    <div className="text-center py-12">
                      <Database className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        Fonctionnalité en développement
                      </h3>
                      <p className="text-gray-600">
                        Les outils avancés de maintenance système seront bientôt disponibles.
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}

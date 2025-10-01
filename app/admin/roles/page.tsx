'use client'

import { Header } from '@/components/layout/header'
import { Sidebar } from '@/components/layout/sidebar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Shield, Users, Settings, Eye } from 'lucide-react'

const mockUser = {
  name: 'Administrateur',
  role: 'admin'
}

export default function AdminRolesPage() {
  const roles = [
    {
      id: 'super_admin',
      name: 'Super Administrateur',
      description: 'Accès complet à toutes les fonctionnalités',
      permissions: ['all'],
      userCount: 1,
      color: 'bg-red-100 text-red-800'
    },
    {
      id: 'admin',
      name: 'Administrateur',
      description: 'Gestion complète de l\'institution',
      permissions: ['users', 'settings', 'reports', 'audit'],
      userCount: 2,
      color: 'bg-blue-100 text-blue-800'
    },
    {
      id: 'manager',
      name: 'Manager',
      description: 'Supervision et rapports',
      permissions: ['reports', 'analytics', 'commissions'],
      userCount: 3,
      color: 'bg-green-100 text-green-800'
    },
    {
      id: 'agent',
      name: 'Agent',
      description: 'Gestion des clients et prêts',
      permissions: ['clients', 'loans', 'payments'],
      userCount: 8,
      color: 'bg-purple-100 text-purple-800'
    },
    {
      id: 'cashier',
      name: 'Caissier',
      description: 'Traitement des paiements',
      permissions: ['payments', 'receipts'],
      userCount: 3,
      color: 'bg-orange-100 text-orange-800'
    }
  ]

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={mockUser} />
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestion des Rôles</h1>
              <p className="text-gray-600">
                Configuration des rôles et permissions du système
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {roles.map((role) => (
                <Card key={role.id} className="banking-card">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center">
                        <Shield className="h-5 w-5 mr-2" />
                        {role.name}
                      </CardTitle>
                      <Badge className={role.color}>
                        {role.userCount} utilisateur{role.userCount > 1 ? 's' : ''}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-gray-600">{role.description}</p>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Permissions:</h4>
                      <div className="flex flex-wrap gap-1">
                        {role.permissions.slice(0, 3).map((permission) => (
                          <Badge key={permission} variant="outline" className="text-xs">
                            {permission}
                          </Badge>
                        ))}
                        {role.permissions.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{role.permissions.length - 3} autres
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex space-x-2 pt-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="h-4 w-4 mr-1" />
                        Voir Détails
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        Modifier
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

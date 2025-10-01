'use client'

import { Header } from '@/components/layout/header'
import { Sidebar } from '@/components/layout/sidebar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { MessageCircle, Phone, Mail, Book, HelpCircle, Users } from 'lucide-react'

const mockUser = {
  name: 'Agent Principal',
  role: 'manager'
}

export default function SupportPage() {
  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={mockUser} />
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Centre de Support</h1>
              <p className="text-gray-600">
                Assistance et support technique pour les utilisateurs
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <Card className="banking-card cursor-pointer hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MessageCircle className="h-5 w-5 mr-2 text-blue-500" />
                    Chat en Direct
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Assistance instantanée par chat avec notre équipe support
                  </p>
                  <Button className="w-full">
                    Démarrer le Chat
                  </Button>
                </CardContent>
              </Card>

              <Card className="banking-card cursor-pointer hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Phone className="h-5 w-5 mr-2 text-green-500" />
                    Support Téléphonique
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Appelez notre équipe support au +509-1234-5678
                  </p>
                  <Button variant="outline" className="w-full">
                    Voir les Horaires
                  </Button>
                </CardContent>
              </Card>

              <Card className="banking-card cursor-pointer hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Mail className="h-5 w-5 mr-2 text-purple-500" />
                    Email Support
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Envoyez-nous un email à support@kredilakay.com
                  </p>
                  <Button variant="outline" className="w-full">
                    Envoyer un Email
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="banking-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Book className="h-5 w-5 mr-2" />
                    Base de Connaissances
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <h4 className="font-medium text-gray-900 mb-2">Guide de Démarrage Rapide</h4>
                      <p className="text-sm text-gray-600">
                        Apprenez à utiliser les fonctionnalités principales de KrediLakay
                      </p>
                    </div>
                    <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <h4 className="font-medium text-gray-900 mb-2">Gestion des Prêts</h4>
                      <p className="text-sm text-gray-600">
                        Tout savoir sur la création et le suivi des prêts
                      </p>
                    </div>
                    <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <h4 className="font-medium text-gray-900 mb-2">Rapports et Analytics</h4>
                      <p className="text-sm text-gray-600">
                        Comment générer et interpréter vos rapports financiers
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="banking-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    Formation et Tutoriels
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <h4 className="font-medium text-gray-900 mb-2">Formation Agents</h4>
                      <p className="text-sm text-gray-600">
                        Programme de formation complet pour les nouveaux agents
                      </p>
                    </div>
                    <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <h4 className="font-medium text-gray-900 mb-2">Tutoriels Vidéo</h4>
                      <p className="text-sm text-gray-600">
                        Vidéos explicatives pour chaque fonctionnalité
                      </p>
                    </div>
                    <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <h4 className="font-medium text-gray-900 mb-2">FAQ</h4>
                      <p className="text-sm text-gray-600">
                        Réponses aux questions fréquemment posées
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

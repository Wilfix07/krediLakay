'use client'

import { Header } from '@/components/layout/header'
import { Sidebar } from '@/components/layout/sidebar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Search, Book, HelpCircle, FileText, Video, Download, ExternalLink, Eye } from 'lucide-react'

const mockUser = {
  name: 'Agent Principal',
  role: 'manager'
}

export default function KnowledgeBasePage() {
  const categories = [
    {
      title: 'Guide de Démarrage',
      description: 'Apprenez à utiliser KrediLakay efficacement',
      articles: 12,
      icon: <Book className="h-5 w-5 text-blue-500" />,
      color: 'bg-blue-50 border-blue-200'
    },
    {
      title: 'Gestion des Prêts',
      description: 'Tout sur la création et le suivi des prêts',
      articles: 18,
      icon: <FileText className="h-5 w-5 text-green-500" />,
      color: 'bg-green-50 border-green-200'
    },
    {
      title: 'Paiements et Recouvrements',
      description: 'Procédures de paiement et gestion des retards',
      articles: 15,
      icon: <HelpCircle className="h-5 w-5 text-purple-500" />,
      color: 'bg-purple-50 border-purple-200'
    },
    {
      title: 'Rapports et Analytics',
      description: 'Génération et interprétation des rapports',
      articles: 8,
      icon: <Book className="h-5 w-5 text-orange-500" />,
      color: 'bg-orange-50 border-orange-200'
    }
  ]

  const featuredArticles = [
    {
      title: 'Comment créer un nouveau prêt',
      category: 'Prêts',
      views: 1250,
      updated: '2024-01-15',
      featured: true
    },
    {
      title: 'Procédure KYC complète',
      category: 'Conformité',
      views: 890,
      updated: '2024-01-12',
      featured: true
    },
    {
      title: 'Calcul automatique des commissions',
      category: 'Finance',
      views: 654,
      updated: '2024-01-10',
      featured: false
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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Base de Connaissances</h1>
              <p className="text-gray-600">
                Documentation complète et guides d'utilisation de KrediLakay
              </p>
            </div>

            {/* Search */}
            <Card className="banking-card mb-8">
              <CardContent className="p-6">
                <div className="relative max-w-2xl mx-auto">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="Rechercher dans la base de connaissances..."
                    className="pl-10 pr-20"
                  />
                  <Button className="absolute right-2 top-1/2 transform -translate-y-1/2">
                    Rechercher
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Categories */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {categories.map((category, index) => (
                <Card key={index} className={`banking-card cursor-pointer hover:shadow-lg transition-shadow ${category.color}`}>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      {category.icon}
                      <div>
                        <CardTitle className="text-lg">{category.title}</CardTitle>
                        <p className="text-sm text-gray-600">{category.description}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">{category.articles} articles</Badge>
                      <ExternalLink className="h-4 w-4 text-gray-400" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Featured Articles */}
            <Card className="banking-card mb-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Book className="h-5 w-5 mr-2" />
                  Articles en Vedette
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {featuredArticles.map((article, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 mb-1">{article.title}</h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <Badge variant="outline">{article.category}</Badge>
                          <span>{article.views} vues</span>
                          <span>Mise à jour: {article.updated}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {article.featured && (
                          <Badge className="bg-yellow-100 text-yellow-800">En vedette</Badge>
                        )}
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          Lire
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card className="banking-card">
              <CardHeader>
                <CardTitle>Liens Rapides</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <h4 className="font-medium text-gray-900 mb-2">Tutoriels Vidéo</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      Vidéos explicatives pour chaque fonctionnalité
                    </p>
                    <Button variant="outline" size="sm">
                      <Video className="h-4 w-4 mr-2" />
                      Voir les Vidéos
                    </Button>
                  </div>

                  <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <h4 className="font-medium text-gray-900 mb-2">FAQ</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      Réponses aux questions fréquemment posées
                    </p>
                    <Button variant="outline" size="sm">
                      <HelpCircle className="h-4 w-4 mr-2" />
                      Consulter la FAQ
                    </Button>
                  </div>

                  <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <h4 className="font-medium text-gray-900 mb-2">Documentation API</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      Guide technique pour les intégrations
                    </p>
                    <Button variant="outline" size="sm">
                      <FileText className="h-4 w-4 mr-2" />
                      Documentation
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}

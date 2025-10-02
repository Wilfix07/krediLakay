'use client'

import { Header } from '@/components/layout/header'
import { Sidebar } from '@/components/layout/sidebar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Settings, Database, Shield } from 'lucide-react'

const mockUser = {
  name: 'Administrateur',
  role: 'admin'
}

export default function AdminConfigPage() {
  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={mockUser} />
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Configuration Avancée</h1>
              <p className="text-gray-600">
                Paramètres techniques et configuration système avancée
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="banking-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Database className="h-5 w-5 mr-2" />
                    Configuration Base de Données
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="db_host">Hôte Base de Données</Label>
                    <Input id="db_host" defaultValue="localhost" />
                  </div>

                  <div>
                    <Label htmlFor="db_port">Port</Label>
                    <Input id="db_port" type="number" defaultValue="5432" />
                  </div>

                  <div>
                    <Label htmlFor="db_name">Nom de la Base</Label>
                    <Input id="db_name" defaultValue="kredilakay" />
                  </div>

                  <div>
                    <Label htmlFor="db_user">Utilisateur</Label>
                    <Input id="db_user" defaultValue="postgres" />
                  </div>

                  <div>
                    <Label htmlFor="connection_pool">Pool de Connexions</Label>
                    <Input id="connection_pool" type="number" defaultValue="10" />
                  </div>
                </CardContent>
              </Card>

              <Card className="banking-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="h-5 w-5 mr-2" />
                    Configuration Sécurité
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="jwt_secret">Clé Secrète JWT</Label>
                    <Input
                      id="jwt_secret"
                      type="password"
                      placeholder="Générer une clé aléatoire"
                    />
                  </div>

                  <div>
                    <Label htmlFor="encryption_key">Clé de Chiffrement</Label>
                    <Input
                      id="encryption_key"
                      type="password"
                      placeholder="Clé de chiffrement AES-256"
                    />
                  </div>

                  <div>
                    <Label htmlFor="ssl_mode">Mode SSL</Label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                      <option>require</option>
                      <option>prefer</option>
                      <option>disable</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="backup_encryption">Chiffrement Sauvegardes</Label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                      <option>enabled</option>
                      <option>disabled</option>
                    </select>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="banking-card mt-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="h-5 w-5 mr-2" />
                  Paramètres de Performance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="cache_ttl">TTL Cache (secondes)</Label>
                    <Input id="cache_ttl" type="number" defaultValue="3600" />
                  </div>

                  <div>
                    <Label htmlFor="max_file_size">Taille Max Fichier (MB)</Label>
                    <Input id="max_file_size" type="number" defaultValue="10" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="rate_limit">Limite de Taux (req/min)</Label>
                    <Input id="rate_limit" type="number" defaultValue="100" />
                  </div>

                  <div>
                    <Label htmlFor="session_timeout">Timeout Session (min)</Label>
                    <Input id="session_timeout" type="number" defaultValue="30" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="maintenance_mode">Mode Maintenance</Label>
                  <div className="mt-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      Activer le mode maintenance
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end mt-6">
              <Button className="flex items-center">
                <Settings className="h-4 w-4 mr-2" />
                Appliquer la Configuration
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

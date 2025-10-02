'use client'

import { Header } from '@/components/layout/header'
import { Sidebar } from '@/components/layout/sidebar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Settings, Save } from 'lucide-react'

const mockUser = {
  name: 'Administrateur',
  role: 'admin'
}

export default function SettingsSystemPage() {
  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={mockUser} />
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Configuration Système</h1>
              <p className="text-gray-600">
                Paramètres techniques et configuration système avancée
              </p>
            </div>

            <Card className="banking-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="h-5 w-5 mr-2" />
                  Paramètres Techniques
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="app_name">Nom de l'Application</Label>
                    <Input id="app_name" defaultValue="KREDI LAKAY" />
                  </div>

                  <div>
                    <Label htmlFor="version">Version</Label>
                    <Input id="version" defaultValue="1.0.0" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="timezone">Fuseau Horaire</Label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                      <option>America/Port-au-Prince</option>
                      <option>America/New_York</option>
                      <option>UTC</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="currency">Devise par Défaut</Label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                      <option>HTG</option>
                      <option>USD</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="session_timeout">Timeout Session (minutes)</Label>
                    <Input id="session_timeout" type="number" defaultValue="30" />
                  </div>

                  <div>
                    <Label htmlFor="max_login_attempts">Tentatives Max Connexion</Label>
                    <Input id="max_login_attempts" type="number" defaultValue="5" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="backup_frequency">Fréquence Sauvegarde (jours)</Label>
                    <Input id="backup_frequency" type="number" defaultValue="7" />
                  </div>

                  <div>
                    <Label htmlFor="data_retention">Rétention Données (jours)</Label>
                    <Input id="data_retention" type="number" defaultValue="2555" />
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

                <div className="flex justify-end">
                  <Button className="flex items-center">
                    <Save className="h-4 w-4 mr-2" />
                    Sauvegarder la Configuration
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}

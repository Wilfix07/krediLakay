'use client'

import { Header } from '@/components/layout/header'
import { Sidebar } from '@/components/layout/sidebar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Settings, Save } from 'lucide-react'

const mockUser = {
  name: 'Administrateur',
  role: 'admin'
}

export default function AdminParametersPage() {
  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={mockUser} />
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Paramètres Système</h1>
              <p className="text-gray-600">
                Configuration avancée des paramètres de l'application
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="banking-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Settings className="h-5 w-5 mr-2" />
                    Paramètres Généraux
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="app_name">Nom de l'Application</Label>
                    <Input id="app_name" defaultValue="KREDI LAKAY" />
                  </div>

                  <div>
                    <Label htmlFor="timezone">Fuseau Horaire</Label>
                    <Select defaultValue="america/port-au-prince">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="america/port-au-prince">Port-au-Prince (UTC-5)</SelectItem>
                        <SelectItem value="america/new_york">New York (UTC-5)</SelectItem>
                        <SelectItem value="utc">UTC</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="currency">Devise par Défaut</Label>
                    <Select defaultValue="htg">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="htg">Gourde Haïtienne (HTG)</SelectItem>
                        <SelectItem value="usd">Dollar Américain (USD)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="language">Langue par Défaut</Label>
                    <Select defaultValue="fr">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fr">Français</SelectItem>
                        <SelectItem value="ht">Créole Haïtien</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card className="banking-card">
                <CardHeader>
                  <CardTitle>Paramètres de Sécurité</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="session_timeout">Timeout de Session (minutes)</Label>
                    <Input id="session_timeout" type="number" defaultValue="30" />
                  </div>

                  <div>
                    <Label htmlFor="max_login_attempts">Tentatives de Connexion Max</Label>
                    <Input id="max_login_attempts" type="number" defaultValue="5" />
                  </div>

                  <div>
                    <Label htmlFor="password_min_length">Longueur Minimale Mot de Passe</Label>
                    <Input id="password_min_length" type="number" defaultValue="8" />
                  </div>

                  <div>
                    <Label htmlFor="require_2fa">Authentification à Deux Facteurs</Label>
                    <Select defaultValue="optional">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="disabled">Désactivé</SelectItem>
                        <SelectItem value="optional">Optionnel</SelectItem>
                        <SelectItem value="required">Requis</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="banking-card mt-6">
              <CardHeader>
                <CardTitle>Paramètres Avancés</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="backup_frequency">Fréquence de Sauvegarde (jours)</Label>
                    <Input id="backup_frequency" type="number" defaultValue="7" />
                  </div>

                  <div>
                    <Label htmlFor="data_retention">Rétention des Données (jours)</Label>
                    <Input id="data_retention" type="number" defaultValue="2555" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="api_rate_limit">Limite de Taux API (requêtes/minute)</Label>
                  <Input id="api_rate_limit" type="number" defaultValue="100" />
                </div>

                <div>
                  <Label htmlFor="notification_settings">Paramètres de Notifications</Label>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="email_notifications" defaultChecked />
                      <Label htmlFor="email_notifications">Notifications par Email</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="sms_notifications" defaultChecked />
                      <Label htmlFor="sms_notifications">Notifications par SMS</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="push_notifications" />
                      <Label htmlFor="push_notifications">Notifications Push</Label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end mt-6">
              <Button className="flex items-center">
                <Save className="h-4 w-4 mr-2" />
                Sauvegarder les Paramètres
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
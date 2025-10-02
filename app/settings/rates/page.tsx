'use client'

import { Header } from '@/components/layout/header'
import { Sidebar } from '@/components/layout/sidebar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Percent, Save } from 'lucide-react'

const mockUser = {
  name: 'Administrateur',
  role: 'admin'
}

export default function SettingsRatesPage() {
  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={mockUser} />
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Paramètres des Taux d'Intérêt</h1>
              <p className="text-gray-600">
                Configuration des taux d'intérêt pour les différents types de prêts
              </p>
            </div>

            <Card className="banking-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Percent className="h-5 w-5 mr-2" />
                  Configuration des Taux d'Intérêt
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="default_rate">Taux d'Intérêt par Défaut (%)</Label>
                    <Input
                      id="default_rate"
                      type="number"
                      step="0.01"
                      defaultValue="15.00"
                    />
                  </div>

                  <div>
                    <Label htmlFor="penalty_rate">Taux de Pénalité (%)</Label>
                    <Input
                      id="penalty_rate"
                      type="number"
                      step="0.01"
                      defaultValue="2.00"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="max_rate">Taux Maximum Autorisé (%)</Label>
                  <Input
                    id="max_rate"
                    type="number"
                    step="0.01"
                    defaultValue="25.00"
                  />
                </div>

                <div>
                  <Label htmlFor="min_rate">Taux Minimum Autorisé (%)</Label>
                  <Input
                    id="min_rate"
                    type="number"
                    step="0.01"
                    defaultValue="5.00"
                  />
                </div>

                <div>
                  <Label htmlFor="compound_frequency">Fréquence de Composition</Label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                    <option>Annuel</option>
                    <option>Semestriel</option>
                    <option>Trimestriel</option>
                    <option>Mensuel</option>
                    <option>Hebdomadaire</option>
                    <option>Quotidien</option>
                  </select>
                </div>

                <div className="flex justify-end">
                  <Button className="flex items-center">
                    <Save className="h-4 w-4 mr-2" />
                    Sauvegarder les Taux
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

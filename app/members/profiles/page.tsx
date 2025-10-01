'use client'

import { Header } from '@/components/layout/header'
import { Sidebar } from '@/components/layout/sidebar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Eye, Edit, Phone, Mail, MapPin, Calendar } from 'lucide-react'

const mockUser = {
  name: 'Agent Principal',
  role: 'manager'
}

export default function MemberProfilesPage() {
  const profiles = [
    {
      id: '1',
      name: 'Marie Dupont',
      phone: '+509-1234-5678',
      email: 'marie.dupont@email.com',
      address: 'Port-au-Prince, Pétion-Ville',
      joinDate: '2024-01-15',
      kycStatus: 'approved',
      riskLevel: 'low',
      agent: 'Jean Claude',
      loans: 3,
      totalBorrowed: 150000
    },
    {
      id: '2',
      name: 'Jean Baptiste',
      phone: '+509-2345-6789',
      email: 'jean.baptiste@email.com',
      address: 'Cap-Haïtien, Centre-ville',
      joinDate: '2024-01-10',
      kycStatus: 'pending',
      riskLevel: 'medium',
      agent: 'Marie Claire',
      loans: 1,
      totalBorrowed: 75000
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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Profils Détaillés des Membres</h1>
              <p className="text-gray-600">
                Consultation complète des informations membres et historique
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {profiles.map((profile) => (
                <Card key={profile.id} className="banking-card">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-3">
                          <span className="text-white font-semibold">
                            {profile.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        {profile.name}
                      </CardTitle>
                      <Badge variant={
                        profile.kycStatus === 'approved' ? 'default' :
                        profile.kycStatus === 'pending' ? 'secondary' : 'destructive'
                      }>
                        KYC: {profile.kycStatus}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-2 text-gray-500" />
                        {profile.phone}
                      </div>
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-2 text-gray-500" />
                        {profile.email}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                        {profile.address}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                        Membre depuis {profile.joinDate}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-100">
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <p className="text-2xl font-bold text-blue-600">{profile.loans}</p>
                          <p className="text-sm text-gray-600">Prêts actifs</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-green-600">
                            {new Intl.NumberFormat('fr-HT', {
                              style: 'currency',
                              currency: 'HTG'
                            }).format(profile.totalBorrowed)}
                          </p>
                          <p className="text-sm text-gray-600">Total emprunté</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">
                            {profile.riskLevel === 'low' ? 'Risque Faible' :
                             profile.riskLevel === 'medium' ? 'Risque Moyen' : 'Risque Élevé'}
                          </p>
                          <p className="text-sm text-gray-600">Niveau de risque</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-2 pt-4">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        Voir Détails
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-1" />
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

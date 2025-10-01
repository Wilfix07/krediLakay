'use client'

import { useState } from 'react'
import { Header } from '@/components/layout/header'
import { Sidebar } from '@/components/layout/sidebar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { 
  Settings, 
  User, 
  Building2, 
  Percent, 
  Users, 
  Shield, 
  Bell,
  Save,
  Plus,
  Edit,
  Trash2
} from 'lucide-react'

const mockUser = {
  name: 'Agent Principal',
  role: 'manager'
}

const mockInstitution = {
  name: 'Microfinance LAKAY',
  address: 'Port-au-Prince, Pétion-Ville',
  phone: '+509 1234-5678',
  email: 'contact@kredilakay.com',
  license: 'MF-2024-001'
}

const mockUsers = [
  {
    id: '1',
    name: 'Jean Claude',
    email: 'jean.claude@kredilakay.com',
    role: 'agent',
    status: 'active',
    lastLogin: '2024-01-15'
  },
  {
    id: '2',
    name: 'Marie Claire',
    email: 'marie.claire@kredilakay.com',
    role: 'manager',
    status: 'active',
    lastLogin: '2024-01-14'
  },
  {
    id: '3',
    name: 'Pierre Louis',
    email: 'pierre.louis@kredilakay.com',
    role: 'agent',
    status: 'inactive',
    lastLogin: '2024-01-10'
  }
]

const mockCommissionRates = [
  { id: 1, minAmount: 0, maxAmount: 50000, rate: 3.0 },
  { id: 2, minAmount: 50001, maxAmount: 100000, rate: 2.5 },
  { id: 3, minAmount: 100001, maxAmount: 200000, rate: 2.0 },
  { id: 4, minAmount: 200001, maxAmount: 500000, rate: 1.5 },
  { id: 5, minAmount: 500001, maxAmount: 999999999, rate: 1.0 }
]

export default function SettingsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('profile')
  const [institution, setInstitution] = useState(mockInstitution)
  const [commissionRates, setCommissionRates] = useState(mockCommissionRates)
  const [notifications, setNotifications] = useState({
    emailPayments: true,
    emailOverdue: true,
    smsReminders: false,
    pushNotifications: true
  })

  const tabs = [
    { id: 'profile', label: 'Profil', icon: User },
    { id: 'institution', label: 'Institution', icon: Building2 },
    { id: 'commissions', label: 'Commissions', icon: Percent },
    { id: 'users', label: 'Utilisateurs', icon: Users },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Sécurité', icon: Shield }
  ]

  const handleSaveInstitution = () => {
    // Logique de sauvegarde
    console.log('Sauvegarde des données de l\'institution:', institution)
  }

  const handleSaveNotifications = () => {
    // Logique de sauvegarde des notifications
    console.log('Sauvegarde des paramètres de notification:', notifications)
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          user={mockUser} 
          onMenuClick={() => setSidebarOpen(true)} 
        />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* En-tête */}
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900">Paramètres</h1>
              <p className="text-gray-600 mt-1">
                Gérez vos préférences et configurations
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Menu de navigation */}
              <div className="lg:col-span-1">
                <Card>
                  <CardContent className="p-4">
                    <nav className="space-y-2">
                      {tabs.map((tab) => {
                        const Icon = tab.icon
                        return (
                          <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                              activeTab === tab.id
                                ? 'bg-primary text-primary-foreground'
                                : 'hover:bg-gray-100'
                            }`}
                          >
                            <Icon className="h-4 w-4" />
                            <span className="text-sm font-medium">{tab.label}</span>
                          </button>
                        )
                      })}
                    </nav>
                  </CardContent>
                </Card>
              </div>

              {/* Contenu principal */}
              <div className="lg:col-span-3">
                {activeTab === 'profile' && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <User className="h-5 w-5" />
                        <span>Profil Personnel</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Nom complet</Label>
                          <Input defaultValue="Agent Principal" />
                        </div>
                        <div className="space-y-2">
                          <Label>Email</Label>
                          <Input defaultValue="agent@kredilakay.com" type="email" />
                        </div>
                        <div className="space-y-2">
                          <Label>Téléphone</Label>
                          <Input defaultValue="+509 1234-5678" />
                        </div>
                        <div className="space-y-2">
                          <Label>Rôle</Label>
                          <Select value="manager">
                            <option value="admin">Administrateur</option>
                            <option value="manager">Gestionnaire</option>
                            <option value="agent">Agent</option>
                          </Select>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h4 className="font-medium">Changer le mot de passe</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Mot de passe actuel</Label>
                            <Input type="password" />
                          </div>
                          <div className="space-y-2">
                            <Label>Nouveau mot de passe</Label>
                            <Input type="password" />
                          </div>
                        </div>
                      </div>
                      <Button className="flex items-center space-x-2">
                        <Save className="h-4 w-4" />
                        <span>Sauvegarder</span>
                      </Button>
                    </CardContent>
                  </Card>
                )}

                {activeTab === 'institution' && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Building2 className="h-5 w-5" />
                        <span>Informations de l'Institution</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Nom de l'institution</Label>
                          <Input 
                            value={institution.name}
                            onChange={(e) => setInstitution({...institution, name: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Numéro de licence</Label>
                          <Input 
                            value={institution.license}
                            onChange={(e) => setInstitution({...institution, license: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Téléphone</Label>
                          <Input 
                            value={institution.phone}
                            onChange={(e) => setInstitution({...institution, phone: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Email</Label>
                          <Input 
                            type="email"
                            value={institution.email}
                            onChange={(e) => setInstitution({...institution, email: e.target.value})}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Adresse complète</Label>
                        <Input 
                          value={institution.address}
                          onChange={(e) => setInstitution({...institution, address: e.target.value})}
                        />
                      </div>
                      <Button onClick={handleSaveInstitution} className="flex items-center space-x-2">
                        <Save className="h-4 w-4" />
                        <span>Sauvegarder</span>
                      </Button>
                    </CardContent>
                  </Card>
                )}

                {activeTab === 'commissions' && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Percent className="h-5 w-5" />
                          <span>Barème des Commissions</span>
                        </div>
                        <Button size="sm" className="flex items-center space-x-2">
                          <Plus className="h-4 w-4" />
                          <span>Ajouter</span>
                        </Button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Montant Min (HTG)</TableHead>
                            <TableHead>Montant Max (HTG)</TableHead>
                            <TableHead>Taux (%)</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {commissionRates.map((rate) => (
                            <TableRow key={rate.id}>
                              <TableCell>{rate.minAmount.toLocaleString()}</TableCell>
                              <TableCell>
                                {rate.maxAmount >= 999999999 ? '∞' : rate.maxAmount.toLocaleString()}
                              </TableCell>
                              <TableCell className="font-medium text-blue-600">
                                {rate.rate}%
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center space-x-2">
                                  <Button variant="ghost" size="icon">
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="icon">
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                        <h4 className="font-medium mb-2">Répartition des Commissions</h4>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">Part Agent:</span>
                            <span className="font-medium ml-2">60%</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Part Institution:</span>
                            <span className="font-medium ml-2">40%</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {activeTab === 'users' && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Users className="h-5 w-5" />
                          <span>Gestion des Utilisateurs</span>
                        </div>
                        <Button size="sm" className="flex items-center space-x-2">
                          <Plus className="h-4 w-4" />
                          <span>Inviter</span>
                        </Button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Nom</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Rôle</TableHead>
                            <TableHead>Statut</TableHead>
                            <TableHead>Dernière connexion</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {mockUsers.map((user) => (
                            <TableRow key={user.id}>
                              <TableCell className="font-medium">{user.name}</TableCell>
                              <TableCell>{user.email}</TableCell>
                              <TableCell>
                                <span className="capitalize">{user.role}</span>
                              </TableCell>
                              <TableCell>
                                <Badge variant={user.status === 'active' ? 'success' : 'secondary'}>
                                  {user.status === 'active' ? 'Actif' : 'Inactif'}
                                </Badge>
                              </TableCell>
                              <TableCell>{user.lastLogin}</TableCell>
                              <TableCell>
                                <div className="flex items-center space-x-2">
                                  <Button variant="ghost" size="icon">
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="icon">
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                )}

                {activeTab === 'notifications' && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Bell className="h-5 w-5" />
                        <span>Paramètres de Notification</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <h4 className="font-medium">Notifications par Email</h4>
                        <div className="space-y-3">
                          <label className="flex items-center space-x-3">
                            <input 
                              type="checkbox" 
                              checked={notifications.emailPayments}
                              onChange={(e) => setNotifications({...notifications, emailPayments: e.target.checked})}
                              className="rounded"
                            />
                            <div>
                              <p className="font-medium">Paiements reçus</p>
                              <p className="text-sm text-gray-500">Recevoir un email lors de chaque paiement</p>
                            </div>
                          </label>
                          <label className="flex items-center space-x-3">
                            <input 
                              type="checkbox" 
                              checked={notifications.emailOverdue}
                              onChange={(e) => setNotifications({...notifications, emailOverdue: e.target.checked})}
                              className="rounded"
                            />
                            <div>
                              <p className="font-medium">Prêts en retard</p>
                              <p className="text-sm text-gray-500">Alerte email pour les paiements en retard</p>
                            </div>
                          </label>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-medium">Notifications SMS</h4>
                        <div className="space-y-3">
                          <label className="flex items-center space-x-3">
                            <input 
                              type="checkbox" 
                              checked={notifications.smsReminders}
                              onChange={(e) => setNotifications({...notifications, smsReminders: e.target.checked})}
                              className="rounded"
                            />
                            <div>
                              <p className="font-medium">Rappels de paiement</p>
                              <p className="text-sm text-gray-500">SMS de rappel avant échéance</p>
                            </div>
                          </label>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-medium">Notifications Push</h4>
                        <div className="space-y-3">
                          <label className="flex items-center space-x-3">
                            <input 
                              type="checkbox" 
                              checked={notifications.pushNotifications}
                              onChange={(e) => setNotifications({...notifications, pushNotifications: e.target.checked})}
                              className="rounded"
                            />
                            <div>
                              <p className="font-medium">Notifications dans l'application</p>
                              <p className="text-sm text-gray-500">Recevoir des notifications push</p>
                            </div>
                          </label>
                        </div>
                      </div>

                      <Button onClick={handleSaveNotifications} className="flex items-center space-x-2">
                        <Save className="h-4 w-4" />
                        <span>Sauvegarder</span>
                      </Button>
                    </CardContent>
                  </Card>
                )}

                {activeTab === 'security' && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Shield className="h-5 w-5" />
                        <span>Sécurité</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <h4 className="font-medium">Authentification à deux facteurs (2FA)</h4>
                        <div className="p-4 border rounded-lg">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">2FA Activée</p>
                              <p className="text-sm text-gray-500">Protection supplémentaire de votre compte</p>
                            </div>
                            <Badge variant="success">Activé</Badge>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-medium">Sessions Actives</h4>
                        <div className="space-y-3">
                          <div className="p-3 border rounded-lg">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">Chrome sur Windows</p>
                                <p className="text-sm text-gray-500">192.168.1.100 • Maintenant</p>
                              </div>
                              <Badge variant="success">Actuelle</Badge>
                            </div>
                          </div>
                          <div className="p-3 border rounded-lg">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">Mobile Safari</p>
                                <p className="text-sm text-gray-500">192.168.1.105 • Il y a 2 heures</p>
                              </div>
                              <Button variant="outline" size="sm">
                                Révoquer
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-medium">Paramètres de Connexion</h4>
                        <div className="space-y-3">
                          <label className="flex items-center space-x-3">
                            <input type="checkbox" defaultChecked className="rounded" />
                            <div>
                              <p className="font-medium">Déconnexion automatique</p>
                              <p className="text-sm text-gray-500">Se déconnecter après 30 minutes d'inactivité</p>
                            </div>
                          </label>
                          <label className="flex items-center space-x-3">
                            <input type="checkbox" defaultChecked className="rounded" />
                            <div>
                              <p className="font-medium">Journalisation des connexions</p>
                              <p className="text-sm text-gray-500">Enregistrer les tentatives de connexion</p>
                            </div>
                          </label>
                        </div>
                      </div>

                      <Button className="flex items-center space-x-2">
                        <Save className="h-4 w-4" />
                        <span>Sauvegarder</span>
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

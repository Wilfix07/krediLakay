'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Plus, Search, Filter, Edit, UserX, UserCheck, Phone, Mail, MapPin, Calendar, Shield, Clock } from 'lucide-react'
import type { Client, Profile } from '@/lib/types'

interface MemberManagementProps {
  institutionId?: string
}

export function MemberManagement({ institutionId }: MemberManagementProps) {
  const [clients, setClients] = useState<Client[]>([])
  const [agents, setAgents] = useState<Profile[]>([])
  const [loading, setLoading] = useState(true)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [editingClient, setEditingClient] = useState<Client | null>(null)
  const [transferDialogOpen, setTransferDialogOpen] = useState(false)
  const [clientToTransfer, setClientToTransfer] = useState<Client | null>(null)

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    phone_secondary: '',
    address: '',
    address_work: '',
    date_of_birth: '',
    national_id: '',
    passport_number: '',
    driver_license: '',
    marital_status: '',
    employment_status: '',
    employer_name: '',
    monthly_income: 0,
    emergency_contact_name: '',
    emergency_contact_phone: '',
    emergency_contact_relationship: '',
    notes: ''
  })

  useEffect(() => {
    loadClients()
    loadAgents()
  }, [institutionId])

  const loadClients = async () => {
    setLoading(true)
    // This would call the API to get clients
    const mockClients: Client[] = [
      {
        id: '1',
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
        first_name: 'Marie',
        last_name: 'Dupont',
        email: 'marie.dupont@email.com',
        phone: '+509-1234-5678',
        phone_secondary: '+509-1234-5679',
        address: 'Port-au-Prince, Pétion-Ville',
        address_work: 'Centre Ville, Bureau 101',
        date_of_birth: '1985-03-15',
        national_id: 'ID123456789',
        passport_number: 'P123456789',
        driver_license: 'DL123456789',
        marital_status: 'married',
        employment_status: 'employed',
        employer_name: 'Banque Nationale',
        monthly_income: 45000,
        credit_score: 750,
        institution_id: institutionId || '1',
        agent_id: '2',
        kyc_status: 'approved',
        risk_level: 'low',
        notes: 'Client fiable avec historique de paiement excellent'
      },
      {
        id: '2',
        created_at: '2024-01-02T00:00:00Z',
        updated_at: '2024-01-02T00:00:00Z',
        first_name: 'Jean',
        last_name: 'Baptiste',
        email: 'jean.baptiste@email.com',
        phone: '+509-2345-6789',
        address: 'Cap-Haïtien, Centre-ville',
        date_of_birth: '1978-08-22',
        national_id: 'ID987654321',
        marital_status: 'married',
        employment_status: 'self_employed',
        employer_name: 'Entreprise individuelle',
        monthly_income: 35000,
        credit_score: 680,
        institution_id: institutionId || '1',
        agent_id: '2',
        kyc_status: 'pending',
        risk_level: 'medium',
        notes: 'En attente de vérification KYC'
      },
      {
        id: '3',
        created_at: '2024-01-03T00:00:00Z',
        updated_at: '2024-01-03T00:00:00Z',
        first_name: 'Claire',
        last_name: 'Michel',
        email: 'claire.michel@email.com',
        phone: '+509-3456-7890',
        address: 'Gonaïves, Raboteau',
        date_of_birth: '1990-12-05',
        national_id: 'ID456789123',
        marital_status: 'single',
        employment_status: 'employed',
        employer_name: 'Hôpital Général',
        monthly_income: 55000,
        credit_score: 820,
        institution_id: institutionId || '1',
        agent_id: '3',
        kyc_status: 'approved',
        risk_level: 'low',
        notes: 'Client VIP avec excellente solvabilité'
      }
    ]
    setClients(mockClients)
    setLoading(false)
  }

  const loadAgents = async () => {
    // This would call the API to get agents
    const mockAgents: Profile[] = [
      {
        id: '2',
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
        email: 'agent@kredilakay.com',
        full_name: 'Agent de Crédit',
        phone: '+509-2345-6789',
        role: 'agent',
        institution_id: institutionId || '1',
        employee_id: 'EMP002',
        is_active: true,
        department: 'Crédit',
        position: 'Agent Senior'
      },
      {
        id: '3',
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
        email: 'agent2@kredilakay.com',
        full_name: 'Agent Senior',
        phone: '+509-3456-7890',
        role: 'agent',
        institution_id: institutionId || '1',
        employee_id: 'EMP003',
        is_active: true,
        department: 'Crédit',
        position: 'Agent Principal'
      }
    ]
    setAgents(mockAgents)
  }

  const resetForm = () => {
    setFormData({
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      phone_secondary: '',
      address: '',
      address_work: '',
      date_of_birth: '',
      national_id: '',
      passport_number: '',
      driver_license: '',
      marital_status: '',
      employment_status: '',
      employer_name: '',
      monthly_income: 0,
      emergency_contact_name: '',
      emergency_contact_phone: '',
      emergency_contact_relationship: '',
      notes: ''
    })
    setEditingClient(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (editingClient) {
      // Update client
      setClients(prev => prev.map(client =>
        client.id === editingClient.id
          ? {
              ...client,
              ...formData,
              updated_at: new Date().toISOString()
            } as Client
          : client
      ))
    } else {
      // Create new client
      const newClient: Client = {
        id: Date.now().toString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        ...formData,
        marital_status: (formData.marital_status as Client['marital_status']) || undefined,
        employment_status: (formData.employment_status as Client['employment_status']) || undefined,
        institution_id: institutionId || '1',
        agent_id: agents[0]?.id || '1',
        kyc_status: 'pending',
        risk_level: 'medium',
        credit_score: 500
      }
      setClients(prev => [...prev, newClient])
    }

    setIsCreateDialogOpen(false)
    resetForm()
  }

  const handleEdit = (client: Client) => {
    setEditingClient(client)
    setFormData({
      first_name: client.first_name,
      last_name: client.last_name,
      email: client.email || '',
      phone: client.phone,
      phone_secondary: client.phone_secondary || '',
      address: client.address || '',
      address_work: client.address_work || '',
      date_of_birth: client.date_of_birth || '',
      national_id: client.national_id || '',
      passport_number: client.passport_number || '',
      driver_license: client.driver_license || '',
      marital_status: client.marital_status || '',
      employment_status: client.employment_status || '',
      employer_name: client.employer_name || '',
      monthly_income: client.monthly_income || 0,
      emergency_contact_name: client.emergency_contact_name || '',
      emergency_contact_phone: client.emergency_contact_phone || '',
      emergency_contact_relationship: client.emergency_contact_relationship || '',
      notes: client.notes || ''
    })
    setIsCreateDialogOpen(true)
  }

  const handleDeactivate = async (clientId: string) => {
    if (confirm('Êtes-vous sûr de vouloir désactiver ce membre?')) {
      setClients(prev => prev.map(client =>
        client.id === clientId
          ? { ...client, updated_at: new Date().toISOString() }
          : client
      ))
    }
  }

  const handleTransfer = async (client: Client, newAgentId: string) => {
    setClients(prev => prev.map(c =>
      c.id === client.id
        ? { ...c, agent_id: newAgentId, updated_at: new Date().toISOString() }
        : c
    ))
    setTransferDialogOpen(false)
    setClientToTransfer(null)
  }

  const getKycBadge = (status: string) => {
    const config = {
      approved: { label: 'Approuvé', variant: 'default' as const },
      pending: { label: 'En attente', variant: 'secondary' as const },
      rejected: { label: 'Rejeté', variant: 'destructive' as const }
    }
    return <Badge variant={config[status as keyof typeof config]?.variant || 'secondary'}>
      {config[status as keyof typeof config]?.label || status}
    </Badge>
  }

  const getRiskBadge = (level: string) => {
    const config = {
      low: { label: 'Faible', variant: 'default' as const },
      medium: { label: 'Moyen', variant: 'secondary' as const },
      high: { label: 'Élevé', variant: 'destructive' as const }
    }
    return <Badge variant={config[level as keyof typeof config]?.variant || 'secondary'}>
      {config[level as keyof typeof config]?.label || level}
    </Badge>
  }

  const clientStats = {
    total: clients.length,
    active: clients.filter(c => c.kyc_status === 'approved').length,
    pending: clients.filter(c => c.kyc_status === 'pending').length,
    highRisk: clients.filter(c => c.risk_level === 'high').length
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Chargement...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gestion des Membres</h2>
          <p className="text-gray-600">Administration complète de la base de membres</p>
        </div>

        <div className="flex space-x-2">
          <Dialog open={transferDialogOpen} onOpenChange={setTransferDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <UserCheck className="h-4 w-4 mr-2" />
                Transférer
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Transférer un Membre</DialogTitle>
              </DialogHeader>
              {clientToTransfer && (
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="font-semibold">
                      {clientToTransfer.first_name} {clientToTransfer.last_name}
                    </p>
                    <p className="text-sm text-gray-600">{clientToTransfer.phone}</p>
                  </div>

                  <div>
                    <Label>Nouvel Agent Responsable</Label>
                    <Select onValueChange={(value) => handleTransfer(clientToTransfer, value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un agent" />
                      </SelectTrigger>
                      <SelectContent>
                        {agents.map(agent => (
                          <SelectItem key={agent.id} value={agent.id}>
                            {agent.full_name} - {agent.position}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>

          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <Plus className="h-4 w-4 mr-2" />
                Nouveau Membre
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingClient ? 'Modifier le Membre' : 'Créer un Membre'}
                </DialogTitle>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="first_name">Prénom</Label>
                    <Input
                      id="first_name"
                      value={formData.first_name}
                      onChange={(e) => setFormData(prev => ({ ...prev, first_name: e.target.value }))}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="last_name">Nom de Famille</Label>
                    <Input
                      id="last_name"
                      value={formData.last_name}
                      onChange={(e) => setFormData(prev => ({ ...prev, last_name: e.target.value }))}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Téléphone Principal</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone_secondary">Téléphone Secondaire</Label>
                    <Input
                      id="phone_secondary"
                      value={formData.phone_secondary}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone_secondary: e.target.value }))}
                    />
                  </div>

                  <div>
                    <Label htmlFor="date_of_birth">Date de Naissance</Label>
                    <Input
                      id="date_of_birth"
                      type="date"
                      value={formData.date_of_birth}
                      onChange={(e) => setFormData(prev => ({ ...prev, date_of_birth: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="national_id">Numéro d'Identité Nationale</Label>
                    <Input
                      id="national_id"
                      value={formData.national_id}
                      onChange={(e) => setFormData(prev => ({ ...prev, national_id: e.target.value }))}
                    />
                  </div>

                  <div>
                    <Label htmlFor="passport_number">Numéro de Passeport</Label>
                    <Input
                      id="passport_number"
                      value={formData.passport_number}
                      onChange={(e) => setFormData(prev => ({ ...prev, passport_number: e.target.value }))}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="address">Adresse Résidentielle</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="marital_status">État Civil</Label>
                    <Select
                      value={formData.marital_status}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, marital_status: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="single">Célibataire</SelectItem>
                        <SelectItem value="married">Marié(e)</SelectItem>
                        <SelectItem value="divorced">Divorcé(e)</SelectItem>
                        <SelectItem value="widowed">Veuf/Veuve</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="employment_status">Statut d'Emploi</Label>
                    <Select
                      value={formData.employment_status}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, employment_status: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="employed">Employé</SelectItem>
                        <SelectItem value="self_employed">Indépendant</SelectItem>
                        <SelectItem value="unemployed">Sans emploi</SelectItem>
                        <SelectItem value="student">Étudiant</SelectItem>
                        <SelectItem value="retired">Retraité</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="employer_name">Nom de l'Employeur</Label>
                    <Input
                      id="employer_name"
                      value={formData.employer_name}
                      onChange={(e) => setFormData(prev => ({ ...prev, employer_name: e.target.value }))}
                    />
                  </div>

                  <div>
                    <Label htmlFor="monthly_income">Revenu Mensuel (HTG)</Label>
                    <Input
                      id="monthly_income"
                      type="number"
                      value={formData.monthly_income}
                      onChange={(e) => setFormData(prev => ({ ...prev, monthly_income: parseFloat(e.target.value) || 0 }))}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="notes">Notes Supplémentaires</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                    rows={3}
                  />
                </div>

                <div className="flex justify-end space-x-2 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsCreateDialogOpen(false)}
                  >
                    Annuler
                  </Button>
                  <Button type="submit">
                    {editingClient ? 'Modifier' : 'Créer'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="banking-stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="banking-stat-label">Total Membres</p>
              <p className="banking-stat-value">{clientStats.total}</p>
            </div>
            <Shield className="h-8 w-8 text-blue-500" />
          </div>
        </Card>

        <Card className="banking-stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="banking-stat-label">Membres Vérifiés</p>
              <p className="banking-stat-value">{clientStats.active}</p>
            </div>
            <UserCheck className="h-8 w-8 text-green-500" />
          </div>
        </Card>

        <Card className="banking-stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="banking-stat-label">En Attente KYC</p>
              <p className="banking-stat-value">{clientStats.pending}</p>
            </div>
            <Clock className="h-8 w-8 text-yellow-500" />
          </div>
        </Card>

        <Card className="banking-stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="banking-stat-label">Risque Élevé</p>
              <p className="banking-stat-value">{clientStats.highRisk}</p>
            </div>
            <UserX className="h-8 w-8 text-red-500" />
          </div>
        </Card>
      </div>

      {/* Members Table */}
      <Card className="banking-card">
        <CardHeader>
          <CardTitle>Liste des Membres</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Membre</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Statut KYC</TableHead>
                <TableHead>Niveau de Risque</TableHead>
                <TableHead>Agent Responsable</TableHead>
                <TableHead>Date d'Inscription</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clients.map((client) => {
                const agent = agents.find(a => a.id === client.agent_id)
                return (
                  <TableRow key={client.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">
                          {client.first_name} {client.last_name}
                        </p>
                        <p className="text-sm text-gray-500">ID: {client.national_id}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center text-sm">
                          <Phone className="h-3 w-3 mr-1" />
                          {client.phone}
                        </div>
                        {client.email && (
                          <div className="flex items-center text-sm">
                            <Mail className="h-3 w-3 mr-1" />
                            {client.email}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{getKycBadge(client.kyc_status)}</TableCell>
                    <TableCell>{getRiskBadge(client.risk_level)}</TableCell>
                    <TableCell>
                      <p className="text-sm">{agent?.full_name || 'Non assigné'}</p>
                    </TableCell>
                    <TableCell>
                      {new Date(client.created_at).toLocaleDateString('fr-HT')}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(client)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setClientToTransfer(client)
                            setTransferDialogOpen(true)
                          }}
                        >
                          <UserCheck className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeactivate(client.id)}
                        >
                          <UserX className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

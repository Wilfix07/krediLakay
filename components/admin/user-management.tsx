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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Plus, Search, Filter, Edit, Trash2, Shield, Users, Settings, Activity } from 'lucide-react'
import type { Profile, Institution } from '@/lib/types'

interface UserManagementProps {
  institutionId?: string
}

export function UserManagement({ institutionId }: UserManagementProps) {
  const [users, setUsers] = useState<Profile[]>([])
  const [institutions, setInstitutions] = useState<Institution[]>([])
  const [loading, setLoading] = useState(true)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<Profile | null>(null)
  const [activeTab, setActiveTab] = useState('users')

  const [formData, setFormData] = useState<{
    full_name: string
    email: string
    phone: string
    role: 'super_admin' | 'admin' | 'manager' | 'agent' | 'cashier'
    institution_id: string
    employee_id: string
    department: string
    position: string
    commission_rate: number
    salary: number
    hire_date: string
  }>({
    full_name: '',
    email: '',
    phone: '',
    role: 'agent',
    institution_id: institutionId || '',
    employee_id: '',
    department: '',
    position: '',
    commission_rate: 0,
    salary: 0,
    hire_date: ''
  })

  useEffect(() => {
    loadUsers()
    loadInstitutions()
  }, [institutionId])

  const loadUsers = async () => {
    setLoading(true)
    // This would call the API to get users
    // For now, we'll use mock data
    const mockUsers: Profile[] = [
      {
        id: '1',
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
        email: 'admin@kredilakay.com',
        full_name: 'Administrateur Principal',
        phone: '+509-1234-5678',
        role: 'super_admin',
        institution_id: '1',
        employee_id: 'EMP001',
        hire_date: '2024-01-01',
        salary: 50000,
        commission_rate: 0,
        is_active: true,
        department: 'Administration',
        position: 'Directeur Général'
      },
      {
        id: '2',
        created_at: '2024-01-02T00:00:00Z',
        updated_at: '2024-01-02T00:00:00Z',
        email: 'agent@kredilakay.com',
        full_name: 'Agent de Crédit',
        phone: '+509-2345-6789',
        role: 'agent',
        institution_id: '1',
        employee_id: 'EMP002',
        hire_date: '2024-01-02',
        salary: 30000,
        commission_rate: 5,
        is_active: true,
        department: 'Crédit',
        position: 'Agent Senior'
      },
      {
        id: '3',
        created_at: '2024-01-03T00:00:00Z',
        updated_at: '2024-01-03T00:00:00Z',
        email: 'caissier@kredilakay.com',
        full_name: 'Caissier',
        phone: '+509-3456-7890',
        role: 'cashier',
        institution_id: '1',
        employee_id: 'EMP003',
        hire_date: '2024-01-03',
        salary: 25000,
        commission_rate: 2,
        is_active: true,
        department: 'Finance',
        position: 'Caissier Principal'
      }
    ]
    setUsers(mockUsers)
    setLoading(false)
  }

  const loadInstitutions = async () => {
    // This would call the API to get institutions
    const mockInstitutions: Institution[] = [
      {
        id: '1',
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
        name: 'KrediLakay Institution',
        address: '123 Rue Main, Port-au-Prince',
        phone: '+509-1234-5678',
        email: 'info@kredilakay.com',
        license_number: 'LIC-001'
      }
    ]
    setInstitutions(mockInstitutions)
  }

  const resetForm = () => {
    setFormData({
      full_name: '',
      email: '',
      phone: '',
      role: 'agent',
      institution_id: institutionId || '',
      employee_id: '',
      department: '',
      position: '',
      commission_rate: 0,
      salary: 0,
      hire_date: ''
    })
    setEditingUser(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (editingUser) {
      // Update user
      setUsers(prev => prev.map(user =>
        user.id === editingUser.id
          ? { ...user, ...formData, updated_at: new Date().toISOString() }
          : user
      ))
    } else {
      // Create new user
      const newUser: Profile = {
        id: Date.now().toString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        ...formData,
        is_active: true
      }
      setUsers(prev => [...prev, newUser])
    }

    setIsCreateDialogOpen(false)
    resetForm()
  }

  const handleEdit = (user: Profile) => {
    setEditingUser(user)
    setFormData({
      full_name: user.full_name,
      email: user.email,
      phone: user.phone || '',
      role: user.role,
      institution_id: user.institution_id,
      employee_id: user.employee_id || '',
      department: user.department || '',
      position: user.position || '',
      commission_rate: user.commission_rate || 0,
      salary: user.salary || 0,
      hire_date: user.hire_date || ''
    })
    setIsCreateDialogOpen(true)
  }

  const handleDelete = async (userId: string) => {
    if (confirm('Êtes-vous sûr de vouloir désactiver cet utilisateur?')) {
      setUsers(prev => prev.map(user =>
        user.id === userId
          ? { ...user, is_active: false, updated_at: new Date().toISOString() }
          : user
      ))
    }
  }

  const handleToggleActive = async (userId: string) => {
    setUsers(prev => prev.map(user =>
      user.id === userId
        ? { ...user, is_active: !user.is_active, updated_at: new Date().toISOString() }
        : user
    ))
  }

  const getRoleBadge = (role: string) => {
    const roleConfig = {
      super_admin: { label: 'Super Admin', variant: 'destructive' as const },
      admin: { label: 'Administrateur', variant: 'default' as const },
      manager: { label: 'Manager', variant: 'secondary' as const },
      agent: { label: 'Agent', variant: 'outline' as const },
      cashier: { label: 'Caissier', variant: 'outline' as const }
    }

    const config = roleConfig[role as keyof typeof roleConfig] || { label: role, variant: 'outline' as const }
    return <Badge variant={config.variant}>{config.label}</Badge>
  }

  const getStatusBadge = (isActive: boolean) => {
    return (
      <Badge variant={isActive ? 'default' : 'secondary'}>
        {isActive ? 'Actif' : 'Inactif'}
      </Badge>
    )
  }

  const filteredUsers = users.filter(user => {
    if (institutionId && user.institution_id !== institutionId) return false
    return true
  })

  const userStats = {
    total: filteredUsers.length,
    active: filteredUsers.filter(u => u.is_active).length,
    byRole: filteredUsers.reduce((acc, user) => {
      acc[user.role] = (acc[user.role] || 0) + 1
      return acc
    }, {} as Record<string, number>)
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
          <h2 className="text-2xl font-bold text-gray-900">Gestion des Utilisateurs</h2>
          <p className="text-gray-600">Administration des utilisateurs et rôles du système</p>
        </div>

        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="h-4 w-4 mr-2" />
              Nouvel Utilisateur
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingUser ? 'Modifier l\'Utilisateur' : 'Créer un Utilisateur'}
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="full_name">Nom Complet</Label>
                  <Input
                    id="full_name"
                    value={formData.full_name}
                    onChange={(e) => setFormData(prev => ({ ...prev, full_name: e.target.value }))}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  />
                </div>

                <div>
                  <Label htmlFor="employee_id">ID Employé</Label>
                  <Input
                    id="employee_id"
                    value={formData.employee_id}
                    onChange={(e) => setFormData(prev => ({ ...prev, employee_id: e.target.value }))}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="role">Rôle</Label>
                  <Select
                    value={formData.role}
                    onValueChange={(value: any) => setFormData(prev => ({ ...prev, role: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="super_admin">Super Administrateur</SelectItem>
                      <SelectItem value="admin">Administrateur</SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                      <SelectItem value="agent">Agent</SelectItem>
                      <SelectItem value="cashier">Caissier</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="institution_id">Institution</Label>
                  <Select
                    value={formData.institution_id}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, institution_id: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner l'institution" />
                    </SelectTrigger>
                    <SelectContent>
                      {institutions.map(inst => (
                        <SelectItem key={inst.id} value={inst.id}>
                          {inst.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="department">Département</Label>
                  <Input
                    id="department"
                    value={formData.department}
                    onChange={(e) => setFormData(prev => ({ ...prev, department: e.target.value }))}
                  />
                </div>

                <div>
                  <Label htmlFor="position">Poste</Label>
                  <Input
                    id="position"
                    value={formData.position}
                    onChange={(e) => setFormData(prev => ({ ...prev, position: e.target.value }))}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="salary">Salaire Mensuel (HTG)</Label>
                  <Input
                    id="salary"
                    type="number"
                    value={formData.salary}
                    onChange={(e) => setFormData(prev => ({ ...prev, salary: parseFloat(e.target.value) || 0 }))}
                  />
                </div>

                <div>
                  <Label htmlFor="commission_rate">Taux de Commission (%)</Label>
                  <Input
                    id="commission_rate"
                    type="number"
                    step="0.01"
                    value={formData.commission_rate}
                    onChange={(e) => setFormData(prev => ({ ...prev, commission_rate: parseFloat(e.target.value) || 0 }))}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="hire_date">Date d'Embauche</Label>
                <Input
                  id="hire_date"
                  type="date"
                  value={formData.hire_date}
                  onChange={(e) => setFormData(prev => ({ ...prev, hire_date: e.target.value }))}
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
                  {editingUser ? 'Modifier' : 'Créer'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="banking-stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="banking-stat-label">Total Utilisateurs</p>
              <p className="banking-stat-value">{userStats.total}</p>
            </div>
            <Users className="h-8 w-8 text-blue-500" />
          </div>
        </Card>

        <Card className="banking-stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="banking-stat-label">Utilisateurs Actifs</p>
              <p className="banking-stat-value">{userStats.active}</p>
            </div>
            <Activity className="h-8 w-8 text-green-500" />
          </div>
        </Card>

        <Card className="banking-stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="banking-stat-label">Agents</p>
              <p className="banking-stat-value">{userStats.byRole.agent || 0}</p>
            </div>
            <Shield className="h-8 w-8 text-purple-500" />
          </div>
        </Card>

        <Card className="banking-stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="banking-stat-label">Caissiers</p>
              <p className="banking-stat-value">{userStats.byRole.cashier || 0}</p>
            </div>
            <Settings className="h-8 w-8 text-orange-500" />
          </div>
        </Card>
      </div>

      {/* Users Table */}
      <Card className="banking-card">
        <CardHeader>
          <CardTitle>Liste des Utilisateurs</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Utilisateur</TableHead>
                <TableHead>Rôle</TableHead>
                <TableHead>Département</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Date d'Embauche</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{user.full_name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                      {user.employee_id && (
                        <p className="text-xs text-gray-400">ID: {user.employee_id}</p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{getRoleBadge(user.role)}</TableCell>
                  <TableCell>
                    <div>
                      <p className="text-sm">{user.department}</p>
                      <p className="text-xs text-gray-500">{user.position}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm">{user.phone}</p>
                  </TableCell>
                  <TableCell>{getStatusBadge(user.is_active)}</TableCell>
                  <TableCell>
                    {user.hire_date ? new Date(user.hire_date).toLocaleDateString('fr-HT') : '-'}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(user)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleToggleActive(user.id)}
                      >
                        {user.is_active ? (
                          <Trash2 className="h-4 w-4 text-red-500" />
                        ) : (
                          <Activity className="h-4 w-4 text-green-500" />
                        )}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

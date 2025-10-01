'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { Plus, Edit, Trash2, Calculator } from 'lucide-react'
import { loanTypesApi } from '@/lib/api'
import { formatCurrency } from '@/lib/utils'
import type { LoanType, CreateLoanTypeData } from '@/lib/types'

export function LoanTypesManager() {
  const [loanTypes, setLoanTypes] = useState<LoanType[]>([])
  const [loading, setLoading] = useState(true)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [editingType, setEditingType] = useState<LoanType | null>(null)

  const [formData, setFormData] = useState<CreateLoanTypeData>({
    name: '',
    code: '',
    description: '',
    payment_frequency: 'monthly',
    min_amount: 0,
    max_amount: 0,
    min_term_days: 30,
    max_term_days: 365,
    interest_rate: 0,
    penalty_rate: 0
  })

  useEffect(() => {
    loadLoanTypes()
  }, [])

  const loadLoanTypes = async () => {
    setLoading(true)
    const response = await loanTypesApi.getAll()
    if (response.data) {
      setLoanTypes(response.data)
    }
    setLoading(false)
  }

  const resetForm = () => {
    setFormData({
      name: '',
      code: '',
      description: '',
      payment_frequency: 'monthly',
      min_amount: 0,
      max_amount: 0,
      min_term_days: 30,
      max_term_days: 365,
      interest_rate: 0,
      penalty_rate: 0
    })
    setEditingType(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (editingType) {
      const response = await loanTypesApi.update(editingType.id, formData)
      if (response.data) {
        setLoanTypes(prev => prev.map(type =>
          type.id === editingType.id ? response.data! : type
        ))
        setIsCreateDialogOpen(false)
        resetForm()
      }
    } else {
      const response = await loanTypesApi.create(formData)
      if (response.data) {
        setLoanTypes(prev => [response.data!, ...prev])
        setIsCreateDialogOpen(false)
        resetForm()
      }
    }
  }

  const handleEdit = (type: LoanType) => {
    setEditingType(type)
    setFormData({
      name: type.name,
      code: type.code,
      description: type.description || '',
      payment_frequency: type.payment_frequency,
      min_amount: type.min_amount,
      max_amount: type.max_amount,
      min_term_days: type.min_term_days,
      max_term_days: type.max_term_days,
      interest_rate: type.interest_rate,
      penalty_rate: type.penalty_rate || 0
    })
    setIsCreateDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce type de prêt?')) {
      const response = await loanTypesApi.delete(id)
      if (response.error) {
        alert('Erreur lors de la suppression: ' + response.error)
      } else {
        setLoanTypes(prev => prev.filter(type => type.id !== id))
      }
    }
  }

  const formatFrequency = (frequency: string) => {
    const map: Record<string, string> = {
      daily: 'Quotidien',
      weekly: 'Hebdomadaire',
      biweekly: 'Bi-hebdomadaire',
      monthly: 'Mensuel'
    }
    return map[frequency] || frequency
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
          <h2 className="text-2xl font-bold text-gray-900">Types de Prêts</h2>
          <p className="text-gray-600">Gérez les différents produits de prêt disponibles</p>
        </div>

        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="h-4 w-4 mr-2" />
              Nouveau Type
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingType ? 'Modifier le Type de Prêt' : 'Créer un Type de Prêt'}
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nom du Produit</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="code">Code</Label>
                  <Input
                    id="code"
                    value={formData.code}
                    onChange={(e) => setFormData(prev => ({ ...prev, code: e.target.value.toUpperCase() }))}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="payment_frequency">Fréquence de Paiement</Label>
                  <Select
                    value={formData.payment_frequency}
                    onValueChange={(value: any) => setFormData(prev => ({ ...prev, payment_frequency: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Quotidien</SelectItem>
                      <SelectItem value="weekly">Hebdomadaire</SelectItem>
                      <SelectItem value="biweekly">Bi-hebdomadaire</SelectItem>
                      <SelectItem value="monthly">Mensuel</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="interest_rate">Taux d'Intérêt (%)</Label>
                  <Input
                    id="interest_rate"
                    type="number"
                    step="0.01"
                    value={formData.interest_rate}
                    onChange={(e) => setFormData(prev => ({ ...prev, interest_rate: parseFloat(e.target.value) || 0 }))}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="min_amount">Montant Minimum (HTG)</Label>
                  <Input
                    id="min_amount"
                    type="number"
                    value={formData.min_amount}
                    onChange={(e) => setFormData(prev => ({ ...prev, min_amount: parseFloat(e.target.value) || 0 }))}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="max_amount">Montant Maximum (HTG)</Label>
                  <Input
                    id="max_amount"
                    type="number"
                    value={formData.max_amount}
                    onChange={(e) => setFormData(prev => ({ ...prev, max_amount: parseFloat(e.target.value) || 0 }))}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="min_term_days">Durée Minimum (jours)</Label>
                  <Input
                    id="min_term_days"
                    type="number"
                    value={formData.min_term_days}
                    onChange={(e) => setFormData(prev => ({ ...prev, min_term_days: parseInt(e.target.value) || 0 }))}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="max_term_days">Durée Maximum (jours)</Label>
                  <Input
                    id="max_term_days"
                    type="number"
                    value={formData.max_term_days}
                    onChange={(e) => setFormData(prev => ({ ...prev, max_term_days: parseInt(e.target.value) || 0 }))}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="penalty_rate">Taux Pénalité (%)</Label>
                <Input
                  id="penalty_rate"
                  type="number"
                  step="0.01"
                  value={formData.penalty_rate}
                  onChange={(e) => setFormData(prev => ({ ...prev, penalty_rate: parseFloat(e.target.value) || 0 }))}
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
                  {editingType ? 'Modifier' : 'Créer'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loanTypes.map((type) => (
          <Card key={type.id} className="banking-card">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{type.name}</CardTitle>
                <Badge variant={type.is_active ? 'default' : 'secondary'}>
                  {type.is_active ? 'Actif' : 'Inactif'}
                </Badge>
              </div>
              <p className="text-sm text-gray-600">{type.description}</p>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Fréquence</p>
                  <p className="font-semibold">{formatFrequency(type.payment_frequency)}</p>
                </div>
                <div>
                  <p className="text-gray-600">Taux</p>
                  <p className="font-semibold">{type.interest_rate}%</p>
                </div>
                <div>
                  <p className="text-gray-600">Montant</p>
                  <p className="font-semibold">
                    {formatCurrency(type.min_amount)} - {formatCurrency(type.max_amount)}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Durée</p>
                  <p className="font-semibold">
                    {type.min_term_days} - {type.max_term_days} jours
                  </p>
                </div>
              </div>

              <div className="flex space-x-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(type)}
                  className="flex-1"
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Modifier
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(type.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {loanTypes.length === 0 && (
        <div className="text-center py-12">
          <Calculator className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun type de prêt</h3>
          <p className="text-gray-600 mb-4">
            Créez votre premier type de prêt pour commencer à proposer des produits à vos clients.
          </p>
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Créer le Premier Type
          </Button>
        </div>
      )}
    </div>
  )
}

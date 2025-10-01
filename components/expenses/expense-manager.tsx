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
import { Plus, Search, Filter, Edit, Trash2, TrendingUp, TrendingDown, DollarSign, Calendar, Receipt } from 'lucide-react'
import { formatCurrency, formatDate } from '@/lib/utils'

interface Expense {
  id: string
  created_at: string
  amount: number
  category: string
  description: string
  expense_date: string
  agent_id?: string
  approved_by?: string
  approved_at?: string
  status: 'pending' | 'approved' | 'rejected'
  receipt_url?: string
  notes?: string
}

interface ExpenseManagerProps {
  agentId?: string
}

export function ExpenseManager({ agentId }: ExpenseManagerProps) {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [loading, setLoading] = useState(true)
  const [isExpenseDialogOpen, setIsExpenseDialogOpen] = useState(false)

  const [formData, setFormData] = useState({
    amount: 0,
    category: '',
    description: '',
    expense_date: new Date().toISOString().split('T')[0],
    notes: '',
    receipt_url: ''
  })

  useEffect(() => {
    loadExpenses()
  }, [agentId])

  const loadExpenses = async () => {
    setLoading(true)
    // This would call the API to get expenses
    const mockExpenses: Expense[] = [
      {
        id: '1',
        created_at: '2024-01-20T10:00:00Z',
        amount: 2500,
        category: 'transport',
        description: 'Transport pour visite client',
        expense_date: '2024-01-20',
        agent_id: '2',
        status: 'approved',
        approved_by: '1',
        approved_at: '2024-01-20T14:00:00Z',
        notes: 'Déplacement en ville pour rencontrer 3 clients'
      },
      {
        id: '2',
        created_at: '2024-01-19T15:30:00Z',
        amount: 1500,
        category: 'office_supplies',
        description: 'Achat de fournitures de bureau',
        expense_date: '2024-01-19',
        agent_id: '2',
        status: 'pending',
        notes: 'Papier, stylos, et classeurs pour le bureau'
      },
      {
        id: '3',
        created_at: '2024-01-18T09:15:00Z',
        amount: 5000,
        category: 'marketing',
        description: 'Campagne publicitaire locale',
        expense_date: '2024-01-18',
        status: 'approved',
        approved_by: '1',
        approved_at: '2024-01-18T16:00:00Z',
        notes: 'Distribution de flyers dans le quartier'
      }
    ]
    setExpenses(mockExpenses)
    setLoading(false)
  }

  const resetForm = () => {
    setFormData({
      amount: 0,
      category: '',
      description: '',
      expense_date: new Date().toISOString().split('T')[0],
      notes: '',
      receipt_url: ''
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.amount || !formData.category || !formData.description) return

    const newExpense: Expense = {
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
      amount: formData.amount,
      category: formData.category,
      description: formData.description,
      expense_date: formData.expense_date,
      agent_id: agentId,
      status: 'pending',
      notes: formData.notes,
      receipt_url: formData.receipt_url
    }

    setExpenses(prev => [newExpense, ...prev])
    setIsExpenseDialogOpen(false)
    resetForm()
  }

  const handleApprove = async (expenseId: string) => {
    setExpenses(prev => prev.map(expense =>
      expense.id === expenseId
        ? {
            ...expense,
            status: 'approved' as const,
            approved_by: '1', // Current admin user
            approved_at: new Date().toISOString()
          }
        : expense
    ))
  }

  const handleReject = async (expenseId: string) => {
    setExpenses(prev => prev.map(expense =>
      expense.id === expenseId
        ? { ...expense, status: 'rejected' as const }
        : expense
    ))
  }

  const getCategoryLabel = (category: string) => {
    const categories = {
      transport: 'Transport',
      office_supplies: 'Fournitures de bureau',
      marketing: 'Marketing',
      meals: 'Repas',
      communication: 'Communication',
      training: 'Formation',
      maintenance: 'Maintenance',
      other: 'Autre'
    }
    return categories[category as keyof typeof categories] || category
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-100 text-green-800">Approuvé</Badge>
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800">Rejeté</Badge>
      default:
        return <Badge className="bg-yellow-100 text-yellow-800">En attente</Badge>
    }
  }

  const expenseStats = {
    total: expenses.length,
    approved: expenses.filter(e => e.status === 'approved').length,
    pending: expenses.filter(e => e.status === 'pending').length,
    totalAmount: expenses.reduce((sum, e) => sum + e.amount, 0),
    thisMonth: expenses
      .filter(e => e.expense_date.startsWith(new Date().toISOString().slice(0, 7)))
      .reduce((sum, e) => sum + e.amount, 0)
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
          <h2 className="text-2xl font-bold text-gray-900">Gestion des Dépenses</h2>
          <p className="text-gray-600">Suivi et approbation des dépenses des agents</p>
        </div>

        <Dialog open={isExpenseDialogOpen} onOpenChange={setIsExpenseDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="h-4 w-4 mr-2" />
              Nouvelle Dépense
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <Receipt className="h-5 w-5 mr-2" />
                Ajouter une Dépense
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="amount">Montant (HTG)</Label>
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    value={formData.amount}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      amount: parseFloat(e.target.value) || 0
                    }))}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="category">Catégorie</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner une catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="transport">Transport</SelectItem>
                      <SelectItem value="office_supplies">Fournitures de bureau</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="meals">Repas</SelectItem>
                      <SelectItem value="communication">Communication</SelectItem>
                      <SelectItem value="training">Formation</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                      <SelectItem value="other">Autre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Décrivez la nature de la dépense"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expense_date">Date de la Dépense</Label>
                  <Input
                    id="expense_date"
                    type="date"
                    value={formData.expense_date}
                    onChange={(e) => setFormData(prev => ({ ...prev, expense_date: e.target.value }))}
                  />
                </div>

                <div>
                  <Label htmlFor="receipt_url">URL du Reçu (optionnel)</Label>
                  <Input
                    id="receipt_url"
                    value={formData.receipt_url}
                    onChange={(e) => setFormData(prev => ({ ...prev, receipt_url: e.target.value }))}
                    placeholder="https://..."
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
                  placeholder="Contexte ou justification de la dépense..."
                />
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsExpenseDialogOpen(false)}
                >
                  Annuler
                </Button>
                <Button type="submit">
                  Ajouter la Dépense
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
              <p className="banking-stat-label">Total Dépenses</p>
              <p className="banking-stat-value">{expenseStats.total}</p>
            </div>
            <Receipt className="h-8 w-8 text-blue-500" />
          </div>
        </Card>

        <Card className="banking-stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="banking-stat-label">Approuvées</p>
              <p className="banking-stat-value">{expenseStats.approved}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-500" />
          </div>
        </Card>

        <Card className="banking-stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="banking-stat-label">En Attente</p>
              <p className="banking-stat-value">{expenseStats.pending}</p>
            </div>
            <Calendar className="h-8 w-8 text-yellow-500" />
          </div>
        </Card>

        <Card className="banking-stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="banking-stat-label">Montant Total</p>
              <p className="banking-stat-value">{formatCurrency(expenseStats.totalAmount)}</p>
            </div>
            <DollarSign className="h-8 w-8 text-purple-500" />
          </div>
        </Card>
      </div>

      {/* Expenses Table */}
      <Card className="banking-card">
        <CardHeader>
          <CardTitle>Liste des Dépenses</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Catégorie</TableHead>
                <TableHead>Montant</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {expenses.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell>{formatDate(expense.expense_date)}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{expense.description}</p>
                      {expense.notes && (
                        <p className="text-sm text-gray-500">{expense.notes}</p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {getCategoryLabel(expense.category)}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-semibold">
                    {formatCurrency(expense.amount)}
                  </TableCell>
                  <TableCell>{getStatusBadge(expense.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {expense.status === 'pending' && (
                        <>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleApprove(expense.id)}
                            className="text-green-600 hover:text-green-700"
                          >
                            <TrendingUp className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleReject(expense.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <TrendingDown className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Monthly Summary */}
      <Card className="banking-card">
        <CardHeader>
          <CardTitle>Résumé Mensuel</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">Dépenses ce Mois</p>
              <p className="text-2xl font-bold text-blue-600">
                {formatCurrency(expenseStats.thisMonth)}
              </p>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">Moyenne par Jour</p>
              <p className="text-2xl font-bold text-green-600">
                {formatCurrency(expenseStats.thisMonth / new Date().getDate())}
              </p>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">Catégorie Principale</p>
              <p className="text-lg font-semibold text-purple-600">
                {(() => {
                  const categoryTotals = expenses.reduce((acc, expense) => {
                    acc[expense.category] = (acc[expense.category] || 0) + expense.amount
                    return acc
                  }, {} as Record<string, number>)

                  const topCategory = Object.entries(categoryTotals)
                    .sort(([,a], [,b]) => b - a)[0]

                  return topCategory ? getCategoryLabel(topCategory[0]) : 'N/A'
                })()}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

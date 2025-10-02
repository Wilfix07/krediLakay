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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Receipt, Plus, Search, DollarSign, CreditCard, Smartphone, Building, Calculator, Download, Eye } from 'lucide-react'
import { formatCurrency, formatDate } from '@/lib/utils'
import type { Payment, Loan, Client } from '@/lib/types'

interface PaymentProcessorProps {
  loanId?: string
  onPaymentProcessed?: (payment: Payment) => void
}

export function PaymentProcessor({ loanId, onPaymentProcessed }: PaymentProcessorProps) {
  const [loans, setLoans] = useState<Loan[]>([])
  const [clients, setClients] = useState<Client[]>([])
  const [payments, setPayments] = useState<Payment[]>([])
  const [loading, setLoading] = useState(true)
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false)
  const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null)

  const [paymentForm, setPaymentForm] = useState({
    loan_id: loanId || '',
    amount: 0,
    principal_paid: 0,
    interest_paid: 0,
    penalty_paid: 0,
    payment_date: new Date().toISOString().split('T')[0],
    payment_method: 'cash',
    payment_channel: 'cashier',
    reference_number: '',
    notes: '',
    receipt_number: ''
  })

  useEffect(() => {
    loadLoans()
    loadClients()
    loadPayments()
  }, [])

  useEffect(() => {
    if (loanId) {
      const loan = loans.find(l => l.id === loanId)
      setSelectedLoan(loan || null)
      setPaymentForm(prev => ({ ...prev, loan_id: loanId }))
    }
  }, [loanId, loans])

  const loadLoans = async () => {
    // This would call the API to get active loans
    const mockLoans: Loan[] = [
      {
        id: '1',
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
        loan_number: 'LN-2024-0001',
        client_id: '1',
        agent_id: '2',
        institution_id: '1',
        loan_type_id: '1',
        amount: 50000,
        interest_rate: 15,
        term_days: 90,
        payment_frequency: 'monthly',
        status: 'active',
        application_date: '2024-01-01',
        principal_amount: 50000,
        interest_amount: 7500,
        total_amount: 57500,
        paid_amount: 10000,
        remaining_balance: 47500,
        commission_rate: 5,
        commission_amount: 2500,
        penalty_amount: 0,
        fees_amount: 0,
        insurance_amount: 0,
        next_payment_date: '2024-02-01',
        next_payment_amount: 6375,
        days_overdue: 0,
        risk_rating: 'low',
        notes: 'Prêt personnel pour développement commercial'
      },
      {
        id: '2',
        created_at: '2024-01-02T00:00:00Z',
        updated_at: '2024-01-02T00:00:00Z',
        loan_number: 'LN-2024-0002',
        client_id: '2',
        agent_id: '2',
        institution_id: '1',
        loan_type_id: '2',
        amount: 75000,
        interest_rate: 12,
        term_days: 180,
        payment_frequency: 'weekly',
        status: 'active',
        application_date: '2024-01-02',
        principal_amount: 75000,
        interest_amount: 9000,
        total_amount: 84000,
        paid_amount: 20000,
        remaining_balance: 64000,
        commission_rate: 4,
        commission_amount: 3000,
        penalty_amount: 500,
        fees_amount: 0,
        insurance_amount: 0,
        next_payment_date: '2024-01-25',
        next_payment_amount: 4800,
        days_overdue: 5,
        risk_rating: 'medium',
        notes: 'Prêt pour équipement agricole'
      }
    ]
    setLoans(mockLoans)
  }

  const loadClients = async () => {
    // This would call the API to get clients
    const mockClients: Client[] = [
      {
        id: '1',
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
        first_name: 'Marie',
        last_name: 'Dupont',
        phone: '+509-1234-5678',
        institution_id: '1',
        agent_id: '2',
        kyc_status: 'approved',
        risk_level: 'low'
      },
      {
        id: '2',
        created_at: '2024-01-02T00:00:00Z',
        updated_at: '2024-01-02T00:00:00Z',
        first_name: 'Jean',
        last_name: 'Baptiste',
        phone: '+509-2345-6789',
        institution_id: '1',
        agent_id: '2',
        kyc_status: 'approved',
        risk_level: 'medium'
      }
    ]
    setClients(mockClients)
  }

  const loadPayments = async () => {
    // This would call the API to get recent payments
    const mockPayments: Payment[] = [
      {
        id: '1',
        created_at: '2024-01-20T10:00:00Z',
        loan_id: '1',
        amount: 6375,
        principal_paid: 5000,
        interest_paid: 1375,
        penalty_paid: 0,
        payment_date: '2024-01-20',
        payment_method: 'cash',
        payment_channel: 'cashier',
        reference_number: 'REC-2024-001',
        receipt_number: 'RCP-001',
        agent_id: '2',
        is_reversal: false,
        notes: 'Paiement mensuel régulier'
      }
    ]
    setPayments(mockPayments)
  }

  const resetForm = () => {
    setPaymentForm({
      loan_id: loanId || '',
      amount: 0,
      principal_paid: 0,
      interest_paid: 0,
      penalty_paid: 0,
      payment_date: new Date().toISOString().split('T')[0],
      payment_method: 'cash',
      payment_channel: 'cashier',
      reference_number: '',
      notes: '',
      receipt_number: ''
    })
  }

  const calculatePayment = () => {
    if (!selectedLoan) return

    const totalAmount = paymentForm.principal_paid + paymentForm.interest_paid + paymentForm.penalty_paid
    setPaymentForm(prev => ({
      ...prev,
      amount: totalAmount,
      reference_number: `PAY-${Date.now()}`
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted with data:', paymentForm)

    // Validate form
    if (!paymentForm.loan_id) {
      alert('Veuillez sélectionner un prêt')
      return
    }

    if (paymentForm.amount <= 0) {
      alert('Le montant doit être supérieur à 0')
      return
    }

    if (!paymentForm.payment_method) {
      alert('Veuillez sélectionner une méthode de paiement')
      return
    }

    console.log('Form validation passed, processing payment...')

    try {
      // Create the payment object
      const newPayment: Payment = {
        id: Date.now().toString(),
        created_at: new Date().toISOString(),
        loan_id: paymentForm.loan_id,
        amount: paymentForm.amount,
        principal_paid: paymentForm.principal_paid,
        interest_paid: paymentForm.interest_paid,
        penalty_paid: paymentForm.penalty_paid,
        payment_date: paymentForm.payment_date,
        payment_method: paymentForm.payment_method as any,
        payment_channel: paymentForm.payment_channel as any,
        reference_number: paymentForm.reference_number || `PAY-${Date.now()}`,
        receipt_number: `RCP-${Date.now()}`,
        agent_id: '2', // Current user
        is_reversal: false,
        notes: paymentForm.notes
      }

      // Add to local state for immediate UI feedback
      setPayments(prev => [newPayment, ...prev])

      // Update loan balance
      const selectedLoanData = loans.find(loan => loan.id === paymentForm.loan_id)
      if (selectedLoanData) {
        const updatedLoans = loans.map(loan =>
          loan.id === paymentForm.loan_id
            ? {
                ...loan,
                paid_amount: loan.paid_amount + paymentForm.principal_paid + paymentForm.interest_paid + paymentForm.penalty_paid,
                remaining_balance: loan.total_amount - (loan.paid_amount + paymentForm.principal_paid + paymentForm.interest_paid + paymentForm.penalty_paid)
              }
            : loan
        )
        setLoans(updatedLoans)
      }

      // Close dialog and reset form
      setIsPaymentDialogOpen(false)
      resetForm()

      // Generate receipt automatically
      generateReceipt(newPayment)

      // Call parent callback
      onPaymentProcessed?.(newPayment)

      alert('✅ Paiement enregistré avec succès!')

    } catch (error) {
      console.error('Error processing payment:', error)
      alert('❌ Erreur lors de l\'enregistrement du paiement')
    }
  }

  const generateReceipt = (payment: Payment) => {
    // This would generate a PDF receipt
    const receiptData = {
      receiptNumber: payment.receipt_number,
      paymentDate: payment.payment_date,
      clientName: 'Client Name', // Would get from loan/client data
      loanNumber: 'LN-XXXX-XXXX',
      amount: payment.amount,
      paymentMethod: payment.payment_method,
      referenceNumber: payment.reference_number
    }

    // For now, just show an alert
    alert(`Reçu généré: ${receiptData.receiptNumber}`)
  }

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case 'cash':
        return <DollarSign className="h-4 w-4" />
      case 'bank_transfer':
        return <Building className="h-4 w-4" />
      case 'mobile_money':
        return <Smartphone className="h-4 w-4" />
      case 'card':
        return <CreditCard className="h-4 w-4" />
      default:
        return <DollarSign className="h-4 w-4" />
    }
  }

  const getPaymentMethodLabel = (method: string) => {
    const labels = {
      cash: 'Espèces',
      bank_transfer: 'Virement bancaire',
      mobile_money: 'Mobile Money',
      card: 'Carte bancaire',
      check: 'Chèque'
    }
    return labels[method as keyof typeof labels] || method
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Traitement des Paiements</h2>
          <p className="text-gray-600">Enregistrement des remboursements et décaissements</p>
        </div>

        <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="h-4 w-4 mr-2" />
              Nouveau Paiement
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <Receipt className="h-5 w-5 mr-2" />
                Enregistrer un Paiement
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              {!loanId && (
                <div>
                  <Label htmlFor="loan_id">Sélectionner un Prêt</Label>
                  <Select
                    value={paymentForm.loan_id}
                    onValueChange={(value) => {
                      console.log('Loan selected:', value)
                      setPaymentForm(prev => ({ ...prev, loan_id: value }))
                      const loan = loans.find(l => l.id === value)
                      setSelectedLoan(loan || null)
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choisir un prêt actif" />
                    </SelectTrigger>
                    <SelectContent>
                      {loans.filter(loan => loan.status === 'active').map(loan => (
                        <SelectItem key={loan.id} value={loan.id}>
                          {loan.loan_number} - {formatCurrency(loan.next_payment_amount || 0)} dû
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {selectedLoan && (
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">{selectedLoan.loan_number}</p>
                      <p className="text-sm text-gray-600">
                        Prochain paiement: {formatCurrency(selectedLoan.next_payment_amount || 0)}
                      </p>
                      <p className="text-sm text-gray-600">
                        Solde restant: {formatCurrency(selectedLoan.remaining_balance)}
                      </p>
                    </div>
                    <Badge variant={selectedLoan.days_overdue > 0 ? 'destructive' : 'default'}>
                      {selectedLoan.days_overdue > 0 ? `${selectedLoan.days_overdue} jours de retard` : 'À jour'}
                    </Badge>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="principal_paid">Principal Payé</Label>
                  <Input
                    id="principal_paid"
                    type="number"
                    step="0.01"
                    value={paymentForm.principal_paid}
                    onChange={(e) => setPaymentForm(prev => ({
                      ...prev,
                      principal_paid: parseFloat(e.target.value) || 0
                    }))}
                  />
                </div>

                <div>
                  <Label htmlFor="interest_paid">Intérêt Payé</Label>
                  <Input
                    id="interest_paid"
                    type="number"
                    step="0.01"
                    value={paymentForm.interest_paid}
                    onChange={(e) => setPaymentForm(prev => ({
                      ...prev,
                      interest_paid: parseFloat(e.target.value) || 0
                    }))}
                  />
                </div>

                <div>
                  <Label htmlFor="penalty_paid">Pénalité Payée</Label>
                  <Input
                    id="penalty_paid"
                    type="number"
                    step="0.01"
                    value={paymentForm.penalty_paid}
                    onChange={(e) => setPaymentForm(prev => ({
                      ...prev,
                      penalty_paid: parseFloat(e.target.value) || 0
                    }))}
                  />
                </div>
              </div>

              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-semibold">Montant Total:</span>
                <span className="text-lg font-bold">{formatCurrency(paymentForm.amount)}</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="payment_method">Méthode de Paiement</Label>
                  <Select
                    value={paymentForm.payment_method}
                    onValueChange={(value) => {
                      console.log('Payment method selected:', value)
                      setPaymentForm(prev => ({ ...prev, payment_method: value }))
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner la méthode" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cash">Espèces</SelectItem>
                      <SelectItem value="bank_transfer">Virement bancaire</SelectItem>
                      <SelectItem value="mobile_money">Mobile Money</SelectItem>
                      <SelectItem value="card">Carte bancaire</SelectItem>
                      <SelectItem value="check">Chèque</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="payment_channel">Canal de Paiement</Label>
                  <Select
                    value={paymentForm.payment_channel}
                    onValueChange={(value) => {
                      console.log('Payment channel selected:', value)
                      setPaymentForm(prev => ({ ...prev, payment_channel: value }))
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner le canal" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cashier">Caissier</SelectItem>
                      <SelectItem value="agent">Agent</SelectItem>
                      <SelectItem value="online">En ligne</SelectItem>
                      <SelectItem value="mobile_app">Application mobile</SelectItem>
                      <SelectItem value="atm">ATM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="payment_date">Date de Paiement</Label>
                  <Input
                    id="payment_date"
                    type="date"
                    value={paymentForm.payment_date}
                    onChange={(e) => setPaymentForm(prev => ({ ...prev, payment_date: e.target.value }))}
                  />
                </div>

                <div>
                  <Label htmlFor="reference_number">Numéro de Référence</Label>
                  <Input
                    id="reference_number"
                    value={paymentForm.reference_number}
                    onChange={(e) => setPaymentForm(prev => ({ ...prev, reference_number: e.target.value }))}
                    placeholder="Référence de transaction"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={paymentForm.notes}
                  onChange={(e) => setPaymentForm(prev => ({ ...prev, notes: e.target.value }))}
                  rows={3}
                  placeholder="Informations supplémentaires sur le paiement..."
                />
              </div>

              <div className="flex justify-between items-center pt-4">
                <Button type="button" variant="outline" onClick={calculatePayment}>
                  <Calculator className="h-4 w-4 mr-2" />
                  Calculer Automatiquement
                </Button>

                <div className="flex space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsPaymentDialogOpen(false)}
                  >
                    Annuler
                  </Button>
                  <Button type="submit" disabled={!paymentForm.loan_id || paymentForm.amount <= 0}>
                    Enregistrer le Paiement
                  </Button>
                </div>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Recent Payments */}
      <Card className="banking-card">
        <CardHeader>
          <CardTitle>Paiements Récents</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Prêt</TableHead>
                <TableHead>Montant</TableHead>
                <TableHead>Méthode</TableHead>
                <TableHead>Référence</TableHead>
                <TableHead>Reçu</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell>{formatDate(payment.payment_date)}</TableCell>
                  <TableCell className="font-medium">
                    {loans.find(l => l.id === payment.loan_id)?.loan_number || payment.loan_id}
                  </TableCell>
                  <TableCell className="font-semibold">
                    {formatCurrency(payment.amount)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getPaymentMethodIcon(payment.payment_method)}
                      <span>{getPaymentMethodLabel(payment.payment_method)}</span>
                    </div>
                  </TableCell>
                  <TableCell>{payment.reference_number}</TableCell>
                  <TableCell>{payment.receipt_number}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Payment Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="banking-stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="banking-stat-label">Paiements Aujourd'hui</p>
              <p className="banking-stat-value">
                {payments.filter(p => p.payment_date === new Date().toISOString().split('T')[0]).length}
              </p>
            </div>
            <Receipt className="h-8 w-8 text-green-500" />
          </div>
        </Card>

        <Card className="banking-stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="banking-stat-label">Montant du Jour</p>
              <p className="banking-stat-value">
                {formatCurrency(
                  payments
                    .filter(p => p.payment_date === new Date().toISOString().split('T')[0])
                    .reduce((sum, p) => sum + p.amount, 0)
                )}
              </p>
            </div>
            <DollarSign className="h-8 w-8 text-blue-500" />
          </div>
        </Card>

        <Card className="banking-stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="banking-stat-label">Total ce Mois</p>
              <p className="banking-stat-value">
                {formatCurrency(
                  payments
                    .filter(p => p.payment_date.startsWith(new Date().toISOString().slice(0, 7)))
                    .reduce((sum, p) => sum + p.amount, 0)
                )}
              </p>
            </div>
            <Calculator className="h-8 w-8 text-purple-500" />
          </div>
        </Card>
      </div>
    </div>
  )
}

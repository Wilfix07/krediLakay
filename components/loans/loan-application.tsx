'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Calculator, User, FileText, AlertCircle } from 'lucide-react'
import { loansApi, clientsApi, loanTypesApi } from '@/lib/api'
import { formatCurrency, calculatePaymentSchedule, formatLoanFrequency } from '@/lib/utils'
import type { LoanType, Client, CreateLoanData } from '@/lib/types'

interface LoanApplicationProps {
  clientId?: string
  onSuccess?: () => void
}

export function LoanApplication({ clientId, onSuccess }: LoanApplicationProps) {
  const [loanTypes, setLoanTypes] = useState<LoanType[]>([])
  const [clients, setClients] = useState<Client[]>([])
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)
  const [selectedLoanType, setSelectedLoanType] = useState<LoanType | null>(null)
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState<CreateLoanData>({
    client_id: clientId || '',
    loan_type_id: '',
    amount: 0,
    term_days: 30,
    purpose: '',
    collateral_description: '',
    collateral_value: 0,
    guarantor_name: '',
    guarantor_phone: '',
    guarantor_relationship: '',
    disbursement_method: 'cash',
    bank_account_number: '',
    bank_name: '',
    branch_name: '',
    notes: ''
  })

  const [paymentSchedule, setPaymentSchedule] = useState<any[]>([])
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    loadInitialData()
  }, [clientId])

  useEffect(() => {
    if (selectedLoanType && formData.amount && formData.term_days) {
      calculateSchedule()
    }
  }, [selectedLoanType, formData.amount, formData.term_days])

  const loadInitialData = async () => {
    setLoading(true)

    // Load loan types
    const loanTypesResponse = await loanTypesApi.getAll()
    if (loanTypesResponse.data) {
      setLoanTypes(loanTypesResponse.data)
    }

    // Load clients if no specific client
    if (!clientId) {
      const clientsResponse = await clientsApi.getAll()
      if (clientsResponse.data) {
        setClients(clientsResponse.data)
      }
    } else {
      // Load specific client
      const clientResponse = await clientsApi.getById(clientId)
      if (clientResponse.data) {
        setSelectedClient(clientResponse.data)
        setFormData(prev => ({ ...prev, client_id: clientId }))
      }
    }

    setLoading(false)
  }

  const calculateSchedule = () => {
    if (!selectedLoanType || !formData.amount || !formData.term_days) return

    const schedule = calculatePaymentSchedule(
      formData.amount,
      selectedLoanType.interest_rate,
      formData.term_days,
      selectedLoanType.payment_frequency
    )

    setPaymentSchedule(schedule)
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.client_id) newErrors.client_id = 'Client requis'
    if (!formData.loan_type_id) newErrors.loan_type_id = 'Type de prêt requis'
    if (!formData.amount || formData.amount <= 0) newErrors.amount = 'Montant invalide'
    if (!formData.term_days || formData.term_days <= 0) newErrors.term_days = 'Durée invalide'

    if (formData.amount < (selectedLoanType?.min_amount || 0)) {
      newErrors.amount = `Montant minimum: ${formatCurrency(selectedLoanType?.min_amount || 0)}`
    }

    if (formData.amount > (selectedLoanType?.max_amount || 0)) {
      newErrors.amount = `Montant maximum: ${formatCurrency(selectedLoanType?.max_amount || 0)}`
    }

    if (formData.term_days < (selectedLoanType?.min_term_days || 0)) {
      newErrors.term_days = `Durée minimum: ${selectedLoanType?.min_term_days} jours`
    }

    if (formData.term_days > (selectedLoanType?.max_term_days || 0)) {
      newErrors.term_days = `Durée maximum: ${selectedLoanType?.max_term_days} jours`
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setLoading(true)

    const response = await loansApi.create(formData)
    if (response.data) {
      // Generate payment schedule
      await loansApi.generateSchedule(response.data.id)

      onSuccess?.()
      alert('Demande de prêt soumise avec succès!')
    } else {
      alert('Erreur lors de la soumission: ' + response.error)
    }

    setLoading(false)
  }

  if (loading && !loanTypes.length) {
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
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="banking-card">
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="h-5 w-5 mr-2" />
            Nouvelle Demande de Prêt
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Client Selection */}
            <div className="space-y-4">
              <Label className="text-base font-semibold">Informations du Client</Label>

              {!clientId ? (
                <div>
                  <Label htmlFor="client">Sélectionner un Client</Label>
                  <Select
                    value={formData.client_id}
                    onValueChange={(value) => {
                      setFormData(prev => ({ ...prev, client_id: value }))
                      const client = clients.find(c => c.id === value)
                      setSelectedClient(client || null)
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choisir un client" />
                    </SelectTrigger>
                    <SelectContent>
                      {clients.map(client => (
                        <SelectItem key={client.id} value={client.id}>
                          {client.first_name} {client.last_name} - {client.phone}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.client_id && (
                    <p className="text-sm text-red-600 mt-1">{errors.client_id}</p>
                  )}
                </div>
              ) : (
                selectedClient && (
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold">
                          {selectedClient.first_name.charAt(0)}{selectedClient.last_name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold">
                          {selectedClient.first_name} {selectedClient.last_name}
                        </p>
                        <p className="text-sm text-gray-600">{selectedClient.phone}</p>
                        <Badge variant={
                          selectedClient.kyc_status === 'approved' ? 'default' :
                          selectedClient.kyc_status === 'pending' ? 'secondary' : 'destructive'
                        }>
                          KYC: {selectedClient.kyc_status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>

            <Separator />

            {/* Loan Type Selection */}
            <div className="space-y-4">
              <Label className="text-base font-semibold">Type de Prêt</Label>

              <div>
                <Label htmlFor="loan_type">Produit de Prêt</Label>
                <Select
                  value={formData.loan_type_id}
                  onValueChange={(value) => {
                    setFormData(prev => ({ ...prev, loan_type_id: value }))
                    const loanType = loanTypes.find(lt => lt.id === value)
                    setSelectedLoanType(loanType || null)
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choisir un type de prêt" />
                  </SelectTrigger>
                  <SelectContent>
                    {loanTypes.map(loanType => (
                      <SelectItem key={loanType.id} value={loanType.id}>
                        <div className="flex items-center justify-between w-full">
                          <span>{loanType.name}</span>
                          <div className="text-right ml-4">
                            <div className="text-sm font-semibold">{loanType.interest_rate}%</div>
                            <div className="text-xs text-gray-500">
                              {formatLoanFrequency(loanType.payment_frequency)}
                            </div>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.loan_type_id && (
                  <p className="text-sm text-red-600 mt-1">{errors.loan_type_id}</p>
                )}
              </div>
            </div>

            {selectedLoanType && (
              <>
                <Separator />

                {/* Loan Details */}
                <div className="space-y-4">
                  <Label className="text-base font-semibold">Détails du Prêt</Label>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="amount">Montant du Prêt (HTG)</Label>
                      <Input
                        id="amount"
                        type="number"
                        value={formData.amount}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          amount: parseFloat(e.target.value) || 0
                        }))}
                        placeholder={`Min: ${formatCurrency(selectedLoanType.min_amount)}`}
                      />
                      {errors.amount && (
                        <p className="text-sm text-red-600 mt-1">{errors.amount}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="term_days">Durée (jours)</Label>
                      <Input
                        id="term_days"
                        type="number"
                        value={formData.term_days}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          term_days: parseInt(e.target.value) || 0
                        }))}
                        placeholder={`${selectedLoanType.min_term_days}-${selectedLoanType.max_term_days}`}
                      />
                      {errors.term_days && (
                        <p className="text-sm text-red-600 mt-1">{errors.term_days}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="purpose">Objet du Prêt</Label>
                    <Select
                      value={formData.purpose || ''}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, purpose: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner l'objet du prêt" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="business">Développement d'entreprise</SelectItem>
                        <SelectItem value="education">Éducation</SelectItem>
                        <SelectItem value="health">Santé</SelectItem>
                        <SelectItem value="housing">Logement</SelectItem>
                        <SelectItem value="emergency">Urgence</SelectItem>
                        <SelectItem value="other">Autre</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Separator />

                {/* Collateral & Guarantor */}
                <div className="space-y-4">
                  <Label className="text-base font-semibold">Garanties et Garant</Label>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="collateral_description">Description de la Garantie</Label>
                      <Textarea
                        id="collateral_description"
                        value={formData.collateral_description}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          collateral_description: e.target.value
                        }))}
                        placeholder="Décrivez les biens offerts en garantie..."
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label htmlFor="collateral_value">Valeur de la Garantie (HTG)</Label>
                      <Input
                        id="collateral_value"
                        type="number"
                        value={formData.collateral_value}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          collateral_value: parseFloat(e.target.value) || 0
                        }))}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="guarantor_name">Nom du Garant</Label>
                      <Input
                        id="guarantor_name"
                        value={formData.guarantor_name}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          guarantor_name: e.target.value
                        }))}
                      />
                    </div>

                    <div>
                      <Label htmlFor="guarantor_phone">Téléphone du Garant</Label>
                      <Input
                        id="guarantor_phone"
                        value={formData.guarantor_phone}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          guarantor_phone: e.target.value
                        }))}
                      />
                    </div>

                    <div>
                      <Label htmlFor="guarantor_relationship">Relation</Label>
                      <Input
                        id="guarantor_relationship"
                        value={formData.guarantor_relationship}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          guarantor_relationship: e.target.value
                        }))}
                        placeholder="Parent, ami, etc."
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Disbursement */}
                <div className="space-y-4">
                  <Label className="text-base font-semibold">Modalités de Décaissement</Label>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="disbursement_method">Méthode de Décaissement</Label>
                      <Select
                        value={formData.disbursement_method}
                        onValueChange={(value: any) => setFormData(prev => ({
                          ...prev,
                          disbursement_method: value
                        }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cash">Espèces</SelectItem>
                          <SelectItem value="bank_transfer">Virement bancaire</SelectItem>
                          <SelectItem value="check">Chèque</SelectItem>
                          <SelectItem value="mobile_money">Mobile Money</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {(formData.disbursement_method === 'bank_transfer' ||
                      formData.disbursement_method === 'check') && (
                      <>
                        <div>
                          <Label htmlFor="bank_name">Nom de la Banque</Label>
                          <Input
                            id="bank_name"
                            value={formData.bank_name}
                            onChange={(e) => setFormData(prev => ({
                              ...prev,
                              bank_name: e.target.value
                            }))}
                          />
                        </div>

                        <div>
                          <Label htmlFor="bank_account_number">Numéro de Compte</Label>
                          <Input
                            id="bank_account_number"
                            value={formData.bank_account_number}
                            onChange={(e) => setFormData(prev => ({
                              ...prev,
                              bank_account_number: e.target.value
                            }))}
                          />
                        </div>

                        <div>
                          <Label htmlFor="branch_name">Agence Bancaire</Label>
                          <Input
                            id="branch_name"
                            value={formData.branch_name}
                            onChange={(e) => setFormData(prev => ({
                              ...prev,
                              branch_name: e.target.value
                            }))}
                          />
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="notes">Notes Supplémentaires</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      notes: e.target.value
                    }))}
                    rows={3}
                    placeholder="Informations supplémentaires sur la demande..."
                  />
                </div>
              </>
            )}

            {/* Payment Schedule Preview */}
            {paymentSchedule.length > 0 && (
              <>
                <Separator />
                <div className="space-y-4">
                  <Label className="text-base font-semibold">Calendrier de Remboursement</Label>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="grid grid-cols-4 gap-4 text-sm font-medium text-gray-700 mb-3">
                      <div>Échéance</div>
                      <div>Principal</div>
                      <div>Intérêt</div>
                      <div>Total</div>
                    </div>

                    {paymentSchedule.slice(0, 5).map((payment, index) => (
                      <div key={index} className="grid grid-cols-4 gap-4 text-sm py-2 border-b border-gray-200 last:border-b-0">
                        <div>{payment.dueDate.toLocaleDateString('fr-HT')}</div>
                        <div>{formatCurrency(payment.principalAmount)}</div>
                        <div>{formatCurrency(payment.interestAmount)}</div>
                        <div className="font-semibold">{formatCurrency(payment.totalAmount)}</div>
                      </div>
                    ))}

                    {paymentSchedule.length > 5 && (
                      <p className="text-sm text-gray-600 mt-2">
                        ... et {paymentSchedule.length - 5} autres échéances
                      </p>
                    )}
                  </div>
                </div>
              </>
            )}

            <div className="flex justify-end space-x-4 pt-6">
              <Button type="button" variant="outline">
                Enregistrer comme Brouillon
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? 'Soumission...' : 'Soumettre la Demande'}
              </Button>
            </div>
          </form>
        </CardContent>
      </div>
    </div>
  )
}

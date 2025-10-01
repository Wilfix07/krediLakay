'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Settings, Percent, Calculator, Clock, DollarSign, AlertTriangle } from 'lucide-react'
import type { Institution, LoanType } from '@/lib/types'

interface SystemParametersProps {
  institutionId?: string
}

interface SystemSettings {
  default_interest_rate: number
  default_commission_rate: number
  max_loan_amount: number
  min_loan_amount: number
  default_loan_term_days: number
  max_loan_term_days: number
  min_loan_term_days: number
  late_payment_penalty_rate: number
  max_overdue_days: number
  auto_approve_loans_under: number
  require_collateral_above: number
  sms_notifications_enabled: boolean
  email_notifications_enabled: boolean
  backup_frequency_days: number
  data_retention_days: number
}

export function SystemParameters({ institutionId }: SystemParametersProps) {
  const [settings, setSettings] = useState<SystemSettings>({
    default_interest_rate: 15,
    default_commission_rate: 5,
    max_loan_amount: 500000,
    min_loan_amount: 1000,
    default_loan_term_days: 90,
    max_loan_term_days: 365,
    min_loan_term_days: 30,
    late_payment_penalty_rate: 2,
    max_overdue_days: 30,
    auto_approve_loans_under: 50000,
    require_collateral_above: 100000,
    sms_notifications_enabled: true,
    email_notifications_enabled: true,
    backup_frequency_days: 7,
    data_retention_days: 2555
  })

  const [loanTypes, setLoanTypes] = useState<LoanType[]>([])
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    loadLoanTypes()
  }, [])

  const loadLoanTypes = async () => {
    setLoading(true)
    // This would call the API to get loan types
    const mockLoanTypes: LoanType[] = [
      {
        id: '1',
        created_at: '2024-01-01T00:00:00Z',
        name: 'Prêt Journalier',
        code: 'DAILY',
        description: 'Prêt remboursable quotidiennement',
        payment_frequency: 'daily',
        min_amount: 1000,
        max_amount: 50000,
        min_term_days: 30,
        max_term_days: 90,
        interest_rate: 15,
        penalty_rate: 2,
        is_active: true,
        institution_id: institutionId || '1'
      },
      {
        id: '2',
        created_at: '2024-01-01T00:00:00Z',
        name: 'Prêt Hebdomadaire',
        code: 'WEEKLY',
        description: 'Prêt remboursable hebdomadairement',
        payment_frequency: 'weekly',
        min_amount: 5000,
        max_amount: 100000,
        min_term_days: 60,
        max_term_days: 180,
        interest_rate: 12,
        penalty_rate: 1.5,
        is_active: true,
        institution_id: institutionId || '1'
      },
      {
        id: '3',
        created_at: '2024-01-01T00:00:00Z',
        name: 'Prêt Mensuel',
        code: 'MONTHLY',
        description: 'Prêt remboursable mensuellement',
        payment_frequency: 'monthly',
        min_amount: 10000,
        max_amount: 500000,
        min_term_days: 90,
        max_term_days: 365,
        interest_rate: 10,
        penalty_rate: 1,
        is_active: true,
        institution_id: institutionId || '1'
      }
    ]
    setLoanTypes(mockLoanTypes)
    setLoading(false)
  }

  const handleSettingChange = (key: keyof SystemSettings, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const handleLoanTypeChange = (id: string, field: keyof LoanType, value: any) => {
    setLoanTypes(prev => prev.map(type =>
      type.id === id
        ? { ...type, [field]: value, updated_at: new Date().toISOString() }
        : type
    ))
  }

  const handleSaveSettings = async () => {
    setSaving(true)
    // This would call the API to save settings
    await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
    setSaving(false)
    alert('Paramètres sauvegardés avec succès!')
  }

  const handleSaveLoanTypes = async () => {
    setSaving(true)
    // This would call the API to save loan types
    await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
    setSaving(false)
    alert('Types de prêt sauvegardés avec succès!')
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Paramètres du Système</h2>
          <p className="text-gray-600">Configuration globale du système de gestion de prêts</p>
        </div>
        <Button onClick={handleSaveSettings} disabled={saving}>
          {saving ? 'Sauvegarde...' : 'Sauvegarder les Paramètres'}
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="general">Paramètres Généraux</TabsTrigger>
          <TabsTrigger value="loans">Types de Prêts</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          {/* Interest Rates */}
          <Card className="banking-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Percent className="h-5 w-5 mr-2" />
                Taux d'Intérêt et Commissions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="default_interest_rate">Taux d'Intérêt par Défaut (%)</Label>
                  <Input
                    id="default_interest_rate"
                    type="number"
                    step="0.01"
                    value={settings.default_interest_rate}
                    onChange={(e) => handleSettingChange('default_interest_rate', parseFloat(e.target.value) || 0)}
                  />
                </div>

                <div>
                  <Label htmlFor="default_commission_rate">Taux de Commission par Défaut (%)</Label>
                  <Input
                    id="default_commission_rate"
                    type="number"
                    step="0.01"
                    value={settings.default_commission_rate}
                    onChange={(e) => handleSettingChange('default_commission_rate', parseFloat(e.target.value) || 0)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="late_payment_penalty_rate">Taux de Pénalité de Retard (%)</Label>
                  <Input
                    id="late_payment_penalty_rate"
                    type="number"
                    step="0.01"
                    value={settings.late_payment_penalty_rate}
                    onChange={(e) => handleSettingChange('late_payment_penalty_rate', parseFloat(e.target.value) || 0)}
                  />
                </div>

                <div>
                  <Label htmlFor="max_overdue_days">Jours Maximum de Retard</Label>
                  <Input
                    id="max_overdue_days"
                    type="number"
                    value={settings.max_overdue_days}
                    onChange={(e) => handleSettingChange('max_overdue_days', parseInt(e.target.value) || 0)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Loan Limits */}
          <Card className="banking-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="h-5 w-5 mr-2" />
                Limites des Prêts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="min_loan_amount">Montant Minimum (HTG)</Label>
                  <Input
                    id="min_loan_amount"
                    type="number"
                    value={settings.min_loan_amount}
                    onChange={(e) => handleSettingChange('min_loan_amount', parseFloat(e.target.value) || 0)}
                  />
                </div>

                <div>
                  <Label htmlFor="max_loan_amount">Montant Maximum (HTG)</Label>
                  <Input
                    id="max_loan_amount"
                    type="number"
                    value={settings.max_loan_amount}
                    onChange={(e) => handleSettingChange('max_loan_amount', parseFloat(e.target.value) || 0)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="min_loan_term_days">Durée Minimum (jours)</Label>
                  <Input
                    id="min_loan_term_days"
                    type="number"
                    value={settings.min_loan_term_days}
                    onChange={(e) => handleSettingChange('min_loan_term_days', parseInt(e.target.value) || 0)}
                  />
                </div>

                <div>
                  <Label htmlFor="max_loan_term_days">Durée Maximum (jours)</Label>
                  <Input
                    id="max_loan_term_days"
                    type="number"
                    value={settings.max_loan_term_days}
                    onChange={(e) => handleSettingChange('max_loan_term_days', parseInt(e.target.value) || 0)}
                  />
                </div>

                <div>
                  <Label htmlFor="default_loan_term_days">Durée par Défaut (jours)</Label>
                  <Input
                    id="default_loan_term_days"
                    type="number"
                    value={settings.default_loan_term_days}
                    onChange={(e) => handleSettingChange('default_loan_term_days', parseInt(e.target.value) || 0)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="auto_approve_loans_under">Auto-approbation sous (HTG)</Label>
                  <Input
                    id="auto_approve_loans_under"
                    type="number"
                    value={settings.auto_approve_loans_under}
                    onChange={(e) => handleSettingChange('auto_approve_loans_under', parseFloat(e.target.value) || 0)}
                  />
                </div>

                <div>
                  <Label htmlFor="require_collateral_above">Garantie requise au-dessus de (HTG)</Label>
                  <Input
                    id="require_collateral_above"
                    type="number"
                    value={settings.require_collateral_above}
                    onChange={(e) => handleSettingChange('require_collateral_above', parseFloat(e.target.value) || 0)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* System Settings */}
          <Card className="banking-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="h-5 w-5 mr-2" />
                Paramètres Système
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="backup_frequency_days">Fréquence de Sauvegarde (jours)</Label>
                  <Input
                    id="backup_frequency_days"
                    type="number"
                    value={settings.backup_frequency_days}
                    onChange={(e) => handleSettingChange('backup_frequency_days', parseInt(e.target.value) || 0)}
                  />
                </div>

                <div>
                  <Label htmlFor="data_retention_days">Rétention des Données (jours)</Label>
                  <Input
                    id="data_retention_days"
                    type="number"
                    value={settings.data_retention_days}
                    onChange={(e) => handleSettingChange('data_retention_days', parseInt(e.target.value) || 0)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="loans" className="space-y-6">
          <Card className="banking-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calculator className="h-5 w-5 mr-2" />
                Configuration des Types de Prêts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {loanTypes.map((loanType) => (
                  <Card key={loanType.id} className="border border-gray-200">
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{loanType.name}</CardTitle>
                        <Badge variant={loanType.is_active ? 'default' : 'secondary'}>
                          {loanType.is_active ? 'Actif' : 'Inactif'}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Taux d'Intérêt (%)</Label>
                          <Input
                            type="number"
                            step="0.01"
                            value={loanType.interest_rate}
                            onChange={(e) => handleLoanTypeChange(loanType.id, 'interest_rate', parseFloat(e.target.value) || 0)}
                          />
                        </div>

                        <div>
                          <Label>Taux de Pénalité (%)</Label>
                          <Input
                            type="number"
                            step="0.01"
                            value={loanType.penalty_rate || 0}
                            onChange={(e) => handleLoanTypeChange(loanType.id, 'penalty_rate', parseFloat(e.target.value) || 0)}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Montant Minimum (HTG)</Label>
                          <Input
                            type="number"
                            value={loanType.min_amount}
                            onChange={(e) => handleLoanTypeChange(loanType.id, 'min_amount', parseFloat(e.target.value) || 0)}
                          />
                        </div>

                        <div>
                          <Label>Montant Maximum (HTG)</Label>
                          <Input
                            type="number"
                            value={loanType.max_amount}
                            onChange={(e) => handleLoanTypeChange(loanType.id, 'max_amount', parseFloat(e.target.value) || 0)}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Durée Minimum (jours)</Label>
                          <Input
                            type="number"
                            value={loanType.min_term_days}
                            onChange={(e) => handleLoanTypeChange(loanType.id, 'min_term_days', parseInt(e.target.value) || 0)}
                          />
                        </div>

                        <div>
                          <Label>Durée Maximum (jours)</Label>
                          <Input
                            type="number"
                            value={loanType.max_term_days}
                            onChange={(e) => handleLoanTypeChange(loanType.id, 'max_term_days', parseInt(e.target.value) || 0)}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="flex justify-end pt-4">
                <Button onClick={handleSaveLoanTypes} disabled={saving}>
                  {saving ? 'Sauvegarde...' : 'Sauvegarder les Types de Prêts'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card className="banking-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2" />
                Paramètres de Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <Label className="text-base">Notifications SMS</Label>
                  <p className="text-sm text-gray-600">Recevoir des notifications par SMS</p>
                </div>
                <Select
                  value={settings.sms_notifications_enabled ? 'enabled' : 'disabled'}
                  onValueChange={(value) => handleSettingChange('sms_notifications_enabled', value === 'enabled')}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="enabled">Activé</SelectItem>
                    <SelectItem value="disabled">Désactivé</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <Label className="text-base">Notifications Email</Label>
                  <p className="text-sm text-gray-600">Recevoir des notifications par email</p>
                </div>
                <Select
                  value={settings.email_notifications_enabled ? 'enabled' : 'disabled'}
                  onValueChange={(value) => handleSettingChange('email_notifications_enabled', value === 'enabled')}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="enabled">Activé</SelectItem>
                    <SelectItem value="disabled">Désactivé</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

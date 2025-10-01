'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { formatCurrency } from '@/lib/utils'
import { calculateCommission, projectCommission, CommissionCalculation } from '@/lib/commission'
import { Calculator, TrendingUp, Users, Building2 } from 'lucide-react'

interface CommissionCalculatorProps {
  onCalculationChange?: (calculation: CommissionCalculation) => void
}

export function CommissionCalculator({ onCalculationChange }: CommissionCalculatorProps) {
  const [loanAmount, setLoanAmount] = useState<number>(0)
  const [termMonths, setTermMonths] = useState<number>(12)
  const [calculation, setCalculation] = useState<CommissionCalculation | null>(null)
  const [projection, setProjection] = useState<any>(null)

  const handleCalculate = () => {
    if (loanAmount > 0) {
      try {
        const calc = calculateCommission(loanAmount)
        const proj = projectCommission(loanAmount, termMonths)
        
        setCalculation(calc)
        setProjection(proj)
        
        if (onCalculationChange) {
          onCalculationChange(calc)
        }
      } catch (error) {
        console.error('Erreur de calcul:', error)
      }
    }
  }

  useEffect(() => {
    if (loanAmount > 0) {
      handleCalculate()
    }
  }, [loanAmount, termMonths])

  return (
    <div className="space-y-6">
      {/* Formulaire de calcul */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calculator className="h-5 w-5" />
            <span>Calculateur de Commission</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="loanAmount">Montant du prêt (HTG)</Label>
              <Input
                id="loanAmount"
                type="number"
                value={loanAmount || ''}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                placeholder="Entrez le montant du prêt"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="termMonths">Durée (mois)</Label>
              <Input
                id="termMonths"
                type="number"
                value={termMonths}
                onChange={(e) => setTermMonths(Number(e.target.value))}
                placeholder="Durée en mois"
              />
            </div>
          </div>
          <Button onClick={handleCalculate} className="w-full">
            Calculer la Commission
          </Button>
        </CardContent>
      </Card>

      {/* Résultats du calcul */}
      {calculation && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                <TrendingUp className="h-4 w-4 mr-1" />
                Taux de Commission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {calculation.commissionRate}%
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Commission Totale
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {formatCurrency(calculation.commissionAmount)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                <Users className="h-4 w-4 mr-1" />
                Part Agent (60%)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">
                {formatCurrency(calculation.agentCommission)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                <Building2 className="h-4 w-4 mr-1" />
                Part Institution (40%)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">
                {formatCurrency(calculation.institutionShare)}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Détails et projections */}
      {calculation && projection && (
        <Card>
          <CardHeader>
            <CardTitle>Détails et Projections</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">Répartition de la Commission</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Montant du prêt:</span>
                    <span className="font-medium">{formatCurrency(calculation.loanAmount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Commission totale:</span>
                    <span className="font-medium">{formatCurrency(calculation.commissionAmount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Montant net:</span>
                    <span className="font-medium">{formatCurrency(calculation.netAmount)}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">Projections Mensuelles</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Durée:</span>
                    <span className="font-medium">{termMonths} mois</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Commission mensuelle (agent):</span>
                    <span className="font-medium">{formatCurrency(projection.monthlyProjection)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Commission totale (agent):</span>
                    <span className="font-medium">{formatCurrency(projection.totalProjection)}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Barème des commissions */}
      <Card>
        <CardHeader>
          <CardTitle>Barème des Commissions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Montant Min.</th>
                  <th className="text-left p-2">Montant Max.</th>
                  <th className="text-left p-2">Taux</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-2">0 HTG</td>
                  <td className="p-2">50,000 HTG</td>
                  <td className="p-2 font-medium text-blue-600">3.0%</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">50,001 HTG</td>
                  <td className="p-2">100,000 HTG</td>
                  <td className="p-2 font-medium text-blue-600">2.5%</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">100,001 HTG</td>
                  <td className="p-2">200,000 HTG</td>
                  <td className="p-2 font-medium text-blue-600">2.0%</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">200,001 HTG</td>
                  <td className="p-2">500,000 HTG</td>
                  <td className="p-2 font-medium text-blue-600">1.5%</td>
                </tr>
                <tr>
                  <td className="p-2">500,001 HTG</td>
                  <td className="p-2">+</td>
                  <td className="p-2 font-medium text-blue-600">1.0%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Download, FileText, FileSpreadsheet, Calendar, Filter, Settings } from 'lucide-react'

interface ExportOptions {
  format: 'pdf' | 'excel' | 'csv'
  dateRange: {
    from: string
    to: string
  }
  includeFilters: {
    members: boolean
    loans: boolean
    payments: boolean
    expenses: boolean
    agents: boolean
  }
  sections: {
    summary: boolean
    details: boolean
    charts: boolean
    analytics: boolean
  }
  customFields?: string[]
}

interface ExportManagerProps {
  dataType: 'loans' | 'payments' | 'members' | 'expenses' | 'reports'
  onExport?: (options: ExportOptions) => void
}

export function ExportManager({ dataType, onExport }: ExportManagerProps) {
  const [exportOptions, setExportOptions] = useState<ExportOptions>({
    format: 'pdf',
    dateRange: {
      from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      to: new Date().toISOString().split('T')[0]
    },
    includeFilters: {
      members: true,
      loans: true,
      payments: true,
      expenses: true,
      agents: false
    },
    sections: {
      summary: true,
      details: true,
      charts: true,
      analytics: false
    }
  })

  const [exporting, setExporting] = useState(false)

  const handleExport = async () => {
    setExporting(true)

    try {
      // Simulate export process
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Call the export function if provided
      onExport?.(exportOptions)

      // In a real implementation, this would trigger the actual export
      console.log('Exporting with options:', exportOptions)
    } catch (error) {
      console.error('Export failed:', error)
    } finally {
      setExporting(false)
    }
  }

  const updateOption = (key: keyof ExportOptions, value: any) => {
    setExportOptions(prev => ({ ...prev, [key]: value }))
  }

  const updateDateRange = (field: 'from' | 'to', value: string) => {
    setExportOptions(prev => ({
      ...prev,
      dateRange: { ...prev.dateRange, [field]: value }
    }))
  }

  const updateFilter = (filter: keyof ExportOptions['includeFilters'], checked: boolean) => {
    setExportOptions(prev => ({
      ...prev,
      includeFilters: { ...prev.includeFilters, [filter]: checked }
    }))
  }

  const updateSection = (section: keyof ExportOptions['sections'], checked: boolean) => {
    setExportOptions(prev => ({
      ...prev,
      sections: { ...prev.sections, [section]: checked }
    }))
  }

  const getFormatIcon = (format: string) => {
    switch (format) {
      case 'pdf':
        return <FileText className="h-4 w-4" />
      case 'excel':
        return <FileSpreadsheet className="h-4 w-4" />
      case 'csv':
        return <FileSpreadsheet className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const getFormatLabel = (format: string) => {
    switch (format) {
      case 'pdf':
        return 'PDF (Rapport formaté)'
      case 'excel':
        return 'Excel (Feuille de calcul)'
      case 'csv':
        return 'CSV (Données brutes)'
      default:
        return format
    }
  }

  return (
    <Card className="banking-card">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Download className="h-5 w-5 mr-2" />
          Exportation des Données
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Format Selection */}
        <div>
          <Label className="text-base font-semibold mb-3 block">Format d'export</Label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {(['pdf', 'excel', 'csv'] as const).map(format => (
              <div
                key={format}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  exportOptions.format === format
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => updateOption('format', format)}
              >
                <div className="flex items-center space-x-3">
                  {getFormatIcon(format)}
                  <div>
                    <p className="font-medium">{getFormatLabel(format)}</p>
                    <p className="text-sm text-gray-600">
                      {format === 'pdf' && 'Idéal pour les rapports officiels'}
                      {format === 'excel' && 'Parfait pour l\'analyse de données'}
                      {format === 'csv' && 'Format universel pour l\'import'}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Date Range */}
        <div>
          <Label className="text-base font-semibold mb-3 block">Période d'export</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="dateFrom">Date de début</Label>
              <Input
                id="dateFrom"
                type="date"
                value={exportOptions.dateRange.from}
                onChange={(e) => updateDateRange('from', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="dateTo">Date de fin</Label>
              <Input
                id="dateTo"
                type="date"
                value={exportOptions.dateRange.to}
                onChange={(e) => updateDateRange('to', e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Data Filters */}
        <div>
          <Label className="text-base font-semibold mb-3 block">Filtres de données</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="members"
                checked={exportOptions.includeFilters.members}
                onCheckedChange={(checked) => updateFilter('members', !!checked)}
              />
              <Label htmlFor="members" className="text-sm">Membres</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="loans"
                checked={exportOptions.includeFilters.loans}
                onCheckedChange={(checked) => updateFilter('loans', !!checked)}
              />
              <Label htmlFor="loans" className="text-sm">Prêts</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="payments"
                checked={exportOptions.includeFilters.payments}
                onCheckedChange={(checked) => updateFilter('payments', !!checked)}
              />
              <Label htmlFor="payments" className="text-sm">Paiements</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="expenses"
                checked={exportOptions.includeFilters.expenses}
                onCheckedChange={(checked) => updateFilter('expenses', !!checked)}
              />
              <Label htmlFor="expenses" className="text-sm">Dépenses</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="agents"
                checked={exportOptions.includeFilters.agents}
                onCheckedChange={(checked) => updateFilter('agents', !!checked)}
              />
              <Label htmlFor="agents" className="text-sm">Agents</Label>
            </div>
          </div>
        </div>

        {/* Sections to Include */}
        <div>
          <Label className="text-base font-semibold mb-3 block">Sections à inclure</Label>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="summary"
                checked={exportOptions.sections.summary}
                onCheckedChange={(checked) => updateSection('summary', !!checked)}
              />
              <Label htmlFor="summary" className="text-sm">Résumé exécutif</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="details"
                checked={exportOptions.sections.details}
                onCheckedChange={(checked) => updateSection('details', !!checked)}
              />
              <Label htmlFor="details" className="text-sm">Détails complets</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="charts"
                checked={exportOptions.sections.charts}
                onCheckedChange={(checked) => updateSection('charts', !!checked)}
              />
              <Label htmlFor="charts" className="text-sm">Graphiques et visuels</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="analytics"
                checked={exportOptions.sections.analytics}
                onCheckedChange={(checked) => updateSection('analytics', !!checked)}
              />
              <Label htmlFor="analytics" className="text-sm">Analyse avancée</Label>
            </div>
          </div>
        </div>

        {/* Export Summary */}
        <div className="p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold text-blue-900 mb-2">Résumé de l'export</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-blue-700">Format:</span>
              <Badge className="ml-2">{getFormatLabel(exportOptions.format)}</Badge>
            </div>
            <div>
              <span className="text-blue-700">Période:</span>
              <span className="ml-2 text-blue-900">
                {exportOptions.dateRange.from} au {exportOptions.dateRange.to}
              </span>
            </div>
            <div>
              <span className="text-blue-700">Données:</span>
              <span className="ml-2 text-blue-900">
                {Object.values(exportOptions.includeFilters).filter(Boolean).length} catégories
              </span>
            </div>
            <div>
              <span className="text-blue-700">Sections:</span>
              <span className="ml-2 text-blue-900">
                {Object.values(exportOptions.sections).filter(Boolean).length} sections
              </span>
            </div>
          </div>
        </div>

        {/* Export Button */}
        <div className="flex justify-end space-x-3 pt-4">
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Options avancées
          </Button>
          <Button
            onClick={handleExport}
            disabled={exporting}
            className="min-w-32"
          >
            {exporting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Export en cours...
              </>
            ) : (
              <>
                <Download className="h-4 w-4 mr-2" />
                Exporter
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

// Export utilities for different formats
export const exportUtils = {
  // PDF Export (would use jsPDF or similar library)
  exportToPDF: async (data: any, filename: string) => {
    console.log('Exporting to PDF:', filename)
    // Implementation would use jsPDF
  },

  // Excel Export (would use xlsx library)
  exportToExcel: async (data: any, filename: string) => {
    console.log('Exporting to Excel:', filename)
    // Implementation would use xlsx
  },

  // CSV Export
  exportToCSV: async (data: any, filename: string) => {
    const csvContent = "data:text/csv;charset=utf-8," + data
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", filename)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
}

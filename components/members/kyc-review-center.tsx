'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  Eye,
  Download,
  Search,
  Filter,
  FileText,
  Shield,
  Clock,
  UserCheck
} from 'lucide-react'

interface KycDocument {
  id: string
  client_id: string
  client_name: string
  document_type: string
  document_number: string
  file_name: string
  file_path: string
  uploaded_by: string
  uploaded_at: string
  status: 'pending' | 'approved' | 'rejected'
  verified_at?: string
  verified_by?: string
  rejection_reason?: string
  notes?: string
}

interface KycReviewCenterProps {
  documents?: KycDocument[]
}

export function KycReviewCenter({ documents: initialDocuments }: KycReviewCenterProps) {
  const [documents, setDocuments] = useState<KycDocument[]>([])
  const [selectedDocument, setSelectedDocument] = useState<KycDocument | null>(null)
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [reviewNotes, setReviewNotes] = useState('')
  const [isReviewing, setIsReviewing] = useState(false)

  useEffect(() => {
    loadDocuments()
  }, [])

  const loadDocuments = async () => {
    // Simulate API call
    const mockDocuments: KycDocument[] = [
      {
        id: '1',
        client_id: 'client_1',
        client_name: 'Marie Dupont',
        document_type: 'national_id',
        document_number: 'ID123456789',
        file_name: 'national_id_scan.pdf',
        file_path: '/uploads/kyc/national_id_scan.pdf',
        uploaded_by: 'agent@kredilakay.com',
        uploaded_at: '2024-01-20T10:00:00Z',
        status: 'pending',
        notes: 'Document d\'identité nationale scanné'
      },
      {
        id: '2',
        client_id: 'client_2',
        client_name: 'Jean Baptiste',
        document_type: 'passport',
        document_number: 'P987654321',
        file_name: 'passport_copy.jpg',
        file_path: '/uploads/kyc/passport_copy.jpg',
        uploaded_by: 'agent@kredilakay.com',
        uploaded_at: '2024-01-19T14:30:00Z',
        status: 'pending',
        notes: 'Copie du passeport avec visa valide'
      },
      {
        id: '3',
        client_id: 'client_3',
        client_name: 'Claire Michel',
        document_type: 'utility_bill',
        document_number: 'BILL789123',
        file_name: 'electricity_bill.pdf',
        file_path: '/uploads/kyc/electricity_bill.pdf',
        uploaded_by: 'agent@kredilakay.com',
        uploaded_at: '2024-01-18T09:15:00Z',
        status: 'approved',
        verified_at: '2024-01-18T16:00:00Z',
        verified_by: 'admin@kredilakay.com',
        notes: 'Facture d\'électricité récente vérifiée'
      }
    ]
    setDocuments(mockDocuments)
  }

  const filteredDocuments = documents.filter(doc => {
    const matchesFilter = filter === 'all' || doc.status === filter
    const matchesSearch = doc.client_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.document_number.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const handleApprove = async (documentId: string) => {
    setIsReviewing(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      setDocuments(prev => prev.map(doc =>
        doc.id === documentId
          ? {
              ...doc,
              status: 'approved' as const,
              verified_at: new Date().toISOString(),
              verified_by: 'current_user@kredilakay.com',
              notes: reviewNotes || doc.notes
            }
          : doc
      ))

      setSelectedDocument(null)
      setReviewNotes('')
      alert('✅ Document approuvé avec succès!')

    } catch (error) {
      alert('❌ Erreur lors de l\'approbation')
    } finally {
      setIsReviewing(false)
    }
  }

  const handleReject = async (documentId: string) => {
    if (!reviewNotes.trim()) {
      alert('Veuillez fournir une raison de rejet')
      return
    }

    setIsReviewing(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      setDocuments(prev => prev.map(doc =>
        doc.id === documentId
          ? {
              ...doc,
              status: 'rejected' as const,
              verified_at: new Date().toISOString(),
              verified_by: 'current_user@kredilakay.com',
              rejection_reason: reviewNotes
            }
          : doc
      ))

      setSelectedDocument(null)
      setReviewNotes('')
      alert('✅ Document rejeté avec raison fournie')

    } catch (error) {
      alert('❌ Erreur lors du rejet')
    } finally {
      setIsReviewing(false)
    }
  }

  const getDocumentIcon = (type: string) => {
    switch (type) {
      case 'national_id':
        return <FileText className="h-8 w-8 text-blue-500" />
      case 'passport':
        return <FileText className="h-8 w-8 text-green-500" />
      case 'driver_license':
        return <FileText className="h-8 w-8 text-purple-500" />
      case 'utility_bill':
        return <FileText className="h-8 w-8 text-orange-500" />
      case 'bank_statement':
        return <FileText className="h-8 w-8 text-indigo-500" />
      case 'payslip':
        return <FileText className="h-8 w-8 text-pink-500" />
      default:
        return <FileText className="h-8 w-8 text-gray-500" />
    }
  }

  const getDocumentTypeLabel = (type: string) => {
    const labels = {
      national_id: 'Carte d\'Identité Nationale',
      passport: 'Passeport',
      driver_license: 'Permis de Conduire',
      utility_bill: 'Facture de Services',
      bank_statement: 'Relevé Bancaire',
      payslip: 'Fiche de Paie',
      other: 'Autre Document'
    }
    return labels[type as keyof typeof labels] || type
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" />Approuvé</Badge>
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800"><XCircle className="h-3 w-3 mr-1" />Rejeté</Badge>
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800"><Clock className="h-3 w-3 mr-1" />En attente</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const documentStats = {
    total: documents.length,
    pending: documents.filter(d => d.status === 'pending').length,
    approved: documents.filter(d => d.status === 'approved').length,
    rejected: documents.filter(d => d.status === 'rejected').length
  }

  return (
    <div className="space-y-6">
      {/* Header with Stats */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Centre de Vérification KYC</h2>
          <p className="text-gray-600">Vérification et approbation des documents d'identité</p>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">{documentStats.total}</p>
            <p className="text-sm text-gray-600">Total</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-600">{documentStats.pending}</p>
            <p className="text-sm text-gray-600">En attente</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">{documentStats.approved}</p>
            <p className="text-sm text-gray-600">Approuvés</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-red-600">{documentStats.rejected}</p>
            <p className="text-sm text-gray-600">Rejetés</p>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <Card className="banking-card">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Rechercher par nom de client ou numéro de document..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les documents</SelectItem>
                <SelectItem value="pending">En attente</SelectItem>
                <SelectItem value="approved">Approuvés</SelectItem>
                <SelectItem value="rejected">Rejetés</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" className="flex items-center space-x-2">
              <Filter className="h-4 w-4" />
              <span>Filtres avancés</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Documents List */}
      <Card className="banking-card">
        <CardHeader>
          <CardTitle>Documents à Vérifier</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredDocuments.map((document) => (
              <div key={document.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <div className="flex items-center space-x-4">
                  {getDocumentIcon(document.document_type)}
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-semibold text-gray-900">{document.client_name}</h4>
                      {getStatusBadge(document.status)}
                    </div>
                    <p className="text-sm text-gray-600">
                      {getDocumentTypeLabel(document.document_type)} • {document.document_number}
                    </p>
                    <p className="text-xs text-gray-500">
                      Téléversé le {new Date(document.uploaded_at).toLocaleDateString('fr-HT')} par {document.uploaded_by}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    Voir
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-1" />
                    Télécharger
                  </Button>
                  {document.status === 'pending' && (
                    <Button
                      size="sm"
                      onClick={() => setSelectedDocument(document)}
                    >
                      Vérifier
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Document Review Modal */}
      {selectedDocument && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="max-w-2xl w-full mx-4">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Vérification du Document</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedDocument(null)}
                >
                  <XCircle className="h-5 w-5" />
                </Button>
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                {getDocumentIcon(selectedDocument.document_type)}
                <div>
                  <h3 className="font-semibold">{selectedDocument.client_name}</h3>
                  <p className="text-sm text-gray-600">
                    {getDocumentTypeLabel(selectedDocument.document_type)} • {selectedDocument.document_number}
                  </p>
                </div>
              </div>

              <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                <FileText className="h-16 w-16 text-gray-400" />
                <p className="ml-4 text-gray-600">Aperçu du document</p>
              </div>

              <div>
                <Label htmlFor="review_notes">Notes de Vérification</Label>
                <Textarea
                  id="review_notes"
                  value={reviewNotes}
                  onChange={(e) => setReviewNotes(e.target.value)}
                  rows={3}
                  placeholder="Notes sur la vérification du document..."
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setSelectedDocument(null)}
                >
                  Annuler
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleReject(selectedDocument.id)}
                  disabled={isReviewing || !reviewNotes.trim()}
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Rejeter
                </Button>
                <Button
                  onClick={() => handleApprove(selectedDocument.id)}
                  disabled={isReviewing}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Approuver
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

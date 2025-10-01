'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Upload, FileText, CheckCircle, XCircle, Eye, AlertTriangle } from 'lucide-react'
import { clientsApi, kycApi } from '@/lib/api'
import type { Client, KycDocument, KycVerification } from '@/lib/types'

interface KycManagerProps {
  clientId?: string
}

export function KycManager({ clientId }: KycManagerProps) {
  const [clients, setClients] = useState<Client[]>([])
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)
  const [documents, setDocuments] = useState<KycDocument[]>([])
  const [verifications, setVerifications] = useState<KycVerification[]>([])
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)

  // Form state for document upload
  const [uploadForm, setUploadForm] = useState({
    document_type: '',
    document_number: '',
    notes: ''
  })

  // Form state for verification
  const [verificationForm, setVerificationForm] = useState({
    verification_method: 'document_review',
    verification_result: 'approved',
    risk_score: '',
    notes: ''
  })

  useEffect(() => {
    loadClients()
  }, [])

  useEffect(() => {
    if (selectedClient) {
      loadClientDocuments()
      loadClientVerifications()
    }
  }, [selectedClient])

  const loadClients = async () => {
    const response = await clientsApi.getAll()
    if (response.data) {
      setClients(response.data)
    }
  }

  const loadClientDocuments = async () => {
    if (!selectedClient) return

    setLoading(true)
    const response = await kycApi.getClientDocuments(selectedClient.id)
    if (response.data) {
      setDocuments(response.data)
    }
    setLoading(false)
  }

  const loadClientVerifications = async () => {
    if (!selectedClient) return

    // This would be implemented when we have the API endpoint
    setVerifications([])
  }

  const handleDocumentUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedClient || !uploadForm.document_type) return

    setUploading(true)
    // This would handle file upload to Supabase Storage and create document record
    // For now, we'll just simulate it

    const newDocument: KycDocument = {
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
      client_id: selectedClient.id,
      document_type: uploadForm.document_type as any,
      document_number: uploadForm.document_number,
      file_name: `document_${Date.now()}.pdf`,
      file_path: `/uploads/${selectedClient.id}/${uploadForm.document_type}_${Date.now()}.pdf`,
      uploaded_by: 'current_user_id',
      status: 'pending',
      notes: uploadForm.notes
    }

    setDocuments(prev => [newDocument, ...prev])
    setUploadForm({ document_type: '', document_number: '', notes: '' })
    setUploading(false)
  }

  const handleDocumentVerification = async (documentId: string, status: 'approved' | 'rejected') => {
    // This would update the document status and potentially trigger verification workflow
    setDocuments(prev => prev.map(doc =>
      doc.id === documentId
        ? { ...doc, status, verified_at: new Date().toISOString() }
        : doc
    ))
  }

  const getDocumentIcon = (type: string) => {
    switch (type) {
      case 'national_id':
        return <FileText className="h-8 w-8 text-blue-500" />
      case 'passport':
        return <FileText className="h-8 w-8 text-green-500" />
      case 'driver_license':
        return <FileText className="h-8 w-8 text-purple-500" />
      default:
        return <FileText className="h-8 w-8 text-gray-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" />Approuvé</Badge>
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800"><XCircle className="h-3 w-3 mr-1" />Rejeté</Badge>
      default:
        return <Badge className="bg-yellow-100 text-yellow-800"><AlertTriangle className="h-3 w-3 mr-1" />En attente</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gestion KYC</h2>
          <p className="text-gray-600">Vérification d'identité et conformité</p>
        </div>
      </div>

      {/* Client Selection */}
      {!clientId && (
        <Card className="banking-card">
          <CardHeader>
            <CardTitle>Sélectionner un Client</CardTitle>
          </CardHeader>
          <CardContent>
            <Select
              value={selectedClient?.id || ''}
              onValueChange={(value) => {
                const client = clients.find(c => c.id === value)
                setSelectedClient(client || null)
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Choisir un client pour gérer ses documents KYC" />
              </SelectTrigger>
              <SelectContent>
                {clients.map(client => (
                  <SelectItem key={client.id} value={client.id}>
                    <div className="flex items-center space-x-2">
                      <span>{client.first_name} {client.last_name}</span>
                      <Badge variant={
                        client.kyc_status === 'approved' ? 'default' :
                        client.kyc_status === 'pending' ? 'secondary' : 'destructive'
                      }>
                        {client.kyc_status}
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      )}

      {selectedClient && (
        <>
          {/* Client Info Card */}
          <Card className="banking-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-lg">
                    {selectedClient.first_name.charAt(0)}{selectedClient.last_name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold">
                    {selectedClient.first_name} {selectedClient.last_name}
                  </h3>
                  <p className="text-gray-600">{selectedClient.phone}</p>
                </div>
                <Badge
                  variant={
                    selectedClient.kyc_status === 'approved' ? 'default' :
                    selectedClient.kyc_status === 'pending' ? 'secondary' : 'destructive'
                  }
                  className="ml-auto"
                >
                  KYC: {selectedClient.kyc_status}
                </Badge>
              </CardTitle>
            </CardHeader>
          </Card>

          {/* Document Upload */}
          <Card className="banking-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Upload className="h-5 w-5 mr-2" />
                Téléverser un Document
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleDocumentUpload} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="document_type">Type de Document</Label>
                    <Select
                      value={uploadForm.document_type}
                      onValueChange={(value) => setUploadForm(prev => ({ ...prev, document_type: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner le type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="national_id">Carte d'Identité Nationale</SelectItem>
                        <SelectItem value="passport">Passeport</SelectItem>
                        <SelectItem value="driver_license">Permis de Conduire</SelectItem>
                        <SelectItem value="utility_bill">Facture de Services</SelectItem>
                        <SelectItem value="bank_statement">Relevé Bancaire</SelectItem>
                        <SelectItem value="payslip">Fiche de Paie</SelectItem>
                        <SelectItem value="other">Autre</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="document_number">Numéro du Document</Label>
                    <Input
                      id="document_number"
                      value={uploadForm.document_number}
                      onChange={(e) => setUploadForm(prev => ({ ...prev, document_number: e.target.value }))}
                      placeholder="Numéro d'identification"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    value={uploadForm.notes}
                    onChange={(e) => setUploadForm(prev => ({ ...prev, notes: e.target.value }))}
                    placeholder="Informations supplémentaires sur le document..."
                    rows={3}
                  />
                </div>

                <div className="flex items-center space-x-4">
                  <Button type="submit" disabled={uploading}>
                    {uploading ? 'Téléversement...' : 'Téléverser le Document'}
                  </Button>
                  <div className="text-sm text-gray-600">
                    Formats acceptés: PDF, JPG, PNG (max 10MB)
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Documents List */}
          <Card className="banking-card">
            <CardHeader>
              <CardTitle>Documents Téléversés</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="mt-2 text-gray-600">Chargement...</p>
                </div>
              ) : documents.length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun document</h3>
                  <p className="text-gray-600">
                    Aucun document KYC n'a encore été téléversé pour ce client.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {documents.map((document) => (
                    <div key={document.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-4">
                        {getDocumentIcon(document.document_type)}
                        <div>
                          <p className="font-semibold capitalize">
                            {document.document_type.replace('_', ' ')}
                          </p>
                          <p className="text-sm text-gray-600">
                            Téléversé le {new Date(document.created_at).toLocaleDateString('fr-HT')}
                          </p>
                          {document.document_number && (
                            <p className="text-sm text-gray-500">
                              N°: {document.document_number}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        {getStatusBadge(document.status)}
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-1" />
                            Voir
                          </Button>
                          {document.status === 'pending' && (
                            <>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDocumentVerification(document.id, 'approved')}
                                className="text-green-600 hover:text-green-700"
                              >
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Approuver
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDocumentVerification(document.id, 'rejected')}
                                className="text-red-600 hover:text-red-700"
                              >
                                <XCircle className="h-4 w-4 mr-1" />
                                Rejeter
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Verification History */}
          <Card className="banking-card">
            <CardHeader>
              <CardTitle>Historique de Vérification</CardTitle>
            </CardHeader>
            <CardContent>
              {verifications.length === 0 ? (
                <div className="text-center py-8">
                  <CheckCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune vérification</h3>
                  <p className="text-gray-600">
                    Aucune vérification KYC n'a encore été effectuée pour ce client.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {verifications.map((verification) => (
                    <div key={verification.id} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant={
                          verification.verification_result === 'approved' ? 'default' :
                          verification.verification_result === 'rejected' ? 'destructive' : 'secondary'
                        }>
                          {verification.verification_result === 'approved' ? 'Approuvé' :
                           verification.verification_result === 'rejected' ? 'Rejeté' : 'Informations Supplémentaires'}
                        </Badge>
                        <span className="text-sm text-gray-600">
                          {new Date(verification.created_at).toLocaleDateString('fr-HT')}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 mb-2">
                        Méthode: {verification.verification_method}
                      </p>
                      {verification.notes && (
                        <p className="text-sm text-gray-600">{verification.notes}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}

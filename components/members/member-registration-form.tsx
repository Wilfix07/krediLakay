'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Upload, User, FileText, Shield, CheckCircle, AlertCircle, Camera } from 'lucide-react'
import type { Client } from '@/lib/types'

interface MemberRegistrationFormProps {
  onSubmit?: (memberData: any) => void
  onCancel?: () => void
  initialData?: Partial<Client>
}

export function MemberRegistrationForm({ onSubmit, onCancel, initialData }: MemberRegistrationFormProps) {
  const [formData, setFormData] = useState({
    // Personal Information
    first_name: initialData?.first_name || '',
    last_name: initialData?.last_name || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    phone_secondary: initialData?.phone_secondary || '',
    date_of_birth: initialData?.date_of_birth || '',
    national_id: initialData?.national_id || '',
    passport_number: initialData?.passport_number || '',
    driver_license: initialData?.driver_license || '',

    // Address Information
    address: initialData?.address || '',
    address_work: initialData?.address_work || '',

    // Demographic Information
    marital_status: initialData?.marital_status || '',
    employment_status: initialData?.employment_status || '',
    employer_name: initialData?.employer_name || '',
    monthly_income: initialData?.monthly_income || 0,

    // Emergency Contact
    emergency_contact_name: initialData?.emergency_contact_name || '',
    emergency_contact_phone: initialData?.emergency_contact_phone || '',
    emergency_contact_relationship: initialData?.emergency_contact_relationship || '',

    // Notes
    notes: initialData?.notes || ''
  })

  const [kycDocuments, setKycDocuments] = useState<Array<{
    document_type: string
    document_number: string
    file: File | null
    status: 'pending' | 'approved' | 'rejected'
    notes: string
  }>>([])

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {}

    if (step === 1) {
      if (!formData.first_name) newErrors.first_name = 'Prénom requis'
      if (!formData.last_name) newErrors.last_name = 'Nom de famille requis'
      if (!formData.phone) newErrors.phone = 'Téléphone requis'
      if (!formData.date_of_birth) newErrors.date_of_birth = 'Date de naissance requise'
      if (!formData.national_id) newErrors.national_id = 'Numéro d\'identité requis'
    }

    if (step === 2) {
      if (!formData.address) newErrors.address = 'Adresse requise'
      if (!formData.employment_status) newErrors.employment_status = 'Statut d\'emploi requis'
      if (formData.employment_status === 'employed' && !formData.employer_name) {
        newErrors.employer_name = 'Nom de l\'employeur requis'
      }
    }

    if (step === 3) {
      if (!kycDocuments.some(doc => doc.document_type === 'national_id' || doc.document_type === 'passport')) {
        newErrors.kyc_documents = 'Au moins un document d\'identité requis'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4))
    }
  }

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  const handleSubmit = async () => {
    if (!validateStep(4)) return

    setIsSubmitting(true)

    try {
      const memberData = {
        ...formData,
        kyc_documents: kycDocuments,
        kyc_status: 'pending',
        risk_level: 'medium',
        credit_score: 500
      }

      onSubmit?.(memberData)
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const addKycDocument = (documentType: string) => {
    setKycDocuments(prev => [...prev, {
      document_type: documentType,
      document_number: '',
      file: null,
      status: 'pending',
      notes: ''
    }])
  }

  const updateKycDocument = (index: number, field: string, value: any) => {
    setKycDocuments(prev => prev.map((doc, i) =>
      i === index ? { ...doc, [field]: value } : doc
    ))
  }

  const removeKycDocument = (index: number) => {
    setKycDocuments(prev => prev.filter((_, i) => i !== index))
  }

  const documentTypes = [
    { value: 'national_id', label: 'Carte d\'Identité Nationale', required: true },
    { value: 'passport', label: 'Passeport', required: true },
    { value: 'driver_license', label: 'Permis de Conduire', required: false },
    { value: 'utility_bill', label: 'Facture de Services', required: false },
    { value: 'bank_statement', label: 'Relevé Bancaire', required: false },
    { value: 'payslip', label: 'Fiche de Paie', required: false }
  ]

  return (
    <Card className="banking-card max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center">
          <User className="h-6 w-6 mr-2" />
          Enregistrement d'un Nouveau Membre
        </CardTitle>
      </CardHeader>

      <CardContent>
        <Tabs value={currentStep.toString()} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="1" className="flex items-center">
              <User className="h-4 w-4 mr-1" />
              Informations Personnelles
            </TabsTrigger>
            <TabsTrigger value="2" className="flex items-center">
              <FileText className="h-4 w-4 mr-1" />
              Informations Professionnelles
            </TabsTrigger>
            <TabsTrigger value="3" className="flex items-center">
              <Shield className="h-4 w-4 mr-1" />
              Documents KYC
            </TabsTrigger>
            <TabsTrigger value="4" className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-1" />
              Validation
            </TabsTrigger>
          </TabsList>

          {/* Step 1: Personal Information */}
          <TabsContent value="1" className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="first_name">Prénom *</Label>
                <Input
                  id="first_name"
                  value={formData.first_name}
                  onChange={(e) => handleInputChange('first_name', e.target.value)}
                  className={errors.first_name ? 'border-red-500' : ''}
                />
                {errors.first_name && <p className="text-sm text-red-600 mt-1">{errors.first_name}</p>}
              </div>

              <div>
                <Label htmlFor="last_name">Nom de Famille *</Label>
                <Input
                  id="last_name"
                  value={formData.last_name}
                  onChange={(e) => handleInputChange('last_name', e.target.value)}
                  className={errors.last_name ? 'border-red-500' : ''}
                />
                {errors.last_name && <p className="text-sm text-red-600 mt-1">{errors.last_name}</p>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="phone">Téléphone Principal *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className={errors.phone ? 'border-red-500' : ''}
                />
                {errors.phone && <p className="text-sm text-red-600 mt-1">{errors.phone}</p>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone_secondary">Téléphone Secondaire</Label>
                <Input
                  id="phone_secondary"
                  value={formData.phone_secondary}
                  onChange={(e) => handleInputChange('phone_secondary', e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="date_of_birth">Date de Naissance *</Label>
                <Input
                  id="date_of_birth"
                  type="date"
                  value={formData.date_of_birth}
                  onChange={(e) => handleInputChange('date_of_birth', e.target.value)}
                  className={errors.date_of_birth ? 'border-red-500' : ''}
                />
                {errors.date_of_birth && <p className="text-sm text-red-600 mt-1">{errors.date_of_birth}</p>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="national_id">Numéro d'Identité Nationale *</Label>
                <Input
                  id="national_id"
                  value={formData.national_id}
                  onChange={(e) => handleInputChange('national_id', e.target.value)}
                  className={errors.national_id ? 'border-red-500' : ''}
                />
                {errors.national_id && <p className="text-sm text-red-600 mt-1">{errors.national_id}</p>}
              </div>

              <div>
                <Label htmlFor="passport_number">Numéro de Passeport</Label>
                <Input
                  id="passport_number"
                  value={formData.passport_number}
                  onChange={(e) => handleInputChange('passport_number', e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="driver_license">Permis de Conduire</Label>
              <Input
                id="driver_license"
                value={formData.driver_license}
                onChange={(e) => handleInputChange('driver_license', e.target.value)}
              />
            </div>

            <div className="flex justify-end">
              <Button onClick={handleNext}>Suivant</Button>
            </div>
          </TabsContent>

          {/* Step 2: Professional Information */}
          <TabsContent value="2" className="space-y-6">
            <div>
              <Label htmlFor="address">Adresse Résidentielle *</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                className={errors.address ? 'border-red-500' : ''}
              />
              {errors.address && <p className="text-sm text-red-600 mt-1">{errors.address}</p>}
            </div>

            <div>
              <Label htmlFor="address_work">Adresse Professionnelle</Label>
              <Input
                id="address_work"
                value={formData.address_work}
                onChange={(e) => handleInputChange('address_work', e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="marital_status">État Civil</Label>
                <Select
                  value={formData.marital_status}
                  onValueChange={(value) => handleInputChange('marital_status', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single">Célibataire</SelectItem>
                    <SelectItem value="married">Marié(e)</SelectItem>
                    <SelectItem value="divorced">Divorcé(e)</SelectItem>
                    <SelectItem value="widowed">Veuf/Veuve</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="employment_status">Statut d'Emploi *</Label>
                <Select
                  value={formData.employment_status}
                  onValueChange={(value) => handleInputChange('employment_status', value)}
                >
                  <SelectTrigger className={errors.employment_status ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Sélectionner" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="employed">Employé</SelectItem>
                    <SelectItem value="self_employed">Indépendant</SelectItem>
                    <SelectItem value="unemployed">Sans emploi</SelectItem>
                    <SelectItem value="student">Étudiant</SelectItem>
                    <SelectItem value="retired">Retraité</SelectItem>
                  </SelectContent>
                </Select>
                {errors.employment_status && <p className="text-sm text-red-600 mt-1">{errors.employment_status}</p>}
              </div>
            </div>

            {formData.employment_status === 'employed' && (
              <div>
                <Label htmlFor="employer_name">Nom de l'Employeur *</Label>
                <Input
                  id="employer_name"
                  value={formData.employer_name}
                  onChange={(e) => handleInputChange('employer_name', e.target.value)}
                  className={errors.employer_name ? 'border-red-500' : ''}
                />
                {errors.employer_name && <p className="text-sm text-red-600 mt-1">{errors.employer_name}</p>}
              </div>
            )}

            <div>
              <Label htmlFor="monthly_income">Revenu Mensuel (HTG)</Label>
              <Input
                id="monthly_income"
                type="number"
                value={formData.monthly_income}
                onChange={(e) => handleInputChange('monthly_income', parseFloat(e.target.value) || 0)}
              />
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={handlePrevious}>Précédent</Button>
              <Button onClick={handleNext}>Suivant</Button>
            </div>
          </TabsContent>

          {/* Step 3: KYC Documents */}
          <TabsContent value="3" className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Documents d'Identité (KYC)</h3>

              {/* Available document types */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                {documentTypes.map(docType => (
                  <Button
                    key={docType.value}
                    variant="outline"
                    size="sm"
                    onClick={() => addKycDocument(docType.value)}
                    className="justify-start"
                    disabled={kycDocuments.some(doc => doc.document_type === docType.value)}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    {docType.label}
                    {docType.required && <span className="text-red-500 ml-1">*</span>}
                  </Button>
                ))}
              </div>

              {/* Uploaded documents */}
              <div className="space-y-4">
                {kycDocuments.map((doc, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium">
                        {documentTypes.find(dt => dt.value === doc.document_type)?.label}
                      </h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeKycDocument(index)}
                      >
                        Supprimer
                      </Button>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor={`doc_number_${index}`}>Numéro du Document</Label>
                        <Input
                          id={`doc_number_${index}`}
                          value={doc.document_number}
                          onChange={(e) => updateKycDocument(index, 'document_number', e.target.value)}
                          placeholder="Numéro d'identification"
                        />
                      </div>

                      <div>
                        <Label htmlFor={`doc_file_${index}`}>Fichier</Label>
                        <div className="flex items-center space-x-2">
                          <Input
                            id={`doc_file_${index}`}
                            type="file"
                            accept="image/*,application/pdf"
                            onChange={(e) => {
                              const file = e.target.files?.[0] || null
                              updateKycDocument(index, 'file', file)
                            }}
                            className="flex-1"
                          />
                          <Button variant="outline" size="sm">
                            <Camera className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="mt-3">
                      <Label htmlFor={`doc_notes_${index}`}>Notes</Label>
                      <Textarea
                        id={`doc_notes_${index}`}
                        value={doc.notes}
                        onChange={(e) => updateKycDocument(index, 'notes', e.target.value)}
                        rows={2}
                        placeholder="Informations supplémentaires..."
                      />
                    </div>

                    <div className="mt-3">
                      <Badge variant="outline">
                        Statut: {doc.status === 'pending' ? 'En attente' :
                                doc.status === 'approved' ? 'Approuvé' : 'Rejeté'}
                      </Badge>
                    </div>
                  </Card>
                ))}
              </div>

              {errors.kyc_documents && (
                <p className="text-sm text-red-600 mt-2">{errors.kyc_documents}</p>
              )}
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={handlePrevious}>Précédent</Button>
              <Button onClick={handleNext}>Suivant</Button>
            </div>
          </TabsContent>

          {/* Step 4: Emergency Contact & Review */}
          <TabsContent value="4" className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact d'Urgence</h3>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="emergency_contact_name">Nom Complet</Label>
                  <Input
                    id="emergency_contact_name"
                    value={formData.emergency_contact_name}
                    onChange={(e) => handleInputChange('emergency_contact_name', e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="emergency_contact_phone">Téléphone</Label>
                  <Input
                    id="emergency_contact_phone"
                    value={formData.emergency_contact_phone}
                    onChange={(e) => handleInputChange('emergency_contact_phone', e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="emergency_contact_relationship">Relation</Label>
                  <Input
                    id="emergency_contact_relationship"
                    value={formData.emergency_contact_relationship}
                    onChange={(e) => handleInputChange('emergency_contact_relationship', e.target.value)}
                    placeholder="Parent, conjoint, etc."
                  />
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="notes">Notes Supplémentaires</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                rows={4}
                placeholder="Informations supplémentaires sur le membre..."
              />
            </div>

            {/* Summary */}
            <Card className="bg-blue-50">
              <CardHeader>
                <CardTitle className="text-blue-900">Récapitulatif de l'Enregistrement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <strong>Nom:</strong> {formData.first_name} {formData.last_name}
                  </div>
                  <div>
                    <strong>Téléphone:</strong> {formData.phone}
                  </div>
                  <div>
                    <strong>Email:</strong> {formData.email || 'Non renseigné'}
                  </div>
                  <div>
                    <strong>Statut d'Emploi:</strong> {formData.employment_status}
                  </div>
                  <div>
                    <strong>Documents KYC:</strong> {kycDocuments.length} document(s)
                  </div>
                  <div>
                    <strong>Contact d'Urgence:</strong> {formData.emergency_contact_name || 'Non renseigné'}
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-between">
              <Button variant="outline" onClick={handlePrevious}>Précédent</Button>
              <div className="flex space-x-2">
                <Button variant="outline" onClick={onCancel}>
                  Annuler
                </Button>
                <Button onClick={handleSubmit} disabled={isSubmitting}>
                  {isSubmitting ? 'Enregistrement...' : 'Enregistrer le Membre'}
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

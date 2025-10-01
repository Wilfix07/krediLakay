'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Search, Filter, X, Users, CreditCard, DollarSign, Calendar, MapPin, Phone, Mail } from 'lucide-react'

interface SearchFilters {
  query: string
  category: 'members' | 'loans' | 'payments' | 'agents'
  dateFrom?: string
  dateTo?: string
  amountMin?: number
  amountMax?: number
  status?: string[]
  agent?: string
  location?: string
  phone?: string
  email?: string
}

interface SearchResult {
  id: string
  type: 'member' | 'loan' | 'payment' | 'agent'
  title: string
  subtitle: string
  details: string
  status?: string
  amount?: number
  date?: string
  relevance: number
}

export function AdvancedSearch() {
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    category: 'members'
  })
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    if (filters.query.length > 2) {
      performSearch()
    } else {
      setResults([])
    }
  }, [filters])

  const performSearch = async () => {
    setLoading(true)

    // Simulate search API call
    const mockResults: SearchResult[] = []

    // Generate mock results based on category and query
    if (filters.category === 'members' || filters.query.toLowerCase().includes('marie') || filters.query.toLowerCase().includes('jean')) {
      mockResults.push(
        {
          id: '1',
          type: 'member',
          title: 'Marie Dupont',
          subtitle: '+509-1234-5678',
          details: 'Membre depuis janvier 2024 • KYC Approuvé',
          status: 'active',
          relevance: 0.95
        },
        {
          id: '2',
          type: 'member',
          title: 'Jean Baptiste',
          subtitle: '+509-2345-6789',
          details: 'Membre depuis décembre 2023 • KYC En attente',
          status: 'pending',
          relevance: 0.87
        }
      )
    }

    if (filters.category === 'loans' || filters.query.toLowerCase().includes('prêt') || filters.query.match(/\d+/)) {
      mockResults.push(
        {
          id: '3',
          type: 'loan',
          title: 'Prêt #LN-2024-0123',
          subtitle: 'Marie Dupont • HTG 75,000',
          details: 'Approuvé le 15 janvier 2024 • Mensuel',
          status: 'active',
          amount: 75000,
          date: '2024-01-15',
          relevance: 0.92
        }
      )
    }

    if (filters.category === 'payments' || filters.query.toLowerCase().includes('paiement')) {
      mockResults.push(
        {
          id: '4',
          type: 'payment',
          title: 'Paiement #PMT-789',
          subtitle: 'Marie Dupont • HTG 4,500',
          details: 'Reçu le 20 janvier 2024 • Espèces',
          status: 'completed',
          amount: 4500,
          date: '2024-01-20',
          relevance: 0.88
        }
      )
    }

    // Simulate API delay
    setTimeout(() => {
      setResults(mockResults)
      setLoading(false)
    }, 500)
  }

  const updateFilter = (key: keyof SearchFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const clearFilters = () => {
    setFilters({
      query: '',
      category: 'members'
    })
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'member':
        return <Users className="h-4 w-4 text-blue-500" />
      case 'loan':
        return <CreditCard className="h-4 w-4 text-green-500" />
      case 'payment':
        return <DollarSign className="h-4 w-4 text-purple-500" />
      case 'agent':
        return <Users className="h-4 w-4 text-orange-500" />
      default:
        return <Search className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusBadge = (status?: string) => {
    if (!status) return null

    const statusConfig = {
      active: { label: 'Actif', variant: 'default' as const },
      pending: { label: 'En attente', variant: 'secondary' as const },
      completed: { label: 'Terminé', variant: 'default' as const },
      approved: { label: 'Approuvé', variant: 'default' as const }
    }

    const config = statusConfig[status as keyof typeof statusConfig] || { label: status, variant: 'outline' as const }
    return <Badge variant={config.variant}>{config.label}</Badge>
  }

  return (
    <div className="space-y-6">
      {/* Search Header */}
      <Card className="banking-card">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Search className="h-5 w-5 mr-2" />
            Recherche Avancée
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Main Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Rechercher par nom, téléphone, numéro de prêt..."
                value={filters.query}
                onChange={(e) => updateFilter('query', e.target.value)}
                className="pl-10 pr-20"
              />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="px-2"
                >
                  <Filter className="h-4 w-4" />
                </Button>
                {filters.query && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => updateFilter('query', '')}
                    className="px-2"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>

            {/* Category Tabs */}
            <Tabs value={filters.category} onValueChange={(value) => updateFilter('category', value)}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="members">Membres</TabsTrigger>
                <TabsTrigger value="loans">Prêts</TabsTrigger>
                <TabsTrigger value="payments">Paiements</TabsTrigger>
                <TabsTrigger value="agents">Agents</TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Advanced Filters */}
            {showFilters && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <Label htmlFor="dateFrom">Date début</Label>
                  <Input
                    id="dateFrom"
                    type="date"
                    value={filters.dateFrom || ''}
                    onChange={(e) => updateFilter('dateFrom', e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="dateTo">Date fin</Label>
                  <Input
                    id="dateTo"
                    type="date"
                    value={filters.dateTo || ''}
                    onChange={(e) => updateFilter('dateTo', e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="amountMin">Montant min</Label>
                  <Input
                    id="amountMin"
                    type="number"
                    placeholder="HTG"
                    value={filters.amountMin || ''}
                    onChange={(e) => updateFilter('amountMin', parseFloat(e.target.value) || undefined)}
                  />
                </div>

                <div>
                  <Label htmlFor="amountMax">Montant max</Label>
                  <Input
                    id="amountMax"
                    type="number"
                    placeholder="HTG"
                    value={filters.amountMax || ''}
                    onChange={(e) => updateFilter('amountMax', parseFloat(e.target.value) || undefined)}
                  />
                </div>

                <div>
                  <Label htmlFor="status">Statut</Label>
                  <Select
                    value={filters.status?.[0] || 'all'}
                    onValueChange={(value) => {
                      if (value === 'all') {
                        updateFilter('status', undefined)
                      } else {
                        updateFilter('status', [value])
                      }
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Tous les statuts" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous</SelectItem>
                      <SelectItem value="active">Actif</SelectItem>
                      <SelectItem value="pending">En attente</SelectItem>
                      <SelectItem value="completed">Terminé</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="agent">Agent responsable</Label>
                  <Select
                    value={filters.agent || 'all'}
                    onValueChange={(value) => {
                      if (value === 'all') {
                        updateFilter('agent', undefined)
                      } else {
                        updateFilter('agent', value)
                      }
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Tous les agents" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous</SelectItem>
                      <SelectItem value="jean">Jean Claude</SelectItem>
                      <SelectItem value="marie">Marie Claire</SelectItem>
                      <SelectItem value="pierre">Pierre Louis</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="md:col-span-2 flex justify-end items-end">
                  <Button variant="outline" onClick={clearFilters}>
                    Effacer les filtres
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Search Results */}
      <Card className="banking-card">
        <CardHeader>
          <CardTitle>
            Résultats de recherche ({results.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">Recherche en cours...</p>
            </div>
          ) : results.length === 0 ? (
            <div className="text-center py-12">
              <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Aucun résultat trouvé
              </h3>
              <p className="text-gray-600">
                Essayez de modifier vos critères de recherche ou d'ajouter des filtres.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {results.map((result) => (
                <div
                  key={result.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      {getTypeIcon(result.type)}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{result.title}</h4>
                      <p className="text-sm text-gray-600">{result.subtitle}</p>
                      <p className="text-xs text-gray-500">{result.details}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    {result.amount && (
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">
                          {new Intl.NumberFormat('fr-HT', {
                            style: 'currency',
                            currency: 'HTG'
                          }).format(result.amount)}
                        </p>
                        {result.date && (
                          <p className="text-xs text-gray-500">{result.date}</p>
                        )}
                      </div>
                    )}

                    {result.status && getStatusBadge(result.status)}

                    <Button variant="outline" size="sm">
                      Voir détails
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Search Suggestions */}
      <Card className="banking-card">
        <CardHeader>
          <CardTitle>Recherches Rapides</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button
              variant="outline"
              className="justify-start"
              onClick={() => updateFilter('query', 'Marie')}
            >
              <Users className="h-4 w-4 mr-2" />
              Marie Dupont
            </Button>

            <Button
              variant="outline"
              className="justify-start"
              onClick={() => updateFilter('query', 'LN-2024')}
            >
              <CreditCard className="h-4 w-4 mr-2" />
              Prêts 2024
            </Button>

            <Button
              variant="outline"
              className="justify-start"
              onClick={() => updateFilter('query', 'paiement')}
            >
              <DollarSign className="h-4 w-4 mr-2" />
              Paiements récents
            </Button>

            <Button
              variant="outline"
              className="justify-start"
              onClick={() => {
                updateFilter('category', 'loans')
                updateFilter('query', 'actif')
              }}
            >
              <Calendar className="h-4 w-4 mr-2" />
              Prêts actifs
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

'use client'

import { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ChevronUp, ChevronDown, Search, Filter, Download, Eye, Edit, Trash2, MoreHorizontal } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export interface Column<T> {
  key: keyof T
  label: string
  sortable?: boolean
  filterable?: boolean
  render?: (value: any, item: T) => React.ReactNode
  width?: string
  align?: 'left' | 'center' | 'right'
}

export interface Filter {
  column: string
  operator: 'equals' | 'contains' | 'startsWith' | 'endsWith' | 'greaterThan' | 'lessThan'
  value: string | number
}

interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  searchable?: boolean
  searchPlaceholder?: string
  filterable?: boolean
  selectable?: boolean
  actions?: {
    label: string
    onClick: (item: T) => void
    icon?: React.ReactNode
    variant?: 'default' | 'destructive' | 'outline' | 'ghost'
  }[]
  onRowClick?: (item: T) => void
  loading?: boolean
  emptyMessage?: string
  className?: string
}

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  searchable = true,
  searchPlaceholder = "Rechercher...",
  filterable = true,
  selectable = false,
  actions = [],
  onRowClick,
  loading = false,
  emptyMessage = "Aucun élément trouvé",
  className = ""
}: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortColumn, setSortColumn] = useState<keyof T | null>(null)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [filters, setFilters] = useState<Filter[]>([])
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set())

  // Filter and sort data
  const processedData = useMemo(() => {
    let filtered = data

    // Apply search
    if (searchTerm) {
      filtered = filtered.filter(item =>
        Object.values(item).some(value =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    }

    // Apply filters
    filters.forEach(filter => {
      filtered = filtered.filter(item => {
        const value = item[filter.column]
        switch (filter.operator) {
          case 'equals':
            return value === filter.value
          case 'contains':
            return String(value).toLowerCase().includes(String(filter.value).toLowerCase())
          case 'startsWith':
            return String(value).toLowerCase().startsWith(String(filter.value).toLowerCase())
          case 'endsWith':
            return String(value).toLowerCase().endsWith(String(filter.value).toLowerCase())
          case 'greaterThan':
            return Number(value) > Number(filter.value)
          case 'lessThan':
            return Number(value) < Number(filter.value)
          default:
            return true
        }
      })
    })

    // Apply sorting
    if (sortColumn) {
      filtered = [...filtered].sort((a, b) => {
        const aVal = a[sortColumn]
        const bVal = b[sortColumn]

        if (aVal === bVal) return 0

        const comparison = aVal < bVal ? -1 : 1
        return sortDirection === 'asc' ? comparison : -comparison
      })
    }

    return filtered
  }, [data, searchTerm, sortColumn, sortDirection, filters])

  const handleSort = (column: keyof T) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortColumn(column)
      setSortDirection('asc')
    }
  }

  const handleFilterChange = (column: string, operator: Filter['operator'], value: string | number) => {
    setFilters(prev => {
      const existingIndex = prev.findIndex(f => f.column === column)
      if (existingIndex >= 0) {
        const newFilters = [...prev]
        if (value === 'all' || value === '' || value === null || value === undefined) {
          newFilters.splice(existingIndex, 1)
        } else {
          newFilters[existingIndex] = { column, operator, value }
        }
        return newFilters
      } else if (value !== 'all' && value !== '' && value !== null && value !== undefined) {
        return [...prev, { column, operator, value }]
      }
      return prev
    })
  }

  const handleRowSelect = (itemId: string, selected: boolean) => {
    setSelectedRows(prev => {
      const newSet = new Set(prev)
      if (selected) {
        newSet.add(itemId)
      } else {
        newSet.delete(itemId)
      }
      return newSet
    })
  }

  const handleSelectAll = (selected: boolean) => {
    if (selected) {
      setSelectedRows(new Set(processedData.map(item => String(item.id || item.key))))
    } else {
      setSelectedRows(new Set())
    }
  }

  const getSortIcon = (column: keyof T) => {
    if (sortColumn !== column) {
      return <ChevronDown className="h-4 w-4 opacity-30" />
    }
    return sortDirection === 'asc' ?
      <ChevronUp className="h-4 w-4" /> :
      <ChevronDown className="h-4 w-4" />
  }

  if (loading) {
    return (
      <div className={`rounded-lg border ${className}`}>
        <div className="p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Chargement...</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`rounded-lg border ${className}`}>
      {/* Search and Filters */}
      {(searchable || filterable) && (
        <div className="p-4 border-b bg-gray-50">
          <div className="flex flex-col sm:flex-row gap-4">
            {searchable && (
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder={searchPlaceholder}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            )}

            {filterable && (
              <div className="flex gap-2">
                {columns.filter(col => col.filterable).map(column => (
                  <div key={String(column.key)} className="min-w-32">
                    <Select
                      value={filters.find(f => f.column === String(column.key))?.value?.toString() || 'all'}
                      onValueChange={(value) => handleFilterChange(String(column.key), 'equals', value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={column.label} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tous</SelectItem>
                        {/* This would be populated with actual unique values from the data */}
                        <SelectItem value="active">Actif</SelectItem>
                        <SelectItem value="pending">En attente</SelectItem>
                        <SelectItem value="completed">Terminé</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {selectable && (
                <TableHead className="w-12">
                  <input
                    type="checkbox"
                    checked={selectedRows.size === processedData.length && processedData.length > 0}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="rounded"
                  />
                </TableHead>
              )}

              {columns.map(column => (
                <TableHead
                  key={String(column.key)}
                  className={`${column.width || ''} ${column.align === 'center' ? 'text-center' : column.align === 'right' ? 'text-right' : ''}`}
                >
                  {column.sortable ? (
                    <Button
                      variant="ghost"
                      className="h-auto p-0 font-semibold justify-start hover:bg-transparent"
                      onClick={() => handleSort(column.key)}
                    >
                      {column.label}
                      {getSortIcon(column.key)}
                    </Button>
                  ) : (
                    <span className="font-semibold">{column.label}</span>
                  )}
                </TableHead>
              ))}

              {(actions.length > 0 || onRowClick) && (
                <TableHead className="w-20">Actions</TableHead>
              )}
            </TableRow>
          </TableHeader>

          <TableBody>
            {processedData.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + (selectable ? 1 : 0) + (actions.length > 0 ? 1 : 0)}
                  className="text-center py-8 text-gray-500"
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            ) : (
              processedData.map((item, index) => (
                <TableRow
                  key={item.id || index}
                  className={`hover:bg-gray-50 ${onRowClick ? 'cursor-pointer' : ''}`}
                  onClick={() => onRowClick?.(item)}
                >
                  {selectable && (
                    <TableCell>
                      <input
                        type="checkbox"
                        checked={selectedRows.has(String(item.id || item.key))}
                        onChange={(e) => handleRowSelect(String(item.id || item.key), e.target.checked)}
                        onClick={(e) => e.stopPropagation()}
                        className="rounded"
                      />
                    </TableCell>
                  )}

                  {columns.map(column => (
                    <TableCell
                      key={String(column.key)}
                      className={column.align === 'center' ? 'text-center' : column.align === 'right' ? 'text-right' : ''}
                    >
                      {column.render
                        ? column.render(item[column.key], item)
                        : String(item[column.key] || '')
                      }
                    </TableCell>
                  ))}

                  {(actions.length > 0 || onRowClick) && (
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        {actions.slice(0, 2).map((action, actionIndex) => (
                          <Button
                            key={actionIndex}
                            variant={action.variant || 'ghost'}
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              action.onClick(item)
                            }}
                          >
                            {action.icon}
                            <span className="sr-only">{action.label}</span>
                          </Button>
                        ))}

                        {actions.length > 2 && (
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" onClick={(e) => e.stopPropagation()}>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              {actions.slice(2).map((action, actionIndex) => (
                                <DropdownMenuItem
                                  key={actionIndex + 2}
                                  onClick={() => action.onClick(item)}
                                >
                                  {action.icon}
                                  {action.label}
                                </DropdownMenuItem>
                              ))}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        )}
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Footer with pagination and bulk actions */}
      {processedData.length > 0 && (
        <div className="p-4 border-t bg-gray-50 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            {processedData.length} élément{processedData.length > 1 ? 's' : ''} trouvé{processedData.length > 1 ? 's' : ''}
            {selectedRows.size > 0 && (
              <span className="ml-2">
                ({selectedRows.size} sélectionné{selectedRows.size > 1 ? 's' : ''})
              </span>
            )}
          </div>

          {selectedRows.size > 0 && actions.length > 0 && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Actions groupées:</span>
              {actions.slice(0, 3).map((action, index) => (
                <Button
                  key={index}
                  variant={action.variant || 'outline'}
                  size="sm"
                  onClick={() => {
                    // Apply action to selected items
                    const selectedItems = processedData.filter(item =>
                      selectedRows.has(String(item.id || item.key))
                    )
                    selectedItems.forEach(item => action.onClick(item))
                  }}
                >
                  {action.icon}
                  {action.label}
                </Button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// Helper component for common table actions
export function TableActions({
  item,
  actions,
  onView,
  onEdit,
  onDelete
}: {
  item: any
  actions?: Array<{
    label: string
    onClick: (item: any) => void
    icon?: React.ReactNode
    variant?: 'default' | 'destructive' | 'outline' | 'ghost'
  }>
  onView?: (item: any) => void
  onEdit?: (item: any) => void
  onDelete?: (item: any) => void
}) {
  const defaultActions = []

  if (onView) {
    defaultActions.push({
      label: 'Voir',
      onClick: onView,
      icon: <Eye className="h-4 w-4" />,
      variant: 'ghost' as const
    })
  }

  if (onEdit) {
    defaultActions.push({
      label: 'Modifier',
      onClick: onEdit,
      icon: <Edit className="h-4 w-4" />,
      variant: 'ghost' as const
    })
  }

  if (onDelete) {
    defaultActions.push({
      label: 'Supprimer',
      onClick: onDelete,
      icon: <Trash2 className="h-4 w-4" />,
      variant: 'destructive' as const
    })
  }

  return (
    <DataTable
      data={[item]}
      columns={[]}
      actions={[...defaultActions, ...(actions || [])]}
      searchable={false}
      filterable={false}
    />
  )
}

'use client'

import { Search } from 'lucide-react'
import { useQueryState } from 'nuqs'
import { useState } from 'react'
import { Card } from '../base-components/card'

interface SearchFilterProps {
  placeholder: string
}

export const SearchFilter = ({ placeholder }: SearchFilterProps) => {
  const [search, setSearch] = useQueryState('search', {
    shallow: false,
  })
  const [, setPage] = useQueryState('page', {
    shallow: false,
    parse(value) {
      return parseInt(value, 10)
    },
  })

  const [searchInput, setSearchInput] = useState<string>(search ?? '')

  const debouncedSearch = debounce((value: string) => {
    setPage(1)
    if (!value) {
      setSearch(null)
    } else {
      setSearch(value)
    }
  }, 1000)

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value)
    debouncedSearch(e.target.value)
  }

  return (
    <Card className="mb-6">
      <div className="p-4">
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="text"
            value={searchInput}
            onChange={handleSearchInputChange}
            placeholder={placeholder}
            className="block w-full rounded-md border border-slate-300 bg-white py-2 pr-3 pl-10 leading-5 placeholder-slate-500 focus:border-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-800 focus:ring-offset-1 sm:text-sm"
          />
        </div>
      </div>
    </Card>
  )
}

function debounce(fn: (searchValue: string) => void, delay: number) {
  let timeoutId: NodeJS.Timeout

  return (value: string) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn(value), delay)
  }
}

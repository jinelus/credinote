'use client'

import { useQueryState } from 'nuqs'
import { Button } from '../ui/button'

interface PaginationButtonsProps {
  maxPage: number
  currentPage: number
}

export const PaginationButtons = ({ currentPage, maxPage }: PaginationButtonsProps) => {
  const [, setCurrentPage] = useQueryState('page', {
    shallow: false,
    parse(value) {
      return parseInt(value, 10)
    },
  })

  const handleCurrentPage = (page: number) => {
    if (page > 0 && page <= maxPage) {
      setCurrentPage(page)
    }
  }

  return (
    <div className="flex items-center justify-between px-2 py-4 sm:px-6">
      <div className="flex flex-1 items-center justify-between gap-4 md:justify-center">
        <Button
          onClick={() => handleCurrentPage(currentPage - 1)}
          variant={'outline'}
          className={`relative inline-flex items-center rounded-md border border-slate-300 bg-transparent px-4 py-2 font-medium text-slate-700 text-sm disabled:bg-slate-100 disabled:text-slate-400`}
          disabled={currentPage === 1}
        >
          Anterior
        </Button>
        <div className="flex gap-1">
          {currentPage} / <span className="text-slate-400"> {maxPage} </span>
        </div>
        <Button
          onClick={() => handleCurrentPage(currentPage + 1)}
          variant={'outline'}
          className={`relative inline-flex items-center rounded-md border border-slate-300 bg-transparent px-4 py-2 font-medium text-slate-700' text-sm disabled:bg-slate-100 disabled:text-slate-400`}
          disabled={currentPage === maxPage}
        >
          Próximo
        </Button>
      </div>
    </div>
  )
}

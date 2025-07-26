'use client'

import { useQueryState } from "nuqs"
import { Button } from "../ui/button"

interface PaginationButtonsProps {
    maxPage: number
    currentPage: number
}

export const PaginationButtons = ({
    currentPage,
    maxPage,
}: PaginationButtonsProps) => {

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
        <div className="px-2 sm:px-6 py-4 flex items-center justify-between border-t border-slate-200">
          <div className="flex-1 flex items-center justify-between md:justify-center gap-4">
            <Button
              onClick={() => handleCurrentPage(currentPage - 1)}
              variant={'outline'}
              className={`relative inline-flex items-center px-4 py-2 border bg-transparent border-slate-300 text-sm font-medium rounded-md disabled:bg-slate-100 disabled:text-slate-400 text-slate-700`}
              disabled={currentPage === 1}
            >
              Anterior
            </Button>
            <div className='flex gap-1'>
              {currentPage} / <span className='text-slate-400'> {maxPage} </span>
            </div>
            <Button
              onClick={() => handleCurrentPage(currentPage + 1)}
              variant={'outline'}
              className={`relative inline-flex items-center px-4 py-2 border bg-transparent border-slate-300 text-sm font-medium rounded-md disabled:bg-slate-100 disabled:text-slate-400 text-slate-700'
              `}
              disabled={currentPage === maxPage}
            >
              Próximo
            </Button>
          </div>
        </div>
    )
}
'use client'

import { FileDown } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import Button from '@/src/components/base-components/button'

export const DownloadReportButton = () => {
  const [isDownloading, setIsDownloading] = useState(false)

  const handleDownloadReport = async () => {
    try {
      setIsDownloading(true)

      const response = await fetch('/api/reports/clients', {
        method: 'GET',
      })

      if (!response.ok) {
        throw new Error('Failed to generate report')
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)

      const contentDisposition = response.headers.get('content-disposition')
      const filenameMatch = contentDisposition?.match(/filename="(.+)"/)
      const filename =
        filenameMatch?.[1] || `relatorio-clientes-${new Date().toISOString().split('T')[0]}.pdf`

      const link = document.createElement('a')
      link.href = url
      link.download = filename
      document.body.appendChild(link)
      link.click()

      // Cleanup
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)

      toast.success('Relatório baixado com sucesso!')
    } catch (error) {
      console.error('Error downloading report:', error)
      toast.error('Erro ao baixar relatório. Tente novamente.')
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <Button
      type="button"
      onClick={handleDownloadReport}
      disabled={isDownloading}
      variant="solid"
      size="md"
      className="flex items-center justify-center gap-2"
    >
      <FileDown className="h-4 w-4" />
      {isDownloading ? 'Gerando...' : 'Gerar Relatório'}
    </Button>
  )
}

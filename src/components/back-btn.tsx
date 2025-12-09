'use client'

import { ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Button from './base-components/button'

export const GoBackBtn = () => {
  const router = useRouter()

  return (
    <Button
      variant="link"
      className="flex w-auto items-center border-none px-0"
      onClick={() => router.back()}
    >
      <ChevronLeft />
      Voltar
    </Button>
  )
}

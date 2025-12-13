'use client'

import { PencilLineIcon, XIcon } from 'lucide-react'
import { useState } from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/src/components/ui/dialog'
import Button from '../base-components/button'
import EditClientForm from '../forms/edit-client'

interface EditUserProps {
  client: {
    id: string
    name: string
    telephone?: string | null
  }
  organizationId: string
}

export const EditUser = ({ client, organizationId }: EditUserProps) => {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          variant="ghost"
          className="flex items-center justify-center gap-2 border-border"
        >
          Editar
          <PencilLineIcon className="size-5" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="flex w-full flex-row items-center justify-between">
          <DialogTitle className="font-bold text-2xl">Editar cliente</DialogTitle>
          <DialogClose asChild>
            <Button
              variant="ghost"
              className="flex h-10 w-10 items-center justify-center border-border hover:bg-slate-200 hover:text-slate-800"
            >
              <XIcon />
              <span className="sr-only">Cancelar</span>
            </Button>
          </DialogClose>
        </DialogHeader>
        <div className="mt-6">
          <EditClientForm
            client={client}
            organizationId={organizationId}
            onClose={() => setOpen(false)}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}

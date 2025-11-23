'use client'

import { useState } from 'react'
import {
  Dialog,
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
        <Button>Editar cliente</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="flex w-full items-center justify-between">
          <DialogTitle>Editar cliente</DialogTitle>
        </DialogHeader>
        <div>
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

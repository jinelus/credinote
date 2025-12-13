import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { NextResponse } from 'next/server'
import PDFDocument from 'pdfkit'
import { prisma } from '@/src/db/prisma'
import { auth } from '@/src/lib/auth'

export async function GET(request: Request) {
  const userSession = await auth.api.getSession({
    headers: request.headers,
  })

  if (!userSession?.session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const user = await prisma.user.findUniqueOrThrow({
    where: { id: userSession.session.userId },
  })

  if (!user.organizationId) {
    return NextResponse.json({ error: 'User has no organization' }, { status: 400 })
  }

  const organization = await prisma.organization.findUniqueOrThrow({
    where: { id: user.organizationId },
  })

  const clients = await prisma.client.findMany({
    where: {
      organizationId: organization.id,
      amount: {
        gt: 0,
      },
    },
    orderBy: {
      name: 'asc',
    },
  })

  const doc = new PDFDocument({
    size: 'A4',
    margins: {
      top: 80,
      bottom: 50,
      left: 50,
      right: 50,
    },
  })

  const chunks: Buffer[] = []
  doc.on('data', (chunk) => chunks.push(chunk))

  const addHeader = () => {
    doc
      .fontSize(24)
      .font('Helvetica-Bold')
      .text(organization.name, 50, 40, {
        align: 'center',
        width: doc.page.width - 100,
      })

    doc
      .moveTo(50, 75)
      .lineTo(doc.page.width - 50, 75)
      .stroke()
  }

  addHeader()

  doc.fontSize(16).font('Helvetica-Bold').text('Relatório de Clientes com Saldo Pendente', 50, 100)

  doc
    .fontSize(10)
    .font('Helvetica')
    .text(`Gerado em: ${format(new Date(), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}`, 50, 120)

  let yPosition = 160

  doc.fontSize(12).font('Helvetica-Bold')

  const tableHeaders = {
    name: { x: 55, width: 200, label: 'Cliente' },
    amount: { x: 265, width: 100, label: 'Valor Pendente' },
    updatedAt: { x: 375, width: 150, label: 'Última Atualização' },
  }

  doc
    .rect(50, yPosition - 5, doc.page.width - 100, 25)
    .fill('#f3f4f6')
    .fillColor('#000000')

  doc.text(tableHeaders.name.label, tableHeaders.name.x, yPosition + 2.5)
  doc.text(tableHeaders.amount.label, tableHeaders.amount.x, yPosition + 2.5)
  doc.text(tableHeaders.updatedAt.label, tableHeaders.updatedAt.x, yPosition + 2.5)

  yPosition += 30

  doc.fontSize(10).font('Helvetica')

  for (const client of clients) {
    if (yPosition > doc.page.height - 100) {
      doc.addPage()
      addHeader()
      yPosition = 100

      doc.fontSize(12).font('Helvetica-Bold')
      doc
        .rect(50, yPosition - 5, doc.page.width - 100, 25)
        .fill('#f3f4f6')
        .fillColor('#000000')

      doc.text(tableHeaders.name.label, tableHeaders.name.x, yPosition + 2.5)
      doc.text(tableHeaders.amount.label, tableHeaders.amount.x, yPosition + 2.5)
      doc.text(tableHeaders.updatedAt.label, tableHeaders.updatedAt.x, yPosition + 2.5)

      yPosition += 30
      doc.fontSize(10).font('Helvetica')
    }

    const rowIndex = clients.indexOf(client)
    if (rowIndex % 2 !== 0) {
      doc
        .rect(50, yPosition - 5, doc.page.width - 100, 20)
        .fill('#fafafa')
        .fillColor('#000000')
    }

    doc.text(client.name, tableHeaders.name.x, yPosition + 1, {
      width: tableHeaders.name.width,
      ellipsis: true,
    })

    doc.text(`R$ ${Number(client.amount).toFixed(2)}`, tableHeaders.amount.x, yPosition + 1)

    doc.text(
      format(client.updatedAt, 'dd/MM/yyyy', { locale: ptBR }),
      tableHeaders.updatedAt.x,
      yPosition + 1,
    )

    yPosition += 25
  }

  doc
    .fontSize(10)
    .font('Helvetica-Bold')
    .text(`Total de clientes com saldo pendente: ${clients.length}`, 50, yPosition + 20)

  doc.end()

  const pdfBuffer = await new Promise<Buffer>((resolve) => {
    doc.on('end', () => {
      resolve(Buffer.concat(chunks))
    })
  })

  const filename = `relatorio-clientes-${format(new Date(), 'yyyy-MM-dd')}.pdf`

  return new NextResponse(new Uint8Array(pdfBuffer), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${filename}"`,
    },
  })
}

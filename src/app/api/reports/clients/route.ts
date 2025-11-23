import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { type NextRequest, NextResponse } from 'next/server'
import PDFDocument from 'pdfkit'
import { prisma } from '@/src/db/prisma'
import { getSession } from '@/src/lib/get-session'

export async function GET(_request: NextRequest) {
  try {
    // Get session and organization
    const { organization } = await getSession()

    // Fetch clients with amount > 0
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

    // Create PDF document
    const doc = new PDFDocument({
      size: 'A4',
      margins: {
        top: 80,
        bottom: 50,
        left: 50,
        right: 50,
      },
    })

    // Buffer to store PDF
    const chunks: Buffer[] = []
    doc.on('data', (chunk) => chunks.push(chunk))

    // Header function for each page
    const addHeader = () => {
      doc
        .fontSize(24)
        .font('Helvetica-Bold')
        .text(organization.name, 50, 40, {
          align: 'center',
          width: doc.page.width - 100,
        })

      // Add a line below header
      doc
        .moveTo(50, 75)
        .lineTo(doc.page.width - 50, 75)
        .stroke()
    }

    // Add header to first page
    addHeader()

    // Title
    doc
      .fontSize(16)
      .font('Helvetica-Bold')
      .text('Relatório de Clientes com Saldo Pendente', 50, 100)

    // Date of report
    doc
      .fontSize(10)
      .font('Helvetica')
      .text(`Gerado em: ${format(new Date(), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}`, 50, 120)

    // Starting Y position for table
    let yPosition = 160

    // Table headers
    doc.fontSize(12).font('Helvetica-Bold')

    const tableHeaders = {
      name: { x: 50, width: 200, label: 'Cliente' },
      amount: { x: 260, width: 100, label: 'Valor Pendente' },
      updatedAt: { x: 370, width: 150, label: 'Última Atualização' },
    }

    // Draw table header background
    doc
      .rect(50, yPosition - 5, doc.page.width - 100, 25)
      .fill('#f3f4f6')
      .fillColor('#000000')

    // Draw table headers
    doc.text(tableHeaders.name.label, tableHeaders.name.x, yPosition)
    doc.text(tableHeaders.amount.label, tableHeaders.amount.x, yPosition)
    doc.text(tableHeaders.updatedAt.label, tableHeaders.updatedAt.x, yPosition)

    yPosition += 30

    // Table rows
    doc.fontSize(10).font('Helvetica')

    for (const client of clients) {
      // Check if we need a new page
      if (yPosition > doc.page.height - 100) {
        doc.addPage()
        addHeader()
        yPosition = 100

        // Redraw table headers on new page
        doc.fontSize(12).font('Helvetica-Bold')
        doc
          .rect(50, yPosition - 5, doc.page.width - 100, 25)
          .fill('#f3f4f6')
          .fillColor('#000000')

        doc.text(tableHeaders.name.label, tableHeaders.name.x, yPosition)
        doc.text(tableHeaders.amount.label, tableHeaders.amount.x, yPosition)
        doc.text(tableHeaders.updatedAt.label, tableHeaders.updatedAt.x, yPosition)

        yPosition += 30
        doc.fontSize(10).font('Helvetica')
      }

      // Draw row background (alternating)
      const rowIndex = clients.indexOf(client)
      if (rowIndex % 2 === 0) {
        doc
          .rect(50, yPosition - 5, doc.page.width - 100, 20)
          .fill('#fafafa')
          .fillColor('#000000')
      }

      // Client name
      doc.text(client.name, tableHeaders.name.x, yPosition, {
        width: tableHeaders.name.width,
        ellipsis: true,
      })

      // Amount
      doc.text(`R$ ${Number(client.amount).toFixed(2)}`, tableHeaders.amount.x, yPosition)

      // Updated date in PT-BR format
      doc.text(
        format(client.updatedAt, 'dd/MM/yyyy', { locale: ptBR }),
        tableHeaders.updatedAt.x,
        yPosition,
      )

      yPosition += 25
    }

    // Add footer with total count
    doc
      .fontSize(10)
      .font('Helvetica-Bold')
      .text(`Total de clientes com saldo pendente: ${clients.length}`, 50, yPosition + 20)

    // Finalize PDF
    doc.end()

    // Wait for PDF to be generated
    const pdfBuffer = await new Promise<Buffer>((resolve) => {
      doc.on('end', () => {
        resolve(Buffer.concat(chunks))
      })
    })

    // Generate filename with current date
    const filename = `relatorio-clientes-${format(new Date(), 'yyyy-MM-dd')}.pdf`

    // Return PDF as download
    return new NextResponse(new Uint8Array(pdfBuffer), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    })
  } catch (error) {
    console.error('Error generating PDF:', error)
    return NextResponse.json({ error: 'Failed to generate PDF report' }, { status: 500 })
  }
}

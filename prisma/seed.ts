import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting seed...')

  // Clear existing data
  console.log('🗑️  Clearing existing data...')
  await prisma.payment.deleteMany()
  await prisma.order.deleteMany()
  await prisma.client.deleteMany()
  await prisma.session.deleteMany()
  await prisma.account.deleteMany()
  await prisma.user.deleteMany()
  await prisma.organization.deleteMany()

  // Create Organization
  console.log('🏢 Creating organization...')
  const organization = await prisma.organization.create({
    data: {
      id: faker.string.uuid(),
      name: 'JCB Mercado',
      slug: 'jcb-mercado',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  })

  // Create User using Better Auth's signup endpoint
  console.log('👤 Creating user via Better Auth API...')
  try {
    const response = await fetch('http://localhost:3000/api/auth/sign-up/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'crist@gmail.com',
        password: 'Crist#01',
        name: 'Cristiano',
      }),
    })

    if (!response.ok) {
      throw new Error(`Failed to create user: ${response.statusText}`)
    }

    const userData = await response.json()
    console.log('✅ User created:', userData.user.email)

    // Update user to link to organization
    await prisma.user.update({
      where: {
        id: userData.user.id,
      },
      data: {
        organizationId: organization.id,
      },
    })
  } catch (error) {
    console.error('❌ Failed to create user via API:', error)
    console.log('Note: Make sure the dev server is running on http://localhost:3000')
    throw error
  }

  // Create Clients with varying amounts
  console.log('👥 Creating clients...')
  const clients = []

  // Clients with outstanding balances (amount > 0) - for PDF report
  for (let i = 0; i < 8; i++) {
    const client = await prisma.client.create({
      data: {
        id: faker.string.uuid(),
        name: faker.person.fullName(),
        cpf: faker.string.numeric(11),
        telephone: faker.phone.number(),
        amount: faker.number.float({ min: 50, max: 1500, multipleOf: 0.01 }),
        organizationId: organization.id,
        createdAt: faker.date.past({ years: 1 }),
        updatedAt: faker.date.recent({ days: 30 }),
      },
    })
    clients.push(client)
  }

  // Clients with no balance (amount = 0) - should NOT appear in PDF
  for (let i = 0; i < 3; i++) {
    const client = await prisma.client.create({
      data: {
        id: faker.string.uuid(),
        name: faker.person.fullName(),
        cpf: faker.string.numeric(11),
        telephone: faker.phone.number(),
        amount: 0,
        organizationId: organization.id,
        createdAt: faker.date.past({ years: 1 }),
        updatedAt: faker.date.recent({ days: 30 }),
      },
    })
    clients.push(client)
  }

  console.log(`✅ Created ${clients.length} clients (8 with balance, 3 without)`)

  // Create Orders for each client
  console.log('📦 Creating orders...')
  let orderCount = 0
  for (const client of clients) {
    const numOrders = faker.number.int({ min: 2, max: 5 })
    for (let i = 0; i < numOrders; i++) {
      await prisma.order.create({
        data: {
          id: faker.string.uuid(),
          total: faker.number.float({ min: 20, max: 500, multipleOf: 0.01 }),
          date: faker.date.recent({ days: 60 }),
          clientId: client.id,
        },
      })
      orderCount++
    }
  }
  console.log(`✅ Created ${orderCount} orders`)

  // Create Payments for some clients
  console.log('💰 Creating payments...')
  let paymentCount = 0
  for (const client of clients.slice(0, 6)) {
    const numPayments = faker.number.int({ min: 1, max: 3 })
    for (let i = 0; i < numPayments; i++) {
      await prisma.payment.create({
        data: {
          id: faker.string.uuid(),
          amount: faker.number.float({ min: 50, max: 300, multipleOf: 0.01 }),
          method: faker.helpers.arrayElement(['CASH', 'CARD', 'PIX']),
          paidAt: faker.date.recent({ days: 30 }),
          clientId: client.id,
        },
      })
      paymentCount++
    }
  }
  console.log(`✅ Created ${paymentCount} payments`)

  console.log('🎉 Seed completed successfully!')
  console.log('\n📊 Summary:')
  console.log(`  - Organization: ${organization.name}`)
  console.log(`  - User: crist@gmail.com (password: Crist#01)`)
  console.log(`  - Clients: ${clients.length} (8 with outstanding balance)`)
  console.log(`  - Orders: ${orderCount}`)
  console.log(`  - Payments: ${paymentCount}`)
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

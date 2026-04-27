// @ts-nocheck
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Clean DB
  await prisma.recyclingEvent.deleteMany()
  await prisma.machine.deleteMany()
  await prisma.location.deleteMany()
  await prisma.reward.deleteMany()
  await prisma.user.deleteMany()
  await prisma.company.deleteMany()
  await prisma.lead.deleteMany()

  console.log('Clearing database...')

  // 1. Create Companies
  const ecoSortCompany = await prisma.company.create({
    data: { name: 'EcoSort Rewards HQ', type: 'INTERNAL' },
  })

  const universityCompany = await prisma.company.create({
    data: { name: 'Universidad Politécnica', type: 'CLIENT' },
  })

  const partnerCompany = await prisma.company.create({
    data: { name: 'Green Cafe', type: 'PARTNER' },
  })

  // 2. Create Users
  const superAdmin = await prisma.user.create({
    data: {
      name: 'Super Admin',
      email: 'admin@ecosort.com',
      role: 'SUPER_ADMIN',
      companyId: ecoSortCompany.id,
    },
  })

  const clientUser = await prisma.user.create({
    data: {
      name: 'Gestor Universidad',
      email: 'gestor@universidad.edu',
      role: 'CLIENTE_INSTITUCIONAL',
      companyId: universityCompany.id,
    },
  })

  const finalUser = await prisma.user.create({
    data: {
      name: 'Estudiante',
      email: 'estudiante@universidad.edu',
      role: 'USUARIO_BASICO',
    },
  })

  // 3. Create Locations
  const location1 = await prisma.location.create({
    data: {
      name: 'Campus Central - Edificio principal',
      address: 'Calle Universidad 1, Madrid',
      companyId: universityCompany.id,
    },
  })

  // 4. Create Machines
  const machine1 = await prisma.machine.create({
    data: {
      serialNumber: 'ES-2026-001',
      status: 'ACTIVE',
      capacity: 45,
      locationId: location1.id,
    },
  })

  const machine2 = await prisma.machine.create({
    data: {
      serialNumber: 'ES-2026-002',
      status: 'MAINTENANCE',
      capacity: 80,
      locationId: location1.id,
    },
  })

  // 5. Create Rewards
  const reward1 = await prisma.reward.create({
    data: {
      title: 'Café Gratis',
      description: 'Canjea tus puntos por un café gratis en Green Cafe',
      pointsRequired: 50,
      stock: 100,
      companyId: partnerCompany.id,
    },
  })

  const reward2 = await prisma.reward.create({
    data: {
      title: 'Descuento 10% en Librería',
      description: '10% de descuento en la librería del campus',
      pointsRequired: 150,
      stock: 50,
      companyId: universityCompany.id,
    },
  })

  // 6. Create Recycling Events
  await prisma.recyclingEvent.create({
    data: {
      userId: finalUser.id,
      machineId: machine1.id,
      materialType: 'PLASTIC',
      weight: 0.15, // 150g
      pointsEarned: 10,
    },
  })

  await prisma.recyclingEvent.create({
    data: {
      userId: finalUser.id,
      machineId: machine1.id,
      materialType: 'CAN',
      weight: 0.05, // 50g
      pointsEarned: 5,
    },
  })

  // 7. Create Demo Leads
  await prisma.lead.create({
    data: {
      name: 'Ayuntamiento de Madrid',
      email: 'contacto@madrid.es',
      company: 'Ayuntamiento de Madrid',
      message: 'Estamos interesados en un piloto para el centro.',
      status: 'NEW',
    },
  })

  console.log('Seeding finished.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

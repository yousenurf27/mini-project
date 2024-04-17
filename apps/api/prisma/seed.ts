import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  const user = await prisma.role.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'user',
    },
  })
  const admin = await prisma.role.upsert({
    where: { id: 2 },
    update: {},
    create: {
      name: 'admin',
    },
  })
  console.log({ user, admin })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
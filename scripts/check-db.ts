import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  try {
    console.log('\n=== Checking Database State ===\n')

    // Check admin user
    const adminUser = await prisma.user.findUnique({
      where: { email: 'admin@example.com' },
      select: {
        id: true,
        email: true,
        role: true,
        name: true
      }
    })
    console.log('Admin user:', adminUser)

    // Check categories
    const categories = await prisma.category.findMany()
    console.log('\nCategories:', categories)

  } catch (error) {
    console.error('Error checking database:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()

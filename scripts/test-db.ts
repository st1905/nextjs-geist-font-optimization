import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  try {
    console.log('\n=== TESTING DATABASE CONNECTION ===\n')

    // Test database connection
    await prisma.$connect()
    console.log('✅ Database connected successfully')

    // Count existing categories
    const categoryCount = await prisma.category.count()
    console.log(`\n📊 Current category count: ${categoryCount}`)

    // List existing categories
    const existingCategories = await prisma.category.findMany({
      orderBy: { name: 'asc' }
    })
    console.log('\n📋 Existing categories:', JSON.stringify(existingCategories, null, 2))

    // Try to create a test category
    console.log('\n📝 Creating test category...')
    const testCategory = await prisma.category.create({
      data: {
        name: 'Test Category',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })
    console.log('✅ Test category created:', JSON.stringify(testCategory, null, 2))

    // Verify the category was created
    const verifyCategory = await prisma.category.findUnique({
      where: { id: testCategory.id }
    })
    console.log('\n🔍 Verification:', JSON.stringify(verifyCategory, null, 2))

    // Clean up
    console.log('\n🗑️ Cleaning up test category...')
    await prisma.category.delete({
      where: { id: testCategory.id }
    })
    console.log('✅ Test category deleted')

    console.log('\n✨ Test completed successfully!')
  } catch (error) {
    console.error('❌ Test failed:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect()
    process.exit(1)
  })

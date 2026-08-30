const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function createAdmin() {
  try {
    // Check if admin already exists
    const existingAdmin = await prisma.admin.findUnique({
      where: { email: 'admin@veyratech.com' }
    });

    if (existingAdmin) {
      console.log('\n✅ Admin user already exists!');
      console.log('\n📧 Login Credentials:');
      console.log('━'.repeat(50));
      console.log('Email:    admin@veyratech.com');
      console.log('Password: (use your existing password)');
      console.log('━'.repeat(50));
      console.log('\n🔗 Admin Login URL:');
      console.log('http://localhost:3000/admin/login\n');
      return;
    }

    // Create admin user
    const hashedPassword = await bcrypt.hash('Admin123!', 10);
    
    const admin = await prisma.admin.create({
      data: {
        name: 'Admin User',
        email: 'admin@veyratech.com',
        passwordHash: hashedPassword,
        status: 'ACTIVE'
      }
    });

    console.log('\n✅ Admin user created successfully!');
    console.log('\n📧 Login Credentials:');
    console.log('━'.repeat(50));
    console.log('Email:    admin@veyratech.com');
    console.log('Password: Admin123!');
    console.log('━'.repeat(50));
    console.log('\n🔗 Admin Login URL:');
    console.log('http://localhost:3000/admin/login');
    console.log('\n⚠️  IMPORTANT: Change this password after first login!\n');

  } catch (error) {
    console.error('❌ Error creating admin:', error);
    console.error('\nTroubleshooting:');
    console.error('1. Make sure the database is running');
    console.error('2. Check your .env file has correct DATABASE_URL');
    console.error('3. Run: npx prisma migrate dev');
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();

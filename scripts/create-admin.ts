import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function createAdmin() {
  try {
    // Check if admin already exists
    const existingAdmin = await prisma.admin.findUnique({
      where: { email: 'admin@veyratech.com' }
    });

    if (existingAdmin) {
      console.log('✅ Admin user already exists!');
      console.log('Email: admin@veyratech.com');
      console.log('You can reset the password if needed.');
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
    console.log('http://localhost:3000/admin-login');
    console.log('\n⚠️  Remember to change this password after first login!\n');

  } catch (error) {
    console.error('❌ Error creating admin:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();

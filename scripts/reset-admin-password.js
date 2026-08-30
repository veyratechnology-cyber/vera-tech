const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function resetAdminPassword() {
  try {
    const newPassword = 'VeyraTech2024!';
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    const admin = await prisma.admin.update({
      where: { email: 'admin@veyratech.com' },
      data: { 
        passwordHash: hashedPassword,
        status: 'ACTIVE'
      }
    });

    console.log('\n✅ Admin password reset successfully!');
    console.log('\n📧 Updated Login Credentials:');
    console.log('━'.repeat(50));
    console.log('Email:    admin@veyratech.com');
    console.log('Password: VeyraTech2024!');
    console.log('━'.repeat(50));
    console.log('\n🔗 Admin Login URL:');
    console.log('http://localhost:3000/admin/login');
    console.log('\n💡 Copy these credentials and log in now!\n');

  } catch (error) {
    console.error('❌ Error resetting password:', error);
  } finally {
    await prisma.$disconnect();
  }
}

resetAdminPassword();

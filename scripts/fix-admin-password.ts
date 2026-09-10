/**
 * Fix Admin Password Script
 * Resets admin password to known value
 */

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function fixAdminPassword() {
  try {
    console.log('🔧 Fixing admin password...\n');

    // The correct password
    const password = 'bonaventure123kenya';
    
    // Create new hash
    const saltRounds = 10;
    const passwordHash = bcrypt.hashSync(password, saltRounds);
    
    console.log('✅ New password hash generated');
    console.log('Hash:', passwordHash);
    
    // Test the hash
    const testCompare = bcrypt.compareSync(password, passwordHash);
    console.log('✅ Hash verification test:', testCompare ? 'PASSED' : 'FAILED');
    
    if (!testCompare) {
      throw new Error('Hash verification failed!');
    }
    
    // Update admin user
    const admin = await prisma.admin.upsert({
      where: { email: 'admin@veyratech.com' },
      update: {
        passwordHash,
        status: 'ACTIVE',
      },
      create: {
        email: 'admin@veyratech.com',
        name: 'Administrator',
        passwordHash,
        status: 'ACTIVE',
      },
    });
    
    console.log('\n✅ Admin user updated successfully!');
    console.log('Email:', admin.email);
    console.log('Status:', admin.status);
    console.log('\n📝 Login credentials:');
    console.log('Email: admin@veyratech.com');
    console.log('Password: bonaventure123kenya');
    
    // Verify we can find the admin
    const testFind = await prisma.admin.findUnique({
      where: { email: 'admin@veyratech.com' },
    });
    
    if (!testFind) {
      throw new Error('Could not find admin after update!');
    }
    
    // Verify password works
    const testPassword = bcrypt.compareSync(password, testFind.passwordHash);
    console.log('\n✅ Final verification:', testPassword ? 'SUCCESS' : 'FAILED');
    
    if (!testPassword) {
      throw new Error('Password verification failed after update!');
    }
    
    console.log('\n🎉 Admin password fixed successfully!');
    
  } catch (error) {
    console.error('\n❌ Error:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

fixAdminPassword();

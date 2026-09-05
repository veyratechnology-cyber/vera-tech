// Check admin user and verify password
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function checkAdmin() {
  console.log('🔍 Checking admin user...\n');
  
  try {
    // Find admin
    const admin = await prisma.admin.findUnique({
      where: { email: 'admin@veyratech.com' }
    });
    
    if (!admin) {
      console.log('❌ Admin user not found!');
      console.log('   Run: complete-database-setup.sql in Supabase');
      return;
    }
    
    console.log('✅ Admin user found:');
    console.log('   Email:', admin.email);
    console.log('   Name:', admin.name);
    console.log('   Status:', admin.status);
    console.log('   Password hash:', admin.passwordHash.substring(0, 20) + '...');
    console.log('');
    
    // Test password: bonaventure123kenya
    console.log('🔐 Testing password: bonaventure123kenya');
    const isValid = await bcrypt.compare('bonaventure123kenya', admin.passwordHash);
    console.log('   Result:', isValid ? '✅ CORRECT' : '❌ WRONG');
    console.log('');
    
    if (!isValid) {
      console.log('🔧 Password is wrong! Creating new hash...');
      const newHash = await bcrypt.hash('bonaventure123kenya', 10);
      console.log('   New hash:', newHash);
      console.log('');
      console.log('📋 Run this in Supabase SQL Editor:');
      console.log('');
      console.log(`UPDATE admins SET password_hash = '${newHash}' WHERE email = 'admin@veyratech.com';`);
      console.log('');
    } else {
      console.log('✅ Password is correct! Login should work.');
      console.log('');
      console.log('⚠️ If login still fails with 401, check:');
      console.log('   1. Did Vercel redeploy finish? (wait 3-4 minutes)');
      console.log('   2. Is DATABASE_URL updated in Vercel?');
      console.log('   3. Check Vercel function logs for actual error');
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

checkAdmin();

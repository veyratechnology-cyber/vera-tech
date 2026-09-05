// Quick test to check if database is accessible and tables exist
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testConnection() {
  console.log('🔍 Testing database connection...\n');
  
  try {
    // Test 1: Can we connect?
    console.log('Test 1: Basic connection...');
    await prisma.$connect();
    console.log('✅ Connected to database\n');
    
    // Test 2: Does admins table exist and have data?
    console.log('Test 2: Checking admins table...');
    const adminCount = await prisma.admin.count();
    console.log(`✅ Admins table exists. Count: ${adminCount}`);
    
    if (adminCount === 0) {
      console.log('⚠️  WARNING: No admin users found!');
      console.log('   You need to run: complete-database-setup.sql');
    } else {
      const admins = await prisma.admin.findMany({
        select: { email: true, status: true }
      });
      console.log('   Admins found:', admins);
    }
    console.log('');
    
    // Test 3: Does consultations table exist?
    console.log('Test 3: Checking consultations table...');
    const consultationCount = await prisma.consultation.count();
    console.log(`✅ Consultations table exists. Count: ${consultationCount}\n`);
    
    // Test 4: Does contact_messages table exist?
    console.log('Test 4: Checking contact_messages table...');
    const messageCount = await prisma.contactMessage.count();
    console.log(`✅ Contact messages table exists. Count: ${messageCount}\n`);
    
    // Test 5: Check all tables
    console.log('Test 5: Checking all tables...');
    const tables = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name;
    `;
    console.log(`✅ Found ${tables.length} tables in database`);
    console.log('Tables:', tables.map(t => t.table_name).join(', '));
    console.log('');
    
    console.log('🎉 All tests passed! Database is working correctly.');
    console.log('\n✅ Your admin login should work at:');
    console.log('   https://vera-tech.vercel.app/admin-login');
    console.log('   Email: admin@veyratech.com');
    console.log('   Password: bonaventure123kenya');
    
  } catch (error) {
    console.error('❌ Database error:', error.message);
    console.error('\n🔧 Fix:');
    
    if (error.message.includes('relation') && error.message.includes('does not exist')) {
      console.error('   Tables do not exist. Run this in Supabase:');
      console.error('   1. Open: https://supabase.com/dashboard/project/rughcgcyuoskszqzricx/sql/new');
      console.error('   2. Copy all content from: complete-database-setup.sql');
      console.error('   3. Paste and click RUN');
    } else if (error.message.includes('ENOTFOUND') || error.message.includes('not found')) {
      console.error('   Database connection string is wrong.');
      console.error('   Current DATABASE_URL:', process.env.DATABASE_URL);
      console.error('   Get correct URL from: https://supabase.com/dashboard/project/rughcgcyuoskszqzricx/settings/database');
    } else if (error.message.includes('password') || error.message.includes('authentication')) {
      console.error('   Password is wrong. Should be: Aggrey123kenya');
    } else {
      console.error('   Unknown error. Check DATABASE_URL in .env file');
    }
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();

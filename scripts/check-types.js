#!/usr/bin/env node

/**
 * Type Safety Pre-Deployment Check
 * Run this before every deployment to catch TypeScript errors early
 */

const { execSync } = require('child_process');
const path = require('path');

console.log('🔍 Running comprehensive type checks...\n');

const checks = [
  {
    name: 'Prisma Client Generation',
    command: 'npx prisma generate',
    description: 'Generating Prisma Client types...',
  },
  {
    name: 'TypeScript Compilation',
    command: 'npx tsc --noEmit',
    description: 'Checking TypeScript types...',
  },
  {
    name: 'Next.js Build Check',
    command: 'npm run build',
    description: 'Building Next.js application...',
  },
];

let allPassed = true;

for (const check of checks) {
  console.log(`\n📋 ${check.name}`);
  console.log(`   ${check.description}`);
  
  try {
    execSync(check.command, {
      cwd: path.resolve(__dirname, '..'),
      stdio: 'inherit',
      env: { ...process.env, NODE_ENV: 'production' },
    });
    console.log(`   ✅ ${check.name} passed\n`);
  } catch (error) {
    console.error(`   ❌ ${check.name} failed\n`);
    allPassed = false;
    break; // Stop on first failure
  }
}

if (allPassed) {
  console.log('\n✅ All type checks passed! Safe to deploy.\n');
  process.exit(0);
} else {
  console.error('\n❌ Type checks failed. Fix errors before deploying.\n');
  process.exit(1);
}

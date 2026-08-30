-- Fix enum mappings for Prisma
-- Run this in Supabase SQL Editor

-- Admin enums already exist with lowercase names
-- Prisma schema just needs @@map directives which we already added

SELECT 'Enum types already exist with snake_case names' as status;
SELECT 'Prisma schema needs @@map directives for each enum' as note;

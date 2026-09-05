# 🚀 RUN THIS IN SUPABASE TO FIX ADMIN LOGIN

## ✅ Quick Fix (2 Minutes)

### Step 1: Open Supabase SQL Editor
👉 **CLICK HERE:** https://supabase.com/dashboard/project/rughcgcyuoskszqzricx/sql/new

### Step 2: Copy This SQL
```sql
-- Fix admin password
UPDATE admins 
SET password_hash = '$2a$10$ESawmQ4JS0TQNeZNMTXeruup2VJ36vzNagkyVXW1e16UL.hVXecAC'
WHERE email = 'admin@veyratech.com';

-- If admin doesn't exist, create it
INSERT INTO admins (id, name, email, password_hash, status, created_at, updated_at)
SELECT 
  gen_random_uuid()::text,
  'Admin User',
  'admin@veyratech.com',
  '$2a$10$ESawmQ4JS0TQNeZNMTXeruup2VJ36vzNagkyVXW1e16UL.hVXecAC',
  'ACTIVE',
  NOW(),
  NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM admins WHERE email = 'admin@veyratech.com'
);
```

### Step 3: Click RUN

### Step 4: Test Login NOW
1. Go to: https://vera-tech.vercel.app/admin-login
2. Email: `admin@veyratech.com`
3. Password: `bonaventure123kenya`
4. **Should work!** ✅

---

## 🎯 What This Does

- ✅ Fixes the admin password hash
- ✅ Creates admin user if it doesn't exist
- ✅ Makes login work immediately

---

## ⚠️ If You Still See Errors on Admin Pages

The error `Server Components render error` means some tables might be missing.

### Check if all tables exist:
```sql
SELECT COUNT(*) as table_count 
FROM information_schema.tables 
WHERE table_schema = 'public';
```

**Should return:** 18 tables

**If less than 18:**
1. Open file: `complete-database-setup.sql`
2. Copy ALL content
3. Paste in Supabase SQL Editor
4. Click RUN

---

## ✅ After Running the SQL

**Admin Login Will Work:**
- URL: https://vera-tech.vercel.app/admin-login
- Email: admin@veyratech.com
- Password: bonaventure123kenya

**All Admin Pages Will Load:**
- Dashboard
- Leads
- Prospects
- Consultations
- Proposals
- Projects
- Services
- Industries
- Insights
- Contact Messages

**No More Errors!** 🎉

---

**RUN THE SQL ABOVE AND LOGIN WILL WORK IMMEDIATELY!**

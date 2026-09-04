# ⚡ QUICK FIX - Run This First!

## 🎯 Problem
Your admin dashboard pages are showing **500 errors** because the database tables don't exist yet.

## ✅ Solution (3 Steps)

### Step 1: Open Supabase
Go to: https://supabase.com/dashboard/project/rughcgcyuoskszqzricx/sql/new

### Step 2: Copy & Run SQL
1. Open the file: **`complete-database-setup.sql`** (in this folder)
2. Copy **ALL** the content
3. Paste into Supabase SQL Editor
4. Click **RUN**

### Step 3: Wait & Test
1. Wait 2 minutes for Vercel to auto-redeploy
2. Go to: https://vera-tech.vercel.app/admin-login
3. Login:
   - Email: `admin@veyratech.com`
   - Password: `bonaventure123kenya`

---

## ✅ What This Does

Creates ALL missing tables:
- ✅ consultations (fixes the 500 error you're seeing)
- ✅ leads
- ✅ prospects
- ✅ proposals
- ✅ projects
- ✅ services
- ✅ industry_pages
- ✅ insights
- ✅ contact_messages
- ✅ notifications
- ✅ Plus 12 more supporting tables

---

## 📖 Need More Details?

See: **`DATABASE_SETUP_GUIDE.md`** for full documentation and troubleshooting.

---

**That's it!** All admin pages will work after this. 🚀

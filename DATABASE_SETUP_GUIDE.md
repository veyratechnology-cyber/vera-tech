# VeyraTech Database Setup Guide

## 🚀 Quick Setup (5 Minutes)

### Step 1: Open Supabase SQL Editor
1. Go to https://supabase.com/dashboard
2. Select your project: `rughcgcyuoskszqzricx`
3. Click **SQL Editor** in the left sidebar
4. Click **New Query**

### Step 2: Run the Database Setup
1. Open the file: `complete-database-setup.sql`
2. Copy ALL content from that file
3. Paste it into the Supabase SQL Editor
4. Click **Run** (or press Ctrl+Enter)

### Step 3: Verify Setup
Wait for the query to complete. You should see:
- ✅ All tables created
- ✅ All enums created
- ✅ Admin user inserted

### Step 4: Test Admin Login
1. Go to https://vera-tech.vercel.app/admin-login
2. Login with:
   - **Email:** `admin@veyratech.com`
   - **Password:** `bonaventure123kenya`

---

## 📊 What Tables Were Created?

### Core Admin & Auth
- ✅ **admins** - Admin users and authentication

### CRM (Customer Relationship Management)
- ✅ **leads** - Incoming sales leads
- ✅ **prospects** - Outbound prospecting targets

### Sales & Consultations
- ✅ **consultations** - Consultation booking requests
- ✅ **consultation_reminders** - Automated reminders
- ✅ **consultation_history** - Activity tracking
- ✅ **proposals** - Sales proposals sent to clients

### Project Delivery
- ✅ **projects** - Active client projects
- ✅ **project_milestones** - Project milestone tracking
- ✅ **assessments** - Technology assessments
- ✅ **documents** - Project files and documents

### Content Management
- ✅ **services** - Service pages (AI, Automation, etc.)
- ✅ **industry_pages** - Industry-specific pages
- ✅ **insights** - Blog posts and articles

### Communication
- ✅ **contact_messages** - Contact form submissions
- ✅ **notifications** - Admin notifications

### System
- ✅ **system_settings** - System configuration
- ✅ **audit_logs** - Activity audit trail

---

## 🔍 Admin Dashboard Pages & Their Tables

| Dashboard Page | Required Tables | Status |
|---------------|-----------------|--------|
| `/admin` (Dashboard) | leads, prospects, consultations, proposals, projects | ✅ Created |
| `/admin/leads` | leads, admins | ✅ Created |
| `/admin/prospects` | prospects, admins | ✅ Created |
| `/admin/consultations` | consultations, leads, admins | ✅ Created |
| `/admin/consultations/[id]` | consultations, consultation_history, consultation_reminders | ✅ Created |
| `/admin/proposals` | proposals, leads, admins | ✅ Created |
| `/admin/proposals/[id]` | proposals, leads, projects | ✅ Created |
| `/admin/projects` | projects, admins, proposals | ✅ Created |
| `/admin/projects/[id]` | projects, project_milestones, documents | ✅ Created |
| `/admin/services` | services | ✅ Created |
| `/admin/industries` | industry_pages | ✅ Created |
| `/admin/insights` | insights, admins | ✅ Created |
| `/admin/contact-messages` | contact_messages | ✅ Created |
| `/admin/analytics` | leads, consultations, proposals | ✅ Created |

---

## 🎯 What This Fixes

### Before (Errors)
- ❌ Consultations page: 500 error (table missing)
- ❌ Notifications: 500 error (table missing)
- ❌ Leads page: would crash if accessed
- ❌ All admin pages: no data to display

### After (Working)
- ✅ All pages load successfully
- ✅ No 500 errors
- ✅ Data displays properly (empty at first, but no errors)
- ✅ Can create new leads, consultations, etc.

---

## 📝 Important Notes

### 1. Empty Tables Are Normal
After running the setup, most tables will be empty. This is correct! The tables now exist and are ready to receive data when:
- Users submit consultation forms
- You create leads in the admin dashboard
- Contact forms are submitted

### 2. Admin Password Hash
The default admin password `bonaventure123kenya` is already hashed in the SQL file using bcrypt. You can login immediately after running the setup.

### 3. Database URL
Make sure Vercel has this environment variable:
```
DATABASE_URL=postgresql://postgres.rughcgcyuoskszqzricx:Aggrey123kenya@aws-1-eu-west-1.pooler.supabase.com:6543/postgres
```

### 4. Connection Pooling
The database URL uses port **6543** (connection pooler) which is required for Vercel serverless functions.

---

## 🔧 Troubleshooting

### Issue: "relation already exists"
**Solution:** The tables already exist. This is fine! The script drops existing tables first, so you can safely re-run it.

### Issue: Still getting 500 errors after setup
**Possible causes:**
1. Vercel environment variables not set correctly
2. Tables created but Vercel hasn't redeployed yet
3. DATABASE_URL pointing to wrong database

**Solution:**
1. Check Vercel environment variables match exactly
2. Wait 2-3 minutes for automatic redeploy after the SQL runs
3. Or trigger manual redeploy: `git commit --allow-empty -m "trigger redeploy" && git push`

### Issue: Can't login to admin
**Check:**
1. Did you run the complete SQL file?
2. Is the admin user in the `admins` table?

**Verify in Supabase:**
```sql
SELECT email, status FROM admins WHERE email = 'admin@veyratech.com';
```

If empty, run this:
```sql
INSERT INTO admins (id, name, email, password_hash, status, created_at, updated_at)
VALUES (
  gen_random_uuid()::text,
  'Admin User',
  'admin@veyratech.com',
  '$2a$10$8YzO3xg5RxHJe.rK1PkCYOyLhLhqZYh4z6HBqH.FZV8vkGbJkZXTW',
  'ACTIVE',
  NOW(),
  NOW()
);
```

---

## ✅ Verification Checklist

Run these queries in Supabase SQL Editor to verify everything is set up:

### Check all tables exist:
```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;
```

You should see 22 tables.

### Check admin user exists:
```sql
SELECT id, email, name, status FROM admins;
```

Should return: `admin@veyratech.com`

### Check table counts:
```sql
SELECT 
  (SELECT COUNT(*) FROM admins) as admins,
  (SELECT COUNT(*) FROM leads) as leads,
  (SELECT COUNT(*) FROM consultations) as consultations,
  (SELECT COUNT(*) FROM proposals) as proposals,
  (SELECT COUNT(*) FROM projects) as projects;
```

Should return: `admins: 1, leads: 0, consultations: 0, proposals: 0, projects: 0`

---

## 🎉 Next Steps After Setup

1. **Test Admin Login**
   - Go to https://vera-tech.vercel.app/admin-login
   - Login with admin credentials
   - Verify dashboard loads without errors

2. **Test Consultation Booking**
   - Go to https://vera-tech.vercel.app/book-consultation
   - Fill out form and submit
   - Check admin dashboard for new consultation

3. **Verify All Pages Load**
   - Click through all admin sidebar links
   - Each page should load (may be empty, but no errors)

4. **Create Sample Data** (Optional)
   - Create a test lead
   - Create a test consultation
   - Verify it appears in dashboard

---

## 📞 Support

If you encounter any issues:

1. Check Vercel deployment logs
2. Check Supabase logs
3. Verify environment variables
4. Ensure DATABASE_URL is correct

---

**Database Setup Complete!** 🚀

All admin pages should now work without 500 errors.

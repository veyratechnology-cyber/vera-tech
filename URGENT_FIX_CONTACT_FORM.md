# 🚨 URGENT: Fix Contact Form Database Error

## Current Issue

Contact form shows: **"Error: Database connection failed"**

Error codes: `400` then `503`

## Root Cause

The `contact_messages` table doesn't exist in your production Supabase database.

## ⚡ QUICK FIX (2 Minutes)

### Step 1: Open Supabase SQL Editor

1. Go to https://supabase.com/dashboard
2. Select your project: `rughcgcyuoskszqzricx`
3. Click "SQL Editor" in left sidebar
4. Click "+ New query"

### Step 2: Run This SQL

Copy and paste the entire script from `fix-contact-messages-table.sql`:

```sql
-- Create contact_messages table if it doesn't exist
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  company VARCHAR(255),
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  subject VARCHAR(500) NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  responded_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_contact_messages_is_read ON contact_messages(is_read);
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at);

-- Create auto-update trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_contact_messages_updated_at 
BEFORE UPDATE ON contact_messages 
FOR EACH ROW 
EXECUTE FUNCTION update_updated_at_column();

-- Verify it worked
SELECT table_name, column_name, data_type
FROM information_schema.columns
WHERE table_name = 'contact_messages'
ORDER BY ordinal_position;
```

### Step 3: Verify Output

You should see a list of columns:
```
table_name          | column_name    | data_type
--------------------+----------------+-------------------------
contact_messages    | id             | uuid
contact_messages    | name           | character varying
contact_messages    | company        | character varying
contact_messages    | email          | character varying
contact_messages    | phone          | character varying
contact_messages    | subject        | character varying
contact_messages    | message        | text
contact_messages    | is_read        | boolean
contact_messages    | responded_at   | timestamp with time zone
contact_messages    | created_at     | timestamp with time zone
contact_messages    | updated_at     | timestamp with time zone
```

✅ **If you see this, the table is created!**

### Step 4: Test Contact Form

1. Go to: https://vera-tech.vercel.app/contact
2. Fill in the form:
   - Name: Test User
   - Email: test@example.com
   - Subject: Test message
   - Message: This is a test to verify the contact form works.
3. Click "Send Message"

**Expected Result:** ✅ Success message appears, form clears

## 🔍 If It Still Fails

### Check Vercel Logs

1. Go to Vercel Dashboard
2. Click your deployment
3. Click "Functions" tab
4. Look for `/api/contact` logs

**Look for:**
```
[CONTACT] Received data: {...}
[CONTACT] Attempting to save to database...
[CONTACT] Inside safePrismaQuery...
[CONTACT] Message saved successfully: <uuid>
```

**Or error:**
```
[CONTACT] Database error: {
  message: "...",
  code: "...",
  ...
}
```

### Common Database Errors

| Error Code | Meaning | Solution |
|------------|---------|----------|
| P2002 | Unique constraint failed | Check for duplicate entries |
| P2003 | Foreign key constraint failed | Check related tables exist |
| P2021 | Table doesn't exist | Run the SQL script above |
| P1001 | Can't reach database | Check DATABASE_URL |
| P1002 | Database timeout | Check Supabase status |

### Verify Database Connection

Run this in Supabase SQL Editor:

```sql
-- Test connection
SELECT NOW() as current_time;

-- Check if table exists
SELECT EXISTS (
  SELECT FROM information_schema.tables 
  WHERE table_name = 'contact_messages'
) as table_exists;

-- Count messages (should be 0 initially)
SELECT COUNT(*) FROM contact_messages;
```

## 🎯 Why This Happened

The database schema wasn't fully deployed to production. Tables need to be created manually in Supabase using SQL scripts.

## 📋 Complete Database Setup

If you're missing OTHER tables too, run the complete schema:

1. Go to your repository
2. Open `supabase-schema.sql`
3. Copy ALL the content
4. Run it in Supabase SQL Editor

This creates:
- ✅ admins
- ✅ clients  
- ✅ consultations
- ✅ projects
- ✅ invoices
- ✅ contact_messages
- ✅ notifications
- ✅ And more...

## ✅ Checklist

After running the SQL:

- [ ] SQL executed successfully in Supabase
- [ ] Saw list of columns in output
- [ ] Tested contact form
- [ ] Got success message
- [ ] Form cleared after submission
- [ ] No errors in browser console
- [ ] No errors in Vercel logs

## 🚀 What's Next

Once the table is created:

1. ✅ Contact form will work immediately
2. ✅ Messages will be saved to database
3. ✅ Admin notifications will be created
4. ✅ You can view messages in admin panel

---

**Time to fix:** 2 minutes  
**Difficulty:** Easy (just copy-paste SQL)  
**Result:** Contact form works perfectly ✨

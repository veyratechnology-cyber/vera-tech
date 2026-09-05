# 🔴 GET THE CORRECT DATABASE_URL FROM SUPABASE

## The Problem
You keep getting: `tenant/user postgres.rughcgcyuoskszqzricx not found`

This means the DATABASE_URL format is STILL WRONG in Vercel.

---

## ✅ SOLUTION - Get It Directly From Supabase

### Step 1: Open Supabase Database Settings
👉 **GO HERE NOW:** https://supabase.com/dashboard/project/rughcgcyuoskszqzricx/settings/database

### Step 2: Scroll to "Connection Pooling"
Look for the section called **"Connection Pooling"** or **"Connection string"**

### Step 3: Find "Session Mode" or "Transaction Mode"
You'll see two options:
- **Session mode** (recommended for Prisma)
- **Transaction mode**

### Step 4: Click "Session mode" and Copy the Connection String
It will look something like this:
```
postgresql://postgres.rughcgcyuoskszqzricx:[YOUR-PASSWORD]@[REGION].pooler.supabase.com:6543/postgres
```

### Step 5: Replace [YOUR-PASSWORD] with Your Actual Password
Change `[YOUR-PASSWORD]` to: `Aggrey123kenya`

The final string should be:
```
postgresql://postgres.rughcgcyuoskszqzricx:Aggrey123kenya@[REGION].pooler.supabase.com:6543/postgres
```

Where `[REGION]` is something like:
- `aws-0-eu-west-1`
- OR `db.rughcgcyuoskszqzricx.supabase.co`
- OR another region string

### Step 6: Add Connection Parameters
Add this at the end:
```
?pgbouncer=true&connection_limit=1
```

**FINAL FORMAT:**
```
postgresql://postgres.rughcgcyuoskszqzricx:Aggrey123kenya@[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1
```

---

## 🎯 Now Update Vercel

1. **Open Vercel Environment Variables:**
   👉 https://vercel.com/veyratechnology-cyber/vera-tech/settings/environment-variables

2. **Find DATABASE_URL**

3. **Edit it and paste the EXACT string you got from Supabase**

4. **Make sure it has:**
   - ✅ Username: `postgres.rughcgcyuoskszqzricx`
   - ✅ Password: `Aggrey123kenya`
   - ✅ Host: `[REGION].pooler.supabase.com` (from Supabase)
   - ✅ Port: `6543`
   - ✅ Database: `postgres`
   - ✅ Parameters: `?pgbouncer=true&connection_limit=1`

5. **Click Save**

6. **Wait 3 minutes for Vercel to redeploy**

7. **Test admin login**

---

## 📸 Visual Guide - Where to Find It in Supabase

1. **Supabase Dashboard** → Project Settings (gear icon)
2. **Database** (in left sidebar)
3. Scroll down to **"Connection Pooling"**
4. Toggle **"Use connection pooling"** to ON
5. Select **"Session mode"**
6. Click **"Copy"** next to the connection string
7. That's your DATABASE_URL! (just replace the password placeholder)

---

## ⚠️ CRITICAL: Don't Guess the Connection String

The error keeps happening because the DATABASE_URL doesn't match what Supabase expects.

**DO THIS:**
1. Get the EXACT string from Supabase (steps above)
2. Replace only the password part
3. Add the pgbouncer parameters
4. Use that EXACT string in Vercel

**DON'T DO THIS:**
❌ Try to construct the URL yourself
❌ Guess the region or format
❌ Mix different connection string formats

---

## 🔍 Alternative: Use Direct Connection (Not Recommended but Works)

If the pooler still doesn't work, you can use direct connection:

1. In Supabase, go to Database Settings
2. Copy the **Direct connection** string (port 5432)
3. Should look like:
   ```
   postgresql://postgres.[PROJECT]:[PASSWORD]@db.[PROJECT].supabase.co:5432/postgres
   ```
4. Use this in Vercel instead

⚠️ **Note:** Direct connection doesn't scale well with Vercel, but it will work for now.

---

## ✅ Once Fixed, This Will Work:

- ✅ Admin login
- ✅ All database queries
- ✅ Consultations API
- ✅ Contact form
- ✅ All admin pages

**No more database errors!** 🎉

---

**NEXT STEP: Get the exact connection string from Supabase and put it in Vercel.**

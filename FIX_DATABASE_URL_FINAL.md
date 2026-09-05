# 🔴 FIX DATABASE_URL ONCE AND FOR ALL

## Current Error:
```
FATAL: (ENOTFOUND) tenant/user postgres.rughcgcyuoskszqzricx not found
```

This error means **Vercel cannot connect to your Supabase database**.

---

## ✅ THE SOLUTION (5 Minutes)

### STEP 1: Get the Correct URL from Supabase

1. **Open this link:**
   👉 https://supabase.com/dashboard/project/rughcgcyuoskszqzricx/settings/database

2. **Scroll down** to find **"Connection Pooling"** section

3. **Toggle ON** "Use connection pooling" if it's off

4. **Select** "Session mode" (NOT Transaction mode)

5. **You will see a connection string** that looks like:
   ```
   postgresql://postgres.rughcgcyuoskszqzricx:[YOUR-PASSWORD]@XXXXX.pooler.supabase.com:6543/postgres
   ```

6. **Click the COPY button** next to it

7. **Open a text editor** (Notepad) and paste it

8. **Replace `[YOUR-PASSWORD]` with:** `Aggrey123kenya`

9. **Add at the end:** `?pgbouncer=true&connection_limit=1`

Your final string should look EXACTLY like this:
```
postgresql://postgres.rughcgcyuoskszqzricx:Aggrey123kenya@XXXXX.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1
```

Where `XXXXX` is the region string from Supabase (like `aws-0-eu-west-1` or similar).

---

### STEP 2: Update Vercel Environment Variable

1. **Open Vercel:**
   👉 https://vercel.com/veyratechnology-cyber/vera-tech/settings/environment-variables

2. **Find the variable:** `DATABASE_URL`

3. **Click the three dots** (⋮) → **Edit**

4. **Delete the old value completely**

5. **Paste the NEW connection string** you got from Step 1

6. **Make sure it has:**
   - ✅ Starts with: `postgresql://`
   - ✅ Username: `postgres.rughcgcyuoskszqzricx`
   - ✅ Password: `:Aggrey123kenya@`
   - ✅ Host: `.pooler.supabase.com`
   - ✅ Port: `:6543`
   - ✅ Database: `/postgres`
   - ✅ Parameters: `?pgbouncer=true&connection_limit=1`

7. **Click SAVE**

8. **Wait 3 minutes** for Vercel to redeploy

---

### STEP 3: Test

1. **Go to:** https://vera-tech.vercel.app/admin-login

2. **Login with:**
   - Email: `admin@veyratech.com`
   - Password: `bonaventure123kenya`

3. **If it works:** ✅ DONE! Database is connected!

4. **If it still fails:** Check Vercel logs for the exact error message

---

## 🎯 ALTERNATIVE: Use Direct Connection (Backup Solution)

If the pooler still doesn't work for some reason, use direct connection:

1. In Supabase Database Settings, find **"Connection string"** (not pooling)

2. Copy the **URI** format (not the individual fields)

3. Should look like:
   ```
   postgresql://postgres.[PROJECT]:[PASSWORD]@db.[PROJECT].supabase.co:5432/postgres
   ```

4. Replace `[PASSWORD]` with `Aggrey123kenya`

5. Use this in Vercel instead

⚠️ **Note:** Direct connection (port 5432) is less efficient but will work.

---

## 📋 Troubleshooting

### Error: "no tenant identifier"
- **Solution:** Make sure username includes the project ref: `postgres.rughcgcyuoskszqzricx`

### Error: "tenant/user not found"
- **Solution:** The host, region, or username format is wrong. Get the EXACT string from Supabase.

### Error: "password authentication failed"
- **Solution:** Password is wrong. Make sure it's `Aggrey123kenya` (case-sensitive, no spaces)

### Error: "could not connect to server"
- **Solution:** The host or port is wrong. Double-check you copied the complete string from Supabase.

---

## ✅ Once This Is Fixed:

- ✅ Admin login will work
- ✅ All database queries will work
- ✅ Consultations API will work
- ✅ Contact form will work
- ✅ All admin pages will load
- ✅ **NO MORE DATABASE ERRORS!**

---

## 🚨 IMPORTANT

**DO NOT** try to construct the DATABASE_URL yourself!

**DO** copy it directly from Supabase and only change the password.

The exact format varies by region and Supabase setup, so you MUST get it from Supabase dashboard.

---

**Follow these steps exactly and the database will connect!** 🎉

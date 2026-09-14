# 🔧 UPDATE VERCEL DATABASE_URL - CRITICAL FIX

## THE PROBLEM

Your Vercel is using the **POOLER connection (port 6543)** which causes errors with Prisma.

**Current (Wrong)**:
```
postgresql://postgres.rughcgcyuoskszqzricx:%40Bonaventure123kenya@aws-1-eu-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1
```

**Correct (Use This)**:
```
postgresql://postgres.rughcgcyuoskszqzricx:%40Bonaventure123kenya@aws-1-eu-west-1.pooler.supabase.com:5432/postgres
```

**Key difference**: Port **5432** (direct) instead of **6543** (pooler)

---

## ⚡ FIX IN VERCEL (2 MINUTES)

### Step 1: Go to Vercel

1. Open: https://vercel.com/dashboard
2. Click your **vera-tech** project
3. Click **"Settings"** (top menu)
4. Click **"Environment Variables"** (left sidebar)

### Step 2: Update DATABASE_URL

1. Find **DATABASE_URL** in the list
2. Click **"Edit"** (pencil icon)
3. **Replace the value with**:
   ```
   postgresql://postgres.rughcgcyuoskszqzricx:%40Bonaventure123kenya@aws-1-eu-west-1.pooler.supabase.com:5432/postgres
   ```
4. Make sure these are checked:
   - ✅ Production
   - ✅ Preview  
   - ✅ Development
5. Click **"Save"**

### Step 3: Redeploy

1. Click **"Deployments"** (top menu)
2. Find the latest deployment
3. Click **"..."** menu (three dots)
4. Click **"Redeploy"**
5. **UNCHECK** "Use existing Build Cache"
6. Click **"Redeploy"**

**Wait 2-3 minutes** for deployment.

---

## ✅ THEN TRY THE SEEDER AGAIN

After Vercel redeploys:

1. **Visit**: https://vera-tech.vercel.app/seed.html
2. **Click**: "Seed Database Now"
3. **Should see**: ✅ Success!

---

## 🎯 WHY THIS FIX WORKS

### PgBouncer (Port 6543) - CAUSES ERRORS ❌
- Connection pooler for high concurrency
- Doesn't support Prisma schema operations
- Causes "prepared statement already exists" errors
- **Don't use for Prisma operations!**

### Direct Connection (Port 5432) - WORKS ✅
- Direct PostgreSQL connection
- Supports ALL Prisma operations
- No prepared statement errors
- **Use this for Vercel!**

---

## 📊 WHAT I FIXED LOCALLY

I already updated your local `.env` to use port 5432:

```env
# ✅ CORRECT (Direct connection)
DATABASE_URL=postgresql://postgres.rughcgcyuoskszqzricx:%40Bonaventure123kenya@aws-1-eu-west-1.pooler.supabase.com:5432/postgres
```

And pushed the schema successfully:
```
✔ Your database is now in sync with your Prisma schema. Done in 56.77s
✔ Generated Prisma Client
```

**Now you just need to update Vercel to match!**

---

## 🔥 DO THIS NOW

1. **Vercel Dashboard** → vera-tech → Settings → Environment Variables
2. **Edit DATABASE_URL** → Change port from `6543` to `5432`
3. **Remove** `?pgbouncer=true&connection_limit=1` from the end
4. **Save** and **Redeploy** (without cache)
5. **Wait 2-3 minutes**
6. **Try seeder again**: https://vera-tech.vercel.app/seed.html

---

## 💬 TELL ME WHEN DONE

After updating Vercel and redeploying:

✅ **"Updated DATABASE_URL in Vercel and redeployed"**  
✅ **"Seeder worked! Shows success"**  
✅ **"All pages working now"**

Or if still having issues:

❌ **"Seeder still shows error: [error message]"**  
❌ **"Can't find DATABASE_URL in Vercel"**

---

**DO THIS NOW! It will fix everything!** 🚀

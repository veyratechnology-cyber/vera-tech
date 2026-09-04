# Fix 401 Authentication Error - Complete Solution

## 🔴 THE PROBLEM
You're getting a 401 error when trying to login to the admin panel.

---

## ✅ COMPLETE FIX - DO ALL THESE STEPS

### STEP 1: UPDATE ADMIN PASSWORD IN SUPABASE

Run this in Supabase SQL Editor (https://supabase.com → SQL Editor):

```sql
-- Update admin password hash
UPDATE admins 
SET password_hash = '$2a$10$fVVJicsc8m.BdGV8T7OtIOXV3yksfV/YGdjBgeoI1XCBa7mBjmIna',
    updated_at = NOW()
WHERE email = 'admin@veyratech.com';

-- Verify it worked
SELECT id, email, password_hash, status 
FROM admins 
WHERE email = 'admin@veyratech.com';
```

---

### STEP 2: VERIFY ALL VERCEL ENVIRONMENT VARIABLES

Go to Vercel Dashboard → Settings → Environment Variables

**YOU MUST HAVE ALL 7 OF THESE:**

```
✓ DATABASE_URL
✓ NEXTAUTH_URL
✓ NEXTAUTH_SECRET
✓ NEXT_PUBLIC_APP_URL
✓ NEXT_PUBLIC_ADMIN_URL
✓ NODE_ENV
✓ TZ
```

**If ANY are missing**, add them:

#### DATABASE_URL
```
postgresql://postgres:%40Bonaventure123kenya@db.rughcgcyuoskszqzricx.supabase.co:5432/postgres
```

#### NEXTAUTH_URL
```
https://vera-tech.vercel.app
```

#### NEXTAUTH_SECRET
```
i+Tl82ljr6Ne+Ibqx73bBLVdkXs+g8MaeFzj/kY1U8g=
```

#### NEXT_PUBLIC_APP_URL
```
https://vera-tech.vercel.app
```

#### NEXT_PUBLIC_ADMIN_URL
```
https://vera-tech.vercel.app/admin
```

#### NODE_ENV
```
production
```

#### TZ
```
Africa/Nairobi
```

---

### STEP 3: REDEPLOY VERCEL

After adding/verifying environment variables:

1. Go to **Deployments** tab
2. Click **"..."** on latest deployment
3. Click **"Redeploy"**
4. **IMPORTANT**: Uncheck "Use existing build cache"
5. Click **"Redeploy"**
6. Wait 3-5 minutes for build to complete

---

### STEP 4: CLEAR BROWSER CACHE

1. Open browser DevTools (F12)
2. Right-click refresh button
3. Select "Empty Cache and Hard Reload"
4. Or use Incognito/Private window

---

### STEP 5: TRY LOGIN AGAIN

Go to: https://vera-tech.vercel.app/admin-login

```
Email:    admin@veyratech.com
Password: bonaventure123kenya
```

---

## 🔍 IF STILL DOESN'T WORK

### Check Vercel Function Logs

1. Go to Vercel Dashboard
2. Click on your project
3. Go to **Logs** tab
4. Look for errors related to:
   - `NEXTAUTH_SECRET`
   - `DATABASE_URL`
   - `prisma`
   - Authentication errors

### Common Errors in Logs:

#### Error: "NO_SECRET"
**Fix**: Add NEXTAUTH_SECRET to environment variables

#### Error: "Environment variable not found: DATABASE_URL"
**Fix**: Add DATABASE_URL to environment variables

#### Error: "Prisma Client initialization"
**Fix**: Redeploy with fresh build (uncheck cache)

#### Error: "Invalid credentials"
**Fix**: Run the UPDATE SQL query in Supabase again

---

## 🎯 CHECKLIST - DO EVERYTHING

- [ ] Step 1: Run UPDATE query in Supabase ✅
- [ ] Step 2: Verify all 7 environment variables in Vercel ✅
- [ ] Step 3: Redeploy Vercel (no cache) ✅
- [ ] Step 4: Clear browser cache ✅
- [ ] Step 5: Try login ✅

---

## 📞 DEBUGGING STEPS

If it still doesn't work after ALL steps above:

### 1. Check Database Connection
Run in Supabase:
```sql
SELECT email, status FROM admins WHERE email = 'admin@veyratech.com';
```
Should return 1 row with status 'ACTIVE'

### 2. Verify Password Hash
The password hash should be exactly:
```
$2a$10$fVVJicsc8m.BdGV8T7OtIOXV3yksfV/YGdjBgeoI1XCBa7mBjmIna
```

### 3. Check Vercel Build Logs
Look for:
- ✅ "Generated Prisma Client" - Should succeed
- ✅ "Compiled successfully" - Should succeed
- ❌ Any errors during build - Fix those first

### 4. Check Vercel Function Logs (Runtime)
Look for:
- Authentication errors
- Database connection errors
- Missing environment variables

---

## 🚨 MOST COMMON CAUSE

**Missing NEXTAUTH_SECRET in Vercel** - This causes all authentication to fail!

**Fix**: Add it to Vercel environment variables:
```
NEXTAUTH_SECRET=i+Tl82ljr6Ne+Ibqx73bBLVdkXs+g8MaeFzj/kY1U8g=
```

Then redeploy!

---

## ✅ AFTER FIX

Once login works, you'll see:
- Admin Dashboard at: https://vera-tech.vercel.app/admin
- Consultations management
- Contact messages
- All admin features

---

**Do ALL 5 steps above and it WILL work!** ✅

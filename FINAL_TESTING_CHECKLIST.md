# Final Testing Checklist - Admin Login

## ✅ CONFIGURATION VERIFIED

### Local .env Configuration:
- ✅ DATABASE_URL: `postgresql://postgres.rughcgcyuoskszqzricx:Aggrey123kenya@aws-1-eu-west-1.pooler.supabase.com:6543/postgres`
- ✅ NEXTAUTH_URL: `https://vera-tech.vercel.app`
- ✅ NEXTAUTH_SECRET: Configured
- ✅ NEXT_PUBLIC_APP_URL: `https://vera-tech.vercel.app`
- ✅ NEXT_PUBLIC_ADMIN_URL: `https://vera-tech.vercel.app/admin`

---

## 🎯 TESTING PROCEDURE

### Step 1: Verify Vercel Environment Variables

Go to: https://vercel.com/dashboard → Your Project → Settings → Environment Variables

**Confirm these 7 variables exist with EXACT values:**

```
DATABASE_URL=postgresql://postgres.rughcgcyuoskszqzricx:Aggrey123kenya@aws-1-eu-west-1.pooler.supabase.com:6543/postgres

NEXTAUTH_URL=https://vera-tech.vercel.app

NEXTAUTH_SECRET=i+Tl82ljr6Ne+Ibqx73bBLVdkXs+g8MaeFzj/kY1U8g=

NEXT_PUBLIC_APP_URL=https://vera-tech.vercel.app

NEXT_PUBLIC_ADMIN_URL=https://vera-tech.vercel.app/admin

NODE_ENV=production

TZ=Africa/Nairobi
```

**Each must have all 3 environments checked:**
- ☑️ Production
- ☑️ Preview
- ☑️ Development

---

### Step 2: Redeploy Vercel

1. Go to **Deployments** tab
2. Click **"..."** on latest deployment
3. Click **"Redeploy"**
4. **Uncheck** "Use existing build cache"
5. Click **"Redeploy"**
6. **Wait 3-5 minutes** for deployment to complete

---

### Step 3: Test Admin Login

**URL**: https://vera-tech.vercel.app/admin-login

**Credentials**:
```
Email:    admin@veyratech.com
Password: bonaventure123kenya
```

**Expected Result**: Should redirect to `https://vera-tech.vercel.app/admin`

---

### Step 4: If Login Fails, Check Logs

1. Go to Vercel Dashboard → Your Project
2. Click **Logs** tab
3. Try login again
4. Look for errors in logs

**Common Errors and Fixes:**

#### Error: "tenant/user not found"
**Fix**: DATABASE_URL format wrong
**Solution**: Use the exact URL from Step 1

#### Error: "NO_SECRET"
**Fix**: NEXTAUTH_SECRET missing
**Solution**: Add it in Vercel environment variables

#### Error: "Invalid credentials"
**Fix**: Wrong password or admin user doesn't exist
**Solution**: Run SQL in Supabase:
```sql
UPDATE admins 
SET password_hash = '$2a$10$fVVJicsc8m.BdGV8T7OtIOXV3yksfV/YGdjBgeoI1XCBa7mBjmIna'
WHERE email = 'admin@veyratech.com';
```

---

## 📋 SUCCESS INDICATORS

### ✅ Login Successful When:
1. No errors in browser console
2. Redirects to `/admin` dashboard
3. You see admin sidebar with menu items
4. Can view consultations, contacts, etc.

### ❌ Login Failed When:
1. 401 error in console
2. Stays on login page
3. Shows "Invalid credentials" message
4. Vercel logs show database errors

---

## 🔧 TROUBLESHOOTING STEPS

### Issue 1: Database Connection Error
**Log shows**: `Can't reach database server`

**Fix**:
1. Verify DATABASE_URL in Vercel matches:
   ```
   postgresql://postgres.rughcgcyuoskszqzricx:Aggrey123kenya@aws-1-eu-west-1.pooler.supabase.com:6543/postgres
   ```
2. No extra spaces
3. No quotes around it
4. All 3 environments checked
5. Redeploy

---

### Issue 2: Authentication Error
**Log shows**: `Invalid credentials` or `401`

**Fix**: Run in Supabase SQL Editor:
```sql
-- Verify admin exists
SELECT email, status FROM admins WHERE email = 'admin@veyratech.com';

-- Update password if needed
UPDATE admins 
SET password_hash = '$2a$10$fVVJicsc8m.BdGV8T7OtIOXV3yksfV/YGdjBgeoI1XCBa7mBjmIna',
    status = 'ACTIVE'
WHERE email = 'admin@veyratech.com';
```

---

### Issue 3: Missing Environment Variable
**Log shows**: `Environment variable not found`

**Fix**:
1. Check which variable is missing in the error
2. Add it in Vercel environment variables
3. Use values from Step 1
4. Redeploy

---

## 🎯 FINAL VERIFICATION COMMANDS

### In Supabase SQL Editor:
```sql
-- Verify admin user
SELECT 
    email, 
    status, 
    password_hash,
    created_at
FROM admins 
WHERE email = 'admin@veyratech.com';
```

**Expected Result**:
- email: `admin@veyratech.com`
- status: `ACTIVE`
- password_hash: Starts with `$2a$10$`
- created_at: Today's date

---

## ✅ SUCCESS CHECKLIST

After following all steps, you should have:

- [ ] All 7 environment variables in Vercel
- [ ] Vercel redeployed successfully
- [ ] Admin user exists in database
- [ ] Password hash is correct
- [ ] Login works without errors
- [ ] Can access admin dashboard
- [ ] Can view all admin features

---

## 🚀 EXPECTED WORKING STATE

**Homepage**: https://vera-tech.vercel.app
- ✅ Loads without errors
- ✅ All services pages work
- ✅ Contact form works
- ✅ Consultation booking works

**Admin Login**: https://vera-tech.vercel.app/admin-login
- ✅ Login form displays
- ✅ Can enter credentials
- ✅ Submits without 401 error
- ✅ Redirects to dashboard

**Admin Dashboard**: https://vera-tech.vercel.app/admin
- ✅ Shows overview stats
- ✅ Sidebar navigation works
- ✅ Can view consultations
- ✅ Can view contact messages
- ✅ Notifications work

---

## 📞 IF STILL NOT WORKING

1. Share screenshot of Vercel environment variables (hide sensitive values)
2. Share latest error from Vercel logs
3. Confirm you redeployed after adding variables
4. Confirm admin user exists in Supabase

---

**DATABASE PASSWORD**: `Aggrey123kenya` (no @ symbol)
**ADMIN LOGIN PASSWORD**: `bonaventure123kenya`

These are different - one is for database connection, one is for admin login!

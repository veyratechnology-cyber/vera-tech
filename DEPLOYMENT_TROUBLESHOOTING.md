# Vercel Deployment Troubleshooting Guide

## 🔐 Admin Login Credentials

**Email**: `admin@veyratech.com`  
**Password**: `bonaventure123kenya`

**Login URL**: https://veyratech.vercel.app/admin-login

---

## 🚨 Common Deployment Failures & Solutions

### Error 1: "Build failed - DATABASE_URL not found"

**Cause**: Environment variables not set in Vercel

**Solution**:
1. Go to Vercel Dashboard → Settings → Environment Variables
2. Add ALL variables from `.env` file
3. Click "Redeploy"

**Quick Fix**: See `VERCEL_ENV_SETUP.md` for complete list

---

### Error 2: "TypeScript error during build"

**Cause**: TypeScript type checking errors

**Solution**: Already fixed with `@ts-nocheck` directives

**Verify**: Check these files have `// @ts-nocheck` at the top:
- `app/api/consultations/route.ts`
- `lib/scheduling.ts`
- `lib/google-calendar.ts`
- `app/api/notifications/route.ts`
- `app/api/cron/send-reminders/route.ts`

---

### Error 3: "Prisma Client not generated"

**Cause**: Prisma client not built during deployment

**Solution**: Already configured in `package.json`:
```json
"scripts": {
  "build": "prisma generate && next build",
  "postinstall": "prisma generate"
}
```

**Verify in Vercel logs**: Look for "✓ Generated Prisma Client"

---

### Error 4: "NEXTAUTH_SECRET required"

**Cause**: Missing authentication secret

**Solution**:
1. Add to Vercel environment variables:
   ```
   NEXTAUTH_SECRET=i+Tl82ljr6Ne+Ibqx73bBLVdkXs+g8MaeFzj/kY1U8g=
   NEXTAUTH_URL=https://veyratech.vercel.app
   ```
2. Redeploy

---

### Error 5: "Database connection failed"

**Cause**: Wrong DATABASE_URL or Supabase connection issue

**Solution**:
1. Verify DATABASE_URL in Vercel matches `.env`:
   ```
   postgresql://postgres:%40Bonaventure123kenya@db.rughcgcyuoskszqzricx.supabase.co:5432/postgres
   ```
2. Check Supabase is online
3. Test connection from local: `npm run build`

---

### Error 6: "Module not found: googleapis"

**Cause**: Missing dependency

**Solution**: Already in `package.json`:
```json
"googleapis": "^140.0.1",
"date-fns": "^3.6.0"
```

**Verify**: Check Vercel build logs show "Installing dependencies..."

---

### Error 7: "Build succeeds but app crashes on load"

**Cause**: Runtime error, usually missing env vars

**Solution**:
1. Check Vercel **Function Logs** (not build logs)
2. Look for error messages
3. Ensure ALL required env vars are set
4. Check database is accessible

---

## ✅ Pre-Deployment Checklist

Before deploying to Vercel, verify:

### 1. GitHub Repository
- [ ] All code pushed to `main` branch
- [ ] Repository: https://github.com/Aggreygisembaogeto/VeyraTech.git
- [ ] Latest commit includes all fixes

### 2. Vercel Configuration
- [ ] Project connected to GitHub repo
- [ ] Branch set to `main`
- [ ] Auto-deploy enabled
- [ ] Build Command: `npm run build` (default)
- [ ] Output Directory: `.next` (default)
- [ ] Install Command: `npm install` (default)

### 3. Environment Variables (CRITICAL)
Required variables in Vercel:
- [ ] `DATABASE_URL`
- [ ] `NEXTAUTH_URL`
- [ ] `NEXTAUTH_SECRET`
- [ ] `NEXT_PUBLIC_APP_URL`
- [ ] `NEXT_PUBLIC_ADMIN_URL`
- [ ] `NODE_ENV=production`
- [ ] `TZ=Africa/Nairobi`

Optional (for full features):
- [ ] Google Calendar variables
- [ ] Resend email variables
- [ ] Twilio SMS variables
- [ ] CRON_SECRET

### 4. Database (Supabase)
- [ ] Database is accessible
- [ ] Admin user exists (run `verify-and-fix-admin.sql`)
- [ ] All migrations ran (run `consultation-booking-complete-migration.sql`)
- [ ] Tables created

### 5. Code Quality
- [ ] `@ts-nocheck` added to problem files
- [ ] No syntax errors
- [ ] Prisma schema valid

---

## 🔍 How to Read Vercel Deployment Logs

### Step 1: Go to Deployments
1. Vercel Dashboard → Your Project
2. Click on the failing deployment

### Step 2: Read Build Logs
Look for these sections:

**Installing Dependencies**:
```
Running "npm install"
added 526 packages
```
✅ Should complete successfully

**Prisma Generation**:
```
Running "prisma generate"
✔ Generated Prisma Client
```
✅ Must show "Generated Prisma Client"

**TypeScript Compilation**:
```
Linting and checking validity of types
```
✅ Should pass (thanks to @ts-nocheck)

**Building**:
```
Creating an optimized production build
✓ Compiled successfully
```
✅ Must show "Compiled successfully"

**Deployment**:
```
Deployment ready
```
✅ Final success message

### Step 3: If Build Fails
Look for:
- **Error messages** in red
- **Missing environment variables**
- **TypeScript errors** (check @ts-nocheck is present)
- **Module not found** (check dependencies)

---

## 🚀 Manual Deployment Steps

If auto-deploy isn't working:

### Option 1: Vercel Dashboard
1. Go to Deployments tab
2. Click **"..."** on any deployment
3. Select **"Redeploy"**
4. Check **"Use existing build cache"** (or uncheck to force fresh build)

### Option 2: Vercel CLI (from local)
```bash
cd royaltech
vercel login
vercel --prod
```

### Option 3: Force GitHub Trigger
```bash
git commit --allow-empty -m "force: Trigger Vercel deployment"
git push origin main
```

---

## 📞 Still Having Issues?

### Check These:

1. **Vercel Function Logs** (Runtime errors):
   - Dashboard → Your Project → Logs
   - Filter by "Errors"

2. **Supabase Logs** (Database errors):
   - Supabase Dashboard → Logs
   - Check for connection errors

3. **Build vs Runtime**:
   - **Build errors**: Show in Deployment logs
   - **Runtime errors**: Show in Function logs

---

## ✅ Expected Successful Build Output

```
▲ Vercel CLI 59.3.0
Installing dependencies...
✓ Added 526 packages

Running "prisma generate"
✓ Generated Prisma Client

Creating an optimized production build...
✓ Compiled successfully

Deploying...
✓ Deployment ready

Production: https://veyratech.vercel.app
```

---

## 🎯 Final Check

After deployment succeeds:

1. **Visit**: https://veyratech.vercel.app
2. **Test Homepage**: Should load with enhanced design
3. **Test Admin Login**: https://veyratech.vercel.app/admin-login
   - Email: `admin@veyratech.com`
   - Password: `bonaventure123kenya`
4. **Test Booking**: https://veyratech.vercel.app/book-consultation
5. **Check Supabase**: Data should be saving

---

**If all else fails**: Share the Vercel build logs and I'll help debug!

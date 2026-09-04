# ⚠️ ADD ENVIRONMENT VARIABLES TO VERCEL NOW

Your deployment succeeded but the app needs environment variables to work!

---

## 🚨 CRITICAL ERRORS IN YOUR LOGS:

1. **[next-auth][error][NO_SECRET]** - Missing NEXTAUTH_SECRET
2. **Environment variable not found: DATABASE_URL** - Missing DATABASE_URL

---

## ✅ HOW TO FIX (5 Minutes)

### Step 1: Go to Vercel Dashboard
1. Open https://vercel.com/dashboard
2. Click on your **vera-tech** project
3. Click **Settings** (top menu)
4. Click **Environment Variables** (left sidebar)

### Step 2: Add These Variables (Copy-Paste Each One)

Click **"Add New"** for each variable below:

---

### **Variable 1: DATABASE_URL** (REQUIRED)

**Name:**
```
DATABASE_URL
```

**Value:**
```
postgresql://postgres:%40Bonaventure123kenya@db.rughcgcyuoskszqzricx.supabase.co:5432/postgres
```

**Environments:** ☑️ Production, ☑️ Preview, ☑️ Development

---

### **Variable 2: NEXTAUTH_URL** (REQUIRED)

**Name:**
```
NEXTAUTH_URL
```

**Value:**
```
https://vera-tech.vercel.app
```

**Environments:** ☑️ Production, ☑️ Preview, ☑️ Development

---

### **Variable 3: NEXTAUTH_SECRET** (REQUIRED)

**Name:**
```
NEXTAUTH_SECRET
```

**Value:**
```
i+Tl82ljr6Ne+Ibqx73bBLVdkXs+g8MaeFzj/kY1U8g=
```

**Environments:** ☑️ Production, ☑️ Preview, ☑️ Development

---

### **Variable 4: NEXT_PUBLIC_APP_URL** (REQUIRED)

**Name:**
```
NEXT_PUBLIC_APP_URL
```

**Value:**
```
https://vera-tech.vercel.app
```

**Environments:** ☑️ Production, ☑️ Preview, ☑️ Development

---

### **Variable 5: NEXT_PUBLIC_ADMIN_URL** (REQUIRED)

**Name:**
```
NEXT_PUBLIC_ADMIN_URL
```

**Value:**
```
https://vera-tech.vercel.app/admin
```

**Environments:** ☑️ Production, ☑️ Preview, ☑️ Development

---

### **Variable 6: NODE_ENV** (REQUIRED)

**Name:**
```
NODE_ENV
```

**Value:**
```
production
```

**Environments:** ☑️ Production, ☑️ Preview, ☑️ Development

---

### **Variable 7: TZ** (REQUIRED)

**Name:**
```
TZ
```

**Value:**
```
Africa/Nairobi
```

**Environments:** ☑️ Production, ☑️ Preview, ☑️ Development

---

## Step 3: Redeploy

After adding ALL variables above:

1. Go to **Deployments** tab
2. Click **"..."** on the latest deployment
3. Click **"Redeploy"**
4. Wait 2-3 minutes

---

## ✅ AFTER REDEPLOYMENT

Once redeploy completes:

1. Go to: https://vera-tech.vercel.app
2. Homepage should load ✅
3. Go to: https://vera-tech.vercel.app/admin-login
4. Login with:
   - Email: `admin@veyratech.com`
   - Password: `bonaventure123kenya`

---

## 📋 QUICK CHECKLIST

Before redeploying, verify you added:
- [ ] DATABASE_URL
- [ ] NEXTAUTH_URL
- [ ] NEXTAUTH_SECRET
- [ ] NEXT_PUBLIC_APP_URL
- [ ] NEXT_PUBLIC_ADMIN_URL
- [ ] NODE_ENV
- [ ] TZ

All 7 variables = App will work! ✅

---

## 🎯 VISUAL GUIDE

When adding each variable:

```
┌─────────────────────────────────────────┐
│ Add Environment Variable                │
├─────────────────────────────────────────┤
│ Name:                                   │
│ ┌─────────────────────────────────────┐ │
│ │ DATABASE_URL                        │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ Value:                                  │
│ ┌─────────────────────────────────────┐ │
│ │ postgresql://postgres:...           │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ Environments:                           │
│ ☑ Production                            │
│ ☑ Preview                               │
│ ☑ Development                           │
│                                         │
│ [Add]                                   │
└─────────────────────────────────────────┘
```

Repeat for all 7 variables!

---

## ⏱️ THIS TAKES 5 MINUTES

1. Add variables (3 mins)
2. Redeploy (2 mins)
3. Done! ✅

---

## 🔗 DIRECT LINK

Go here now: https://vercel.com/dashboard

Then:
1. Click your project
2. Settings → Environment Variables
3. Add all 7 variables above
4. Redeploy

**Your app will work after this!** 🎉

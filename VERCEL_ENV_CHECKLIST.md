# Vercel Environment Variables - Complete Checklist

**Add these 7 variables in Vercel Dashboard → Settings → Environment Variables**

---

## ✅ REQUIRED VARIABLES (Add in this order)

### 1. DATABASE_URL
```
Key:   DATABASE_URL
Value: postgresql://postgres:%40Bonaventure123kenya@db.rughcgcyuoskszqzricx.supabase.co:5432/postgres
Envs:  ☑️ Production  ☑️ Preview  ☑️ Development
```

### 2. NEXTAUTH_URL
```
Key:   NEXTAUTH_URL
Value: https://vera-tech.vercel.app
Envs:  ☑️ Production  ☑️ Preview  ☑️ Development
```

### 3. NEXTAUTH_SECRET
```
Key:   NEXTAUTH_SECRET
Value: i+Tl82ljr6Ne+Ibqx73bBLVdkXs+g8MaeFzj/kY1U8g=
Envs:  ☑️ Production  ☑️ Preview  ☑️ Development
```

### 4. NEXT_PUBLIC_APP_URL
```
Key:   NEXT_PUBLIC_APP_URL
Value: https://vera-tech.vercel.app
Envs:  ☑️ Production  ☑️ Preview  ☑️ Development
```

### 5. NEXT_PUBLIC_ADMIN_URL
```
Key:   NEXT_PUBLIC_ADMIN_URL
Value: https://vera-tech.vercel.app/admin
Envs:  ☑️ Production  ☑️ Preview  ☑️ Development
```

### 6. NODE_ENV
```
Key:   NODE_ENV
Value: production
Envs:  ☑️ Production  ☑️ Preview  ☑️ Development
```

### 7. TZ
```
Key:   TZ
Value: Africa/Nairobi
Envs:  ☑️ Production  ☑️ Preview  ☑️ Development
```

---

## 📋 QUICK REFERENCE - Copy These Values Only

```
DATABASE_URL
postgresql://postgres:%40Bonaventure123kenya@db.rughcgcyuoskszqzricx.supabase.co:5432/postgres

NEXTAUTH_URL
https://vera-tech.vercel.app

NEXTAUTH_SECRET
i+Tl82ljr6Ne+Ibqx73bBLVdkXs+g8MaeFzj/kY1U8g=

NEXT_PUBLIC_APP_URL
https://vera-tech.vercel.app

NEXT_PUBLIC_ADMIN_URL
https://vera-tech.vercel.app/admin

NODE_ENV
production

TZ
Africa/Nairobi
```

---

## ⚠️ IMPORTANT REMINDERS

1. **Type variable names** manually in Vercel (don't copy-paste)
2. **Copy-paste values** from above
3. **Check all 3 environments** for each variable
4. **If variable exists**, edit it instead of adding new
5. **After adding all 7**, redeploy from Deployments tab

---

## ✅ VERIFICATION CHECKLIST

After adding all variables, verify:
- [ ] All 7 variables show in the list
- [ ] No warning triangles (⚠️) next to any variable
- [ ] Each variable has all 3 environments checked
- [ ] Values are correct (click eye icon to verify)

Then:
- [ ] Go to Deployments tab
- [ ] Click "..." → "Redeploy"
- [ ] Wait for build to complete
- [ ] Test: https://vera-tech.vercel.app/admin-login

---

## 🔐 ADMIN CREDENTIALS

After successful deployment, login with:
```
Email:    admin@veyratech.com
Password: bonaventure123kenya
URL:      https://vera-tech.vercel.app/admin-login
```

---

**Add these 7 variables → Redeploy → Your app will work!** ✅

# ⚡ DO THESE 2 THINGS NOW ⚡

## Code Status: ✅ ALL FIXED & DEPLOYED (commit 7171cad)

## Your Status: ❌ 2 MANUAL ACTIONS NEEDED

---

## 🔴 ACTION 1: Fix Login (2 minutes)

### Steps:
1. Go to: https://supabase.com/dashboard
2. Click your project: `vera-tech`
3. Click: **SQL Editor** (left sidebar)
4. Click: **New query**
5. Paste this:

```sql
UPDATE admins 
SET password_hash = '$2a$10$x.x/hNXqWfHuHPosbmIQAuuLp6y3I45mU.vxGLkc6tpZ3tULLW6Ay'
WHERE email = 'admin@veyratech.com';

SELECT 
  email,
  CASE 
    WHEN password_hash = '$2a$10$x.x/hNXqWfHuHPosbmIQAuuLp6y3I45mU.vxGLkc6tpZ3tULLW6Ay' 
    THEN '✅ FIXED' 
    ELSE '❌ FAILED'
  END as status
FROM admins 
WHERE email = 'admin@veyratech.com';
```

6. Click: **Run** (or press F5)
7. **VERIFY**: You see `status = ✅ FIXED`

### What this fixes:
- ✅ 401 Unauthorized login errors
- ✅ Admin panel access

---

## 🔴 ACTION 2: Fix Crashes (1 minute)

### Steps:
1. Go to: https://vercel.com/dashboard
2. Click your project: `vera-tech`
3. Click: **Settings** → **Environment Variables**
4. Find: **DATABASE_URL**
5. **Check**: Does it end with `?pgbouncer=true&connection_limit=1`

### If YES:
✅ You're done! Skip to Action 3.

### If NO:
1. Click **Edit** on DATABASE_URL
2. **Add to end**: `?pgbouncer=true&connection_limit=1`
3. Click **Save**
4. Click **Redeploy** (top right corner)
5. Wait 3 minutes

### What this fixes:
- ✅ 42P05 prepared statement errors
- ✅ Random crashes
- ✅ All admin pages loading

---

## ✅ ACTION 3: Test (5 minutes)

### After completing Actions 1 and 2:

1. **Wait 5 minutes** (let Vercel/Supabase sync)

2. **Test Login**:
   - URL: https://vera-tech.vercel.app/admin-login
   - Email: `admin@veyratech.com`
   - Password: `bonaventure123kenya`
   - **Expected**: ✅ Logs in immediately, no errors

3. **Test Admin Pages**:
   - Click: Dashboard, Analytics, Content, Services, etc.
   - **Expected**: ✅ All pages load without crashes

4. **Test Contact Messages**:
   - URL: https://vera-tech.vercel.app/admin/contact-messages
   - **Expected**: ✅ Page loads, shows messages, no 42P05 error

5. **Check Browser Console** (F12):
   - **Expected**: ✅ No red error messages

---

## 🎯 Success = All These Work:

| Test | Status |
|------|--------|
| Login (no 401) | ⬜ |
| Dashboard loads | ⬜ |
| Contact messages (no 42P05) | ⬜ |
| All admin pages work | ⬜ |
| No console errors | ⬜ |

When all ✅, reply: **"ALL TESTS PASS"**

---

## 🆘 If Something Fails:

### Still Getting 401?
- Screenshot the SQL result from Action 1
- Send to me

### Still Getting 42P05?
- Screenshot DATABASE_URL from Vercel (blur password)
- Screenshot the error from browser console
- Send both to me

### Other Error?
- Open browser console (F12)
- Screenshot the red error message
- Send to me

---

## ⏱️ Total Time: 8 minutes

- Action 1: 2 min
- Action 2: 1 min  
- Wait: 5 min
- Testing: 5 min

**START NOW** → Report results when done

---

## 📄 More Details:

- Full guide: `FINAL_MANUAL_STEPS.md`
- Technical deep-dive: `STATUS_WORLD_CLASS_FIX.md`
- Quick SQL: `COPY_PASTE_THIS_SQL.txt`

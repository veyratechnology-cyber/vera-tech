# 🔐 CRON_SECRET SETUP GUIDE

## ⚠️ ISSUE
**Error**: `[CRON] CRON_SECRET not configured`

**Impact**: Consultation reminder emails are not being sent automatically

---

## ✅ SOLUTION

I've generated a secure CRON_SECRET for you. Now you need to add it to Vercel.

---

## 🔑 YOUR CRON_SECRET

```
4V1BCiK79X2m3RUfx6FPvweMoA5syIGl
```

**⚠️ Keep this secret! Don't share it publicly.**

---

## 🚀 ADD TO VERCEL (5 Minutes)

### Step 1: Go to Vercel Dashboard
**Link**: https://vercel.com/dashboard

**Login** with your Vercel account

---

### Step 2: Select Your Project
Click on **"vera-tech"** project

---

### Step 3: Open Settings
Click **"Settings"** tab at the top

---

### Step 4: Open Environment Variables
1. Click **"Environment Variables"** in the left sidebar
2. Scroll down to the environment variables list

---

### Step 5: Add CRON_SECRET

1. **Key (Name)**: 
   ```
   CRON_SECRET
   ```

2. **Value**: 
   ```
   4V1BCiK79X2m3RUfx6FPvweMoA5syIGl
   ```

3. **Select Environments**:
   - ✅ Production
   - ✅ Preview
   - ✅ Development (optional)

4. Click **"Save"**

---

### Step 6: Redeploy

**Option A: Trigger New Deployment**
1. Go to **"Deployments"** tab
2. Click the **"..."** menu on the latest deployment
3. Click **"Redeploy"**

**Option B: Push a Small Change**
```bash
# Make a small change and push
git commit --allow-empty -m "Trigger redeploy for CRON_SECRET"
git push
```

---

## 🧪 VERIFY IT WORKS

### After Redeployment (2-3 minutes)

**Check the logs**:
1. Go to Vercel Dashboard → vera-tech
2. Click **"Deployments"** tab
3. Click the latest deployment
4. Click **"Functions"** tab
5. Look for `/api/cron/send-reminders` logs
6. Should no longer see `CRON_SECRET not configured` error

---

## 📋 WHAT THIS FIXES

### Before (Broken)
```
❌ [CRON] CRON_SECRET not configured
❌ Cron job fails with 401 Unauthorized
❌ No reminder emails sent
```

### After (Fixed)
```
✅ CRON_SECRET configured
✅ Cron job runs successfully
✅ Reminder emails sent automatically:
   - 24 hours before consultation
   - 1 hour before consultation
   - 10 minutes before consultation
```

---

## 🔒 SECURITY NOTE

**What is CRON_SECRET?**
- A secret key that protects your cron job endpoints
- Prevents unauthorized users from triggering your cron jobs
- Must be sent as `Authorization: Bearer <SECRET>` header

**Who needs it?**
- Vercel Cron Jobs (automatic - Vercel handles this)
- Manual triggers (you would need to provide it)

**Keep it secure:**
- ❌ Don't commit to Git
- ❌ Don't share publicly
- ✅ Only store in Vercel environment variables
- ✅ Store in local .env for development

---

## ⚙️ CRON JOB SCHEDULE

Your cron job is configured to run **every 15 minutes**:

**Schedule**: `*/15 * * * *` (every 15 minutes)

**What it does**:
1. Checks for upcoming consultations
2. Sends reminders at appropriate times:
   - 24 hours before → Email reminder
   - 1 hour before → Email reminder
   - 10 minutes before → Email reminder
3. Logs all sent reminders to prevent duplicates

---

## 🧪 MANUAL TEST (Optional)

### Test the cron job manually:

1. **Get your CRON_SECRET** from Vercel environment variables

2. **Send a POST request**:
   ```bash
   curl -X POST https://vera-tech.vercel.app/api/cron/send-reminders \
     -H "Authorization: Bearer 4V1BCiK79X2m3RUfx6FPvweMoA5syIGl"
   ```

3. **Expected Response**:
   ```json
   {
     "success": true,
     "checked": 0,
     "sent": {
       "day_before": 0,
       "hour_before": 0,
       "ten_minutes": 0
     },
     "timestamp": "2026-08-23T12:00:00.000Z"
   }
   ```

---

## 📊 MONITORING

### Check if reminders are being sent:

**In Supabase**:
```sql
-- Check recent reminders
SELECT 
  cr.reminder_type,
  cr.sent_at,
  c.name,
  c.email,
  c.actual_scheduled_at
FROM consultation_reminders cr
JOIN consultations c ON c.id = cr.consultation_id
ORDER BY cr.sent_at DESC
LIMIT 10;
```

**Expected Output**:
- Rows showing reminders sent
- `sent_at` should be populated
- `reminder_type` shows DAY_BEFORE, HOUR_BEFORE, or TEN_MINUTES

---

## 🆘 TROUBLESHOOTING

### Still seeing CRON_SECRET error?
1. ✅ Check Vercel environment variables (Settings → Environment Variables)
2. ✅ Make sure CRON_SECRET is set for Production
3. ✅ Redeploy the application
4. ✅ Wait 2-3 minutes for deployment to complete

### Reminders not sending?
1. ✅ Check that cron job is scheduled in Vercel
2. ✅ Verify email configuration (RESEND_API_KEY)
3. ✅ Check Vercel function logs for errors
4. ✅ Verify consultations exist in database with future dates

### How to check cron schedule?
1. Go to Vercel Dashboard
2. Click your project
3. Go to **"Settings"** → **"Cron Jobs"**
4. Should see: `/api/cron/send-reminders` with schedule

---

## ✅ SUMMARY

| Step | Action | Status |
|------|--------|--------|
| 1 | Generate CRON_SECRET | ✅ Done (in .env) |
| 2 | Add to Vercel | ⏳ **You need to do this** |
| 3 | Redeploy application | ⏳ **You need to do this** |
| 4 | Verify in logs | ⏳ Check after redeploy |

---

## 🎯 YOUR NEXT STEPS

1. **Go to Vercel**: https://vercel.com/dashboard
2. **Select**: vera-tech project
3. **Go to**: Settings → Environment Variables
4. **Add**: `CRON_SECRET` = `4V1BCiK79X2m3RUfx6FPvweMoA5syIGl`
5. **Save** and **Redeploy**

**Time needed**: 5 minutes  
**Result**: Automatic consultation reminders working! ✅

---

**Let me know when you've added it to Vercel and I'll help verify it's working!** 🎉

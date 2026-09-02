# Cron Job Configuration for Vercel

## 📅 Current Schedule

The reminder system runs **once per day at 8:00 AM (UTC)**.

```json
{
  "crons": [
    {
      "path": "/api/cron/send-reminders",
      "schedule": "0 8 * * *"
    }
  ]
}
```

---

## 🔄 Cron Expression Explained

`0 8 * * *` means:
- **0** - At minute 0
- **8** - At hour 8 (8:00 AM UTC)
- ***** - Every day of month
- ***** - Every month
- ***** - Every day of week

**In East Africa Time (EAT - UTC+3):** This runs at **11:00 AM** every day.

---

## 📋 Vercel Plan Limits

### Hobby Plan (Free)
- ✅ **Daily cron jobs** - Once per day
- ❌ Cannot run multiple times per day
- ❌ Cannot run every 15 minutes

### Pro Plan ($20/month)
- ✅ Cron jobs can run as frequently as every minute
- ✅ Multiple cron jobs
- ✅ Advanced scheduling

---

## 🎯 What the Cron Job Does

**Path**: `/api/cron/send-reminders`

**Function**: Sends email/SMS reminders for upcoming consultations

**Checks**:
1. Finds consultations scheduled for next 24 hours
2. Sends reminder emails to clients
3. Sends reminder SMS/WhatsApp (if configured)
4. Updates notification status

---

## 🔧 To Change the Schedule

Edit `vercel.json` and change the `schedule` value:

### Examples:

**Every day at midnight UTC (3 AM EAT)**:
```json
"schedule": "0 0 * * *"
```

**Every day at 9 AM UTC (12 PM EAT)**:
```json
"schedule": "0 9 * * *"
```

**Every day at 6 PM UTC (9 PM EAT)**:
```json
"schedule": "0 18 * * *"
```

After changing:
```bash
git add vercel.json
git commit -m "chore: Update cron schedule"
git push origin main
```

Vercel will automatically redeploy with the new schedule.

---

## ⚠️ Important Notes

1. **Time Zone**: All cron times are in UTC. Convert to your local time (EAT = UTC+3)
2. **Hobby Plan**: Limited to once per day - current setup is compliant
3. **Manual Trigger**: You can manually test the cron job at:
   ```
   https://vera-tech.vercel.app/api/cron/send-reminders?secret=YOUR_CRON_SECRET
   ```
4. **Logs**: Check Vercel dashboard → Functions → Logs to see cron execution

---

## 🚀 Upgrade to Pro for More Frequent Reminders

If you need reminders more frequently (e.g., every hour, every 15 minutes):

1. **Upgrade**: https://vercel.com/pricing
2. **Change schedule** to your preference:
   - Every 15 minutes: `*/15 * * * *`
   - Every hour: `0 * * * *`
   - Every 6 hours: `0 */6 * * *`

---

## ✅ Current Setup Status

- ✅ Cron schedule: Daily at 8 AM UTC (11 AM EAT)
- ✅ Compatible with Vercel Hobby plan
- ✅ Pushed to GitHub
- ✅ Will work on Vercel deployment

**No action needed - deployment will succeed!**

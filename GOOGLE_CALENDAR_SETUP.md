# 📅 Google Calendar Setup Guide for VeyraTech

This guide will help you set up Google Calendar integration for automatic consultation scheduling with Google Meet links.

---

## 🎯 What This Enables

Once configured, VeyraTech will automatically:
- ✅ Create Google Calendar events for confirmed consultations
- ✅ Generate Google Meet links for virtual meetings
- ✅ Send calendar invites to clients
- ✅ Check availability to prevent double-booking
- ✅ Sync with your existing Google Calendar

---

## 📋 Prerequisites

- Google account (Gmail or Google Workspace)
- Access to Google Cloud Console
- Admin access to VeyraTech Vercel project

---

## 🚀 Setup Steps

### Step 1: Create Google Cloud Project (5 minutes)

1. **Go to Google Cloud Console:**
   - Visit: https://console.cloud.google.com
   - Sign in with your Google account

2. **Create a new project:**
   - Click "Select a project" dropdown at the top
   - Click "NEW PROJECT"
   - Project name: `VeyraTech Calendar`
   - Click "CREATE"

3. **Select your project:**
   - Wait for project creation (30 seconds)
   - Select "VeyraTech Calendar" from the project dropdown

---

### Step 2: Enable Google Calendar API (2 minutes)

1. **Enable the API:**
   - In the left sidebar, go to "APIs & Services" → "Library"
   - Search for "Google Calendar API"
   - Click on "Google Calendar API"
   - Click "ENABLE"

2. **Wait for activation:**
   - Takes about 30 seconds
   - You'll see "API enabled" confirmation

---

### Step 3: Configure OAuth Consent Screen (5 minutes)

1. **Go to OAuth consent screen:**
   - Left sidebar: "APIs & Services" → "OAuth consent screen"

2. **Choose user type:**
   - Select "External" (allows any Google user)
   - Click "CREATE"

3. **Fill in App Information:**
   - **App name:** `VeyraTech Consultation Scheduler`
   - **User support email:** Your email (admin@veyratech.com)
   - **App logo:** (Optional - can upload VeyraTech logo)
   - **Developer contact email:** admin@veyratech.com

4. **Scopes:**
   - Click "ADD OR REMOVE SCOPES"
   - Search and select:
     - `https://www.googleapis.com/auth/calendar`
     - `https://www.googleapis.com/auth/calendar.events`
   - Click "UPDATE"
   - Click "SAVE AND CONTINUE"

5. **Test users (for testing phase):**
   - Click "ADD USERS"
   - Add your email: admin@veyratech.com
   - Click "ADD"
   - Click "SAVE AND CONTINUE"

6. **Summary:**
   - Review everything
   - Click "BACK TO DASHBOARD"

---

### Step 4: Create OAuth 2.0 Credentials (3 minutes)

1. **Go to Credentials:**
   - Left sidebar: "APIs & Services" → "Credentials"
   - Click "CREATE CREDENTIALS"
   - Select "OAuth client ID"

2. **Configure OAuth client:**
   - **Application type:** Web application
   - **Name:** `VeyraTech Web Client`

3. **Authorized redirect URIs:**
   - Click "ADD URI"
   - Add these URLs:
     ```
     https://veyratech.vercel.app/api/auth/google/callback
     http://localhost:3000/api/auth/google/callback
     https://developers.google.com/oauthplayground
     ```
   - Click "CREATE"

4. **Save your credentials:**
   - You'll see a popup with:
     - **Client ID:** (copy this)
     - **Client Secret:** (copy this)
   - Click "DOWNLOAD JSON" (save this file safely)
   - Click "OK"

---

### Step 5: Get Refresh Token (5 minutes)

This is the most important step - you need a refresh token to access the calendar.

#### Method 1: Using OAuth 2.0 Playground (Easiest)

1. **Go to OAuth Playground:**
   - Visit: https://developers.google.com/oauthplayground

2. **Configure settings:**
   - Click the ⚙️ gear icon (top right)
   - Check "Use your own OAuth credentials"
   - Paste your **Client ID**
   - Paste your **Client Secret**
   - Close settings

3. **Select API scopes:**
   - In the left panel, scroll to "Calendar API v3"
   - Check these scopes:
     - `https://www.googleapis.com/auth/calendar`
     - `https://www.googleapis.com/auth/calendar.events`

4. **Authorize APIs:**
   - Click "Authorize APIs" button
   - Sign in with your Google account
   - Click "Allow" for all permissions
   - You'll be redirected back to the playground

5. **Exchange authorization code:**
   - Click "Exchange authorization code for tokens"
   - You'll see the response with:
     - `access_token`
     - `refresh_token` ← **This is what you need!**
   - Copy the `refresh_token` (starts with `1//`)

---

### Step 6: Add Environment Variables to Vercel (5 minutes)

1. **Go to Vercel Dashboard:**
   - Visit: https://vercel.com/dashboard
   - Select your VeyraTech project

2. **Add environment variables:**
   - Go to "Settings" → "Environment Variables"
   - Add these variables:

   ```env
   GOOGLE_CLIENT_ID=your_client_id_here.apps.googleusercontent.com
   GOOGLE_CLIENT_SECRET=your_client_secret_here
   GOOGLE_REFRESH_TOKEN=1//your_refresh_token_here
   GOOGLE_CALENDAR_ID=primary
   GOOGLE_REDIRECT_URI=https://veyratech.vercel.app/api/auth/google/callback
   TZ=Africa/Nairobi
   ```

3. **Important notes:**
   - Use the **Client ID** from Step 4
   - Use the **Client Secret** from Step 4
   - Use the **Refresh Token** from Step 5
   - `GOOGLE_CALENDAR_ID=primary` uses your primary calendar
   - Keep `TZ=Africa/Nairobi` for correct timezone

4. **Apply to all environments:**
   - Make sure to select "Production", "Preview", and "Development"
   - Click "Save" for each variable

---

### Step 7: Redeploy Application (2 minutes)

1. **Trigger redeployment:**
   - Go to "Deployments" tab in Vercel
   - Click on the latest deployment
   - Click "Redeploy" (three dots menu)
   - Click "Redeploy" to confirm

2. **Wait for deployment:**
   - Takes 2-3 minutes
   - Check deployment logs for any errors

---

### Step 8: Test the Integration (5 minutes)

1. **Book a test consultation:**
   - Go to: https://veyratech.vercel.app/book-consultation
   - Fill in the form with test data
   - Select a date and time
   - Submit

2. **Check your Google Calendar:**
   - Open Google Calendar: https://calendar.google.com
   - You should see the consultation event
   - Event should have:
     - Title: "VeyraTech Consultation — [Company Name]"
     - Description with client details
     - Google Meet link (if selected)

3. **Check client email:**
   - Client should receive confirmation email
   - Email should contain Google Meet link
   - Calendar invite should be attached

---

## 🔧 Troubleshooting

### Issue: "Invalid grant" error

**Cause:** Refresh token expired or revoked

**Solution:**
1. Go back to OAuth Playground (Step 5)
2. Revoke current token
3. Generate a new refresh token
4. Update `GOOGLE_REFRESH_TOKEN` in Vercel
5. Redeploy

---

### Issue: "Calendar API has not been used"

**Cause:** API not enabled or not fully activated

**Solution:**
1. Go to Google Cloud Console
2. Navigate to "APIs & Services" → "Dashboard"
3. Ensure "Google Calendar API" is enabled
4. Wait 5 minutes for propagation
5. Try again

---

### Issue: No Google Meet link generated

**Cause:** Meet link creation requires specific OAuth scopes

**Solution:**
1. Check OAuth scopes include:
   - `https://www.googleapis.com/auth/calendar`
   - `https://www.googleapis.com/auth/calendar.events`
2. Regenerate refresh token with correct scopes
3. Update Vercel environment variables

---

### Issue: "Access denied" error

**Cause:** OAuth consent screen not configured correctly

**Solution:**
1. Go to OAuth consent screen in Google Cloud Console
2. Add your email to "Test users"
3. Ensure app status is not "In production" (for testing)
4. Regenerate refresh token

---

### Issue: Events not appearing in calendar

**Cause:** Using wrong calendar ID

**Solution:**
1. Check `GOOGLE_CALENDAR_ID` environment variable
2. To use a specific calendar:
   - Go to Google Calendar → Settings
   - Select the calendar
   - Copy "Calendar ID" from settings
   - Update `GOOGLE_CALENDAR_ID` in Vercel
3. For primary calendar, use: `primary`

---

## 📊 Verifying Everything Works

### Check 1: Environment Variables
```bash
# In Vercel dashboard, verify these are set:
✅ GOOGLE_CLIENT_ID
✅ GOOGLE_CLIENT_SECRET
✅ GOOGLE_REFRESH_TOKEN
✅ GOOGLE_CALENDAR_ID
✅ GOOGLE_REDIRECT_URI
✅ TZ
```

### Check 2: Deployment Logs
- Go to Vercel → Deployments → Latest → Runtime Logs
- Look for `[GOOGLE_CALENDAR]` messages
- Should see: "Event created: [event_id]"

### Check 3: Database
- Consultation should have:
  - `google_calendar_event_id` (not null)
  - `google_meet_link` (if Google Meet selected)

---

## 🔐 Security Best Practices

1. **Never commit credentials:**
   - Keep `.env` in `.gitignore`
   - Never share OAuth tokens publicly

2. **Rotate tokens periodically:**
   - Refresh tokens can expire
   - Regenerate every 6 months

3. **Limit API scopes:**
   - Only request calendar access
   - Don't request unnecessary permissions

4. **Monitor API usage:**
   - Check Google Cloud Console → APIs & Services → Dashboard
   - Set up quotas and alerts

---

## 🚀 Production Checklist

Before going live:

- [ ] OAuth consent screen configured
- [ ] All environment variables added to Vercel
- [ ] Test booking created successfully
- [ ] Calendar event appears in Google Calendar
- [ ] Google Meet link works
- [ ] Client receives confirmation email with link
- [ ] Admin receives notification
- [ ] Refresh token saved securely

---

## 📞 Support

**Google Cloud Console Issues:**
- Support: https://cloud.google.com/support

**OAuth/API Issues:**
- Documentation: https://developers.google.com/calendar/api
- Stack Overflow: https://stackoverflow.com/questions/tagged/google-calendar-api

**VeyraTech Issues:**
- Check deployment logs in Vercel
- Review `/lib/google-calendar.ts` for errors
- Email: admin@veyratech.com

---

## 🎉 Success!

Once everything is configured:
- ✅ Consultations automatically create calendar events
- ✅ Google Meet links generated instantly
- ✅ Clients receive calendar invites
- ✅ Availability checking prevents conflicts
- ✅ All timezone-aware (Africa/Nairobi)

**Your consultation booking system is now fully automated!** 🚀

# 🚀 Quick Start - Get Notifications Working in 15 Minutes

## What You'll Get:
When someone books a consultation on your website:
- 📧 **Email** to your inbox
- 📱 **SMS** to your phone
- 💬 **WhatsApp** message

---

## Part 1: Email Setup (5 min) - Resend

### Step 1: Sign up
→ Go to **https://resend.com**
→ Click "Sign up" → Use your email

### Step 2: Get API Key
→ Dashboard → **API Keys** → **Create API Key**
→ Copy the key (starts with `re_`)

### Step 3: Add to Vercel
→ **https://vercel.com/dashboard**
→ Your project → **Settings** → **Environment Variables**
→ Add:
```
Name: RESEND_API_KEY
Value: re_your_key_here
```

✅ **Done!** You'll receive emails.

---

## Part 2: SMS Setup (5 min) - Twilio

### Step 1: Sign up
→ Go to **https://www.twilio.com/try-twilio**
→ Fill form → Verify your phone (+254745247211)

### Step 2: Get a Phone Number
→ In Twilio Console → **"Get a Twilio phone number"**
→ Choose SMS capability → **Buy**
→ Copy the number (example: +254712345678)

### Step 3: Get Credentials
→ Twilio Dashboard shows:
```
Account SID: ACxxxxxx
Auth Token: xxxxxx (click Show)
```

### Step 4: Add to Vercel
→ **https://vercel.com/dashboard**
→ Your project → **Settings** → **Environment Variables**
→ Add these 3:
```
TWILIO_ACCOUNT_SID = ACxxxxxx
TWILIO_AUTH_TOKEN = xxxxxx
TWILIO_PHONE_NUMBER = +254712345678
ADMIN_PHONE_NUMBER = +254745247211
```

✅ **Done!** You'll receive SMS.

---

## Part 3: WhatsApp Setup (5 min) - Twilio Sandbox

### Step 1: Get Join Code
→ Twilio Console → **Messaging** → **Try WhatsApp**
→ You'll see: "Send 'join word-word' to +1 415 523 8886"

### Step 2: Join Sandbox (On Your Phone)
→ Open WhatsApp on your phone
→ Save contact: **+1 415 523 8886**
→ Send message: **join word-word** (use the exact words shown)
→ You'll get: "✅ Sandbox Enabled!"

### Step 3: Add to Vercel
→ **https://vercel.com/dashboard**
→ Your project → **Settings** → **Environment Variables**
→ Add these 2:
```
TWILIO_WHATSAPP_NUMBER = whatsapp:+14155238886
ADMIN_WHATSAPP_NUMBER = +254745247211
```

✅ **Done!** You'll receive WhatsApp messages.

---

## Final Step: Redeploy

→ Go to **https://vercel.com/dashboard**
→ Your project → **Deployments**
→ Click **"Redeploy"** (3 dots menu)

**Wait 2-3 minutes for deployment to complete.**

---

## 🧪 Test It!

1. Go to **https://veyratech.vercel.app**
2. Click **"Book Consultation"**
3. Fill the form → Submit

**You should receive:**
✅ Email in your inbox
✅ SMS on your phone
✅ WhatsApp message

---

## 📋 All Environment Variables You Need

Here's the complete list for Vercel:

```env
# Email
RESEND_API_KEY=re_xxxxx
EMAIL_FROM=VeyraTech <noreply@veyratech.com>
ADMIN_EMAIL=admin@veyratech.com

# SMS/WhatsApp
TWILIO_ACCOUNT_SID=ACxxxxx
TWILIO_AUTH_TOKEN=xxxxx
TWILIO_PHONE_NUMBER=+254712345678
TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886
ADMIN_PHONE_NUMBER=+254745247211
ADMIN_WHATSAPP_NUMBER=+254745247211
```

**Replace:**
- `re_xxxxx` → Your Resend API key
- `ACxxxxx` → Your Twilio Account SID
- `xxxxx` → Your Twilio Auth Token
- `+254712345678` → Your Twilio phone number
- Keep `+254745247211` (your phone number)
- Keep `whatsapp:+14155238886` (Twilio sandbox)

---

## 🆘 Not Working?

### Check Vercel Logs:
→ Vercel Dashboard → Deployments → Latest → **Functions**
→ Look for `[EMAIL]`, `[SMS]`, `[WHATSAPP]` errors

### Check Twilio Logs:
→ Twilio Console → **Monitor** → **Logs** → **Messages**
→ See if messages are being sent

### Common Issues:
- ❌ Forgot to redeploy after adding env variables
- ❌ Phone number missing country code (+254)
- ❌ Didn't join WhatsApp sandbox
- ❌ Typo in environment variable names

---

## 📚 Detailed Guides

Need more help?
- **SMS & WhatsApp:** See `SMS_WHATSAPP_SETUP_SIMPLE.md`
- **Email:** See `EMAIL_SETUP.md`
- **Everything:** See `NOTIFICATIONS_SETUP.md`

---

## 💰 Costs

### Free Tier:
- **Resend:** 100 emails/day (FREE)
- **Twilio Trial:** $15 credit (FREE)

### After Trial:
- SMS: ~$0.05 per message
- WhatsApp: ~$0.005 per message
- ~100 consultations/month = ~$5-10/month

---

**🎉 You're all set! Start receiving notifications on every consultation booking!**

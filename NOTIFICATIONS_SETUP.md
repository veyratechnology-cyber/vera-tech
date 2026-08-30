# Multi-Channel Notifications Setup Guide

VeyraTech uses **Resend** for emails and **Twilio** for SMS/WhatsApp notifications.

## 📧 Email Setup (Resend)

### 1. Create Resend Account
1. Go to [resend.com](https://resend.com)
2. Sign up for free (100 emails/day)
3. Verify your email

### 2. Get API Key
1. Dashboard → **API Keys** → **Create API Key**
2. Name: "VeyraTech Production"
3. Copy the key (starts with `re_`)

### 3. Add Domain (Recommended for Production)
1. Dashboard → **Domains** → **Add Domain**
2. Enter: `veyratech.com`
3. Add DNS records to your domain provider
4. Wait for verification (~5-10 min)

---

## 📱 SMS/WhatsApp Setup (Twilio)

### 1. Create Twilio Account
1. Go to [twilio.com/try-twilio](https://www.twilio.com/try-twilio)
2. Sign up for free trial ($15 credit)
3. Verify your email and phone number

### 2. Get Account Credentials
1. Go to [Twilio Console](https://console.twilio.com)
2. Copy from dashboard:
   - **Account SID** (starts with `AC`)
   - **Auth Token** (click to reveal)

### 3. Get a Phone Number (for SMS)
1. Console → **Phone Numbers** → **Buy a number**
2. Choose country: **Kenya (+254)** or **USA (+1)**
3. Check capabilities: ✅ SMS, ✅ Voice
4. Buy number (free with trial credit)
5. Copy the number (e.g., `+254712345678`)

### 4. Setup WhatsApp (Two Options)

#### Option A: Sandbox (Quick Testing)
1. Console → **Messaging** → **Try it out** → **Send a WhatsApp message**
2. Send the join code from your phone to the sandbox number
3. Use sandbox number: `whatsapp:+14155238886`
4. ⚠️ **Limitation**: Only works with approved numbers

#### Option B: Production (Requires Approval)
1. Console → **Messaging** → **WhatsApp** → **Senders**
2. Request access to WhatsApp Business API
3. Submit business profile for approval (takes 1-3 days)
4. Once approved, configure your business number

---

## 🔧 Environment Variables

Add these to **Vercel** environment variables:

```env
# Email (Resend)
RESEND_API_KEY=re_your_api_key_here
EMAIL_FROM=VeyraTech <noreply@veyratech.com>
ADMIN_EMAIL=admin@veyratech.com

# SMS/WhatsApp (Twilio)
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_PHONE_NUMBER=+254712345678
TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886
ADMIN_PHONE_NUMBER=+254745247211
ADMIN_WHATSAPP_NUMBER=+254745247211
```

### Important Notes:
- Replace `ADMIN_EMAIL` with your actual email
- Replace `ADMIN_PHONE_NUMBER` with your phone (format: `+254745247211`)
- Replace `ADMIN_WHATSAPP_NUMBER` with your WhatsApp number
- For sandbox WhatsApp, use: `whatsapp:+14155238886`
- Phone numbers MUST include country code (e.g., `+254` for Kenya)

---

## 🚀 Deployment

### 1. Add Variables to Vercel
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project → **Settings** → **Environment Variables**
3. Add all variables above
4. Save

### 2. Redeploy
```bash
git push origin main
```
Or in Vercel: **Deployments** → **Redeploy**

---

## 🧪 Testing

### Test Email
1. Make sure `RESEND_API_KEY` is set
2. Submit a consultation on your website
3. Check:
   - Admin receives email notification
   - Customer receives confirmation email
4. Check Resend Dashboard → **Logs** for delivery status

### Test SMS
1. Make sure Twilio credentials are set
2. Verify `ADMIN_PHONE_NUMBER` can receive SMS
3. Submit a consultation
4. Check your phone for SMS
5. Check Twilio Console → **Monitor** → **Logs** for status

### Test WhatsApp
1. Join Twilio WhatsApp sandbox (if using sandbox)
2. Make sure `ADMIN_WHATSAPP_NUMBER` is set
3. Submit a consultation
4. Check WhatsApp for message
5. Check Twilio Console → **Monitor** → **Logs** → **WhatsApp**

---

## 📊 What Gets Sent?

### Consultation Booking:
- ✅ **Admin Email**: Details + link to view consultation
- ✅ **Customer Email**: Confirmation message
- ✅ **Admin SMS**: Quick notification with key details
- ✅ **Admin WhatsApp**: Detailed notification with link

### Contact Form:
- ✅ **Admin Email**: Message details + reply button
- ✅ **Customer Email**: Confirmation
- ✅ **Admin SMS**: Quick notification
- ✅ **Admin WhatsApp**: Message preview

---

## 💰 Costs

### Resend
- **Free**: 100 emails/day (3,000/month)
- **Pro**: $20/mo for 50,000 emails

### Twilio
- **Trial**: $15 free credit (can't send to unverified numbers)
- **SMS**: ~$0.01-0.08 per message (varies by country)
- **WhatsApp**: ~$0.005 per message
- **Upgrade**: Add credit card to send to any number

**Estimated Monthly Cost** (for ~100 consultations):
- Emails: Free (under limit)
- SMS: $2-8
- WhatsApp: $0.50
- **Total**: ~$3-9/month

---

## 🔧 Troubleshooting

### Emails Not Sending
- [ ] Check `RESEND_API_KEY` is set correctly
- [ ] Verify sender domain is verified in Resend
- [ ] Check Vercel logs for errors
- [ ] Check Resend Dashboard → **Logs**

### SMS Not Sending
- [ ] Verify phone numbers have country codes
- [ ] Check Twilio Account SID and Auth Token
- [ ] Verify Twilio phone number can send SMS
- [ ] For trial accounts: Verify recipient number in Twilio
- [ ] Check Twilio Console → **Monitor** → **Logs**

### WhatsApp Not Sending
- [ ] Join sandbox (send join code from your phone)
- [ ] Verify WhatsApp number format: `whatsapp:+254...`
- [ ] Check if using correct sandbox number
- [ ] Check Twilio Console → **Monitor** → **Logs** → **WhatsApp**

### General Issues
- All notifications are non-blocking (won't fail consultation booking)
- Check Vercel Function Logs for detailed errors
- Test individual channels separately
- Verify all environment variables are set

---

## 🎯 Next Steps

1. ✅ Set up Resend account and get API key
2. ✅ Set up Twilio account and get credentials
3. ✅ Buy Twilio phone number
4. ✅ Configure WhatsApp sandbox
5. ✅ Add all environment variables to Vercel
6. ✅ Redeploy application
7. ✅ Test each notification channel
8. ✅ Monitor Twilio credit usage
9. ⏳ Apply for WhatsApp Business API (optional)
10. ⏳ Upgrade Twilio account when ready for production

---

## 📞 Support

**Resend Support**: [resend.com/docs](https://resend.com/docs)
**Twilio Support**: [support.twilio.com](https://support.twilio.com)

For VeyraTech-specific issues, check the code in:
- `lib/email.ts` - Email templates
- `lib/notifications.ts` - SMS/WhatsApp logic
- `app/api/consultations/route.ts` - Consultation endpoint
- `app/api/contact/route.ts` - Contact form endpoint

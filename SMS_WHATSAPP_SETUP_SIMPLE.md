# 📱 SMS & WhatsApp Setup - Simple Guide

Follow these steps to receive SMS and WhatsApp notifications when someone books a consultation.

---

## Step 1: Create Twilio Account (5 minutes)

1. **Go to:** https://www.twilio.com/try-twilio
2. **Click:** "Sign up and start building"
3. **Fill in:**
   - First Name
   - Last Name
   - Email
   - Password
4. **Click:** "Start your free trial"
5. **Verify your email** (check inbox)
6. **Verify your phone number** (+254745247211)
   - Enter the code they send you

✅ You now have a Twilio account with **$15 free credit**!

---

## Step 2: Get Your Account Credentials (2 minutes)

After login, you'll see the **Twilio Console Dashboard**.

1. **Find these on the dashboard:**
   ```
   Account SID: ACxxxxxxxxxxxxxxxxxxxxxxxxxx
   Auth Token: [Click "Show" to reveal]
   ```

2. **Copy both** - you'll need them later

📝 **Save these somewhere safe** (Notepad, etc.)

---

## Step 3: Get a Phone Number for SMS (3 minutes)

1. **In Twilio Console, click:** "Get a Twilio phone number"
   - OR go to: Phone Numbers → Manage → Buy a number

2. **Choose country:**
   - For Kenya: Select **Kenya (+254)**
   - For USA: Select **United States (+1)**

3. **Select capabilities:**
   - ✅ SMS
   - ✅ Voice

4. **Click:** "Buy" (uses your free credit, no charge)

5. **Copy your new number**, example:
   ```
   +254712345678
   ```

✅ You now have a phone number for sending SMS!

---

## Step 4: Setup WhatsApp Sandbox (2 minutes)

For testing, Twilio provides a free WhatsApp sandbox.

### On Desktop:

1. **In Twilio Console, go to:**
   - Messaging → Try it out → Send a WhatsApp message
   - OR: https://console.twilio.com/us1/develop/sms/try-it-out/whatsapp-learn

2. **You'll see:**
   ```
   Join code: join [some-word-here]
   Sandbox number: +1 415 523 8886
   ```

3. **On your phone (WhatsApp):**
   - Save the sandbox number: **+1 415 523 8886**
   - Send a WhatsApp message to that number with the join code
   - Example: `join cotton-divide`

4. **You'll receive:** "Sandbox Enabled! 🎉"

✅ Your WhatsApp is now connected!

### Phone Numbers for WhatsApp:
- Sandbox number: `whatsapp:+14155238886` (this stays the same)
- Your WhatsApp number: `+254745247211` (your phone number)

---

## Step 5: Add to Vercel (5 minutes)

Now add all the credentials to your Vercel project:

1. **Go to:** https://vercel.com/dashboard
2. **Select your project** (VeyraTech)
3. **Go to:** Settings → Environment Variables
4. **Add these variables ONE BY ONE:**

```env
TWILIO_ACCOUNT_SID
Value: ACxxxxxxxxxxxxxxxxxxxxxxxxxx
(paste your Account SID from Step 2)
Click "Add"

TWILIO_AUTH_TOKEN
Value: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
(paste your Auth Token from Step 2)
Click "Add"

TWILIO_PHONE_NUMBER
Value: +254712345678
(paste the number you bought in Step 3)
Click "Add"

TWILIO_WHATSAPP_NUMBER
Value: whatsapp:+14155238886
(use exactly this - it's the sandbox number)
Click "Add"

ADMIN_PHONE_NUMBER
Value: +254745247211
(your phone number where you want to receive SMS)
Click "Add"

ADMIN_WHATSAPP_NUMBER
Value: +254745247211
(your phone number where you want to receive WhatsApp)
Click "Add"
```

5. **After adding all 6 variables, click:** "Redeploy" or push code again

---

## Step 6: Test It! (2 minutes)

1. **Go to your website:** https://veyratech.vercel.app
2. **Click:** "Book Consultation"
3. **Fill the form** with test data
4. **Submit**

### You should receive:
- ✅ SMS on your phone (+254745247211)
- ✅ WhatsApp message on your phone
- ✅ Email (if you set up Resend)

---

## 🎯 Quick Reference

### Your Configuration:
```
Twilio Account SID: ACxxxxxxxxxx (from Twilio dashboard)
Twilio Auth Token: xxxxxxxxxx (from Twilio dashboard)
Your SMS Number: +254712345678 (number you bought)
WhatsApp Sandbox: whatsapp:+14155238886 (Twilio's sandbox)
Your Phone: +254745247211 (where notifications go)
```

### Where to Find Things in Twilio:

**📊 Dashboard:** https://console.twilio.com
- See your Account SID and Auth Token

**📱 Phone Numbers:** Console → Phone Numbers → Manage → Active Numbers
- See the number you bought

**💬 WhatsApp:** Console → Messaging → Try it out → WhatsApp
- Join sandbox
- See join code

**📈 Message Logs:** Console → Monitor → Logs → Messages
- See if messages are sending
- Check for errors

**💰 Balance:** Top right corner of console
- See remaining credit

---

## ❓ Troubleshooting

### Not receiving SMS?
1. ✅ Check `TWILIO_PHONE_NUMBER` has country code (+254...)
2. ✅ Check `ADMIN_PHONE_NUMBER` is correct
3. ✅ For trial account: Verify your phone number in Twilio
4. ✅ Check Twilio Console → Monitor → Logs for errors

### Not receiving WhatsApp?
1. ✅ Did you join the sandbox? (send the join code)
2. ✅ Check `ADMIN_WHATSAPP_NUMBER` is correct (+254...)
3. ✅ Make sure it's the same number you used to join sandbox
4. ✅ WhatsApp number format: `whatsapp:+14155238886`

### Still not working?
1. Check **Vercel Logs:**
   - Vercel Dashboard → Deployments → Click latest → Functions tab
   - Look for errors with [SMS] or [WHATSAPP]

2. Check **Twilio Logs:**
   - Twilio Console → Monitor → Logs → Messages
   - See delivery status and errors

3. **Redeploy** after adding environment variables:
   - Vercel Dashboard → Deployments → Redeploy

---

## 💰 Costs

### Twilio Pricing:
- **Trial:** $15 free credit
- **SMS to Kenya:** ~$0.05 per message
- **WhatsApp:** ~$0.005 per message
- **Trial limit:** Can only send to verified phone numbers

### To Send to Any Number (Production):
1. Add credit card to Twilio account
2. Add $20 credit (minimum)
3. Now you can send to any phone number

**Estimated cost:** For ~100 consultations/month = ~$5-10

---

## 🚀 Production WhatsApp (Optional)

The sandbox works great for testing, but for production:

1. **Apply for WhatsApp Business API:**
   - Twilio Console → Messaging → WhatsApp → Senders
   - Click "Apply for WhatsApp Business Account"

2. **Fill business details:**
   - Business name
   - Website
   - Business profile

3. **Wait for approval** (1-3 days)

4. **Once approved:**
   - Get your WhatsApp business number
   - Update `TWILIO_WHATSAPP_NUMBER` in Vercel

**Benefit:** Can send to any WhatsApp number worldwide

---

## ✅ Checklist

- [ ] Created Twilio account
- [ ] Verified email and phone
- [ ] Copied Account SID and Auth Token
- [ ] Bought Twilio phone number
- [ ] Joined WhatsApp sandbox from my phone
- [ ] Added all 6 environment variables to Vercel
- [ ] Redeployed application
- [ ] Tested by booking a consultation
- [ ] Received SMS notification
- [ ] Received WhatsApp notification

---

## 📞 Need Help?

**Twilio Support:** https://support.twilio.com
**Twilio Docs:** https://www.twilio.com/docs

**Check your setup:**
1. Twilio Console: https://console.twilio.com
2. Vercel Dashboard: https://vercel.com/dashboard
3. Your site: https://veyratech.vercel.app

---

**🎉 That's it! You're all set to receive SMS and WhatsApp notifications!**

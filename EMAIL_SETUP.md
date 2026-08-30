# Email Setup Instructions

> **📋 For complete multi-channel setup (Email + SMS + WhatsApp), see [NOTIFICATIONS_SETUP.md](./NOTIFICATIONS_SETUP.md)**

VeyraTech uses [Resend](https://resend.com) for sending transactional emails.

## Setup Steps

### 1. Create a Resend Account

1. Go to [resend.com](https://resend.com)
2. Sign up for a free account (100 emails/day free)
3. Verify your email address

### 2. Add Your Domain (Optional but Recommended)

For production, add your domain:
1. In Resend dashboard, go to **Domains**
2. Click **Add Domain**
3. Enter `veyratech.com`
4. Add the DNS records shown to your domain provider
5. Wait for verification (usually 5-10 minutes)

### 3. Get Your API Key

1. In Resend dashboard, go to **API Keys**
2. Click **Create API Key**
3. Name it "VeyraTech Production"
4. Copy the API key (starts with `re_`)

### 4. Add Environment Variables

Add these to your **Vercel** environment variables:

```env
RESEND_API_KEY=re_your_api_key_here
EMAIL_FROM=VeyraTech <noreply@veyratech.com>
ADMIN_EMAIL=admin@veyratech.com
```

**Important:** Replace `admin@veyratech.com` with the email where you want to receive notifications.

### 5. Redeploy

After adding the environment variables in Vercel, redeploy your app.

## What Emails Are Sent?

### Consultation Requests
- **To Admin**: Notification with consultation details and link to view
- **To Customer**: Confirmation that request was received

### Contact Form
- **To Admin**: Notification with message and reply button
- **To Customer**: Confirmation that message was received

## Testing

### Before Domain Verification
You can only send emails to verified addresses:
1. In Resend, go to **Settings** → **Verified Emails**
2. Add your email address
3. Verify it
4. Test by submitting a consultation or contact form

### After Domain Verification
You can send to any email address.

## Troubleshooting

### Emails Not Sending
1. Check Vercel logs for email errors
2. Verify RESEND_API_KEY is set correctly
3. Check Resend dashboard for delivery status
4. Verify sender domain/email is configured

### Emails Going to Spam
1. Add SPF, DKIM, and DMARC records (provided by Resend)
2. Use a custom domain instead of `@veyratech.com`
3. Build sending reputation gradually

## Email Templates

Email templates are in `lib/email.ts`. You can customize:
- Subject lines
- HTML content
- Colors and styling
- Footer information

## Cost

Resend pricing:
- **Free**: 100 emails/day, 3,000/month
- **Pro ($20/mo)**: 50,000 emails/month
- **Enterprise**: Custom pricing

Most small businesses stay on the free plan initially.

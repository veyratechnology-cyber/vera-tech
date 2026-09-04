# VeyraTech Admin Panel - Complete Access Guide

---

## 🔐 ADMIN LOGIN CREDENTIALS

```
Email:    admin@veyratech.com
Password: bonaventure123kenya
```

---

## 🌐 ADMIN PANEL URLS

### Production (Vercel):
```
Admin Login:    https://vera-tech.vercel.app/admin-login
Admin Dashboard: https://vera-tech.vercel.app/admin
```

### Local Development:
```
Admin Login:    http://localhost:3000/admin-login
Admin Dashboard: http://localhost:3000/admin
```

---

## 📋 HOW TO ACCESS THE ADMIN PANEL

### Step 1: Go to Login Page
Open your browser and navigate to:
- **Production**: https://vera-tech.vercel.app/admin-login
- **Local**: http://localhost:3000/admin-login

### Step 2: Enter Credentials
- **Email**: `admin@veyratech.com`
- **Password**: `bonaventure123kenya`

### Step 3: Click "Sign In"
You'll be redirected to the admin dashboard

---

## 🎛️ ADMIN DASHBOARD FEATURES

Once logged in, you'll see the main dashboard with:

### 1. **Overview Statistics** (Top Cards)
- Total Leads
- Total Prospects
- Active Consultations
- Completed Projects
- Revenue metrics

### 2. **Left Sidebar Navigation**
- 📊 **Dashboard** - Main overview
- 📅 **Consultations** - Manage consultation bookings
- 💼 **Leads** - View and manage leads
- 🎯 **Prospects** - Track prospects
- 📋 **Proposals** - Manage proposals
- 🚀 **Projects** - Track active projects
- 📨 **Contact Messages** - View contact form submissions
- 🔔 **Notifications** - Bell icon (top right)

### 3. **Quick Actions**
- View recent consultations
- Respond to contact messages
- Update consultation statuses
- Schedule follow-ups

---

## 📅 CONSULTATIONS MANAGEMENT

### URL: `/admin/consultations`

**Features:**
- View all consultation requests
- Filter by status (New, Scheduled, Completed, Cancelled)
- Search by name, email, or company
- See consultation details
- Update statuses
- Schedule meetings
- Cancel/Reschedule consultations

**Consultation Statuses:**
- 🆕 **NEW** - Just submitted, needs review
- ⏰ **SCHEDULED** - Meeting time confirmed
- ✅ **COMPLETED** - Consultation finished
- ❌ **CANCELLED** - Cancelled by admin or client
- 🔄 **RESCHEDULED** - Time changed

**Actions Available:**
- View full details
- Mark as completed
- Cancel with reason
- Reschedule
- Add notes

---

## 💼 LEADS MANAGEMENT

### URL: `/admin/leads`

**What are Leads?**
- People who've shown interest
- Contact form submissions
- Early-stage contacts

**Features:**
- View all leads
- Convert to prospects
- Filter by source
- Export data
- Add notes and tags

---

## 🎯 PROSPECTS MANAGEMENT

### URL: `/admin/prospects`

**What are Prospects?**
- Qualified leads
- Active discussions ongoing
- Potential clients

**Features:**
- Track communication history
- Schedule follow-ups
- Move to proposals stage
- Assign priority levels

---

## 📋 PROPOSALS MANAGEMENT

### URL: `/admin/proposals`

**Features:**
- Create new proposals
- Track proposal status
- View acceptance/rejection
- Link to projects
- Download proposal documents

---

## 🚀 PROJECTS MANAGEMENT

### URL: `/admin/projects`

**Features:**
- Track active projects
- Update project status
- Monitor deadlines
- View project details
- Link to consultations

---

## 📨 CONTACT MESSAGES

### URL: `/admin/contact`

**Features:**
- View all contact form submissions
- Mark as read/unread
- Respond to messages
- Filter by date
- Export messages

**Message Information Shown:**
- Name
- Email
- Company
- Phone
- Subject
- Message content
- Submission date

---

## 🔔 NOTIFICATIONS

**Bell Icon (Top Right Corner)**

**Types of Notifications:**
- New consultation requests
- Contact form submissions
- System alerts
- Status updates

**Features:**
- Real-time notifications
- Mark as read
- Clear all
- View notification history

---

## 📊 DASHBOARD ANALYTICS

### Main Dashboard Shows:

1. **Conversion Metrics**
   - Lead to Prospect conversion rate
   - Prospect to Client conversion rate
   - Overall success rate

2. **Recent Activity**
   - Latest consultations
   - Recent contact messages
   - New leads
   - Upcoming meetings

3. **Charts & Graphs**
   - Monthly consultation trends
   - Revenue by service type
   - Client acquisition timeline

---

## 🔧 ADMIN SETTINGS

### Profile Settings:
- Update admin name
- Change email
- Change password
- Update profile picture

### System Settings:
- Email notifications
- SMS notifications
- Calendar sync
- Default meeting duration

---

## 📱 ADMIN FEATURES BY ROLE

### Super Admin (Your Account):
- ✅ Full access to all features
- ✅ Manage consultations
- ✅ View all data
- ✅ Export reports
- ✅ System settings
- ✅ User management (if multiple admins)

---

## 🚀 QUICK START GUIDE

### First Time Login:

1. **Login** with credentials above
2. **Review Dashboard** - See overview
3. **Check Consultations** - Any new requests?
4. **Read Contact Messages** - Any inquiries?
5. **Configure Notifications** - Set up alerts
6. **Test Features** - Familiarize yourself

### Daily Workflow:

1. **Morning:**
   - Login to admin panel
   - Check new consultations
   - Review contact messages
   - Check notifications

2. **Throughout Day:**
   - Update consultation statuses
   - Respond to messages
   - Schedule follow-ups
   - Add notes to prospects

3. **End of Day:**
   - Review completed tasks
   - Plan tomorrow's follow-ups
   - Export reports if needed

---

## 🔐 SECURITY FEATURES

- ✅ Password-protected login
- ✅ Session management
- ✅ Auto-logout after inactivity
- ✅ Secure authentication with NextAuth
- ✅ Database encryption
- ✅ HTTPS only (production)

---

## 🆘 TROUBLESHOOTING

### Can't Login?

**Issue**: "Invalid credentials"
**Solution**: 
1. Check email: `admin@veyratech.com` (exact)
2. Check password: `bonaventure123kenya` (exact, case-sensitive)
3. Clear browser cache
4. Try incognito/private window

**Issue**: "User not found"
**Solution**: Admin user needs to be created in database. Run this SQL in Supabase:
```sql
-- Run in Supabase SQL Editor
DELETE FROM admins WHERE email = 'admin@veyratech.com';
INSERT INTO admins (name, email, password_hash, status)
VALUES (
  'Administrator',
  'admin@veyratech.com',
  '$2a$10$fVVJicsc8m.BdGV8T7OtIOXV3yksfV/YGdjBgeoI1XCBa7mBjmIna',
  'ACTIVE'
);
```

### Page Not Loading?

1. Check if deployment succeeded
2. Check environment variables are set
3. Check database connection
4. Check browser console for errors

### Can't See Data?

1. Verify database has data
2. Check DATABASE_URL is correct
3. Check Supabase is online
4. Run migrations if needed

---

## 📞 SUPPORT INFORMATION

If you need help:
1. Check documentation files in repository
2. Check Supabase logs for database errors
3. Check Vercel logs for deployment errors
4. Review browser console for frontend errors

---

## 🎯 ADMIN PANEL FILE LOCATIONS

```
Admin Login:
- app/admin-login/page.tsx

Admin Layout:
- app/admin/layout.tsx

Admin Dashboard:
- app/admin/page.tsx

Consultations:
- app/admin/consultations/page.tsx
- app/admin/consultations/[id]/page.tsx

Contact Messages:
- app/admin/contact/page.tsx

Sidebar:
- components/admin/AdminSidebar.tsx

Notifications:
- components/admin/NotificationBell.tsx

API Routes:
- app/api/admin/ (various endpoints)
```

---

## ✅ QUICK REFERENCE CARD

```
┌─────────────────────────────────────────────────┐
│          VEYRATECH ADMIN ACCESS                 │
├─────────────────────────────────────────────────┤
│ Production URL:                                 │
│ https://vera-tech.vercel.app/admin-login        │
│                                                 │
│ Email: admin@veyratech.com                      │
│ Password: bonaventure123kenya                   │
│                                                 │
│ Main Features:                                  │
│ • Consultations (/admin/consultations)         │
│ • Contact Messages (/admin/contact)            │
│ • Leads (/admin/leads)                         │
│ • Prospects (/admin/prospects)                 │
│ • Projects (/admin/projects)                   │
│ • Notifications (bell icon)                    │
└─────────────────────────────────────────────────┘
```

---

**Your admin panel is ready to use!** 🎉

Just go to the URL and login with the credentials above.

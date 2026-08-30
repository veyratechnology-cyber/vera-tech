# 🗄️ Database Migration Guide - VeyraTech Consultation System

## Quick Start

**Run this single file in Supabase SQL Editor:**
```
consultation-booking-complete-migration.sql
```

That's it! Everything is included in one file. ✅

---

## What This Migration Does

### 📊 Creates 3 New Tables

1. **consultation_reminders**
   - Tracks sent reminders (24h, 1h, 10min before meetings)
   - Links to consultations table
   - Prevents duplicate reminders

2. **consultation_history**
   - Complete audit trail of all changes
   - Tracks: CREATED, SCHEDULED, RESCHEDULED, CANCELLED, COMPLETED
   - Timestamps all actions

3. **system_settings**
   - Stores scheduling configuration
   - 24/7 availability settings
   - Buffer time and duration defaults

### 📝 Adds 26 New Columns to consultations

**Personal Information (2):**
- `job_title` - Client's job title
- `preferred_contact_method` - EMAIL, PHONE, or WHATSAPP

**Company Information (3):**
- `company_website` - Company website URL
- `country` - Client location country
- `city` - Client location city

**Consultation Details (3):**
- `consultation_types` - Array of consultation types
- `desired_outcome` - What client hopes to achieve
- `current_technology` - Current tech stack/systems

**Meeting Information (6):**
- `actual_scheduled_at` - Confirmed meeting time
- `meeting_type` - GOOGLE_MEET, PHONE, or IN_PERSON
- `meeting_duration` - Duration in minutes (default 60)
- `meeting_location` - For in-person meetings
- `timezone` - Client timezone (default Africa/Nairobi)

**Google Calendar Integration (2):**
- `google_calendar_event_id` - Calendar event ID
- `google_meet_link` - Google Meet link for virtual meetings

**Meeting Notes (5):**
- `meeting_notes` - General meeting notes
- `key_problems` - Key problems identified
- `potential_solutions` - Solutions discussed
- `client_concerns` - Client concerns/objections
- `budget_discussion` - Budget discussion notes

**Outcome & Follow-up (3):**
- `outcome` - Consultation outcome enum
- `follow_up_date` - Date for follow-up
- `follow_up_notes` - Follow-up notes

**History & Tracking (3):**
- `cancelled_at` - Cancellation timestamp
- `cancellation_reason` - Why it was cancelled
- `reschedule_count` - Number of reschedules

### 🏷️ Creates 4 New Enums

1. **consultation_type** (12 values)
   - AI_ADOPTION
   - AI_STRATEGY
   - BUSINESS_AUTOMATION
   - DIGITAL_TRANSFORMATION
   - TECHNOLOGY_STRATEGY
   - SOFTWARE_DEVELOPMENT
   - TECHNOLOGY_AUDIT
   - DATA_ANALYTICS
   - CYBERSECURITY
   - BUSINESS_PROCESS_OPTIMIZATION
   - CUSTOM_SOLUTION
   - OTHER

2. **meeting_type** (3 values)
   - GOOGLE_MEET
   - PHONE
   - IN_PERSON

3. **consultation_outcome** (9 values)
   - PROPOSAL_SENT
   - PROJECT_STARTED
   - FOLLOW_UP_NEEDED
   - NOT_A_FIT
   - CLIENT_CANCELLED
   - PENDING_DECISION
   - CONVERTED_TO_CLIENT
   - DECLINED
   - OTHER

4. **reminder_type** (3 values)
   - DAY_BEFORE (24 hours)
   - HOUR_BEFORE (1 hour)
   - TEN_MINUTES (10 minutes)

### 📈 Extends Existing Enums

1. **consultation_status** - Adds `NO_SHOW`
2. **industry** - Expands to 18 industries
3. **company_size** - 5 specific size ranges

### ⚡ Performance Optimizations

**Indexes Created:**
- `actual_scheduled_at` - Fast scheduling queries
- `status` - Quick status filtering
- `meeting_type` - Meeting type filtering
- `google_calendar_event_id` - Calendar sync lookup
- `created_at` - Chronological sorting
- `industry` - Industry filtering
- Composite index for scheduling (actual_scheduled_at + status)

### 🔧 Helper Functions

**check_consultation_conflict()**
- Checks if a time slot conflicts with existing consultations
- Used by scheduling engine
- Respects meeting duration and buffer time

---

## 🚀 How to Run Migration

### Step 1: Open Supabase SQL Editor

1. Go to: https://supabase.com/dashboard
2. Select your project: `rughcgcyuoskszqzricx`
3. Click "SQL Editor" in left sidebar

### Step 2: Copy & Paste SQL File

1. Open file: `consultation-booking-complete-migration.sql`
2. Copy entire contents (Ctrl+A, Ctrl+C)
3. Paste into SQL Editor
4. Click "RUN" button

### Step 3: Wait for Completion

- Migration takes ~30-60 seconds
- Watch for success messages
- Look for ✓ checkmarks in output

### Step 4: Verify Success

**You should see:**
```
✓ consultation_type enum exists
✓ meeting_type enum exists
✓ consultation_outcome enum exists
✓ reminder_type enum exists
✓ consultation_reminders table exists
✓ consultation_history table exists
✓ system_settings table exists
✓ All 26 new columns added to consultations table
```

**Final message:**
```
================================================
✅ MIGRATION COMPLETED SUCCESSFULLY!
================================================
Enhanced Consultation Booking System is now ready.

Features enabled:
  • 24/7 booking availability (all days, any time)
  • Google Calendar integration
  • Meeting location for in-person consultations
  • Smart scheduling with conflict detection
  • Automated reminders (24h, 1h, 10min)
  • Complete audit trail

Ready for production! 🚀
================================================
```

---

## 🔍 Verification Queries

After migration, you can verify everything:

### Check Tables Created
```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_name IN ('consultation_reminders', 'consultation_history', 'system_settings');
```

**Expected:** 3 rows

### Check New Columns
```sql
SELECT column_name 
FROM information_schema.columns 
WHERE table_name = 'consultations'
  AND column_name IN (
    'job_title', 'meeting_location', 'google_calendar_event_id',
    'actual_scheduled_at', 'meeting_type', 'outcome'
  );
```

**Expected:** 6 rows (sample of new columns)

### Check System Settings
```sql
SELECT * FROM system_settings;
```

**Expected:** 5 rows with 24/7 availability settings

### Check Enums
```sql
SELECT enumlabel 
FROM pg_enum e
JOIN pg_type t ON e.enumtypid = t.oid
WHERE t.typname = 'meeting_type';
```

**Expected:** GOOGLE_MEET, PHONE, IN_PERSON

---

## 🛠️ Troubleshooting

### Issue: "Type already exists" errors

**Cause:** Running migration multiple times

**Solution:** This is safe! The migration uses `IF NOT EXISTS` and `DO $$ BEGIN ... EXCEPTION` blocks to handle existing objects gracefully. You can run it multiple times without issues.

---

### Issue: "Column already exists" errors

**Cause:** Partial migration was run before

**Solution:** Safe! The migration uses `ADD COLUMN IF NOT EXISTS`. Existing columns won't be modified.

---

### Issue: Permission denied

**Cause:** Insufficient database permissions

**Solution:**
1. Ensure you're logged in as the database owner
2. In Supabase, use the SQL Editor (it has admin permissions)
3. Don't run as `authenticated` role

---

### Issue: Foreign key constraint errors

**Cause:** Existing data conflicts with new structure

**Solution:** The migration handles this with `ON CONFLICT DO NOTHING` and safe data migration. If you see this, check your existing data for corruption.

---

## 📊 What Happens to Existing Data?

### Existing Consultations
- ✅ Remain unchanged
- ✅ Get default values for new columns
- ✅ Get history entry created automatically
- ✅ No data loss

### Default Values Applied
```sql
meeting_duration = 60 (if null)
timezone = 'Africa/Nairobi' (if null)
reschedule_count = 0 (if null)
```

### History Entries
- All existing consultations get a "CREATED" history entry
- Timestamp = original created_at date
- Notes = "Migrated from existing consultation"

---

## 🔄 Rolling Back (If Needed)

If you need to rollback:

```sql
BEGIN;

-- Drop new tables
DROP TABLE IF EXISTS consultation_reminders CASCADE;
DROP TABLE IF EXISTS consultation_history CASCADE;
DROP TABLE IF EXISTS system_settings CASCADE;

-- Drop new enums
DROP TYPE IF EXISTS consultation_type CASCADE;
DROP TYPE IF EXISTS meeting_type CASCADE;
DROP TYPE IF EXISTS consultation_outcome CASCADE;
DROP TYPE IF EXISTS reminder_type CASCADE;

-- Remove new columns (optional - data will be lost!)
ALTER TABLE consultations
  DROP COLUMN IF EXISTS job_title,
  DROP COLUMN IF EXISTS preferred_contact_method,
  DROP COLUMN IF EXISTS company_website,
  DROP COLUMN IF EXISTS country,
  DROP COLUMN IF EXISTS city,
  DROP COLUMN IF EXISTS consultation_types,
  DROP COLUMN IF EXISTS desired_outcome,
  DROP COLUMN IF EXISTS current_technology,
  DROP COLUMN IF EXISTS actual_scheduled_at,
  DROP COLUMN IF EXISTS meeting_type,
  DROP COLUMN IF EXISTS meeting_duration,
  DROP COLUMN IF EXISTS meeting_location,
  DROP COLUMN IF EXISTS timezone,
  DROP COLUMN IF EXISTS google_calendar_event_id,
  DROP COLUMN IF EXISTS google_meet_link,
  DROP COLUMN IF EXISTS meeting_notes,
  DROP COLUMN IF EXISTS key_problems,
  DROP COLUMN IF EXISTS potential_solutions,
  DROP COLUMN IF EXISTS client_concerns,
  DROP COLUMN IF EXISTS budget_discussion,
  DROP COLUMN IF EXISTS outcome,
  DROP COLUMN IF EXISTS follow_up_date,
  DROP COLUMN IF EXISTS follow_up_notes,
  DROP COLUMN IF EXISTS cancelled_at,
  DROP COLUMN IF EXISTS cancellation_reason,
  DROP COLUMN IF EXISTS reschedule_count;

COMMIT;
```

⚠️ **Warning:** Rolling back will delete all enhancement data!

---

## ✅ Post-Migration Checklist

After running the migration:

- [ ] Verify all tables created (3 tables)
- [ ] Verify all columns added (26 columns)
- [ ] Check system_settings has 5 rows
- [ ] Test booking a consultation from frontend
- [ ] Verify consultation appears in database
- [ ] Check new columns have data
- [ ] Configure Google Calendar (see GOOGLE_CALENDAR_SETUP.md)
- [ ] Set up Vercel cron job for reminders
- [ ] Update environment variables in Vercel
- [ ] Test complete booking workflow
- [ ] Deploy frontend to Vercel

---

## 📞 Support

**Migration Issues:**
- Check Supabase logs for detailed error messages
- Verify PostgreSQL version is 12+
- Ensure sufficient database permissions

**Questions:**
- Email: admin@veyratech.com
- Check: CONSULTATION_SYSTEM_README.md
- Review: DEPLOYMENT_SUMMARY.md

---

## 🎉 Success!

Once migration completes successfully, your database is ready for:

✅ 24/7 booking acceptance (any day, any time)
✅ Google Calendar integration with Meet links
✅ Smart scheduling with conflict detection
✅ Meeting location for in-person consultations
✅ Automated reminders (24h, 1h, 10min)
✅ Complete audit trail of all changes
✅ Enhanced admin management capabilities

**Your consultation booking system is now production-ready!** 🚀

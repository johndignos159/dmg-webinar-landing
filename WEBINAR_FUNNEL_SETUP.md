# GoHighLevel Webinar Funnel Setup Guide

## Overview
Complete guide for creating a customer webinar funnel in GoHighLevel (GHL) with your custom domain.

---

## Webinar Funnel Flow

```
Landing Page (Opt-in) 
    ↓
Confirmation Email + Webinar Link
    ↓
Pre-Webinar Reminders (24hr, 1hr before)
    ↓
Webinar Registration Page
    ↓
Live/Automated Webinar
    ↓
Post-Webinar Sequence (Replay + Sales Offer)
    ↓
Follow-up Sales Funnel
```

---

## Part 1: Custom Domain Setup

### Option 1: CNAME Record (Recommended)

1. Go to **GHL** → Settings → **White Label/Domains**
2. Get the **CNAME record** from GHL
3. Go to your **Domain Registrar** (GoDaddy, Namecheap, etc.)
4. Add the CNAME record to your DNS settings
5. Verify in GHL
6. All pages now use: `yourcompany.com/webinar`

### Option 2: Subdomain
- Create `webinar.yourcompany.com` pointing to GHL
- Same DNS process, cleaner URL structure

### Result
Your domain will look like:
- `yourcompany.com/webinar-landing`
- `yourcompany.com/webinar-registration`
- `yourcompany.com/thank-you`

---

## Part 2: Building Each Funnel Component

### Step 1: Create Landing Page (Opt-in)

**In GHL:**
1. Go to **Funnels** → Create new funnel
2. Add **Landing Page** step
3. Add **Form** (collect: name, email, phone)
4. Design with:
   - Webinar headline
   - Value proposition (what they'll learn)
   - Speaker info
   - Date/time
   - CTA button: "Register Now"
5. Assign to custom domain: `yourcompany.com/webinar`

**Form Fields to Collect:**
- First Name (required)
- Email (required)
- Phone (optional but recommended for reminders)

---

### Step 2: Create Automation Sequence

**Trigger:** When contact opts-in on landing page

**Email Sequence:**

| Day | Email | Subject | Purpose |
|-----|-------|---------|---------|
| 0 | Confirmation | "Welcome! Your webinar link inside" | Confirmation + Registration link |
| 0.5 | Registration Page | "Register to save your spot" | Direct to registration |
| -1 | Reminder 1 | "Webinar Tomorrow - Join us!" | 24-hour reminder |
| Day of | Reminder 2 | "Webinar starts in 1 hour!" | Final reminder |
| +1 | Replay | "Watch the recording" | Replay link + soft pitch |
| +3 | Follow-up | "[Offer] Limited time" | Sales offer |
| +7 | Follow-up | "Last chance" | Final push |

---

### Step 3: Webinar Registration Page

**Create Registration Step in Funnel:**
1. Add new funnel step after opt-in
2. Collect additional info if needed:
   - Confirm email
   - Company name (optional)
3. Display:
   - Webinar date/time
   - Speaker bio
   - Zoom/webinar link
   - Calendar add button

**Link to Webinar Platform:**
- Embed Zoom link
- Or GoToWebinar/Loom link
- Or GHL built-in webinar

---

### Step 4: Email Automation (Detailed)

**Setup in GHL:**

1. **Confirmation Email (Day 0)**
   - Subject: "Welcome! Your Webinar Link Inside"
   - Body: Thank you + registration link + date/time
   - CTA: "Register Here" button

2. **Pre-Webinar Reminder (24 hours before)**
   - Subject: "Don't Forget: Webinar Tomorrow!"
   - Body: Quick value reminder + link
   - CTA: "Join the Webinar"

3. **Last Minute Reminder (1 hour before)**
   - Subject: "Webinar starts in 1 HOUR!"
   - Body: Last call to join
   - CTA: "Join Now"

4. **Post-Webinar Thank You (+1 day)**
   - Subject: "Watch the Replay (Limited Time)"
   - Body: Thank them + share replay link
   - CTA: "Watch Replay"

5. **Sales Follow-up (+3 days)**
   - Subject: "[Special Offer] For Webinar Attendees Only"
   - Body: Present offer/next steps
   - CTA: "Get Started" or "Schedule Call"

6. **Final Follow-up (+7 days)**
   - Subject: "Last Chance: [Offer Ends Soon]"
   - Body: Urgency + value
   - CTA: "Claim Your Spot"

---

### Step 5: Post-Webinar Sales Funnel

After webinar, segment contacts:

**Hot Leads (engaged during webinar):**
- Tag: `webinar_engaged`
- Send: Direct sales call request
- Sequence: 3-day close attempt

**Warm Leads (watched replay):**
- Tag: `webinar_replay`
- Send: Value-add content
- Sequence: 7-day nurture

**Cold Leads (no engagement):**
- Tag: `webinar_cold`
- Send: Educational content
- Sequence: 14-day re-engagement

---

## Part 3: Webinar Platform Options

### Option 1: GHL Built-in Webinar
- **Pros:** Native integration, simple setup
- **Cons:** Limited features, no large audience
- **Best for:** Small webinars (<200 people)

### Option 2: Zoom
- **Pros:** Professional, integrates with GHL, familiar to users
- **Cons:** Requires separate account
- **Best for:** Most users, reliable

### Option 3: GoToWebinar
- **Pros:** Enterprise-grade, built-in reporting
- **Cons:** More expensive
- **Best for:** Large audiences, professional events

### Option 4: Loom
- **Pros:** Automated/pre-recorded, evergreen, simple
- **Cons:** No live interaction
- **Best for:** Automated funnels, training content

---

## Part 4: Meta Ads Integration Recap

### Setup Flow
1. **Meta Ads Manager** → Lead Generation campaign
2. **Meta Lead Form** collects: Name, Email, Phone
3. **GHL Integration** auto-syncs leads to contacts
4. **GHL Automation** triggers webinar sequence

### Map Meta Fields to GHL
- Meta First Name → GHL First Name
- Meta Email → GHL Email
- Meta Phone → GHL Phone
- Add tag: `meta_webinar` for tracking

### Expected Sync Time
- Meta Lead Form → GHL Contacts: 1-5 minutes
- Email sent automatically after sync

---

## Part 5: Tracking & Optimization

### Tags to Use in GHL
- `meta_webinar` - Source: Meta ads
- `webinar_registered` - Confirmed registration
- `webinar_attended` - Live attendance
- `webinar_replay` - Watched replay
- `webinar_engaged` - Interacted/asked questions
- `webinar_cold` - No engagement

### Metrics to Track
- **Opt-in Rate:** (Leads / Clicks) × 100
- **Registration Rate:** (Registered / Leads) × 100
- **Attendance Rate:** (Attended / Registered) × 100
- **Replay Rate:** (Replay views / Total registered) × 100
- **Conversion Rate:** (Sales / Attended) × 100

### Optimization Tips
- A/B test landing page headlines
- Test email send times
- Adjust reminder email quantity based on unsubscribes
- Retarget non-attendees with replay + lower-ticket offer

---

## Part 6: Checklist

### Before Launch
- [ ] Custom domain connected to GHL
- [ ] Landing page created and tested
- [ ] Meta ad lead form connected to GHL
- [ ] Email automation sequences set up
- [ ] Webinar platform selected and linked
- [ ] Calendar invites/reminders scheduled
- [ ] Post-webinar sales offer finalized
- [ ] Tags created in GHL

### During Campaign
- [ ] Monitor Meta ad performance daily
- [ ] Check GHL lead quality
- [ ] Monitor email open/click rates
- [ ] Track webinar attendance

### Post-Webinar
- [ ] Analyze metrics
- [ ] Follow up with no-shows
- [ ] Send replay to engaged leads
- [ ] Launch sales sequence for hot leads
- [ ] Archive and analyze for next webinar

---

## Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Leads not syncing from Meta | Check GHL integration is authorized; re-connect if needed |
| Emails going to spam | Authenticate domain (SPF/DKIM); warm up sender |
| Low registration rate | Improve landing page copy; test different headlines |
| Low attendance rate | Send more reminders; add urgency to emails |
| No engagement in webinar | Improve content; add interactive elements (polls, Q&A) |

---

## Next Steps

1. **Set up custom domain** in GHL
2. **Create landing page** with compelling copy
3. **Connect Meta ads** to GHL
4. **Build email sequences** in automation
5. **Select webinar platform** (Zoom recommended)
6. **Test entire funnel** with test lead
7. **Launch Meta campaign** and monitor
8. **Host webinar** and track engagement
9. **Execute post-webinar sales** sequence
10. **Analyze & optimize** for next webinar

---

**Created:** July 31, 2026  
**Purpose:** Complete webinar funnel setup in GoHighLevel with custom domain and Meta ads integration

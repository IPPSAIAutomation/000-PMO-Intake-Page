# Task Management Workspace - Deployment Checklist

## 📋 Pre-Deployment Checklist

### ✅ Step 1: Update Code Files

- [ ] **Code.gs** - Updated with new functions:
  - [ ] `getTeamMembers()`
  - [ ] `getUserEmail()`
  - [ ] `validateStatusUpdate()`
  - [ ] Updated `CONFIG.METADATA` with new columns
  - [ ] Updated `CONFIG.TEAM_MEMBERS` with your actual team

- [ ] **index.html** - Updated with:
  - [ ] New CSS styles for interactive elements
  - [ ] View switcher HTML
  - [ ] Deadline highlighting styles

- [ ] **JavaScript.html** - Completely rewritten with:
  - [ ] View filtering logic
  - [ ] Interactive dropdown/input rendering
  - [ ] Validation logic
  - [ ] Deadline urgency calculation

- [ ] **SetupHelper.gs** - Added (new file):
  - [ ] `setupTaskManagementColumns()`
  - [ ] `initializeExistingRows()`
  - [ ] `onOpen()` menu

---

### ✅ Step 2: Configure Team Members

Edit `Code.gs` line ~66:

```javascript
TEAM_MEMBERS: [
  'Unassigned',
  'john.doe@ucsd.edu',    // ← Replace with actual emails
  'jane.smith@ucsd.edu',  // ← Replace with actual emails
  'mike.johnson@ucsd.edu' // ← Replace with actual emails
],
```

**Important:**
- Use email addresses for accurate "My Active Tasks" filtering
- Keep "Unassigned" as the first option
- Add all team members who will use the system

---

### ✅ Step 3: Set Up Sheet Columns

#### Option A: Automatic Setup (Recommended)

1. Open your Google Sheet
2. Refresh the page to see the new menu: **🔧 Task Management Setup**
3. Click: **1️⃣ Add Required Columns**
4. Click: **2️⃣ Initialize Existing Rows**

#### Option B: Manual Setup

Add these columns to `DB_ADHOCS` sheet (if they don't exist):

| Column Name | Data Type | Default Value |
|-------------|-----------|---------------|
| Assignee | Text | "Unassigned" |
| Status | Text | "New" |
| Deliverable Evidence | Text | (blank) |
| Last Modified | Date/Time | (auto) |
| Modified By | Text | (auto) |

**Recommended Column Order:**
```
Assignee | Status | Deliverable Evidence | Hard Deadline | The Request | [other columns...]
```

---

### ✅ Step 4: Test the Setup

Run the validation function:

1. In Apps Script editor, select function: `validateSheetStructure`
2. Click **Run** (▶️)
3. Check the popup for results
4. All required columns should show ✅

Expected output:
```
✅ Found (9/9):
  • Timestamp
  • Email Address
  • The Request
  • Hard Deadline
  • Assignee
  • Status
  • Deliverable Evidence
  • Last Modified
  • Modified By

✅ All required columns present!
```

---

### ✅ Step 5: Deploy Web App

1. In Apps Script editor, click **Deploy** > **New deployment**
2. Click gear icon ⚙️ > Select type: **Web app**
3. Configure:
   - **Description:** "Task Management Workspace v2.0"
   - **Execute as:** Me (your email)
   - **Who has access:** Anyone with UC San Diego account
4. Click **Deploy**
5. **Copy the Web App URL** (you'll need this)
6. Click **Authorize access** if prompted
7. Review permissions and click **Allow**

**Save this URL:**
```
https://script.google.com/macros/s/[YOUR_DEPLOYMENT_ID]/exec
```

---

### ✅ Step 6: Test the Dashboard

1. Open the Web App URL in a new browser tab
2. Verify you see:
   - [ ] Header with your email
   - [ ] Tab navigation (Ad Hoc Requests / Project Requests)
   - [ ] View switcher (My Active Tasks / All Requests)
   - [ ] Data table with interactive columns

3. Test functionality:
   - [ ] Switch between tabs
   - [ ] Switch between views
   - [ ] Change assignee dropdown
   - [ ] Change status dropdown
   - [ ] Try to mark "Completed" without link (should show error)
   - [ ] Add deliverable link
   - [ ] Mark "Completed" (should work now)
   - [ ] Verify task disappears from "My Active Tasks"

---

### ✅ Step 7: Set Up Form Trigger (If Not Already Done)

1. In Apps Script editor, select function: `createFormSubmitTrigger`
2. Click **Run** (▶️)
3. Verify success message

This ensures new form submissions are automatically routed to the correct sheet.

---

## 🚀 Post-Deployment Tasks

### ✅ Step 8: Train Your Team

- [ ] Share the Web App URL with team
- [ ] Send the **QUICK_REFERENCE.md** guide
- [ ] Schedule a 5-minute demo (use the training script in TASK_MANAGEMENT_GUIDE.md)
- [ ] Create a bookmark/shortcut for easy access

**Suggested Email Template:**

```
Subject: 🚀 New Task Management Workspace - Action Required

Team,

We've upgraded our PMO Intake Dashboard to help you manage your workload better!

🔗 Dashboard URL: [paste your URL here]

Key Changes:
1. You now see only YOUR active tasks by default
2. You must provide a deliverable link to mark tasks complete
3. Red/orange deadlines = urgent attention needed

📖 Quick Start Guide: [link to QUICK_REFERENCE.md]

Please bookmark the dashboard and start using it today. Questions? Reply to this email.

Thanks!
```

---

### ✅ Step 9: Monitor Adoption

**Week 1 Checklist:**
- [ ] Check that team members are accessing the dashboard
- [ ] Verify tasks are being assigned
- [ ] Ensure statuses are being updated
- [ ] Confirm deliverable links are being provided

**Red Flags:**
- ⚠️ Many tasks still "Unassigned" after 24 hours
- ⚠️ No status updates for several days
- ⚠️ Completed tasks without deliverable links (shouldn't be possible!)

---

### ✅ Step 10: Gather Feedback

After 1 week, ask your team:

1. **Is the "My Active Tasks" view helpful?**
2. **Is the deliverable link requirement too strict?**
3. **Are the deadline alerts useful?**
4. **What features would you like to see next?**

---

## 🔧 Troubleshooting Guide

### Issue: "Access Denied" when opening dashboard

**Solution:**
1. Redeploy the web app
2. Ensure "Who has access" is set correctly
3. Verify user is signed in with correct account

---

### Issue: View switcher not showing

**Solution:**
1. Verify you're on the "Ad Hoc Requests" tab (not Projects)
2. Check browser console for JavaScript errors
3. Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

---

### Issue: Dropdowns not saving changes

**Solution:**
1. Check that `updateRow()` function exists in Code.gs
2. Verify sheet permissions (script needs edit access)
3. Check Apps Script execution logs for errors

---

### Issue: "Completed" option always disabled

**Solution:**
1. Verify "Deliverable Evidence" column exists
2. Ensure the input field has a value (paste a link)
3. Check browser console for validation errors

---

### Issue: Team members not in dropdown

**Solution:**
1. Update `CONFIG.TEAM_MEMBERS` in Code.gs
2. Save the script
3. Redeploy the web app (or create new version)
4. Hard refresh the dashboard

---

### Issue: Deadline colors not showing

**Solution:**
1. Verify "Hard Deadline" column contains valid dates
2. Check CSS is loaded (view page source)
3. Ensure dates are in a parseable format (MM/DD/YYYY)

---

## 📊 Success Metrics Dashboard (Optional)

Create a separate sheet tab called "Metrics" with these formulas:

### Total Active Tasks
```
=COUNTIF(DB_ADHOCS!Status, "<>Completed")
```

### Unassigned Tasks
```
=COUNTIF(DB_ADHOCS!Assignee, "Unassigned")
```

### Completion Rate (Last 30 Days)
```
=COUNTIFS(DB_ADHOCS!Status, "Completed", DB_ADHOCS!Timestamp, ">="&TODAY()-30) / 
 COUNTIF(DB_ADHOCS!Timestamp, ">="&TODAY()-30)
```

### Tasks Without Deliverables (Should be 0!)
```
=COUNTIFS(DB_ADHOCS!Status, "Completed", DB_ADHOCS!'Deliverable Evidence', "")
```

---

## 🎯 Rollback Plan (If Needed)

If you need to revert to the old system:

1. **Keep the old files** in a backup folder
2. **Restore Code.gs** from backup
3. **Restore index.html** from backup
4. **Restore JavaScript.html** from backup
5. **Redeploy** the web app
6. **Notify team** of the rollback

**Note:** Data in the sheet is not affected by rollback.

---

## 📞 Support Contacts

| Issue Type | Contact |
|------------|---------|
| Technical Issues | [Your IT/Dev Team] |
| Feature Requests | [Product Owner] |
| Training Questions | [Team Lead] |
| Access Issues | [Admin] |

---

## 🎉 Launch Announcement Template

```
📢 ANNOUNCEMENT: Task Management Workspace is LIVE!

We're excited to announce the launch of our upgraded PMO Intake Dashboard!

🎯 What's New:
• Personalized "My Active Tasks" view
• Interactive task assignment and status tracking
• Required deliverable links for accountability
• Visual deadline alerts (red = urgent!)

🔗 Access: [Your Web App URL]

📖 Resources:
• Quick Reference Guide: [link]
• Setup Guide: [link]
• Video Tutorial: [link if available]

💡 Pro Tip: Bookmark the dashboard for daily use!

Questions? Contact [support email]

Let's make task management easier together! 🚀
```

---

## ✅ Final Checklist

Before announcing to the team:

- [ ] All code files updated and deployed
- [ ] Team members list configured
- [ ] Sheet columns set up
- [ ] Web app deployed and tested
- [ ] Form trigger configured
- [ ] Documentation shared
- [ ] Training materials prepared
- [ ] Support plan in place
- [ ] Metrics dashboard created (optional)
- [ ] Rollback plan documented

---

**Deployment Date:** _______________  
**Deployed By:** _______________  
**Web App URL:** _______________  
**Version:** 2.0 - Task Management Workspace

---

## 🎓 Next Steps After Launch

**Week 1:**
- Monitor daily usage
- Address any technical issues immediately
- Collect quick feedback

**Week 2:**
- Review adoption metrics
- Identify power users and champions
- Address any workflow concerns

**Month 1:**
- Analyze completion rates
- Review deliverable link quality
- Plan next iteration based on feedback

**Ongoing:**
- Monthly metrics review
- Quarterly feature enhancements
- Continuous improvement based on team needs

---

**Good luck with your deployment! 🚀**

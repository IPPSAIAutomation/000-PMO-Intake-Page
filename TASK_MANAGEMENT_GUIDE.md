# Task Management Workspace - Setup Guide

## Overview

The Ad Hoc Requests dashboard has been transformed from a passive data display into an **active task management workspace** that ensures accountability and tracks deliverables.

## 🎯 Key Features

### 1. View Switcher (Reduce Cognitive Load)

When viewing the **Ad Hoc Requests** tab, users can toggle between two views:

- **👤 My Active Tasks** (Default)
  - Shows only requests assigned to the logged-in user
  - Filters out completed tasks
  - Provides instant answer to "What do I need to do?"
  
- **📋 All Requests**
  - Shows the complete team backlog and history
  - Useful for managers and team coordination

### 2. Interactive Task Management Columns

The Ad Hoc Requests table now includes these interactive columns (positioned at the left):

| Column | Type | Purpose |
|--------|------|---------|
| **Assignee** | Dropdown | Assign tasks to specific team members |
| **Status** | Dropdown | Track progress: New (Red), In Progress (Yellow), Completed (Green) |
| **Deliverable Evidence** | Text Input | Link to final output (required for completion) |
| **Hard Deadline** | Date Display | Shows urgency with color coding |
| **The Request** | Text | The actual request description |

### 3. Validation & System of Record

**The "Link" Rule:**
- Users **cannot** mark a task as "Completed" without providing a Deliverable Evidence link
- The "Completed" option is disabled in the Status dropdown until a link is entered
- If attempted, an error message appears: *"Cannot mark as Completed without Deliverable Evidence"*

**Auto-Filtering:**
- Once marked "Completed", tasks automatically disappear from "My Active Tasks" view
- Keeps the workspace clean and focused

### 4. Visual Urgency (Deadline Highlighting)

Hard Deadline dates are highlighted based on urgency:

| Timeframe | Color | Indicator |
|-----------|-------|-----------|
| **Overdue** | Red (pulsing) | ⚠️ OVERDUE |
| **Within 48 hours** | Red (pulsing) | 🔥 48h |
| **Within 1 week** | Orange | ⚡ 1 week |
| **Normal** | Default | - |

---

## 📋 Required Setup

### Step 1: Add New Columns to DB_ADHOCS Sheet

You need to add these columns to your `DB_ADHOCS` sheet if they don't already exist:

1. **Assignee** - Will store team member names
2. **Status** - Will store: "New", "In Progress", or "Completed"
3. **Deliverable Evidence** - Will store URLs/links to final outputs
4. **Last Modified** - Timestamp of last update (auto-populated)
5. **Modified By** - Email of person who made the update (auto-populated)

**Recommended Column Order:**
```
Assignee | Status | Deliverable Evidence | Hard Deadline | The Request | [other columns...]
```

### Step 2: Update Team Members List

Edit `Code.gs` and update the `TEAM_MEMBERS` array with your actual team:

```javascript
TEAM_MEMBERS: [
  'Unassigned',
  'john.doe@ucsd.edu',
  'jane.smith@ucsd.edu',
  'mike.johnson@ucsd.edu',
  // Add your team members here
],
```

**Tips:**
- Use email addresses for precise matching with the "My Active Tasks" filter
- Include "Unassigned" as the first option
- The filter matches partial strings, so "john.doe@ucsd.edu" will match even if the full email is stored

### Step 3: Initialize Existing Data (Optional)

If you have existing rows in `DB_ADHOCS`, you may want to:

1. Set default values:
   - **Assignee**: "Unassigned"
   - **Status**: "New"
   - **Deliverable Evidence**: (leave blank)

2. You can do this manually or with a script

### Step 4: Deploy the Web App

1. In Google Apps Script editor, click **Deploy** > **New deployment**
2. Select type: **Web app**
3. Set access to: **Anyone with UC San Diego account** (or your domain)
4. Click **Deploy**
5. Copy the web app URL and share with your team

---

## 🎨 User Interface Guide

### For Analysts (Individual Contributors)

**Daily Workflow:**
1. Open the dashboard (defaults to "My Active Tasks" view)
2. See your assigned tasks that aren't completed
3. Update Status as you work:
   - Start work → Change to "In Progress"
   - Finish work → Paste deliverable link → Change to "Completed"
4. Task disappears from your view once completed ✅

### For Managers

**Team Oversight:**
1. Switch to "All Requests" view to see team backlog
2. Assign unassigned tasks using the Assignee dropdown
3. Monitor deadline urgency (red/orange highlighting)
4. Track completion by checking Deliverable Evidence links

---

## 🔒 Security & Validation

### Client-Side Validation
- Prevents status change to "Completed" without deliverable link
- Disables "Completed" option until link is provided
- Shows immediate error feedback

### Server-Side Validation
- `validateStatusUpdate()` function double-checks on the backend
- Ensures data integrity even if client-side is bypassed

### Audit Trail
- **Last Modified** column tracks when changes were made
- **Modified By** column tracks who made the change
- Automatic timestamping on every update

---

## 🚀 Advanced Features

### Auto-Refresh
- Dashboard automatically refreshes every 5 minutes
- Ensures team sees latest updates without manual refresh

### Real-Time Updates
- Changes are saved immediately when dropdowns/inputs are modified
- No "Save" button needed - updates happen on blur/change events

### Responsive Design
- Works on desktop, tablet, and mobile
- Interactive elements are touch-friendly

---

## 🛠️ Customization Options

### Modify Status Options

Edit `Code.gs`:
```javascript
STATUS_OPTIONS: ['New', 'In Progress', 'On Hold', 'Completed'],
```

### Change Deadline Thresholds

Edit `JavaScript.html`, function `formatDeadline()`:
```javascript
if (diffHours <= 48) {  // Change to 24 for 1-day warning
    className = 'deadline-critical';
}
```

### Adjust Color Scheme

Edit `index.html` CSS variables:
```css
:root {
    --danger: #ea4335;   /* Red for critical deadlines */
    --warning: #fbbc04;  /* Orange for warnings */
    --secondary: #34a853; /* Green for completed */
}
```

---

## 📊 Reporting & Analytics

### Suggested Reports (Future Enhancement)

1. **Completion Rate**: Track % of tasks completed on time
2. **Workload Distribution**: See tasks per team member
3. **Average Turnaround Time**: Measure efficiency
4. **Overdue Tasks**: Alert on missed deadlines

These can be built using Google Sheets formulas or Apps Script.

---

## ❓ Troubleshooting

### Issue: "Completed" option is always disabled
**Solution:** Make sure the Deliverable Evidence input has a value (paste a link)

### Issue: My tasks don't show in "My Active Tasks"
**Solution:** 
- Verify your email matches the Assignee field
- Check that Status is not "Completed"
- Try switching to "All Requests" to verify the data exists

### Issue: Changes aren't saving
**Solution:**
- Check browser console for errors
- Verify you have edit permissions on the Google Sheet
- Ensure the script has proper authorization

### Issue: Team members not appearing in dropdown
**Solution:**
- Update the `TEAM_MEMBERS` array in `Code.gs`
- Redeploy the web app
- Hard refresh the browser (Ctrl+Shift+R)

---

## 📝 Best Practices

### For Team Success

1. **Assign Immediately**: Don't leave tasks "Unassigned" for long
2. **Update Status Promptly**: Keep status current for team visibility
3. **Always Provide Links**: Paste Google Drive links, Sheet URLs, or Dashboard links
4. **Use Descriptive Links**: Name your deliverables clearly
5. **Check Deadlines Daily**: Red/orange highlighting demands attention

### For Managers

1. **Review "All Requests" Weekly**: Ensure balanced workload
2. **Monitor Overdue Tasks**: Red pulsing = immediate action needed
3. **Verify Deliverable Links**: Click links to ensure quality
4. **Celebrate Completions**: Acknowledge team progress

---

## 🎓 Training Your Team

### 5-Minute Onboarding Script

> "Welcome to our new Task Management Workspace! Here's what changed:
> 
> 1. **Your View**: When you open the dashboard, you see only YOUR active tasks
> 2. **Three Actions**: Assign yourself, update status, paste your deliverable link
> 3. **One Rule**: You can't mark 'Completed' without a link - this is our system of record
> 4. **Color Alerts**: Red = urgent, orange = soon, normal = you're good
> 5. **Auto-Clean**: Completed tasks disappear from your view automatically
> 
> Questions? Try it now - switch to 'All Requests' to see the full backlog."

---

## 📞 Support

For technical issues or feature requests, contact your PMO administrator or the development team.

**Last Updated:** February 2026  
**Version:** 2.0 - Task Management Workspace

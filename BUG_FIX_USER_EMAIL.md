# Bug Fix: User Email Display and Filter Issue

## 🐛 Problem Identified

### Issue 1: User Email Not Displaying
**Symptom:** Top right corner shows `<?= userEmail ?>` instead of actual email address

**Root Cause:** The template scriptlet syntax `<?= userEmail ?>` was being rendered as literal text instead of being evaluated by the Google Apps Script HTML templating engine.

**Why it happened:** Google Apps Script's HTML service has specific requirements for how server-side variables are injected into client-side JavaScript. The scriptlet tags were not being processed correctly.

### Issue 2: Filter Not Working
**Symptom:** "My Active Tasks" view shows 0 records even though you have assigned tasks

**Root Cause:** Since `userEmail` variable contained the literal string `"<?= userEmail ?>"` instead of your actual email (e.g., `"ipalacio@ucsd.edu"`), the filter couldn't match any rows.

**Filter Logic:**
```javascript
const isMyTask = assignee && assignee.toLowerCase().includes(userEmail.toLowerCase());
```

When `userEmail = "<?= userEmail ?>"`, this would try to match:
- Assignee: `"ipalacio@ucsd.edu"`
- Contains: `"<?= userEmail ?>"` ❌ NO MATCH

---

## ✅ Solution Implemented

### Fix 1: Changed Email Retrieval Method

**Before:**
```javascript
function initializeDashboard() {
    // This doesn't work - template not evaluated
    userEmail = '<?= userEmail ?>';
    document.getElementById('userEmail').textContent = userEmail;
    // ... rest of code
}
```

**After:**
```javascript
function initializeDashboard() {
    // Call server-side function to get email
    google.script.run
        .withSuccessHandler(function(email) {
            userEmail = email;  // Now gets actual email: "ipalacio@ucsd.edu"
            document.getElementById('userEmail').textContent = userEmail;
            
            // Set avatar
            const firstLetter = userEmail.charAt(0).toUpperCase();
            document.getElementById('userAvatar').textContent = firstLetter;
            
            // Continue initialization
            loadTeamMembersAndData();
        })
        .withFailureHandler(function(error) {
            console.error('Error getting user email:', error);
            userEmail = 'unknown@ucsd.edu';
            document.getElementById('userEmail').textContent = 'Error loading email';
            loadTeamMembersAndData();
        })
        .getUserEmail();  // Calls server-side function in Code.gs
}
```

**Why this works:**
- Uses `google.script.run` to call the server-side `getUserEmail()` function
- Gets the actual email from `Session.getActiveUser().getEmail()`
- Properly sets the `userEmail` variable with real data
- Includes error handling in case of issues

---

### Fix 2: Refactored Initialization Flow

**Created new helper function:**
```javascript
function loadTeamMembersAndData() {
    google.script.run
        .withSuccessHandler(function(members) {
            teamMembers = members;
            loadData(currentTab);
        })
        .withFailureHandler(function(error) {
            console.error('Error loading team members:', error);
            loadData(currentTab);
        })
        .getTeamMembers();
}
```

**New initialization sequence:**
1. Get user email from server ✅
2. Display email and avatar ✅
3. Load team members ✅
4. Load data ✅
5. Apply filter (now works because `userEmail` is correct) ✅

---

### Fix 3: Added Debug Logging

Added console logs to help troubleshoot filtering:

```javascript
function filterData(data) {
    console.log('Filter Debug - Current user email:', userEmail);
    
    // ... filtering logic ...
    
    if (assignee) {
        console.log(`Row - Assignee: "${assignee}", Status: "${status}", Match: ${isMyTask}, NotCompleted: ${isNotCompleted}`);
    }
    
    console.log(`✅ Filtered ${filteredRows.length} rows from ${data.rows.length} total rows`);
}
```

**How to use:**
1. Open the dashboard
2. Press F12 to open browser console
3. Look for debug messages showing:
   - Current user email
   - Each row being checked
   - How many rows matched the filter

---

## 🧪 Testing the Fix

### Step 1: Redeploy the Web App

1. In Apps Script editor, click **Deploy** > **Manage deployments**
2. Click the pencil icon ✏️ next to your active deployment
3. Change version to **New version**
4. Click **Deploy**
5. Copy the new URL (or use the existing one if it auto-updates)

### Step 2: Test User Email Display

1. Open the dashboard in your browser
2. Check top right corner
3. Should now show: `ipalacio@ucsd.edu` (your actual email)
4. Avatar should show: `I` (first letter)

### Step 3: Test Filter

1. Make sure you're on **Ad Hoc Requests** tab
2. Make sure **My Active Tasks** view is selected
3. Open browser console (F12)
4. Look for debug messages:
   ```
   Filter Debug - Current user email: ipalacio@ucsd.edu
   Row - Assignee: "ipalacio@ucsd.edu", Status: "New", Match: true, NotCompleted: true
   ✅ Filtered 1 rows from 5 total rows
   ```
5. You should now see your assigned task(s)!

### Step 4: Verify Filtering Logic

**Test Case 1: Your Task (Should Show)**
- Assignee: `ipalacio@ucsd.edu`
- Status: `New` or `In Progress`
- Expected: ✅ Shows in "My Active Tasks"

**Test Case 2: Your Completed Task (Should Hide)**
- Assignee: `ipalacio@ucsd.edu`
- Status: `Completed`
- Expected: ❌ Hidden from "My Active Tasks"

**Test Case 3: Someone Else's Task (Should Hide)**
- Assignee: `k9thomas@UCSD.EDU`
- Status: `New`
- Expected: ❌ Hidden from "My Active Tasks"

**Test Case 4: All Requests View (Should Show All)**
- Switch to "All Requests" view
- Expected: ✅ Shows all tasks regardless of assignee

---

## 🔍 Understanding the Filter Logic

### Email Matching (Case-Insensitive, Partial Match)

```javascript
const isMyTask = assignee && assignee.toLowerCase().includes(userEmail.toLowerCase());
```

**This will match:**
- Assignee: `ipalacio@ucsd.edu` ✅
- Assignee: `IPALACIO@UCSD.EDU` ✅ (case-insensitive)
- Assignee: `ipalacio@ucsd.edu, k9thomas@UCSD.EDU` ✅ (partial match)

**This will NOT match:**
- Assignee: `k9thomas@UCSD.EDU` ❌
- Assignee: `Unassigned` ❌
- Assignee: (empty) ❌

### Status Filtering

```javascript
const isNotCompleted = status !== 'Completed';
```

**Shows tasks with status:**
- `New` ✅
- `In Progress` ✅
- `On Hold` ✅ (if you add this status)

**Hides tasks with status:**
- `Completed` ❌

### Combined Filter

```javascript
return isMyTask && isNotCompleted;
```

**Both conditions must be true:**
- Assignee matches your email **AND**
- Status is not "Completed"

---

## 📊 Expected Behavior After Fix

### Scenario 1: Fresh Login

1. Dashboard loads
2. Top right shows: `ipalacio@ucsd.edu` ✅
3. Avatar shows: `I` ✅
4. "My Active Tasks" view loads automatically ✅
5. Shows only your incomplete tasks ✅

### Scenario 2: Switching Views

**My Active Tasks:**
- Shows: Your tasks that aren't completed
- Count: e.g., "3 Records"

**All Requests:**
- Shows: All team tasks
- Count: e.g., "12 Records"

### Scenario 3: Completing a Task

1. Add deliverable link
2. Change status to "Completed"
3. Task disappears from "My Active Tasks" ✅
4. Still visible in "All Requests" ✅

---

## 🐛 Troubleshooting

### Issue: Still shows `<?= userEmail ?>`

**Solution:**
1. Make sure you saved `JavaScript.html`
2. Redeploy the web app (new version)
3. Hard refresh browser: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
4. Check browser console for errors

### Issue: Shows "Error loading email"

**Solution:**
1. Check that `getUserEmail()` function exists in `Code.gs`
2. Verify script has authorization to access user email
3. Check Apps Script execution logs for errors

### Issue: Filter still shows 0 records

**Solution:**
1. Open browser console (F12)
2. Look for debug messages
3. Verify:
   - User email is correct (not `<?= userEmail ?>`)
   - Assignee column exists in sheet
   - Status column exists in sheet
   - At least one row has your email as assignee
   - That row's status is not "Completed"

### Issue: Console shows "Missing required columns"

**Solution:**
1. Run `setupTaskManagementColumns()` in Apps Script
2. Verify `DB_ADHOCS` sheet has columns: `Assignee` and `Status`
3. Column names must match exactly (case-sensitive)

---

## 📝 Files Modified

### JavaScript.html
**Lines Changed:** 23-63, 177-210

**Changes:**
1. Changed email retrieval from template to `google.script.run` call
2. Refactored initialization flow
3. Added debug logging to filter function
4. Removed duplicate code

### No Changes Needed to:
- Code.gs (already has `getUserEmail()` function)
- index.html (already has user email display elements)

---

## ✅ Verification Checklist

After deploying, verify:

- [ ] Top right shows your actual email (not `<?= userEmail ?>`)
- [ ] Avatar shows first letter of your email
- [ ] "My Active Tasks" view shows your incomplete tasks
- [ ] "All Requests" view shows all tasks
- [ ] Switching between views works correctly
- [ ] Console shows debug messages (F12)
- [ ] Filter logic matches expected behavior
- [ ] Completed tasks don't show in "My Active Tasks"

---

## 🎯 Summary

**Problem:** Template syntax error prevented user email from being retrieved, breaking the filter.

**Solution:** Changed to use `google.script.run.getUserEmail()` to get email from server.

**Result:** User email now displays correctly, and filter works as expected.

**Next Steps:** 
1. Redeploy the web app
2. Test the filter with your assigned tasks
3. Remove debug logging once confirmed working (optional)

---

**Fixed By:** Antigravity AI  
**Date:** February 4, 2026  
**Files Modified:** JavaScript.html  
**Status:** ✅ Ready for Testing

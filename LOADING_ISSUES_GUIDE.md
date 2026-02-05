# Loading Issues - Troubleshooting Guide

## Problem: App Stuck on "Loading data..."

### Root Causes Identified

#### **1. Google Apps Script Timeout**
**Symptom**: App shows "Loading data..." indefinitely  
**Cause**: Google Apps Script calls (`getUserEmail()`, `getTeamMembers()`, `getData()`) are timing out or failing silently  
**Why it happens**:
- Script execution quota exceeded
- Sheet has too much data (slow query)
- Network connectivity issues
- Google Apps Script service disruption

#### **2. Missing Error Handling**
**Symptom**: No error message shown when scripts fail  
**Cause**: Original code didn't clear loading state on errors  
**Result**: User sees infinite spinner with no feedback

#### **3. Initialization Chain Failure**
**Symptom**: App never loads  
**Cause**: Sequential initialization chain breaks at any step:
```
getUserEmail() → getTeamMembers() → getData() → renderTable()
```
If any step fails, the chain stops and loading never completes.

---

## Fixes Implemented ✅

### **1. 30-Second Timeout Protection**
Added a safety timeout that triggers if initialization takes longer than 30 seconds:

```javascript
initTimeout = setTimeout(() => {
    console.error('Initialization timeout');
    hideLoading();
    showError('Unable to load data. Please refresh the page to try again.');
}, 30000);
```

**What this does**:
- Prevents infinite loading state
- Shows clear error message to user
- Allows user to refresh and retry

### **2. Improved Error Handling**
All Google Apps Script calls now have proper error handlers:

```javascript
.withFailureHandler(function(error) {
    clearTimeout(initTimeout);
    hideLoading();
    showError('Failed to load: ' + error.message);
})
```

**What this does**:
- Clears the timeout when error occurs
- Hides loading spinner
- Shows specific error message
- Allows graceful degradation

### **3. Graceful Degradation**
If non-critical calls fail, the app continues:

```javascript
// If getUserEmail fails, use fallback
userEmail = 'unknown@ucsd.edu';
loadTeamMembersAndData(); // Continue anyway

// If getTeamMembers fails, use empty array
teamMembers = [];
loadData(currentTab); // Continue anyway
```

**What this does**:
- App still loads even if some features fail
- User can see data even without full functionality
- Better user experience than complete failure

---

## Debugging Steps

### **Step 1: Check Browser Console**
Open Developer Tools (F12) and look for errors:

**Good signs**:
```
✅ Filtered 5 rows from 10 total rows
✅ Data loaded successfully
```

**Bad signs**:
```
❌ Error loading data: Script timeout
❌ Error getting user email: Permission denied
❌ Initialization timeout - Google Apps Script may not be responding
```

### **Step 2: Check Google Apps Script Logs**
In Apps Script Editor:
1. Go to **Executions** tab
2. Look for failed executions
3. Check error messages

**Common errors**:
- `Service invoked too many times in a short time`
- `Exceeded maximum execution time`
- `You do not have permission to call getData`

### **Step 3: Check Sheet Performance**
If `getData()` is slow:
- **Large dataset**: Sheet has 1000+ rows
- **Complex formulas**: Calculated columns slow down queries
- **Solution**: Add indexing or pagination

### **Step 4: Check Permissions**
Make sure the deployed web app has correct permissions:
- **Execute as**: Me (your account)
- **Who has access**: Anyone in organization
- **Scopes**: Must include Spreadsheet access

---

## Quick Fixes

### **Fix 1: Redeploy the Web App**
Sometimes redeploying fixes permission issues:
1. In Apps Script: **Deploy** → **Manage Deployments**
2. Click **Edit** (pencil icon)
3. Change version to **New Version**
4. Click **Deploy**
5. Copy new URL and test

### **Fix 2: Clear Browser Cache**
Old cached JavaScript can cause issues:
1. Press `Ctrl + Shift + Delete`
2. Clear cached images and files
3. Refresh the page

### **Fix 3: Check Script Quotas**
Google Apps Script has daily quotas:
- **Script runtime**: 6 min/execution (consumer), 30 min (workspace)
- **Triggers**: 90 min/day (consumer), unlimited (workspace)

If you hit quotas, wait 24 hours or upgrade to Google Workspace.

### **Fix 4: Optimize getData() Function**
If the sheet is large, optimize the backend:

```javascript
// Instead of loading all rows
const data = sheet.getDataRange().getValues();

// Load only what you need
const lastRow = sheet.getLastRow();
const data = sheet.getRange(1, 1, Math.min(lastRow, 100), sheet.getLastColumn()).getValues();
```

---

## Error Messages Explained

### **"Unable to load data. This may be due to a slow connection or script timeout."**
**Meaning**: The 30-second timeout was triggered  
**Action**: 
1. Refresh the page
2. Check your internet connection
3. Check Google Apps Script execution logs

### **"Failed to load user information"**
**Meaning**: `getUserEmail()` failed  
**Action**:
1. Check if you're logged into Google
2. Check web app permissions
3. Redeploy with correct permissions

### **"Failed to load team members"**
**Meaning**: `getTeamMembers()` failed  
**Action**:
1. Check if the function exists in Code.gs
2. Check if it returns an array
3. App will still work with limited functionality

### **"Failed to load data"**
**Meaning**: `getData()` failed  
**Action**:
1. Check if sheet tab exists (DB_ADHOCS or DB_PROJECTS)
2. Check if function has correct permissions
3. Check Apps Script execution logs

---

## Prevention Tips

### **1. Monitor Script Performance**
- Keep an eye on execution times in Apps Script
- Set up alerts for failures
- Review logs regularly

### **2. Optimize Data Loading**
- Don't load more data than needed
- Use pagination for large datasets
- Cache frequently accessed data

### **3. Test Error Scenarios**
- Test with slow network
- Test with missing permissions
- Test with empty sheets

### **4. User Communication**
- Show loading progress (not just spinner)
- Provide retry buttons
- Give clear error messages

---

## When to Contact Support

Contact your Google Workspace admin if:
- ✅ Error persists after refresh
- ✅ Error happens for all users
- ✅ Apps Script logs show permission errors
- ✅ Timeout happens consistently (not just once)

---

## Technical Details

### Initialization Flow
```
1. DOMContentLoaded event fires
   ↓
2. initializeDashboard() called
   ↓
3. Start 30s timeout timer
   ↓
4. Call getUserEmail()
   ├─ Success → Set user info → loadTeamMembersAndData()
   └─ Failure → Show error → Try to continue anyway
   ↓
5. Call getTeamMembers()
   ├─ Success → Store team list → loadData()
   └─ Failure → Show error → Continue with empty list
   ↓
6. Call getData(currentTab)
   ├─ Success → Clear timeout → Render table
   └─ Failure → Clear timeout → Show error
```

### Timeout Behavior
- **Timer starts**: When `initializeDashboard()` is called
- **Timer cleared**: When `onDataLoaded()` or any error handler runs
- **Timer triggers**: After 30 seconds if not cleared
- **Timer action**: Hide loading, show error message

---

**Last Updated**: February 4, 2026  
**Status**: Timeout protection active ✅  
**Max Wait Time**: 30 seconds

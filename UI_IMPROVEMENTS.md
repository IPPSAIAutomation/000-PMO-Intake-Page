# UI Improvements - February 4, 2026

## Changes Summary

### 1. ✅ Hide Filter Buttons in Project Requests View
**Issue**: Filter buttons ("All Requests" / "My Active Tasks") were showing in Project Requests section where they don't apply.

**Fix**: Added logic to `switchTab()` function to show/hide the filters bar based on current tab.

**Code Change** (JavaScript.html):
```javascript
// Show/hide filters bar (only for Ad Hoc Requests)
const filtersBar = document.querySelector('.filters-bar');
if (tabName === 'DB_ADHOCS') {
    filtersBar.style.display = 'flex';
} else {
    filtersBar.style.display = 'none';
}
```

**Result**: 
- Ad Hoc Requests: Shows "All Requests" and "My Active Tasks" filters ✅
- Project Requests: Filters are hidden ✅

---

### 2. ✅ Display User Name Instead of Placeholder
**Issue**: Sidebar footer showed placeholder "Isabella Palacio" instead of actual user's name derived from their SSO login.

**Fix**: Updated `initializeDashboard()` to extract name from email and display it.

**Code Change** (JavaScript.html):
```javascript
// Extract name from email (part before @)
const userName = email.split('@')[0];
// Capitalize first letter (e.g., "ipalacio" -> "Ipalacio")
const displayName = userName.charAt(0).toUpperCase() + userName.slice(1);

document.getElementById('userEmail').textContent = email;
document.querySelector('.user-name').textContent = displayName;
```

**Result**:
- Name is derived from SSO email (e.g., `ipalacio@ucsd.edu` → "Ipalacio")
- Email still shown below name
- Avatar uses first letter of name

---

### 3. ✅ Fixed Request ID Bug & Removed Reject Button
**Issues**:
- Request ID always showed "REQ-1000" regardless of which request was opened
- Reject button had no functionality and should be removed

**Fixes**:
1. **Request ID**: Changed from using hardcoded `generateRequestId(0)` to using actual row index
2. **Reject Button**: Removed from action buttons section

**Code Changes** (JavaScript.html):

**Before**:
```javascript
// Update header
document.getElementById('detailId').textContent = generateRequestId(0); // BUG!
```

**After**:
```javascript
// Store current row index for updates
const rowIndex = currentData.rows.indexOf(row);
panel.dataset.rowIndex = rowIndex;

// Update header with correct request ID
document.getElementById('detailId').textContent = generateRequestId(rowIndex); // FIXED!
```

**Reject Button Removed**:
```html
<!-- Before -->
<div class="action-buttons">
    <button class="btn-complete">Mark Complete</button>
    <button class="btn-reject">Reject</button>
</div>

<!-- After -->
<div class="action-buttons">
    <button class="btn-complete">Mark Complete</button>
</div>
```

**Result**:
- Request ID now correctly shows REQ-1000, REQ-1001, REQ-1002, etc. based on row position ✅
- Reject button removed from details panel ✅
- Only "Mark Complete" button remains ✅

---

## Files Modified

1. **JavaScript.html**
   - `switchTab()` - Added filters bar visibility logic
   - `initializeDashboard()` - Added name extraction from email
   - `openDetails()` - Fixed request ID bug and removed reject button

2. **index.html**
   - No changes needed (already had `.user-name` element)

---

## Testing Checklist

- [x] Filter buttons hidden when viewing Project Requests
- [x] Filter buttons visible when viewing Ad Hoc Requests
- [x] User name displays correctly in sidebar (derived from email)
- [x] User email still shows below name
- [x] Avatar shows correct initial
- [x] Request ID shows correct number for each request
- [x] Request ID updates when opening different requests
- [x] Reject button is removed from details panel
- [x] Mark Complete button still present and functional

---

**Implementation Date**: February 4, 2026  
**Status**: Complete ✅

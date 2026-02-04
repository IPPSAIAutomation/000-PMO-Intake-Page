# 📋 Your Form Column Mapping Reference

## Form Structure Overview

Your Google Form has **19 columns** (0-18). Here's the complete breakdown:

---

## 📊 Complete Form Column Layout

| Index | Column Name | Used In |
|-------|-------------|---------|
| 0 | Timestamp | Both (Auto) |
| 1 | Email Address | Both (Auto) |
| 2 | Which service category best fits your request? | **ROUTING KEY** |
| 3 | Project Title | Projects Only |
| 4 | Who is the primary Executive Sponsor for this request? | Projects Only |
| 5 | Problem Statement: What specific business problem or question are we trying to solve? | Projects Only |
| 6 | Strategic Alignment: How does this project contribute to the organization's success? (Select all that apply) | Projects Only |
| 7 | Impact Quantification: If successful, what is the measurable outcome of this project? | Projects Only |
| 8 | Cross-Functional Impact: Does this request span multiple departments or is it isolated to your unit? | Projects Only |
| 9 | Decisions & Actions: Once you have this data/dashboard, what specific decision will you be able to make that you cannot make today? | Projects Only |
| 10 | Target Audience: Who will be the primary end-users of this solution? | Projects Only |
| 11 | Frequency of Use: How often will this solution be utilized? | Projects Only |
| 12 | Before submitting, please confirm the following: | (Confirmation field) |
| 13 | The Request: What specific question do you need answered? | Ad Hocs Only |
| 14 | Business Justification | Ad Hocs Only |
| 15 | Date Range | Ad Hocs Only |
| 16 | Required Filters / Inclusions | Ad Hocs Only |
| 17 | Output Format Expectation | Ad Hocs Only |
| 18 | Hard Deadline | Ad Hocs Only |

---

## 🎯 Request Type Detection (Column 2)

**Column Index:** 2  
**Column Name:** "Which service category best fits your request?"

### ⚠️ IMPORTANT: Update These Values

You need to update the `CONFIG.REQUEST_TYPE` in `Code.gs` with the **exact text** from your form:

```javascript
REQUEST_TYPE: {
  COLUMN_INDEX: 2,
  ADHOC_VALUE: 'Ad Hoc',  // ← UPDATE THIS to match your form exactly
  PROJECT_VALUES: ['Project', 'Dashboard', 'Report']  // ← UPDATE THESE to match your form
}
```

**To find the exact values:**
1. Open your Google Form
2. Look at the question: "Which service category best fits your request?"
3. Copy the EXACT text of each option
4. Update the CONFIG object

---

## 📝 DB_ADHOCS Mapping

### Required Headers in DB_ADHOCS Sheet:
```
Timestamp | Email Address | The Request | Business Justification | Date Range | Required Filters / Inclusions | Output Format Expectation | Hard Deadline | Status | Last Modified | Modified By
```

### Column Mapping:
```javascript
ADHOC_MAPPING: {
  'Timestamp': 0,                           // Auto-captured
  'Email Address': 1,                       // Auto-captured
  'The Request': 13,                        // User input
  'Business Justification': 14,             // User input
  'Date Range': 15,                         // User input
  'Required Filters / Inclusions': 16,      // User input
  'Output Format Expectation': 17,          // User input
  'Hard Deadline': 18                       // User input
  // Status, Last Modified, Modified By are auto-added by the system
}
```

---

## 🎯 DB_PROJECTS Mapping

### Required Headers in DB_PROJECTS Sheet:
```
Timestamp | Email Address | Service Category | Project Title | Executive Sponsor | Problem Statement | Strategic Alignment | Impact Quantification | Cross-Functional Impact | Decisions & Actions | Target Audience | Frequency of Use | Status | Last Modified | Modified By
```

### Column Mapping:
```javascript
PROJECT_MAPPING: {
  'Timestamp': 0,                    // Auto-captured
  'Email Address': 1,                // Auto-captured
  'Service Category': 2,             // User selection (routing key)
  'Project Title': 3,                // User input
  'Executive Sponsor': 4,            // User input
  'Problem Statement': 5,            // User input
  'Strategic Alignment': 6,          // User input (multi-select)
  'Impact Quantification': 7,        // User input
  'Cross-Functional Impact': 8,      // User input
  'Decisions & Actions': 9,          // User input
  'Target Audience': 10,             // User input
  'Frequency of Use': 11             // User input
  // Status, Last Modified, Modified By are auto-added by the system
}
```

---

## 🔧 Setup Instructions

### Step 1: Create Sheet Headers

**In DB_ADHOCS tab, add these headers (row 1):**
```
Timestamp
Email Address
The Request
Business Justification
Date Range
Required Filters / Inclusions
Output Format Expectation
Hard Deadline
Status
Last Modified
Modified By
```

**In DB_PROJECTS tab, add these headers (row 1):**
```
Timestamp
Email Address
Service Category
Project Title
Executive Sponsor
Problem Statement
Strategic Alignment
Impact Quantification
Cross-Functional Impact
Decisions & Actions
Target Audience
Frequency of Use
Status
Last Modified
Modified By
```

### Step 2: Update Request Type Values

1. Open your Google Form
2. Find the question: "Which service category best fits your request?"
3. Note the EXACT text for each option
4. Open `Code.gs` in Apps Script
5. Update lines 24-26 with your exact values:

```javascript
REQUEST_TYPE: {
  COLUMN_INDEX: 2,
  ADHOC_VALUE: 'Your exact Ad Hoc text here',
  PROJECT_VALUES: ['Option 1', 'Option 2', 'Option 3']
}
```

### Step 3: Test

Run `testFormSubmit()` in Apps Script to verify the mapping works correctly.

---

## ✅ Verification Checklist

- [ ] DB_ADHOCS sheet created with 11 headers
- [ ] DB_PROJECTS sheet created with 15 headers
- [ ] Header names match exactly (case-sensitive!)
- [ ] REQUEST_TYPE values updated with exact form text
- [ ] `testFormSubmit()` runs without errors
- [ ] Test row appears in DB_ADHOCS with all fields populated
- [ ] Real form submission routes correctly

---

## 🐛 Troubleshooting

### Issue: Data not routing correctly

**Check:**
1. Column 2 value matches `ADHOC_VALUE` or one of `PROJECT_VALUES` exactly
2. No extra spaces in form option text
3. Case sensitivity (e.g., "Ad Hoc" ≠ "ad hoc")

### Issue: Some columns are empty in database

**Check:**
1. Header names in DB sheets match mapping exactly
2. Form branching - are those fields shown for that request type?
3. User actually filled in those fields

### Issue: "Cannot read property" error

**Check:**
1. Form has all 19 columns (0-18)
2. No columns were added/removed from form
3. Test with a fresh form submission

---

## 📞 Quick Reference

**Request Type Column:** 2  
**Ad Hoc Fields:** Columns 13-18  
**Project Fields:** Columns 2-11  
**Auto Fields:** Columns 0-1 (Timestamp, Email)  

**Metadata (Auto-Added):**
- Status → "New"
- Last Modified → Current timestamp
- Modified By → Submitter's email

---

## 🎯 Next Steps

1. ✅ Headers are set up correctly
2. ✅ CONFIG is updated with your exact form values
3. ⬜ Update REQUEST_TYPE with exact text from your form
4. ⬜ Run `testFormSubmit()` to verify
5. ⬜ Submit a real form to test routing
6. ⬜ Deploy the web app

---

**Last Updated:** February 4, 2026  
**Form Columns:** 19 (0-18)  
**Ad Hoc Fields:** 8  
**Project Fields:** 12

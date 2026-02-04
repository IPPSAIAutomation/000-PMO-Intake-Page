# 🚀 Quick Start Guide
## Get Your PMO Intake Pipeline Running in 15 Minutes

---

## ⏱️ Time Estimate: 15 minutes

---

## ✅ Prerequisites

- [ ] Google Sheet with a linked Google Form
- [ ] "Form Responses 1" tab exists (created automatically by form)
- [ ] Admin access to the Google Sheet
- [ ] UC San Diego Google account

---

## 📝 Step-by-Step Setup

### 1️⃣ Create Database Tabs (2 minutes)

1. Open your Google Sheet
2. Click the **+** button at the bottom to add a new sheet
3. Name it: `DB_ADHOCS`
4. Add another sheet, name it: `DB_PROJECTS`

**Add headers to DB_ADHOCS:**
```
Timestamp | Request Type | Requester Name | Requester Email | Department | Request Title | Request Description | Priority | Due Date | Additional Notes | Status | Last Modified | Modified By
```

**Add headers to DB_PROJECTS:**
```
Timestamp | Request Type | Requester Name | Requester Email | Department | Project Name | Project Description | Business Justification | Expected Outcome | Stakeholders | Budget | Timeline | Status | Last Modified | Modified By
```

---

### 2️⃣ Install the Code (3 minutes)

1. In your Google Sheet: **Extensions > Apps Script**
2. You'll see a file called `Code.gs` - delete all existing code
3. Copy the entire contents of `Code.gs` from this project
4. Paste it into the Apps Script editor
5. Click **File > New > HTML file**
   - Name: `index`
   - Paste contents of `index.html`
6. Click **File > New > HTML file**
   - Name: `JavaScript`
   - Paste contents of `JavaScript.html`
7. Click the **Save** icon (💾)

---

### 3️⃣ Configure Column Mappings (5 minutes)

1. **Submit a test form response** (use any values)
2. Go to the "Form Responses 1" tab
3. Count the columns from left to right (starting at 0):
   ```
   Column 0: Timestamp
   Column 1: Request Type
   Column 2: Your next field...
   etc.
   ```
4. In `Code.gs`, find the `CONFIG` object (lines 10-60)
5. Update the `ADHOC_MAPPING` and `PROJECT_MAPPING` with your column numbers

**Example:**
```javascript
ADHOC_MAPPING: {
  'Timestamp': 0,           // Always column 0
  'Request Type': 1,        // Always column 1
  'Requester Name': 2,      // Update if different
  'Requester Email': 3,     // Update if different
  'Request Title': 12,      // ← CHANGE THIS to match your form
  'Request Description': 14, // ← CHANGE THIS to match your form
  // ... etc
}
```

6. Click **Save** (💾)

---

### 4️⃣ Create the Trigger (2 minutes)

1. In the Apps Script editor, find the function dropdown (top toolbar)
2. Select: `createFormSubmitTrigger`
3. Click **Run** (▶️)
4. **First time only**: You'll need to authorize:
   - Click "Review Permissions"
   - Choose your UC San Diego account
   - Click "Advanced" → "Go to [Project Name] (unsafe)"
   - Click "Allow"
5. Wait for "Execution completed" message
6. You should see an alert: "Trigger created successfully!"

---

### 5️⃣ Test the Router (2 minutes)

1. In the function dropdown, select: `testFormSubmit`
2. Click **Run** (▶️)
3. Go to your `DB_ADHOCS` tab
4. You should see a new test row!
5. If you see it: ✅ Success! Delete the test row.
6. If not: ❌ Check your column mappings and try again.

---

### 6️⃣ Deploy the Dashboard (3 minutes)

1. In Apps Script, click **Deploy > New deployment**
2. Click the gear icon ⚙️ next to "Select type"
3. Choose **Web app**
4. Fill in:
   - **Description**: PMO Intake Dashboard
   - **Execute as**: Me
   - **Who has access**: Anyone within UC San Diego
5. Click **Deploy**
6. **Copy the Web app URL** (you'll need this!)
7. Click **Done**

---

### 7️⃣ Test the Dashboard (1 minute)

1. Open the Web app URL in a new browser tab
2. Sign in with your UC San Diego account
3. You should see the dashboard!
4. Click between "Ad Hoc Requests" and "Project Requests" tabs
5. If you see your test data: ✅ You're done!

---

## 🎉 You're Live!

Your PMO Intake Pipeline is now operational!

### What happens next?

1. **Form submissions** automatically route to the correct database
2. **Analysts** can view requests in the dashboard
3. **Data refreshes** every 5 minutes automatically

---

## 📌 Important URLs to Save

- **Dashboard URL**: [Paste your Web app URL here]
- **Google Sheet**: [Your sheet URL]
- **Apps Script**: Extensions > Apps Script

---

## 🔧 Common First-Time Issues

### "Script function not found: handleFormSubmit"
**Fix**: Make sure you saved the Code.gs file after pasting the code.

### "Cannot read property of undefined"
**Fix**: Your column mappings are wrong. Recount your form columns.

### "Access Denied" on dashboard
**Fix**: Make sure you deployed with "Who has access: Anyone within UC San Diego"

### Data not showing in dashboard
**Fix**: 
1. Check that sheet names are exactly: `DB_ADHOCS` and `DB_PROJECTS`
2. Make sure headers exist in both sheets
3. Submit a test form to populate data

---

## 📞 Need Help?

1. Check the full **README.md** for detailed troubleshooting
2. Review the **CONFIG_TEMPLATE.gs** for mapping examples
3. Check Apps Script logs: **Executions** tab in Apps Script editor

---

## 🎯 Next Steps

Once everything is working:

1. **Share the dashboard URL** with your team
2. **Test with real form submissions** (both Ad Hoc and Project types)
3. **Customize the CONFIG** object for your specific needs
4. **Set up email notifications** (optional - see README.md)

---

## ✨ Pro Tips

- **Bookmark the dashboard URL** for quick access
- **Pin the Google Sheet** in your browser
- **Test form changes** with `testFormSubmit()` before going live
- **Check execution logs** weekly to catch any errors early

---

**Congratulations! You've successfully deployed an enterprise-grade PMO Intake Pipeline! 🎊**

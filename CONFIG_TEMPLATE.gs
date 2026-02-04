/**
 * ========================================
 * CONFIGURATION TEMPLATE
 * ========================================
 * Use this template to quickly map your Google Form columns
 * to your database sheets.
 * 
 * HOW TO USE:
 * 1. Submit a test form response
 * 2. Open "Form Responses 1" tab
 * 3. Count columns from left to right (starting at 0)
 * 4. Fill in the indices below
 * 5. Copy the completed mappings to Code.gs
 */

// ========================================
// STEP 1: IDENTIFY YOUR FORM COLUMNS
// ========================================

/*
Example Form Responses Layout:
Column 0: Timestamp
Column 1: Request Type
Column 2: Requester Name
Column 3: Requester Email
Column 4: Department
Column 5: [Project-specific field 1]
Column 6: [Project-specific field 2]
...
Column 12: [Ad Hoc-specific field 1]
Column 13: [Ad Hoc-specific field 2]
...

YOUR FORM LAYOUT:
(Fill this in by looking at "Form Responses 1")

Column 0: ___________________
Column 1: ___________________
Column 2: ___________________
Column 3: ___________________
Column 4: ___________________
Column 5: ___________________
Column 6: ___________________
Column 7: ___________________
Column 8: ___________________
Column 9: ___________________
Column 10: ___________________
Column 11: ___________________
Column 12: ___________________
Column 13: ___________________
Column 14: ___________________
Column 15: ___________________
Column 16: ___________________
Column 17: ___________________
Column 18: ___________________
Column 19: ___________________
Column 20: ___________________
*/

// ========================================
// STEP 2: CONFIGURE REQUEST TYPE DETECTION
// ========================================

const REQUEST_TYPE_CONFIG = {
  // Which column contains the request type?
  COLUMN_INDEX: 1,  // ← UPDATE THIS
  
  // What is the EXACT text for Ad Hoc requests?
  ADHOC_VALUE: 'Ad Hoc',  // ← UPDATE THIS if different
  
  // What are the EXACT texts for Project requests?
  PROJECT_VALUES: [
    'New Project',         // ← UPDATE THESE
    'Project Enhancement',
    'Project Support'
  ]
};

// ========================================
// STEP 3: MAP AD HOC COLUMNS
// ========================================

const ADHOC_MAPPING_TEMPLATE = {
  // Format: 'DB Column Name': form_column_index
  
  // Standard fields (usually the same for all requests)
  'Timestamp': 0,
  'Request Type': 1,
  'Requester Name': 2,
  'Requester Email': 3,
  'Department': 4,
  
  // Ad Hoc-specific fields (UPDATE THESE INDICES)
  'Request Title': 12,        // ← What column is this in your form?
  'Request Description': 14,  // ← What column is this in your form?
  'Priority': 15,             // ← What column is this in your form?
  'Due Date': 16,             // ← What column is this in your form?
  'Additional Notes': 17,     // ← What column is this in your form?
  
  // Add more fields as needed:
  // 'Your Field Name': column_index,
};

// ========================================
// STEP 4: MAP PROJECT COLUMNS
// ========================================

const PROJECT_MAPPING_TEMPLATE = {
  // Format: 'DB Column Name': form_column_index
  
  // Standard fields (usually the same for all requests)
  'Timestamp': 0,
  'Request Type': 1,
  'Requester Name': 2,
  'Requester Email': 3,
  'Department': 4,
  
  // Project-specific fields (UPDATE THESE INDICES)
  'Project Name': 5,              // ← What column is this in your form?
  'Project Description': 6,       // ← What column is this in your form?
  'Business Justification': 7,    // ← What column is this in your form?
  'Expected Outcome': 8,          // ← What column is this in your form?
  'Stakeholders': 9,              // ← What column is this in your form?
  'Budget': 10,                   // ← What column is this in your form?
  'Timeline': 11,                 // ← What column is this in your form?
  
  // Add more fields as needed:
  // 'Your Field Name': column_index,
};

// ========================================
// STEP 5: VERIFY YOUR DB SHEET HEADERS
// ========================================

/*
Make sure your DB_ADHOCS sheet has these headers (in any order):
- Timestamp
- Request Type
- Requester Name
- Requester Email
- Department
- Request Title
- Request Description
- Priority
- Due Date
- Additional Notes
- Status
- Last Modified
- Modified By

Make sure your DB_PROJECTS sheet has these headers (in any order):
- Timestamp
- Request Type
- Requester Name
- Requester Email
- Department
- Project Name
- Project Description
- Business Justification
- Expected Outcome
- Stakeholders
- Budget
- Timeline
- Status
- Last Modified
- Modified By
*/

// ========================================
// STEP 6: TESTING CHECKLIST
// ========================================

/*
Before going live, test the following:

□ 1. Run createFormSubmitTrigger() in Code.gs
□ 2. Run testFormSubmit() in Code.gs
□ 3. Check that a row appears in DB_ADHOCS
□ 4. Submit a real Ad Hoc form response
□ 5. Verify it routes to DB_ADHOCS correctly
□ 6. Submit a real Project form response
□ 7. Verify it routes to DB_PROJECTS correctly
□ 8. Deploy the web app
□ 9. Open the dashboard and verify data displays
□ 10. Test tab switching between Ad Hocs and Projects

If any step fails, review the README.md troubleshooting section.
*/

// ========================================
// COMMON ISSUES & SOLUTIONS
// ========================================

/*
ISSUE: "Cannot read property 'X' of undefined"
SOLUTION: The column index is wrong. Recount your form columns.

ISSUE: Data appears in wrong columns
SOLUTION: Your mapping doesn't match your DB headers. Verify header names.

ISSUE: Some fields are empty in DB
SOLUTION: Those fields might not exist in the form response. Check form branching.

ISSUE: Trigger not firing
SOLUTION: Recreate the trigger using createFormSubmitTrigger()

ISSUE: Dashboard shows no data
SOLUTION: Check sheet names match CONFIG.SHEETS exactly (case-sensitive)
*/

// ========================================
// EXAMPLE: COMPLETE CONFIGURATION
// ========================================

/*
Here's a complete example for reference:

const CONFIG = {
  SHEETS: {
    FORM_RESPONSES: 'Form Responses 1',
    DB_ADHOCS: 'DB_ADHOCS',
    DB_PROJECTS: 'DB_PROJECTS'
  },
  
  REQUEST_TYPE: {
    COLUMN_INDEX: 1,
    ADHOC_VALUE: 'Ad Hoc Request',
    PROJECT_VALUES: ['New Project', 'Existing Project']
  },
  
  ADHOC_MAPPING: {
    'Timestamp': 0,
    'Request Type': 1,
    'Name': 2,
    'Email': 3,
    'Dept': 4,
    'Title': 8,
    'Description': 9,
    'Priority': 10
  },
  
  PROJECT_MAPPING: {
    'Timestamp': 0,
    'Request Type': 1,
    'Name': 2,
    'Email': 3,
    'Dept': 4,
    'Project Name': 5,
    'Project Desc': 6,
    'Budget': 7
  },
  
  METADATA: {
    DEFAULT_STATUS: 'New',
    STATUS_COLUMN: 'Status',
    LAST_MODIFIED_COLUMN: 'Last Modified',
    MODIFIED_BY_COLUMN: 'Modified By'
  },
  
  DATE_FORMAT: 'MM/dd/yyyy HH:mm:ss'
};
*/

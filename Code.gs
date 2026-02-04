/**
 * ========================================
 * PMO INTAKE PIPELINE - ENTERPRISE CONFIGURATION
 * ========================================
 * UC San Diego - Google Apps Script
 * Principal Architect: Enterprise-Grade Data Router & Dashboard
 */

// ========================================
// CONFIGURATION OBJECT
// ========================================
const CONFIG = {
  // Sheet Names
  SHEETS: {
    FORM_RESPONSES: 'Form Responses 1',
    DB_ADHOCS: 'DB_ADHOCS',
    DB_PROJECTS: 'DB_PROJECTS'
  },
  
  // Request Type Detection
  // The "Which service category best fits your request?" is in column 2
  // Ad Hoc requests will have a specific value (you'll need to specify the exact text)
  REQUEST_TYPE: {
    COLUMN_INDEX: 2, // "Which service category best fits your request?"
    ADHOC_VALUE: 'Decision Support & Ad-Hoc Analysis (One-time data pulls, specific numbers for urgent meetings, audit responses, or raw datasets.)', // UPDATE THIS to match your form's exact text for Ad Hoc
    PROJECT_VALUES: ['Strategic Opportunity & Business Case (Evaluating new initiatives, defining requirements for large problems, or assessing feasibility.)', 'Forecasting & Scenario Modeling (Predictive analysis, "what-if" planning, or future resource modeling.)', 'Performance Dashboards & Reporting (Creating new automated dashboards, recurring reports, or long-term tracking tools.)'] // UPDATE THESE to match your form's project options
  },
  
  // Column Mappings for AD HOC Requests
  // Format: destinationColumn: sourceIndex (0-based from Form Responses)
  ADHOC_MAPPING: {
    'Timestamp': 0,
    'Email Address': 1,
    'The Request': 13,  // "The Request: What specific question do you need answered?"
    'Business Justification': 14,
    'Date Range': 15,
    'Required Filters / Inclusions': 16,
    'Output Format Expectation': 17,
    'Hard Deadline': 18
  },
  
  // Column Mappings for PROJECT Requests
  // Format: destinationColumn: sourceIndex (0-based from Form Responses)
  PROJECT_MAPPING: {
    'Timestamp': 0,
    'Email Address': 1,
    'Service Category': 2,  // "Which service category best fits your request?"
    'Project Title': 3,
    'Executive Sponsor': 4,  // "Who is the primary Executive Sponsor for this request?"
    'Problem Statement': 5,  // "Problem Statement: What specific business problem or question are we trying to solve?"
    'Strategic Alignment': 6,  // "Strategic Alignment: How does this project contribute to the organization's success?"
    'Impact Quantification': 7,  // "Impact Quantification: If successful, what is the measurable outcome of this project?"
    'Cross-Functional Impact': 8,  // "Cross-Functional Impact: Does this request span multiple departments or is it isolated to your unit?"
    'Decisions & Actions': 9,  // "Decisions & Actions: Once you have this data/dashboard, what specific decision will you be able to make that you cannot make today?"
    'Target Audience': 10,  // "Target Audience: Who will be the primary end-users of this solution?"
    'Frequency of Use': 11  // "Frequency of Use: How often will this solution be utilized?"
  },
  
  // Metadata Configuration
  METADATA: {
    DEFAULT_STATUS: 'New',
    STATUS_COLUMN: 'Status',
    LAST_MODIFIED_COLUMN: 'Last Modified',
    MODIFIED_BY_COLUMN: 'Modified By'
  },
  
  // Date Format
  DATE_FORMAT: 'MM/dd/yyyy HH:mm:ss'
};

// ========================================
// PART 2: DATA ROUTER (onFormSubmit)
// ========================================

/**
 * Main form submission handler
 * Triggers on Google Form submission
 * @param {Object} e - Form submission event object
 */
function handleFormSubmit(e) {
  try {
    // Validate event object
    if (!e || !e.values) {
      throw new Error('Invalid form submission event');
    }
    
    const values = e.values;
    const requestType = values[CONFIG.REQUEST_TYPE.COLUMN_INDEX];
    
    // Log submission for audit trail
    Logger.log(`Processing form submission: ${requestType}`);
    
    // Determine destination and mapping
    let destinationSheet, columnMapping;
    
    if (requestType === CONFIG.REQUEST_TYPE.ADHOC_VALUE) {
      destinationSheet = getSheet(CONFIG.SHEETS.DB_ADHOCS);
      columnMapping = CONFIG.ADHOC_MAPPING;
    } else if (CONFIG.REQUEST_TYPE.PROJECT_VALUES.includes(requestType)) {
      destinationSheet = getSheet(CONFIG.SHEETS.DB_PROJECTS);
      columnMapping = CONFIG.PROJECT_MAPPING;
    } else {
      throw new Error(`Unknown request type: ${requestType}`);
    }
    
    // Build the row data
    const rowData = buildRowData(values, columnMapping, destinationSheet);
    
    // Append to destination sheet
    destinationSheet.appendRow(rowData);
    
    Logger.log(`Successfully routed ${requestType} to ${destinationSheet.getName()}`);
    
  } catch (error) {
    // Enterprise error handling
    Logger.log(`ERROR in handleFormSubmit: ${error.message}`);
    Logger.log(`Stack trace: ${error.stack}`);
    
    // Send email notification to admin (optional)
    sendErrorNotification(error);
    
    throw error; // Re-throw to ensure form submission is marked as failed
  }
}

/**
 * Build row data based on column mapping
 * @param {Array} sourceValues - Raw form response values
 * @param {Object} mapping - Column mapping configuration
 * @param {Sheet} destinationSheet - Target sheet
 * @returns {Array} Formatted row data
 */
function buildRowData(sourceValues, mapping, destinationSheet) {
  const headers = destinationSheet.getRange(1, 1, 1, destinationSheet.getLastColumn()).getValues()[0];
  const rowData = [];
  
  // Map each header to its corresponding value
  headers.forEach(header => {
    if (mapping.hasOwnProperty(header)) {
      const sourceIndex = mapping[header];
      let value = sourceValues[sourceIndex] || '';
      
      // Sanitize and format value
      value = sanitizeValue(value, header);
      rowData.push(value);
      
    } else if (header === CONFIG.METADATA.STATUS_COLUMN) {
      rowData.push(CONFIG.METADATA.DEFAULT_STATUS);
      
    } else if (header === CONFIG.METADATA.LAST_MODIFIED_COLUMN) {
      rowData.push(new Date());
      
    } else if (header === CONFIG.METADATA.MODIFIED_BY_COLUMN) {
      rowData.push(Session.getActiveUser().getEmail());
      
    } else {
      // Empty value for unmapped columns
      rowData.push('');
    }
  });
  
  return rowData;
}

/**
 * Sanitize and format values
 * @param {*} value - Raw value
 * @param {string} columnName - Column name for context
 * @returns {*} Sanitized value
 */
function sanitizeValue(value, columnName) {
  // Handle empty values
  if (value === null || value === undefined || value === '') {
    return '';
  }
  
  // Date formatting
  if (value instanceof Date) {
    return Utilities.formatDate(value, Session.getScriptTimeZone(), CONFIG.DATE_FORMAT);
  }
  
  // String trimming
  if (typeof value === 'string') {
    return value.trim();
  }
  
  return value;
}

/**
 * Get sheet by name with error handling
 * @param {string} sheetName - Name of the sheet
 * @returns {Sheet} Sheet object
 */
function getSheet(sheetName) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(sheetName);
  
  if (!sheet) {
    throw new Error(`Sheet not found: ${sheetName}`);
  }
  
  return sheet;
}

/**
 * Send error notification email
 * @param {Error} error - Error object
 */
function sendErrorNotification(error) {
  try {
    const recipient = Session.getActiveUser().getEmail();
    const subject = 'PMO Intake Form Error';
    const body = `An error occurred in the PMO Intake Form:\n\n${error.message}\n\nStack Trace:\n${error.stack}`;
    
    MailApp.sendEmail(recipient, subject, body);
  } catch (e) {
    Logger.log(`Failed to send error notification: ${e.message}`);
  }
}

// ========================================
// PART 3: WEB APP BACKEND
// ========================================

/**
 * Serve the dashboard HTML
 * @param {Object} e - doGet event object
 * @returns {HtmlOutput} HTML page
 */
function doGet(e) {
  try {
    // Security: Verify user is authenticated
    const userEmail = Session.getActiveUser().getEmail();
    
    if (!userEmail) {
      return HtmlService.createHtmlOutput('<h1>Access Denied</h1><p>Please sign in with your UC San Diego account.</p>');
    }
    
    // Log access for audit trail
    Logger.log(`Dashboard accessed by: ${userEmail}`);
    
    // Serve the dashboard
    const template = HtmlService.createTemplateFromFile('index');
    template.userEmail = userEmail;
    
    return template.evaluate()
      .setTitle('PMO Intake Dashboard')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
      
  } catch (error) {
    Logger.log(`ERROR in doGet: ${error.message}`);
    return HtmlService.createHtmlOutput(`<h1>Error</h1><p>${error.message}</p>`);
  }
}

/**
 * Get data from specified tab
 * Called by frontend via google.script.run
 * @param {string} tabName - Name of the tab (DB_ADHOCS or DB_PROJECTS)
 * @returns {Object} Data object with headers and rows
 */
function getData(tabName) {
  try {
    // Validate tab name
    if (tabName !== CONFIG.SHEETS.DB_ADHOCS && tabName !== CONFIG.SHEETS.DB_PROJECTS) {
      throw new Error(`Invalid tab name: ${tabName}`);
    }
    
    const sheet = getSheet(tabName);
    const lastRow = sheet.getLastRow();
    const lastCol = sheet.getLastColumn();
    
    // Return empty if no data
    if (lastRow < 2) {
      return {
        headers: sheet.getRange(1, 1, 1, lastCol).getValues()[0],
        rows: []
      };
    }
    
    // Get all data
    const headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
    const rows = sheet.getRange(2, 1, lastRow - 1, lastCol).getValues();
    
    // Format dates for JSON serialization
    const formattedRows = rows.map(row => {
      return row.map(cell => {
        if (cell instanceof Date) {
          return Utilities.formatDate(cell, Session.getScriptTimeZone(), CONFIG.DATE_FORMAT);
        }
        return cell;
      });
    });
    
    return {
      headers: headers,
      rows: formattedRows
    };
    
  } catch (error) {
    Logger.log(`ERROR in getData: ${error.message}`);
    throw error;
  }
}

/**
 * Update a row in the specified tab
 * @param {string} tabName - Name of the tab
 * @param {number} rowIndex - Row index (1-based, excluding header)
 * @param {Object} updates - Object with column names and new values
 * @returns {boolean} Success status
 */
function updateRow(tabName, rowIndex, updates) {
  try {
    const sheet = getSheet(tabName);
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    
    // Update each specified column
    for (const [columnName, newValue] of Object.entries(updates)) {
      const colIndex = headers.indexOf(columnName);
      if (colIndex !== -1) {
        sheet.getRange(rowIndex + 1, colIndex + 1).setValue(newValue);
      }
    }
    
    // Update metadata
    const lastModifiedCol = headers.indexOf(CONFIG.METADATA.LAST_MODIFIED_COLUMN);
    const modifiedByCol = headers.indexOf(CONFIG.METADATA.MODIFIED_BY_COLUMN);
    
    if (lastModifiedCol !== -1) {
      sheet.getRange(rowIndex + 1, lastModifiedCol + 1).setValue(new Date());
    }
    
    if (modifiedByCol !== -1) {
      sheet.getRange(rowIndex + 1, modifiedByCol + 1).setValue(Session.getActiveUser().getEmail());
    }
    
    return true;
    
  } catch (error) {
    Logger.log(`ERROR in updateRow: ${error.message}`);
    throw error;
  }
}

/**
 * Include external HTML files
 * @param {string} filename - Name of the file
 * @returns {string} File content
 */
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

// ========================================
// INSTALLATION & SETUP FUNCTIONS
// ========================================

/**
 * Create form submit trigger
 * Run this once to set up the automatic trigger
 */
function createFormSubmitTrigger() {
  try {
    // Delete existing triggers to avoid duplicates
    const triggers = ScriptApp.getProjectTriggers();
    triggers.forEach(trigger => {
      if (trigger.getHandlerFunction() === 'handleFormSubmit') {
        ScriptApp.deleteTrigger(trigger);
      }
    });
    
    // Create new trigger
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    ScriptApp.newTrigger('handleFormSubmit')
      .forSpreadsheet(ss)
      .onFormSubmit()
      .create();
    
    Logger.log('Form submit trigger created successfully');
    SpreadsheetApp.getUi().alert('Trigger created successfully!');
    
  } catch (error) {
    Logger.log(`ERROR creating trigger: ${error.message}`);
    SpreadsheetApp.getUi().alert(`Error: ${error.message}`);
  }
}

/**
 * Test the form submission handler
 * Use this to test your configuration
 */
function testFormSubmit() {
  // Create a mock event object matching your actual form structure
  const mockEvent = {
    values: [
      new Date(),                    // 0: Timestamp
      'test@ucsd.edu',              // 1: Email Address
      'Ad Hoc',                     // 2: Which service category best fits your request?
      '',                           // 3: Project Title
      '',                           // 4: Executive Sponsor
      '',                           // 5: Problem Statement
      '',                           // 6: Strategic Alignment
      '',                           // 7: Impact Quantification
      '',                           // 8: Cross-Functional Impact
      '',                           // 9: Decisions & Actions
      '',                           // 10: Target Audience
      '',                           // 11: Frequency of Use
      'Yes',                        // 12: Before submitting, please confirm
      'How many active users do we have by department?',  // 13: The Request
      'Need this data for quarterly planning meeting',    // 14: Business Justification
      'Q4 2025',                    // 15: Date Range
      'Filter by active status only',  // 16: Required Filters / Inclusions
      'Excel spreadsheet',          // 17: Output Format Expectation
      new Date(2026, 1, 15)        // 18: Hard Deadline
    ]
  };
  
  handleFormSubmit(mockEvent);
  Logger.log('Test completed - check DB_ADHOCS sheet');
}

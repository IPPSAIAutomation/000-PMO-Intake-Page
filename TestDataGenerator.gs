/**
 * ========================================
 * TEST DATA GENERATOR
 * ========================================
 * Use these functions to generate sample data for testing
 * your PMO Intake Pipeline system.
 */

/**
 * Generate multiple test Ad Hoc requests
 * Run this to populate your DB_ADHOCS sheet with sample data
 */
function generateTestAdHocRequests() {
  const testData = [
    {
      requestType: 'Ad Hoc',
      name: 'Sarah Johnson',
      email: 'sjohnson@ucsd.edu',
      department: 'Finance',
      title: 'Monthly Revenue Report',
      description: 'Need a detailed breakdown of revenue by department for Q4 2025',
      priority: 'High',
      dueDate: new Date(2026, 1, 15),
      notes: 'Required for board meeting'
    },
    {
      requestType: 'Ad Hoc',
      name: 'Michael Chen',
      email: 'mchen@ucsd.edu',
      department: 'HR',
      title: 'Employee Turnover Analysis',
      description: 'Analysis of turnover rates by department over the past year',
      priority: 'Medium',
      dueDate: new Date(2026, 1, 20),
      notes: 'Include comparison with industry benchmarks'
    },
    {
      requestType: 'Ad Hoc',
      name: 'Emily Rodriguez',
      email: 'erodriguez@ucsd.edu',
      department: 'IT',
      title: 'System Performance Metrics',
      description: 'Dashboard showing server uptime and response times',
      priority: 'Low',
      dueDate: new Date(2026, 2, 1),
      notes: 'Monthly recurring request'
    },
    {
      requestType: 'Ad Hoc',
      name: 'David Kim',
      email: 'dkim@ucsd.edu',
      department: 'Marketing',
      title: 'Campaign ROI Analysis',
      description: 'Calculate ROI for all marketing campaigns in January',
      priority: 'High',
      dueDate: new Date(2026, 1, 10),
      notes: 'Urgent - needed for budget planning'
    },
    {
      requestType: 'Ad Hoc',
      name: 'Lisa Patel',
      email: 'lpatel@ucsd.edu',
      department: 'Operations',
      title: 'Inventory Level Report',
      description: 'Current inventory levels across all warehouses',
      priority: 'Medium',
      dueDate: new Date(2026, 1, 18),
      notes: 'Include reorder recommendations'
    }
  ];
  
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('DB_ADHOCS');
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  
  testData.forEach(data => {
    const row = buildTestRow(headers, {
      'Timestamp': new Date(),
      'Request Type': data.requestType,
      'Requester Name': data.name,
      'Requester Email': data.email,
      'Department': data.department,
      'Request Title': data.title,
      'Request Description': data.description,
      'Priority': data.priority,
      'Due Date': data.dueDate,
      'Additional Notes': data.notes,
      'Status': 'New',
      'Last Modified': new Date(),
      'Modified By': Session.getActiveUser().getEmail()
    });
    
    sheet.appendRow(row);
  });
  
  Logger.log(`Added ${testData.length} test Ad Hoc requests`);
  SpreadsheetApp.getUi().alert(`Successfully added ${testData.length} test Ad Hoc requests!`);
}

/**
 * Generate multiple test Project requests
 * Run this to populate your DB_PROJECTS sheet with sample data
 */
function generateTestProjectRequests() {
  const testData = [
    {
      requestType: 'New Project',
      name: 'Jennifer Martinez',
      email: 'jmartinez@ucsd.edu',
      department: 'IT',
      projectName: 'Customer Portal Redesign',
      description: 'Modernize the customer-facing portal with improved UX',
      justification: 'Current portal has 45% bounce rate, redesign expected to reduce to 20%',
      outcome: 'Improved customer satisfaction and reduced support tickets',
      stakeholders: 'IT, Customer Service, Marketing',
      budget: '$150,000',
      timeline: '6 months'
    },
    {
      requestType: 'Project Enhancement',
      name: 'Robert Taylor',
      email: 'rtaylor@ucsd.edu',
      department: 'Finance',
      projectName: 'ERP System Upgrade',
      description: 'Upgrade existing ERP to latest version with new modules',
      justification: 'Current version reaching end of support in Q3 2026',
      outcome: 'Enhanced reporting capabilities and improved security',
      stakeholders: 'Finance, IT, Operations',
      budget: '$250,000',
      timeline: '9 months'
    },
    {
      requestType: 'New Project',
      name: 'Amanda White',
      email: 'awhite@ucsd.edu',
      department: 'HR',
      projectName: 'Employee Wellness Program',
      description: 'Comprehensive wellness program with fitness tracking and incentives',
      justification: 'Reduce healthcare costs and improve employee retention',
      outcome: '15% reduction in sick days, improved employee satisfaction',
      stakeholders: 'HR, Finance, All Departments',
      budget: '$75,000',
      timeline: '4 months'
    },
    {
      requestType: 'Project Support',
      name: 'James Anderson',
      email: 'janderson@ucsd.edu',
      department: 'Operations',
      projectName: 'Supply Chain Optimization',
      description: 'Implement AI-driven supply chain forecasting',
      justification: 'Current inventory costs 20% above industry average',
      outcome: 'Reduce inventory costs by 15%, improve delivery times',
      stakeholders: 'Operations, Finance, IT',
      budget: '$200,000',
      timeline: '12 months'
    },
    {
      requestType: 'New Project',
      name: 'Maria Garcia',
      email: 'mgarcia@ucsd.edu',
      department: 'Marketing',
      projectName: 'Marketing Automation Platform',
      description: 'Implement comprehensive marketing automation solution',
      justification: 'Manual processes consuming 40 hours/week of staff time',
      outcome: 'Increase lead conversion by 25%, reduce manual work by 70%',
      stakeholders: 'Marketing, IT, Sales',
      budget: '$100,000',
      timeline: '5 months'
    }
  ];
  
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('DB_PROJECTS');
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  
  testData.forEach(data => {
    const row = buildTestRow(headers, {
      'Timestamp': new Date(),
      'Request Type': data.requestType,
      'Requester Name': data.name,
      'Requester Email': data.email,
      'Department': data.department,
      'Project Name': data.projectName,
      'Project Description': data.description,
      'Business Justification': data.justification,
      'Expected Outcome': data.outcome,
      'Stakeholders': data.stakeholders,
      'Budget': data.budget,
      'Timeline': data.timeline,
      'Status': 'New',
      'Last Modified': new Date(),
      'Modified By': Session.getActiveUser().getEmail()
    });
    
    sheet.appendRow(row);
  });
  
  Logger.log(`Added ${testData.length} test Project requests`);
  SpreadsheetApp.getUi().alert(`Successfully added ${testData.length} test Project requests!`);
}

/**
 * Generate test data with various statuses
 * Useful for testing dashboard filtering and display
 */
function generateTestDataWithStatuses() {
  const statuses = ['New', 'In Progress', 'On Hold', 'Completed'];
  const priorities = ['High', 'Medium', 'Low'];
  
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('DB_ADHOCS');
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  
  statuses.forEach((status, index) => {
    const row = buildTestRow(headers, {
      'Timestamp': new Date(Date.now() - (index * 86400000)), // Stagger dates
      'Request Type': 'Ad Hoc',
      'Requester Name': `Test User ${index + 1}`,
      'Requester Email': `testuser${index + 1}@ucsd.edu`,
      'Department': ['IT', 'Finance', 'HR', 'Marketing'][index % 4],
      'Request Title': `Test Request - ${status}`,
      'Request Description': `This is a test request with status: ${status}`,
      'Priority': priorities[index % 3],
      'Due Date': new Date(Date.now() + ((index + 1) * 86400000 * 7)),
      'Additional Notes': `Testing ${status} status display`,
      'Status': status,
      'Last Modified': new Date(),
      'Modified By': Session.getActiveUser().getEmail()
    });
    
    sheet.appendRow(row);
  });
  
  Logger.log(`Added ${statuses.length} test requests with different statuses`);
  SpreadsheetApp.getUi().alert(`Successfully added ${statuses.length} test requests with various statuses!`);
}

/**
 * Helper function to build a row based on headers
 * @param {Array} headers - Sheet headers
 * @param {Object} data - Data object with column names as keys
 * @returns {Array} Row data
 */
function buildTestRow(headers, data) {
  return headers.map(header => data[header] || '');
}

/**
 * Clear all test data from both sheets
 * WARNING: This will delete ALL data except headers!
 */
function clearAllTestData() {
  const ui = SpreadsheetApp.getUi();
  const response = ui.alert(
    'Clear All Data',
    'This will delete ALL data from DB_ADHOCS and DB_PROJECTS (except headers). Continue?',
    ui.ButtonSet.YES_NO
  );
  
  if (response === ui.Button.YES) {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    
    // Clear DB_ADHOCS
    const adhocSheet = ss.getSheetByName('DB_ADHOCS');
    if (adhocSheet && adhocSheet.getLastRow() > 1) {
      adhocSheet.deleteRows(2, adhocSheet.getLastRow() - 1);
    }
    
    // Clear DB_PROJECTS
    const projectSheet = ss.getSheetByName('DB_PROJECTS');
    if (projectSheet && projectSheet.getLastRow() > 1) {
      projectSheet.deleteRows(2, projectSheet.getLastRow() - 1);
    }
    
    ui.alert('All test data cleared successfully!');
    Logger.log('All test data cleared');
  } else {
    ui.alert('Operation cancelled');
  }
}

/**
 * Generate a complete test dataset
 * Runs all test data generators at once
 */
function generateCompleteTestDataset() {
  generateTestAdHocRequests();
  generateTestProjectRequests();
  generateTestDataWithStatuses();
  
  SpreadsheetApp.getUi().alert('Complete test dataset generated! Check both DB sheets.');
}

/**
 * Update random requests to different statuses
 * Simulates workflow progression
 */
function simulateWorkflowProgression() {
  const statuses = ['In Progress', 'On Hold', 'Completed'];
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // Update some Ad Hoc requests
  const adhocSheet = ss.getSheetByName('DB_ADHOCS');
  updateRandomStatuses(adhocSheet, statuses, 3);
  
  // Update some Project requests
  const projectSheet = ss.getSheetByName('DB_PROJECTS');
  updateRandomStatuses(projectSheet, statuses, 2);
  
  SpreadsheetApp.getUi().alert('Workflow progression simulated! Some requests have been updated to different statuses.');
}

/**
 * Helper function to update random rows with new statuses
 */
function updateRandomStatuses(sheet, statuses, count) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return;
  
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  const statusCol = headers.indexOf('Status') + 1;
  const lastModifiedCol = headers.indexOf('Last Modified') + 1;
  const modifiedByCol = headers.indexOf('Modified By') + 1;
  
  for (let i = 0; i < count && i < lastRow - 1; i++) {
    const randomRow = Math.floor(Math.random() * (lastRow - 1)) + 2;
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    
    sheet.getRange(randomRow, statusCol).setValue(randomStatus);
    sheet.getRange(randomRow, lastModifiedCol).setValue(new Date());
    sheet.getRange(randomRow, modifiedByCol).setValue(Session.getActiveUser().getEmail());
  }
}

/**
 * Menu function - adds a custom menu to the spreadsheet
 * Run this once to add a "Test Data" menu to your sheet
 */
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('🧪 Test Data')
    .addItem('Generate Ad Hoc Requests', 'generateTestAdHocRequests')
    .addItem('Generate Project Requests', 'generateTestProjectRequests')
    .addItem('Generate Status Variations', 'generateTestDataWithStatuses')
    .addSeparator()
    .addItem('Generate Complete Dataset', 'generateCompleteTestDataset')
    .addItem('Simulate Workflow Progression', 'simulateWorkflowProgression')
    .addSeparator()
    .addItem('⚠️ Clear All Test Data', 'clearAllTestData')
    .addToUi();
}

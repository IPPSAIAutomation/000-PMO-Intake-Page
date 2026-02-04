/**
 * ========================================
 * SHEET SETUP HELPER FUNCTIONS
 * ========================================
 * Run these functions once to set up your DB_ADHOCS sheet
 * with the required columns for task management
 */

/**
 * Add missing columns to DB_ADHOCS sheet
 * Run this function from the Apps Script editor
 */
function setupTaskManagementColumns() {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('DB_ADHOCS');
    
    if (!sheet) {
      SpreadsheetApp.getUi().alert('Error: DB_ADHOCS sheet not found!');
      return;
    }
    
    // Get current headers
    const lastCol = sheet.getLastColumn();
    const headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
    
    // Define required columns
    const requiredColumns = [
      'Assignee',
      'Status',
      'Deliverable Evidence',
      'Last Modified',
      'Modified By'
    ];
    
    // Check which columns are missing
    const missingColumns = requiredColumns.filter(col => !headers.includes(col));
    
    if (missingColumns.length === 0) {
      SpreadsheetApp.getUi().alert('✅ All required columns already exist!');
      return;
    }
    
    // Add missing columns
    missingColumns.forEach(colName => {
      sheet.getRange(1, lastCol + 1).setValue(colName);
      lastCol++;
    });
    
    // Format header row
    const headerRange = sheet.getRange(1, 1, 1, sheet.getLastColumn());
    headerRange.setFontWeight('bold');
    headerRange.setBackground('#4285f4');
    headerRange.setFontColor('#ffffff');
    
    SpreadsheetApp.getUi().alert(
      `✅ Success!\n\nAdded ${missingColumns.length} column(s):\n${missingColumns.join(', ')}\n\n` +
      `Next steps:\n1. Update TEAM_MEMBERS in Code.gs\n2. Run initializeExistingRows() to set defaults`
    );
    
  } catch (error) {
    SpreadsheetApp.getUi().alert(`❌ Error: ${error.message}`);
    Logger.log(error);
  }
}

/**
 * Initialize existing rows with default values
 * Run this AFTER setupTaskManagementColumns()
 */
function initializeExistingRows() {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('DB_ADHOCS');
    
    if (!sheet) {
      SpreadsheetApp.getUi().alert('Error: DB_ADHOCS sheet not found!');
      return;
    }
    
    const lastRow = sheet.getLastRow();
    if (lastRow < 2) {
      SpreadsheetApp.getUi().alert('No data rows to initialize.');
      return;
    }
    
    // Get headers
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    
    // Find column indices
    const assigneeCol = headers.indexOf('Assignee') + 1;
    const statusCol = headers.indexOf('Status') + 1;
    const deliverableCol = headers.indexOf('Deliverable Evidence') + 1;
    const lastModifiedCol = headers.indexOf('Last Modified') + 1;
    const modifiedByCol = headers.indexOf('Modified By') + 1;
    
    if (assigneeCol === 0 || statusCol === 0) {
      SpreadsheetApp.getUi().alert('Error: Required columns not found. Run setupTaskManagementColumns() first.');
      return;
    }
    
    // Initialize each row
    let updatedCount = 0;
    for (let row = 2; row <= lastRow; row++) {
      let needsUpdate = false;
      
      // Set Assignee to "Unassigned" if empty
      if (assigneeCol > 0) {
        const assigneeValue = sheet.getRange(row, assigneeCol).getValue();
        if (!assigneeValue || assigneeValue === '') {
          sheet.getRange(row, assigneeCol).setValue('Unassigned');
          needsUpdate = true;
        }
      }
      
      // Set Status to "New" if empty
      if (statusCol > 0) {
        const statusValue = sheet.getRange(row, statusCol).getValue();
        if (!statusValue || statusValue === '') {
          sheet.getRange(row, statusCol).setValue('New');
          needsUpdate = true;
        }
      }
      
      // Leave Deliverable Evidence blank (users will fill this in)
      
      // Set Last Modified if column exists and is empty
      if (lastModifiedCol > 0) {
        const lastModifiedValue = sheet.getRange(row, lastModifiedCol).getValue();
        if (!lastModifiedValue || lastModifiedValue === '') {
          sheet.getRange(row, lastModifiedCol).setValue(new Date());
          needsUpdate = true;
        }
      }
      
      // Set Modified By if column exists and is empty
      if (modifiedByCol > 0) {
        const modifiedByValue = sheet.getRange(row, modifiedByCol).getValue();
        if (!modifiedByValue || modifiedByValue === '') {
          sheet.getRange(row, modifiedByCol).setValue('System');
          needsUpdate = true;
        }
      }
      
      if (needsUpdate) {
        updatedCount++;
      }
    }
    
    SpreadsheetApp.getUi().alert(
      `✅ Success!\n\nInitialized ${updatedCount} row(s) with default values:\n` +
      `- Assignee: "Unassigned"\n` +
      `- Status: "New"\n` +
      `- Deliverable Evidence: (blank)\n\n` +
      `Your task management workspace is ready to use!`
    );
    
  } catch (error) {
    SpreadsheetApp.getUi().alert(`❌ Error: ${error.message}`);
    Logger.log(error);
  }
}

/**
 * Create a custom menu for easy access to setup functions
 */
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('🔧 Task Management Setup')
    .addItem('1️⃣ Add Required Columns', 'setupTaskManagementColumns')
    .addItem('2️⃣ Initialize Existing Rows', 'initializeExistingRows')
    .addSeparator()
    .addItem('📊 View Dashboard', 'openDashboard')
    .addToUi();
}

/**
 * Open the web app dashboard in a new window
 */
function openDashboard() {
  const url = ScriptApp.getService().getUrl();
  const html = `
    <html>
      <body>
        <p>Opening dashboard...</p>
        <script>
          window.open('${url}', '_blank');
          google.script.host.close();
        </script>
      </body>
    </html>
  `;
  
  const htmlOutput = HtmlService.createHtmlOutput(html)
    .setWidth(300)
    .setHeight(100);
  
  SpreadsheetApp.getUi().showModalDialog(htmlOutput, 'Opening Dashboard');
}

/**
 * Validate sheet structure
 * Run this to check if everything is set up correctly
 */
function validateSheetStructure() {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('DB_ADHOCS');
    
    if (!sheet) {
      SpreadsheetApp.getUi().alert('❌ DB_ADHOCS sheet not found!');
      return;
    }
    
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    
    const requiredColumns = [
      'Timestamp',
      'Email Address',
      'The Request',
      'Hard Deadline',
      'Assignee',
      'Status',
      'Deliverable Evidence',
      'Last Modified',
      'Modified By'
    ];
    
    const missingColumns = requiredColumns.filter(col => !headers.includes(col));
    const foundColumns = requiredColumns.filter(col => headers.includes(col));
    
    let message = '📋 Sheet Structure Validation\n\n';
    message += `✅ Found (${foundColumns.length}/${requiredColumns.length}):\n`;
    message += foundColumns.map(col => `  • ${col}`).join('\n');
    
    if (missingColumns.length > 0) {
      message += `\n\n❌ Missing (${missingColumns.length}):\n`;
      message += missingColumns.map(col => `  • ${col}`).join('\n');
      message += '\n\nRun "Add Required Columns" to fix this.';
    } else {
      message += '\n\n✅ All required columns present!';
    }
    
    SpreadsheetApp.getUi().alert(message);
    
  } catch (error) {
    SpreadsheetApp.getUi().alert(`❌ Error: ${error.message}`);
    Logger.log(error);
  }
}

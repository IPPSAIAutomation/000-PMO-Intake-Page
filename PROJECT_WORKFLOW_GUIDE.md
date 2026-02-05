# Project Intake & Prioritization Workflow - Implementation Guide

## Overview
Successfully ported the React-based "Project Intake & Prioritization" workflow to vanilla JavaScript. The Project Requests tab now includes AI scoring, PMO technical review, and automated prioritization calculations.

## Key Features Implemented

### 1. **Dual-Mode Details Panel**
The `openDetails()` function now detects whether the user clicked on an Ad Hoc Request or a Project Request and renders the appropriate UI:

- **Ad Hoc Requests**: Original workflow (Owner, Business Justification, Filters, Output Format, Deliverable Evidence)
- **Project Requests**: New workflow (AI Scoring, PMO Review, Prioritization, Committee Decision)

### 2. **AI Strategic Assessment**
**Function**: `handleAiScore(rowIndex)`

- **Button**: "Have AI Score This" (indigo button with robot emoji)
- **Loading State**: Shows spinning hourglass emoji and "Analyzing..." text for 1.5 seconds
- **Mock Scores**: Generates Strategy Score (10) and Impact Score (10)
- **Justification**: Provides AI-generated text explaining the scores
- **Database Update**: Saves all AI fields to Google Sheets via `updateMultipleFields()`

**UI States**:
- **Before Scoring**: Dashed border placeholder with call-to-action
- **After Scoring**: Beautiful gradient card (indigo theme) with score cards and justification quote

### 3. **PMO Technical Review**
**Function**: `handleTechEffortChange(rowIndex, newEffort)`

- **Tech Effort Selector**: Three buttons (Level 1, 2, 3)
- **Auto-Calculation**: When tech effort changes, automatically recalculates Final Score
- **Formula**: `Final Score = (Strategy Score + Impact Score) / Tech Effort`
- **Optimistic UI**: Updates immediately, then saves to database
- **Tech Notes**: Textarea for technical constraints (saves on blur)

**Disabled State**: Entire section is grayed out and non-interactive until AI scoring is complete

### 4. **Final Prioritization Display**
- **Dark Card**: Slate-900 background with blue accent
- **Large Score**: 2rem font size, blue color (#60a5fa)
- **Formula Display**: Shows calculation in monospace font
- **Dynamic Updates**: Score updates in real-time when tech effort changes

### 5. **Committee Decision**
**Function**: `handleProjectDecision(rowIndex, decision)`

- **Approve Button**: Green theme with thumbs up emoji
- **Reject Button**: Red theme with thumbs down emoji
- **Active State**: Selected button shows solid color background
- **Inactive State**: White background with colored text and border
- **Hover Effects**: Subtle background color change on hover
- **Database Update**: Saves decision to "Status" column

**Disabled State**: Non-interactive until AI scoring is complete

## New Functions Added

### Core Rendering
1. **`renderAdHocDetails(row, headers, panel, detailsBody, rowIndex)`**
   - Renders the original Ad Hoc request details
   - Extracted from original `openDetails()` function

2. **`renderProjectDetails(row, headers, panel, detailsBody, rowIndex)`**
   - Renders the new Project workflow UI
   - Includes all AI, PMO, and decision sections

### Project Workflow Handlers
3. **`handleAiScore(rowIndex)`**
   - Simulates AI API call with 1.5s delay
   - Updates AI Scored, AI Strategy Score, AI Impact Score, AI Justification
   - Re-renders panel to show results

4. **`handleTechEffortChange(rowIndex, newEffort)`**
   - Updates Tech Effort level (1-3)
   - Calculates Final Score automatically
   - Updates both fields in database
   - Re-renders panel to show new score

5. **`handleTechNotesChange(rowIndex, newNotes)`**
   - Saves technical notes/constraints
   - Called on textarea blur event

6. **`handleProjectDecision(rowIndex, decision)`**
   - Updates Status to "Approved" or "Rejected"
   - Re-renders panel to show updated button states
   - Reloads table after 500ms to reflect change

7. **`updateMultipleFields(rowIndex, updates, callback)`**
   - Helper function to update multiple columns at once
   - Uses existing `google.script.run.updateRow()` backend
   - Updates local `currentData` cache for optimistic UI

## Required Google Sheets Columns

Your "DB_PROJECTS" sheet must have these columns:

### Basic Info
- `The Request` - Project title
- `Status` - Current status (Pending Review, Approved, Rejected)
- `Executive Sponsor` - Sponsor name
- `Problem Statement` - Problem description
- `Strategic Alignment` - Alignment category
- `Impact Quantification` - Impact description

### AI Scoring
- `AI Scored` - Boolean (TRUE/FALSE)
- `AI Strategy Score` - Number (0-10)
- `AI Impact Score` - Number (0-10)
- `AI Justification` - Text

### PMO Review
- `Tech Effort` - Number (1-3)
- `Tech Notes` - Text
- `Final Score` - Calculated number

## UI/UX Features

### Visual Design
- **Indigo Theme**: AI section uses indigo/purple gradient
- **Slate Theme**: PMO section uses slate/gray colors
- **Dark Card**: Final score uses dark background for emphasis
- **Emojis**: ✨ (AI), ⚙️ (PMO), 🧮 (Calculator), 👍👎 (Decisions)

### Progressive Disclosure
1. **Initial State**: Only basic info and AI section visible
2. **After AI Scoring**: PMO section becomes interactive
3. **After PMO Input**: Final score calculates and decision buttons activate

### Optimistic UI
- Changes appear instantly in the UI
- Database updates happen in background
- Panel re-renders to confirm saved state

### Loading States
- AI button shows spinning animation during "analysis"
- Disabled states prevent premature interactions

## Workflow Sequence

1. **User opens Project Request** → Panel shows basic info + AI section
2. **User clicks "Have AI Score This"** → 1.5s loading → Scores appear
3. **PMO section activates** → User selects Tech Effort (1-3)
4. **Final Score auto-calculates** → Displays in dark card
5. **User adds Tech Notes** (optional)
6. **User clicks Approve/Reject** → Status updates → Table refreshes

## Integration Points

### Existing Functions Used
- `openDetails(row, headers)` - Modified to route to correct renderer
- `updateField(rowIndex, fieldName, value, callback)` - For single field updates
- `closeDetails()` - Unchanged
- `escapeHtml()` - For XSS protection
- `renderStatusBadge()` - For status display

### New Backend Requirement
The `updateRow()` function in `Code.gs` must support updating multiple columns at once:

```javascript
function updateRow(sheetName, rowIndex, updates) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  
  Object.keys(updates).forEach(fieldName => {
    const colIndex = headers.indexOf(fieldName) + 1;
    if (colIndex > 0) {
      sheet.getRange(rowIndex, colIndex).setValue(updates[fieldName]);
    }
  });
  
  return { success: true };
}
```

## Testing Checklist

- [ ] Clicking Project Request row opens details panel
- [ ] Panel shows project-specific UI (not Ad Hoc UI)
- [ ] "Have AI Score This" button appears when not scored
- [ ] Button shows loading state for 1.5 seconds
- [ ] AI scores and justification appear after loading
- [ ] PMO section is disabled before AI scoring
- [ ] PMO section activates after AI scoring
- [ ] Tech Effort buttons update selection
- [ ] Final Score recalculates when Tech Effort changes
- [ ] Tech Notes save on blur
- [ ] Approve button updates status to "Approved"
- [ ] Reject button updates status to "Rejected"
- [ ] Panel re-renders after each update
- [ ] Table refreshes after decision
- [ ] Switching back to Ad Hoc tab shows original UI

## Next Steps (Optional Enhancements)

1. **Real AI Integration**: Replace mock scores with actual AI API call
2. **Table Columns**: Update Project table to show AI Assessment, Tech Effort, Score columns
3. **Filtering**: Add ability to filter projects by status
4. **Sorting**: Sort projects by Final Score (highest priority first)
5. **History**: Track decision history and who approved/rejected
6. **Validation**: Prevent approval without deliverable evidence
7. **Notifications**: Email notifications when projects are approved/rejected

---

**Implementation Date**: February 4, 2026  
**Feature**: Project Intake & Prioritization Workflow  
**Status**: Complete ✅  
**Framework**: Vanilla JavaScript (ported from React)

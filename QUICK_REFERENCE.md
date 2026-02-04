# Task Management Workspace - Quick Reference

## 🎯 Interface Overview

### View Switcher (Ad Hoc Requests Only)

```
┌─────────────────────────────────────────────────────────┐
│  [👤 My Active Tasks]  [📋 All Requests]               │
└─────────────────────────────────────────────────────────┘
```

**My Active Tasks** (Default)
- Shows: Your assigned tasks that are NOT completed
- Purpose: Answer "What do I need to do today?"

**All Requests**
- Shows: Complete team backlog and history
- Purpose: Team coordination and management

---

## 📊 Table Structure (Ad Hoc Requests)

### Column Order (Left to Right)

| # | Column | Type | User Action |
|---|--------|------|-------------|
| 1 | **Assignee** | 🔽 Dropdown | Select team member |
| 2 | **Status** | 🔽 Dropdown | Select: New / In Progress / Completed |
| 3 | **Deliverable Evidence** | ✏️ Text Input | Paste link to output |
| 4 | **Hard Deadline** | 📅 Display | Auto-highlighted by urgency |
| 5 | **The Request** | 📝 Display | Request description |
| 6+ | Other columns | 📝 Display | Additional metadata |

---

## 🎨 Visual Indicators

### Status Colors

```
┌─────────────────────────────────────────────┐
│  Status Dropdown                            │
├─────────────────────────────────────────────┤
│  🔴 New            (Red background)         │
│  🟡 In Progress    (Orange background)      │
│  🟢 Completed      (Green background)       │
└─────────────────────────────────────────────┘
```

### Deadline Urgency

```
┌─────────────────────────────────────────────┐
│  Deadline Display                           │
├─────────────────────────────────────────────┤
│  🔥 Feb 5, 48h     (RED - Pulsing)         │
│  ⚡ Feb 10, 1 week (ORANGE)                │
│  📅 Mar 1          (Normal)                 │
│  ⚠️ Jan 30, OVERDUE (RED - Pulsing)        │
└─────────────────────────────────────────────┘
```

---

## 🔒 Validation Rules

### The "Link" Rule

```
┌─────────────────────────────────────────────────────────┐
│  Deliverable Evidence: [_________________________]      │
│                                                         │
│  Status: [New ▼]  [In Progress ▼]  [Completed 🚫]     │
│                                    ↑                    │
│                                    Disabled until       │
│                                    link is provided     │
└─────────────────────────────────────────────────────────┘
```

**If you try to mark Completed without a link:**

```
┌─────────────────────────────────────────────────────────┐
│  ⚠️ Cannot mark as Completed without Deliverable       │
│     Evidence. Please provide a link to the final       │
│     output.                                             │
└─────────────────────────────────────────────────────────┘
```

---

## 🔄 Workflow Examples

### Example 1: New Task Assignment

**Initial State:**
```
Assignee: [Unassigned ▼]
Status: [New ▼]
Deliverable: [________________________]
Deadline: 🔥 Feb 5, 48h
```

**After Assignment:**
```
Assignee: [john.doe@ucsd.edu ▼]  ← Changed by manager
Status: [New ▼]
Deliverable: [________________________]
Deadline: 🔥 Feb 5, 48h
```

**Now appears in John's "My Active Tasks" view**

---

### Example 2: Completing a Task

**Step 1: Start Work**
```
Assignee: [john.doe@ucsd.edu ▼]
Status: [In Progress ▼]  ← Changed to In Progress
Deliverable: [________________________]
Deadline: ⚡ Feb 10, 1 week
```

**Step 2: Finish & Paste Link**
```
Assignee: [john.doe@ucsd.edu ▼]
Status: [In Progress ▼]
Deliverable: [https://docs.google.com/spreadsheets/...]  ← Link added
Deadline: ⚡ Feb 10, 1 week
```

**Step 3: Mark Complete**
```
Assignee: [john.doe@ucsd.edu ▼]
Status: [Completed ▼]  ← Now enabled!
Deliverable: [https://docs.google.com/spreadsheets/...]
Deadline: ⚡ Feb 10, 1 week
```

**Result: Task disappears from "My Active Tasks" view** ✅

---

## 👥 User Personas

### Analyst (Individual Contributor)

**Daily View:**
```
┌─────────────────────────────────────────────────────────┐
│  PMO Intake Dashboard                                   │
├─────────────────────────────────────────────────────────┤
│  [⚡ Ad Hoc Requests]  [🎯 Project Requests]           │
├─────────────────────────────────────────────────────────┤
│  [👤 My Active Tasks]  [📋 All Requests]               │
├─────────────────────────────────────────────────────────┤
│  My Active Tasks                          3 Records     │
├─────────────────────────────────────────────────────────┤
│  Assignee  Status      Deliverable  Deadline  Request   │
│  ─────────────────────────────────────────────────────  │
│  You       In Progress  [Link...]   🔥 Feb 5  Sales...  │
│  You       New          [_____]     ⚡ Feb 8  HR...     │
│  You       In Progress  [Link...]   📅 Feb 15 Finance.. │
└─────────────────────────────────────────────────────────┘
```

**Focus:** "What do I need to do?"

---

### Manager (Team Lead)

**Daily View:**
```
┌─────────────────────────────────────────────────────────┐
│  PMO Intake Dashboard                                   │
├─────────────────────────────────────────────────────────┤
│  [⚡ Ad Hoc Requests]  [🎯 Project Requests]           │
├─────────────────────────────────────────────────────────┤
│  [👤 My Active Tasks]  [📋 All Requests]               │
├─────────────────────────────────────────────────────────┤
│  All Requests                            12 Records     │
├─────────────────────────────────────────────────────────┤
│  Assignee     Status      Deliverable  Deadline         │
│  ──────────────────────────────────────────────────     │
│  Unassigned   New         [_____]     🔥 Feb 5  ← Assign!│
│  John Doe     In Progress [Link...]   ⚡ Feb 8          │
│  Jane Smith   Completed   [Link...]   📅 Feb 10         │
│  Unassigned   New         [_____]     🔥 Feb 6  ← Assign!│
│  Mike J.      New         [_____]     📅 Feb 20         │
└─────────────────────────────────────────────────────────┘
```

**Focus:** "Who's working on what? What needs attention?"

---

## 🎓 Keyboard Shortcuts & Tips

### Quick Actions

1. **Tab** - Move between fields in a row
2. **Enter** - Confirm dropdown selection
3. **Ctrl+Click** - Open deliverable link in new tab
4. **F5** - Manual refresh (auto-refreshes every 5 min)

### Pro Tips

✅ **DO:**
- Paste full URLs (https://...)
- Update status as you work
- Check red deadlines first
- Use descriptive file names for deliverables

❌ **DON'T:**
- Mark complete without a link (system prevents this)
- Leave tasks "Unassigned" for long
- Ignore pulsing red deadlines
- Use vague deliverable links

---

## 📱 Mobile View

The dashboard is responsive and works on mobile devices:

```
┌──────────────────────┐
│  PMO Dashboard       │
├──────────────────────┤
│  [Ad Hoc]            │
│  [Projects]          │
├──────────────────────┤
│  [My Tasks]          │
│  [All Requests]      │
├──────────────────────┤
│  My Active Tasks     │
│  3 Records           │
├──────────────────────┤
│  Assignee: You       │
│  Status: In Progress │
│  Deliverable: [...]  │
│  Deadline: 🔥 Feb 5  │
│  Request: Sales...   │
├──────────────────────┤
│  [Next task...]      │
└──────────────────────┘
```

---

## 🔔 Notifications & Alerts

### Error Messages

```
⚠️ Cannot mark as Completed without Deliverable Evidence
⚠️ Failed to update Status
⚠️ Error loading data. Please try again.
```

### Success Indicators

```
✅ Status updated successfully
✅ Assignee changed
✅ Deliverable evidence saved
```

---

## 📊 Data Flow

```
┌─────────────────┐
│  User Action    │
│  (Dropdown/     │
│   Input change) │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Validation     │
│  (Client-side)  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Save to Sheet  │
│  (Server-side)  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Update UI      │
│  (Auto-refresh  │
│   if needed)    │
└─────────────────┘
```

---

## 🎯 Success Metrics

Track these to measure adoption:

- **% of tasks with assignees** (Target: >90%)
- **% of completed tasks with links** (Target: 100%)
- **Average time in "New" status** (Target: <24 hours)
- **% of tasks completed on time** (Target: >80%)

---

## 🆘 Common Questions

**Q: Why can't I mark my task as Completed?**  
A: You need to paste a deliverable link first.

**Q: Where did my completed task go?**  
A: Switch to "All Requests" view to see it.

**Q: Can I assign a task to multiple people?**  
A: No, use the Notes field to mention collaborators.

**Q: What if the deadline changes?**  
A: Contact your manager to update the source data.

**Q: Can I filter by deadline or status?**  
A: Not yet - this is a future enhancement.

---

**Last Updated:** February 2026  
**Version:** 2.0 - Task Management Workspace

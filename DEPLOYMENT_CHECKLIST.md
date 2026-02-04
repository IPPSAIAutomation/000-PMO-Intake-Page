# 🚀 Deployment Checklist
## PMO Intake Pipeline - Pre-Launch Verification

---

## 📋 Pre-Deployment Checklist

### Phase 1: Environment Setup
- [ ] Google Sheet created and accessible
- [ ] Google Form linked to sheet
- [ ] "Form Responses 1" tab exists
- [ ] `DB_ADHOCS` tab created with headers
- [ ] `DB_PROJECTS` tab created with headers
- [ ] Apps Script project created (Extensions > Apps Script)

### Phase 2: Code Installation
- [ ] `Code.gs` copied to Apps Script
- [ ] `index.html` created in Apps Script
- [ ] `JavaScript.html` created in Apps Script
- [ ] All files saved (💾 icon clicked)
- [ ] No syntax errors showing in editor

### Phase 3: Configuration
- [ ] Test form submitted to identify column indices
- [ ] `CONFIG.REQUEST_TYPE.COLUMN_INDEX` verified
- [ ] `CONFIG.REQUEST_TYPE.ADHOC_VALUE` matches form exactly
- [ ] `CONFIG.REQUEST_TYPE.PROJECT_VALUES` matches form exactly
- [ ] `CONFIG.ADHOC_MAPPING` column indices verified
- [ ] `CONFIG.PROJECT_MAPPING` column indices verified
- [ ] `CONFIG.SHEETS` names match actual sheet names

### Phase 4: Trigger Setup
- [ ] `createFormSubmitTrigger()` function run
- [ ] Authorization completed (if first time)
- [ ] Success alert received
- [ ] Trigger visible in Triggers panel (clock icon)

### Phase 5: Testing - Data Router
- [ ] `testFormSubmit()` function run successfully
- [ ] Test row appears in `DB_ADHOCS`
- [ ] All columns populated correctly
- [ ] Status = "New"
- [ ] Last Modified has timestamp
- [ ] Modified By has email
- [ ] Test row deleted after verification

### Phase 6: Testing - Real Form Submissions
- [ ] Ad Hoc form submission tested
- [ ] Ad Hoc data appears in `DB_ADHOCS`
- [ ] All fields mapped correctly
- [ ] Project form submission tested
- [ ] Project data appears in `DB_PROJECTS`
- [ ] All fields mapped correctly

### Phase 7: Web App Deployment
- [ ] Deploy > New deployment clicked
- [ ] Type set to "Web app"
- [ ] Description added
- [ ] "Execute as" set to "Me"
- [ ] "Who has access" set to "Anyone within UC San Diego"
- [ ] Web app URL copied and saved
- [ ] Deployment completed successfully

### Phase 8: Dashboard Testing
- [ ] Web app URL opens in browser
- [ ] Login with UC San Diego account successful
- [ ] Dashboard loads without errors
- [ ] User email displays in header
- [ ] "Ad Hoc Requests" tab shows data
- [ ] "Project Requests" tab shows data
- [ ] Tab switching works smoothly
- [ ] Table displays all columns
- [ ] Status badges show correct colors
- [ ] Priority indicators show correct colors
- [ ] Dates format correctly
- [ ] Record count displays correctly

### Phase 9: Browser Compatibility
- [ ] Tested in Chrome
- [ ] Tested in Firefox
- [ ] Tested in Safari
- [ ] Tested in Edge
- [ ] Mobile responsive (if applicable)

### Phase 10: Security Verification
- [ ] Only UC San Diego users can access
- [ ] User email tracked correctly
- [ ] No unauthorized access possible
- [ ] Error messages don't expose sensitive data

---

## 🧪 Optional: Test Data Setup

If you want to populate sample data for demos:

- [ ] `TestDataGenerator.gs` copied to Apps Script
- [ ] `onOpen()` function run to create menu
- [ ] "Test Data" menu appears in sheet
- [ ] Sample Ad Hoc requests generated
- [ ] Sample Project requests generated
- [ ] Dashboard displays test data correctly

---

## 📊 Performance Verification

- [ ] Dashboard loads in < 3 seconds
- [ ] Tab switching is instant
- [ ] Table scrolls smoothly
- [ ] No console errors (F12 to check)
- [ ] Auto-refresh works (wait 5 minutes)

---

## 📝 Documentation Review

- [ ] README.md reviewed
- [ ] QUICKSTART.md reviewed
- [ ] CONFIG_TEMPLATE.gs reviewed
- [ ] PROJECT_SUMMARY.md reviewed
- [ ] Team members know where to find docs

---

## 👥 Team Preparation

- [ ] Dashboard URL shared with team
- [ ] Quick training session scheduled
- [ ] Documentation links shared
- [ ] Support contact identified
- [ ] Feedback mechanism established

---

## 🔧 Maintenance Setup

- [ ] Calendar reminder: Weekly log review
- [ ] Calendar reminder: Monthly data archive
- [ ] Calendar reminder: Quarterly config review
- [ ] Backup strategy defined
- [ ] Update process documented

---

## 🎯 Go-Live Criteria

All items below must be ✅ before going live:

### Critical
- [ ] Form submissions route correctly 100% of the time
- [ ] Dashboard displays data accurately
- [ ] Security/authentication works
- [ ] No errors in execution logs
- [ ] Team trained on basic usage

### Important
- [ ] Documentation complete and accessible
- [ ] Test data cleared (if used)
- [ ] Performance acceptable
- [ ] Mobile access verified (if needed)
- [ ] Backup/recovery plan in place

### Nice to Have
- [ ] Custom branding applied
- [ ] Email notifications configured
- [ ] Advanced features tested
- [ ] Analytics/tracking setup
- [ ] User feedback collected

---

## 🚨 Rollback Plan

If issues occur after deployment:

1. **Immediate Actions:**
   - [ ] Disable form trigger (Triggers panel)
   - [ ] Notify team via email
   - [ ] Document the issue

2. **Investigation:**
   - [ ] Check execution logs
   - [ ] Review recent changes
   - [ ] Test in isolation

3. **Resolution:**
   - [ ] Fix configuration
   - [ ] Re-test thoroughly
   - [ ] Re-enable trigger
   - [ ] Notify team of resolution

---

## 📞 Support Contacts

| Role | Name | Contact |
|------|------|---------|
| **Project Owner** | _____________ | _____________ |
| **Technical Lead** | _____________ | _____________ |
| **Google Admin** | _____________ | _____________ |
| **End User Support** | _____________ | _____________ |

---

## 📅 Deployment Timeline

| Phase | Duration | Status |
|-------|----------|--------|
| Environment Setup | 5 min | ⬜ |
| Code Installation | 3 min | ⬜ |
| Configuration | 5 min | ⬜ |
| Testing | 10 min | ⬜ |
| Deployment | 2 min | ⬜ |
| Verification | 5 min | ⬜ |
| **Total** | **30 min** | ⬜ |

---

## ✅ Final Sign-Off

- [ ] **Technical Lead:** System tested and verified
- [ ] **Project Owner:** Requirements met
- [ ] **Security:** Access controls verified
- [ ] **End Users:** Training completed

**Deployment Date:** _______________

**Deployed By:** _______________

**Sign-Off:** _______________

---

## 🎉 Post-Deployment

After successful deployment:

1. **Week 1:**
   - [ ] Monitor execution logs daily
   - [ ] Collect user feedback
   - [ ] Address any issues immediately

2. **Week 2-4:**
   - [ ] Review usage patterns
   - [ ] Optimize if needed
   - [ ] Document lessons learned

3. **Month 2+:**
   - [ ] Regular maintenance schedule
   - [ ] Plan enhancements
   - [ ] Celebrate success! 🎊

---

**Ready to Deploy? Start with Phase 1! 🚀**

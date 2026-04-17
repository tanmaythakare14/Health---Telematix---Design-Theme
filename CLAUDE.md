# Health Telematix — Care Management Platform

## Project Overview

**Client:** Health Telematix (also referred to as EnlightenMed)
**Type:** Cloud-based Care Management & Remote Patient Monitoring (RPM) Platform
**Engagement:** MindBowser Design Sprint — $10,000 fixed scope
**Timeline:** March–May 2026
**Status:** Design sprint phase — validating UX, architecture, and partnership potential

### Platform Purpose
Centralized hub connecting patients, clinicians, virtual nurses, digital health navigators, and administrators for value-based chronic disease management. Combines real-time RPM device data, EMR interoperability, guideline-based care plans, and multi-channel patient communication in a single auditable system.

**Focus Conditions:** Obesity, Hypertension, Type II Diabetes, Heart Failure, Atrial Fibrillation

---

## Design Sprint Deliverables

1. Complete UX/UI design for all five user roles with validated workflows
2. Technical architecture document (interoperability, data flow, infrastructure)
3. Clickable prototype for core care management and RPM workflows
4. Partnership evaluation (cash + equity model)

### Sprint Priorities (in order)
1. Core care management workflow (enrollment, care plan creation, team communication)
2. RN RPM data review feed (patient-by-patient data view, intervention docs, monthly reporting)
3. Patient multi-channel experience (mobile app, text messaging, NLP phone agent)
4. EMR interoperability architecture (Epic bidirectional, SMART on FHIR, HIE)
5. Population health dashboard (quality metrics, risk stratification, care gap alerts)
6. Monthly reporting engine (care management summaries, RPM auditable reports)

---

## User Roles & Access

| Role | Key Responsibilities | Platform Access |
|------|---------------------|-----------------|
| **Patients** | View care plan, communicate with care team, report symptoms, health coaching | Mobile app, iMessage/RCS/WhatsApp, NLP phone agent, web portal |
| **Clinicians (MD/DO)** | Clinical assessments, care plan creation/refinement, order management | Web dashboard, mobile app, in-app notifications |
| **Virtual Nurses (RN)** | Patient triage, enrollment, RPM data review, intervention documentation, monthly reporting | Web dashboard with RPM data feed, communication tools, documentation module |
| **Digital Health Navigators (MA)** | Patient enrollment, device setup, medication reconciliation, patient communication | Web dashboard, device management portal, communication tools |
| **Administrators** | User management, population health dashboards, quality metrics, billing oversight | Admin console, analytics dashboard, reporting module |

---

## Clinical Conditions & Care Plans

### Obesity
- **Care Plan:** Weight monitoring, nutrition counseling, activity goals, behavioral health screening, GLP-1 management
- **KPIs:** BMI tracking, weight loss %, engagement rates, medication adherence

### Hypertension
- **Care Plan:** BP monitoring (RPM), medication management, lifestyle modification, sodium intake counseling
- **KPIs:** BP control rates (<140/90), medication adherence, ER visit reduction

### Type II Diabetes
- **Care Plan:** CGM data review (Dexcom/FreeStyle Libre), A1c tracking, medication titration, foot care, eye exam reminders
- **KPIs:** A1c <7%, hypoglycemia events, time in range, medication adherence

### Heart Failure
- **Care Plan:** Daily weight monitoring, fluid intake tracking, symptom assessment, medication optimization
- **KPIs:** Readmission rates (30-day), weight variance alerts, NYHA class tracking, medication adherence

### Atrial Fibrillation
- **Care Plan:** Heart rate monitoring, anticoagulation management, symptom logging, rhythm control assessment
- **KPIs:** Stroke risk (CHA2DS2-VASc), anticoagulation compliance, ER/hospitalization rates

### Patient Data Requirements
- **Problem List:** Imported from EMRs/HIEs; auto-updated and reconcilable by clinical staff
- **Medication List:** Platform is single source of truth; medication reconciliation workflow for navigators/RNs
- **Care Plan:** Active per patient, viewable via mobile app, web, or NLP agent conversations

---

## Remote Patient Monitoring (RPM)

### Supported Devices

| Device | Data Captured | Conditions | Transmission |
|--------|--------------|------------|--------------|
| Blood Pressure Cuff | Systolic/diastolic BP, heart rate, timestamp | Hypertension, Heart Failure, AFib | Bluetooth → mobile app, cellular gateway |
| Dexcom CGM | Continuous glucose, trend data, time in range, alerts | Type II Diabetes | API (Dexcom Clarity) |
| FreeStyle Libre CGM | Glucose readings, AGP reports, trend arrows, sensor data | Type II Diabetes | API (LibreView) |
| Weight Scale | Body weight, BMI, timestamp | Obesity, Heart Failure | Bluetooth → mobile app, cellular gateway |

### RN Data Review Feed Requirements
- Display all incoming device readings with timestamps and trend indicators
- Allow RN to document interventions, care plan changes, clinical notes directly in the feed
- Flag abnormal readings based on configurable per-condition thresholds
- Track hospitalizations, ER visits, and external source data
- Save all documentation with full audit trail

### Monthly Reporting (Auto-Generated)
1. **Care Management Monthly Summary** — comprehensive monthly document with attributed provider; documents all interventions, care plan changes, hospitalizations
2. **RPM Auditable Monthly Report** — compliance-ready; documents all device readings, interventions, visits, and patient communications; must meet CMS RPM billing requirements

---

## Patient Access Channels

### Phone Call (NLP Agent)
- AI-powered voice agent for triage, symptom reporting, basic inquiries
- Relays messages to virtual nurse; RN always in the loop
- Escalation pathway to live clinical staff
- All calls recorded, transcribed, documented in patient record

### Mobile Application
- View care plan, medications, upcoming appointments
- RPM device data sync via Bluetooth
- Secure messaging with care team
- Educational content and health coaching

### Text Messaging
- Supports iMessage, Android RCS, WhatsApp
- Bidirectional; messages routed to virtual nurse and navigator
- Clinician can be pulled in as needed

### AI Transparency Requirement
**CRITICAL:** Platform must inform the patient that AI is being used BEFORE any AI-assisted encounter, across all channels. Consent and disclosure must be documented in the record.

---

## Interoperability & Data Standards

### EMR Integration
- **Epic:** Bidirectional FHIR integration — ADT feeds, CCD/CCDA, lab results, problem lists, medication lists
- **Other EMRs:** Cerner/Oracle Health, athenahealth, eClinicalWorks, Allscripts, MEDITECH, NextGen
- Bidirectional: platform pushes care plan + RPM data to EMR; pulls clinical data from EMR

### Health Information Exchange (HIE)
- Regional and national HIE networks
- Supports Carequality, CommonWell, eHealth Exchange

### CMS Interoperability Standards
- CMS-9115-F compliance
- Patient Access API (FHIR R4)
- Provider Directory API
- Payer-to-Payer Data Exchange
- Prior Authorization API readiness

### SMART on FHIR
- SMART on FHIR app launch framework for EMR workflow integration
- OAuth 2.0 authorization
- Third-party app integration via SMART on FHIR APIs
- Clinical Decision Support (CDS) Hooks support

---

## Data Repository & Population Health

### Central Data Repository
- HIPAA-compliant, encryption at rest and in transit
- Data normalization across disparate sources
- Longitudinal patient records across care settings
- Structured for future ML/analytics/research

### Population Health Dashboard (Physicians + Admins)
- Quality metrics per managed condition
- Patient panel with risk stratification
- Enrollment and engagement metrics
- RPM compliance rates and device connectivity status
- Care gap identification and alerts
- Filterable by condition, provider, care team, time period

---

## Compliance & Security

| Requirement | Details |
|-------------|---------|
| HIPAA | Full compliance — data storage, transmission, access controls |
| SOC 2 Type II | Target certification for enterprise hospital partnerships |
| AI Transparency | Patient notification + consent before all AI-assisted interactions; documented |
| Audit Trails | Complete logging for all clinical actions, data access, communications |
| RPM Billing | Monthly reports meeting CMS requirements: CPT 99453, 99454, 99457, 99458 |

---

## Billing & Reimbursement Reference

### APCM (Advanced Primary Care Management) — Available from Jan 1, 2025

| Code | Patient Profile | ~2026 Reimbursement |
|------|----------------|---------------------|
| G0556 | Any Medicare beneficiary (1+ chronic conditions) | ~$15/month |
| G0557 | 2+ chronic conditions, significant risk | ~$50/month |
| G0558 | QMB + 2+ complex chronic conditions | ~$117/month |

**Add-ons (2026):** G0568 (~$162, Initial CoCM month), G0569 (Subsequent CoCM), G0570 (BHI add-on)

**Key Rules:**
- Only ONE provider can bill APCM per patient per calendar month
- Cannot bill alongside CCM (99490, 99491, 99439), PCM (99424-99427), or TCM (99495, 99496) in same month
- CAN be billed alongside RPM in the same month
- Not a time-based code — no minimum time threshold
- Consent required once (not monthly); written or verbal, documented

**13 Required APCM Service Elements:**
1. Patient Consent
2. Initiating Visit (new patients only)
3. 24/7 Access & Continuity of Care
4. Comprehensive Care Management
5. Electronic Patient-Centered Care Plan
6. Care Transitions Coordination (follow-up within 7 days of discharge)
7. Community-Based Care Coordination
8. Enhanced Communication
9. Patient Population Management
10. Performance Measurement
11. Virtual Check-ins
12. Remote Evaluation of Pre-recorded Patient Info
13. Interprofessional Telephone/Internet/EHR Consultations

### RPM (Remote Patient Monitoring)

| CPT Code | Description | Threshold |
|----------|-------------|-----------|
| 99453 | Initial setup & patient education | Once per episode of care |
| 99445 | Device supply / data collection | 2–15 days data in 30-day period |
| 99454 | Device supply / data collection | 16+ days data in 30-day period |
| 99091 | Physician data collection & interpretation | 30+ min/month (MD/NPP only) |
| 99470 | Treatment management | 10–20 min/month; interactive communication required |
| 99457 | Treatment management | 20+ min/month; interactive communication required |
| 99458 | Treatment management (add-on) | Each additional 20 min beyond 99457 |

**Key RPM Rules:**
- Only ONE provider bills RPM per patient per 30-day period
- 99454 requires 16+ days of automatic device data transmission (not manual entry)
- 99457/99458 require interactive communication (phone/video) — async messaging alone insufficient
- 99091 requires physician/NPP time only; cannot delegate to clinical staff
- RPM CAN be billed alongside APCM in same month
- Patient must be at home (not in Medicare Part A facility)

### Co-billing APCM + RPM
- Allowed in the same calendar month for the same patient
- Documentation must clearly separate services under each program
- Do NOT double-count time between RPM and other time-based care management codes
- Different providers can bill APCM vs. RPM for the same patient

---

## Monthly Documentation Checklists

### APCM Monthly Note
- [ ] Patient name, DOB, Medicare ID
- [ ] Month/year of service + date of consent
- [ ] HCPCS code (G0556/G0557/G0558) with clinical justification
- [ ] ICD-10-CM diagnosis codes
- [ ] Description of APCM services provided this month (which of 13 elements delivered)
- [ ] Care plan review/update (log patient care plan views)
- [ ] Care transitions addressed (discharge follow-up within 7 days)
- [ ] Medication reconciliation documented
- [ ] Patient/caregiver interactions (mode, date, summary)

### RPM Monthly Note
- [ ] Patient name, DOB, Medicare ID
- [ ] Date range of monitoring period
- [ ] Device type and physiologic parameter monitored
- [ ] ICD-10-CM codes for monitored conditions
- [ ] Confirmation of days of data transmission (99454 requires 16+)
- [ ] Total time documented for 99470/99457/99458/99091
- [ ] Documentation of interactive communication with patient/caregiver (for 99457/99458)
- [ ] Summary of data reviewed and clinical assessment
- [ ] Treatment changes based on data

---

## Key Performance Indicators

### RPM KPIs
- Device adherence rate (% of patients meeting transmission threshold)
- Average days of data transmission per patient/month
- Time spent per patient/month
- Alert response time
- Billing capture rate

### APCM KPIs
- Enrollment rate (% of eligible patients enrolled)
- Consent documentation rate
- Patient retention/disenrollment rate
- % patients using asynchronous consultation/month
- % using AI agent to address concerns
- Average care plan views per patient/month

---

## Tech Stack

- **Frontend:** React (Vite), initialized April 2026
- **Platform Type:** Web dashboard + mobile app
- **Standards:** FHIR R4, SMART on FHIR, HL7, OAuth 2.0, HIPAA-compliant infrastructure

# Project Specification: Saudi Civil Construction Management Portal (BenaaOps / بنا السحابي)

## 1. Executive Summary & Objective
A specialized web application built with **Next.js (App Router)** and **Tailwind CSS** tailored for general contractors, civil site engineers, and project consultants operating in the **Kingdom of Saudi Arabia (KSA)**. The platform focuses exclusively on **Civil Site Operations**, tracking structural milestones from excavation to wet finishes, while ensuring compliance with:
* **Saudi Building Code (SBC)** (e.g., SBC 301-305 for Concrete and Structural elements)
* **KSA QA/QC Standards** (RFI / WIR approval chains, Material Inspection Requests - MIR, Third-Party Lab Cube Tests)
* **Hot Weather Concrete Pouring Controls** (Temperature logging $\le 32^\circ\text{C}$, slump logs, ice batching)
* **Bilingual Support (Arabic RTL & English LTR)** with SAR (Saudi Riyal) financial metrics and Hijri/Gregorian dual dates.

---

## 2. Tech Stack & Architecture

| Layer | Technology | Details / Libraries |
| :--- | :--- | :--- |
| **Framework** | Next.js (App Router) | React Server Components, Server Actions, TypeScript |
| **Styling** | Tailwind CSS + Lucide Icons | Responsive, Clean Industrial Aesthetic, native RTL utilities |
| **State & Tables** | TanStack Table / React Hook Form / Zod | Robust data-grid with sorting, filtering, export |
| **Charts & Metrics** | Recharts or Chart.js | Concrete volume pour trends, QA/QC pass/fail ratios |
| **Internationalization** | `next-intl` or lightweight i18n mock | English (default LTR) and Arabic (RTL `dir="rtl"`) toggle |
| **Mock Database** | In-memory dummy JSON seed | Fully populated, Saudi-specific data sets |

---

## 3. Core Modules & Feature Breakdown

### Module 1: Executive Dashboard & Site Overview
* **KPI Header Cards:**
  * Active Civil Zones (Footings, Columns, Slabs, Masonry)
  * Pending RFIs / WIRs awaiting Consultant / Baladiya sign-off
  * Total Concrete Poured this Month ($m^3$) vs. Target
  * Today's Hot Weather Pour Safety Status (Site Ambient Temp vs Batch Temp)
* **Interactive Pour Timeline & Milestones:** Visual progress tracking for structural stages (PCC, Substructure Waterproofing, Superstructure Pouring, Blockwork).
* **Weather & Pour Advisory Widget:** Real-time ambient temperature indicator alerting when concrete casting must switch to night pours ($>38^\circ\text{C}$ cutoff warning).

### Module 2: Civil Phase Tracker (WBS & Progress)
Track structural progress divided strictly across KSA standard execution phases:
1. **Substructure:**
   * Shoring & Dewatering status
   * Excavation & Leveling
   * Blinding Concrete (PCC 1:4:8) & Anti-Termite Injection
   * Foundation Steel Fixing, SRC Pouring, Bituminous Tanking/Protection Board
   * Backfilling & Plate Compactor Proctors ($95\%$ MDD checks)
2. **Superstructure:**
   * Columns Reinforcement & Shuttering
   * Suspended Slabs & Post-Tensioning (PT) Cable Conduits
   * High-Grade Ready-Mix Concrete Pouring (C35/C40/C50)
   * 14-Day Curing Water Ponding / Chemical Curing Compounds
3. **Wet Trades & External:**
   * AAC Block Masonry & Solid Concrete Block Lintels
   * Internal/External 3-Coat Plastering
   * Wet Area Waterproofing (Polyurethane / Torch-applied APP membrane)
   * External Pavements, Boundary Walls & Interlocking Pavers

### Module 3: KSA QA/QC & Inspection Engine (RFI / WIR / MIR)
* **WIR / RFI Tracker (Work Inspection Requests):**
  * Auto-generated sequence numbers (`RFI-CIV-2026-0012`)
  * Activity types: *Steel Reinforcement Before Pouring*, *Shuttering Line & Plumb*, *Post-Pour De-shuttering Inspection*, *Blockwork Alignment*.
  * Status badges: `Approved`, `Approved with Comments (Code B)`, `Rejected (Code C)`, `Pending Consultant Signature`.
* **MIR (Material Inspection Requests):**
  * Tracking Mill Test Certificates (MTC) for SABIC / Rajhi Rebar.
  * Ready-mix batch plant certificates (Yamama, Al Kifah, Saudi Readymix).
  * Bitumat waterproofing approvals.
* **Concrete Lab Test Log (ASTM / SBC):**
  * Ticket recording for Slump test ($120\text{mm} \pm 25\text{mm}$), Concrete Temperature ($\le 32^\circ\text{C}$).
  * Cube compressive strength records at 7 days ($70\%$ benchmark) and 28 days ($100\%$ design strength).

### Module 4: Concrete Pour Scheduler & Logistics (Hot Weather Protocol)
* **Pour Booking Form:**
  * Target element (e.g., *Level 2 Suspended Slab Zone B*).
  * Volume requested ($m^3$), Mix Design grade, Batching plant supplier.
  * Pour window selection: Night Shift (20:00 - 04:00) vs Early Morning (04:00 - 08:00).
  * Pump type: Static line pump vs Boom pump ($42\text{m} / 56\text{m}$).
  * Chilled water / flake ice percentage toggle.

### Module 5: Bar Bending Schedule (BBS) & Rebar Wastage Log
* Tracking diameter allocations ($\Phi 8\text{mm}, \Phi 10\text{mm}, \Phi 12\text{mm}, \Phi 16\text{mm}, \Phi 20\text{mm}, \Phi 25\text{mm}, \Phi 32\text{mm}$).
* Cut & bend tracking vs tonnage delivered to site.
* Wastage tolerance analytics ($\le 3.5\%$ target).

---

## 4. UI/UX Design System & Theme

* **Design Concept:** Professional enterprise engineering aesthetic (clean dark slate, engineering amber/safety yellow, and modern concrete neutrals).
* **Color Palette (Tailwind):**
  * Primary / Slate: `slate-900` (#0f172a) for headers and sidebars.
  * Safety Accent: `amber-500` (#f59e0b) for callouts, buttons, and civil warnings.
  * Structural Gray: `zinc-100` to `zinc-800` for surface cards and borders.
  * Status Colors: `emerald-600` (Approved/Compliant), `amber-500` (Under Inspection), `rose-600` (Rejected / Over Temp).
* **Font Family:** Inter or Plus Jakarta Sans for English, IBM Plex Sans Arabic or Cairo for Arabic.
* **Layout Structure:**
  * Collapsible Sidebar (Navigation with Civil Icons: Hardhat, Ruler, ClipboardCheck, Truck, Layers, BarChart3).
  * Top Navigation Bar (Project Selector e.g., *"Al Narjis Residential Tower - Riyadh"*, Weather Widget, Language Switcher `EN | عربي`, User Profile).
  * Actionable Data Tables with Modal Drawers for deep inspection details.

---

## 5. Realistic Saudi Dummy Data Sets (Seed Specification)

### A. Projects
1. **Riyadh Commercial Tower (KAFD Perimeter)** — High-Rise, C50 Concrete, Aramco Standard Specs.
2. **Jeddah Marina Villas (Obhur)** — Deep Dewatering, Sulfate Resisting Cement (SRC), High Salinity Protection.
3. **NEOM Logistic Hub Zone 4** — Fast-track Precast and In-situ Foundations.

### B. Sample RFIs (Work Inspection Requests)
| RFI No | Activity Description | Location | Consultant Status | Inspector Name |
| :--- | :--- | :--- | :--- | :--- |
| `RFI-CIV-1042` | Raft Foundation Top Rebar Check | Zone B - Grid 4-12 | Approved (Code A) | Eng. Fahad Al-Otaibi (Dar Al-Handasah) |
| `RFI-CIV-1043` | Basement 1 Retaining Wall Shuttering | West Elevation | Code B (Proceed with notes) | Eng. Tariq Mansoor (Khatib & Alami) |
| `RFI-CIV-1044` | Ground Floor Column Concrete Pour | Core C1 to C8 | Rejected (Rebar spacing fail) | Eng. Abdulaziz Al-Ghamdi (Zuhair Fayez) |

### C. Sample Concrete Pour Logs
* **Batch Plant:** Saudi Readymix Co. / Al Kifah Ready Mix.
* **Volume:** $340\,m^3$ (Raft section), Slump: $140\,\text{mm}$, Temp: $29.4^\circ\text{C}$ (Approved $< 32^\circ\text{C}$).
* **Cubes Cast:** 12 cubes (3 for 7-day, 6 for 28-day, 3 spare).

---

## 6. Implementation Prompt for Code Generation

Use this exact prompt when building the codebase:

> *"Build a complete, responsive Next.js (App Router) civil construction web application using Tailwind CSS and Lucide React icons. Implement a complete working prototype with mock data tailored for Saudi Arabia (SBC standards, RFIs, Concrete Pours, Lab Cube Tests, BBS, and Night Pour logs). Include a collapsible navigation sidebar, a KPI dashboard with weather safety indicators, an RFI/WIR tracking data table with search and status filters, a Concrete Pour Scheduler modal, and an English/Arabic (RTL layout toggle). Ensure all civil terminology (SRC cement, blinding PCC, curing regimes, slump/temperature tests) aligns accurately with real-world Gulf engineering standards."*
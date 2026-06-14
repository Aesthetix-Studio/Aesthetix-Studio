# Meridian — Figma Make Vibe Coding Prompt

> **Project:** Meridian Financial Intelligence Platform
> **Year:** 2025
> **Scope:** 18 core pages (from 140-screen platform)
> **Key Result:** 47% increase in enterprise conversions within 6 months
> **Disciplines:** Brand Identity · Digital Platform · Motion System

---

## ⚠️ HOW TO USE THIS PROMPT WITH FIGMA MAKE

**Figma Make (Make Designs) is a static frame generator. It does NOT support:**
- Auto-layout / responsive constraints
- Component variants or design tokens
- Interactivity, hover states, or animations
- Dark mode variable linking
- Consistent navigation across pages
- Text overflow handling

**Strategy: Generate one page at a time. Start with the design system. Always plan for manual cleanup after generation.**

### Execution Order (Critical — Do Not Skip)
1. **Generate the Design System page first** — this becomes your reference for all subsequent prompts
2. **Generate the Navigation component** as a standalone frame
3. **Generate each page individually**, referencing the design system colors/fonts in every prompt
4. **After ALL pages are generated**, manually: wrap elements in Auto-Layout, convert to Components, link to Variables, fix text overflow, and wire up prototype flows

---

## PHASE 1: Design System Foundation

### Prompt 1A — Color Palette & Typography

```
Create a design system reference page for a premium financial technology platform called Meridian.

LAYOUT: Vertical list of design tokens on a #080808 background.

COLOR PALETTE (show swatches with hex codes):
- Primary Background: #080808 (near-black)
- Card/Surface: #0E0C1A (deep indigo-black)
- Card Surface Alt: #181428 (dark purple)
- Text Primary: #F0EBE0 (warm cream)
- Text Secondary: rgba(240,235,224,0.45) (muted cream)
- Text Tertiary: rgba(240,235,224,0.2) (faint cream)
- Accent Primary: #C4A46B (antique gold)
- Accent Hover: rgba(196,164,107,0.15) (gold glow)
- Border Default: rgba(255,255,255,0.06)
- Border Hover: rgba(196,164,107,0.15)
- Success: #4ADE80
- Error: #F87171

TYPOGRAPHY SCALE:
- Display Heading: "Instrument Serif", 64px, -0.03em tracking, #F0EBE0
- Section Heading: "Instrument Serif", 40px, -0.02em, #F0EBE0
- Card Heading: "Instrument Serif", 32px, -0.025em, #F0EBE0
- Body Large: "Inter", 17px, weight 300, rgba(240,235,224,0.5), line-height 1.7
- Body Regular: "Inter", 14px, weight 400, rgba(240,235,224,0.45)
- Body Small: "Inter", 13px, weight 400, rgba(240,235,224,0.42)
- Label/Tag: "Inter", 9px, weight 400, 0.14em uppercase, rgba(240,235,224,0.32)
- Overline: "Inter", 10px, weight 500, 0.18em uppercase, #C4A46B
- Button/CTA: "Inter", 11px, weight 500, 0.1em uppercase, #C4A46B

SPACING SYSTEM: 4px base unit. Use 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96px.
GRID: 12-column grid, 24px gutters, max-width 1280px centered.
CORNER RADIUS: 0px for cards, 4px for tags/badges, full for avatars.

Style: Ultra-premium, dark, minimal. Think Bloomberg Terminal meets luxury fashion. No rounded cards. Sharp edges. Generous whitespace. Gold accents used sparingly.
```

### Prompt 1B — Navigation Component

```
Create a navigation bar component for Meridian, a premium financial technology platform.

BAR HEIGHT: 72px. Background: #080808 with 1px bottom border in rgba(255,255,255,0.06).
POSITION: Full width, horizontally centered content.

LEFT SIDE:
- Logo text: "MERIDIAN" in Inter, 11px, weight 500, 0.2em letter-spacing, uppercase, color #F0EBE0

CENTER (desktop only):
- Navigation links in Inter, 11px, weight 400, 0.08em letter-spacing, uppercase, color rgba(240,235,224,0.35)
- Links: Platform · Solutions · Insights · About · Contact
- Active/hover state: color #F0EBE0 with 1px underline in #C4A46B

RIGHT SIDE:
- "Request Access" button: Inter 11px, weight 500, 0.1em uppercase, color #080808, background #F0EBE0, padding 10px 24px

Create both desktop and mobile (375px wide) versions.
Mobile version: logo left, hamburger menu icon right (three horizontal lines, 20px, color #F0EBE0).
```

### Prompt 1C — Footer Component

```
Create a footer component for Meridian, a premium financial technology platform.

BACKGROUND: #080808. Top border: 1px solid rgba(255,255,255,0.06).
PADDING: 80px top, 40px bottom, horizontal padding 40px.

TOP ROW (4 columns):
Column 1: "MERIDIAN" logo text (Inter 11px, 500, 0.2em uppercase, #F0EBE0), followed by a brief tagline in Inter 13px, weight 300, rgba(240,235,224,0.35): "Intelligence for the $3T wealth management sector."

Column 2 "Platform": Links in Inter 13px, weight 400, rgba(240,235,224,0.35)
- Dashboard · Analytics · Portfolio · Reports · API

Column 3 "Company": Links in same style
- About · Careers · Press · Contact · Partners

Column 4 "Legal": Links in same style
- Privacy · Terms · Security · Compliance

BOTTOM ROW:
Left: "© 2025 Meridian. All rights reserved." in Inter 11px, rgba(240,235,224,0.2)
Right: Social icons row (LinkedIn, Twitter, GitHub) as circle outlines, 32px, border rgba(255,255,255,0.1)
```

---

## PHASE 2: Core Pages (Generate One at a Time)

> **Instructions for each prompt below:** Copy-paste one prompt at a time into Figma Make. After each generation, manually verify the design system colors match Prompt 1A before moving to the next page.

---

### Page 1 — Landing / Home

```
Create a landing page for Meridian, a premium financial intelligence platform for wealth management.

FRAME: 1440px wide, dark background #080808.

SECTION 1 — HERO (full viewport height ~900px):
- Overline text top-left: "FINANCIAL INTELLIGENCE PLATFORM" in Inter 10px, 500, 0.18em uppercase, #C4A46B
- Main headline: "Wealth intelligence, redefined." in Instrument Serif 64px, -0.03em, #F0EBE0, line-height 1.05
- Subheadline: "Meridian unifies portfolio analytics, risk modeling, and client reporting into a single intelligence layer for the $3T wealth management sector." in Inter 17px, weight 300, rgba(240,235,224,0.5), line-height 1.7, max-width 560px
- Two CTAs side by side: "Request Access" (gold button: bg #F0EBE0, text #080808, Inter 11px 500 0.1em uppercase, padding 14px 32px) and "View Platform" (text link: Inter 11px 500 0.1em uppercase, #C4A46B with right arrow icon)
- Right side of hero: A large abstract geometric shape or gradient mesh in deep indigo/purple tones (#0E0C1A to #181428) as a decorative visual element. No stock photos.

SECTION 2 — STATS BAR (below hero):
Full-width bar with top and bottom borders in rgba(255,255,255,0.06). 4 stats in a row:
- "$2.4T" / "Assets Under Intelligence" 
- "140+" / "Platform Screens"
- "47%" / "Conversion Lift"
- "6 mo" / "Time to Value"
Each stat: Number in Instrument Serif 36px #F0EBE0, label in Inter 11px 400 0.1em uppercase rgba(240,235,224,0.35). Stat centered, label below.

SECTION 3 — FEATURES GRID (3 columns):
Heading: "Built for precision" in Instrument Serif 40px #F0EBE0
3 feature cards on #0E0C1A background, 1px border rgba(255,255,255,0.06), padding 32px:
Card 1: "Portfolio Intelligence" — "Real-time aggregation across 200+ custodians with AI-driven attribution analysis." (Inter 13px weight 400 rgba(240,235,224,0.42))
Card 2: "Risk Modeling" — "Monte Carlo simulations, factor analysis, and stress testing in a unified risk dashboard." (same text style)
Card 3: "Client Reporting" — "Automated, branded reporting that converts complex data into clear narrative." (same text style)
Each card has a small gold accent line (40px wide, 2px height, #C4A46B) above the title.

SECTION 4 — SOCIAL PROOF:
Full-width section. Heading: "Trusted by leading institutions" in Inter 11px 500 0.14em uppercase rgba(240,235,224,0.25)
Row of 5 placeholder logo slots (grey rectangles, 120px wide, 40px tall, rgba(255,255,255,0.06))

SECTION 5 — CTA BANNER:
Full-width section on #0E0C1A background. Centered content.
Overline: "GET STARTED" in Inter 10px 500 0.18em uppercase #C4A46B
Headline: "Intelligence that compounds." in Instrument Serif 40px #F0EBE0
Button: "Request Access" — same gold button style as hero
```

---

### Page 2 — Platform Overview

```
Create a platform overview page for Meridian, a financial intelligence platform.

FRAME: 1440px wide, #080808 background. Include the navigation bar at top (logo "MERIDIAN" left, links center, gold CTA right) and footer at bottom.

HERO SECTION (400px height):
- Overline: "THE PLATFORM" in Inter 10px 500 0.18em uppercase #C4A46B
- Headline: "One intelligence layer. Every data point." in Instrument Serif 48px #F0EBE0
- Subtext in Inter 16px weight 300 rgba(240,235,224,0.5) max-width 520px

PLATFORM SCREENS SHOWCASE:
- Show 3 large mockup frames (representing dashboard screens) arranged in an overlapping fan layout
- Each mockup: #0E0C1A background, 1px border rgba(255,255,255,0.06)
- Inside each mockup: simplified wireframe showing chart area (grey rectangle), sidebar (narrow column), and data table (horizontal lines)
- Mockups should be 600px x 400px, slightly rotated (-5deg, 0deg, 5deg) for depth

3 CAPABILITY SECTIONS (stacked vertically, alternating left-right layout):

1. Left text + Right visual:
   "Aggregation" heading in Instrument Serif 32px #F0EBE0
   "Connect to 200+ custodians, data providers, and market feeds. Real-time sync with zero manual input." in Inter 14px rgba(240,235,224,0.42)
   Visual: A grid of 6 small rectangles representing data source cards on #181428

2. Right text + Left visual:
   "Analytics" heading, same style
   "From attribution to factor decomposition. Interactive charts that respond to every question." Same text style.
   Visual: A chart wireframe (axes + 2 line graphs) on #181428

3. Left text + Right visual:
   "Reporting" heading, same style
   "Automated, branded reports delivered on your schedule. PDF, web, and API." Same text style.
   Visual: A document/report wireframe on #181428

CTA SECTION at bottom: Same gold CTA pattern as landing page.
```

---

### Page 3 — Dashboard (Key Screen)

```
Create a dashboard screen for Meridian, a financial intelligence platform.

FRAME: 1440px wide. This is an APP SCREEN, not a marketing page. No nav bar, no footer.

TOP BAR (56px height, #0A0814 background):
- Left: "MERIDIAN" logo in Inter 10px 500 0.18em uppercase #F0EBE0
- Center: Search bar — rounded rectangle 400px wide, 36px height, #0E0C1A background, 1px border rgba(255,255,255,0.08), placeholder "Search portfolios, clients..." in Inter 13px rgba(240,235,224,0.25)
- Right: Notification bell icon (20px, rgba(240,235,224,0.4)), Avatar circle (32px, #C4A46B background, initials "JD" in Inter 12px #080808)

LEFT SIDEBAR (240px wide, #0A0814 background, full height):
Menu items in Inter 13px weight 400 rgba(240,235,224,0.4), padding 12px 20px:
- Dashboard (active: bg rgba(196,164,107,0.08), color #F0EBE0, left border 2px #C4A46B)
- Portfolios
- Analytics
- Risk
- Clients
- Reports
- Settings
Each item has a 16px icon placeholder (grey circle) to the left of the text.

MAIN CONTENT AREA (remaining width, #080808 background):
- Top row: "Good morning, James" in Instrument Serif 28px #F0EBE0, date "June 14, 2025" in Inter 13px rgba(240,235,224,0.35)
- 4 metric cards in a row (each ~240px wide, #0E0C1A background, padding 20px, 1px border rgba(255,255,255,0.06)):
  Card 1: "Total AUM" / "$847.2M" (Instrument Serif 28px #F0EBE0) / "+3.2%" (Inter 12px #4ADE80)
  Card 2: "Active Clients" / "1,247" / "+12 this month"
  Card 3: "Risk Score" / "72" / "Moderate" in #C4A46B
  Card 4: "Reports Due" / "3" / "This week" in rgba(240,235,224,0.35)
- Large chart area below (spans full width, 400px height, #0E0C1A background): Placeholder line chart with 2 lines (one gold #C4A46B, one muted rgba(240,235,224,0.15)), x-axis labels, y-axis labels. Title "Portfolio Performance" in Inter 13px 500 #F0EBE0
- Below chart: A data table with 5 rows. Header row in Inter 11px 500 0.08em uppercase rgba(240,235,224,0.25). Data rows in Inter 13px rgba(240,235,224,0.45). Columns: Portfolio Name, AUM, Return, Risk, Status. Alternating row backgrounds (#0E0C1A and #080808).
```

---

### Page 4 — Portfolio Detail

```
Create a portfolio detail screen for Meridian, a financial intelligence platform.

FRAME: 1440px wide, app screen layout (same sidebar and top bar as the Dashboard screen — reuse those components).

MAIN CONTENT:
- Breadcrumb: "Portfolios / Growth Fund Alpha" in Inter 11px rgba(240,235,224,0.25), gold for current segment
- Header row: "Growth Fund Alpha" in Instrument Serif 32px #F0EBE0, left. Right side: "Edit" text button (Inter 11px 500 uppercase #C4A46B) and "Export" text button (same style)
- Subheader: "AUM: $124.7M · 89 clients · Last updated 2 hours ago" in Inter 13px rgba(240,235,224,0.35)

TAB BAR below header: "Overview" (active, underline #C4A46B), "Holdings", "Performance", "Risk", "Clients" — Inter 11px 500 0.08em uppercase

OVERVIEW TAB CONTENT:
- 2-column layout (60% left, 40% right)

LEFT COLUMN:
- Performance chart (full width, 320px height, #0E0C1A background): Line chart showing 12-month performance. Gold line for portfolio, grey line for benchmark. Title "12-Month Performance" in Inter 13px 500 #F0EBE0
- Holdings table (full width): Top 10 holdings. Columns: Asset, Weight%, Return%, Sector. 5 visible rows.

RIGHT COLUMN:
- "Key Metrics" card (#0E0C1A, padding 24px):
  - Annual Return: +14.2% (green)
  - Sharpe Ratio: 1.84
  - Max Drawdown: -8.3%
  - Beta: 0.92
  Each metric: Label in Inter 11px uppercase rgba(240,235,224,0.3), Value in Instrument Serif 24px #F0EBE0

- "Sector Allocation" card: Donut chart wireframe (circle with 4 colored segments) + legend list
  Technology 34%, Healthcare 22%, Financials 18%, Other 26%

- "Risk Alert" card: #181428 background, left border 3px #C4A46B
  "Concentration Warning" in Inter 13px 500 #F0EBE0
  "Technology allocation exceeds 30% threshold" in Inter 12px rgba(240,235,224,0.4)
```

---

### Page 5 — Analytics

```
Create an analytics screen for Meridian, a financial intelligence platform.

FRAME: 1440px wide, app screen layout (sidebar + top bar).

MAIN CONTENT:
- Header: "Analytics" in Instrument Serif 32px #F0EBE0
- Date range selector: "Last 30 days" dropdown style — #0E0C1A background, Inter 12px rgba(240,235,224,0.4), 1px border rgba(255,255,255,0.08)

TOP ROW — 3 metric cards (same style as dashboard):
- "Total Return" / "+8.4%" / "vs benchmark +5.2%"
- "Alpha Generated" / "+3.2%" / "Top quartile"
- "Clients Outperforming" / "78%" / "892 of 1,143"

MAIN CHART AREA:
- Large area chart (full width, 480px height, #0E0C1A background)
- Title: "Performance Attribution" in Inter 13px 500 #F0EBE0
- 3 overlapping area fills in different opacity levels representing: Asset Allocation, Security Selection, Interaction Effect
- Legend at top right with colored dots and labels

BOTTOM SECTION — 2 columns:
LEFT: "Top Performers" table — 5 rows. Columns: Security, Return%, Contribution%, Weight%
RIGHT: "Sector Breakdown" horizontal bar chart — 5 bars of varying lengths. Sectors: Technology (longest), Healthcare, Financials, Energy, Consumer. Bar color: #C4A46B at varying opacity. Labels on left, values on right.
```

---

### Page 6 — Risk Management

```
Create a risk management screen for Meridian, a financial intelligence platform.

FRAME: 1440px wide, app screen layout (sidebar + top bar).

MAIN CONTENT:
- Header: "Risk Management" in Instrument Serif 32px #F0EBE0
- Overline above: "REAL-TIME MONITORING" in Inter 10px 500 0.18em uppercase #C4A46B

RISK SCORE DASHBOARD — centered, large:
- Circular gauge wireframe (200px diameter) showing "72" in Instrument Serif 48px #F0EBE0
- Label "Overall Risk Score" in Inter 11px uppercase rgba(240,235,224,0.3)
- Color arc: green (low) → gold (moderate) → red (high), needle pointing to 72

4 RISK CATEGORY CARDS (2x2 grid):
Each card: #0E0C1A, 1px border rgba(255,255,255,0.06), padding 24px
- "Market Risk" — Score: 65 (Moderate) — Mini sparkline wireframe
- "Credit Risk" — Score: 34 (Low) — Mini sparkline wireframe
- "Liquidity Risk" — Score: 48 (Low-Moderate) — Mini sparkline wireframe
- "Concentration Risk" — Score: 81 (Elevated) — Red indicator dot, Mini sparkline wireframe

STRESS TEST SECTION:
- Heading: "Stress Test Scenarios" in Instrument Serif 24px #F0EBE0
- 3 scenario cards in a row:
  Card 1: "Market Crash 2020" — Impact: -18.4% — Recovery: 14 months
  Card 2: "Rising Rates +200bps" — Impact: -6.2% — Recovery: 8 months
  Card 3: "Credit Crisis" — Impact: -12.1% — Recovery: 11 months
Each card: #0E0C1A, impact in Instrument Serif 28px, recovery in Inter 12px rgba(240,235,224,0.35)
```

---

### Page 7 — Client List

```
Create a client list screen for Meridian, a financial intelligence platform.

FRAME: 1440px wide, app screen layout (sidebar + top bar).

MAIN CONTENT:
- Header row: "Clients" in Instrument Serif 32px #F0EBE0. Right side: "Add Client" button (bg #F0EBE0, text #080808, Inter 11px 500 0.1em uppercase, padding 10px 24px)
- Filter bar: Search input + dropdown filters for "Tier" and "Status"

CLIENT TABLE (full width):
Header row: Inter 11px 500 0.08em uppercase rgba(240,235,224,0.25)
Columns: Client Name, AUM, Portfolio, Risk Level, Last Contact, Status

Data rows (show 8 rows):
Each row: Inter 13px rgba(240,235,224,0.45), alternating backgrounds #0E0C1A and #080808
- Risk Level: color-coded pill — Low (#4ADE80), Moderate (#C4A46B), High (#F87171)
- Status: "Active" (green dot) or "Pending" (gold dot)
- Client names: "Thompson Family Office", "Chen Wealth Group", "Meridian Capital LLC", etc.
- AUM values: "$24.7M", "$18.3M", "$42.1M", etc.

Bottom: Pagination "Showing 1-8 of 247 clients" in Inter 12px rgba(240,235,224,0.25)
```

---

### Page 8 — Client Detail

```
Create a client detail screen for Meridian, a financial intelligence platform.

FRAME: 1440px wide, app screen layout (sidebar + top bar).

MAIN CONTENT:
- Breadcrumb: "Clients / Thompson Family Office"
- Header: "Thompson Family Office" in Instrument Serif 32px #F0EBE0
- Subheader: "Since 2019 · Primary Contact: Sarah Thompson · Tier: Platinum" in Inter 13px rgba(240,235,224,0.35)
- Action buttons right: "Message" and "Schedule" text buttons in #C4A46B

2-COLUMN LAYOUT:
LEFT (60%):
- "Portfolio Summary" card (#0E0C1A): 
  - AUM: $24.7M (Instrument Serif 28px #F0EBE0)
  - YTD Return: +11.3% (green)
  - Risk Score: 58 (Moderate)
  - 3 portfolio thumbnails below (small cards showing portfolio names)
- "Activity Timeline" card (#0E0C1A):
  - 5 timeline entries, each with a gold dot on a vertical line
  - "Report delivered" — 2 days ago
  - "Strategy call completed" — 1 week ago
  - "New holding added" — 2 weeks ago
  - "Risk alert resolved" — 3 weeks ago
  - "Onboarding complete" — 6 months ago

RIGHT (40%):
- "Contact Information" card:
  - Name, email, phone, address in Inter 13px rgba(240,235,224,0.45)
- "Notes" card:
  - A text area wireframe with placeholder "Add a note..."
- "Documents" card:
  - 3 document rows: "Q1 Report.pdf", "Investment Policy.pdf", "KYC Form.pdf" with download icons
```

---

### Page 9 — Reports

```
Create a reports screen for Meridian, a financial intelligence platform.

FRAME: 1440px wide, app screen layout (sidebar + top bar).

MAIN CONTENT:
- Header: "Reports" in Instrument Serif 32px #F0EBE0
- Tab bar: "All" (active), "Scheduled", "Generated", "Templates"

2-COLUMN GRID of report cards (show 6 cards, 3 per row):
Each card: #0E0C1A, 1px border rgba(255,255,255,0.06), padding 24px
- Report type icon (small grey circle placeholder, 40px)
- Report name in Inter 14px 500 #F0EBE0: "Monthly Performance — June 2025"
- Client: "Thompson Family Office" in Inter 12px rgba(240,235,224,0.35)
- Date: "Generated Jun 14, 2025" in Inter 11px rgba(240,235,224,0.25)
- Status pill: "Complete" (green) or "Scheduled" (gold) or "Draft" (grey)
- Bottom actions: "View" and "Download" text links in #C4A46B

CTA at bottom: "Generate New Report" button (gold style)
```

---

### Page 10 — Settings

```
Create a settings screen for Meridian, a financial intelligence platform.

FRAME: 1440px wide, app screen layout (sidebar + top bar).

MAIN CONTENT:
- Header: "Settings" in Instrument Serif 32px #F0EBE0

TWO-COLUMN LAYOUT:
LEFT (240px) — Settings navigation:
- Profile (active, highlighted with left border #C4A46B)
- Notifications
- Security
- Integrations
- Billing
- Team
Each item: Inter 13px, active is #F0EBE0, inactive is rgba(240,235,224,0.35)

RIGHT — "Profile" section (active):
- Section heading: "Profile" in Inter 14px 500 #F0EBE0
- Form fields (stacked vertically, each with label above):
  Label style: Inter 11px 500 0.08em uppercase rgba(240,235,224,0.3)
  Input style: #0E0C1A background, 1px border rgba(255,255,255,0.08), 44px height, Inter 14px #F0EBE0, padding 0 16px
  
  Fields: Full Name, Email, Phone, Company, Role
  Sample values: "James Davidson", "james@meridian.io", "+1 (555) 234-5678", "Meridian Capital", "Managing Director"

- "Avatar" section: Circle placeholder (80px, #181428, initials "JD"), "Change Photo" link in #C4A46B

- "Save Changes" button (gold style) at bottom right

- Separator line

- "Danger Zone" section: "Delete Account" text in #F87171 with 1px border #F87171
```

---

### Page 11 — About (Marketing)

```
Create an about page for Meridian, a financial intelligence platform.

FRAME: 1440px wide, #080808 background. Include nav bar and footer.

HERO (500px):
- Overline: "ABOUT MERIDIAN" in Inter 10px 500 0.18em uppercase #C4A46B
- Headline: "Intelligence that compounds over decades." in Instrument Serif 56px #F0EBE0
- Body text: "Founded in 2023, Meridian was built by wealth managers who understood that the industry's tools hadn't kept pace with its ambitions." in Inter 17px weight 300 rgba(240,235,224,0.5), max-width 560px

MISSION SECTION (2 columns):
Left: Large pull quote in Instrument Serif 32px italic #C4A46B: "We believe every portfolio decision should be backed by complete intelligence."
Right: Mission text in Inter 15px weight 300 rgba(240,235,224,0.5), 2 paragraphs

TEAM SECTION:
Heading: "The team" in Instrument Serif 40px #F0EBE0
4 team member cards in a row:
Each card: #0E0C1A background, 1px border rgba(255,255,255,0.06)
- Avatar circle (120px, #181428 placeholder)
- Name: "James Davidson" in Inter 14px 500 #F0EBE0
- Role: "CEO & Founder" in Inter 12px rgba(240,235,224,0.35)
- Brief bio in Inter 12px rgba(240,235,224,0.25)

TIMELINE SECTION:
Heading: "Our journey" in Instrument Serif 40px #F0EBE0
Vertical timeline with gold dots:
- 2023: "Founded in New York"
- 2024: "Series A — $12M raised"
- 2024: "Platform launch — 50 institutional clients"
- 2025: "Series B — $34M raised"
- 2025: "140+ platform screens, $2.4T under intelligence"
```

---

### Page 12 — Contact / Request Access

```
Create a contact / request access page for Meridian, a financial intelligence platform.

FRAME: 1440px wide, #080808 background. Include nav bar and footer.

2-COLUMN LAYOUT (centered, max-width 1000px):

LEFT (55%):
- Overline: "GET STARTED" in Inter 10px 500 0.18em uppercase #C4A46B
- Headline: "Request access to Meridian" in Instrument Serif 40px #F0EBE0
- Body: "Join 1,200+ wealth management professionals who rely on Meridian for portfolio intelligence." in Inter 15px weight 300 rgba(240,235,224,0.5)
- Form fields (same input style as settings page):
  - Full Name
  - Work Email
  - Company
  - Role (dropdown placeholder)
  - AUM Range (dropdown placeholder: "$0-50M", "$50-250M", "$250M-1B", "$1B+")
  - Message (textarea, 120px height)
- "Submit Request" button (gold style, full width)

RIGHT (35%):
- "What to expect" card (#0E0C1A, padding 32px):
  - Heading: "What to expect" in Inter 14px 500 #F0EBE0
  - 4 steps with gold numbered circles (1-4):
    1. "Discovery call within 48 hours"
    2. "Custom platform demo"
    3. "Pilot program setup"
    4. "Full deployment in 2-4 weeks"
  Each step: number in 32px circle #C4A46B on #080808, text in Inter 13px rgba(240,235,224,0.4)
```

---

### Page 13 — Insights / Blog Listing

```
Create an insights/blog listing page for Meridian, a financial intelligence platform.

FRAME: 1440px wide, #080808 background. Include nav bar and footer.

HERO (300px):
- Overline: "INSIGHTS" in Inter 10px 500 0.18em uppercase #C4A46B
- Headline: "Intelligence in practice" in Instrument Serif 48px #F0EBE0

FILTER TABS: "All" (active), "Research", "Market Commentary", "Product Updates", "Case Studies" — same tab style as work page

BLOG GRID (3 columns, 2 rows = 6 cards):
Each card: #0E0C1A background, 1px border rgba(255,255,255,0.06)
- Category tag at top: "Research" in Inter 9px uppercase rgba(240,235,224,0.32), 1px border rgba(255,255,255,0.12), padding 4px 9px
- Article title: "The Future of Wealth Intelligence" in Instrument Serif 24px #F0EBE0
- Excerpt: "How AI is transforming portfolio analytics..." in Inter 13px rgba(240,235,224,0.35)
- Bottom row: Author name + date in Inter 11px rgba(240,235,224,0.25), Read time "5 min read"

FEATURED ARTICLE (full width, above the grid):
- Larger card, 2-column layout inside: Left side has title + excerpt + CTA "Read Article →" in #C4A46B. Right side has a large placeholder rectangle for hero image (#181428).
```

---

### Page 14 — Blog Article Detail

```
Create a blog article detail page for Meridian, a financial intelligence platform.

FRAME: 1440px wide, #080808 background. Include nav bar and footer.

ARTICLE HEADER (centered, max-width 720px):
- Category: "Research" in Inter 10px 500 0.18em uppercase #C4A46B
- Title: "The Future of Wealth Intelligence: How AI is Transforming Portfolio Analytics" in Instrument Serif 48px #F0EBE0, centered
- Meta: "James Davidson · June 14, 2025 · 8 min read" in Inter 13px rgba(240,235,224,0.35), centered
- Hero image placeholder: Full width (720px), 400px height, #181428 with subtle gradient

ARTICLE BODY (max-width 640px, centered):
- Body text in Inter 16px weight 300 rgba(240,235,224,0.55), line-height 1.8
- Pull quote in Instrument Serif 28px italic #C4A46B, with left border 3px #C4A46B, padding-left 24px
- Subheadings in Instrument Serif 28px #F0EBE0
- An embedded chart/image placeholder: Full width, 300px height, #0E0C1A background
- A data callout box: #0E0C1A background, padding 24px, "Key Finding" label in Inter 10px uppercase #C4A46B, stat in Instrument Serif 36px #F0EBE0

ARTICLE FOOTER:
- Tags row: "AI", "Portfolio Analytics", "Wealth Management" — tag style
- Share icons: LinkedIn, Twitter, Copy Link
- "Next Article →" link in #C4A46B
```

---

### Page 15 — Services Overview

```
Create a services overview page for Meridian, a financial intelligence platform.

FRAME: 1440px wide, #080808 background. Include nav bar and footer.

HERO:
- Overline: "SERVICES" in Inter 10px 500 0.18em uppercase #C4A46B
- Headline: "Intelligence, delivered." in Instrument Serif 56px #F0EBE0
- Body in Inter 17px weight 300 rgba(240,235,224,0.5)

3 SERVICE CARDS (full width, stacked):
Each card: 120px height, alternating backgrounds #0E0C1A and #181428, 1px border rgba(255,255,255,0.06)
- Left: Service number "01", "02", "03" in Instrument Serif 48px rgba(240,235,224,0.08)
- Center: Service name in Instrument Serif 32px #F0EBE0 + description in Inter 14px rgba(240,235,224,0.4)
  1. "Platform Deployment" — "Full implementation in 2-4 weeks. Data migration, integration, training."
  2. "Custom Analytics" — "Tailored dashboards and reports built for your specific investment strategy."
  3. "Strategic Advisory" — "Ongoing consultation to maximize the value of your intelligence infrastructure."
- Right: Arrow icon → in #C4A46B

PROCESS SECTION:
Heading: "How we work" in Instrument Serif 40px #F0EBE0
4 steps in a row with connecting lines between them:
Step 1: "Discovery" → Step 2: "Design" → Step 3: "Deploy" → Step 4: "Optimize"
Each: Number in Inter 10px uppercase #C4A46B, Name in Inter 14px 500 #F0EBE0, Brief description in Inter 12px rgba(240,235,224,0.35)
```

---

### Page 16 — Login

```
Create a login page for Meridian, a financial intelligence platform.

FRAME: 1440px wide, split layout.

LEFT HALF (50%): #080808 background
- Centered form (max-width 360px):
- "MERIDIAN" logo in Inter 14px 500 0.2em uppercase #F0EBE0, centered
- Heading: "Welcome back" in Instrument Serif 36px #F0EBE0, centered
- Subtext: "Sign in to your intelligence platform" in Inter 14px rgba(240,235,224,0.4), centered
- Form fields:
  - Email: input field (#0E0C1A bg, 1px border rgba(255,255,255,0.08), 44px height, Inter 14px)
  - Password: same input style with eye icon placeholder
- "Remember me" checkbox + "Forgot password?" link in #C4A46B
- "Sign In" button: full width, bg #F0EBE0, text #080808, Inter 12px 500 0.1em uppercase
- Divider: "or continue with" with lines
- SSO buttons: "Sign in with Microsoft" and "Sign in with Google" — #0E0C1A bg, 1px border, centered logos

RIGHT HALF (50%): #0E0C1A background
- Abstract gradient mesh or geometric pattern (decorative, deep indigo/purple tones)
- Bottom: "Trusted by 1,200+ institutions" in Inter 11px rgba(240,235,224,0.2)
```

---

### Page 17 — Mobile Navigation Overlay

```
Create a mobile navigation overlay for Meridian, a financial intelligence platform.

FRAME: 375px wide, 812px height (iPhone size), #080808 background.

TOP BAR (56px):
- "MERIDIAN" logo left
- X (close) icon right, 24px, #F0EBE0

FULL-SCREEN NAV LINKS (centered vertically):
Each link in Instrument Serif 36px #F0EBE0, vertically stacked with 24px gap:
- Platform
- Solutions
- Insights
- About
- Contact

Bottom of screen:
- "Request Access" button (gold, full width)
- Social icons row (LinkedIn, Twitter, GitHub)
```

---

### Page 18 — Error / 404 Page

```
Create a 404 error page for Meridian, a financial intelligence platform.

FRAME: 1440px wide, #080808 background. Include nav bar.

CENTER CONTENT (vertically and horizontally centered):
- "404" in Instrument Serif 120px rgba(240,235,224,0.06) — very large, faint
- "Page not found" in Instrument Serif 36px #F0EBE0, centered above the 404
- "The page you're looking for doesn't exist or has been moved." in Inter 14px rgba(240,235,224,0.35), centered
- "Return Home" button (gold style) centered
- "Or try" + "Platform" and "Contact" links in #C4A46B
```

---

## PHASE 3: Post-Generation Cleanup Checklist

After generating all pages in Figma Make, perform these manual fixes:

### Must Fix (Breaks the design if skipped)
- [ ] **Auto-Layout:** Select every frame and press `Shift+A` to wrap in Auto-Layout. Set proper padding (match design tokens: 16, 24, 32, 40px).
- [ ] **Color Variables:** Select all elements → Use "Selection Colors" panel → Replace AI-generated colors with your actual Color Variables from Prompt 1A. This is critical for consistency.
- [ ] **Typography Variables:** Same process for text — ensure all text uses your defined font sizes and weights from the type scale.
- [ ] **Component Conversion:** Convert Navigation, Footer, and all recurring card patterns into Components. Then replace all instances across pages with Component Instances.

### Should Fix (Quality and consistency)
- [ ] **Text Overflow:** Check all text elements — set Auto-Layout to "Hug" height with fixed width so text wraps properly.
- [ ] **Navigation Links:** Manually wire prototype flows between navigation items and their corresponding pages.
- [ ] **Hover States:** Add component variants for hover states on buttons, cards, and navigation links (gold border glow, color shift).
- [ ] **Responsive Frames:** Create 375px (mobile) and 768px (tablet) versions of key pages. Re-layout content for each breakpoint.

### Nice to Have (Polish)
- [ ] **Animations:** Add Smart Animate transitions between pages (fade + subtle Y translation).
- [ ] **Micro-interactions:** Button hover scale (1.02), card hover lift (-4px Y), text color transitions.
- [ ] **Grain texture overlay:** Add a subtle noise texture on top of all pages for the premium feel.
- [ ] **Scroll animations:** For marketing pages, add scroll-triggered fade-in for sections.

---

## IMPORTANT NOTES

1. **Generate ONE page at a time.** Figma Make loses context across multi-page prompts. The design system (Phase 1) must be generated first and referenced in every subsequent prompt.

2. **Keep each prompt under 300 words.** Figma Make's context window is limited. The prompts above are intentionally detailed but you may need to split the longer ones (like the Dashboard) into two generations.

3. **No backend, routing, or validation.** This prompt set is purely for visual design. All interactive behavior (form validation, API calls, routing, state management) must be implemented in code separately.

4. **Dark mode is visual only.** Figma Make will generate dark colors but they won't be linked to Figma Variables. You must manually map them after generation.

5. **Expect manual cleanup.** Every generated frame will need Auto-Layout, component conversion, and color variable mapping. Budget 40-60% of total time for cleanup.

6. **Asset placeholders.** All images, charts, and logos are represented as grey rectangles or wireframes. Replace with real assets after generation.

7. **Do NOT try to generate all 18 pages in one prompt.** This will cause severe design drift, broken layouts, and inconsistent styling. Follow the phased approach above.

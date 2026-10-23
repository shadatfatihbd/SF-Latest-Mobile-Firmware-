# SF Latest Firmware — Premium Firmware Update Tracker

**SF Latest Firmware** is a production-ready, responsive firmware and software update tracking platform for **Samsung Galaxy** and **Apple iPhone** devices, inspired by **Microsoft Fluent Design** and Windows 11 acrylic materials.

---

## 🌟 Key Features

1. **Latest Build Accuracy & Deterministic Version Parsing**:
   - Proprietary Samsung PDA build string parser (`parseSamsungPda`) decoding model prefix, region, update type (`U` feature upgrade vs `S` security patch), bootloader/binary revision, OS generation code, year, month (`A`=Jan .. `L`=Dec), and revision sequence.
   - Apple iOS build number parser (`parseAppleBuild`) identifying Darwin major epoch, milestone letter (`C` > `B` > `A`), build sequence, and distinguishing stable releases from developer/public betas.
   - Eliminates naive lexicographical sorting; guarantees the newest verifiable build is selected for the exact device and region.
   - Clear status labels: `Verified Latest`, `Officially Announced`, `Rolling Out`, `Cached — Refresh Failed`, `Not Verified`, and `"Latest build could not be verified"` when records cannot be confirmed.

2. **Homepage "Latest Software Updates" Widgets**:
   - **Samsung — Latest One UI**: Displays verified One UI version, underlying Android version, flagship reference build, rollout date, and official changelog.
   - **Samsung — Latest Security Patch**: Displays current monthly Android Security Maintenance Release (SMR), associated verified build, and scheduled tier.
   - **Samsung — Latest Verified Firmware Builds**: Multi-device matrix proving firmware builds differ by device model and CSC code (no universal build).
   - **Apple — Latest Stable iOS**: Official public retail release, exact build number, release date, and supported iPhone models.
   - **Apple — Latest Security Updates**: Critical zero-day vulnerability disclosures (WebKit, JavaScriptCore) with official Apple security citations.

3. **Dedicated Samsung Update Dashboard**:
   - **Section A · Latest One UI Update**: One UI version, PDA build, Android version, rollout status, changelog.
   - **Section B · Monthly Security Updates & Scope**: Critical/High CVE counts, Samsung SVEs, and official schedule tiers (Monthly vs. Quarterly vs. Biannual). Clarifies the distinction between a published monthly bulletin and actual device rollout.
   - **Section C · Exact Samsung Build Search**: Instant model and CSC verification returning PDA/AP build, CP baseband, bootloader binary fuse lock, security patch level, and verified date.

4. **Apple Latest iOS Update Dashboard**:
   - Primary view strictly prioritizes the **latest stable public release** (e.g. iOS 18.2 Build 22C152 / iOS 18.1.1 Build 22B91).
   - Supported devices list, official release notes citations (HT214080), and CVE advisories (HT201222).
   - Separate, toggleable **Developer & Public Beta Channel** section to track pre-release software without contaminating public stable results.

5. **Data Sources & Multi-Provider Adapter Layer**:
   - `SamsungFotaFeedAdapter`: Official `doc.samsungmobile.com` release metadata.
   - `SamsungSecurityBulletinAdapter`: `security.samsungmobile.com` monthly vulnerability disclosures and schedule tiers.
   - `AppleReleaseNotesAdapter`: Official Apple iOS release notes and security advisories.
   - `LiveGroundingVerificationAdapter`: Real-time newsroom search grounding with **Gemini 3.8 Flash** (`@google/genai`).
   - In-memory cache with TTL, error-tolerant refresh fallback (`Cached — Refresh Failed`), and manual refresh endpoint (`POST /api/firmware/refresh`).

6. **Interactive Tools**:
   - **Side-by-side Build Comparison**: Compare binary revisions, security patches, and rollback safety between builds (e.g. Binary 4 vs Binary 3).
   - **CSC Directory Explorer**: Searchable directory covering 40+ Samsung CSC codes with country, carrier, and multi-CSC bundle mappings.
   - **Update Notification Subscription**: Client & backend subscription to receive update alerts.
   - **Share & Deep Links**: Direct link sharing via URL query parameters (`?model=SM-A556E&csc=XME`).

7. **Microsoft Fluent Design UI**:
   - Fluent acrylic translucent glass panels (`backdrop-blur-xl`, subtle layered borders, soft shadows).
   - Segoe UI font stack with fallback to Bengali typography (`Kalpurush`, `SolaimanLipi`).
   - Microsoft Windows 11 blue accents (`#0078d4`, `#1084d9`).
   - Dark and Light mode toggle with smooth persistence.
   - Accessible WCAG AA contrast compliance and zero-pill typographic discipline.

---

## 🏗️ Architecture

```
├── server.ts                       # Express backend + Vite middleware integration
├── src/
│   ├── main.tsx                    # React client entry point
│   ├── App.tsx                     # Main application container & router
│   ├── index.css                   # Tailwind CSS + Fluent acrylic utility styles
│   ├── types/
│   │   └── firmware.ts             # Comprehensive TypeScript models
│   ├── utils/
│   │   └── versionParser.ts        # Deterministic Samsung PDA & Apple build parser
│   ├── data/
│   │   ├── authoritativeDatabase.ts# Verified firmware records, bulletins & CSC database
│   │   └── googleSheetsSync.ts     # Multi-tab Google Sheets schema & Apps Script template
│   ├── server/
│   │   └── adapters/
│   │       └── FirmwareAdapter.ts  # Multi-provider adapter service & Gemini live grounding
│   ├── components/
│   │   ├── Header.tsx              # 3-Zone Fluent Top Bar
│   │   ├── Footer.tsx              # Footer with disclaimer & navigation
│   │   ├── HeroSearch.tsx          # Search panel with example chips & live check
│   │   ├── HomepageUpdateWidgets.tsx# 5 Prominent "Latest Software Updates" cards
│   │   ├── PlatformCards.tsx       # Samsung Galaxy & Apple iPhone showcase
│   │   ├── LatestUpdatesSection.tsx# Verified updates feed
│   │   ├── SearchResults.tsx       # 7 organized cards & summary
│   │   ├── AlertSubscribeModal.tsx # Update notification modal
│   │   ├── CscDirectoryModal.tsx   # Samsung CSC lookup modal
│   │   └── UpdateComparisonModal.tsx# Side-by-side build comparator
│   └── pages/
│       ├── SamsungPage.tsx         # Dedicated Samsung 3-section update hub
│       ├── ApplePage.tsx           # Dedicated Apple stable & beta hub
│       ├── HistoryPage.tsx         # Rollout timeline & comparator
│       ├── AboutPage.tsx           # Methodology, sources, Apps Script guide
│       └── PrivacyPage.tsx         # Privacy policy
```

---

## 📡 API Endpoints

- `GET /api/firmware/widgets`: Returns the 5 prominent Homepage Update Widgets.
- `GET /api/firmware/bulletin`: Retrieves current Samsung monthly security bulletin & schedule tiers.
- `GET /api/firmware/search?model={model}&csc={csc}&brand={brand}`: Queries matching devices and newest verified firmware builds.
- `GET /api/firmware/device/:model`: Retrieves detailed device metadata and regional variants.
- `POST /api/firmware/live-verify`: Performs live verification using `@google/genai` search grounding against manufacturer newsrooms.
- `POST /api/firmware/refresh`: Triggers manual provider data refresh with error-fallback preserving cached records.
- `GET /api/firmware/recent`: Returns feed of recent verified updates.
- `GET /api/csc/all`: Returns the complete Samsung CSC directory.
- `POST /api/alerts/subscribe`: Subscribes an email to firmware rollout alerts.
- `GET /api/sheets/template`: Returns Google Sheets schema and Google Apps Script synchronization code.
- `GET /sitemap.xml`: SEO sitemap for search engine crawlers.
- `GET /robots.txt`: Search crawler directives.

---

## 📊 Google Sheets & Google Apps Script Sync

Sync verified firmware directly into your own Google Spreadsheet across 4 structured tabs:
1. `Samsung_Firmware`
2. `Samsung_Security_Bulletins`
3. `Apple_iOS_Releases`
4. `Source_Verification_Metadata`

### Setup:
1. Create a new Google Spreadsheet.
2. Go to **Extensions > Apps Script**.
3. Copy the Apps Script code from `/api/sheets/template` (or the **About** page).
4. Run `setupSheets()` to initialize headers.
5. Run `syncFirmwareFromSfPlatform()` or set an hourly time-driven trigger.

---

## 🚀 Deployment Instructions

### Local / Development:
```bash
npm install
npm run dev
```
The server will start at `http://localhost:3000` with Express backend API routes and Vite middlewares.

### Production Build:
```bash
npm run build
npm start
```

### GitHub Actions & GitHub Pages Deployment:
This repository includes a tested, automated workflow at `.github/workflows/deploy.yml`.

1. **Push your code to GitHub**:
   ```bash
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git branch -M main
   git push -u origin main
   ```
2. **Enable GitHub Pages via Actions**:
   - Go to your repository on GitHub.
   - Navigate to **Settings** → **Pages** (under the "Code and automation" section).
   - Under **Build and deployment** → **Source**, select **GitHub Actions** (do NOT use "Deploy from a branch").
3. **Verify Deployment**:
   - Click the **Actions** tab on GitHub to monitor the `Deploy SF Latest Mobile Firmware` workflow.
   - Once completed, your live site URL will be displayed in the deployment step and in **Settings** → **Pages**.

### Environment Variables:
- `GEMINI_API_KEY`: API key for real-time live grounding verification via Google Search Grounding.
- `APP_URL`: Public base URL for sitemap and self-referential links.
- `PORT`: Server port (default: 3000).

---

## ⚖️ Legal Disclaimer

SF Latest Firmware is an independent information platform and is not affiliated with Samsung Electronics or Apple Inc. Device names, logos, and trademarks belong to their respective owners.

export type DeviceBrand = 'samsung' | 'apple';

export type RolloutStatus = 'confirmed' | 'rolling_out' | 'announced' | 'not_verified';

export type DataFreshnessStatus = 'LIVE' | 'CACHED' | 'STALE' | 'SOURCE UNAVAILABLE';

export type FirmwareClassification =
  | 'Official / Released'
  | 'Testing / Test Firmware'
  | 'Beta / Preview'
  | 'Upcoming / Expected'
  | 'Unknown / Unverified';

export type VerificationStatusLabel =
  | 'Verified Latest'
  | 'Officially Announced'
  | 'Rolling Out'
  | 'Cached — Refresh Failed'
  | 'Not Verified'
  | 'Latest build could not be verified';

export type UpcomingStatusLabel =
  | 'Officially Announced'
  | 'Beta Available'
  | 'Testing Reported'
  | 'Expected — Unconfirmed'
  | 'Release Window Unknown';

export type UpcomingCategory =
  | 'announcement'
  | 'beta'
  | 'internal_testing'
  | 'prediction';

export interface UpcomingFirmwareRecord {
  id: string;
  brand: 'samsung' | 'apple';
  deviceModel: string;
  commercialName: string;
  deviceFamily: string;
  expectedVersion: string;          // e.g. "One UI 7.0", "iOS 27.2"
  expectedAndroidVersion?: string;  // e.g. "Android 15"
  expectedBuild?: string;           // e.g. "24B115" or undefined if not known
  expectedReleaseWindow: string;    // e.g. "Q4 2026", "Late November 2026", or "Release date not announced."
  regionOrCsc?: string;             // e.g. "EUX / Global", "XME", "Global"
  status: UpcomingStatusLabel;
  category: UpcomingCategory;
  evidenceSource: string;           // e.g. "Apple Developer Portal", "Samsung FOTA Test Gateway"
  evidenceUrl?: string;
  evidenceDate: string;
  verifiedAt: string;
  testingHashCount?: number;        // From version.test.xml if internal test
  rolloutScope?: string;
  notes?: string;
}

export interface SecurityCalendarEntry {
  id: string;
  manufacturer: 'Samsung' | 'Apple';
  deviceFamily: string;             // e.g. "Galaxy S Series Flagships", "iPhone 17 / 16 Series"
  sampleModels: string[];           // e.g. ["SM-S928B", "SM-S921B"]
  bulletinMonth: string;            // e.g. "November 2026"
  patchLevel: string;               // e.g. "2026-11-01"
  scheduleTier: 'Monthly' | 'Quarterly' | 'Biannual' | 'Supplemental';
  expectedDate: string;             // e.g. "2026-11-04"
  rolloutDate?: string;             // e.g. "2026-11-08" or "Rolling out"
  rolloutStatus: 'Released' | 'Rolling Out' | 'Upcoming' | 'Testing';
  cveCount?: string;                // e.g. "38 CVEs (3 Critical)"
  source: string;
  sourceUrl: string;
  verifiedAt: string;
  notes?: string;
}

export interface UpdateCenterDashboardData {
  latestSamsungBuilds: SamsungFirmwareRecord[];
  latestAppleBuilds: AppleFirmwareRecord[];
  upcomingFirmware: UpcomingFirmwareRecord[];
  securityCalendar: SecurityCalendarEntry[];
  lastVerifiedAt: string;
}

export type AppleReleaseType = 'public' | 'public_beta' | 'developer_beta' | 'security_response';

export type SamsungSecurityScheduleTier =
  | 'Current Monthly Security Updates'
  | 'Current Quarterly Security Updates'
  | 'Current Biannual Security Updates';

export interface SamsungFirmwareRecord {
  id: string;
  brand: 'samsung';
  model: string;              // e.g. SM-A556E, SM-S928B
  commercialName: string;     // e.g. Samsung Galaxy A55 5G
  deviceFamily: string;       // e.g. Galaxy A Series
  marketRegion: string;       // e.g. Southeast Asia / Global
  csc: string;                // e.g. XME
  cscRegion: string;          // e.g. Malaysia
  cscCarrier?: string;        // e.g. Open Market / Unlocked
  multiCscGroup: string;      // e.g. OXM (Multi-CSC package)
  availableCscs: string[];    // Other CSCs for this model (e.g. ['XME', 'INS', 'XXV', 'BKD', 'THL', 'EUX'])
  latestPda: string;          // e.g. A556EXXS4AXK2
  apBuild: string;            // e.g. A556EXXS4AXK2
  cpBuild: string;            // Baseband/Modem: A556EXXS4AXK1
  cscBuild: string;           // e.g. A556EOXM4AXK2
  androidVersion: string;     // e.g. 14
  oneUiVersion: string;       // e.g. 6.1
  securityPatchLevel: string; // e.g. 2026-10-01
  securitySchedule: 'Monthly' | 'Quarterly' | 'Biannual';
  securityBulletinMonth: string; // e.g. October 2026
  releaseDate: string;        // e.g. 2026-10-18
  rolloutDate?: string;       // e.g. 2026-10-20
  announcementDate?: string;  // e.g. 2026-10-08
  bootloaderRevision: number; // Binary version: e.g. 4
  packageSizeOta?: string;    // e.g. 340 MB
  packageSizeFull?: string;   // e.g. 6.42 GB
  rolloutStatus: RolloutStatus;
  statusLabel?: VerificationStatusLabel;
  changelog: string[];
  securityFixes: string[];
  knownLimitations: string[];
  officialSourceUrl: string;
  sourceName: string;
  verifiedAt: string;
  isLiveVerified?: boolean;
  classification?: FirmwareClassification;
  freshnessStatus?: DataFreshnessStatus;
  lastCheckedAt?: string;
  lastSuccessfulUpdateAt?: string;
  confidenceLevel?: 'High (Verified Live)' | 'Standard (Validated Cache)' | 'Notice (Test Candidate)' | 'Low (Unverified)';
  sourceAttribution?: string;
  isTestBuild?: boolean;
  testWarningMessage?: string;
  notes?: string;
  previousVersions: {
    pda: string;
    oneUi: string;
    android: string;
    securityPatch: string;
    releaseDate: string;
    bootloaderRevision: number;
  }[];
}

export interface AppleFirmwareRecord {
  id: string;
  brand: 'apple';
  model: string;              // e.g. iPhone 17 Pro Max
  modelIdentifier: string;    // e.g. A3295 (or internal iPhone16,2)
  deviceFamily: string;       // e.g. iPhone
  latestOsVersion: string;    // e.g. 18.2
  releaseType: AppleReleaseType;
  buildNumber: string;        // e.g. 22C152
  releaseDate: string;        // e.g. 2026-10-15
  securityResponse?: string;  // Rapid Security Response if any
  packageSize?: string;       // e.g. 2.1 GB
  statusLabel?: VerificationStatusLabel;
  changelog: string[];
  securityFixes: string[];
  supportedDevices: string[];
  officialReleaseNotesUrl: string;
  officialSecurityUrl: string;
  sourceName: string;
  verifiedAt: string;
  isLiveVerified?: boolean;
  classification?: FirmwareClassification;
  freshnessStatus?: DataFreshnessStatus;
  lastCheckedAt?: string;
  lastSuccessfulUpdateAt?: string;
  confidenceLevel?: 'High (Verified Live)' | 'Standard (Validated Cache)' | 'Notice (Test Candidate)' | 'Low (Unverified)';
  sourceAttribution?: string;
  isTestBuild?: boolean;
  testWarningMessage?: string;
  notes?: string;
  previousVersions: {
    osVersion: string;
    buildNumber: string;
    releaseDate: string;
    releaseType: AppleReleaseType;
    summary: string;
  }[];
}

export type FirmwareRecord = SamsungFirmwareRecord | AppleFirmwareRecord;

export interface BookmarkedDevice {
  id: string;
  model: string;
  commercialName: string;
  csc?: string;
  brand: 'samsung' | 'apple';
  bookmarkedAt: string;
}

export interface ProviderHealthReport {
  providerId: string;
  name: string;
  endpoint: string;
  isEnabled: boolean;
  isAvailable: boolean;
  httpStatus: string | number;
  latencyMs: number;
  lastChecked: string;
  lastSuccessfulSync: string;
  failureCount: number;
  cacheTtlMinutes: number;
  rateLimitRemaining?: number;
  notes?: string;
}

export interface AdminMonitoringConfig {
  cacheDurationMinutes: number;
  providers: {
    samsungFota: boolean;
    samsungTestFota: boolean;
    appleIpsw: boolean;
    googleSheets: boolean;
  };
  lastSyncAt: string;
  rateLimitCooldownSeconds: number;
}

export interface SamsungSecurityBulletin {
  monthYear: string;           // e.g. October 2026
  bulletinReleaseDate: string; // e.g. 2026-10-07
  bulletinUrl: string;
  criticalCves: number;
  highCves: number;
  moderateCves: number;
  samsungSves: number;
  highlights: string[];
  affectedSubsystems: string[];
  scheduledDeviceTiers: {
    tier: SamsungSecurityScheduleTier;
    description: string;
    sampleModels: string[];
  }[];
}

export interface CscDirectoryEntry {
  csc: string;
  country: string;
  carrier: string;
  multiCscGroup: string;
  region: string;
  sampleCompatibleModels?: string[];
  verifiedDate?: string;
  notes?: string;
}

export type SamsungDeviceFamily =
  | 'Galaxy S'
  | 'Galaxy Z Fold'
  | 'Galaxy Z Flip'
  | 'Galaxy A'
  | 'Galaxy M'
  | 'Galaxy F'
  | 'Galaxy XCover'
  | 'Galaxy Note'
  | 'Galaxy Tab'
  | 'Galaxy J'
  | 'Galaxy C';

export interface SamsungCatalogueEntry {
  id: string;
  model: string;                      // Exact primary model number: e.g. SM-A556E, SM-S928B
  commercialName: string;             // e.g. Galaxy A55 5G, Galaxy S24 Ultra
  deviceFamily: SamsungDeviceFamily;
  releaseYear: number;
  modelVariants: string[];            // Regional model suffixes: ['SM-A556B', 'SM-A556E', 'SM-A5560', 'SM-A556U']
  supportedAndroidRange?: string;     // e.g. "Android 14 -> 17"
  supportedOneUiRange?: string;       // e.g. "One UI 6.1 -> 8.0"
  commonCscs: string[];               // e.g. ['XME', 'INS', 'EUX', 'BKD', 'THL', 'XXV']
  multiCscGroup: string;              // e.g. 'OXM'
  hasLiveFirmwareSupport: boolean;
  statusNotice?: string;
  aliases: string[];
}

export interface AppleCatalogueEntry {
  id: string;
  marketingName: string;              // e.g. iPhone 17 Pro Max, iPhone 16, iPhone SE (3rd generation)
  generation: string;                 // e.g. "17th Generation", "16th Generation"
  hardwareIdentifiers: string[];      // e.g. ['iPhone18,2']
  aModelNumbers: string[];            // e.g. ['A3295', 'A3296', 'A3297']
  releaseYear: number;
  supportedOsRange: string;           // e.g. "iOS 18.0 - iOS 27+"
  latestCompatibleOs: string;         // e.g. "iOS 27.0.1"
  latestBuildNumber?: string;         // e.g. "24A446"
  hasLiveFirmwareSupport: boolean;
  aliases: string[];
}

export interface SearchSuggestionItem {
  id: string;
  type: 'samsung_device' | 'samsung_csc' | 'apple_device' | 'combined';
  title: string;
  subtitle: string;
  model: string;
  csc?: string;
  commercialName: string;
  brand: 'samsung' | 'apple';
  badge: string;
  familyOrGeneration: string;
  highlightMatch?: string;
}

export interface SearchCatalogResponse {
  records: FirmwareRecord[];
  latestVerifiedRecord: FirmwareRecord | null;
  statusLabel: VerificationStatusLabel;
  matchedCsc?: CscDirectoryEntry;
  availableCscsForModel?: string[];
  isCscRequiredForSamsung?: boolean;
  verificationTimestamp: string;
  diagnostics: DeveloperDiagnostics;
  isCscOnlySearch?: boolean;
  recognizedCatalogueDevice?: SamsungCatalogueEntry | AppleCatalogueEntry | null;
  catalogueMatchNote?: string;
  compatibleModels?: string[];
}

export interface SearchFilterState {
  modelQuery: string;
  cscQuery: string;
  brandFilter: 'all' | 'samsung' | 'apple';
  appleReleaseType: 'all' | AppleReleaseType;
}

export interface NotificationSubscription {
  email: string;
  model: string;
  csc?: string;
  createdAt: string;
}

export interface HomepageUpdateWidgets {
  samsungLatestOneUi: {
    version: string;
    androidVersion: string;
    latestBuild: string;
    deviceModel: string;
    commercialName: string;
    applicableCsc: string;
    region: string;
    releaseDate: string;
    rolloutStatus: string;
    statusLabel: VerificationStatusLabel;
    sourceName: string;
    sourceUrl: string;
    verifiedAt: string;
  };
  samsungLatestSecurityPatch: {
    patchLevel: string;
    bulletinMonth: string;
    associatedBuild: string;
    deviceModel: string;
    commercialName: string;
    csc: string;
    releaseDate: string;
    scheduleTier: string;
    statusLabel: VerificationStatusLabel;
    bulletinUrl: string;
    verifiedAt: string;
  };
  samsungLatestVerifiedBuilds: Array<{
    model: string;
    commercialName: string;
    csc: string;
    cscRegion: string;
    latestPda: string;
    oneUiVersion: string;
    androidVersion: string;
    releaseDate: string;
    bootloaderRevision: number;
    statusLabel: VerificationStatusLabel;
  }>;
  appleLatestStableIos: {
    version: string;
    buildNumber: string;
    releaseDate: string;
    supportedDevices: string[];
    statusLabel: VerificationStatusLabel;
    sourceName: string;
    sourceUrl: string;
    verifiedAt: string;
  };
  appleLatestSecurityUpdate: {
    version: string;
    buildNumber: string;
    releaseDate: string;
    cveCount: string;
    keyFixes: string[];
    statusLabel: VerificationStatusLabel;
    sourceUrl: string;
    verifiedAt: string;
  };
}

export interface DeveloperDiagnostics {
  requestedModel: string;
  requestedCsc?: string;
  selectedProvider: string;
  httpStatus: number | string;
  returnedRecordsCount: number;
  cacheState: 'HIT' | 'MISS' | 'EXPIRED' | 'LIVE_DIRECT';
  latestCandidateBuild: string;
  selectedBuild: string;
  rejectionReason?: string;
  providerFetchedAt: string;
  verificationTimestamp: string;
  executionTimeMs?: number;
}


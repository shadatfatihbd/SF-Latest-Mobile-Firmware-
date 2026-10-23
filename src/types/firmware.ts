export type DeviceBrand = 'samsung' | 'apple';

export type RolloutStatus = 'confirmed' | 'rolling_out' | 'announced' | 'not_verified';

export type VerificationStatusLabel =
  | 'Verified Latest'
  | 'Officially Announced'
  | 'Rolling Out'
  | 'Cached — Refresh Failed'
  | 'Not Verified'
  | 'Latest build could not be verified';

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

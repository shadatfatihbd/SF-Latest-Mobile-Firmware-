/**
 * SF Latest Firmware - Google Sheets Schema & Google Apps Script Sync
 *
 * This file specifies the relational Google Sheets schema and standalone Google Apps Script
 * script to synchronize verified firmware releases automatically across 4 dedicated sheets:
 * 1. Samsung_Firmware
 * 2. Samsung_Security_Bulletins
 * 3. Apple_iOS_Releases
 * 4. Source_Verification_Metadata
 */

export const GOOGLE_SHEETS_SCHEMA = {
  sheetName: 'SF_Latest_Firmware_Sync',
  tabs: [
    {
      name: 'Samsung_Firmware',
      columns: [
        { header: 'Device Model', key: 'model', type: 'string', example: 'SM-A556E' },
        { header: 'Commercial Name', key: 'commercialName', type: 'string', example: 'Samsung Galaxy A55 5G' },
        { header: 'CSC Code', key: 'csc', type: 'string', example: 'XME' },
        { header: 'Region / Market', key: 'cscRegion', type: 'string', example: 'Malaysia' },
        { header: 'Multi-CSC Group', key: 'multiCscGroup', type: 'string', example: 'OXM' },
        { header: 'Latest PDA', key: 'latestPda', type: 'string', example: 'A556EXXS4AXK2' },
        { header: 'AP Build', key: 'apBuild', type: 'string', example: 'A556EXXS4AXK2' },
        { header: 'CP / Modem', key: 'cpBuild', type: 'string', example: 'A556EXXS4AXK1' },
        { header: 'CSC Build', key: 'cscBuild', type: 'string', example: 'A556EOXM4AXK2' },
        { header: 'Android Version', key: 'androidVersion', type: 'string', example: '14' },
        { header: 'One UI Version', key: 'oneUiVersion', type: 'string', example: '6.1' },
        { header: 'Security Patch Level', key: 'securityPatchLevel', type: 'string', example: '2026-10-01' },
        { header: 'Security Schedule', key: 'securitySchedule', type: 'string', example: 'Monthly' },
        { header: 'Release Date', key: 'releaseDate', type: 'string', example: '2026-10-18' },
        { header: 'Bootloader Rev', key: 'bootloaderRevision', type: 'number', example: 4 },
        { header: 'Rollout Status', key: 'rolloutStatus', type: 'string', example: 'rolling_out' },
        { header: 'Verification Label', key: 'statusLabel', type: 'string', example: 'Verified Latest' },
        { header: 'Official Source URL', key: 'officialSourceUrl', type: 'string', example: 'https://doc.samsungmobile.com/SM-A556E/XME/doc.html' },
        { header: 'Verified Timestamp', key: 'verifiedAt', type: 'string', example: '2026-10-22T19:30:00Z' }
      ]
    },
    {
      name: 'Samsung_Security_Bulletins',
      columns: [
        { header: 'Bulletin Month', key: 'monthYear', type: 'string', example: 'October 2026' },
        { header: 'Bulletin Date', key: 'bulletinReleaseDate', type: 'string', example: '2026-10-07' },
        { header: 'Critical CVEs', key: 'criticalCves', type: 'number', example: 2 },
        { header: 'High CVEs', key: 'highCves', type: 'number', example: 28 },
        { header: 'Samsung SVEs', key: 'samsungSves', type: 'number', example: 30 },
        { header: 'Key Highlights', key: 'highlights', type: 'string', example: 'Baseband memory corruption SVE-2026-1002' },
        { header: 'Affected Subsystems', key: 'affectedSubsystems', type: 'string', example: 'Qualcomm DSP, Exynos Modem, Knox Core' },
        { header: 'Official Bulletin URL', key: 'bulletinUrl', type: 'string', example: 'https://security.samsungmobile.com/securityUpdate.smsb' }
      ]
    },
    {
      name: 'Apple_iOS_Releases',
      columns: [
        { header: 'Device Model', key: 'model', type: 'string', example: 'iPhone 17 Pro Max' },
        { header: 'Model Identifier', key: 'modelIdentifier', type: 'string', example: 'A3295' },
        { header: 'Latest OS Version', key: 'latestOsVersion', type: 'string', example: '18.2' },
        { header: 'Release Channel', key: 'releaseType', type: 'string', example: 'public' },
        { header: 'Build Number', key: 'buildNumber', type: 'string', example: '22C152' },
        { header: 'Release Date', key: 'releaseDate', type: 'string', example: '2026-10-15' },
        { header: 'Package Size', key: 'packageSize', type: 'string', example: '2.14 GB' },
        { header: 'Verification Label', key: 'statusLabel', type: 'string', example: 'Verified Latest' },
        { header: 'Official Release Notes URL', key: 'officialReleaseNotesUrl', type: 'string', example: 'https://support.apple.com/en-us/HT214080' },
        { header: 'Official Security URL', key: 'officialSecurityUrl', type: 'string', example: 'https://support.apple.com/en-us/HT201222' },
        { header: 'Verified Timestamp', key: 'verifiedAt', type: 'string', example: '2026-10-22T22:00:00Z' }
      ]
    },
    {
      name: 'Source_Verification_Metadata',
      columns: [
        { header: 'Source Name', key: 'sourceName', type: 'string', example: 'Samsung doc.samsungmobile.com' },
        { header: 'Provider Adapter', key: 'adapter', type: 'string', example: 'SamsungFotaFeedAdapter' },
        { header: 'Target Platform', key: 'platform', type: 'string', example: 'Samsung One UI / FOTA' },
        { header: 'Cache Expiration (TTL)', key: 'ttl', type: 'string', example: '3600 seconds' },
        { header: 'Last Refresh Status', key: 'status', type: 'string', example: 'Verified Active' },
        { header: 'Last Successful Check', key: 'lastChecked', type: 'string', example: '2026-10-22T22:30:00Z' }
      ]
    }
  ]
};

export const SAMPLE_GOOGLE_APPS_SCRIPT = `/**
 * SF Latest Firmware - Google Apps Script Automator (Multi-Sheet Sync)
 *
 * Setup:
 * 1. Open Google Sheets > Extensions > Apps Script.
 * 2. Replace Code.gs with this script.
 * 3. Run 'setupSheets()' once to build headers.
 * 4. Run 'syncFirmwareFromSfPlatform()' or set a Time-driven trigger (hourly/daily).
 */

const BASE_API = 'https://ais-dev-s6se33bs5rsr5d7o5quhl2-916472862963.asia-east1.run.app';

function setupSheets() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // 1. Samsung Firmware Tab
  let samsungSheet = ss.getSheetByName('Samsung_Firmware');
  if (!samsungSheet) samsungSheet = ss.insertSheet('Samsung_Firmware');
  samsungSheet.clear();
  samsungSheet.appendRow([
    'Device Model', 'Commercial Name', 'CSC Code', 'Region / Market', 'Multi-CSC Group',
    'Latest PDA', 'AP Build', 'CP / Modem', 'CSC Build', 'Android Version',
    'One UI Version', 'Security Patch Level', 'Security Schedule', 'Release Date',
    'Bootloader Rev', 'Rollout Status', 'Verification Label', 'Official Source URL', 'Verified Timestamp'
  ]);
  samsungSheet.getRange(1, 1, 1, 19).setFontWeight('bold').setBackground('#0078d4').setFontColor('#ffffff');

  // 2. Samsung Security Bulletins Tab
  let securitySheet = ss.getSheetByName('Samsung_Security_Bulletins');
  if (!securitySheet) securitySheet = ss.insertSheet('Samsung_Security_Bulletins');
  securitySheet.clear();
  securitySheet.appendRow([
    'Bulletin Month', 'Bulletin Date', 'Critical CVEs', 'High CVEs',
    'Samsung SVEs', 'Key Highlights', 'Affected Subsystems', 'Official Bulletin URL'
  ]);
  securitySheet.getRange(1, 1, 1, 8).setFontWeight('bold').setBackground('#107c41').setFontColor('#ffffff');

  // 3. Apple iOS Releases Tab
  let appleSheet = ss.getSheetByName('Apple_iOS_Releases');
  if (!appleSheet) appleSheet = ss.insertSheet('Apple_iOS_Releases');
  appleSheet.clear();
  appleSheet.appendRow([
    'Device Model', 'Model Identifier', 'Latest OS Version', 'Release Channel',
    'Build Number', 'Release Date', 'Package Size', 'Verification Label',
    'Official Release Notes URL', 'Official Security URL', 'Verified Timestamp'
  ]);
  appleSheet.getRange(1, 1, 1, 11).setFontWeight('bold').setBackground('#5c2d91').setFontColor('#ffffff');

  // 4. Source Verification Metadata Tab
  let metaSheet = ss.getSheetByName('Source_Verification_Metadata');
  if (!metaSheet) metaSheet = ss.insertSheet('Source_Verification_Metadata');
  metaSheet.clear();
  metaSheet.appendRow([
    'Source Name', 'Provider Adapter', 'Target Platform', 'Cache Expiration (TTL)',
    'Last Refresh Status', 'Last Successful Check'
  ]);
  metaSheet.getRange(1, 1, 1, 6).setFontWeight('bold').setBackground('#333333').setFontColor('#ffffff');
}

function syncFirmwareFromSfPlatform() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let samsungSheet = ss.getSheetByName('Samsung_Firmware');
  let appleSheet = ss.getSheetByName('Apple_iOS_Releases');
  let securitySheet = ss.getSheetByName('Samsung_Security_Bulletins');
  let metaSheet = ss.getSheetByName('Source_Verification_Metadata');
  
  if (!samsungSheet || !appleSheet || !securitySheet || !metaSheet) {
    setupSheets();
    samsungSheet = ss.getSheetByName('Samsung_Firmware');
    appleSheet = ss.getSheetByName('Apple_iOS_Releases');
    securitySheet = ss.getSheetByName('Samsung_Security_Bulletins');
    metaSheet = ss.getSheetByName('Source_Verification_Metadata');
  }

  // Fetch recent updates
  const recentUrl = BASE_API + '/api/firmware/recent';
  const response = UrlFetchApp.fetch(recentUrl, { muteHttpExceptions: true });
  if (response.getResponseCode() !== 200) {
    Logger.log('Failed to fetch from SF Latest Firmware: ' + response.getContentText());
    return;
  }

  const data = JSON.parse(response.getContentText());
  const updates = data.recentUpdates || [];

  // Clear rows below header
  if (samsungSheet.getLastRow() > 1) {
    samsungSheet.getRange(2, 1, samsungSheet.getLastRow() - 1, 19).clearContent();
  }
  if (appleSheet.getLastRow() > 1) {
    appleSheet.getRange(2, 1, appleSheet.getLastRow() - 1, 11).clearContent();
  }

  updates.forEach(item => {
    if (item.brand === 'samsung') {
      samsungSheet.appendRow([
        item.model, item.commercialName, item.csc, item.cscRegion, item.multiCscGroup,
        item.latestPda, item.apBuild, item.cpBuild, item.cscBuild, item.androidVersion,
        item.oneUiVersion, item.securityPatchLevel, item.securitySchedule || 'Monthly',
        item.releaseDate, item.bootloaderRevision, item.rolloutStatus, item.statusLabel || 'Verified Latest',
        item.officialSourceUrl, item.verifiedAt
      ]);
    } else if (item.brand === 'apple') {
      appleSheet.appendRow([
        item.model, item.modelIdentifier, item.latestOsVersion, item.releaseType,
        item.buildNumber, item.releaseDate, item.packageSize, item.statusLabel || 'Verified Latest',
        item.officialReleaseNotesUrl, item.officialSecurityUrl, item.verifiedAt
      ]);
    }
  });

  // Log metadata
  metaSheet.appendRow([
    'SF Latest Firmware Engine', 'FirmwareService Multi-Adapter', 'All Devices',
    '3600s (Hourly)', 'Verified Sync Success', new Date().toISOString()
  ]);

  Logger.log('SF Firmware successfully synchronized at ' + new Date().toISOString());
}
`;

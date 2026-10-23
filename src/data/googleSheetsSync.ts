/**
 * SF Latest Mobile Firmware - Google Sheets Schema & Google Apps Script Sync
 *
 * Implements the normalized 8-sheet relational architecture:
 * 1. Devices
 * 2. CSC_Catalog
 * 3. Firmware_Releases
 * 4. Test_Firmware
 * 5. Apple_Releases
 * 6. Update_Announcements
 * 7. Source_Status
 * 8. Sync_Logs
 */

export const GOOGLE_SHEETS_SCHEMA = {
  sheetName: 'SF_Latest_Firmware_Database',
  version: '3.0.0',
  description: 'Relational Google Sheets storage schema for SF Latest Mobile Firmware live sync.',
  tabs: [
    {
      name: 'Devices',
      description: 'Maintained hardware catalogue of Samsung Galaxy devices and Apple iPhones.',
      columns: [
        { header: 'Device ID', key: 'id', type: 'string', example: 'sam-a55' },
        { header: 'Manufacturer', key: 'brand', type: 'string', example: 'Samsung' },
        { header: 'Commercial Name', key: 'commercialName', type: 'string', example: 'Galaxy A55 5G' },
        { header: 'Model Number', key: 'model', type: 'string', example: 'SM-A556E' },
        { header: 'Device Family', key: 'deviceFamily', type: 'string', example: 'Galaxy A' },
        { header: 'Release Year', key: 'releaseYear', type: 'number', example: 2024 },
        { header: 'Supported OS Range', key: 'supportedOsRange', type: 'string', example: 'Android 14 -> 17' },
        { header: 'Primary CSC / Identifier', key: 'primaryIdentifier', type: 'string', example: 'XME' },
        { header: 'Last Verified', key: 'lastVerifiedAt', type: 'string', example: '2026-10-23T01:30:00Z' },
      ],
    },
    {
      name: 'CSC_Catalog',
      description: 'Worldwide Samsung sales codes, carrier mappings, and multi-CSC bundles.',
      columns: [
        { header: 'CSC Code', key: 'csc', type: 'string', example: 'XME' },
        { header: 'Country / Market', key: 'country', type: 'string', example: 'Malaysia' },
        { header: 'Region', key: 'region', type: 'string', example: 'Southeast Asia' },
        { header: 'Multi-CSC Group', key: 'multiCscGroup', type: 'string', example: 'OLM' },
        { header: 'Carrier Designation', key: 'carrier', type: 'string', example: 'Open Market / Unlocked' },
        { header: 'Sample Compatible Models', key: 'compatibleModels', type: 'string', example: 'SM-A556E, SM-S928B' },
        { header: 'Verification Date', key: 'verifiedDate', type: 'string', example: '2026-10-23' },
      ],
    },
    {
      name: 'Firmware_Releases',
      description: 'Verified stable public firmware releases with exact PDA, AP, CP, and security patch levels.',
      columns: [
        { header: 'Record ID', key: 'id', type: 'string', example: 'samsung-sm-a556e-xme' },
        { header: 'Device Model', key: 'model', type: 'string', example: 'SM-A556E' },
        { header: 'CSC Code', key: 'csc', type: 'string', example: 'XME' },
        { header: 'PDA / AP Build', key: 'latestPda', type: 'string', example: 'A556EXXS4AXK2' },
        { header: 'CP / Baseband', key: 'cpBuild', type: 'string', example: 'A556EXXS4AXK1' },
        { header: 'CSC Package Build', key: 'cscBuild', type: 'string', example: 'A556EOXM4AXK2' },
        { header: 'Android Version', key: 'androidVersion', type: 'string', example: '14' },
        { header: 'One UI Version', key: 'oneUiVersion', type: 'string', example: '6.1' },
        { header: 'Security Patch Level', key: 'securityPatchLevel', type: 'string', example: '2026-10-01' },
        { header: 'Bootloader Revision', key: 'bootloaderRevision', type: 'number', example: 4 },
        { header: 'Release Date', key: 'releaseDate', type: 'string', example: '2026-10-18' },
        { header: 'Classification', key: 'classification', type: 'string', example: 'Official / Released' },
        { header: 'Freshness Status', key: 'freshnessStatus', type: 'string', example: 'LIVE' },
        { header: 'Source Name', key: 'sourceName', type: 'string', example: 'Samsung Official FOTA Gateway' },
        { header: 'Official Source URL', key: 'officialSourceUrl', type: 'string', example: 'https://doc.samsungmobile.com/SM-A556E/XME/doc.html' },
        { header: 'Last Checked', key: 'lastCheckedAt', type: 'string', example: '2026-10-23T01:30:00Z' },
        { header: 'Last Successful Update', key: 'lastSuccessfulUpdateAt', type: 'string', example: '2026-10-23T01:30:00Z' },
      ],
    },
    {
      name: 'Test_Firmware',
      description: 'Candidate test builds detected on official test servers prior to public deployment.',
      columns: [
        { header: 'Test ID', key: 'id', type: 'string', example: 'up-samsung-live-test-sm-a556e-eux' },
        { header: 'Device Model', key: 'deviceModel', type: 'string', example: 'SM-A556E' },
        { header: 'CSC / Region', key: 'regionOrCsc', type: 'string', example: 'EUX (Regional Test Branch)' },
        { header: 'Candidate Hashes Count', key: 'testingHashCount', type: 'number', example: 42 },
        { header: 'Classification', key: 'classification', type: 'string', example: 'Testing / Test Firmware' },
        { header: 'Evidence Source', key: 'evidenceSource', type: 'string', example: 'Samsung FOTA Internal Test Server (version.test.xml)' },
        { header: 'Evidence URL', key: 'evidenceUrl', type: 'string', example: 'https://fota-cloud-dn.ospserver.net/firmware/EUX/SM-A556E/version.test.xml' },
        { header: 'Mandatory Disclaimer', key: 'disclaimer', type: 'string', example: 'Test firmware is not necessarily publicly released or installable. Availability and rollout may change.' },
        { header: 'Verified Timestamp', key: 'verifiedAt', type: 'string', example: '2026-10-23T01:30:00Z' },
      ],
    },
    {
      name: 'Apple_Releases',
      description: 'Official signed Apple IPSW and OTA software updates for iPhone hardware.',
      columns: [
        { header: 'Device Model', key: 'model', type: 'string', example: 'iPhone 17 Pro Max' },
        { header: 'Model Identifier / A-Code', key: 'modelIdentifier', type: 'string', example: 'A3295 (iPhone18,2)' },
        { header: 'Latest iOS Version', key: 'latestOsVersion', type: 'string', example: '27.0.1' },
        { header: 'Build Number', key: 'buildNumber', type: 'string', example: '24A446' },
        { header: 'Release Channel', key: 'releaseType', type: 'string', example: 'public' },
        { header: 'Signed by Apple', key: 'signed', type: 'boolean', example: true },
        { header: 'Release Date', key: 'releaseDate', type: 'string', example: '2026-09-28' },
        { header: 'Package Size', key: 'packageSize', type: 'string', example: '11.84 GB' },
        { header: 'Classification', key: 'classification', type: 'string', example: 'Official / Released' },
        { header: 'Freshness Status', key: 'freshnessStatus', type: 'string', example: 'LIVE' },
        { header: 'Security Advisory URL', key: 'officialSecurityUrl', type: 'string', example: 'https://support.apple.com/en-us/HT201222' },
        { header: 'Last Checked', key: 'lastCheckedAt', type: 'string', example: '2026-10-23T01:30:00Z' },
      ],
    },
    {
      name: 'Update_Announcements',
      description: 'Officially announced upgrades, beta releases, and verified manufacturer roadmaps.',
      columns: [
        { header: 'Announcement ID', key: 'id', type: 'string', example: 'up-samsung-s24-oneui7' },
        { header: 'Brand', key: 'brand', type: 'string', example: 'Samsung' },
        { header: 'Device Model / Family', key: 'deviceModel', type: 'string', example: 'Galaxy S24 Series' },
        { header: 'Expected Version', key: 'expectedVersion', type: 'string', example: 'One UI 7.0' },
        { header: 'Expected Android / Base OS', key: 'expectedAndroidVersion', type: 'string', example: 'Android 15' },
        { header: 'Expected Release Window', key: 'expectedReleaseWindow', type: 'string', example: 'Q4 2026' },
        { header: 'Category', key: 'category', type: 'string', example: 'announcement' },
        { header: 'Evidence Source', key: 'evidenceSource', type: 'string', example: 'Samsung Developer Conference (SDC 2026)' },
        { header: 'Verified Timestamp', key: 'verifiedAt', type: 'string', example: '2026-10-23T01:30:00Z' },
      ],
    },
    {
      name: 'Source_Status',
      description: 'Health, latency, failure count, and connectivity status for all configured providers.',
      columns: [
        { header: 'Provider ID', key: 'providerId', type: 'string', example: 'samsung_fota' },
        { header: 'Provider Name', key: 'name', type: 'string', example: 'Samsung FOTA Live Gateway' },
        { header: 'Endpoint', key: 'endpoint', type: 'string', example: 'fota-cloud-dn.ospserver.net' },
        { header: 'Enabled', key: 'isEnabled', type: 'boolean', example: true },
        { header: 'Available', key: 'isAvailable', type: 'boolean', example: true },
        { header: 'HTTP Status', key: 'httpStatus', type: 'string', example: '200 OK' },
        { header: 'Latency (ms)', key: 'latencyMs', type: 'number', example: 120 },
        { header: 'Cache TTL (min)', key: 'cacheTtlMinutes', type: 'number', example: 30 },
        { header: 'Last Checked', key: 'lastChecked', type: 'string', example: '2026-10-23T01:30:00Z' },
        { header: 'Last Successful Sync', key: 'lastSuccessfulSync', type: 'string', example: '2026-10-23T01:30:00Z' },
      ],
    },
    {
      name: 'Sync_Logs',
      description: 'Operational audit trail of all synchronization events, items synced, and error reports.',
      columns: [
        { header: 'Log ID', key: 'id', type: 'string', example: 'log-1729647000' },
        { header: 'Timestamp', key: 'timestamp', type: 'string', example: '2026-10-23T01:30:00Z' },
        { header: 'Action', key: 'action', type: 'string', example: 'AUTOMATED_SYNC' },
        { header: 'Target Entity', key: 'entity', type: 'string', example: 'ALL_TABS' },
        { header: 'Status', key: 'status', type: 'string', example: 'SUCCESS' },
        { header: 'Items Synced', key: 'itemsSynced', type: 'number', example: 142 },
        { header: 'Execution Duration (ms)', key: 'durationMs', type: 'number', example: 840 },
        { header: 'Error Details', key: 'errorMessage', type: 'string', example: '' },
      ],
    },
  ],
};

export const SAMPLE_GOOGLE_APPS_SCRIPT = `/**
 * SF Latest Mobile Firmware - Google Apps Script Automator (8-Sheet Relational Sync)
 *
 * Setup:
 * 1. Open Google Sheets > Extensions > Apps Script.
 * 2. Replace Code.gs with this script.
 * 3. Run 'setupAllSheets()' once to build headers.
 * 4. Run 'syncFirmwareDatabase()' or configure a Time-driven trigger (hourly/daily).
 */

const BASE_API = 'https://ais-dev-s6se33bs5rsr5d7o5quhl2-916472862963.asia-east1.run.app';

function setupAllSheets() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const res = UrlFetchApp.fetch(BASE_API + '/api/sync/schema');
  const schema = JSON.parse(res.getContentText());

  schema.tabs.forEach(tab => {
    let sheet = ss.getSheetByName(tab.name);
    if (!sheet) sheet = ss.insertSheet(tab.name);
    sheet.clear();

    const headers = tab.columns.map(c => c.header);
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold').setBackground('#0284c7').setFontColor('#ffffff');
    sheet.setFrozenRows(1);
  });

  Logger.log('Successfully initialized all 8 sheets.');
}

function syncFirmwareDatabase() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const startTime = new Date().getTime();

  try {
    const res = UrlFetchApp.fetch(BASE_API + '/api/sync/export');
    const data = JSON.parse(res.getContentText());

    if (!data.success) {
      throw new Error(data.error || 'Failed to export database payload');
    }

    // Populate each tab
    Object.keys(data.sheets).forEach(sheetName => {
      const sheet = ss.getSheetByName(sheetName);
      if (sheet && data.sheets[sheetName]?.rows) {
        // Retain header row
        const lastRow = sheet.getLastRow();
        if (lastRow > 1) {
          sheet.getRange(2, 1, lastRow - 1, sheet.getLastColumn()).clearContent();
        }
        const rows = data.sheets[sheetName].rows;
        if (rows.length > 0) {
          sheet.getRange(2, 1, rows.length, rows[0].length).setValues(rows);
        }
      }
    });

    // Record Sync Log
    const logSheet = ss.getSheetByName('Sync_Logs');
    if (logSheet) {
      logSheet.appendRow([
        'log-' + startTime,
        new Date().toISOString(),
        'SCHEDULED_SYNC',
        'ALL_8_TABS',
        'SUCCESS',
        data.totalItemsSynced || 0,
        new Date().getTime() - startTime,
        ''
      ]);
    }
  } catch (err) {
    Logger.log('Sync Error: ' + err.message);
    const logSheet = ss.getSheetByName('Sync_Logs');
    if (logSheet) {
      logSheet.appendRow([
        'log-' + startTime,
        new Date().toISOString(),
        'SCHEDULED_SYNC',
        'ALL_8_TABS',
        'FAILED',
        0,
        new Date().getTime() - startTime,
        err.message
      ]);
    }
  }
}
`;

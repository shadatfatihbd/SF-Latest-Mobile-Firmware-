import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { FirmwareService } from './src/server/adapters/FirmwareAdapter.ts';
import { GOOGLE_SHEETS_SCHEMA, SAMPLE_GOOGLE_APPS_SCRIPT } from './src/data/googleSheetsSync.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const firmwareService = new FirmwareService();

app.use(express.json());

// In-memory alert subscriptions
const emailSubscriptions: Array<{ email: string; model: string; csc?: string; createdAt: string }> = [];

// API: Homepage Update Widgets (5 Prominent Cards)
app.get('/api/firmware/widgets', (_req, res) => {
  try {
    const widgets = firmwareService.getHomepageWidgets();
    res.json({
      success: true,
      widgets,
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// API: Firmware & Security Update Center Dashboard (Unified 3-Section Payload)
app.get('/api/firmware/dashboard', async (_req, res) => {
  try {
    const dashboardData = await firmwareService.getDashboardData();
    res.json({
      success: true,
      dashboard: dashboardData,
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// API: Upcoming Firmware Updates (Officially Announced, Betas, Internal Testing, Predictions)
app.get('/api/firmware/upcoming', async (req, res) => {
  try {
    const model = (req.query.model as string) || '';
    const brand = (req.query.brand as 'samsung' | 'apple') || undefined;
    const category = (req.query.category as string) || undefined;
    const csc = (req.query.csc as string) || undefined;

    const data = await firmwareService.getUpcomingFirmware({ model, brand, category, csc });
    res.json({
      success: true,
      records: data.records,
      count: data.records.length,
      hasUpcomingEvidence: data.hasUpcomingEvidence,
      notice: data.notice,
      categorized: data.categorized,
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// API: Security Update Calendar (Monthly, Quarterly, Biannual Schedules & Bulletins)
app.get('/api/firmware/security-calendar', (req, res) => {
  try {
    const manufacturer = (req.query.manufacturer as string) || undefined;
    const tier = (req.query.tier as string) || undefined;

    const calendar = firmwareService.getSecurityCalendar({ manufacturer, tier });
    res.json({
      success: true,
      calendar,
      count: calendar.length,
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// API: Samsung Security Bulletin details & schedule tiers
app.get('/api/firmware/bulletin', (_req, res) => {
  try {
    const bulletin = firmwareService.getSecurityBulletin();
    res.json({
      success: true,
      bulletin,
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// API: Search Firmware with Latest-Build selection
app.get('/api/firmware/search', async (req, res) => {
  try {
    const model = (req.query.model as string) || '';
    const csc = (req.query.csc as string) || '';
    const brand = (req.query.brand as 'samsung' | 'apple') || undefined;

    const result = await firmwareService.searchCatalog({ model, csc, brand });
    res.json({
      success: true,
      query: { model, csc, brand },
      count: result.records.length,
      records: result.records,
      latestVerifiedRecord: result.latestVerifiedRecord,
      statusLabel: result.statusLabel,
      matchedCsc: result.matchedCsc,
      availableCscsForModel: result.availableCscsForModel,
      isCscRequiredForSamsung: result.isCscRequiredForSamsung,
      verificationTimestamp: result.verificationTimestamp,
      diagnostics: result.diagnostics,
      isCscOnlySearch: result.isCscOnlySearch,
      recognizedCatalogueDevice: result.recognizedCatalogueDevice,
      catalogueMatchNote: result.catalogueMatchNote,
      compatibleModels: result.compatibleModels,
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// API: Device details by model
app.get('/api/firmware/device/:model', async (req, res) => {
  try {
    const rawModel = req.params.model;
    const csc = (req.query.csc as string) || '';
    const result = await firmwareService.searchCatalog({ model: rawModel, csc });

    if (result.records.length === 0) {
      res.status(404).json({
        success: false,
        statusLabel: 'Latest build could not be verified',
        message: `Device model ${rawModel} not found in verified database.`,
        diagnostics: result.diagnostics
      });
      return;
    }

    res.json({
      success: true,
      device: result.latestVerifiedRecord || result.records[0],
      variants: result.records,
      statusLabel: result.statusLabel,
      availableCscs: result.availableCscsForModel || [],
      matchedCsc: result.matchedCsc,
      verificationTimestamp: result.verificationTimestamp,
      diagnostics: result.diagnostics
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// API: Live Verification using Google Search Grounding with Gemini 3.8 Flash
app.post('/api/firmware/live-verify', async (req, res) => {
  try {
    const { model, csc, brand } = req.body;
    if (!model) {
      res.status(400).json({ success: false, error: 'Model parameter is required for live verification.' });
      return;
    }

    const verificationResult = await firmwareService.liveVerifyWithGrounding({ model, csc, brand });
    res.json({
      success: true,
      result: verificationResult
    });
  } catch (error: any) {
    console.error('Error during live verify endpoint:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// API: Manual Data Refresh Endpoint
app.post('/api/firmware/refresh', async (req, res) => {
  try {
    const { model, csc } = req.body || {};
    const refreshResult = await firmwareService.refreshProviderData(model, csc);
    res.json({
      success: refreshResult.success,
      refreshedAt: refreshResult.refreshedAt,
      message: refreshResult.message
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// API: Recent Verified Updates Stream
app.get('/api/firmware/recent', (_req, res) => {
  try {
    const recent = firmwareService.getRecentUpdates();
    res.json({
      success: true,
      recentUpdates: recent,
      totalCount: recent.length,
      lastUpdated: new Date().toISOString()
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// API: CSC Directory
app.get('/api/csc/all', (_req, res) => {
  try {
    const cscList = firmwareService.getCscDirectory();
    res.json({
      success: true,
      count: cscList.length,
      cscDirectory: cscList
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// API: Universal Search Autocomplete Suggestions
app.get('/api/catalogue/search', (req, res) => {
  try {
    const q = (req.query.q as string) || '';
    const suggestions = firmwareService.getSuggestions(q);
    res.json({
      success: true,
      query: q,
      ...suggestions,
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// API: Samsung Galaxy Catalogue
app.get('/api/catalogue/samsung', (req, res) => {
  try {
    const family = (req.query.family as string) || undefined;
    const devices = firmwareService.getSamsungCatalogue(family);
    res.json({
      success: true,
      family: family || 'all',
      count: devices.length,
      devices,
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// API: Apple iPhone Catalogue
app.get('/api/catalogue/apple', (_req, res) => {
  try {
    const devices = firmwareService.getAppleCatalogue();
    res.json({
      success: true,
      count: devices.length,
      devices,
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// API: Catalogue Metadata
app.get('/api/catalogue/metadata', (_req, res) => {
  try {
    const metadata = firmwareService.getCatalogueMetadata();
    res.json({
      success: true,
      metadata,
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// API: Subscribe for Update Notifications
app.post('/api/alerts/subscribe', (req, res) => {
  try {
    const { email, model, csc } = req.body;
    if (!email || !email.includes('@')) {
      res.status(400).json({ success: false, error: 'Valid email address required.' });
      return;
    }
    if (!model) {
      res.status(400).json({ success: false, error: 'Device model is required.' });
      return;
    }

    const subscription = {
      email,
      model,
      csc: csc || undefined,
      createdAt: new Date().toISOString()
    };
    emailSubscriptions.push(subscription);

    res.json({
      success: true,
      message: `Successfully subscribed ${email} to firmware updates for ${model}${csc ? ` (${csc})` : ''}.`,
      subscription
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// API: Google Sheets Schema & Apps Script Template
app.get('/api/sheets/template', (_req, res) => {
  res.json({
    success: true,
    schema: GOOGLE_SHEETS_SCHEMA,
    appsScript: SAMPLE_GOOGLE_APPS_SCRIPT
  });
});

// SEO: Sitemap.xml
app.get('/sitemap.xml', (_req, res) => {
  const baseUrl = process.env.APP_URL || 'https://ais-dev-s6se33bs5rsr5d7o5quhl2-916472862963.asia-east1.run.app';
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <changefreq>hourly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/samsung</loc>
    <changefreq>hourly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/apple</loc>
    <changefreq>hourly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/history</loc>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/about</loc>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>${baseUrl}/privacy</loc>
    <changefreq>monthly</changefreq>
    <priority>0.3</priority>
  </url>
</urlset>`;
  res.header('Content-Type', 'application/xml');
  res.send(xml);
});

// SEO: Robots.txt
app.get('/robots.txt', (_req, res) => {
  const baseUrl = process.env.APP_URL || 'https://ais-dev-s6se33bs5rsr5d7o5quhl2-916472862963.asia-east1.run.app';
  res.type('text/plain');
  res.send(`User-agent: *\nAllow: /\nSitemap: ${baseUrl}/sitemap.xml\n`);
});

// Mount Vite or serve static files
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`SF Latest Firmware server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();

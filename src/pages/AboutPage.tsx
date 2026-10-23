import React, { useState } from 'react';
import { SAMPLE_GOOGLE_APPS_SCRIPT, GOOGLE_SHEETS_SCHEMA } from '../data/googleSheetsSync';
import { ShieldCheck, Database, Code, Copy, Check, ExternalLink, Sparkles, Server } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const [copiedScript, setCopiedScript] = useState(false);

  const handleCopyScript = () => {
    navigator.clipboard.writeText(SAMPLE_GOOGLE_APPS_SCRIPT);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8 text-left">
      {/* Title */}
      <div className="fluent-acrylic rounded-2xl p-6 sm:p-8 border border-white/60 dark:border-white/10 space-y-3">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
          About SF Latest Firmware
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
          SF Latest Firmware is an independent engineering platform providing verified firmware, software update tracking, and security patch intelligence for Samsung Galaxy and Apple iPhone devices.
        </p>
      </div>

      {/* Core Principles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="fluent-acrylic rounded-2xl p-6 border border-white/50 dark:border-white/10 space-y-2">
          <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center mb-3">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            100% Grounded Accuracy
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            We never fabricate update releases, invent build numbers, or display fake download links. Every entry is cross-checked against official manufacturer release notes.
          </p>
        </div>

        <div className="fluent-acrylic rounded-2xl p-6 border border-white/50 dark:border-white/10 space-y-2">
          <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center mb-3">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Live Search Grounding
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Integrated with Gemini 3.8 Flash and real-time Google Search Grounding to monitor Samsung Newsroom bulletins and Apple Developer channels.
          </p>
        </div>

        <div className="fluent-acrylic rounded-2xl p-6 border border-white/50 dark:border-white/10 space-y-2">
          <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center mb-3">
            <Server className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Adapter-Based Architecture
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Modular data providers allow plugging in Google Sheets synchronization, manufacturer FOTA feeds, or external firmware metadata APIs effortlessly.
          </p>
        </div>
      </div>

      {/* Official Sources Citation */}
      <div className="fluent-acrylic rounded-2xl p-6 sm:p-8 border border-white/60 dark:border-white/10 space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
          Authoritative Data Sources
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-100/60 dark:bg-slate-800/40 border border-slate-200/40 dark:border-white/5 space-y-2">
            <h4 className="font-bold text-slate-800 dark:text-slate-200">Samsung Mobile Ecosystem</h4>
            <ul className="space-y-1.5 text-slate-600 dark:text-slate-400">
              <li>• <a href="https://doc.samsungmobile.com/" target="_blank" rel="noreferrer" className="text-sky-600 hover:underline inline-flex items-center gap-1">doc.samsungmobile.com <ExternalLink className="w-3 h-3" /></a> (Official FOTA Notes)</li>
              <li>• <a href="https://security.samsungmobile.com/" target="_blank" rel="noreferrer" className="text-sky-600 hover:underline inline-flex items-center gap-1">security.samsungmobile.com <ExternalLink className="w-3 h-3" /></a> (Security Bulletins)</li>
              <li>• Samsung Global Newsroom One UI Release Announcements</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-slate-100/60 dark:bg-slate-800/40 border border-slate-200/40 dark:border-white/5 space-y-2">
            <h4 className="font-bold text-slate-800 dark:text-slate-200">Apple Inc. Ecosystem</h4>
            <ul className="space-y-1.5 text-slate-600 dark:text-slate-400">
              <li>• <a href="https://support.apple.com/en-us/HT201222" target="_blank" rel="noreferrer" className="text-sky-600 hover:underline inline-flex items-center gap-1">Apple Security Releases <ExternalLink className="w-3 h-3" /></a> (CVE Advisories)</li>
              <li>• <a href="https://support.apple.com/en-us/HT214080" target="_blank" rel="noreferrer" className="text-sky-600 hover:underline inline-flex items-center gap-1">iOS Release Notes <ExternalLink className="w-3 h-3" /></a> (Public Updates)</li>
              <li>• Apple Developer News & SDK Releases</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Google Sheets Schema & Google Apps Script Sync */}
      <div className="fluent-acrylic rounded-2xl p-6 sm:p-8 border border-white/60 dark:border-white/10 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Database className="w-5 h-5 text-sky-500" />
              <span>Google Sheets & Google Apps Script Integration</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Automate firmware tracking directly into your enterprise or personal Google Spreadsheet.
            </p>
          </div>

          <button
            onClick={handleCopyScript}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-500 rounded-xl transition-colors shrink-0 shadow-sm"
          >
            {copiedScript ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedScript ? 'Copied Code!' : 'Copy Apps Script'}</span>
          </button>
        </div>

        {/* Tab Schema summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          {GOOGLE_SHEETS_SCHEMA.tabs.map((tab) => (
            <div key={tab.name} className="p-3 rounded-xl bg-slate-100/70 dark:bg-slate-800/50 border border-slate-200/50 dark:border-white/5 space-y-1">
              <div className="font-bold text-sky-600 dark:text-sky-400 font-mono">Tab: {tab.name}</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">
                {tab.columns.length} columns defined ({tab.columns.map((c) => c.header).slice(0, 3).join(', ')}...)
              </div>
            </div>
          ))}
        </div>

        {/* Code preview block */}
        <div className="relative rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-950 text-slate-200 font-mono text-xs">
          <div className="px-4 py-2 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
            <span>Code.gs (Google Apps Script)</span>
            <span>JavaScript / Apps Script V8</span>
          </div>
          <pre className="p-4 overflow-x-auto max-h-64 leading-relaxed text-[11px]">
            {SAMPLE_GOOGLE_APPS_SCRIPT}
          </pre>
        </div>
      </div>
    </div>
  );
};

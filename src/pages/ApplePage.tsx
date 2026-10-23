import React, { useState } from 'react';
import { AUTHORITATIVE_APPLE_RECORDS } from '../data/authoritativeDatabase';
import { AppleFirmwareRecord } from '../types/firmware';
import {
  Smartphone,
  ShieldCheck,
  Search,
  ArrowRight,
  Sparkles,
  ExternalLink,
  Layers,
  AlertCircle,
  HelpCircle,
  Clock,
  CheckCircle2,
} from 'lucide-react';
import { compareAppleBuilds } from '../utils/versionParser';

interface ApplePageProps {
  onSelectRecord: (record: AppleFirmwareRecord) => void;
}

export const ApplePage: React.FC<ApplePageProps> = ({ onSelectRecord }) => {
  const [modelFilter, setModelFilter] = useState('');
  const [showBetaSection, setShowBetaSection] = useState(false);

  // Stable releases sorted by version/build score
  const stableReleases = AUTHORITATIVE_APPLE_RECORDS.filter(
    (r) => r.releaseType === 'public'
  ).sort((a, b) => compareAppleBuilds(b.buildNumber, a.buildNumber, true));

  // Beta releases separated
  const betaReleases = AUTHORITATIVE_APPLE_RECORDS.filter(
    (r) => r.releaseType !== 'public'
  ).sort((a, b) => compareAppleBuilds(b.buildNumber, a.buildNumber, false));

  // Primary latest stable public release
  const latestStable = stableReleases[0];

  const filteredStable = stableReleases.filter((rec) => {
    return (
      !modelFilter ||
      rec.model.toLowerCase().includes(modelFilter.toLowerCase()) ||
      rec.modelIdentifier.toLowerCase().includes(modelFilter.toLowerCase())
    );
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8 text-left">
      {/* Header Banner */}
      <div className="fluent-acrylic rounded-2xl p-6 sm:p-8 border border-white/60 dark:border-white/10 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-500 text-white flex items-center justify-center shadow-md shadow-indigo-600/30">
              <Smartphone className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                Apple iPhone iOS Update Dashboard
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Official Apple security advisories, verified public iOS builds, and separate beta release tracking.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowBetaSection(!showBetaSection)}
              className={`px-3.5 py-1.5 text-xs rounded-xl font-semibold transition-all border ${
                showBetaSection
                  ? 'bg-purple-600 text-white border-purple-500 shadow-sm'
                  : 'bg-white/60 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/10 hover:bg-slate-100'
              }`}
            >
              {showBetaSection ? 'Hide Beta Releases' : 'Show Beta Releases'}
            </button>
          </div>
        </div>
      </div>

      {/* PRIMARY DASHBOARD: LATEST STABLE PUBLIC RELEASE */}
      <div className="fluent-acrylic rounded-2xl p-6 sm:p-8 border border-white/60 dark:border-white/10 shadow-lg space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200/50 dark:border-white/10">
          <div>
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              <span>Official Release · Latest Stable Public iOS</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-1">
              iOS {latestStable.latestOsVersion} (Build {latestStable.buildNumber})
            </h2>
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold border border-emerald-500/20">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Verified Latest Public Release</span>
          </span>
        </div>

        {/* Core Specs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-100/60 dark:bg-slate-800/40 border border-slate-200/40 dark:border-white/5 space-y-1">
            <span className="text-slate-400 block text-[11px]">Build Number:</span>
            <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400 text-sm">
              {latestStable.buildNumber}
            </span>
            <span className="text-slate-500 block text-[11px]">Channel: Public Stable (Retail)</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-100/60 dark:bg-slate-800/40 border border-slate-200/40 dark:border-white/5 space-y-1">
            <span className="text-slate-400 block text-[11px]">Official Release Date:</span>
            <span className="font-semibold text-slate-900 dark:text-white text-sm tabular-nums">
              {latestStable.releaseDate}
            </span>
            <span className="text-slate-500 block text-[11px]">Worldwide CDN Rollout</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-100/60 dark:bg-slate-800/40 border border-slate-200/40 dark:border-white/5 space-y-1">
            <span className="text-slate-400 block text-[11px]">Delta OTA Package:</span>
            <span className="font-mono font-bold text-slate-900 dark:text-white text-sm">
              {latestStable.packageSize || 'Delta OTA'}
            </span>
            <span className="text-slate-500 block text-[11px]">Signed IPSW Available</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-100/60 dark:bg-slate-800/40 border border-slate-200/40 dark:border-white/5 space-y-1">
            <span className="text-slate-400 block text-[11px]">Last Verified:</span>
            <span className="font-semibold text-slate-900 dark:text-white text-sm tabular-nums">
              {latestStable.verifiedAt.split('T')[0]}
            </span>
            <span className="text-emerald-600 dark:text-emerald-400 block text-[11px]">Grounded in HT214080</span>
          </div>
        </div>

        {/* Supported iPhone Models */}
        <div className="space-y-2 text-xs">
          <span className="font-bold text-slate-800 dark:text-slate-200 block">
            Supported iPhone Flagships:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {latestStable.supportedDevices.map((dev, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/60 dark:border-indigo-800/60 text-indigo-700 dark:text-indigo-300 font-medium text-[11px]"
              >
                {dev}
              </span>
            ))}
          </div>
        </div>

        {/* Feature Changes & Release Notes */}
        <div className="p-4 rounded-xl bg-indigo-500/5 border border-indigo-500/15 space-y-2 text-xs">
          <div className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
            <span>Official Apple Release Notes & Features:</span>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-600 dark:text-slate-400 text-[11px]">
            {latestStable.changelog.map((c, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <span className="text-indigo-500 font-bold shrink-0">•</span>
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Security Details */}
        <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/15 space-y-2 text-xs">
          <div className="font-semibold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Official Security Disclosures (CVE Fixes):</span>
          </div>
          <ul className="space-y-1.5 text-slate-600 dark:text-slate-400 text-[11px]">
            {latestStable.securityFixes.map((fix, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <span className="text-emerald-500 font-bold shrink-0">✓</span>
                <span>{fix}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Action bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs">
          <div className="flex items-center gap-3">
            <a
              href={latestStable.officialReleaseNotesUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-slate-500 hover:text-indigo-600 transition-colors"
            >
              <span>Apple Release Notes (HT214080)</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href={latestStable.officialSecurityUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-slate-500 hover:text-emerald-600 transition-colors"
            >
              <span>Security Advisories (HT201222)</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <button
            onClick={() => onSelectRecord(latestStable)}
            className="inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-colors"
          >
            <span>View Complete Metadata</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* SEPARATE BETA RELEASES SECTION (Optional Toggle) */}
      {showBetaSection && (
        <div className="fluent-acrylic rounded-2xl p-6 sm:p-8 border border-purple-500/30 shadow-lg space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200/50 dark:border-white/10">
            <div>
              <span className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-4 h-4" />
                <span>Apple Developer & Public Beta Channel</span>
              </span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">
                Pre-Release Software Builds
              </h3>
            </div>
            <span className="px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-semibold">
              Non-Public Testing
            </span>
          </div>

          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
            <strong>Beta Channel Notice:</strong> Beta builds are intended strictly for registered software developers and enrolled public testers. Do not install beta software on primary mission-critical hardware.
          </div>

          <div className="space-y-3">
            {betaReleases.map((b) => (
              <div
                key={b.id}
                onClick={() => onSelectRecord(b)}
                className="p-4 rounded-xl bg-slate-100/60 dark:bg-slate-800/40 hover:bg-purple-500/10 border border-slate-200/40 dark:border-white/5 cursor-pointer transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">
                    {b.model} — iOS {b.latestOsVersion}
                  </div>
                  <div className="font-mono text-purple-600 dark:text-purple-400 text-[11px] mt-0.5">
                    Build {b.buildNumber} ({b.releaseType.replace('_', ' ').toUpperCase()})
                  </div>
                </div>

                <div className="flex items-center gap-4 text-right">
                  <span className="text-slate-400 tabular-nums">Released {b.releaseDate}</span>
                  <span className="text-purple-600 font-semibold inline-flex items-center gap-1">
                    <span>Inspect Beta</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ALL PUBLIC IPHONE STABLE BUILDS */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            All Verified Stable Public Releases ({filteredStable.length})
          </h3>
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={modelFilter}
              onChange={(e) => setModelFilter(e.target.value)}
              placeholder="Filter by iPhone model (e.g. iPhone 16)..."
              className="w-full pl-9 pr-3 py-1.5 bg-white/80 dark:bg-slate-800/80 rounded-xl border border-slate-300 dark:border-slate-700 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredStable.map((rec) => (
            <div
              key={rec.id}
              onClick={() => onSelectRecord(rec)}
              className="fluent-acrylic fluent-card rounded-2xl p-5 border border-white/50 dark:border-white/10 hover:border-indigo-500/40 cursor-pointer shadow-sm hover:shadow-md transition-all space-y-3"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide">
                    {rec.releaseType.toUpperCase()}
                  </span>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">
                    {rec.model}
                  </h4>
                  <div className="text-xs font-mono text-slate-500 mt-0.5">
                    Identifier: {rec.modelIdentifier}
                  </div>
                </div>

                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-md">
                  iOS {rec.latestOsVersion}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                <div className="p-2 rounded-lg bg-slate-100/60 dark:bg-slate-800/40 border border-slate-200/40 dark:border-white/5">
                  <span className="text-[10px] text-slate-400 block">Build</span>
                  <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">
                    {rec.buildNumber}
                  </span>
                </div>
                <div className="p-2 rounded-lg bg-slate-100/60 dark:bg-slate-800/40 border border-slate-200/40 dark:border-white/5">
                  <span className="text-[10px] text-slate-400 block">Release Date</span>
                  <span className="tabular-nums font-semibold text-slate-800 dark:text-slate-200">
                    {rec.releaseDate}
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200/40 dark:border-white/10 flex items-center justify-between text-xs text-slate-500">
                <span>Verified against HT214080</span>
                <span className="text-indigo-600 dark:text-indigo-400 font-semibold flex items-center gap-1">
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

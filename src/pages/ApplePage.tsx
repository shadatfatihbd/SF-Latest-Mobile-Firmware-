import React, { useState } from 'react';
import {
  AUTHORITATIVE_APPLE_RECORDS,
  AUTHORITATIVE_UPCOMING_RECORDS,
} from '../data/authoritativeDatabase';
import { AppleFirmwareRecord, UpcomingFirmwareRecord } from '../types/firmware';
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
  Activity,
  Lock,
  RefreshCw,
  Info,
} from 'lucide-react';
import { compareAppleBuilds } from '../utils/versionParser';

interface ApplePageProps {
  onSelectRecord: (record: AppleFirmwareRecord) => void;
}

export const ApplePage: React.FC<ApplePageProps> = ({ onSelectRecord }) => {
  const [modelFilter, setModelFilter] = useState('');
  const [activeChannelTab, setActiveChannelTab] = useState<'all' | 'stable' | 'upcoming_beta' | 'security_response'>('all');

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

  // Upcoming Apple releases
  const appleUpcoming = AUTHORITATIVE_UPCOMING_RECORDS.filter(r => r.brand === 'apple');

  const filteredUpcoming = appleUpcoming.filter((rec) => {
    if (!modelFilter.trim()) return true;
    const q = modelFilter.trim().toLowerCase();
    return (
      rec.commercialName.toLowerCase().includes(q) ||
      rec.deviceModel.toLowerCase().includes(q) ||
      rec.expectedVersion.toLowerCase().includes(q)
    );
  });

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
      <div className="fluent-acrylic rounded-3xl p-6 sm:p-8 border border-white/60 dark:border-white/10 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-500 text-white flex items-center justify-center shadow-md shadow-indigo-600/30">
              <Smartphone className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                Apple iPhone iOS & Security Dashboard
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                Official Apple security advisories, signed public IPSW releases, developer Release Candidates (RC), and upcoming beta tracking.
              </p>
            </div>
          </div>

          <div className="p-1 rounded-2xl bg-slate-200/60 dark:bg-slate-800/60 border border-slate-300/50 dark:border-white/5 flex flex-wrap items-center gap-1 text-xs self-start lg:self-auto">
            <button
              onClick={() => setActiveChannelTab('all')}
              className={`px-3.5 py-1.5 rounded-xl font-semibold transition-all ${
                activeChannelTab === 'all'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              All Releases
            </button>
            <button
              onClick={() => setActiveChannelTab('stable')}
              className={`px-3.5 py-1.5 rounded-xl font-semibold transition-all ${
                activeChannelTab === 'stable'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              Public Stable
            </button>
            <button
              onClick={() => setActiveChannelTab('upcoming_beta')}
              className={`px-3.5 py-1.5 rounded-xl font-semibold transition-all flex items-center gap-1.5 ${
                activeChannelTab === 'upcoming_beta'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>Upcoming & Betas</span>
            </button>
            <button
              onClick={() => setActiveChannelTab('security_response')}
              className={`px-3.5 py-1.5 rounded-xl font-semibold transition-all flex items-center gap-1.5 ${
                activeChannelTab === 'security_response'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Security Advisories</span>
            </button>
          </div>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* SECTION 1: UPCOMING IOS RELEASES & DEVELOPER BETAS / RC               */}
      {/* ===================================================================== */}
      {(activeChannelTab === 'all' || activeChannelTab === 'upcoming_beta') && (
        <div className="fluent-acrylic rounded-3xl p-6 sm:p-8 border border-white/60 dark:border-white/10 shadow-lg space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-200/50 dark:border-white/10">
            <div>
              <span className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                <span>Upcoming iOS Releases & Beta Tracker</span>
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
                Announced Releases, Developer Betas & Release Candidates (RC)
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Verified against official Apple Developer RSS feeds and newsroom release announcements.
              </p>
            </div>

            {/* Model Filter */}
            <div className="relative min-w-[220px]">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={modelFilter}
                onChange={(e) => setModelFilter(e.target.value)}
                placeholder="Filter by iPhone model..."
                className="w-full pl-8 pr-3 py-1.5 rounded-xl text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-white/10 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {filteredUpcoming.length === 0 ? (
            <div className="p-8 rounded-2xl bg-slate-100/70 dark:bg-slate-800/40 border border-slate-200 dark:border-white/10 text-center space-y-3">
              <Info className="w-8 h-8 text-slate-400 mx-auto" />
              <div className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                No verified upcoming firmware announcement is currently available.
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                No official upcoming announcement or beta build is recorded for "{modelFilter}". SF Latest Firmware strictly prohibits speculative release forecasting without verified manufacturer proof.
              </p>
              <button
                onClick={() => setModelFilter('')}
                className="px-3.5 py-1.5 rounded-xl bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-500 transition-colors"
              >
                Clear Filter
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredUpcoming.map((item) => (
                <div
                  key={item.id}
                  className="p-6 rounded-2xl bg-white/70 dark:bg-slate-800/60 border border-slate-200/60 dark:border-white/10 space-y-4 hover:border-purple-500/40 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
                        <Activity className="w-3.5 h-3.5" />
                        <span>{item.category === 'beta' ? 'Developer / Public Beta' : 'Officially Announced'}</span>
                      </span>
                      <span className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
                        {item.status}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                        {item.expectedVersion}
                      </h3>
                      <div className="text-xs text-slate-700 dark:text-slate-300 font-semibold mt-0.5">
                        {item.commercialName}
                      </div>
                    </div>

                    <div className="space-y-1.5 text-xs pt-2 border-t border-slate-100 dark:border-white/5">
                      <div className="flex justify-between py-1 border-b border-slate-100 dark:border-white/5">
                        <span className="text-slate-500">Expected Release:</span>
                        <span className="font-semibold text-slate-900 dark:text-white tabular-nums">
                          {item.expectedReleaseWindow || 'Release date not announced.'}
                        </span>
                      </div>

                      {item.expectedBuild && (
                        <div className="flex justify-between py-1 border-b border-slate-100 dark:border-white/5">
                          <span className="text-slate-500">Build Number (RC):</span>
                          <span className="font-mono font-bold text-purple-600 dark:text-purple-400">
                            {item.expectedBuild}
                          </span>
                        </div>
                      )}

                      <div className="py-1">
                        <span className="text-slate-500 block text-[11px]">Evidence Source:</span>
                        <span className="text-slate-700 dark:text-slate-300 text-[11px] block leading-snug">
                          {item.evidenceSource}
                        </span>
                        <span className="text-slate-400 text-[10px] tabular-nums block mt-0.5">
                          Published: {item.evidenceDate} · Verified: {item.verifiedAt.split('T')[0]}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-200/40 dark:border-white/10 flex items-center justify-between text-xs">
                    {item.evidenceUrl ? (
                      <a
                        href={item.evidenceUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[11px] text-slate-400 hover:text-purple-500 inline-flex items-center gap-1"
                      >
                        <span>Apple Releases</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <span className="text-[11px] text-slate-400">Apple Newsroom</span>
                    )}

                    <span className="text-[11px] text-slate-500 font-medium">
                      {item.rolloutScope || 'Compatible iPhone devices'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ===================================================================== */}
      {/* SECTION 2: LATEST STABLE PUBLIC RELEASE                               */}
      {/* ===================================================================== */}
      {(activeChannelTab === 'all' || activeChannelTab === 'stable') && (
        <div className="fluent-acrylic rounded-3xl p-6 sm:p-8 border border-white/60 dark:border-white/10 shadow-lg space-y-5">
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
            <div className="flex flex-wrap gap-2">
              {latestStable.supportedDevices.map((d, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border border-indigo-200/50 dark:border-indigo-800/30 text-xs font-medium"
                >
                  {d}
                </span>
              ))}
            </div>
          </div>

          {/* Changelog & Fixes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-2">
            <div className="p-4 rounded-xl bg-indigo-50/50 dark:bg-slate-800/40 border border-indigo-100 dark:border-white/5 space-y-2">
              <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                <span>Retail Release Improvements</span>
              </span>
              <ul className="space-y-1.5 text-slate-600 dark:text-slate-400 text-[11px]">
                {latestStable.changelog.map((c, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-indigo-500 font-bold shrink-0">•</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50/50 dark:bg-slate-800/40 border border-emerald-100 dark:border-white/5 space-y-2">
              <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>Security Content (CVE Fixes)</span>
              </span>
              <ul className="space-y-1.5 text-slate-600 dark:text-slate-400 text-[11px]">
                {latestStable.securityFixes.map((f, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-emerald-500 font-bold shrink-0">✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex justify-end gap-3 text-xs pt-2">
            <a
              href={latestStable.officialReleaseNotesUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-slate-500 hover:text-indigo-600 transition-colors"
            >
              <span>Apple Release Notes (HT214080)</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={() => onSelectRecord(latestStable)}
              className="inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-colors shadow-md shadow-indigo-600/20"
            >
              <span>Inspect Complete Record</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* SECTION 3: SECURITY ADVISORIES & RAPID RESPONSE                       */}
      {/* ===================================================================== */}
      {(activeChannelTab === 'all' || activeChannelTab === 'security_response') && (
        <div className="fluent-acrylic rounded-3xl p-6 sm:p-8 border border-white/60 dark:border-white/10 shadow-lg space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200/50 dark:border-white/10">
            <div>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <Lock className="w-4 h-4" />
                <span>Apple Security Releases & Advisories</span>
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
                Official Apple Security Updates (HT201222)
              </h2>
            </div>

            <a
              href="https://support.apple.com/en-us/HT201222"
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold text-xs border border-emerald-500/20 inline-flex items-center gap-1.5 hover:bg-emerald-500/20 transition-colors"
            >
              <span>HT201222 Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-900 dark:text-indigo-200 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
            <div>
              <strong>Apple Security Release Cadence:</strong> Apple delivers security fixes through regular iOS point updates (e.g. iOS 27.0.1) and Supplemental Rapid Security Responses (RSR) when critical zero-day vulnerabilities are identified.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-100/60 dark:bg-slate-800/40 border border-slate-200/40 dark:border-white/5 space-y-1">
              <span className="text-slate-400 block text-[11px]">Latest Security Content:</span>
              <span className="font-bold text-slate-900 dark:text-white text-sm">
                iOS 27.0.1 (Build 24A446)
              </span>
              <span className="text-emerald-600 dark:text-emerald-400 block text-[11px]">2 Zero-Day Vulnerabilities Mitigated</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-100/60 dark:bg-slate-800/40 border border-slate-200/40 dark:border-white/5 space-y-1">
              <span className="text-slate-400 block text-[11px]">Upcoming Security Content:</span>
              <span className="font-bold text-slate-900 dark:text-white text-sm">
                iOS 27.2 Security Release
              </span>
              <span className="text-slate-500 block text-[11px]">Scheduled for Mid-November 2026</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-100/60 dark:bg-slate-800/40 border border-slate-200/40 dark:border-white/5 space-y-1">
              <span className="text-slate-400 block text-[11px]">Supplemental Channel:</span>
              <span className="font-bold text-slate-900 dark:text-white text-sm">
                Rapid Security Responses (RSR)
              </span>
              <span className="text-slate-500 block text-[11px]">On demand deployment</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

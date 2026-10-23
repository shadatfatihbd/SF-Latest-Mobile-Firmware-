import React, { useState } from 'react';
import { HomepageUpdateWidgets as WidgetsData } from '../types/firmware';
import {
  Sparkles,
  ShieldCheck,
  Cpu,
  Smartphone,
  Calendar,
  ExternalLink,
  RefreshCw,
  Info,
  Layers,
  ArrowRight,
  Lock,
} from 'lucide-react';

interface HomepageUpdateWidgetsProps {
  widgets: WidgetsData;
  onSelectSamsungModel: (model: string, csc: string) => void;
  onSelectAppleModel: (model: string) => void;
  onRefreshData?: () => void;
  isRefreshing?: boolean;
}

export const HomepageUpdateWidgetsComponent: React.FC<HomepageUpdateWidgetsProps> = ({
  widgets,
  onSelectSamsungModel,
  onSelectAppleModel,
  onRefreshData,
  isRefreshing = false,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'samsung' | 'apple'>('all');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Verified Latest':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <ShieldCheck className="w-3 h-3" />
            <span>Verified Latest</span>
          </span>
        );
      case 'Rolling Out':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20">
            <RefreshCw className="w-3 h-3" />
            <span>Rolling Out</span>
          </span>
        );
      case 'Officially Announced':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
            <Sparkles className="w-3 h-3" />
            <span>Officially Announced</span>
          </span>
        );
      case 'Cached — Refresh Failed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
            <Info className="w-3 h-3" />
            <span>Cached — Refresh Failed</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-slate-500/10 text-slate-600 dark:text-slate-400 border border-slate-500/20">
            <span>{status}</span>
          </span>
        );
    }
  };

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 my-12 text-left space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/50 dark:border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Latest Software Updates
            </h2>
            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20">
              Live Monitor
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Real-time verified status across Samsung One UI, monthly security patches, regional builds, and Apple iOS releases.
          </p>
        </div>

        {/* Filter & Refresh Controls */}
        <div className="flex items-center gap-2">
          <div className="p-1 rounded-xl bg-slate-200/60 dark:bg-slate-800/60 border border-slate-300/50 dark:border-white/5 flex items-center gap-1 text-xs">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                activeTab === 'all'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              All Platforms
            </button>
            <button
              onClick={() => setActiveTab('samsung')}
              className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                activeTab === 'samsung'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Samsung
            </button>
            <button
              onClick={() => setActiveTab('apple')}
              className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                activeTab === 'apple'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Apple
            </button>
          </div>

          {onRefreshData && (
            <button
              onClick={onRefreshData}
              disabled={isRefreshing}
              title="Refresh verified provider data"
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-800/60 border border-slate-300/50 dark:border-white/5 transition-all disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-sky-500' : ''}`} />
            </button>
          )}
        </div>
      </div>

      {/* 5 Prominent Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* CARD 1: Samsung — Latest One UI */}
        {(activeTab === 'all' || activeTab === 'samsung') && (
          <div className="fluent-acrylic rounded-2xl p-6 border border-white/60 dark:border-white/10 shadow-md hover:border-sky-500/40 transition-all flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>Samsung · Latest One UI</span>
                </span>
                {getStatusBadge(widgets.samsungLatestOneUi.statusLabel)}
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {widgets.samsungLatestOneUi.version}
                </h3>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Based on {widgets.samsungLatestOneUi.androidVersion}
                </div>
              </div>

              {/* Specs */}
              <div className="space-y-1.5 text-xs pt-1">
                <div className="flex justify-between py-1 border-b border-slate-100 dark:border-white/5">
                  <span className="text-slate-500">Verified Build:</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white">
                    {widgets.samsungLatestOneUi.latestBuild}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100 dark:border-white/5">
                  <span className="text-slate-500">Device Reference:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {widgets.samsungLatestOneUi.commercialName} ({widgets.samsungLatestOneUi.deviceModel})
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100 dark:border-white/5">
                  <span className="text-slate-500">Applicable CSC:</span>
                  <span className="font-mono text-sky-600 dark:text-sky-400">
                    {widgets.samsungLatestOneUi.applicableCsc}
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Release Date:</span>
                  <span className="tabular-nums text-slate-700 dark:text-slate-300">
                    {widgets.samsungLatestOneUi.releaseDate}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200/40 dark:border-white/10 flex items-center justify-between text-xs">
              <span className="text-[11px] text-slate-400">
                Source: {widgets.samsungLatestOneUi.sourceName}
              </span>
              <button
                onClick={() => onSelectSamsungModel(widgets.samsungLatestOneUi.deviceModel, 'EUX')}
                className="text-sky-600 dark:text-sky-400 font-semibold inline-flex items-center gap-1 hover:underline"
              >
                <span>Inspect Build</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        )}

        {/* CARD 2: Samsung — Latest Security Patch */}
        {(activeTab === 'all' || activeTab === 'samsung') && (
          <div className="fluent-acrylic rounded-2xl p-6 border border-white/60 dark:border-white/10 shadow-md hover:border-emerald-500/40 transition-all flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5" />
                  <span>Samsung · Security Patch</span>
                </span>
                {getStatusBadge(widgets.samsungLatestSecurityPatch.statusLabel)}
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {widgets.samsungLatestSecurityPatch.bulletinMonth} SMR
                </h3>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Patch Level: {widgets.samsungLatestSecurityPatch.patchLevel}
                </div>
              </div>

              {/* Specs */}
              <div className="space-y-1.5 text-xs pt-1">
                <div className="flex justify-between py-1 border-b border-slate-100 dark:border-white/5">
                  <span className="text-slate-500">Associated Firmware:</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white">
                    {widgets.samsungLatestSecurityPatch.associatedBuild}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100 dark:border-white/5">
                  <span className="text-slate-500">Target Device:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {widgets.samsungLatestSecurityPatch.commercialName} ({widgets.samsungLatestSecurityPatch.deviceModel})
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100 dark:border-white/5">
                  <span className="text-slate-500">Active CSC:</span>
                  <span className="font-mono text-emerald-600 dark:text-emerald-400">
                    {widgets.samsungLatestSecurityPatch.csc}
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Schedule:</span>
                  <span className="text-slate-700 dark:text-slate-300 font-medium">
                    {widgets.samsungLatestSecurityPatch.scheduleTier}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200/40 dark:border-white/10 flex items-center justify-between text-xs">
              <a
                href={widgets.samsungLatestSecurityPatch.bulletinUrl}
                target="_blank"
                rel="noreferrer"
                className="text-[11px] text-slate-400 hover:text-emerald-500 inline-flex items-center gap-1"
              >
                <span>Samsung Bulletin</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <button
                onClick={() => onSelectSamsungModel(widgets.samsungLatestSecurityPatch.deviceModel, 'XME')}
                className="text-emerald-600 dark:text-emerald-400 font-semibold inline-flex items-center gap-1 hover:underline"
              >
                <span>View Details</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        )}

        {/* CARD 3: Samsung — Latest Verified Firmware Builds (Multi-Device Matrix) */}
        {(activeTab === 'all' || activeTab === 'samsung') && (
          <div className="fluent-acrylic rounded-2xl p-6 border border-white/60 dark:border-white/10 shadow-md hover:border-sky-500/40 transition-all flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5" />
                  <span>Samsung · Regional Builds</span>
                </span>
                <span className="text-[11px] font-semibold text-slate-500">
                  Model & CSC Specific
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Active Verified Builds
                </h3>
                <div className="text-[11px] text-amber-600 dark:text-amber-400 mt-0.5 leading-snug">
                  Note: Firmware builds differ by device model, region, and carrier CSC. No universal build exists.
                </div>
              </div>

              {/* Multi-device preview list */}
              <div className="space-y-1.5 text-xs max-h-44 overflow-y-auto pr-1">
                {widgets.samsungLatestVerifiedBuilds.map((b, idx) => (
                  <div
                    key={idx}
                    onClick={() => onSelectSamsungModel(b.model, b.csc)}
                    className="p-2 rounded-xl bg-slate-100/60 dark:bg-slate-800/50 hover:bg-sky-500/10 cursor-pointer transition-colors border border-slate-200/40 dark:border-white/5 flex items-center justify-between"
                  >
                    <div>
                      <div className="font-semibold text-slate-800 dark:text-slate-200">
                        {b.commercialName}
                      </div>
                      <div className="font-mono text-[11px] text-sky-600 dark:text-sky-400">
                        {b.latestPda} <span className="text-slate-400">[{b.csc}]</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 block tabular-nums">{b.releaseDate}</span>
                      <span className="text-[10px] font-bold text-emerald-600">Bin {b.bootloaderRevision}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 text-[11px] text-slate-400 text-center">
              Click any device to inspect full bootloader & partition details
            </div>
          </div>
        )}

        {/* CARD 4: Apple — Latest Stable iOS */}
        {(activeTab === 'all' || activeTab === 'apple') && (
          <div className="fluent-acrylic rounded-2xl p-6 border border-white/60 dark:border-white/10 shadow-md hover:border-indigo-500/40 transition-all flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Apple · Latest Stable iOS</span>
                </span>
                {getStatusBadge(widgets.appleLatestStableIos.statusLabel)}
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {widgets.appleLatestStableIos.version}
                </h3>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Public Stable Release Channel
                </div>
              </div>

              {/* Specs */}
              <div className="space-y-1.5 text-xs pt-1">
                <div className="flex justify-between py-1 border-b border-slate-100 dark:border-white/5">
                  <span className="text-slate-500">Build Number:</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white">
                    {widgets.appleLatestStableIos.buildNumber}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100 dark:border-white/5">
                  <span className="text-slate-500">Release Date:</span>
                  <span className="tabular-nums text-slate-800 dark:text-slate-200">
                    {widgets.appleLatestStableIos.releaseDate}
                  </span>
                </div>
                <div className="py-1">
                  <span className="text-slate-500 block mb-1">Supported Flagships:</span>
                  <div className="flex flex-wrap gap-1">
                    {widgets.appleLatestStableIos.supportedDevices.map((d, i) => (
                      <span key={i} className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-[10px] text-slate-700 dark:text-slate-300">
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200/40 dark:border-white/10 flex items-center justify-between text-xs">
              <a
                href={widgets.appleLatestStableIos.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="text-[11px] text-slate-400 hover:text-indigo-500 inline-flex items-center gap-1"
              >
                <span>Apple Notes</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <button
                onClick={() => onSelectAppleModel('iPhone 17 Pro Max')}
                className="text-indigo-600 dark:text-indigo-400 font-semibold inline-flex items-center gap-1 hover:underline"
              >
                <span>View Release Notes</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        )}

        {/* CARD 5: Apple — Latest Security Updates */}
        {(activeTab === 'all' || activeTab === 'apple') && (
          <div className="fluent-acrylic rounded-2xl p-6 border border-white/60 dark:border-white/10 shadow-md hover:border-indigo-500/40 transition-all flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Apple · Security Response</span>
                </span>
                {getStatusBadge(widgets.appleLatestSecurityUpdate.statusLabel)}
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {widgets.appleLatestSecurityUpdate.version}
                </h3>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Build {widgets.appleLatestSecurityUpdate.buildNumber} · Critical Fixes
                </div>
              </div>

              {/* Key CVE Bulletins */}
              <div className="space-y-2 text-xs pt-1">
                <div className="font-semibold text-emerald-600 dark:text-emerald-400">
                  {widgets.appleLatestSecurityUpdate.cveCount}:
                </div>
                <ul className="space-y-1.5 text-slate-600 dark:text-slate-400 text-[11px]">
                  {widgets.appleLatestSecurityUpdate.keyFixes.map((f, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-emerald-500 font-bold shrink-0">✓</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200/40 dark:border-white/10 flex items-center justify-between text-xs">
              <a
                href={widgets.appleLatestSecurityUpdate.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="text-[11px] text-slate-400 hover:text-indigo-500 inline-flex items-center gap-1"
              >
                <span>HT201222 Advisory</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <button
                onClick={() => onSelectAppleModel('iPhone 16 Pro Max')}
                className="text-indigo-600 dark:text-indigo-400 font-semibold inline-flex items-center gap-1 hover:underline"
              >
                <span>Security Details</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

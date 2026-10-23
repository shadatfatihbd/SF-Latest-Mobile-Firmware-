import React, { useState } from 'react';
import { AUTHORITATIVE_SAMSUNG_RECORDS, CURRENT_SAMSUNG_SECURITY_BULLETIN } from '../data/authoritativeDatabase';
import { SamsungFirmwareRecord } from '../types/firmware';
import {
  Cpu,
  ShieldCheck,
  Search,
  Database,
  ArrowRight,
  Layers,
  Lock,
  ExternalLink,
  Calendar,
  AlertTriangle,
  Sparkles,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import { selectLatestSamsungRecord, compareSamsungBuilds } from '../utils/versionParser';

interface SamsungPageProps {
  onSelectRecord: (record: SamsungFirmwareRecord) => void;
  onOpenCscDirectory: () => void;
}

export const SamsungPage: React.FC<SamsungPageProps> = ({
  onSelectRecord,
  onOpenCscDirectory,
}) => {
  const [modelInput, setModelInput] = useState('SM-A556E');
  const [cscInput, setCscInput] = useState('XME');
  const [activeTab, setActiveTab] = useState<'dashboard' | 'search' | 'bulletin'>('dashboard');

  const cscOptions = ['All', 'XME', 'INS', 'XXV', 'BKD', 'THL', 'EUX', 'DBT'];

  // Calculate search result using our parser
  const searchResult = selectLatestSamsungRecord(
    AUTHORITATIVE_SAMSUNG_RECORDS.filter((r) => {
      const q = modelInput.trim().toUpperCase();
      return (
        r.model.toUpperCase().includes(q) ||
        r.commercialName.toUpperCase().includes(q)
      );
    }),
    cscInput.trim() || undefined
  );

  const latestOneUiRecord = [...AUTHORITATIVE_SAMSUNG_RECORDS].sort((a, b) => {
    return compareSamsungBuilds(b.latestPda, a.latestPda);
  })[0];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8 text-left">
      {/* Header Banner */}
      <div className="fluent-acrylic rounded-2xl p-6 sm:p-8 border border-white/60 dark:border-white/10 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-sky-600 to-blue-500 text-white flex items-center justify-center shadow-md shadow-sky-600/30">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                Samsung Galaxy Firmware & One UI Hub
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Official One UI releases, monthly security bulletins, binary bootloader tracking, and exact model/CSC search.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-3.5 py-1.5 text-xs rounded-xl font-semibold transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'bg-white/60 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
              }`}
            >
              Update Dashboard
            </button>
            <button
              onClick={() => setActiveTab('search')}
              className={`px-3.5 py-1.5 text-xs rounded-xl font-semibold transition-all ${
                activeTab === 'search'
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'bg-white/60 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
              }`}
            >
              Build Search
            </button>
            <button
              onClick={() => setActiveTab('bulletin')}
              className={`px-3.5 py-1.5 text-xs rounded-xl font-semibold transition-all ${
                activeTab === 'bulletin'
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'bg-white/60 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
              }`}
            >
              Security Bulletin
            </button>
          </div>
        </div>
      </div>

      {/* SECTION A: LATEST ONE UI UPDATE */}
      <div className="fluent-acrylic rounded-2xl p-6 sm:p-8 border border-white/60 dark:border-white/10 shadow-lg space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200/50 dark:border-white/10">
          <div>
            <span className="text-xs font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-4 h-4" />
              <span>Section A · Latest Verified One UI Update</span>
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
              One UI {latestOneUiRecord.oneUiVersion} on Android {latestOneUiRecord.androidVersion}
            </h2>
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold border border-emerald-500/20">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Verified Latest One UI</span>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-100/60 dark:bg-slate-800/40 border border-slate-200/40 dark:border-white/5 space-y-1">
            <span className="text-slate-400 block text-[11px]">Flagship Reference:</span>
            <span className="font-bold text-slate-900 dark:text-white text-sm">
              {latestOneUiRecord.commercialName}
            </span>
            <span className="text-slate-500 block font-mono text-[11px]">
              Model: {latestOneUiRecord.model}
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-100/60 dark:bg-slate-800/40 border border-slate-200/40 dark:border-white/5 space-y-1">
            <span className="text-slate-400 block text-[11px]">Latest PDA / AP:</span>
            <span className="font-mono font-bold text-sky-600 dark:text-sky-400 text-sm truncate block">
              {latestOneUiRecord.latestPda}
            </span>
            <span className="text-slate-500 block text-[11px]">
              Bootloader Binary {latestOneUiRecord.bootloaderRevision}
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-100/60 dark:bg-slate-800/40 border border-slate-200/40 dark:border-white/5 space-y-1">
            <span className="text-slate-400 block text-[11px]">Applicable Region / CSC:</span>
            <span className="font-semibold text-slate-900 dark:text-white text-sm">
              {latestOneUiRecord.csc} ({latestOneUiRecord.cscRegion})
            </span>
            <span className="text-slate-500 block text-[11px]">
              Package: {latestOneUiRecord.multiCscGroup} (Multi-CSC)
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-100/60 dark:bg-slate-800/40 border border-slate-200/40 dark:border-white/5 space-y-1">
            <span className="text-slate-400 block text-[11px]">Rollout Date:</span>
            <span className="font-semibold text-slate-900 dark:text-white text-sm tabular-nums">
              {latestOneUiRecord.releaseDate}
            </span>
            <span className="text-emerald-600 dark:text-emerald-400 block text-[11px] font-medium">
              Status: {latestOneUiRecord.rolloutStatus.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Changelog highlights */}
        <div className="p-4 rounded-xl bg-sky-500/5 border border-sky-500/15 space-y-2 text-xs">
          <div className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-sky-500" />
            <span>Official One UI {latestOneUiRecord.oneUiVersion} Highlights:</span>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-600 dark:text-slate-400 text-[11px]">
            {latestOneUiRecord.changelog.map((c, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <span className="text-sky-500 font-bold shrink-0">•</span>
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex justify-end gap-3 text-xs pt-1">
          <a
            href={latestOneUiRecord.officialSourceUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-slate-500 hover:text-sky-600 transition-colors"
          >
            <span>Official Samsung Release Notice</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <button
            onClick={() => onSelectRecord(latestOneUiRecord)}
            className="inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold transition-colors"
          >
            <span>Inspect Complete Firmware</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* SECTION B: MONTHLY SECURITY UPDATES & SCHEDULE */}
      <div className="fluent-acrylic rounded-2xl p-6 sm:p-8 border border-white/60 dark:border-white/10 shadow-lg space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200/50 dark:border-white/10">
          <div>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <Lock className="w-4 h-4" />
              <span>Section B · Monthly Security Updates & Scope</span>
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
              Samsung Mobile Security Maintenance Release ({CURRENT_SAMSUNG_SECURITY_BULLETIN.monthYear})
            </h2>
          </div>

          <a
            href={CURRENT_SAMSUNG_SECURITY_BULLETIN.bulletinUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold text-xs border border-emerald-500/20 hover:bg-emerald-500/20 transition-colors"
          >
            <span>Official Bulletin Portal</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Critical Distinction Notice */}
        <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-800 dark:text-amber-300 leading-relaxed flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
          <div>
            <strong>Bulletin vs. Rollout Distinction:</strong> A published monthly security bulletin details vulnerabilities patched by Samsung and Google. It does <em>not</em> prove every Galaxy device has received the patch simultaneously; rollout schedules vary by model variant, carrier certification, and regional CSC.
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-100/60 dark:bg-slate-800/40 border border-slate-200/40 dark:border-white/5">
            <span className="text-slate-400 block text-[11px]">Android Bulletin Month:</span>
            <span className="font-bold text-slate-900 dark:text-white text-sm">
              {CURRENT_SAMSUNG_SECURITY_BULLETIN.monthYear}
            </span>
          </div>
          <div className="p-3 rounded-xl bg-slate-100/60 dark:bg-slate-800/40 border border-slate-200/40 dark:border-white/5">
            <span className="text-slate-400 block text-[11px]">Critical Vulnerabilities:</span>
            <span className="font-bold text-rose-600 dark:text-rose-400 text-sm">
              {CURRENT_SAMSUNG_SECURITY_BULLETIN.criticalCves} Critical CVEs
            </span>
          </div>
          <div className="p-3 rounded-xl bg-slate-100/60 dark:bg-slate-800/40 border border-slate-200/40 dark:border-white/5">
            <span className="text-slate-400 block text-[11px]">High Severity CVEs:</span>
            <span className="font-bold text-amber-600 dark:text-amber-400 text-sm">
              {CURRENT_SAMSUNG_SECURITY_BULLETIN.highCves} High CVEs
            </span>
          </div>
          <div className="p-3 rounded-xl bg-slate-100/60 dark:bg-slate-800/40 border border-slate-200/40 dark:border-white/5">
            <span className="text-slate-400 block text-[11px]">Samsung SVE Items:</span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">
              {CURRENT_SAMSUNG_SECURITY_BULLETIN.samsungSves} SVE Patches
            </span>
          </div>
        </div>

        {/* Official Security Update Scope Schedule Tiers */}
        <div className="space-y-3 pt-2">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            Published Security-Update Schedule Tiers (Official Samsung Scope)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            {CURRENT_SAMSUNG_SECURITY_BULLETIN.scheduledDeviceTiers.map((tier, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-white/5 space-y-1.5"
              >
                <div className="font-bold text-sky-600 dark:text-sky-400">{tier.tier}</div>
                <p className="text-[11px] text-slate-500 leading-normal">{tier.description}</p>
                <div className="pt-1 flex flex-wrap gap-1">
                  {tier.sampleModels.map((m, i) => (
                    <span
                      key={i}
                      className="px-1.5 py-0.5 rounded bg-slate-200/70 dark:bg-slate-700 text-[10px] text-slate-700 dark:text-slate-300"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION C: LATEST SAMSUNG BUILD SEARCH */}
      <div className="fluent-acrylic rounded-2xl p-6 sm:p-8 border border-white/60 dark:border-white/10 shadow-lg space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200/50 dark:border-white/10">
          <div>
            <span className="text-xs font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
              <Search className="w-4 h-4" />
              <span>Section C · Latest Samsung Build Search</span>
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
              Exact Device Model & CSC Firmware Verification
            </h2>
          </div>
          <button
            onClick={onOpenCscDirectory}
            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/60 rounded-xl border border-sky-500/20 hover:bg-sky-100 transition-colors"
          >
            <Database className="w-3.5 h-3.5" />
            <span>CSC Directory</span>
          </button>
        </div>

        {/* Input Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
          <div className="sm:col-span-6">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Samsung Model Number
            </label>
            <input
              type="text"
              value={modelInput}
              onChange={(e) => setModelInput(e.target.value.toUpperCase())}
              placeholder="e.g. SM-A556E, SM-S928B"
              className="w-full px-3.5 py-2.5 bg-white/80 dark:bg-slate-800/80 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold font-mono text-slate-900 dark:text-white uppercase focus:ring-2 focus:ring-sky-500 focus:outline-none"
            />
          </div>

          <div className="sm:col-span-4">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Sales Code / CSC (Optional)
            </label>
            <input
              type="text"
              value={cscInput}
              onChange={(e) => setCscInput(e.target.value.toUpperCase())}
              maxLength={4}
              placeholder="e.g. XME, INS, BKD"
              className="w-full px-3.5 py-2.5 bg-white/80 dark:bg-slate-800/80 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold font-mono text-slate-900 dark:text-white uppercase focus:ring-2 focus:ring-sky-500 focus:outline-none"
            />
          </div>

          <div className="sm:col-span-2">
            <button
              onClick={() => {
                if (searchResult.latestRecord) {
                  onSelectRecord(searchResult.latestRecord);
                }
              }}
              disabled={!searchResult.latestRecord}
              className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-500 disabled:opacity-50 rounded-xl transition-all shadow-md shadow-sky-600/20"
            >
              Verify Build
            </button>
          </div>
        </div>

        {/* Search Result Card */}
        {searchResult.latestRecord ? (
          <div className="p-5 rounded-2xl bg-white/60 dark:bg-slate-800/60 border border-sky-500/30 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <span className="text-[11px] font-bold text-sky-600 dark:text-sky-400">
                  EXACT MATCH VERIFIED
                </span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {searchResult.latestRecord.commercialName} ({searchResult.latestRecord.model})
                </h3>
              </div>

              <span className="px-3 py-1 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold text-xs border border-emerald-500/20">
                {searchResult.statusLabel}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-100/70 dark:bg-slate-800/70 border border-slate-200/40 dark:border-white/5">
                <span className="text-[10px] text-slate-400 block">PDA / AP Build:</span>
                <span className="font-mono font-bold text-slate-900 dark:text-white text-xs truncate block">
                  {searchResult.latestRecord.latestPda}
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-100/70 dark:bg-slate-800/70 border border-slate-200/40 dark:border-white/5">
                <span className="text-[10px] text-slate-400 block">CP Baseband / CSC:</span>
                <span className="font-mono text-slate-900 dark:text-white text-xs truncate block">
                  {searchResult.latestRecord.cpBuild}
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-100/70 dark:bg-slate-800/70 border border-slate-200/40 dark:border-white/5">
                <span className="text-[10px] text-slate-400 block">Binary Revision:</span>
                <span className="font-bold text-sky-600 dark:text-sky-400 text-xs">
                  Binary {searchResult.latestRecord.bootloaderRevision} (BL Lock)
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-100/70 dark:bg-slate-800/70 border border-slate-200/40 dark:border-white/5">
                <span className="text-[10px] text-slate-400 block">Security Patch:</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400 text-xs tabular-nums">
                  {searchResult.latestRecord.securityPatchLevel}
                </span>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs text-slate-500">
              <span className="tabular-nums">
                Release Date: {searchResult.latestRecord.releaseDate} · Last verified: {searchResult.latestRecord.verifiedAt.split('T')[0]}
              </span>

              <button
                onClick={() => onSelectRecord(searchResult.latestRecord!)}
                className="text-sky-600 dark:text-sky-400 font-semibold inline-flex items-center gap-1 hover:underline"
              >
                <span>View Full Spec Sheet</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : (
          <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-center space-y-2">
            <div className="text-sm font-bold text-amber-800 dark:text-amber-300">
              Latest build could not be verified
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 max-w-md mx-auto">
              No verified firmware build found for model "{modelInput}"{cscInput ? ` and CSC "${cscInput}"` : ''}. Please verify spelling or test SM-A556E / SM-S928B.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

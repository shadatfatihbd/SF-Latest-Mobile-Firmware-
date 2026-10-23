import React, { useState } from 'react';
import {
  SamsungFirmwareRecord,
  AppleFirmwareRecord,
  FirmwareRecord,
  CscDirectoryEntry,
  VerificationStatusLabel,
} from '../types/firmware';
import {
  Smartphone,
  ShieldCheck,
  Calendar,
  ExternalLink,
  Copy,
  Check,
  Share2,
  RefreshCw,
  Cpu,
  Layers,
  FileText,
  AlertTriangle,
  Sparkles,
  GitCompare,
  CheckCircle2,
  Clock,
  Lock,
} from 'lucide-react';

interface SearchResultsProps {
  records: FirmwareRecord[];
  queryModel: string;
  queryCsc?: string;
  matchedCsc?: CscDirectoryEntry;
  onLiveVerify: (model: string, csc?: string) => void;
  isLiveVerifying: boolean;
  onOpenCompare?: (build1: string, build2?: string) => void;
  onSelectVariant?: (record: FirmwareRecord) => void;
  onManualRefresh?: (model: string, csc?: string) => void;
  isRefreshing?: boolean;
}

export const SearchResults: React.FC<SearchResultsProps> = ({
  records,
  queryModel,
  queryCsc,
  matchedCsc,
  onLiveVerify,
  isLiveVerifying,
  onOpenCompare,
  onSelectVariant,
  onManualRefresh,
  isRefreshing = false,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!records || records.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <div className="fluent-acrylic rounded-2xl p-8 border border-white/50 dark:border-white/10 space-y-4">
          <div className="w-12 h-12 mx-auto rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            Latest build could not be verified for "{queryModel}"{queryCsc ? ` [${queryCsc}]` : ''}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
            We could not locate an official verified update record matching this model and CSC code. Please check the model code (e.g. SM-A556E, SM-S928B, or iPhone 17 Pro Max).
          </p>
          <div className="pt-2 flex items-center justify-center gap-3">
            <button
              onClick={() => onLiveVerify(queryModel, queryCsc)}
              disabled={isLiveVerifying}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-500 rounded-xl transition-colors disabled:opacity-50"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isLiveVerifying ? 'Searching Official Newsrooms...' : 'Run Live Search Grounding'}</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  const current = records[selectedIndex] || records[0];
  const isSamsung = current.brand === 'samsung';
  const samsung = isSamsung ? (current as SamsungFirmwareRecord) : null;
  const apple = !isSamsung ? (current as AppleFirmwareRecord) : null;

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleShare = () => {
    const url = new URL(window.location.href);
    url.searchParams.set('model', current.model);
    if (isSamsung && samsung?.csc) {
      url.searchParams.set('csc', samsung.csc);
    }
    navigator.clipboard.writeText(url.toString());
    setCopiedKey('share');
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const getStatusBadge = (statusLabel?: VerificationStatusLabel) => {
    const label = statusLabel || 'Verified Latest';
    switch (label) {
      case 'Verified Latest':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Verified Latest</span>
          </span>
        );
      case 'Rolling Out':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-600 dark:text-sky-400 text-xs font-semibold">
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Rolling Out</span>
          </span>
        );
      case 'Officially Announced':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Officially Announced</span>
          </span>
        );
      case 'Cached — Refresh Failed':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-semibold">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Cached — Refresh Failed</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-500/10 border border-slate-500/20 text-slate-600 dark:text-slate-400 text-xs font-semibold">
            <span>{label}</span>
          </span>
        );
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-6 text-left">
      {/* If multiple regional variants exist, show clean segmented switcher */}
      {records.length > 1 && (
        <div className="p-2 fluent-acrylic rounded-2xl border border-white/50 dark:border-white/10 space-y-2">
          <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 px-2 flex items-center justify-between">
            <span>Verified Model Variants ({records.length}):</span>
            <span className="text-[11px] font-normal">Select variant below</span>
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            {records.map((rec, idx) => {
              const label =
                rec.brand === 'samsung'
                  ? `${rec.model} [${(rec as SamsungFirmwareRecord).csc}] - ${(rec as SamsungFirmwareRecord).cscRegion}`
                  : `${rec.model} (${(rec as AppleFirmwareRecord).releaseType})`;
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={rec.id}
                  onClick={() => {
                    setSelectedIndex(idx);
                    if (onSelectVariant) onSelectVariant(rec);
                  }}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all whitespace-nowrap ${
                    isSelected
                      ? 'bg-sky-600 text-white shadow-sm'
                      : 'bg-white/60 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* TOP SUMMARY CARD (Microsoft Fluent Mica / Acrylic) */}
      <div className="fluent-acrylic rounded-2xl p-6 sm:p-8 border border-white/60 dark:border-white/10 shadow-xl shadow-slate-900/5 relative overflow-hidden">
        {/* Glow corner */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-sky-500/10 via-transparent to-transparent pointer-events-none rounded-bl-full" />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Device Icon / Visual Canvas */}
          <div className="md:col-span-3 flex flex-col items-center justify-center p-4 rounded-xl bg-gradient-to-b from-slate-100/80 to-slate-200/40 dark:from-slate-800/60 dark:to-slate-900/40 border border-slate-200/50 dark:border-white/5">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-sky-600 to-blue-500 flex items-center justify-center text-white shadow-lg shadow-sky-600/30 mb-3">
              {isSamsung ? <Cpu className="w-8 h-8" /> : <Smartphone className="w-8 h-8" />}
            </div>
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 text-center">
              {isSamsung ? samsung?.commercialName : apple?.model}
            </span>
            <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 mt-0.5">
              {isSamsung ? samsung?.model : apple?.modelIdentifier}
            </span>
          </div>

          {/* Core Metadata Summary */}
          <div className="md:col-span-9 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                  {isSamsung ? `${samsung?.deviceFamily} · Official Rollout` : `${apple?.deviceFamily} · ${apple?.releaseType.toUpperCase()}`}
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                  {isSamsung ? samsung?.commercialName : apple?.model}
                </h2>
              </div>

              {/* Status Badge */}
              {getStatusBadge(current.statusLabel)}
            </div>

            {/* Quick Metrics Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-2.5 rounded-xl bg-white/50 dark:bg-slate-800/50 border border-slate-200/40 dark:border-white/5">
                <div className="text-[11px] text-slate-500 dark:text-slate-400">Latest OS</div>
                <div className="text-sm font-bold text-slate-900 dark:text-white">
                  {isSamsung ? `One UI ${samsung?.oneUiVersion} (Android ${samsung?.androidVersion})` : `iOS ${apple?.latestOsVersion}`}
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-white/50 dark:bg-slate-800/50 border border-slate-200/40 dark:border-white/5">
                <div className="text-[11px] text-slate-500 dark:text-slate-400">Build / PDA</div>
                <div className="text-sm font-bold font-mono text-slate-900 dark:text-white truncate">
                  {isSamsung ? samsung?.latestPda : apple?.buildNumber}
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-white/50 dark:bg-slate-800/50 border border-slate-200/40 dark:border-white/5">
                <div className="text-[11px] text-slate-500 dark:text-slate-400">
                  {isSamsung ? 'Region / CSC' : 'Model Identifier'}
                </div>
                <div className="text-sm font-bold text-slate-900 dark:text-white">
                  {isSamsung ? `${samsung?.csc} (${samsung?.cscRegion})` : apple?.modelIdentifier}
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-white/50 dark:bg-slate-800/50 border border-slate-200/40 dark:border-white/5">
                <div className="text-[11px] text-slate-500 dark:text-slate-400">Release Date</div>
                <div className="text-sm font-bold text-slate-900 dark:text-white tabular-nums">
                  {current.releaseDate}
                </div>
              </div>
            </div>

            {/* Last successful verification timestamp */}
            <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>
                Last successful verification: <strong>{new Date(current.verifiedAt).toLocaleString()}</strong>
              </span>
            </div>

            {/* Action Bar */}
            <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
              <button
                onClick={() => copyToClipboard(current.model, 'model')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium transition-colors"
              >
                {copiedKey === 'model' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'model' ? 'Copied Model' : 'Copy Model'}</span>
              </button>

              <button
                onClick={() => copyToClipboard(isSamsung ? samsung!.latestPda : apple!.latestOsVersion, 'firmware')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium transition-colors"
              >
                {copiedKey === 'firmware' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'firmware' ? 'Copied Version' : 'Copy Version'}</span>
              </button>

              <button
                onClick={() => copyToClipboard(isSamsung ? samsung!.apBuild : apple!.buildNumber, 'build')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium transition-colors"
              >
                {copiedKey === 'build' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'build' ? 'Copied Build' : 'Copy Build'}</span>
              </button>

              <button
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium transition-colors"
              >
                {copiedKey === 'share' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'share' ? 'Link Copied!' : 'Share Results'}</span>
              </button>

              <button
                onClick={() => onLiveVerify(current.model, isSamsung ? samsung?.csc : undefined)}
                disabled={isLiveVerifying}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-50 dark:bg-sky-950/60 hover:bg-sky-100 dark:hover:bg-sky-900/60 text-sky-600 dark:text-sky-300 font-medium transition-colors border border-sky-500/20"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isLiveVerifying ? 'animate-spin' : ''}`} />
                <span>{isLiveVerifying ? 'Checking Newsrooms...' : 'Live Re-verify'}</span>
              </button>

              {onManualRefresh && (
                <button
                  onClick={() => onManualRefresh(current.model, isSamsung ? samsung?.csc : undefined)}
                  disabled={isRefreshing}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium transition-colors"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
                  <span>{isRefreshing ? 'Refreshing...' : 'Refresh Provider'}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* MANDATORY COMPLIANCE NOTICE */}
      <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-800 dark:text-amber-300 leading-relaxed flex items-start gap-3">
        <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold">Notice:</span> Firmware availability varies by model, region, CSC, carrier, and rollout schedule. Always verify compatibility before installing.
        </div>
      </div>

      {/* 7 ORGANIZED INFORMATION CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* CARD 1: Firmware / Software Details */}
        <div className="fluent-acrylic rounded-2xl p-6 border border-white/50 dark:border-white/10 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200/40 dark:border-white/10">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-sky-500" />
              <span>1. Firmware & Software Details</span>
            </h3>
            <span className="text-[11px] text-slate-400">Architecture</span>
          </div>

          {isSamsung && samsung ? (
            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-white/5">
                <span className="text-slate-500 dark:text-slate-400">PDA Build:</span>
                <span className="font-mono font-semibold text-slate-900 dark:text-white">{samsung.latestPda}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-white/5">
                <span className="text-slate-500 dark:text-slate-400">AP (System):</span>
                <span className="font-mono font-semibold text-slate-900 dark:text-white">{samsung.apBuild}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-white/5">
                <span className="text-slate-500 dark:text-slate-400">CP (Baseband/Modem):</span>
                <span className="font-mono font-semibold text-slate-900 dark:text-white">{samsung.cpBuild}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-white/5">
                <span className="text-slate-500 dark:text-slate-400">CSC Package Build:</span>
                <span className="font-mono font-semibold text-slate-900 dark:text-white">{samsung.cscBuild}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-white/5">
                <span className="text-slate-500 dark:text-slate-400">One UI / Android:</span>
                <span className="font-semibold text-slate-900 dark:text-white">One UI {samsung.oneUiVersion} on Android {samsung.androidVersion}</span>
              </div>
              <div className="pt-2 text-[11px] text-slate-500 dark:text-slate-400 leading-normal">
                <strong>OTA vs Full Firmware:</strong> OTA updates delta-patch existing system partitions over-the-air, preserving user data. Full 4-file packages (AP, BL, CP, CSC) completely flash and re-partition storage via Odin mode.
              </div>
            </div>
          ) : apple ? (
            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-white/5">
                <span className="text-slate-500 dark:text-slate-400">iOS Version:</span>
                <span className="font-semibold text-slate-900 dark:text-white">iOS {apple.latestOsVersion}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-white/5">
                <span className="text-slate-500 dark:text-slate-400">Build Number:</span>
                <span className="font-mono font-semibold text-slate-900 dark:text-white">{apple.buildNumber}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-white/5">
                <span className="text-slate-500 dark:text-slate-400">Channel Type:</span>
                <span className="font-semibold capitalize text-sky-600 dark:text-sky-400">{apple.releaseType.replace('_', ' ')}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-white/5">
                <span className="text-slate-500 dark:text-slate-400">OTA Download Size:</span>
                <span className="font-mono text-slate-900 dark:text-white">{apple.packageSize || 'Varies by device'}</span>
              </div>
              <div className="pt-2 text-[11px] text-slate-500 dark:text-slate-400 leading-normal">
                <strong>Release Channel:</strong> Stable public releases are delivered to all retail units. Developer and Public Betas contain experimental API changes and require Apple Beta Enrollment.
              </div>
            </div>
          ) : null}
        </div>

        {/* CARD 2: Version and Build Information */}
        <div className="fluent-acrylic rounded-2xl p-6 border border-white/50 dark:border-white/10 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200/40 dark:border-white/10">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Cpu className="w-4 h-4 text-sky-500" />
              <span>2. Version & Build Information</span>
            </h3>
            <span className="text-[11px] text-slate-400">Binary Lock</span>
          </div>

          {isSamsung && samsung ? (
            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-100/70 dark:bg-slate-800/60 border border-slate-200/40 dark:border-white/5">
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mb-1">Bootloader / Binary Revision:</div>
                <div className="text-base font-bold font-mono text-sky-600 dark:text-sky-400 flex items-center gap-2">
                  <span>Binary {samsung.bootloaderRevision}</span>
                  <span className="text-xs font-normal text-slate-500">(Position 5 in PDA)</span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                  Samsung hardware eFuse prevents flashing any firmware with a lower binary number than {samsung.bootloaderRevision}.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/40 dark:border-white/5">
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">Security Schedule:</div>
                  <div className="font-semibold text-slate-900 dark:text-white font-mono">{samsung.securitySchedule || 'Monthly'}</div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/40 dark:border-white/5">
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">Full Image Size:</div>
                  <div className="font-semibold text-slate-900 dark:text-white font-mono">{samsung.packageSizeFull || 'N/A'}</div>
                </div>
              </div>

              <div className="text-[11px] text-slate-500 dark:text-slate-400">
                <strong>Rollout State:</strong> {samsung.rolloutStatus.toUpperCase()} (Confirmed by Samsung FOTA infrastructure).
              </div>
            </div>
          ) : apple ? (
            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-100/70 dark:bg-slate-800/60 border border-slate-200/40 dark:border-white/5">
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mb-1">Supported Apple Devices:</div>
                <div className="text-xs font-medium text-slate-800 dark:text-slate-200 leading-relaxed">
                  {apple.supportedDevices.slice(0, 5).join(', ')}
                  {apple.supportedDevices.length > 5 && ` and ${apple.supportedDevices.length - 5} more devices`}
                </div>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-white/5">
                <span className="text-slate-500 dark:text-slate-400">Hardware Model:</span>
                <span className="font-mono font-semibold text-slate-900 dark:text-white">{apple.modelIdentifier}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-white/5">
                <span className="text-slate-500 dark:text-slate-400">Kernel Version:</span>
                <span className="font-mono text-slate-900 dark:text-white">Darwin 24.x</span>
              </div>
            </div>
          ) : null}
        </div>

        {/* CARD 3: Release Notes & Features */}
        <div className="fluent-acrylic rounded-2xl p-6 border border-white/50 dark:border-white/10 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200/40 dark:border-white/10">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-sky-500" />
              <span>3. Release Notes & Highlights</span>
            </h3>
            <span className="text-[11px] text-slate-400">Changelog</span>
          </div>

          <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
            {(current.changelog || []).map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-sky-500 font-bold shrink-0 mt-0.5">•</span>
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CARD 4: Security Information */}
        <div className="fluent-acrylic rounded-2xl p-6 border border-white/50 dark:border-white/10 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200/40 dark:border-white/10">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>4. Security Patch & CVE Bulletins</span>
            </h3>
            <span className="text-[11px] text-slate-400">Advisories</span>
          </div>

          <div className="space-y-3 text-xs">
            {isSamsung && samsung && (
              <div className="flex justify-between items-center p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 font-semibold">
                <span>Android Security Patch Level:</span>
                <span className="font-mono">{samsung.securityPatchLevel}</span>
              </div>
            )}

            <div className="space-y-2">
              <div className="font-semibold text-slate-800 dark:text-slate-200">Resolved Vulnerabilities:</div>
              <ul className="space-y-1.5 text-slate-600 dark:text-slate-400">
                {(current.securityFixes || []).map((fix, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-500 font-bold shrink-0 mt-0.5">✓</span>
                    <span className="leading-relaxed">{fix}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* CARD 5: Region & CSC Information */}
        <div className="fluent-acrylic rounded-2xl p-6 border border-white/50 dark:border-white/10 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200/40 dark:border-white/10">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Calendar className="w-4 h-4 text-sky-500" />
              <span>5. Region & CSC Market Breakdown</span>
            </h3>
            <span className="text-[11px] text-slate-400">Geography</span>
          </div>

          {isSamsung && samsung ? (
            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-white/5">
                <span className="text-slate-500 dark:text-slate-400">Active CSC Code:</span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">{samsung.csc}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-white/5">
                <span className="text-slate-500 dark:text-slate-400">Country / Market:</span>
                <span className="font-semibold text-slate-900 dark:text-white">{samsung.cscRegion}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-white/5">
                <span className="text-slate-500 dark:text-slate-400">Carrier Customization:</span>
                <span className="text-slate-900 dark:text-white">{samsung.cscCarrier || 'Open Market'}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-white/5">
                <span className="text-slate-500 dark:text-slate-400">Multi-CSC Package:</span>
                <span className="font-mono font-bold text-sky-600 dark:text-sky-400">{samsung.multiCscGroup} (Multi-CSC Bundle)</span>
              </div>
              <div className="pt-2 text-[11px] text-slate-500 dark:text-slate-400">
                <strong>Multi-CSC Architecture:</strong> Samsung OXM multi-CSC packages contain network configurations for multiple countries. Your phone automatically selects active CSC based on the inserted SIM card.
              </div>
            </div>
          ) : apple ? (
            <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <p>Apple iOS firmware is globally distributed without regional carrier lock partitions (except where legally mandated, e.g. eSIM-only in North America or dual physical SIM in mainland China/Hong Kong).</p>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-white/5">
                <span className="text-slate-500">Distribution:</span>
                <span className="font-semibold text-slate-900 dark:text-white">Worldwide Global Apple CDN</span>
              </div>
            </div>
          ) : null}
        </div>

        {/* CARD 6: Previous Versions / Update History */}
        <div className="fluent-acrylic rounded-2xl p-6 border border-white/50 dark:border-white/10 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200/40 dark:border-white/10">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <GitCompare className="w-4 h-4 text-sky-500" />
              <span>6. Previous Versions & Release History</span>
            </h3>
            <span className="text-[11px] text-slate-400">Timeline</span>
          </div>

          <div className="space-y-2 text-xs">
            {isSamsung && samsung && samsung.previousVersions.length > 0 ? (
              samsung.previousVersions.map((prev, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/40 dark:border-white/5 flex items-center justify-between"
                >
                  <div>
                    <div className="font-mono font-bold text-slate-800 dark:text-slate-200">{prev.pda}</div>
                    <div className="text-[11px] text-slate-500">
                      One UI {prev.oneUi} · Android {prev.android} · Binary {prev.bootloaderRevision}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[11px] text-slate-400 tabular-nums">{prev.releaseDate}</div>
                    {onOpenCompare && (
                      <button
                        onClick={() => onOpenCompare(samsung.latestPda, prev.pda)}
                        className="text-[11px] text-sky-600 dark:text-sky-400 hover:underline inline-flex items-center gap-0.5 mt-0.5"
                      >
                        <span>Compare</span>
                      </button>
                    )}
                  </div>
                </div>
              ))
            ) : apple && apple.previousVersions.length > 0 ? (
              apple.previousVersions.map((prev, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/40 dark:border-white/5 flex items-center justify-between"
                >
                  <div>
                    <div className="font-bold text-slate-800 dark:text-slate-200">iOS {prev.osVersion}</div>
                    <div className="text-[11px] text-slate-500 font-mono">Build {prev.buildNumber}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[11px] text-slate-400 tabular-nums">{prev.releaseDate}</div>
                    {onOpenCompare && (
                      <button
                        onClick={() => onOpenCompare(apple.buildNumber, prev.buildNumber)}
                        className="text-[11px] text-sky-600 dark:text-sky-400 hover:underline inline-flex items-center gap-0.5 mt-0.5"
                      >
                        <span>Compare</span>
                      </button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-slate-500 text-[11px] py-2">
                This is the initial verified release recorded in the firmware tracker for this configuration.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CARD 7: Official Sources & Direct Verification Links */}
      <div className="fluent-acrylic rounded-2xl p-6 border border-white/50 dark:border-white/10 space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200/40 dark:border-white/10">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <ExternalLink className="w-4 h-4 text-sky-500" />
            <span>7. Official Manufacturer Sources</span>
          </h3>
          <span className="text-[11px] text-slate-400 tabular-nums">
            Verified {new Date(current.verifiedAt).toLocaleDateString()}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
          <div>
            <div className="font-semibold text-slate-800 dark:text-slate-200">{current.sourceName}</div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 max-w-xl">
              Authentic manufacturer documentation provided by {isSamsung ? 'Samsung Mobile Global Release Channel' : 'Apple Inc. Security and Developer Services'}.
            </p>
          </div>

          <a
            href={isSamsung ? samsung?.officialSourceUrl : apple?.officialReleaseNotesUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold transition-colors shrink-0 shadow-sm"
          >
            <span>View Official Bulletin</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};

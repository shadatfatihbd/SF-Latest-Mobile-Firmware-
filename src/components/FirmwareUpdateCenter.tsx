import React, { useState, useEffect } from 'react';
import {
  HomepageUpdateWidgets as WidgetsData,
  UpcomingFirmwareRecord,
  SecurityCalendarEntry,
  UpcomingStatusLabel,
  VerificationStatusLabel,
} from '../types/firmware';
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
  Search,
  Bell,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  Activity,
} from 'lucide-react';

interface FirmwareUpdateCenterProps {
  widgets: WidgetsData;
  onSelectSamsungModel: (model: string, csc: string) => void;
  onSelectAppleModel: (model: string) => void;
  onRefreshData?: () => void;
  isRefreshing?: boolean;
  onOpenSubscribe?: () => void;
}

export const FirmwareUpdateCenter: React.FC<FirmwareUpdateCenterProps> = ({
  widgets,
  onSelectSamsungModel,
  onSelectAppleModel,
  onRefreshData,
  isRefreshing = false,
  onOpenSubscribe,
}) => {
  // Main Tab: Latest / Upcoming / Security Calendar
  const [activeMainSection, setActiveMainSection] = useState<'latest' | 'upcoming' | 'security'>('latest');

  // Platform filter: All / Samsung / Apple
  const [platformFilter, setPlatformFilter] = useState<'all' | 'samsung' | 'apple'>('all');

  // Upcoming category sub-filter
  const [upcomingSubFilter, setUpcomingSubFilter] = useState<'all' | 'announcement' | 'beta' | 'internal_testing' | 'prediction'>('all');
  const [upcomingModelQuery, setUpcomingModelQuery] = useState('');

  // Security calendar filter
  const [calendarTierFilter, setCalendarTierFilter] = useState<'all' | 'Monthly' | 'Quarterly' | 'Biannual' | 'Supplemental'>('all');

  // Live data from backend
  const [upcomingList, setUpcomingList] = useState<UpcomingFirmwareRecord[]>([]);
  const [securityCalendar, setSecurityCalendar] = useState<SecurityCalendarEntry[]>([]);
  const [isLoadingUpcoming, setIsLoadingUpcoming] = useState(false);
  const [lastCheckedAt, setLastCheckedAt] = useState<string>(new Date().toISOString());

  // Fetch upcoming and security calendar on mount
  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setIsLoadingUpcoming(true);
    try {
      const [upRes, calRes] = await Promise.all([
        fetch('/api/firmware/upcoming'),
        fetch('/api/firmware/security-calendar'),
      ]);
      const upData = await upRes.json();
      const calData = await calRes.json();

      if (upData.success && upData.records) {
        setUpcomingList(upData.records);
      }
      if (calData.success && calData.calendar) {
        setSecurityCalendar(calData.calendar);
      }
      setLastCheckedAt(new Date().toISOString());
    } catch (e) {
      console.warn('Could not fetch upcoming/calendar data from backend:', e);
    } finally {
      setIsLoadingUpcoming(false);
    }
  };

  const handleManualRefresh = async () => {
    if (onRefreshData) {
      onRefreshData();
    }
    await fetchDashboardData();
  };

  // Status badge styling
  const renderStatusBadge = (status: UpcomingStatusLabel | VerificationStatusLabel | string) => {
    switch (status) {
      case 'Verified Latest':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <ShieldCheck className="w-3 h-3" />
            <span>Verified Latest</span>
          </span>
        );
      case 'Officially Announced':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
            <Sparkles className="w-3 h-3" />
            <span>Officially Announced</span>
          </span>
        );
      case 'Beta Available':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
            <Activity className="w-3 h-3" />
            <span>Beta Available</span>
          </span>
        );
      case 'Testing Reported':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
            <RefreshCw className="w-3 h-3" />
            <span>Testing Reported</span>
          </span>
        );
      case 'Rolling Out':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20">
            <RefreshCw className="w-3 h-3" />
            <span>Rolling Out</span>
          </span>
        );
      case 'Expected — Unconfirmed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20">
            <Clock className="w-3 h-3" />
            <span>Expected — Unconfirmed</span>
          </span>
        );
      case 'Release Window Unknown':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-slate-500/10 text-slate-600 dark:text-slate-400 border border-slate-500/20">
            <Info className="w-3 h-3" />
            <span>Release Window Unknown</span>
          </span>
        );
      case 'Cached — Refresh Failed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
            <AlertCircle className="w-3 h-3" />
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

  // Filter upcoming records
  const filteredUpcoming = upcomingList.filter((item) => {
    if (platformFilter !== 'all' && item.brand !== platformFilter) return false;
    if (upcomingSubFilter !== 'all' && item.category !== upcomingSubFilter) return false;
    if (upcomingModelQuery.trim()) {
      const q = upcomingModelQuery.trim().toUpperCase();
      const match =
        item.deviceModel.toUpperCase().includes(q) ||
        item.commercialName.toUpperCase().includes(q) ||
        (item.regionOrCsc && item.regionOrCsc.toUpperCase().includes(q));
      if (!match) return false;
    }
    return true;
  });

  // Filter security calendar
  const filteredCalendar = securityCalendar.filter((item) => {
    if (platformFilter === 'samsung' && item.manufacturer !== 'Samsung') return false;
    if (platformFilter === 'apple' && item.manufacturer !== 'Apple') return false;
    if (calendarTierFilter !== 'all' && item.scheduleTier !== calendarTierFilter) return false;
    return true;
  });

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 my-10 text-left space-y-6">
      {/* Update Center Master Banner */}
      <div className="fluent-acrylic rounded-3xl p-6 sm:p-8 border border-white/60 dark:border-white/10 shadow-lg space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-200/50 dark:border-white/10">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                Firmware & Security Update Center
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-ping" />
                Live Verification Hub
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-3xl">
              Authoritative intelligence dashboard tracking live verified releases, official roadmap previews, device-specific testing feeds, and monthly security bulletins.
            </p>
          </div>

          {/* Action Tools: Refresh & Subscribe */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block text-right">
              <div>Verification Feed Active</div>
              <div className="tabular-nums text-[10px] text-slate-400">
                Last checked: {lastCheckedAt.replace('T', ' ').slice(0, 19)} UTC
              </div>
            </div>

            <button
              onClick={handleManualRefresh}
              disabled={isRefreshing || isLoadingUpcoming}
              className="px-3 py-2 rounded-xl text-xs font-semibold bg-white/70 dark:bg-slate-800/70 hover:bg-white dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-300/60 dark:border-white/10 shadow-sm transition-all flex items-center gap-1.5 disabled:opacity-50"
              title="Query Samsung FOTA servers & Apple RSS feeds"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing || isLoadingUpcoming ? 'animate-spin text-sky-500' : ''}`} />
              <span>Refresh Sources</span>
            </button>

            {onOpenSubscribe && (
              <button
                onClick={onOpenSubscribe}
                className="px-3 py-2 rounded-xl text-xs font-semibold bg-sky-600 hover:bg-sky-500 text-white shadow-sm transition-all flex items-center gap-1.5"
              >
                <Bell className="w-3.5 h-3.5" />
                <span>Get Alerts</span>
              </button>
            )}
          </div>
        </div>

        {/* 3 Main Sections Navigation Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="p-1 rounded-2xl bg-slate-200/60 dark:bg-slate-800/60 border border-slate-300/50 dark:border-white/5 flex flex-wrap items-center gap-1 text-xs">
            <button
              onClick={() => setActiveMainSection('latest')}
              className={`px-4 py-2 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                activeMainSection === 'latest'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>1. Latest Firmware Updates</span>
            </button>

            <button
              onClick={() => setActiveMainSection('upcoming')}
              className={`px-4 py-2 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                activeMainSection === 'upcoming'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Sparkles className="w-4 h-4 text-sky-500" />
              <span>2. Upcoming Firmware Updates</span>
              {upcomingList.length > 0 && (
                <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-sky-500/20 text-sky-600 dark:text-sky-300">
                  {upcomingList.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveMainSection('security')}
              className={`px-4 py-2 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                activeMainSection === 'security'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Lock className="w-4 h-4 text-indigo-500" />
              <span>3. Security Update Calendar</span>
            </button>
          </div>

          {/* Platform Filter: All / Samsung / Apple */}
          <div className="p-1 rounded-xl bg-slate-200/50 dark:bg-slate-800/40 border border-slate-300/40 dark:border-white/5 flex items-center gap-1 text-xs self-start sm:self-auto">
            <button
              onClick={() => setPlatformFilter('all')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                platformFilter === 'all'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              All Brands
            </button>
            <button
              onClick={() => setPlatformFilter('samsung')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                platformFilter === 'samsung'
                  ? 'bg-sky-600 text-white shadow-xs font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Samsung
            </button>
            <button
              onClick={() => setPlatformFilter('apple')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                platformFilter === 'apple'
                  ? 'bg-indigo-600 text-white shadow-xs font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Apple
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 1: LATEST FIRMWARE UPDATES                                        */}
      {/* ========================================================================= */}
      {activeMainSection === 'latest' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>Verified Latest Releases</span>
                <span className="text-xs font-normal text-slate-500 dark:text-slate-400">
                  · Evaluated against live FOTA gateways and Apple IPSW catalogs
                </span>
              </h3>
            </div>
            <div className="text-xs text-amber-600 dark:text-amber-400 font-medium">
              Device & CSC Specific
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* CARD 1: Samsung — Latest One UI */}
            {(platformFilter === 'all' || platformFilter === 'samsung') && (
              <div className="fluent-acrylic rounded-2xl p-6 border border-white/60 dark:border-white/10 shadow-md hover:border-sky-500/40 transition-all flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5" />
                      <span>Samsung · Latest One UI</span>
                    </span>
                    {renderStatusBadge(widgets.samsungLatestOneUi.statusLabel)}
                  </div>

                  <div>
                    <h4 className="text-xl font-bold text-slate-900 dark:text-white">
                      {widgets.samsungLatestOneUi.version}
                    </h4>
                    <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      Based on {widgets.samsungLatestOneUi.androidVersion}
                    </div>
                  </div>

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
                        {widgets.samsungLatestOneUi.applicableCsc} ({widgets.samsungLatestOneUi.region})
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
                  <span className="text-[11px] text-slate-400 truncate max-w-[160px]">
                    {widgets.samsungLatestOneUi.sourceName}
                  </span>
                  <button
                    onClick={() => onSelectSamsungModel(widgets.samsungLatestOneUi.deviceModel, widgets.samsungLatestOneUi.applicableCsc)}
                    className="text-sky-600 dark:text-sky-400 font-semibold inline-flex items-center gap-1 hover:underline"
                  >
                    <span>Inspect Build</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            )}

            {/* CARD 2: Samsung — Latest Security Patch */}
            {(platformFilter === 'all' || platformFilter === 'samsung') && (
              <div className="fluent-acrylic rounded-2xl p-6 border border-white/60 dark:border-white/10 shadow-md hover:border-emerald-500/40 transition-all flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5" />
                      <span>Samsung · Security Patch</span>
                    </span>
                    {renderStatusBadge(widgets.samsungLatestSecurityPatch.statusLabel)}
                  </div>

                  <div>
                    <h4 className="text-xl font-bold text-slate-900 dark:text-white">
                      {widgets.samsungLatestSecurityPatch.bulletinMonth} SMR
                    </h4>
                    <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      Patch Level: {widgets.samsungLatestSecurityPatch.patchLevel}
                    </div>
                  </div>

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
                    <span>Samsung SMR Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <button
                    onClick={() => onSelectSamsungModel(widgets.samsungLatestSecurityPatch.deviceModel, widgets.samsungLatestSecurityPatch.csc)}
                    className="text-emerald-600 dark:text-emerald-400 font-semibold inline-flex items-center gap-1 hover:underline"
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            )}

            {/* CARD 3: Apple — Latest Stable iOS */}
            {(platformFilter === 'all' || platformFilter === 'apple') && (
              <div className="fluent-acrylic rounded-2xl p-6 border border-white/60 dark:border-white/10 shadow-md hover:border-indigo-500/40 transition-all flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Smartphone className="w-3.5 h-3.5" />
                      <span>Apple · Latest Stable iOS</span>
                    </span>
                    {renderStatusBadge(widgets.appleLatestStableIos.statusLabel)}
                  </div>

                  <div>
                    <h4 className="text-xl font-bold text-slate-900 dark:text-white">
                      {widgets.appleLatestStableIos.version}
                    </h4>
                    <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      Public Stable Release Channel
                    </div>
                  </div>

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
                    <span>Apple Release Notes</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <button
                    onClick={() => onSelectAppleModel('iPhone 17 Pro Max')}
                    className="text-indigo-600 dark:text-indigo-400 font-semibold inline-flex items-center gap-1 hover:underline"
                  >
                    <span>View Build</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 2: UPCOMING FIRMWARE UPDATES                                      */}
      {/* ========================================================================= */}
      {activeMainSection === 'upcoming' && (
        <div className="space-y-6">
          {/* Section Introduction & Search Filter */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>Upcoming Firmware Updates</span>
                <span className="text-xs font-normal text-slate-500 dark:text-slate-400">
                  · Evidence-backed manufacturer roadmaps, beta releases & test servers
                </span>
              </h3>
            </div>

            {/* In-Section Model Query Filter */}
            <div className="relative min-w-[240px]">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={upcomingModelQuery}
                onChange={(e) => setUpcomingModelQuery(e.target.value)}
                placeholder="Filter upcoming by model (e.g. S24, A55)..."
                className="w-full pl-8 pr-3 py-1.5 rounded-xl text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-white/10 focus:outline-none focus:border-sky-500"
              />
            </div>
          </div>

          {/* Sub-Category Filter Tabs (A: Announced, B: Beta, C: Internal Testing, D: Predictions) */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <button
              onClick={() => setUpcomingSubFilter('all')}
              className={`px-3 py-1.5 rounded-xl font-medium transition-colors ${
                upcomingSubFilter === 'all'
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold shadow-xs'
                  : 'bg-white/60 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              All Categories ({upcomingList.length})
            </button>
            <button
              onClick={() => setUpcomingSubFilter('announcement')}
              className={`px-3 py-1.5 rounded-xl font-medium transition-colors ${
                upcomingSubFilter === 'announcement'
                  ? 'bg-blue-600 text-white font-semibold shadow-xs'
                  : 'bg-white/60 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              A. Officially Announced
            </button>
            <button
              onClick={() => setUpcomingSubFilter('beta')}
              className={`px-3 py-1.5 rounded-xl font-medium transition-colors ${
                upcomingSubFilter === 'beta'
                  ? 'bg-purple-600 text-white font-semibold shadow-xs'
                  : 'bg-white/60 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              B. Beta Available
            </button>
            <button
              onClick={() => setUpcomingSubFilter('internal_testing')}
              className={`px-3 py-1.5 rounded-xl font-medium transition-colors ${
                upcomingSubFilter === 'internal_testing'
                  ? 'bg-amber-600 text-white font-semibold shadow-xs'
                  : 'bg-white/60 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              C. Reported Internal Testing
            </button>
            <button
              onClick={() => setUpcomingSubFilter('prediction')}
              className={`px-3 py-1.5 rounded-xl font-medium transition-colors ${
                upcomingSubFilter === 'prediction'
                  ? 'bg-orange-600 text-white font-semibold shadow-xs'
                  : 'bg-white/60 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              D. Predictions / Lifecycle
            </button>
          </div>

          {/* Fallback Notice if query returned no results */}
          {filteredUpcoming.length === 0 ? (
            <div className="p-8 rounded-2xl bg-slate-100/70 dark:bg-slate-800/40 border border-slate-200 dark:border-white/10 text-center space-y-3">
              <Info className="w-8 h-8 text-slate-400 mx-auto" />
              <div className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                No verified upcoming firmware announcement is currently available.
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                SF Latest Firmware strictly enforces evidence-based reporting. We do not invent speculative dates or fabricate build numbers without official manufacturer confirmation or test server proof.
              </p>
              {upcomingModelQuery && (
                <button
                  onClick={() => setUpcomingModelQuery('')}
                  className="px-3.5 py-1.5 rounded-xl bg-sky-600 text-white text-xs font-semibold hover:bg-sky-500 transition-colors"
                >
                  Clear Model Filter
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredUpcoming.map((rec) => (
                <div
                  key={rec.id}
                  className="fluent-acrylic rounded-2xl p-6 border border-white/60 dark:border-white/10 shadow-md hover:border-sky-500/40 transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    {/* Header: Brand & Status */}
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
                        {rec.brand === 'samsung' ? <Cpu className="w-3.5 h-3.5" /> : <Smartphone className="w-3.5 h-3.5" />}
                        <span>{rec.brand === 'samsung' ? 'Samsung Galaxy' : 'Apple iPhone'}</span>
                      </span>
                      {renderStatusBadge(rec.status)}
                    </div>

                    {/* Version & Device */}
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                        {rec.expectedVersion}
                      </h4>
                      <div className="text-xs text-slate-700 dark:text-slate-300 font-semibold mt-0.5">
                        {rec.commercialName} <span className="font-mono text-slate-500 font-normal">({rec.deviceModel})</span>
                      </div>
                      {rec.expectedAndroidVersion && (
                        <div className="text-[11px] text-slate-500">
                          Platform: {rec.expectedAndroidVersion}
                        </div>
                      )}
                    </div>

                    {/* Specifications List */}
                    <div className="space-y-1.5 text-xs pt-1 border-t border-slate-100 dark:border-white/5">
                      <div className="flex justify-between py-1 border-b border-slate-100 dark:border-white/5">
                        <span className="text-slate-500">Release Window:</span>
                        <span className="font-semibold text-slate-900 dark:text-white tabular-nums">
                          {rec.expectedReleaseWindow || 'Release date not announced.'}
                        </span>
                      </div>

                      {rec.expectedBuild && (
                        <div className="flex justify-between py-1 border-b border-slate-100 dark:border-white/5">
                          <span className="text-slate-500">Expected Build:</span>
                          <span className="font-mono font-bold text-sky-600 dark:text-sky-400">
                            {rec.expectedBuild}
                          </span>
                        </div>
                      )}

                      {rec.regionOrCsc && (
                        <div className="flex justify-between py-1 border-b border-slate-100 dark:border-white/5">
                          <span className="text-slate-500">Region / CSC:</span>
                          <span className="font-medium text-slate-800 dark:text-slate-200">
                            {rec.regionOrCsc}
                          </span>
                        </div>
                      )}

                      {rec.testingHashCount !== undefined && (
                        <div className="flex justify-between py-1 border-b border-slate-100 dark:border-white/5">
                          <span className="text-slate-500">Server Test Hashes:</span>
                          <span className="font-mono font-bold text-amber-600 dark:text-amber-400">
                            {rec.testingHashCount} build candidates
                          </span>
                        </div>
                      )}

                      <div className="py-1">
                        <span className="text-slate-500 block text-[11px] mb-0.5">Evidence Source:</span>
                        <span className="text-slate-700 dark:text-slate-300 text-[11px] block leading-snug">
                          {rec.evidenceSource}
                        </span>
                        <span className="text-slate-400 text-[10px] tabular-nums block mt-0.5">
                          Published: {rec.evidenceDate} · Verified: {rec.verifiedAt.split('T')[0]}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer: Links and Actions */}
                  <div className="pt-3 border-t border-slate-200/40 dark:border-white/10 flex items-center justify-between text-xs">
                    {rec.evidenceUrl ? (
                      <a
                        href={rec.evidenceUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[11px] text-slate-400 hover:text-sky-500 inline-flex items-center gap-1"
                      >
                        <span>Verify Evidence</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <span className="text-[11px] text-slate-400">Official Lifecycle</span>
                    )}

                    <button
                      onClick={() => {
                        if (rec.brand === 'samsung') {
                          onSelectSamsungModel(rec.deviceModel, rec.regionOrCsc ? rec.regionOrCsc.slice(0, 3) : 'EUX');
                        } else {
                          onSelectAppleModel(rec.commercialName);
                        }
                      }}
                      className="text-sky-600 dark:text-sky-400 font-semibold inline-flex items-center gap-1 hover:underline"
                    >
                      <span>Track Model</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 3: LATEST & UPCOMING SECURITY UPDATES (CALENDAR)                  */}
      {/* ========================================================================= */}
      {activeMainSection === 'security' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>Security Update Calendar</span>
                <span className="text-xs font-normal text-slate-500 dark:text-slate-400">
                  · Monthly, quarterly, and biannual patch schedules
                </span>
              </h3>
            </div>

            {/* Tier Filter */}
            <div className="p-1 rounded-xl bg-slate-200/50 dark:bg-slate-800/40 border border-slate-300/40 dark:border-white/5 flex flex-wrap items-center gap-1 text-xs">
              <button
                onClick={() => setCalendarTierFilter('all')}
                className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                  calendarTierFilter === 'all'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                All Schedules
              </button>
              <button
                onClick={() => setCalendarTierFilter('Monthly')}
                className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                  calendarTierFilter === 'Monthly'
                    ? 'bg-sky-600 text-white shadow-xs font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setCalendarTierFilter('Quarterly')}
                className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                  calendarTierFilter === 'Quarterly'
                    ? 'bg-emerald-600 text-white shadow-xs font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Quarterly
              </button>
              <button
                onClick={() => setCalendarTierFilter('Biannual')}
                className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                  calendarTierFilter === 'Biannual'
                    ? 'bg-purple-600 text-white shadow-xs font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Biannual
              </button>
            </div>
          </div>

          {/* Critical Distinction Banner */}
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-3">
            <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold">Bulletin Publication vs. Device Rollout Distinction:</span>
              <p className="leading-relaxed">
                A published Samsung or Apple security bulletin announces patches developed and verified for that cycle. A new bulletin does <em>not</em> prove every individual model and carrier CSC has rolled out the firmware. Devices receive firmware according to published schedule tiers and regional testing approval.
              </p>
            </div>
          </div>

          {/* Calendar Table Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCalendar.map((entry) => (
              <div
                key={entry.id}
                className="fluent-acrylic rounded-2xl p-6 border border-white/60 dark:border-white/10 shadow-md hover:border-indigo-500/40 transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5" />
                      <span>{entry.manufacturer} · {entry.scheduleTier} Tier</span>
                    </span>
                    <span
                      className={`px-2.5 py-0.5 rounded-md text-[11px] font-semibold border ${
                        entry.rolloutStatus === 'Released'
                          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
                          : entry.rolloutStatus === 'Rolling Out'
                          ? 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20'
                          : 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20'
                      }`}
                    >
                      {entry.rolloutStatus}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-xl font-bold text-slate-900 dark:text-white">
                      {entry.bulletinMonth}
                    </h4>
                    <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      Target Patch Level: {entry.patchLevel}
                    </div>
                  </div>

                  <div className="space-y-1.5 text-xs pt-1 border-t border-slate-100 dark:border-white/5">
                    <div className="flex justify-between py-1 border-b border-slate-100 dark:border-white/5">
                      <span className="text-slate-500">Expected Date:</span>
                      <span className="font-semibold text-slate-900 dark:text-white tabular-nums">
                        {entry.expectedDate}
                      </span>
                    </div>

                    <div className="flex justify-between py-1 border-b border-slate-100 dark:border-white/5">
                      <span className="text-slate-500">Rollout Status:</span>
                      <span className="font-medium text-slate-800 dark:text-slate-200">
                        {entry.rolloutDate || 'Staggered by CSC'}
                      </span>
                    </div>

                    <div className="py-1">
                      <span className="text-slate-500 block text-[11px] mb-1">Target Device Scope:</span>
                      <div className="text-[11px] font-medium text-slate-800 dark:text-slate-200">
                        {entry.deviceFamily}
                      </div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {entry.sampleModels.map((m, i) => (
                          <span
                            key={i}
                            className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px] font-mono text-slate-700 dark:text-slate-300"
                          >
                            {m}
                          </span>
                        ))}
                      </div>
                    </div>

                    {entry.cveCount && (
                      <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold pt-1">
                        Scope: {entry.cveCount}
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200/40 dark:border-white/10 flex items-center justify-between text-xs">
                  <a
                    href={entry.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] text-slate-400 hover:text-indigo-500 inline-flex items-center gap-1"
                  >
                    <span>Official Advisory</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  <button
                    onClick={() => {
                      if (entry.manufacturer === 'Samsung') {
                        onSelectSamsungModel(entry.sampleModels[0], 'EUX');
                      } else {
                        onSelectAppleModel(entry.sampleModels[0]);
                      }
                    }}
                    className="text-indigo-600 dark:text-indigo-400 font-semibold inline-flex items-center gap-1 hover:underline"
                  >
                    <span>Check Devices</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

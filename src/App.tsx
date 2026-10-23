import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HeroSearch } from './components/HeroSearch';
import { PlatformCards } from './components/PlatformCards';
import { LatestUpdatesSection } from './components/LatestUpdatesSection';
import { SearchResults } from './components/SearchResults';
import { HomepageUpdateWidgetsComponent } from './components/HomepageUpdateWidgets';
import { AlertSubscribeModal } from './components/AlertSubscribeModal';
import { CscDirectoryModal } from './components/CscDirectoryModal';
import { UpdateComparisonModal } from './components/UpdateComparisonModal';
import { SamsungPage } from './pages/SamsungPage';
import { ApplePage } from './pages/ApplePage';
import { HistoryPage } from './pages/HistoryPage';
import { AboutPage } from './pages/AboutPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { FirmwareRecord, CscDirectoryEntry, HomepageUpdateWidgets, DeveloperDiagnostics } from './types/firmware';
import { ALL_VERIFIED_FIRMWARE, getHomepageWidgetsData, AUTHORITATIVE_CSC_DATABASE } from './data/authoritativeDatabase';
import { compareSamsungBuilds, compareAppleBuilds } from './utils/versionParser';
import { Sparkles, History as HistoryIcon, RefreshCw, CheckCircle2, AlertTriangle } from 'lucide-react';

export default function App() {
  // Theme state: defaults to dark for Microsoft Fluent Mica style
  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem('sf_theme');
    return saved ? saved === 'dark' : true;
  });

  // Client-side routing state
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });

  // Search state
  const [searchModel, setSearchModel] = useState<string>('');
  const [searchCsc, setSearchCsc] = useState<string>('');
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<FirmwareRecord[] | null>(null);
  const [searchDiagnostics, setSearchDiagnostics] = useState<DeveloperDiagnostics | undefined>(undefined);
  const [matchedCscInfo, setMatchedCscInfo] = useState<CscDirectoryEntry | undefined>(undefined);
  const [isLiveVerifying, setIsLiveVerifying] = useState<boolean>(false);
  const [liveVerificationNotice, setLiveVerificationNotice] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [refreshNotification, setRefreshNotification] = useState<string | null>(null);

  // Homepage widgets data
  const [widgetsData, setWidgetsData] = useState<HomepageUpdateWidgets>(() => getHomepageWidgetsData());

  // Recent Searches in localStorage
  const [recentSearches, setRecentSearches] = useState<Array<{ model: string; csc?: string }>>(() => {
    try {
      return JSON.parse(localStorage.getItem('sf_recent_searches') || '[]');
    } catch {
      return [];
    }
  });

  // Modals state
  const [subscribeModalOpen, setSubscribeModalOpen] = useState(false);
  const [cscModalOpen, setCscModalOpen] = useState(false);
  const [compareModalOpen, setCompareModalOpen] = useState(false);
  const [compareBuilds, setCompareBuilds] = useState<{ b1: string; b2: string }>({
    b1: 'A556EXXS4AXK2',
    b2: 'A556EXXU3AXH1',
  });

  // Apply dark mode class to html element
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('sf_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('sf_theme', 'light');
    }
  }, [isDark]);

  // Fetch Homepage Widgets on load
  useEffect(() => {
    fetch('/api/firmware/widgets')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.widgets) {
          setWidgetsData(data.widgets);
        }
      })
      .catch((err) => console.log('Using default widgets cache:', err));
  }, []);

  // Handle browser popstate navigation & initial query param checks
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);

    // Check URL parameters for model / csc on initial load
    const params = new URLSearchParams(window.location.search);
    const modelParam = params.get('model');
    const cscParam = params.get('csc');
    if (modelParam) {
      setSearchModel(modelParam);
      if (cscParam) setSearchCsc(cscParam);
      performSearch(modelParam, cscParam || '');
    }

    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path: string, urlParams?: Record<string, string>) => {
    let target = path;
    if (urlParams) {
      const q = new URLSearchParams(urlParams).toString();
      target = `${path}?${q}`;
    }
    window.history.pushState({}, '', target);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const performSearch = async (model: string, csc: string, liveVerify?: boolean) => {
    if (!model.trim()) return;
    setIsSearching(true);
    setLiveVerificationNotice(null);
    setRefreshNotification(null);

    // Save to recent searches
    const updatedRecents = [
      { model: model.trim(), csc: csc.trim() || undefined },
      ...recentSearches.filter(
        (s) => s.model.toUpperCase() !== model.trim().toUpperCase()
      ),
    ].slice(0, 6);
    setRecentSearches(updatedRecents);
    localStorage.setItem('sf_recent_searches', JSON.stringify(updatedRecents));

    try {
      const endpoint = `/api/firmware/search?model=${encodeURIComponent(model.trim())}&csc=${encodeURIComponent(csc.trim())}`;
      const res = await fetch(endpoint);
      const data = await res.json();

      if (data.success) {
        setSearchResults(data.records);
        setMatchedCscInfo(data.matchedCsc);
        setSearchDiagnostics(data.diagnostics);
        setSearchModel(model);
        setSearchCsc(csc);

        // Update URL query params
        const newUrl = new URL(window.location.href);
        newUrl.searchParams.set('model', model.trim());
        if (csc.trim()) newUrl.searchParams.set('csc', csc.trim());
        window.history.replaceState({}, '', newUrl.toString());

        if (liveVerify) {
          triggerLiveVerification(model.trim(), csc.trim());
        }
      } else {
        setSearchResults([]);
        setSearchDiagnostics(data.diagnostics);
      }
    } catch (err) {
      console.warn('API unavailable or static host mode. Using client-side verified engine:', err);
      const cleanM = model.trim().toUpperCase();
      const cleanCsc = csc.trim().toUpperCase();

      const filtered = ALL_VERIFIED_FIRMWARE.filter((f) => {
        const matchesModel =
          f.model.toUpperCase().includes(cleanM) ||
          ('commercialName' in f && (f as any).commercialName.toUpperCase().includes(cleanM)) ||
          ('modelIdentifier' in f && (f as any).modelIdentifier.toUpperCase().includes(cleanM));
        if (!matchesModel) return false;
        if (cleanCsc && f.brand === 'samsung') {
          return (f as any).csc.toUpperCase() === cleanCsc;
        }
        return true;
      });

      // Sort deterministically using versionParser
      const sorted = [...filtered].sort((a, b) => {
        if (a.brand === 'samsung' && b.brand === 'samsung') {
          return compareSamsungBuilds((b as any).latestPda, (a as any).latestPda);
        } else if (a.brand === 'apple' && b.brand === 'apple') {
          return compareAppleBuilds((b as any).buildNumber, (a as any).buildNumber, true);
        }
        return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
      });

      setSearchResults(sorted);
      setSearchModel(model);
      setSearchCsc(csc);

      if (cleanCsc) {
        const cscMatch = AUTHORITATIVE_CSC_DATABASE.find((c) => c.csc.toUpperCase() === cleanCsc);
        setMatchedCscInfo(cscMatch);
      }
    } finally {
      setIsSearching(false);
    }
  };

  const triggerLiveVerification = async (model: string, csc?: string) => {
    setIsLiveVerifying(true);
    setLiveVerificationNotice(null);

    try {
      const res = await fetch('/api/firmware/live-verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model, csc }),
      });
      const data = await res.json();

      if (data.success && data.result) {
        const result = data.result;
        if (result.matchedRecord) {
          setSearchResults([result.matchedRecord, ...(searchResults || []).filter(r => r.id !== result.matchedRecord.id)]);
        }
        setLiveVerificationNotice(
          result.liveGroundingNotes || 'Live check completed via official newsroom sources.'
        );
      }
    } catch (err: any) {
      console.error('Live verify error:', err);
      setLiveVerificationNotice('Live verification temporarily unavailable. Retaining cached verified release.');
    } finally {
      setIsLiveVerifying(false);
    }
  };

  const handleManualRefresh = async (model?: string, csc?: string) => {
    setIsRefreshing(true);
    setRefreshNotification(null);

    try {
      const res = await fetch('/api/firmware/refresh', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model, csc }),
      });
      const data = await res.json();
      setRefreshNotification(data.message || 'Provider metadata refreshed successfully.');

      // Refresh widgets
      const widgetRes = await fetch('/api/firmware/widgets');
      const widgetData = await widgetRes.json();
      if (widgetData.success) {
        setWidgetsData(widgetData.widgets);
      }

      // If active search exists, re-run search
      if (searchModel) {
        performSearch(searchModel, searchCsc);
      }
    } catch (err: any) {
      setRefreshNotification('Refresh notice: Retaining cached verified results with original timestamps.');
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleSelectRecord = (record: FirmwareRecord) => {
    setSearchResults([record]);
    setSearchModel(record.model);
    if (record.brand === 'samsung') {
      setSearchCsc((record as any).csc || '');
    }
    navigateTo('/', {
      model: record.model,
      ...(record.brand === 'samsung' && (record as any).csc ? { csc: (record as any).csc } : {}),
    });
  };

  const handleOpenCompare = (b1: string, b2?: string) => {
    setCompareBuilds({
      b1,
      b2: b2 || 'A556EXXU3AXH1',
    });
    setCompareModalOpen(true);
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('sf_recent_searches');
  };

  return (
    <div className="min-w-[320px] min-h-screen flex flex-col bg-slate-100 dark:bg-neutral-950 text-slate-900 dark:text-neutral-100 transition-colors fluent-bg-mesh">
      {/* 3-Zone Fluent Header */}
      <Header
        currentPath={currentPath}
        onNavigate={(p) => navigateTo(p)}
        isDark={isDark}
        onToggleTheme={() => setIsDark(!isDark)}
        onOpenSubscribe={() => setSubscribeModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentPath === '/' && (
          <div>
            {/* Hero Section */}
            <HeroSearch
              onSearch={performSearch}
              isLoading={isSearching}
              initialModel={searchModel}
              initialCsc={searchCsc}
            />

            {/* Recent Searches Bar */}
            {recentSearches.length > 0 && (
              <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-6 flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1">
                    <HistoryIcon className="w-3.5 h-3.5" />
                    <span>Recent Searches:</span>
                  </span>
                  {recentSearches.map((s, idx) => (
                    <button
                      key={idx}
                      onClick={() => performSearch(s.model, s.csc || '')}
                      className="px-2.5 py-1 rounded-lg bg-white/70 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 hover:border-sky-500 text-slate-700 dark:text-slate-300 font-mono"
                    >
                      <span>{s.model}</span>
                      {s.csc && <span className="text-sky-600 dark:text-sky-400 ml-1">({s.csc})</span>}
                    </button>
                  ))}
                </div>
                <button
                  onClick={clearRecentSearches}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                >
                  Clear History
                </button>
              </div>
            )}

            {/* Notification or Live Verification Banner */}
            {refreshNotification && (
              <div className="max-w-5xl mx-auto px-4 sm:px-6 mb-4 text-left">
                <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-900 dark:text-emerald-200 flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{refreshNotification}</span>
                </div>
              </div>
            )}

            {liveVerificationNotice && (
              <div className="max-w-5xl mx-auto px-4 sm:px-6 mb-4 text-left">
                <div className="p-4 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-xs text-sky-900 dark:text-sky-200 flex items-start gap-3">
                  <Sparkles className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <span className="font-bold">Live Search Grounding Report:</span>
                    <p className="leading-relaxed">{liveVerificationNotice}</p>
                  </div>
                </div>
              </div>
            )}

            {/* If search performed, show detailed SearchResultsView */}
            {searchResults !== null ? (
              <SearchResults
                records={searchResults}
                queryModel={searchModel}
                queryCsc={searchCsc}
                matchedCsc={matchedCscInfo}
                diagnostics={searchDiagnostics}
                onLiveVerify={triggerLiveVerification}
                isLiveVerifying={isLiveVerifying}
                onOpenCompare={handleOpenCompare}
                onManualRefresh={() => handleManualRefresh(searchModel, searchCsc)}
                isRefreshing={isRefreshing}
              />
            ) : (
              <>
                {/* PROMINENT "LATEST SOFTWARE UPDATES" WIDGETS SECTION */}
                <HomepageUpdateWidgetsComponent
                  widgets={widgetsData}
                  onSelectSamsungModel={(model, csc) => {
                    setSearchModel(model);
                    setSearchCsc(csc);
                    performSearch(model, csc);
                  }}
                  onSelectAppleModel={(model) => {
                    setSearchModel(model);
                    setSearchCsc('');
                    performSearch(model, '');
                  }}
                  onRefreshData={() => handleManualRefresh()}
                  isRefreshing={isRefreshing}
                />

                {/* Platform Cards (Samsung Galaxy vs Apple iPhone) */}
                <PlatformCards
                  onSelectSamsung={() => navigateTo('/samsung')}
                  onSelectApple={() => navigateTo('/apple')}
                />

                {/* Recently Verified Firmware Updates Feed */}
                <LatestUpdatesSection
                  updates={ALL_VERIFIED_FIRMWARE}
                  onSelectRecord={handleSelectRecord}
                />
              </>
            )}
          </div>
        )}

        {currentPath === '/samsung' && (
          <SamsungPage
            onSelectRecord={handleSelectRecord}
            onOpenCscDirectory={() => setCscModalOpen(true)}
          />
        )}

        {currentPath === '/apple' && (
          <ApplePage onSelectRecord={handleSelectRecord} />
        )}

        {currentPath === '/history' && (
          <HistoryPage
            onOpenCompare={handleOpenCompare}
            onSelectRecord={handleSelectRecord}
          />
        )}

        {currentPath === '/about' && <AboutPage />}

        {currentPath === '/privacy' && <PrivacyPage />}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={(p) => navigateTo(p)}
        onOpenCscModal={() => setCscModalOpen(true)}
      />

      {/* Modals */}
      <AlertSubscribeModal
        isOpen={subscribeModalOpen}
        onClose={() => setSubscribeModalOpen(false)}
        defaultModel={searchModel}
        defaultCsc={searchCsc}
      />

      <CscDirectoryModal
        isOpen={cscModalOpen}
        onClose={() => setCscModalOpen(false)}
        onSelectCsc={(csc) => {
          setSearchCsc(csc);
          if (searchModel) {
            performSearch(searchModel, csc);
          }
        }}
      />

      <UpdateComparisonModal
        isOpen={compareModalOpen}
        onClose={() => setCompareModalOpen(false)}
        build1={compareBuilds.b1}
        build2={compareBuilds.b2}
      />
    </div>
  );
}

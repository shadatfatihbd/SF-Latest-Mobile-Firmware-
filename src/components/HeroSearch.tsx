import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Search,
  X,
  Sparkles,
  Smartphone,
  Globe2,
  CheckCircle2,
  Apple,
  Layers,
  History,
  TrendingUp,
  ArrowRight,
  SlidersHorizontal,
} from 'lucide-react';
import { SearchSuggestionItem } from '../types/firmware';
import { getSearchSuggestions } from '../data/deviceCatalogue';

interface HeroSearchProps {
  onSearch: (model: string, csc: string, liveVerify?: boolean) => void;
  isLoading: boolean;
  initialModel?: string;
  initialCsc?: string;
  onOpenCscDirectory?: () => void;
}

export const HeroSearch: React.FC<HeroSearchProps> = ({
  onSearch,
  isLoading,
  initialModel = '',
  initialCsc = '',
  onOpenCscDirectory,
}) => {
  const [modelInput, setModelInput] = useState(initialModel);
  const [cscInput, setCscInput] = useState(initialCsc);
  const [enableLiveVerification, setEnableLiveVerification] = useState(false);

  // Autocomplete dropdown state
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'samsung' | 'csc' | 'apple'>('all');
  const [suggestions, setSuggestions] = useState<{
    samsungDevices: SearchSuggestionItem[];
    samsungCscs: SearchSuggestionItem[];
    appleDevices: SearchSuggestionItem[];
    totalCount: number;
  }>({ samsungDevices: [], samsungCscs: [], appleDevices: [], totalCount: 0 });
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  // Recent searches stored in localStorage
  const [recentSearches, setRecentSearches] = useState<Array<{ model: string; csc?: string }>>(() => {
    try {
      return JSON.parse(localStorage.getItem('sf_recent_searches') || '[]');
    } catch {
      return [];
    }
  });

  const searchContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sync initial props
  useEffect(() => {
    if (initialModel) setModelInput(initialModel);
    if (initialCsc) setCscInput(initialCsc);
  }, [initialModel, initialCsc]);

  // Check if current input is an Apple query
  const isAppleDetected =
    modelInput.toLowerCase().includes('iphone') ||
    modelInput.toLowerCase().startsWith('a3') ||
    modelInput.toLowerCase().startsWith('a2') ||
    modelInput.toLowerCase().startsWith('a1') ||
    /^iphone\d/i.test(modelInput.trim());

  // Debounced suggestions fetch
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchSuggestions(modelInput);
    }, 120);

    return () => clearTimeout(timer);
  }, [modelInput]);

  const fetchSuggestions = async (query: string) => {
    try {
      const res = await fetch(`/api/catalogue/search?q=${encodeURIComponent(query.trim())}`);
      if (res.ok) {
        const data = await res.json();
        setSuggestions({
          samsungDevices: data.samsungDevices || [],
          samsungCscs: data.samsungCscs || [],
          appleDevices: data.appleDevices || [],
          totalCount: data.totalCount || 0,
        });
      } else {
        // Fallback to client-side catalog generator
        const local = getSearchSuggestions(query);
        setSuggestions(local);
      }
    } catch {
      const local = getSearchSuggestions(query);
      setSuggestions(local);
    }
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // Filtered suggestions based on category tab
  const getFilteredSuggestionsList = useCallback((): SearchSuggestionItem[] => {
    if (categoryFilter === 'samsung') return suggestions.samsungDevices;
    if (categoryFilter === 'csc') return suggestions.samsungCscs;
    if (categoryFilter === 'apple') return suggestions.appleDevices;
    return [...suggestions.samsungDevices, ...suggestions.samsungCscs, ...suggestions.appleDevices];
  }, [categoryFilter, suggestions]);

  const flatList = getFilteredSuggestionsList();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isDropdownOpen) {
      if (e.key === 'ArrowDown') {
        setIsDropdownOpen(true);
        setActiveIndex(0);
        e.preventDefault();
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => (prev < flatList.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : flatList.length - 1));
    } else if (e.key === 'Enter') {
      if (activeIndex >= 0 && flatList[activeIndex]) {
        e.preventDefault();
        handleSelectSuggestion(flatList[activeIndex]);
      }
    } else if (e.key === 'Escape') {
      setIsDropdownOpen(false);
      setActiveIndex(-1);
    }
  };

  const handleSelectSuggestion = (item: SearchSuggestionItem) => {
    if (item.type === 'apple_device') {
      setModelInput(item.commercialName);
      setCscInput('');
      setIsDropdownOpen(false);
      onSearch(item.commercialName, '', enableLiveVerification);
    } else if (item.type === 'samsung_csc') {
      // User picked a CSC (e.g. XME)
      setCscInput(item.csc || '');
      setModelInput(item.model || 'SM-A556E');
      setIsDropdownOpen(false);
      onSearch(item.model || 'SM-A556E', item.csc || '', enableLiveVerification);
    } else {
      // Samsung device
      setModelInput(item.model);
      const chosenCsc = cscInput || item.csc || '';
      setCscInput(chosenCsc);
      setIsDropdownOpen(false);
      onSearch(item.model, chosenCsc, enableLiveVerification);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!modelInput.trim()) return;
    setIsDropdownOpen(false);
    onSearch(modelInput.trim(), isAppleDetected ? '' : cscInput.trim(), enableLiveVerification);
  };

  const handleClear = () => {
    setModelInput('');
    setCscInput('');
    setIsDropdownOpen(false);
    setActiveIndex(-1);
    inputRef.current?.focus();
  };

  const handleChipClick = (model: string, csc: string) => {
    setModelInput(model);
    setCscInput(csc);
    setIsDropdownOpen(false);
    onSearch(model, csc, enableLiveVerification);
  };

  const handleSelectRecent = (s: { model: string; csc?: string }) => {
    setModelInput(s.model);
    setCscInput(s.csc || '');
    setIsDropdownOpen(false);
    onSearch(s.model, s.csc || '', enableLiveVerification);
  };

  const clearRecents = (e: React.MouseEvent) => {
    e.stopPropagation();
    setRecentSearches([]);
    localStorage.removeItem('sf_recent_searches');
  };

  const exampleChips = [
    { label: 'SM-A556E', csc: 'XME', desc: 'Galaxy A55 (Malaysia)' },
    { label: 'SM-S928B', csc: 'EUX', desc: 'Galaxy S24 Ultra (Europe)' },
    { label: 'iPhone 17 Pro Max', csc: '', desc: 'Apple A3295 Flagship' },
    { label: 'SM-N986B', csc: 'INS', desc: 'Galaxy Note 20 Ultra (India)' },
    { label: 'INS', csc: 'INS', desc: 'Samsung CSC India' },
    { label: 'SM-F956B', csc: 'EUX', desc: 'Galaxy Z Fold 6' },
  ];

  return (
    <div className="relative pt-6 pb-12 sm:pt-10 sm:pb-16 text-center" ref={searchContainerRef}>
      {/* Decorative ambient Mica backdrop glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-72 bg-gradient-to-r from-sky-500/15 via-blue-500/10 to-indigo-500/15 blur-3xl pointer-events-none rounded-full" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
        {/* Main Heading & Subtitle */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white mb-4">
          Discover Your Latest Firmware
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed">
          Universal verification catalog for Samsung Galaxy devices, CSC sales codes, and Apple iPhone releases.
        </p>

        {/* Large Fluent Search Panel */}
        <div className="fluent-acrylic rounded-2xl p-3 sm:p-5 shadow-xl shadow-slate-900/5 dark:shadow-black/40 border border-white/60 dark:border-white/10 text-left relative z-20">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-start">
              {/* Universal Device & Model Input */}
              <div className={isAppleDetected ? 'md:col-span-8 relative' : 'md:col-span-6 relative'}>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Smartphone className="w-3.5 h-3.5 text-sky-500" />
                    <span>Device, Model, CSC, or A-Number</span>
                  </span>
                  <span className="text-[11px] font-normal text-slate-400">
                    Smart autocomplete active
                  </span>
                </label>
                <div className="relative">
                  <input
                    ref={inputRef}
                    type="text"
                    value={modelInput}
                    onChange={(e) => {
                      setModelInput(e.target.value);
                      setIsDropdownOpen(true);
                      setActiveIndex(-1);
                    }}
                    onFocus={() => setIsDropdownOpen(true)}
                    onKeyDown={handleKeyDown}
                    placeholder="e.g. Galaxy A55, SM-S928B, XME, iPhone 17 Pro Max, A3295"
                    className="w-full px-4 py-3 bg-white/80 dark:bg-slate-800/80 rounded-xl border border-slate-300/80 dark:border-slate-700 text-sm font-medium text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                  />
                  {modelInput && (
                    <button
                      type="button"
                      onClick={handleClear}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
                      title="Clear search"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Fluent Autocomplete Suggestions Dropdown */}
                {isDropdownOpen && (
                  <div className="absolute left-0 right-0 top-full mt-2 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl shadow-slate-900/20 dark:shadow-black/70 overflow-hidden z-50 text-left">
                    {/* Category Filter Tabs */}
                    <div className="flex items-center gap-1 p-2 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 text-xs">
                      <button
                        type="button"
                        onClick={() => { setCategoryFilter('all'); setActiveIndex(-1); }}
                        className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                          categoryFilter === 'all'
                            ? 'bg-white dark:bg-slate-700 text-sky-600 dark:text-sky-300 shadow-sm'
                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                        }`}
                      >
                        All Matches
                      </button>
                      <button
                        type="button"
                        onClick={() => { setCategoryFilter('samsung'); setActiveIndex(-1); }}
                        className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                          categoryFilter === 'samsung'
                            ? 'bg-white dark:bg-slate-700 text-sky-600 dark:text-sky-300 shadow-sm'
                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                        }`}
                      >
                        Samsung Devices
                      </button>
                      <button
                        type="button"
                        onClick={() => { setCategoryFilter('csc'); setActiveIndex(-1); }}
                        className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                          categoryFilter === 'csc'
                            ? 'bg-white dark:bg-slate-700 text-sky-600 dark:text-sky-300 shadow-sm'
                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                        }`}
                      >
                        CSC Codes
                      </button>
                      <button
                        type="button"
                        onClick={() => { setCategoryFilter('apple'); setActiveIndex(-1); }}
                        className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                          categoryFilter === 'apple'
                            ? 'bg-white dark:bg-slate-700 text-sky-600 dark:text-sky-300 shadow-sm'
                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                        }`}
                      >
                        Apple iOS
                      </button>
                    </div>

                    <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/60">
                      {/* Empty state: show recent searches and popular suggestions */}
                      {!modelInput.trim() && (
                        <div>
                          {recentSearches.length > 0 && (
                            <div className="p-3 border-b border-slate-100 dark:border-slate-800">
                              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2 font-semibold">
                                <span className="flex items-center gap-1.5">
                                  <History className="w-3.5 h-3.5 text-sky-500" />
                                  <span>Recent Searches</span>
                                </span>
                                <button
                                  type="button"
                                  onClick={clearRecents}
                                  className="text-slate-400 hover:text-rose-500 transition-colors font-normal text-[11px]"
                                >
                                  Clear
                                </button>
                              </div>
                              <div className="flex flex-wrap gap-1.5">
                                {recentSearches.map((item, idx) => (
                                  <button
                                    key={idx}
                                    type="button"
                                    onClick={() => handleSelectRecent(item)}
                                    className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-sky-50 dark:hover:bg-slate-700 text-xs font-mono text-slate-700 dark:text-slate-300 transition-colors"
                                  >
                                    <span>{item.model}</span>
                                    {item.csc && <span className="text-sky-500 ml-1">[{item.csc}]</span>}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}

                          <div className="p-2 text-xs font-semibold text-slate-400 dark:text-slate-500 px-3 pt-2.5">
                            <span className="flex items-center gap-1">
                              <TrendingUp className="w-3.5 h-3.5 text-amber-500" />
                              <span>Popular Verified Devices & Sales Codes</span>
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Suggestion list rendering */}
                      {flatList.length > 0 ? (
                        flatList.map((item, idx) => {
                          const isSelected = activeIndex === idx;
                          return (
                            <div
                              key={item.id}
                              onMouseEnter={() => setActiveIndex(idx)}
                              onClick={() => handleSelectSuggestion(item)}
                              className={`p-3 cursor-pointer transition-colors flex items-center justify-between gap-3 ${
                                isSelected
                                  ? 'bg-sky-50/90 dark:bg-sky-950/40 text-sky-900 dark:text-sky-100'
                                  : 'hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-800 dark:text-slate-200'
                              }`}
                            >
                              <div className="space-y-0.5 min-w-0">
                                <div className="flex items-center gap-2">
                                  {item.type === 'apple_device' ? (
                                    <Apple className="w-3.5 h-3.5 text-slate-700 dark:text-slate-300 shrink-0" />
                                  ) : item.type === 'samsung_csc' ? (
                                    <Globe2 className="w-3.5 h-3.5 text-sky-500 shrink-0" />
                                  ) : (
                                    <Smartphone className="w-3.5 h-3.5 text-sky-500 shrink-0" />
                                  )}
                                  <span className="text-xs font-bold truncate">
                                    {item.title}
                                  </span>
                                  <span className="text-[11px] text-slate-400 dark:text-slate-500">
                                    {item.badge}
                                  </span>
                                </div>
                                <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate pl-5">
                                  {item.subtitle}
                                </div>
                              </div>

                              <ArrowRight className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-sky-500' : 'text-slate-300 dark:text-slate-600'}`} />
                            </div>
                          );
                        })
                      ) : (
                        <div className="p-4 text-center text-xs text-slate-500 dark:text-slate-400">
                          No matching devices or CSC codes in verified catalogue. Press Enter to perform direct live lookup.
                        </div>
                      )}
                    </div>

                    {/* Bottom hint banner */}
                    <div className="p-2 border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/70 dark:bg-slate-850 text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between px-3">
                      <span>Use <kbd className="px-1 py-0.5 bg-slate-200 dark:bg-slate-700 rounded text-[10px] font-mono">↑</kbd> <kbd className="px-1 py-0.5 bg-slate-200 dark:bg-slate-700 rounded text-[10px] font-mono">↓</kbd> to navigate, <kbd className="px-1 py-0.5 bg-slate-200 dark:bg-slate-700 rounded text-[10px] font-mono">Enter</kbd> to select</span>
                      {onOpenCscDirectory && (
                        <button
                          type="button"
                          onClick={() => { setIsDropdownOpen(false); onOpenCscDirectory(); }}
                          className="text-sky-600 dark:text-sky-400 hover:underline"
                        >
                          Browse CSCs
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* CSC Input (Samsung only — auto-disabled/hidden for Apple) */}
              {!isAppleDetected ? (
                <div className="md:col-span-3">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Globe2 className="w-3.5 h-3.5 text-sky-500" />
                      <span>CSC / Sales Code</span>
                    </span>
                    {onOpenCscDirectory && (
                      <button
                        type="button"
                        onClick={onOpenCscDirectory}
                        className="text-[11px] font-normal text-sky-600 dark:text-sky-400 hover:underline"
                      >
                        Browse all
                      </button>
                    )}
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={cscInput}
                      onChange={(e) => setCscInput(e.target.value.toUpperCase())}
                      maxLength={4}
                      placeholder="e.g. XME, INS, EUX"
                      className="w-full px-4 py-3 bg-white/80 dark:bg-slate-800/80 rounded-xl border border-slate-300/80 dark:border-slate-700 text-sm font-semibold tracking-wider text-slate-900 dark:text-white placeholder-slate-400 uppercase focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all tabular-nums"
                    />
                    {cscInput && (
                      <button
                        type="button"
                        onClick={() => setCscInput('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
                        title="Clear CSC"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="md:col-span-1 hidden md:block" />
              )}

              {/* Action Buttons */}
              <div className={`${isAppleDetected ? 'md:col-span-4' : 'md:col-span-3'} flex items-end gap-2 pt-1 md:pt-0`}>
                <button
                  type="submit"
                  disabled={isLoading || !modelInput.trim()}
                  className="flex-1 flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-sky-600 hover:bg-sky-500 active:bg-sky-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl shadow-md shadow-sky-600/20 transition-all focus:outline-none focus:ring-2 focus:ring-sky-500/50"
                >
                  <Search className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                  <span>{isLoading ? 'Searching...' : 'Search Updates'}</span>
                </button>

                {(modelInput || cscInput) && (
                  <button
                    type="button"
                    onClick={handleClear}
                    title="Clear inputs"
                    className="p-3 text-slate-600 dark:text-slate-300 hover:bg-slate-200/50 dark:hover:bg-white/10 rounded-xl transition-colors border border-slate-200 dark:border-slate-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Apple notice when Apple device is active */}
            {isAppleDetected && (
              <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 pt-1">
                <Apple className="w-3.5 h-3.5 text-slate-700 dark:text-slate-300" />
                <span>Apple iOS search detected · Regional CSC filters disabled · Matching hardware profile & signed IPSW feed.</span>
              </div>
            )}

            {/* Bottom Bar: Quick Example Queries & Live Search Grounding */}
            <div className="pt-2 border-t border-slate-200/40 dark:border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-slate-500 dark:text-slate-400 font-medium mr-1">Examples:</span>
                {exampleChips.map((chip) => (
                  <button
                    key={`${chip.label}-${chip.csc}`}
                    type="button"
                    onClick={() => handleChipClick(chip.label, chip.csc)}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-sky-100 dark:bg-slate-800/90 dark:hover:bg-sky-950/60 text-slate-700 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-300 border border-slate-200/60 dark:border-slate-700/60 transition-colors tabular-nums text-xs"
                  >
                    <span className="font-semibold">{chip.label}</span>
                    {chip.csc && chip.csc !== chip.label && <span className="text-slate-400 ml-1">({chip.csc})</span>}
                  </button>
                ))}
              </div>

              {/* Live Search Grounding Checkbox */}
              <label className="inline-flex items-center gap-2 cursor-pointer select-none text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200">
                <input
                  type="checkbox"
                  checked={enableLiveVerification}
                  onChange={(e) => setEnableLiveVerification(e.target.checked)}
                  className="rounded border-slate-400 text-sky-600 focus:ring-sky-500"
                />
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span className="text-xs">Live Search Grounding</span>
              </label>
            </div>
          </form>
        </div>

        {/* Small trust banner */}
        <div className="mt-4 flex items-center justify-center gap-4 text-xs text-slate-500 dark:text-slate-400">
          <span className="inline-flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            <span>Samsung Galaxy Families (S, Z, A, M, F, XCover, Note, Tab)</span>
          </span>
          <span aria-hidden="true">·</span>
          <span className="inline-flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            <span>40+ Worldwide CSC Sales Codes</span>
          </span>
          <span aria-hidden="true">·</span>
          <span className="inline-flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            <span>Apple iPhone 1st to 17th Gen (A-Numbers &amp; Hardware IDs)</span>
          </span>
        </div>
      </div>
    </div>
  );
};

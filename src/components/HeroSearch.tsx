import React, { useState } from 'react';
import { Search, X, Sparkles, Smartphone, CheckCircle2, Globe2 } from 'lucide-react';

interface HeroSearchProps {
  onSearch: (model: string, csc: string, liveVerify?: boolean) => void;
  isLoading: boolean;
  initialModel?: string;
  initialCsc?: string;
}

export const HeroSearch: React.FC<HeroSearchProps> = ({
  onSearch,
  isLoading,
  initialModel = '',
  initialCsc = '',
}) => {
  const [modelInput, setModelInput] = useState(initialModel);
  const [cscInput, setCscInput] = useState(initialCsc);
  const [enableLiveVerification, setEnableLiveVerification] = useState(false);

  const isAppleDetected =
    modelInput.toLowerCase().includes('iphone') ||
    modelInput.toLowerCase().startsWith('a3') ||
    modelInput.toLowerCase().startsWith('a2');

  const exampleChips = [
    { label: 'SM-A556E', csc: 'XME', desc: 'Galaxy A55 5G (Malaysia)' },
    { label: 'SM-S928B', csc: 'EUX', desc: 'Galaxy S24 Ultra (Europe)' },
    { label: 'SM-A556E', csc: 'BKD', desc: 'Galaxy A55 5G (Bangladesh)' },
    { label: 'iPhone 17 Pro Max', csc: '', desc: 'Apple A3295 Flagship' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!modelInput.trim()) return;
    onSearch(modelInput.trim(), isAppleDetected ? '' : cscInput.trim(), enableLiveVerification);
  };

  const handleClear = () => {
    setModelInput('');
    setCscInput('');
  };

  const handleChipClick = (model: string, csc: string) => {
    setModelInput(model);
    setCscInput(csc);
    onSearch(model, csc, enableLiveVerification);
  };

  return (
    <div className="relative pt-6 pb-12 sm:pt-10 sm:pb-16 text-center">
      {/* Decorative ambient Mica backdrop glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-72 bg-gradient-to-r from-sky-500/15 via-blue-500/10 to-indigo-500/15 blur-3xl pointer-events-none rounded-full" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
        {/* Main Heading & Subtitle */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white mb-4">
          Discover Your Latest Firmware
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed">
          Find the latest software updates for your Samsung Galaxy or Apple iPhone.
        </p>

        {/* Large Fluent Search Panel */}
        <div className="fluent-acrylic rounded-2xl p-3 sm:p-5 shadow-xl shadow-slate-900/5 dark:shadow-black/40 border border-white/60 dark:border-white/10 text-left">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
              {/* Mobile Model Input */}
              <div className={isAppleDetected ? 'md:col-span-8' : 'md:col-span-6'}>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <Smartphone className="w-3.5 h-3.5 text-sky-500" />
                  <span>Device Model or Name</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={modelInput}
                    onChange={(e) => setModelInput(e.target.value)}
                    placeholder="e.g. SM-A556E, SM-S928B, iPhone 17 Pro Max"
                    className="w-full px-4 py-3 bg-white/80 dark:bg-slate-800/80 rounded-xl border border-slate-300/80 dark:border-slate-700 text-sm font-medium text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                  />
                  {modelInput && (
                    <button
                      type="button"
                      onClick={() => setModelInput('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* CSC Input (Samsung only - disabled/hidden for iPhone) */}
              {!isAppleDetected ? (
                <div className="md:col-span-3">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <Globe2 className="w-3.5 h-3.5 text-sky-500" />
                    <span>CSC / Sales Code</span>
                    <span className="text-[11px] font-normal text-slate-400">(Optional)</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={cscInput}
                      onChange={(e) => setCscInput(e.target.value.toUpperCase())}
                      maxLength={4}
                      placeholder="e.g. XME, INS, BKD"
                      className="w-full px-4 py-3 bg-white/80 dark:bg-slate-800/80 rounded-xl border border-slate-300/80 dark:border-slate-700 text-sm font-semibold tracking-wider text-slate-900 dark:text-white placeholder-slate-400 uppercase focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all tabular-nums"
                    />
                    {cscInput && (
                      <button
                        type="button"
                        onClick={() => setCscInput('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="md:col-span-1" />
              )}

              {/* Action Buttons */}
              <div className={`${isAppleDetected ? 'md:col-span-4' : 'md:col-span-3'} flex items-end gap-2 pt-1 md:pt-0`}>
                <button
                  type="submit"
                  disabled={isLoading || !modelInput.trim()}
                  className="flex-1 flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-sky-600 hover:bg-sky-500 active:bg-sky-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl shadow-md shadow-sky-600/20 transition-all focus:outline-none focus:ring-2 focus:ring-sky-500/50"
                >
                  <Search className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                  <span>{isLoading ? 'Checking...' : 'Search Updates'}</span>
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

            {/* Bottom Bar: Example Chips & Live Verification Option */}
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
                    {chip.csc && <span className="text-slate-400 ml-1">({chip.csc})</span>}
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
            <span>Multi-CSC OXM Engine</span>
          </span>
          <span aria-hidden="true">·</span>
          <span className="inline-flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            <span>Apple Public & Beta Tracking</span>
          </span>
          <span aria-hidden="true">·</span>
          <span className="inline-flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            <span>Bootloader Revision Checks</span>
          </span>
        </div>
      </div>
    </div>
  );
};

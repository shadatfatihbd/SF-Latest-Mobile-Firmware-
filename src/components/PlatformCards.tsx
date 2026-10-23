import React from 'react';
import { Smartphone, ArrowRight, ShieldCheck, Cpu, Radio, Sparkles } from 'lucide-react';

interface PlatformCardsProps {
  onSelectSamsung: () => void;
  onSelectApple: () => void;
}

export const PlatformCards: React.FC<PlatformCardsProps> = ({
  onSelectSamsung,
  onSelectApple,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10 max-w-5xl mx-auto px-4 sm:px-6">
      {/* 1. Samsung Galaxy Firmware Card */}
      <div
        onClick={onSelectSamsung}
        className="fluent-acrylic fluent-card group relative overflow-hidden rounded-2xl p-6 sm:p-8 cursor-pointer border border-sky-500/20 hover:border-sky-500/40 shadow-lg shadow-sky-950/5 transition-all text-left"
      >
        {/* Subtle accent corner gradient */}
        <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-sky-500/15 via-blue-500/5 to-transparent rounded-bl-full pointer-events-none transition-transform group-hover:scale-110" />

        <div className="relative space-y-4">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-sky-600 to-blue-500 flex items-center justify-center text-white shadow-md shadow-sky-600/30">
              <Cpu className="w-6 h-6" />
            </div>
            <span className="text-xs font-semibold text-sky-600 dark:text-sky-400 group-hover:translate-x-1 transition-transform flex items-center gap-1">
              <span>Explore Samsung</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>

          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-2">
              Samsung Galaxy Firmware
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Track One UI releases, Android security patch levels, binary bootloader locks, and multi-CSC OXM packages for Galaxy S, Z Fold, and A-series devices.
            </p>
          </div>

          {/* Feature Highlights */}
          <div className="pt-3 border-t border-slate-200/50 dark:border-white/10 grid grid-cols-2 gap-3 text-xs text-slate-600 dark:text-slate-300">
            <div className="flex items-center gap-2">
              <Radio className="w-3.5 h-3.5 text-sky-500 shrink-0" />
              <span>CSC Region Matching</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-sky-500 shrink-0" />
              <span>Bootloader Binary Rev</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Apple iPhone Software Updates Card */}
      <div
        onClick={onSelectApple}
        className="fluent-acrylic fluent-card group relative overflow-hidden rounded-2xl p-6 sm:p-8 cursor-pointer border border-indigo-500/20 hover:border-indigo-500/40 shadow-lg shadow-indigo-950/5 transition-all text-left"
      >
        {/* Subtle accent corner gradient */}
        <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-indigo-500/15 via-purple-500/5 to-transparent rounded-bl-full pointer-events-none transition-transform group-hover:scale-110" />

        <div className="relative space-y-4">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-500 flex items-center justify-center text-white shadow-md shadow-indigo-600/30">
              <Smartphone className="w-6 h-6" />
            </div>
            <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 group-hover:translate-x-1 transition-transform flex items-center gap-1">
              <span>Explore Apple</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>

          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-2">
              Apple iPhone Software Updates
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Track public iOS stable builds, developer & public betas, Rapid Security Responses (RSR), CVE patches, and official Apple release notes across all iPhone families.
            </p>
          </div>

          {/* Feature Highlights */}
          <div className="pt-3 border-t border-slate-200/50 dark:border-white/10 grid grid-cols-2 gap-3 text-xs text-slate-600 dark:text-slate-300">
            <div className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
              <span>Apple Intelligence Builds</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
              <span>Official CVE Bulletins</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

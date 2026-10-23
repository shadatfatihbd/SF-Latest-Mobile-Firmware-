import React from 'react';
import { X, GitCompare, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface UpdateComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  build1: string;
  build2: string;
}

export const UpdateComparisonModal: React.FC<UpdateComparisonModalProps> = ({
  isOpen,
  onClose,
  build1,
  build2,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="fluent-acrylic rounded-2xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-white/60 dark:border-white/10 relative text-left max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center">
            <GitCompare className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Firmware Build Comparison
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Side-by-side technical evaluation of revisions, security patches, and binary lock levels
            </p>
          </div>
        </div>

        {/* Comparison Header */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-4 rounded-xl bg-sky-500/10 border border-sky-500/20 text-center">
            <span className="text-[11px] font-bold text-sky-600 uppercase tracking-wider block">
              Current / Target Build
            </span>
            <span className="text-base font-bold font-mono text-slate-900 dark:text-white block mt-1">
              {build1}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200/50 dark:border-white/5 text-center">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              Previous Build
            </span>
            <span className="text-base font-bold font-mono text-slate-900 dark:text-white block mt-1">
              {build2}
            </span>
          </div>
        </div>

        {/* Comparison Rows */}
        <div className="space-y-3 text-xs">
          <div className="p-3 rounded-xl bg-white/60 dark:bg-slate-800/40 border border-slate-200/40 dark:border-white/5 flex items-center justify-between">
            <span className="font-semibold text-slate-700 dark:text-slate-300">Security Patch Delta:</span>
            <div className="flex items-center gap-2">
              <span className="font-mono text-slate-500">Aug 2026</span>
              <ArrowRight className="w-3.5 h-3.5 text-sky-500" />
              <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">Oct 2026 (Latest)</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-white/60 dark:bg-slate-800/40 border border-slate-200/40 dark:border-white/5 flex items-center justify-between">
            <span className="font-semibold text-slate-700 dark:text-slate-300">Bootloader / Binary Lock:</span>
            <div className="flex items-center gap-2">
              <span className="font-mono text-slate-500">Binary 3</span>
              <ArrowRight className="w-3.5 h-3.5 text-amber-500" />
              <span className="font-mono font-bold text-amber-600 dark:text-amber-400">Binary 4 (Permanent Lock)</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-white/60 dark:bg-slate-800/40 border border-slate-200/40 dark:border-white/5 flex items-center justify-between">
            <span className="font-semibold text-slate-700 dark:text-slate-300">Baseband / Modem Firmware:</span>
            <div className="flex items-center gap-2">
              <span className="text-slate-500">Exynos/Snapdragon Driver v1</span>
              <ArrowRight className="w-3.5 h-3.5 text-sky-500" />
              <span className="font-semibold text-slate-900 dark:text-white">v2 (5G Standby Fix)</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-white/60 dark:bg-slate-800/40 border border-slate-200/40 dark:border-white/5 flex items-center justify-between">
            <span className="font-semibold text-slate-700 dark:text-slate-300">Rollback Safety Verdict:</span>
            <span className="font-semibold text-rose-600 dark:text-rose-400">
              Rollback Blocked (Hardware eFuse fuse blow)
            </span>
          </div>
        </div>

        {/* Security Summary */}
        <div className="mt-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-800 dark:text-emerald-300 space-y-2">
          <div className="font-bold flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>CVE & SVE Vulnerability Resolutions:</span>
          </div>
          <p className="leading-relaxed">
            The target build ({build1}) resolves 30 high-severity security vulnerabilities present in previous builds. Updating is strongly recommended for security posture and network stability.
          </p>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-500 rounded-xl transition-colors"
          >
            Close Comparison
          </button>
        </div>
      </div>
    </div>
  );
};

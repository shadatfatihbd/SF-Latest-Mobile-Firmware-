import React from 'react';
import { FirmwareRecord, SamsungFirmwareRecord, AppleFirmwareRecord } from '../types/firmware';
import { ShieldCheck, Cpu, Smartphone, Calendar, ArrowRight } from 'lucide-react';

interface LatestUpdatesSectionProps {
  updates: FirmwareRecord[];
  onSelectRecord: (record: FirmwareRecord) => void;
}

export const LatestUpdatesSection: React.FC<LatestUpdatesSectionProps> = ({
  updates,
  onSelectRecord,
}) => {
  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 my-12 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>Recently Verified Updates</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500" title="Actively Verified" />
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Real manufacturer software and firmware rollouts verified against official newsrooms and support portals.
          </p>
        </div>
        <span className="text-xs font-mono text-slate-400">
          Refreshed hourly
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {updates.slice(0, 6).map((rec) => {
          const isSamsung = rec.brand === 'samsung';
          const sam = isSamsung ? (rec as SamsungFirmwareRecord) : null;
          const app = !isSamsung ? (rec as AppleFirmwareRecord) : null;

          return (
            <div
              key={rec.id}
              onClick={() => onSelectRecord(rec)}
              className="fluent-acrylic fluent-card rounded-2xl p-4 sm:p-5 border border-white/50 dark:border-white/10 hover:border-sky-500/40 cursor-pointer shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 to-blue-500 text-white flex items-center justify-center shrink-0 shadow-sm">
                    {isSamsung ? <Cpu className="w-5 h-5" /> : <Smartphone className="w-5 h-5" />}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
                      {isSamsung ? sam?.commercialName : app?.model}
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                      <span>{isSamsung ? sam?.model : app?.modelIdentifier}</span>
                      {isSamsung && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="text-sky-600 dark:text-sky-400 font-semibold">{sam?.csc} ({sam?.cscRegion})</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md flex items-center gap-1 shrink-0">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Verified</span>
                </span>
              </div>

              {/* Version & Build Strip */}
              <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                <div className="p-2 rounded-lg bg-slate-100/60 dark:bg-slate-800/40 border border-slate-200/40 dark:border-white/5">
                  <span className="text-[10px] text-slate-400 block">Version</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {isSamsung ? `One UI ${sam?.oneUiVersion}` : `iOS ${app?.latestOsVersion}`}
                  </span>
                </div>

                <div className="p-2 rounded-lg bg-slate-100/60 dark:bg-slate-800/40 border border-slate-200/40 dark:border-white/5">
                  <span className="text-[10px] text-slate-400 block">Build / PDA</span>
                  <span className="font-mono text-slate-800 dark:text-slate-200 truncate block">
                    {isSamsung ? sam?.latestPda : app?.buildNumber}
                  </span>
                </div>
              </div>

              {/* Release date & action */}
              <div className="pt-2 border-t border-slate-200/40 dark:border-white/10 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-1.5 tabular-nums">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>Released {rec.releaseDate}</span>
                </div>

                <span className="text-sky-600 dark:text-sky-400 font-semibold flex items-center gap-1 hover:translate-x-0.5 transition-transform">
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

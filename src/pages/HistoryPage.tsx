import React, { useState } from 'react';
import { ALL_VERIFIED_FIRMWARE } from '../data/authoritativeDatabase';
import { FirmwareRecord, SamsungFirmwareRecord, AppleFirmwareRecord } from '../types/firmware';
import { GitCompare, Calendar, ArrowRight, ShieldCheck, Cpu, Smartphone } from 'lucide-react';

interface HistoryPageProps {
  onOpenCompare: (build1: string, build2: string) => void;
  onSelectRecord: (record: FirmwareRecord) => void;
}

export const HistoryPage: React.FC<HistoryPageProps> = ({
  onOpenCompare,
  onSelectRecord,
}) => {
  const [selectedBuildA, setSelectedBuildA] = useState('A556EXXS4AXK2');
  const [selectedBuildB, setSelectedBuildB] = useState('A556EXXU3AXH1');

  const comparisonPresets = [
    { name: 'Galaxy A55 (SM-A556E) Binary 4 vs Binary 3', b1: 'A556EXXS4AXK2', b2: 'A556EXXU3AXH1' },
    { name: 'Galaxy S24 Ultra One UI 6.1.1 vs 6.1', b1: 'S928BXXU3AXK4', b2: 'S928BXXU2AXH7' },
    { name: 'iPhone 17 Pro Max iOS 18.2 vs iOS 18.1.1', b1: '22C152', b2: '22B91' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8 text-left">
      {/* Title */}
      <div className="fluent-acrylic rounded-2xl p-6 sm:p-8 border border-white/60 dark:border-white/10 space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 to-indigo-600 text-white flex items-center justify-center">
            <GitCompare className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              Update History & Build Comparison
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Track chronological rollout timelines and evaluate version deltas across Samsung One UI and Apple iOS.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Version Comparison Card */}
      <div className="fluent-acrylic rounded-2xl p-6 sm:p-8 border border-sky-500/30 shadow-lg shadow-sky-950/5 space-y-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <GitCompare className="w-5 h-5 text-sky-500" />
            <span>Interactive Build Comparison Tool</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Compare two firmware builds to check bootloader fuse status, security patch delta, and rollback protection.
          </p>
        </div>

        {/* Preset chips */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-slate-400 font-medium">Quick Presets:</span>
          {comparisonPresets.map((preset) => (
            <button
              key={preset.name}
              onClick={() => {
                setSelectedBuildA(preset.b1);
                setSelectedBuildB(preset.b2);
                onOpenCompare(preset.b1, preset.b2);
              }}
              className="px-3 py-1.5 rounded-lg bg-sky-50 dark:bg-sky-950/60 hover:bg-sky-100 dark:hover:bg-sky-900/60 text-sky-600 dark:text-sky-300 text-xs font-semibold border border-sky-500/20 transition-colors"
            >
              {preset.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Target / Newer Build
            </label>
            <input
              type="text"
              value={selectedBuildA}
              onChange={(e) => setSelectedBuildA(e.target.value)}
              className="w-full px-3 py-2 bg-white/80 dark:bg-slate-800/80 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-mono font-bold text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Base / Previous Build
            </label>
            <input
              type="text"
              value={selectedBuildB}
              onChange={(e) => setSelectedBuildB(e.target.value)}
              className="w-full px-3 py-2 bg-white/80 dark:bg-slate-800/80 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-mono font-bold text-slate-900 dark:text-white"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={() => onOpenCompare(selectedBuildA, selectedBuildB)}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-500 rounded-xl shadow-md shadow-sky-600/20 transition-all"
          >
            <span>Compare Builds Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Complete Chronological Timeline */}
      <div className="fluent-acrylic rounded-2xl p-6 sm:p-8 border border-white/60 dark:border-white/10 space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Calendar className="w-4 h-4 text-sky-500" />
          <span>Chronological Firmware Releases</span>
        </h3>

        <div className="divide-y divide-slate-200/50 dark:divide-white/10 text-xs">
          {ALL_VERIFIED_FIRMWARE.map((rec) => {
            const isSamsung = rec.brand === 'samsung';
            const sam = isSamsung ? (rec as SamsungFirmwareRecord) : null;
            const app = !isSamsung ? (rec as AppleFirmwareRecord) : null;

            return (
              <div
                key={rec.id}
                onClick={() => onSelectRecord(rec)}
                className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-white/40 dark:hover:bg-slate-800/40 px-2 rounded-xl cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-sky-600 to-blue-500 text-white flex items-center justify-center shrink-0">
                    {isSamsung ? <Cpu className="w-4 h-4" /> : <Smartphone className="w-4 h-4" />}
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white">
                      {isSamsung ? sam?.commercialName : app?.model}
                    </div>
                    <div className="font-mono text-slate-500 text-[11px]">
                      {isSamsung ? `${sam?.model} · ${sam?.latestPda} (${sam?.csc})` : `${app?.modelIdentifier} · Build ${app?.buildNumber}`}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4">
                  <span className="font-semibold text-sky-600 dark:text-sky-400">
                    {isSamsung ? `One UI ${sam?.oneUiVersion}` : `iOS ${app?.latestOsVersion}`}
                  </span>
                  <span className="text-slate-400 tabular-nums">
                    {rec.releaseDate}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

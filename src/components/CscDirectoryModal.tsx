import React, { useState } from 'react';
import { X, Search, Globe2, Check, Copy } from 'lucide-react';
import { EXTENDED_CSC_CATALOGUE } from '../data/deviceCatalogue';

interface CscDirectoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCsc?: (csc: string) => void;
}

export const CscDirectoryModal: React.FC<CscDirectoryModalProps> = ({
  isOpen,
  onClose,
  onSelectCsc,
}) => {
  const [filterText, setFilterText] = useState('');
  const [copiedCsc, setCopiedCsc] = useState<string | null>(null);

  if (!isOpen) return null;

  const filtered = EXTENDED_CSC_CATALOGUE.filter((entry) => {
    const q = filterText.toLowerCase();
    return (
      entry.csc.toLowerCase().includes(q) ||
      entry.country.toLowerCase().includes(q) ||
      entry.carrier.toLowerCase().includes(q) ||
      entry.region.toLowerCase().includes(q) ||
      entry.multiCscGroup.toLowerCase().includes(q)
    );
  });

  const handleCopy = (csc: string) => {
    navigator.clipboard.writeText(csc);
    setCopiedCsc(csc);
    setTimeout(() => setCopiedCsc(null), 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="fluent-acrylic rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-white/60 dark:border-white/10 relative text-left max-h-[85vh] flex flex-col">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center">
            <Globe2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Samsung CSC Code Directory
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Country/Carrier Specific Codes & Multi-CSC bundles (OXM, ODM, OWO, OYN)
            </p>
          </div>
        </div>

        {/* Filter input */}
        <div className="relative mb-3">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            placeholder="Search by CSC (e.g. XME, INS, BKD), country, or multi-CSC group..."
            className="w-full pl-9 pr-3 py-2 bg-white/80 dark:bg-slate-800/80 rounded-xl border border-slate-300/80 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        {/* List Table */}
        <div className="overflow-y-auto flex-1 pr-1 space-y-1.5 text-xs">
          {filtered.map((entry) => (
            <div
              key={entry.csc}
              className="p-3 rounded-xl bg-white/60 dark:bg-slate-800/50 border border-slate-200/50 dark:border-white/5 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors"
            >
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-sky-600 dark:text-sky-400 text-sm">
                    {entry.csc}
                  </span>
                  <span className="text-slate-900 dark:text-white font-semibold">
                    {entry.country}
                  </span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                    Group: {entry.multiCscGroup}
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">
                  {entry.carrier} · {entry.region}
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleCopy(entry.csc)}
                  title="Copy CSC code"
                  className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-700"
                >
                  {copiedCsc === entry.csc ? (
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
                {onSelectCsc && (
                  <button
                    onClick={() => {
                      onSelectCsc(entry.csc);
                      onClose();
                    }}
                    className="px-2.5 py-1 text-[11px] font-semibold text-white bg-sky-600 hover:bg-sky-500 rounded-lg transition-colors"
                  >
                    Select
                  </button>
                )}
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="text-center py-8 text-slate-400">
              No CSC matching "{filterText}"
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { Layers, ShieldCheck, ExternalLink, Database } from 'lucide-react';

interface FooterProps {
  onNavigate: (path: string) => void;
  onOpenCscModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenCscModal }) => {
  return (
    <footer className="mt-20 border-t border-slate-200/50 dark:border-white/10 fluent-acrylic bg-slate-50/70 dark:bg-slate-950/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-sky-600 to-blue-500 p-0.5 shadow-sm flex items-center justify-center text-white">
                <Layers className="w-4 h-4" />
              </div>
              <span className="text-base font-bold text-slate-900 dark:text-white">
                SF Latest Firmware
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 max-w-md leading-relaxed">
              Independent firmware and software update information for Samsung Galaxy and Apple iPhone devices.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-sky-500" />
              <span>Grounded in official manufacturer bulletins and changelogs</span>
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-semibold text-slate-900 dark:text-white tracking-wider uppercase">
              Navigation
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <button
                  onClick={() => onNavigate('/')}
                  className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                >
                  Firmware Search
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/samsung')}
                  className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                >
                  Samsung Galaxy Hub
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/apple')}
                  className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                >
                  Apple iPhone iOS Hub
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/history')}
                  className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                >
                  Update Timeline & Diff
                </button>
              </li>
              {onOpenCscModal && (
                <li>
                  <button
                    onClick={onOpenCscModal}
                    className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors inline-flex items-center gap-1"
                  >
                    <Database className="w-3 h-3 text-sky-500" />
                    <span>CSC Code Directory</span>
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Legal and official links */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-semibold text-slate-900 dark:text-white tracking-wider uppercase">
              Official Sources & Legal
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <a
                  href="https://doc.samsungmobile.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors inline-flex items-center gap-1"
                >
                  <span>Samsung Mobile Releases</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://support.apple.com/en-us/HT201222"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors inline-flex items-center gap-1"
                >
                  <span>Apple Security Publications</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/about')}
                  className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                >
                  About & Data Sources
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/privacy')}
                  className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer as required by specification */}
        <div className="pt-6 border-t border-slate-200/50 dark:border-white/10 text-center md:text-left space-y-2">
          <p className="text-xs text-slate-500 dark:text-slate-500 leading-relaxed">
            SF Latest Firmware is an independent information platform and is not affiliated with Samsung Electronics or Apple Inc. Device names, logos, and trademarks belong to their respective owners.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 dark:text-slate-600 gap-2">
            <span>© 2026 SF Latest Firmware. All rights reserved.</span>
            <span>Version verification data refreshed daily</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

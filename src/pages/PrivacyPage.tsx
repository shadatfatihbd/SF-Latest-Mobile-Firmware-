import React from 'react';
import { ShieldCheck, Lock, EyeOff, Server } from 'lucide-react';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8 text-left">
      <div className="fluent-acrylic rounded-2xl p-6 sm:p-8 border border-white/60 dark:border-white/10 space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              Privacy Policy
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Our privacy commitment to users of SF Latest Firmware.
            </p>
          </div>
        </div>
      </div>

      <div className="fluent-acrylic rounded-2xl p-6 sm:p-8 border border-white/50 dark:border-white/10 space-y-6 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <EyeOff className="w-4 h-4 text-sky-500" />
            <span>1. Zero Invasive Tracking</span>
          </h2>
          <p>
            SF Latest Firmware does not use third-party advertising cookies, fingerprinting scripts, or commercial telemetry networks. Device model searches, CSC lookups, and user preferences (such as light/dark mode) are processed ephemerally and cached locally in your browser storage.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Server className="w-4 h-4 text-sky-500" />
            <span>2. Search Query Processing</span>
          </h2>
          <p>
            When you enter a device model or CSC code, our server-side API queries authorized manufacturer endpoints or authoritative reference caches to return current build numbers. We do not link search queries to your identity or IP address.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-sky-500" />
            <span>3. Firmware Alert Subscriptions</span>
          </h2>
          <p>
            If you explicitly opt-in to receive firmware rollout notifications by submitting your email address, your email is stored securely exclusively for dispatching verified firmware notices for your specified device model. We never sell or share email lists.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white">
            4. External Links & Official Manufacturer Sites
          </h2>
          <p>
            Our service links directly to official manufacturer documentation (e.g., Samsung Electronics doc.samsungmobile.com and Apple Inc. support.apple.com). These external sites operate under their respective privacy policies.
          </p>
        </section>
      </div>
    </div>
  );
};

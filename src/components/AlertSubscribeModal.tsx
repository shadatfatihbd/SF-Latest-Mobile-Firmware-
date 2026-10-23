import React, { useState } from 'react';
import { X, Bell, CheckCircle2, ShieldCheck, Mail, Smartphone } from 'lucide-react';

interface AlertSubscribeModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultModel?: string;
  defaultCsc?: string;
}

export const AlertSubscribeModal: React.FC<AlertSubscribeModalProps> = ({
  isOpen,
  onClose,
  defaultModel = '',
  defaultCsc = '',
}) => {
  const [email, setEmail] = useState('');
  const [model, setModel] = useState(defaultModel);
  const [csc, setCsc] = useState(defaultCsc);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (!model) {
      setErrorMessage('Please specify your device model number.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/alerts/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, model, csc }),
      });
      const data = await res.json();

      if (data.success) {
        setSuccessMessage(data.message || 'Notification subscription active!');
        // Save subscription locally
        const existing = JSON.parse(localStorage.getItem('sf_subscribed_models') || '[]');
        existing.push({ email, model, csc, date: new Date().toISOString() });
        localStorage.setItem('sf_subscribed_models', JSON.stringify(existing));
      } else {
        setErrorMessage(data.error || 'Failed to register subscription.');
      }
    } catch (err: any) {
      setErrorMessage('Network error registering notification. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="fluent-acrylic rounded-2xl max-w-md w-full p-6 shadow-2xl border border-white/60 dark:border-white/10 relative text-left">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center">
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Firmware Release Alerts
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Get notified immediately when a new update drops for your device.
            </p>
          </div>
        </div>

        {successMessage ? (
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-3">
            <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
            <p className="text-xs text-emerald-800 dark:text-emerald-300 font-medium">
              {successMessage}
            </p>
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 rounded-xl hover:bg-emerald-500 transition-colors"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3 text-xs">
            {errorMessage && (
              <div className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-300 text-xs">
                {errorMessage}
              </div>
            )}

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-sky-500" />
                <span>Your Email Address</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full px-3 py-2.5 bg-white/80 dark:bg-slate-800/80 rounded-xl border border-slate-300/80 dark:border-slate-700 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-2">
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1.5">
                  <Smartphone className="w-3.5 h-3.5 text-sky-500" />
                  <span>Device Model</span>
                </label>
                <input
                  type="text"
                  required
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  placeholder="SM-A556E / iPhone 17"
                  className="w-full px-3 py-2.5 bg-white/80 dark:bg-slate-800/80 rounded-xl border border-slate-300/80 dark:border-slate-700 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  <span>CSC (Opt)</span>
                </label>
                <input
                  type="text"
                  value={csc}
                  onChange={(e) => setCsc(e.target.value.toUpperCase())}
                  maxLength={4}
                  placeholder="XME"
                  className="w-full px-3 py-2.5 bg-white/80 dark:bg-slate-800/80 rounded-xl border border-slate-300/80 dark:border-slate-700 text-slate-900 dark:text-white text-xs uppercase focus:ring-2 focus:ring-sky-500 focus:outline-none font-mono"
                />
              </div>
            </div>

            <div className="pt-2 flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>No spam. Only verified firmware updates for your device.</span>
            </div>

            <div className="pt-3 flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 bg-sky-600 hover:bg-sky-500 active:bg-sky-700 text-white font-semibold rounded-xl transition-colors disabled:opacity-50"
              >
                {isSubmitting ? 'Subscribing...' : 'Subscribe to Alerts'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

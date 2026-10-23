import React, { useState } from 'react';
import { Moon, Sun, Bell, Menu, X, Layers } from 'lucide-react';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenSubscribe: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPath,
  onNavigate,
  isDark,
  onToggleTheme,
  onOpenSubscribe,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Samsung Firmware', path: '/samsung' },
    { label: 'Apple Updates', path: '/apple' },
    { label: 'Update History', path: '/history' },
    { label: 'About', path: '/about' },
  ];

  const handleNavClick = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 fluent-acrylic border-b border-slate-200/50 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <button
          onClick={() => handleNavClick('/')}
          className="flex items-center gap-3 text-left group whitespace-nowrap shrink-0 focus:outline-none"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-600 to-blue-500 p-0.5 shadow-md shadow-sky-500/20 flex items-center justify-center text-white">
            <Layers className="w-5 h-5 transition-transform group-hover:scale-105" />
          </div>
          <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
            SF Latest Firmware
          </span>
        </button>

        {/* Zone 2: Navigation Links (Clean single-line links with hover line) */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
          {navLinks.map((link) => {
            const isActive = currentPath === link.path;
            return (
              <button
                key={link.path}
                onClick={() => handleNavClick(link.path)}
                className={`transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                  isActive
                    ? 'text-sky-600 dark:text-sky-400 border-sky-600 dark:border-sky-400 font-semibold'
                    : 'border-transparent hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary Action & Theme Toggle */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={onToggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-200/50 dark:hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>

          <button
            onClick={onOpenSubscribe}
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-500 active:bg-sky-700 rounded-xl shadow-sm transition-colors whitespace-nowrap shrink-0 focus:outline-none focus:ring-2 focus:ring-sky-500/50"
          >
            <Bell className="w-3.5 h-3.5" />
            <span>Alerts</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Open mobile navigation"
            className="md:hidden p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-white/10 transition-colors focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fluent-acrylic border-b border-slate-200/50 dark:border-white/10 px-4 py-4 space-y-2">
          {navLinks.map((link) => {
            const isActive = currentPath === link.path;
            return (
              <button
                key={link.path}
                onClick={() => handleNavClick(link.path)}
                className={`block w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${
                  isActive
                    ? 'bg-sky-500/10 text-sky-600 dark:text-sky-400 font-semibold'
                    : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5'
                }`}
              >
                {link.label}
              </button>
            );
          })}
          <div className="pt-2 border-t border-slate-200/40 dark:border-white/10">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSubscribe();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-sky-600 rounded-xl"
            >
              <Bell className="w-3.5 h-3.5" />
              <span>Get Update Notifications</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

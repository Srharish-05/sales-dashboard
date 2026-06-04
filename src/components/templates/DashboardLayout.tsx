import React from "react";
import { LayoutDashboard, TrendingUp, HelpCircle, ShieldAlert, BarChart3, Settings } from "lucide-react";

interface DashboardLayoutProps {
  children: React.ReactNode;
  headerControls?: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  headerControls,
}) => {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans antialiased selection:bg-indigo-500/30">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Main Container */}
      <div className="flex flex-1 relative z-10">
        {/* Sidebar - hidden on mobile, visible on lg screens */}
        <aside className="hidden lg:flex flex-col w-64 border-r border-zinc-900 bg-zinc-950/80 backdrop-blur-xl p-6 shrink-0">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2 rounded-xl text-white shadow-lg shadow-indigo-500/20">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-white tracking-wide text-base">AURA</span>
              <span className="text-zinc-500 text-xs font-semibold uppercase tracking-wider block -mt-1">Analytics</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1.5 flex-1">
            <a
              href="#"
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-indigo-500/10 text-indigo-400 font-medium text-sm transition-all duration-300"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </a>
            <a
              href="#"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60 font-medium text-sm transition-all duration-300"
            >
              <BarChart3 className="w-4 h-4" />
              <span>Sales Reports</span>
            </a>
            <a
              href="#"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60 font-medium text-sm transition-all duration-300"
            >
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </a>
          </nav>

          {/* Sidebar Footer info */}
          <div className="border-t border-zinc-900 pt-4 flex flex-col gap-2 mt-auto">
            <div className="bg-zinc-900/50 p-4 rounded-xl border border-zinc-800/40">
              <div className="flex items-center gap-2 text-zinc-400 text-xs font-semibold mb-1">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Next.js 15 App</span>
              </div>
              <p className="text-[11px] text-zinc-500 leading-relaxed">
                Constructed using TypeScript, Tailwind CSS & Atomic Design pattern.
              </p>
            </div>
          </div>
        </aside>

        {/* Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <header className="h-16 border-b border-zinc-900 bg-zinc-950/60 backdrop-blur-xl px-6 flex items-center justify-between sticky top-0 z-20">
            <div className="flex items-center gap-3">
              {/* Mobile logo display */}
              <div className="lg:hidden bg-gradient-to-br from-indigo-500 to-purple-600 p-1.5 rounded-lg text-white">
                <TrendingUp className="w-4 h-4" />
              </div>
              <h1 className="text-base font-bold text-white lg:text-lg tracking-wide">
                Sales Dashboard
              </h1>
            </div>
            {headerControls && (
              <div className="flex items-center gap-3">
                {headerControls}
              </div>
            )}
          </header>

          {/* Main Content */}
          <main className="flex-1 p-6 lg:p-8 flex flex-col gap-6 max-w-7xl w-full mx-auto">
            {children}
          </main>

          {/* Footer */}
          <footer className="py-6 px-8 border-t border-zinc-900 text-center text-xs text-zinc-600 bg-zinc-950/20 mt-auto">
            &copy; {new Date().getFullYear()} Aura Analytics. Powered by Next.js & Tailwind.
          </footer>
        </div>
      </div>
    </div>
  );
};

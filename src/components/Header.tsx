import React from 'react';
import { 
  Activity, 
  Rss, 
  CopyCheck, 
  History, 
  TrendingUp, 
  PlusCircle, 
  Bell, 
  Terminal, 
  Sliders, 
  Menu, 
  X 
} from 'lucide-react';
import { AlertSettings } from '../types/monitoring';

export type ActiveTab = 
  | 'dashboard' 
  | 'feed' 
  | 'details' 
  | 'duplicates' 
  | 'historical' 
  | 'trends' 
  | 'add-topic' 
  | 'alerts';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  alertSettings: AlertSettings;
  unreadCount: number;
  onOpenDevGuide: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  alertSettings,
  unreadCount,
  onOpenDevGuide,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems = [
    { id: 'dashboard' as ActiveTab, label: 'Dashboard', icon: Activity },
    { id: 'feed' as ActiveTab, label: 'Research Feed', icon: Rss, badge: unreadCount > 0 ? unreadCount : undefined },
    { id: 'duplicates' as ActiveTab, label: 'Duplicates', icon: CopyCheck },
    { id: 'historical' as ActiveTab, label: 'Historical Comparison', icon: History },
    { id: 'trends' as ActiveTab, label: 'Trend Analysis', icon: TrendingUp },
    { id: 'add-topic' as ActiveTab, label: '+ Add Topic', icon: PlusCircle },
    { id: 'alerts' as ActiveTab, label: 'Alerts', icon: Bell },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6 h-16">
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setActiveTab('dashboard')}
              className="flex items-center gap-2.5 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-lg p-1 -m-1"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform duration-200">
                <Activity className="w-5 h-5 text-white stroke-[2.2]" />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-bold tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors flex items-center gap-1.5 whitespace-nowrap">
                  RESEARCHPULSE
                </span>
                <span className="text-[10px] tracking-wider font-semibold text-slate-500 uppercase -mt-0.5 whitespace-nowrap">
                  Agentic Research Monitor
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: Clean single-line text navigation links */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-5 text-xs font-semibold text-slate-600">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 py-1.5 px-2 rounded-lg ${
                    isActive
                      ? 'text-indigo-600 font-bold bg-indigo-50/60'
                      : 'hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {item.badge !== undefined && (
                    <span className="text-[10px] font-mono bg-indigo-600 text-white px-1.5 py-0.2 rounded-full tabular-nums">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Status Button */}
            <button
              onClick={() => setActiveTab('alerts')}
              title={alertSettings.webhookAlertsEnabled ? 'n8n Webhook Active' : 'Demonstration Simulation Mode'}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all duration-150 flex items-center gap-2 whitespace-nowrap shrink-0 ${
                alertSettings.webhookAlertsEnabled && alertSettings.webhookUrl
                  ? 'border-emerald-300 bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Sliders className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden sm:inline">
                {alertSettings.webhookAlertsEnabled && alertSettings.webhookUrl ? 'Live n8n Webhook' : 'Simulation Mode'}
              </span>
              <span
                className={`w-2 h-2 rounded-full ${
                  alertSettings.webhookAlertsEnabled && alertSettings.webhookUrl ? 'bg-emerald-500' : 'bg-amber-400'
                }`}
              />
            </button>

            {/* Developer Guide Trigger */}
            <button
              onClick={onOpenDevGuide}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors hidden sm:flex items-center gap-1 text-xs font-medium"
              title="VS Code & GitHub Setup Guide"
            >
              <Terminal className="w-4 h-4 text-slate-500" />
              <span className="hidden md:inline">Setup Guide</span>
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-3 space-y-1 shadow-lg animate-in slide-in-from-top-2 duration-150">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left flex items-center justify-between p-2.5 rounded-lg text-xs font-semibold ${
                  isActive ? 'bg-indigo-50 text-indigo-700' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span className="text-[10px] font-mono bg-indigo-600 text-white px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
          <div className="pt-2 border-t border-slate-100">
            <button
              onClick={() => {
                onOpenDevGuide();
                setMobileMenuOpen(false);
              }}
              className="w-full text-left flex items-center gap-2.5 p-2.5 text-xs font-medium text-slate-600 hover:text-slate-900 rounded-lg"
            >
              <Terminal className="w-4 h-4" />
              <span>VS Code & GitHub Setup Guide</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

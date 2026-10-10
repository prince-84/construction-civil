'use client';

import React from 'react';
import { useApp, NavTab } from '@/context/AppContext';
import {
  LayoutDashboard,
  Layers,
  ClipboardCheck,
  Truck,
  Ruler,
  HardHat,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Building,
} from 'lucide-react';

export default function Sidebar() {
  const {
    language,
    activeTab,
    setActiveTab,
    sidebarCollapsed,
    toggleSidebar,
    currentProject,
    rfis,
    pours,
  } = useApp();

  const isAr = language === 'ar';
  const pendingRfis = rfis.filter((r) => r.status === 'Pending').length;
  const upcomingPours = pours.filter((p) => p.status === 'Scheduled').length;

  const navItems: {
    id: NavTab;
    labelEn: string;
    labelAr: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: number;
    badgeColor?: string;
  }[] = [
    {
      id: 'dashboard',
      labelEn: 'Executive Dashboard',
      labelAr: 'لوحة المؤشرات التنفيذية',
      icon: LayoutDashboard,
    },
    {
      id: 'wbs',
      labelEn: 'Civil Phase Tracker (WBS)',
      labelAr: 'مخطط المراحل الإنشائية',
      icon: Layers,
    },
    {
      id: 'qaqc',
      labelEn: 'KSA QA/QC & RFI Engine',
      labelAr: 'محرك ضبط الجودة والتفتيش',
      icon: ClipboardCheck,
      badge: pendingRfis,
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
    },
    {
      id: 'pours',
      labelEn: 'Concrete Pour Scheduler',
      labelAr: 'جدولة صب الخرسانة',
      icon: Truck,
      badge: upcomingPours,
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    },
    {
      id: 'bbs',
      labelEn: 'Bar Bending Schedule (BBS)',
      labelAr: 'حصر وتفريد حديد التسليح',
      icon: Ruler,
    },
  ];

  return (
    <aside
      className={`relative z-20 flex flex-col bg-white border-e border-slate-200 transition-all duration-300 select-none ${
        sidebarCollapsed ? 'w-18' : 'w-64 lg:w-72'
      }`}
    >
      {/* Brand Header */}
      <div className="flex items-center justify-between px-4 h-18 border-b border-slate-100">
        {!sidebarCollapsed ? (
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-white shadow-sm shadow-amber-500/20">
              <HardHat className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base tracking-tight text-slate-900">
                  BenaaOps
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-200">
                  SBC
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">
                {isAr ? 'بنا السحابي للإشراف المدني' : 'Saudi Civil Ops Portal'}
              </p>
            </div>
          </div>
        ) : (
          <div className="mx-auto w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-white shadow-sm">
            <HardHat className="w-5 h-5" />
          </div>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
        {!sidebarCollapsed && (
          <div className="px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
            {isAr ? 'الوحدات الإنشائية' : 'Civil Engineering Modules'}
          </div>
        )}

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              title={isAr ? item.labelAr : item.labelEn}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-xs transition-all ${
                isActive
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-xs shadow-amber-500/25 ring-1 ring-amber-400'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              } ${sidebarCollapsed ? 'justify-center px-0' : ''}`}
            >
              <Icon
                className={`w-5 h-5 shrink-0 ${
                  isActive ? 'text-slate-950' : 'text-slate-400 group-hover:text-slate-600'
                }`}
              />
              {!sidebarCollapsed && (
                <div className="flex-1 flex items-center justify-between">
                  <span className="truncate">{isAr ? item.labelAr : item.labelEn}</span>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span
                      className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded-full border ${
                        isActive ? 'bg-slate-950 text-amber-300 border-slate-900' : item.badgeColor
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </div>
              )}
            </button>
          );
        })}
      </nav>

      {/* Project Status Summary Card (Bottom) */}
      {!sidebarCollapsed && (
        <div className="p-3 m-3 rounded-xl bg-slate-50 border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-700 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              {isAr ? 'حالة الاعتماد الإنشائي' : 'Civil Milestone'}
            </span>
            <span className="text-[11px] font-extrabold text-amber-600">
              {currentProject.progressPercent}%
            </span>
          </div>
          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden mb-2">
            <div
              className="bg-amber-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${currentProject.progressPercent}%` }}
            />
          </div>
          <div className="flex justify-between items-center text-[10px] text-slate-500">
            <span>{isAr ? 'الخرسانة المنفذة' : 'Concrete Poured'}</span>
            <span className="font-bold text-slate-800">
              {currentProject.totalConcretePouredM3.toLocaleString()} m³
            </span>
          </div>
        </div>
      )}

      {/* Collapse Toggle Footer */}
      <div className="p-2 border-t border-slate-100 flex justify-end">
        <button
          onClick={toggleSidebar}
          aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          {sidebarCollapsed ? (
            isAr ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />
          ) : (
            isAr ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />
          )}
        </button>
      </div>
    </aside>
  );
}

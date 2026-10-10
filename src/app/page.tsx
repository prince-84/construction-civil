'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import DashboardTab from '@/components/DashboardTab';
import WbsTrackerTab from '@/components/WbsTrackerTab';
import QaqcEngineTab from '@/components/QaqcEngineTab';
import PourSchedulerTab from '@/components/PourSchedulerTab';
import BbsRebarTab from '@/components/BbsRebarTab';
import PourBookingModal from '@/components/Modals/PourBookingModal';
import NewRfiModal from '@/components/Modals/NewRfiModal';
import RfiDetailDrawer from '@/components/Modals/RfiDetailDrawer';
import { ShieldCheck, HardHat } from 'lucide-react';

export default function Home() {
  const { activeTab, language, currentProject } = useApp();
  const isAr = language === 'ar';

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Top Header */}
      <Header />

      {/* Main Body Area: Sidebar + Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Navigation Sidebar */}
        <Sidebar />

        {/* Dynamic Tab Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-slate-50/70">
          <div className="max-w-7xl mx-auto space-y-8">
            {activeTab === 'dashboard' && <DashboardTab />}
            {activeTab === 'wbs' && <WbsTrackerTab />}
            {activeTab === 'qaqc' && <QaqcEngineTab />}
            {activeTab === 'pours' && <PourSchedulerTab />}
            {activeTab === 'bbs' && <BbsRebarTab />}

            {/* Enterprise Portal Footer */}
            <footer className="pt-8 pb-4 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-md bg-amber-500 text-slate-950 flex items-center justify-center font-bold text-[10px]">
                  <HardHat className="w-3 h-3" />
                </div>
                <span className="font-semibold text-slate-700">
                  {isAr
                    ? 'بنا السحابي | منصة الإشراف والعمليات المدنية - المملكة العربية السعودية'
                    : 'BenaaOps | Saudi Civil Construction Management Portal'}
                </span>
              </div>

              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1 font-medium text-emerald-700">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>SBC 301-305 Certified</span>
                </span>
                <span>•</span>
                <span>SAR Currency Ledger</span>
                <span>•</span>
                <span>KSA Civil Standards</span>
              </div>
            </footer>
          </div>
        </main>
      </div>

      {/* Global Interactive Modals */}
      <PourBookingModal />
      <NewRfiModal />
      <RfiDetailDrawer />
    </div>
  );
}

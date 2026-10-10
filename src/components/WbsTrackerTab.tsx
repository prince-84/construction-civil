'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { CivilPhase } from '@/types';
import {
  Layers,
  CheckCircle2,
  Circle,
  ShieldCheck,
  Building,
  Hammer,
  HelpCircle,
  FileCheck,
  TrendingUp,
  AlertCircle,
  Clock,
} from 'lucide-react';

export default function WbsTrackerTab() {
  const { language, wbsPhases, toggleWbsItem, currentProject } = useApp();
  const [filterPhase, setFilterPhase] = useState<'all' | CivilPhase>('all');

  const isAr = language === 'ar';

  const displayedPhases =
    filterPhase === 'all'
      ? wbsPhases
      : wbsPhases.filter((p) => p.phase === filterPhase);

  // Overall WBS progress
  const totalItems = wbsPhases.reduce((acc, p) => acc + p.items.length, 0);
  const completedItems = wbsPhases.reduce(
    (acc, p) => acc + p.items.filter((i) => i.completed).length,
    0
  );
  const overallProgress = Math.round((completedItems / totalItems) * 100);

  return (
    <div className="space-y-6">
      {/* Top Banner & Overall Progress */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300">
                SBC 301 - 305 WBS
              </span>
              <span className="text-xs font-semibold text-slate-500">
                {isAr ? currentProject.nameAr : currentProject.name}
              </span>
            </div>
            <h1 className="text-xl font-black text-slate-900">
              {isAr ? 'مخطط المراحل والأنشطة الإنشائية (WBS Tracker)' : 'Civil Work Breakdown Structure (WBS)'}
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              {isAr
                ? 'متابعة المعايير الإنشائية لكود البناء السعودي من الحفر والأساسات وحتى الهيكل الخرساني وأعمال البلوك'
                : 'Track and verify structural milestones under Saudi Building Code execution protocols'}
            </p>
          </div>

          <div className="w-full lg:w-72 p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-xs font-bold text-slate-700">
                {isAr ? 'الإنجاز الكلي للأنشطة' : 'Total Civil Completion'}
              </span>
              <span className="text-sm font-extrabold text-amber-600">
                {overallProgress}%
              </span>
            </div>
            <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden mb-2">
              <div
                className="bg-amber-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${overallProgress}%` }}
              />
            </div>
            <div className="flex justify-between text-[11px] text-slate-500 font-medium">
              <span>
                {isAr
                  ? `${completedItems} من ${totalItems} نشاط مكتمل`
                  : `${completedItems} of ${totalItems} milestones verified`}
              </span>
              <span className="text-emerald-700 font-bold">
                {isAr ? 'مطابق للكود' : 'SBC Compliant'}
              </span>
            </div>
          </div>
        </div>

        {/* Phase Filter Tabs */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
          <button
            onClick={() => setFilterPhase('all')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              filterPhase === 'all'
                ? 'bg-amber-500 text-slate-950 shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {isAr ? 'جميع المراحل الإنشائية' : 'All Phases'}
          </button>
          <button
            onClick={() => setFilterPhase('substructure')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              filterPhase === 'substructure'
                ? 'bg-amber-500 text-slate-950 shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {isAr ? '1. الأعمال التحتية والأساسات (Substructure)' : '1. Substructure & Deep Civil'}
          </button>
          <button
            onClick={() => setFilterPhase('superstructure')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              filterPhase === 'superstructure'
                ? 'bg-amber-500 text-slate-950 shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {isAr ? '2. الهيكل الإنشائي والأسقف (Superstructure)' : '2. Superstructure & Slabs'}
          </button>
          <button
            onClick={() => setFilterPhase('finishing')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              filterPhase === 'finishing'
                ? 'bg-amber-500 text-slate-950 shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {isAr ? '3. الأعمال الرطبة ومباني البلوك (Wet Trades)' : '3. Wet Trades & Masonry'}
          </button>
        </div>
      </div>

      {/* Phase Cards with Interactive SBC Checklists */}
      <div className="space-y-6">
        {displayedPhases.map((phase) => (
          <div
            key={phase.id}
            className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden"
          >
            {/* Phase Header */}
            <div className="p-5 bg-gradient-to-r from-slate-50 to-white border-b border-slate-200/80 flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[11px] font-extrabold px-2 py-0.5 rounded bg-slate-200 text-slate-800">
                    {phase.sbcCode}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      phase.progress === 100
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                        : phase.progress > 50
                        ? 'bg-amber-50 text-amber-800 border-amber-300'
                        : 'bg-sky-50 text-sky-800 border-sky-300'
                    }`}
                  >
                    {isAr ? phase.statusAr : phase.status}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  {isAr ? phase.titleAr : phase.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed max-w-3xl">
                  {isAr ? phase.descriptionAr : phase.description}
                </p>
              </div>

              {/* Phase Progress Gauge */}
              <div className="w-full md:w-56 shrink-0 bg-white p-3 rounded-xl border border-slate-200">
                <div className="flex justify-between items-center text-xs mb-1 font-bold">
                  <span className="text-slate-600">{isAr ? 'الإنجاز' : 'Phase Progress'}</span>
                  <span className="text-amber-600">{phase.progress}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      phase.progress === 100 ? 'bg-emerald-500' : 'bg-amber-500'
                    }`}
                    style={{ width: `${phase.progress}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Checklist Items */}
            <div className="p-5 space-y-2.5">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                {isAr
                  ? 'قائمة الفحص الميداني والمطابقة (انقر للتأكيد أو الإلغاء):'
                  : 'Site Verification Checklist (Click to Toggle Status):'}
              </div>

              {phase.items.map((item) => (
                <div
                  key={item.id}
                  onClick={() => toggleWbsItem(phase.id, item.id)}
                  className={`p-3.5 rounded-xl border flex items-start gap-3.5 cursor-pointer transition-all ${
                    item.completed
                      ? 'bg-emerald-50/40 border-emerald-200/90 hover:bg-emerald-50/70'
                      : 'bg-slate-50/60 border-slate-200 hover:border-slate-300 hover:bg-slate-100/60'
                  }`}
                >
                  <button
                    type="button"
                    className="mt-0.5 text-slate-400 hover:text-emerald-600 transition-colors shrink-0"
                  >
                    {item.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-300" />
                    )}
                  </button>

                  <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <span
                      className={`text-xs font-semibold leading-relaxed ${
                        item.completed ? 'text-slate-900' : 'text-slate-600'
                      }`}
                    >
                      {isAr ? item.textAr : item.text}
                    </span>
                    <span className="shrink-0 font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-600 self-start sm:self-center">
                      {item.sbcCode}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Engineering Standard Note Bar */}
            <div className="px-5 py-3 bg-slate-50 border-t border-slate-200/70 flex items-center justify-between text-[11px] text-slate-600">
              <span className="flex items-center gap-1.5 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                {isAr
                  ? 'يتطلب كل بند محضر استلام موقع من استشاري الإشراف المعتمد'
                  : 'Each milestone requires official sign-off by supervising consultant inspector'}
              </span>
              <span className="font-bold text-slate-800">
                {isAr ? currentProject.consultantAr : currentProject.consultant}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

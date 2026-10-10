'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import {
  Building2,
  Calendar,
  Thermometer,
  Globe2,
  Bell,
  Sliders,
  ChevronDown,
  CheckCircle2,
  AlertTriangle,
  Flame,
  HardHat,
  Menu,
} from 'lucide-react';

export default function Header() {
  const {
    language,
    toggleLanguage,
    currentProject,
    setCurrentProject,
    projects,
    weather,
    setSimulatedAmbientTemp,
    toggleSidebar,
  } = useApp();

  const [projectDropdownOpen, setProjectDropdownOpen] = useState(false);
  const [weatherSliderOpen, setWeatherSliderOpen] = useState(false);

  const isAr = language === 'ar';

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all">
      <div className="flex items-center justify-between px-4 lg:px-6 h-18">
        {/* Left: Mobile menu button & Project Selector */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleSidebar}
            aria-label="Toggle Navigation Sidebar"
            className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Project Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setProjectDropdownOpen(!projectDropdownOpen)}
              className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-amber-400 hover:bg-amber-50/40 text-left transition-all"
            >
              <div className="w-8 h-8 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-600 shrink-0">
                <Building2 className="w-4 h-4" />
              </div>
              <div className="hidden sm:block">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-semibold text-slate-900 line-clamp-1 max-w-[200px] md:max-w-[260px]">
                    {isAr ? currentProject.nameAr : currentProject.name}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </div>
                <span className="text-[11px] text-slate-500 block">
                  {isAr ? currentProject.locationAr : currentProject.location}
                </span>
              </div>
            </button>

            {projectDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setProjectDropdownOpen(false)}
                />
                <div className="absolute top-full mt-2 w-72 md:w-84 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50">
                  <div className="px-3 py-2 border-b border-slate-100 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    {isAr ? 'المشاريع الإنشائية المعتمدة' : 'Active Civil Projects (KSA)'}
                  </div>
                  {projects.map((proj) => (
                    <button
                      key={proj.id}
                      onClick={() => {
                        setCurrentProject(proj);
                        setProjectDropdownOpen(false);
                      }}
                      className={`w-full px-3 py-2.5 text-left flex items-start gap-2.5 hover:bg-amber-50/60 transition-colors ${
                        proj.id === currentProject.id ? 'bg-amber-50/80 border-s-4 border-amber-500' : ''
                      }`}
                    >
                      <Building2 className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-xs font-semibold text-slate-900">
                          {isAr ? proj.nameAr : proj.name}
                        </p>
                        <p className="text-[11px] text-slate-500">
                          {isAr ? proj.consultantAr : proj.consultant}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Center / Right Section */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Dual Date (Gregorian & Hijri) */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-600 text-xs font-medium">
            <Calendar className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span>
              {isAr ? '19 شوال 1447 هـ | 10 أكتوبر 2026' : '19 Shawwal 1447 AH | 10 Oct 2026'}
            </span>
          </div>

          {/* Weather & Pour Safety Status Pill */}
          <div className="relative">
            <button
              onClick={() => setWeatherSliderOpen(!weatherSliderOpen)}
              className={`flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                weather.ambientTempC >= 38
                  ? 'bg-rose-50 text-rose-700 border-rose-300 hover:bg-rose-100'
                  : weather.ambientTempC >= 32
                  ? 'bg-amber-50 text-amber-800 border-amber-300 hover:bg-amber-100'
                  : 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
              }`}
              title="Click to simulate temperature"
            >
              <div className="flex items-center gap-1">
                {weather.ambientTempC >= 38 ? (
                  <Flame className="w-4 h-4 text-rose-600 animate-pulse" />
                ) : weather.ambientTempC >= 32 ? (
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                ) : (
                  <Thermometer className="w-4 h-4 text-emerald-600" />
                )}
                <span className="font-bold text-slate-900">{weather.ambientTempC}°C</span>
              </div>
              <span className="hidden md:inline font-semibold">
                {isAr ? weather.statusAlertAr : weather.statusAlert}
              </span>
              <Sliders className="w-3.5 h-3.5 opacity-60 hover:opacity-100" />
            </button>

            {/* Weather Simulator Popup */}
            {weatherSliderOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setWeatherSliderOpen(false)}
                />
                <div className="absolute top-full mt-2 end-0 w-80 bg-white rounded-xl shadow-xl border border-slate-200 p-4 z-50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <Thermometer className="w-4 h-4 text-amber-500" />
                      {isAr ? 'محاكي حرارة الموقع (SBC 304)' : 'Site Ambient Temp Simulator (SBC 304)'}
                    </span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-800">
                      {weather.ambientTempC}°C
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mb-3">
                    {isAr
                      ? 'حرّك المؤشر لاختبار تنبيهات درجات الحرارة وبروتوكول الصب الليلي.'
                      : 'Slide to test live hot weather cutoff warnings & night pour protocol.'}
                  </p>
                  <input
                    type="range"
                    min="24"
                    max="46"
                    value={weather.ambientTempC}
                    onChange={(e) => setSimulatedAmbientTemp(Number(e.target.value))}
                    className="w-full accent-amber-500 h-2 bg-slate-200 rounded-lg cursor-pointer mb-3"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-medium mb-3">
                    <span>24°C (Safe)</span>
                    <span className="text-amber-600 font-bold">32°C (Ice Req.)</span>
                    <span className="text-rose-600 font-bold">38°C+ (Night Only)</span>
                    <span>46°C</span>
                  </div>
                  <div
                    className={`p-2.5 rounded-lg text-xs ${
                      weather.ambientTempC >= 38
                        ? 'bg-rose-50 text-rose-800 border border-rose-200'
                        : weather.ambientTempC >= 32
                        ? 'bg-amber-50 text-amber-800 border border-amber-200'
                        : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    }`}
                  >
                    <p className="font-semibold mb-0.5">
                      {isAr ? weather.statusAlertAr : weather.statusAlert}
                    </p>
                    <p className="text-[11px] leading-relaxed">
                      {isAr ? weather.advisoryAr : weather.advisoryEn}
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Language Switcher Button */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-amber-100/60 border border-slate-200 text-slate-700 hover:text-amber-900 text-xs font-semibold transition-all"
            title={isAr ? 'Switch to English' : 'التبديل إلى العربية'}
          >
            <Globe2 className="w-3.5 h-3.5 text-amber-600" />
            <span>{isAr ? 'English' : 'عربي (RTL)'}</span>
          </button>

          {/* User Profile Avatar */}
          <div className="flex items-center gap-2 ps-2 border-s border-slate-200">
            <div className="w-8 h-8 rounded-full bg-slate-800 text-amber-400 flex items-center justify-center font-bold text-xs shadow-xs">
              <HardHat className="w-4 h-4" />
            </div>
            <div className="hidden xl:block text-left">
              <p className="text-xs font-bold text-slate-900 leading-tight">
                {isAr ? 'م. وليد الشهري' : 'Eng. Waleed Al-Shehri'}
              </p>
              <p className="text-[10px] text-slate-500 leading-tight">
                {isAr ? 'كبير مهندسي الموقع (QA/QC)' : 'Chief Civil Inspector'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

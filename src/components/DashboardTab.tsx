'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import {
  Layers,
  FileCheck2,
  Droplets,
  ThermometerSnowflake,
  AlertOctagon,
  Calendar,
  Clock,
  ArrowUpRight,
  PlusCircle,
  Truck,
  Sparkles,
  CheckCircle,
  Clock3,
  Flame,
  Info,
  Building2,
  Ruler,
} from 'lucide-react';

export default function DashboardTab() {
  const {
    language,
    currentProject,
    weather,
    rfis,
    pours,
    wbsPhases,
    setActiveTab,
    setPourModalOpen,
    setRfiModalOpen,
    setSelectedRfi,
  } = useApp();

  const isAr = language === 'ar';

  const pendingRfis = rfis.filter((r) => r.status === 'Pending').length;
  const approvedRfis = rfis.filter((r) => r.status === 'Code A').length;
  const upcomingPours = pours.filter((p) => p.status === 'Scheduled');

  // Percentage poured
  const pourPercent = Math.min(
    100,
    Math.round((currentProject.totalConcretePouredM3 / currentProject.totalConcreteTargetM3) * 100)
  );

  return (
    <div className="space-y-6">
      {/* Welcome & Site Overview Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-6 md:p-8 shadow-sm">
        <div className="absolute top-0 end-0 -mt-8 -me-8 w-64 h-64 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isAr ? 'كود البناء السعودي (SBC 301-305)' : 'SBC 301-305 Civil Compliance Active'}</span>
            </div>
            <h1 className="text-xl md:text-2xl font-black tracking-tight text-white">
              {isAr ? currentProject.nameAr : currentProject.name}
            </h1>
            <p className="text-xs md:text-sm text-slate-300 max-w-2xl leading-relaxed">
              {isAr
                ? `استشاري المشروع: ${currentProject.consultantAr} | المقاول العام: ${currentProject.contractorAr}`
                : `Supervising Consultant: ${currentProject.consultant} | General Contractor: ${currentProject.contractor}`}
            </p>
          </div>

          {/* Quick Action CTA buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setPourModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-sm shadow-amber-500/30 transition-all cursor-pointer"
            >
              <Truck className="w-4 h-4" />
              <span>{isAr ? 'حجز صبة خرسانية' : 'Book Concrete Pour'}</span>
            </button>
            <button
              onClick={() => setRfiModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 transition-all cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{isAr ? 'تقديم طلب فحص (RFI)' : 'Submit WIR / RFI'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Header Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Active Civil Zones */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:border-amber-300 transition-all group">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              {isAr ? 'قطاعات العمل المدني النشطة' : 'Active Civil Zones'}
            </span>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Layers className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-3xl font-black text-slate-900">
              {currentProject.activeCivilZones}
            </span>
            <span className="text-xs font-bold text-slate-500">
              {isAr ? 'مناطق صب وهياكل' : 'Active Sectors'}
            </span>
          </div>
          <p className="text-[11px] text-slate-500">
            {isAr
              ? 'اللبشة، الأعمدة، أسقف الشد اللاحق، مباني البلوك'
              : 'Raft, Columns, PT Slabs & AAC Blockwork'}
          </p>
        </div>

        {/* Card 2: Pending RFIs / WIRs */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:border-amber-300 transition-all group">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              {isAr ? 'طلبات الفحص المعلقة (WIR/RFI)' : 'Pending Inspection RFIs'}
            </span>
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center group-hover:scale-105 transition-transform">
              <FileCheck2 className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-3xl font-black text-slate-900">{pendingRfis}</span>
            <span className="text-xs font-bold text-amber-600">
              {isAr ? `من إجمالي ${rfis.length} طلب` : `of ${rfis.length} total`}
            </span>
          </div>
          <p className="text-[11px] text-slate-500">
            {isAr
              ? `معتمد كود A: ${approvedRfis} طلبات استلام`
              : `${approvedRfis} RFIs Approved under Code A`}
          </p>
        </div>

        {/* Card 3: Total Concrete Poured vs Target */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:border-amber-300 transition-all group">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              {isAr ? 'حجم الخرسانة المنفذة' : 'Concrete Poured (m³)'}
            </span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Droplets className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-2xl font-black text-slate-900">
              {currentProject.totalConcretePouredM3.toLocaleString()}
            </span>
            <span className="text-xs font-bold text-slate-400">
              / {currentProject.totalConcreteTargetM3.toLocaleString()} m³
            </span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div
              className="bg-emerald-500 h-full rounded-full transition-all duration-700"
              style={{ width: `${pourPercent}%` }}
            />
          </div>
          <div className="flex justify-between items-center text-[10px] text-slate-500 mt-1.5 font-medium">
            <span>{isAr ? 'الإنجاز الخرساني' : 'Target Achieved'}</span>
            <span className="font-bold text-emerald-700">{pourPercent}%</span>
          </div>
        </div>

        {/* Card 4: Hot Weather Pour Safety Status */}
        <div
          className={`rounded-2xl p-5 border shadow-xs transition-all ${
            weather.ambientTempC >= 38
              ? 'bg-rose-50/70 border-rose-200'
              : weather.ambientTempC >= 32
              ? 'bg-amber-50/70 border-amber-200'
              : 'bg-emerald-50/70 border-emerald-200'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
              {isAr ? 'سلامة الصب والطقس الحار' : 'Hot Weather Pour Safety'}
            </span>
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                weather.ambientTempC >= 38
                  ? 'bg-rose-100 text-rose-700'
                  : weather.ambientTempC >= 32
                  ? 'bg-amber-100 text-amber-800'
                  : 'bg-emerald-100 text-emerald-800'
              }`}
            >
              {weather.ambientTempC >= 38 ? (
                <Flame className="w-5 h-5 animate-pulse" />
              ) : weather.ambientTempC >= 32 ? (
                <AlertOctagon className="w-5 h-5" />
              ) : (
                <ThermometerSnowflake className="w-5 h-5" />
              )}
            </div>
          </div>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-3xl font-black text-slate-900">{weather.ambientTempC}°C</span>
            <span
              className={`text-xs font-extrabold px-2 py-0.5 rounded-full ${
                weather.ambientTempC >= 38
                  ? 'bg-rose-200 text-rose-900'
                  : weather.ambientTempC >= 32
                  ? 'bg-amber-200 text-amber-900'
                  : 'bg-emerald-200 text-emerald-900'
              }`}
            >
              {isAr ? weather.statusAlertAr : weather.statusAlert}
            </span>
          </div>
          <p className="text-[11px] text-slate-600 font-medium line-clamp-1">
            {isAr
              ? 'حد الصب المعتمد: الخرسانة ≤ 32°م'
              : 'SBC 304 Threshold: Mix Temp ≤ 32°C'}
          </p>
        </div>
      </div>

      {/* Middle Row: Pour Timeline & Milestones + Hot Weather Advisory Widget */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left (2 cols): Interactive Pour Timeline & Structural Milestones */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Layers className="w-4 h-4 text-amber-500" />
                {isAr
                  ? 'المسار الزمني للمراحل الإنشائية (Saudi Civil Milestones)'
                  : 'Civil Milestones & Pour Timeline'}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {isAr
                  ? 'تتبع المراحل من صب النظافة والأساسات وحتى الأسقف وأعمال البلوك'
                  : 'Tracking progress from Substructure PCC to Superstructure PT Slabs & AAC Blockwork'}
              </p>
            </div>
            <button
              onClick={() => setActiveTab('wbs')}
              className="inline-flex items-center gap-1 text-xs font-bold text-amber-600 hover:text-amber-700 hover:underline"
            >
              <span>{isAr ? 'عرض جدول WBS الكامل' : 'Full WBS Tracker'}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Stepper / Timeline */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 relative">
            {/* Stage 1 */}
            <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200/80 relative">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                  {isAr ? 'مكتمل' : 'Completed'}
                </span>
                <CheckCircle className="w-4 h-4 text-emerald-600" />
              </div>
              <h4 className="text-xs font-bold text-slate-900 mb-1">
                {isAr ? 'صب النظافة والعزل' : 'PCC Blinding & Tanking'}
              </h4>
              <p className="text-[11px] text-slate-600 mb-2">
                {isAr ? 'PCC 1:4:8 وعزل بيتوميني مزدوج' : 'PCC 1:4:8 & Bitumat 4mm membrane'}
              </p>
              <div className="text-[10px] font-semibold text-emerald-800">100% Verified (SBC 301)</div>
            </div>

            {/* Stage 2 */}
            <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200/80 relative">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                  {isAr ? 'مكتمل' : 'Completed'}
                </span>
                <CheckCircle className="w-4 h-4 text-emerald-600" />
              </div>
              <h4 className="text-xs font-bold text-slate-900 mb-1">
                {isAr ? 'لبشة الأساسات (SRC)' : 'Raft Foundation (SRC)'}
              </h4>
              <p className="text-[11px] text-slate-600 mb-2">
                {isAr ? 'أسمنت C40 مقاوم للأملاح 2,800 م³' : 'C40 SRC concrete, 2,800 m³ poured'}
              </p>
              <div className="text-[10px] font-semibold text-emerald-800">100% Cube Pass (44.8 MPa)</div>
            </div>

            {/* Stage 3 */}
            <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-300 relative ring-2 ring-amber-400/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300">
                  {isAr ? 'قيد التنفيذ النشط' : 'In Progress'}
                </span>
                <Clock3 className="w-4 h-4 text-amber-600 animate-spin" />
              </div>
              <h4 className="text-xs font-bold text-slate-900 mb-1">
                {isAr ? 'أعمدة وأسقف الشد اللاحق' : 'Columns & PT Slabs'}
              </h4>
              <p className="text-[11px] text-slate-600 mb-2">
                {isAr ? 'صب سقف الدور 2 مع الثلج ليلاً' : 'Level 2 Slab night pour (380 m³)'}
              </p>
              <div className="text-[10px] font-bold text-amber-800">64% Progress (SBC 304)</div>
            </div>

            {/* Stage 4 */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 relative opacity-90">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-slate-200 text-slate-700">
                  {isAr ? 'المرحلة التالية' : 'Upcoming'}
                </span>
                <Clock className="w-4 h-4 text-slate-400" />
              </div>
              <h4 className="text-xs font-bold text-slate-900 mb-1">
                {isAr ? 'مباني البلوك الخفيف AAC' : 'AAC Blockwork & Plaster'}
              </h4>
              <p className="text-[11px] text-slate-600 mb-2">
                {isAr ? 'مدماك البداية وعزل دورات المياه' : 'First course alignment & APP membranes'}
              </p>
              <div className="text-[10px] font-medium text-slate-500">35% Progress (SBC 305)</div>
            </div>
          </div>

          {/* Quick Inspection Summary Table snippet */}
          <div className="mt-6 pt-5 border-t border-slate-100">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-800">
                {isAr ? 'أحدث طلبات التفتيش والاستلام (Recent RFI Activity)' : 'Recent Inspection Requests (RFIs)'}
              </span>
              <button
                onClick={() => setActiveTab('qaqc')}
                className="text-xs font-semibold text-slate-500 hover:text-amber-600"
              >
                {isAr ? 'عرض الكل' : 'View all'}
              </button>
            </div>
            <div className="divide-y divide-slate-100">
              {rfis.slice(0, 3).map((rfi) => (
                <div
                  key={rfi.id}
                  onClick={() => {
                    setSelectedRfi(rfi);
                    setActiveTab('qaqc');
                  }}
                  className="py-2.5 flex items-center justify-between hover:bg-slate-50 px-2 rounded-lg cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-slate-900">
                      {rfi.rfiNo}
                    </span>
                    <span className="text-xs text-slate-600 font-medium line-clamp-1">
                      {isAr ? rfi.titleAr : rfi.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        rfi.status === 'Code A'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          : rfi.status === 'Code B'
                          ? 'bg-amber-50 text-amber-800 border-amber-200'
                          : rfi.status === 'Code C'
                          ? 'bg-rose-50 text-rose-800 border-rose-200'
                          : 'bg-sky-50 text-sky-800 border-sky-200'
                      }`}
                    >
                      {rfi.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right (1 col): Real-time Weather & Hot Weather Pour Advisory Widget */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <ThermometerSnowflake className="w-4 h-4 text-amber-500" />
                {isAr ? 'مستشار الطقس الحار (SBC 304)' : 'Hot Weather Pour Advisory'}
              </h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                {isAr ? 'محطة القياس الميدانية' : 'Site Sensor'}
              </span>
            </div>

            <div
              className={`p-4 rounded-xl border mb-4 ${
                weather.ambientTempC >= 38
                  ? 'bg-rose-50 text-rose-900 border-rose-300'
                  : weather.ambientTempC >= 32
                  ? 'bg-amber-50 text-amber-900 border-amber-300'
                  : 'bg-emerald-50 text-emerald-900 border-emerald-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-black">{weather.ambientTempC}°C</span>
                  <span className="text-xs font-semibold text-slate-600">
                    {isAr ? 'حرارة الجو' : 'Ambient'}
                  </span>
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-white shadow-xs">
                  {isAr ? weather.statusAlertAr : weather.statusAlert}
                </span>
              </div>
              <p className="text-xs leading-relaxed font-medium">
                {isAr ? weather.advisoryAr : weather.advisoryEn}
              </p>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                <span className="text-slate-600 flex items-center gap-1.5 font-medium">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  {isAr ? 'نافذة الصب الآمنة القادمة:' : 'Next Optimal Pour Window:'}
                </span>
                <span className="font-bold text-slate-900 text-end">
                  {isAr ? weather.nextSafeWindowAr : weather.nextSafeWindow}
                </span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                <span className="text-slate-600 font-medium">
                  {isAr ? 'الرطوبة النسبية بالموقع:' : 'Relative Humidity:'}
                </span>
                <span className="font-bold text-slate-900">{weather.humidityPercent}%</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                <span className="text-slate-600 font-medium">
                  {isAr ? 'سرعة الرياح (احتمالية الشروخ):' : 'Wind Speed (Shrinkage Risk):'}
                </span>
                <span className="font-bold text-slate-900">{weather.windSpeedKmh} km/h (Low Risk)</span>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-100">
            <button
              onClick={() => setActiveTab('pours')}
              className="w-full py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
            >
              <Truck className="w-4 h-4 text-amber-400" />
              <span>{isAr ? 'عرض جدول ومضخات الصب' : 'Open Pour Logistics Engine'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Row: Upcoming Concrete Pours Grid & Fast Facts */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Truck className="w-4 h-4 text-amber-500" />
              {isAr ? 'الصبات الخرسانية المجدولة القادمة' : 'Upcoming Scheduled Concrete Pours'}
            </h3>
            <p className="text-xs text-slate-500">
              {isAr
                ? 'مراقبة الوردية الليلية وتوريد الثلج المجروش والمضخات الهيدروليكية'
                : 'Night shift windows, flake ice batching & pump logistics under Saudi Standards'}
            </p>
          </div>
          <button
            onClick={() => setPourModalOpen(true)}
            className="text-xs font-bold px-3 py-1.5 rounded-lg bg-amber-500 text-slate-950 hover:bg-amber-400 transition-colors"
          >
            {isAr ? '+ جدولة صبة جديدة' : '+ Book Pour'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {upcomingPours.map((pour) => (
            <div
              key={pour.id}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:border-amber-300 hover:bg-amber-50/20 transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs font-extrabold text-amber-700">
                  {pour.bookingNo}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200 text-slate-800">
                  {isAr ? pour.windowAr : pour.window}
                </span>
              </div>
              <h4 className="text-xs font-bold text-slate-900 mb-1.5">
                {isAr ? pour.targetElementAr : pour.targetElement}
              </h4>
              <div className="space-y-1 text-[11px] text-slate-600 mb-3">
                <div className="flex justify-between">
                  <span>{isAr ? 'الكمية والرتبة:' : 'Volume & Grade:'}</span>
                  <span className="font-bold text-slate-900">
                    {pour.volumeM3} m³ ({pour.mixGrade})
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>{isAr ? 'المضخة:' : 'Pump Type:'}</span>
                  <span className="font-semibold text-slate-800">
                    {isAr ? pour.pumpTypeAr : pour.pumpType}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>{isAr ? 'نسبة استبدال الثلج:' : 'Flake Ice %:'}</span>
                  <span className="font-bold text-blue-600">{pour.icePercent}% Ice Replacement</span>
                </div>
                <div className="flex justify-between">
                  <span>{isAr ? 'الحرارة المتوقعة:' : 'Est. Mix Temp:'}</span>
                  <span className="font-bold text-emerald-700">{pour.estimatedTempC}°C (≤ 32°C OK)</span>
                </div>
              </div>
              <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-[10px] text-slate-500">
                <span className="flex items-center gap-1 font-medium">
                  <Calendar className="w-3 h-3 text-slate-400" />
                  {pour.pourDate}
                </span>
                <span className="flex items-center gap-1 font-medium">
                  <Clock className="w-3 h-3 text-slate-400" />
                  {pour.pourTime}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

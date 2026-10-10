'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { ConcretePourBooking } from '@/types';
import {
  Truck,
  PlusCircle,
  Calendar,
  Clock,
  Thermometer,
  Snowflake,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  Printer,
  X,
  Building2,
  FileSpreadsheet,
} from 'lucide-react';

export default function PourSchedulerTab() {
  const { language, pours, setPourModalOpen, weather, currentProject } = useApp();
  const [selectedTicket, setSelectedTicket] = useState<ConcretePourBooking | null>(null);

  const isAr = language === 'ar';

  const totalVolumeScheduled = pours.reduce((acc, p) => acc + p.volumeM3, 0);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-300">
                SBC 304 Hot Weather Concrete
              </span>
              <span className="text-xs font-semibold text-slate-500">
                {isAr ? currentProject.nameAr : currentProject.name}
              </span>
            </div>
            <h1 className="text-xl font-black text-slate-900">
              {isAr ? 'جدولة صب الخرسانة وبروتوكول الطقس الحار' : 'Concrete Pour Scheduler & Hot Weather Logistics'}
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              {isAr
                ? 'إدارة حجوزات محطات الخلط، شاحنات الخلاطات، مضخات البوم 56م، ونسب إضافة الثلج المجروش والمياه المبردة'
                : 'Manage batch plant allocations, transit mixers, 56m boom pumps, and flake ice replacement percentages'}
            </p>
          </div>

          <button
            onClick={() => setPourModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-xs transition-all cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>{isAr ? 'حجز صبة جديدة' : 'Book New Concrete Pour'}</span>
          </button>
        </div>

        {/* Hot Weather Rules Alert Card */}
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs">
          <div className="flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-amber-950">
                {isAr ? 'اشتراطات كود البناء السعودي (SBC 304) للصب في الأجواء الحارة:' : 'SBC 304 Hot Weather Pouring Constraints:'}
              </h4>
              <p className="text-[11px] text-amber-900 mt-0.5 leading-relaxed">
                {isAr
                  ? 'أقصى درجة حرارة مسموح بها للخرسانة الطازجة لحظة الصب هي 32°م. عند تجاوز حرارة الجو 38°م نهاراً، يُحظر الصب نهاراً ويجب التحول للورديات الليلية (20:00 - 04:00) مع استبدال ماء الخلط بثلج مجروش لا يقل عن 50%.'
                  : 'Maximum fresh concrete delivery temperature is 32°C. When ambient temperature exceeds 38°C, daytime pouring is strictly prohibited. Shifts must transition to night windows (20:00 - 04:00) with ≥ 50% flake ice replacement.'}
              </p>
            </div>
          </div>
          <div className="shrink-0 flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-amber-300 font-bold text-slate-900">
            <Thermometer className="w-4 h-4 text-rose-600" />
            <span>Limit: ≤ 32°C</span>
          </div>
        </div>
      </div>

      {/* Logistics Overview KPI cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
            {isAr ? 'إجمالي الحجم المجدول هذا الأسبوع' : 'Total Scheduled Volume'}
          </span>
          <div className="text-2xl font-black text-slate-900">{totalVolumeScheduled} m³</div>
          <p className="text-[11px] text-slate-500 mt-1">
            {isAr ? `${pours.length} صبات مجدولة` : `${pours.length} batch pours logged`}
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
            {isAr ? 'متوسط نسبة استخدام الثلج المجروش' : 'Average Flake Ice Replacement'}
          </span>
          <div className="text-2xl font-black text-blue-600 flex items-center gap-2">
            <Snowflake className="w-6 h-6" />
            <span>61.2%</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            {isAr ? 'يضمن حرارة صب بين 27.9°م إلى 29.4°م' : 'Maintains delivery temp between 27.9°C - 29.4°C'}
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
            {isAr ? 'محطات الخلط المعتمدة' : 'Batch Plants Assigned'}
          </span>
          <div className="text-lg font-bold text-slate-900">
            Saudi Readymix & Al Kifah
          </div>
          <p className="text-[11px] text-emerald-700 font-bold mt-1">
            {isAr ? '✓ شهادات المعايرة الشهرية سارية' : '✓ Monthly Plant Calibration Verified'}
          </p>
        </div>
      </div>

      {/* Concrete Pours Schedule Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-200/80 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Truck className="w-4 h-4 text-amber-500" />
            {isAr ? 'جدول الصبات ومواصفات الضخ' : 'Scheduled Concrete Deliveries & Pump Allocations'}
          </h3>
          <span className="text-xs text-slate-500 font-medium">
            {isAr ? 'انقر على أي صبة لطباعة التذكرة الإنشائية' : 'Click row to view & print official Pour Ticket'}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-start text-xs">
            <thead className="bg-slate-100/70 text-slate-700 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-4 text-start">{isAr ? 'رقم الحجز' : 'Booking No'}</th>
                <th className="py-3 px-4 text-start">{isAr ? 'العنصر الخرساني' : 'Target Element'}</th>
                <th className="py-3 px-4 text-start">{isAr ? 'الحجم والرتبة' : 'Volume & Mix'}</th>
                <th className="py-3 px-4 text-start">{isAr ? 'محطة الخلط والمضخة' : 'Supplier & Pump'}</th>
                <th className="py-3 px-4 text-start">{isAr ? 'الوردية والموعد' : 'Pour Window'}</th>
                <th className="py-3 px-4 text-center">{isAr ? 'الثلج والحرارة' : 'Ice & Est. Temp'}</th>
                <th className="py-3 px-4 text-center">{isAr ? 'الحالة' : 'Status'}</th>
                <th className="py-3 px-4 text-end">{isAr ? 'التذكرة' : 'Ticket'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
              {pours.map((pour) => (
                <tr
                  key={pour.id}
                  onClick={() => setSelectedTicket(pour)}
                  className="hover:bg-amber-50/40 cursor-pointer transition-colors"
                >
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                    {pour.bookingNo}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900">
                      {isAr ? pour.targetElementAr : pour.targetElement}
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-black text-slate-900">{pour.volumeM3} m³</span>
                    <span className="font-mono text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 ms-2">
                      {pour.mixGrade}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-slate-800">
                      {isAr ? pour.batchPlantAr : pour.batchPlant}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {isAr ? pour.pumpTypeAr : pour.pumpType}
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-slate-900">{pour.pourDate}</div>
                    <div className="text-[11px] text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span>{pour.pourTime}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <div className="font-bold text-blue-600 flex items-center justify-center gap-1">
                      <Snowflake className="w-3 h-3" />
                      <span>{pour.icePercent}% Ice</span>
                    </div>
                    <div className="text-[10px] text-emerald-700 font-bold">
                      Est. {pour.estimatedTempC}°C
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold border ${
                        pour.status === 'Completed'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                          : 'bg-amber-50 text-amber-800 border-amber-300'
                      }`}
                    >
                      {pour.status === 'Completed' ? (
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      ) : (
                        <Clock className="w-3 h-3 text-amber-600" />
                      )}
                      <span>{isAr ? pour.statusAr : pour.status}</span>
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-end">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedTicket(pour);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[11px] transition-colors"
                    >
                      {isAr ? 'عرض' : 'View'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pour Ticket Modal Viewer */}
      {selectedTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Ticket Header */}
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-amber-400" />
                <span className="font-bold text-sm">
                  {isAr ? 'تذكرة الإذن بالصب الميداني (SBC 304)' : 'Official Concrete Pour Permit Ticket'}
                </span>
              </div>
              <button
                onClick={() => setSelectedTicket(null)}
                className="p-1 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Ticket Body */}
            <div className="p-6 space-y-4 text-xs text-slate-700">
              <div className="flex justify-between items-start border-b border-slate-200 pb-3">
                <div>
                  <span className="font-mono text-base font-black text-slate-900">
                    {selectedTicket.bookingNo}
                  </span>
                  <p className="text-[11px] text-slate-500">{currentProject.name}</p>
                </div>
                <div className="text-end">
                  <span className="font-bold text-xs text-slate-900">{selectedTicket.pourDate}</span>
                  <p className="text-[11px] text-slate-500">{selectedTicket.pourTime}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">
                    {isAr ? 'العنصر الإنشائي' : 'Structural Element'}
                  </span>
                  <span className="font-bold text-slate-900 text-xs">
                    {isAr ? selectedTicket.targetElementAr : selectedTicket.targetElement}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">
                    {isAr ? 'الكمية المطلوبة' : 'Concrete Volume'}
                  </span>
                  <span className="font-bold text-slate-900 text-xs">
                    {selectedTicket.volumeM3} m³ ({selectedTicket.mixGrade})
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">
                    {isAr ? 'محطة الخلط المعتمدة' : 'Batching Plant'}
                  </span>
                  <span className="font-bold text-slate-900 text-xs">
                    {isAr ? selectedTicket.batchPlantAr : selectedTicket.batchPlant}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">
                    {isAr ? 'المضخة الهيدروليكية' : 'Placing Equipment'}
                  </span>
                  <span className="font-bold text-slate-900 text-xs">
                    {isAr ? selectedTicket.pumpTypeAr : selectedTicket.pumpType}
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-blue-950 space-y-1">
                <span className="font-bold text-xs block">
                  {isAr ? 'ضوابط درجات الحرارة والثلج (Hot Weather Control):' : 'Hot Weather Thermal Protocol:'}
                </span>
                <p className="text-[11px]">
                  Flake Ice Replacement: <strong>{selectedTicket.icePercent}%</strong> | Estimated Batch Temp: <strong>{selectedTicket.estimatedTempC}°C</strong> (Max Permitted: 32.0°C).
                </p>
                <p className="text-[10px] text-blue-800">
                  Slump target: 120 ± 25 mm. Cubes required: 12 cubes minimum (3 for 7-day, 6 for 28-day, 3 spare).
                </p>
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
                <span>{isAr ? 'توقيع مهندس ضبط الجودة: م. وليد الشهري' : 'Signed by QA/QC Lead: Eng. Waleed Al-Shehri'}</span>
                <span className="font-bold text-emerald-700">✓ Approved to Pour</span>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-2">
              <button
                onClick={() => window.print()}
                className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>{isAr ? 'طباعة التذكرة' : 'Print Permit'}</span>
              </button>
              <button
                onClick={() => setSelectedTicket(null)}
                className="px-3.5 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs transition-colors"
              >
                {isAr ? 'إغلاق' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

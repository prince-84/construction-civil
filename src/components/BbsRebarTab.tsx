'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import {
  Ruler,
  TrendingDown,
  CheckCircle2,
  AlertCircle,
  Calculator,
  Download,
  Building2,
  HelpCircle,
  Sparkles,
} from 'lucide-react';

export default function BbsRebarTab() {
  const { language, bbsData, currentProject } = useApp();
  const isAr = language === 'ar';

  // Totals
  const totalDelivered = bbsData.reduce((acc, b) => acc + b.totalDeliveredTons, 0);
  const totalFabricated = bbsData.reduce((acc, b) => acc + b.fabricatedTons, 0);
  const totalScrap = bbsData.reduce((acc, b) => acc + b.scrapTons, 0);
  const overallWastage = Number(((totalScrap / totalDelivered) * 100).toFixed(2));

  // Interactive Rebar Calculator State
  const [calcDiameter, setCalcDiameter] = useState<number>(16);
  const [calcBarCount, setCalcBarCount] = useState<number>(50);
  const [calcLengthM, setCalcLengthM] = useState<number>(12);
  const [includeLapSplice, setIncludeLapSplice] = useState<boolean>(true);

  // Unit weights standard: (D^2 / 162.2) kg/m
  const unitWeightKgM = Number(((calcDiameter * calcDiameter) / 162.2).toFixed(3));
  // 50D lap length if enabled
  const lapLengthM = includeLapSplice ? (50 * calcDiameter) / 1000 : 0;
  const effectiveLengthPerBar = calcLengthM + lapLengthM;
  const totalWeightKg = Number((calcBarCount * effectiveLengthPerBar * unitWeightKgM).toFixed(1));
  const totalWeightTons = Number((totalWeightKg / 1000).toFixed(3));

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300">
                SBC 304 Rebar Detailing
              </span>
              <span className="text-xs font-semibold text-slate-500">
                {isAr ? currentProject.nameAr : currentProject.name}
              </span>
            </div>
            <h1 className="text-xl font-black text-slate-900">
              {isAr ? 'جدول حصر وتفريد حديد التسليح (BBS & Rebar Wastage)' : 'Bar Bending Schedule (BBS) & Rebar Wastage Log'}
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              {isAr
                ? 'تتبع الأقطار الإنشائية (Φ8 إلى Φ32 مم)، الهوالك ونسب التقطيع طبقاً للمعيار السعودي (≤ 3.5%)'
                : 'Monitor diameter allocations (Φ8 to Φ32mm), cutting & bending fabrication, and scrap tolerance (≤ 3.5%)'}
            </p>
          </div>

          <div className="flex items-center gap-2 bg-emerald-50 px-3.5 py-2 rounded-xl border border-emerald-300">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <div>
              <span className="text-[10px] font-bold uppercase text-emerald-800 block">
                {isAr ? 'معدل الهالك الإجمالي للموقع' : 'Overall Site Wastage'}
              </span>
              <span className="text-base font-black text-emerald-900">
                {overallWastage}% (Target ≤ 3.5%)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
            {isAr ? 'إجمالي الحديد المورد للموقع' : 'Total Rebar Delivered'}
          </span>
          <div className="text-2xl font-black text-slate-900">{totalDelivered.toLocaleString()} Tons</div>
          <p className="text-[11px] text-slate-500 mt-1">
            {isAr ? 'حديد سابك والراجحي Grade 60' : 'SABIC & Rajhi Steel (Grade 60)'}
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
            {isAr ? 'إجمالي الحديد المشغول والمفرد' : 'Total Rebar Fabricated'}
          </span>
          <div className="text-2xl font-black text-slate-900">{totalFabricated.toLocaleString()} Tons</div>
          <p className="text-[11px] text-slate-500 mt-1">
            {isAr ? 'جاهز أو مركب بالقواعد والأسقف' : 'Assembled into foundation & slab cages'}
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
            {isAr ? 'إجمالي السكراب والهالك الفعلي' : 'Total Cut-off Scrap'}
          </span>
          <div className="text-2xl font-black text-amber-600">{totalScrap.toFixed(1)} Tons</div>
          <p className="text-[11px] text-slate-500 mt-1">
            {isAr ? 'المخزن بساحة السكراب للتدوير' : 'Logged in steel scrap yard for recycling'}
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
            {isAr ? 'الامتثال لهالك الكود السعودي' : 'SBC Scrap Tolerance'}
          </span>
          <div className="text-2xl font-black text-emerald-600 flex items-center gap-1.5">
            <CheckCircle2 className="w-6 h-6" />
            <span>Compliant</span>
          </div>
          <p className="text-[11px] text-emerald-800 font-bold mt-1">
            {isAr ? 'أقل من الحد الأقصى 3.5%' : '0.82% Buffer below 3.5% limit'}
          </p>
        </div>
      </div>

      {/* Rebar Diameter Allocations Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-200/80 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Ruler className="w-4 h-4 text-amber-500" />
            {isAr
              ? 'توزيع الأقطار الإنشائية وسجل الهالك (Rebar Allocations by Diameter)'
              : 'Rebar Diameter Allocations & Cutting Efficiency Ledger'}
          </h3>
          <span className="text-xs font-bold text-slate-600">
            SASO ISO 6935-2 / ASTM A615M
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-start text-xs">
            <thead className="bg-slate-100/70 text-slate-700 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-4 text-start">{isAr ? 'قطر السيخ' : 'Bar Diameter'}</th>
                <th className="py-3 px-4 text-start">{isAr ? 'الوزن النظري (كجم/م)' : 'Nominal Wt (kg/m)'}</th>
                <th className="py-3 px-4 text-start">{isAr ? 'المورد للموقع (طن)' : 'Delivered (Tons)'}</th>
                <th className="py-3 px-4 text-start">{isAr ? 'المشغول (طن)' : 'Fabricated (Tons)'}</th>
                <th className="py-3 px-4 text-start">{isAr ? 'السكراب (طن)' : 'Scrap (Tons)'}</th>
                <th className="py-3 px-4 text-center">{isAr ? 'نسبة الهالك (%)' : 'Wastage %'}</th>
                <th className="py-3 px-4 text-end">{isAr ? 'حالة المطابقة' : 'SBC Status'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
              {bbsData.map((row) => (
                <tr key={row.barDiameter} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-black text-slate-900 text-sm">
                    {row.barDiameter}
                    <span className="text-[10px] text-slate-400 ms-1 font-normal">
                      ({row.nominalMm} mm)
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-700">
                    {row.unitWeightKgM} kg/m
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-900">
                    {row.totalDeliveredTons} T
                  </td>
                  <td className="py-3.5 px-4 text-slate-800">
                    {row.fabricatedTons} T
                  </td>
                  <td className="py-3.5 px-4 font-bold text-amber-700">
                    {row.scrapTons} T
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span
                      className={`font-bold px-2 py-0.5 rounded ${
                        row.wastagePercent <= 3.5
                          ? 'bg-emerald-50 text-emerald-800'
                          : 'bg-rose-50 text-rose-800'
                      }`}
                    >
                      {row.wastagePercent}%
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-end">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>{isAr ? row.statusAr : row.status}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Interactive Rebar Cut & Bend Calculator Tool */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Calculator className="w-4 h-4 text-amber-500" />
              {isAr ? 'حاسبة أطوال وأوزان حديد التسليح والوصلات (SBC 304 Calculator)' : 'On-Site Rebar Tonnage & Lap Splice Calculator'}
            </h3>
            <p className="text-xs text-slate-500">
              {isAr
                ? 'حساب الوزن الإجمالي والوصلات المعتمدة (50Φ) فورياً للموقع'
                : 'Instant calculation of bar weights, tension lap lengths (50Φ), and fabrication schedules'}
            </p>
          </div>
          <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
            D²/162.2 Formula
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200 mb-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">
              {isAr ? 'قطر السيخ (Φ بالمليمتر):' : 'Bar Diameter (Φ mm):'}
            </label>
            <select
              value={calcDiameter}
              onChange={(e) => setCalcDiameter(Number(e.target.value))}
              className="w-full p-2 bg-white rounded-lg border border-slate-300 text-xs font-bold focus:ring-2 focus:ring-amber-500 text-slate-900"
            >
              {[8, 10, 12, 14, 16, 18, 20, 25, 32].map((d) => (
                <option key={d} value={d}>
                  Φ {d} mm
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">
              {isAr ? 'عدد الأسياخ:' : 'Number of Bars:'}
            </label>
            <input
              type="number"
              min="1"
              value={calcBarCount}
              onChange={(e) => setCalcBarCount(Math.max(1, Number(e.target.value)))}
              className="w-full p-2 bg-white rounded-lg border border-slate-300 text-xs font-bold focus:ring-2 focus:ring-amber-500 text-slate-900"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">
              {isAr ? 'طول السيخ الصافي (متر):' : 'Cut Length (Meters):'}
            </label>
            <input
              type="number"
              step="0.1"
              min="0.5"
              value={calcLengthM}
              onChange={(e) => setCalcLengthM(Math.max(0.5, Number(e.target.value)))}
              className="w-full p-2 bg-white rounded-lg border border-slate-300 text-xs font-bold focus:ring-2 focus:ring-amber-500 text-slate-900"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">
              {isAr ? 'وصلة التراكب (50Φ Lap):' : 'Tension Lap Splice (50Φ):'}
            </label>
            <button
              type="button"
              onClick={() => setIncludeLapSplice(!includeLapSplice)}
              className={`w-full p-2 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                includeLapSplice
                  ? 'bg-amber-500 text-slate-950 border-amber-600'
                  : 'bg-white text-slate-600 border-slate-300'
              }`}
            >
              {includeLapSplice
                ? isAr
                  ? `مفعل (+${lapLengthM.toFixed(2)}م)`
                  : `Included (+${lapLengthM.toFixed(2)}m)`
                : isAr
                ? 'غير مفعل'
                : 'No Lap Splice'}
            </button>
          </div>
        </div>

        {/* Output metrics display */}
        <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-300 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-amber-600" />
            <div>
              <span className="text-[10px] font-bold text-amber-900 uppercase block">
                {isAr ? 'الوزن الإجمالي المطلوب' : 'Calculated Steel Tonnage'}
              </span>
              <span className="text-xl font-black text-slate-950">
                {totalWeightKg.toLocaleString()} kg ({totalWeightTons} Tons)
              </span>
            </div>
          </div>

          <div className="text-xs text-amber-950 space-y-0.5 text-end">
            <div>
              {isAr ? 'الوزن المتري:' : 'Unit Weight:'} <strong>{unitWeightKgM} kg/m</strong>
            </div>
            <div>
              {isAr ? 'إجمالي الأطوال:' : 'Total Length:'}{' '}
              <strong>{(calcBarCount * effectiveLengthPerBar).toFixed(1)} meters</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

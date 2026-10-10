'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { RfiStatus } from '@/types';
import {
  ClipboardCheck,
  Search,
  Filter,
  PlusCircle,
  FileText,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Clock,
  ShieldCheck,
  Download,
  Building2,
  Calendar,
  Layers,
  FlaskConical,
  Award,
} from 'lucide-react';

export default function QaqcEngineTab() {
  const {
    language,
    rfis,
    mirs,
    labTests,
    setSelectedRfi,
    setRfiModalOpen,
    currentProject,
  } = useApp();

  const isAr = language === 'ar';

  const [activeSubTab, setActiveSubTab] = useState<'rfi' | 'mir' | 'lab'>('rfi');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | RfiStatus>('All');

  // Filtered RFIs
  const filteredRfis = rfis.filter((rfi) => {
    const matchesSearch =
      rfi.rfiNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rfi.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rfi.titleAr.includes(searchTerm) ||
      rfi.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'All' ? true : rfi.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* QA/QC Engine Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                KSA QA/QC Engine
              </span>
              <span className="text-xs font-semibold text-slate-500">
                {isAr ? currentProject.nameAr : currentProject.name}
              </span>
            </div>
            <h1 className="text-xl font-black text-slate-900">
              {isAr ? 'محرك ضبط وتوكيد الجودة والتفتيش الهندسي' : 'KSA QA/QC & Inspection Engine'}
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              {isAr
                ? 'إدارة طلبات الفحص الموقعي (WIR/RFI)، اعتمادات المواد (MIR)، وسجل كسر مكعبات الخرسانة (SBC/ASTM)'
                : 'Manage Work Inspection Requests (WIR/RFI), Material Approvals (MIR), and ASTM Cube Strength Logs'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setRfiModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-xs transition-all cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{isAr ? 'تقديم طلب فحص (RFI جديد)' : 'Submit New RFI'}</span>
            </button>
          </div>
        </div>

        {/* Sub-tab navigation */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
          <button
            onClick={() => setActiveSubTab('rfi')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeSubTab === 'rfi'
                ? 'bg-amber-500 text-slate-950 shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <ClipboardCheck className="w-4 h-4" />
            <span>
              {isAr ? '1. طلبات فحص الأعمال (WIR / RFI)' : '1. Work Inspection Requests (WIR / RFI)'}
            </span>
            <span className="text-[10px] font-extrabold px-1.5 py-0.2 rounded-full bg-white/70">
              {rfis.length}
            </span>
          </button>

          <button
            onClick={() => setActiveSubTab('mir')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeSubTab === 'mir'
                ? 'bg-amber-500 text-slate-950 shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>
              {isAr ? '2. اعتمادات وتوريد المواد (MIR)' : '2. Material Inspection Requests (MIR)'}
            </span>
            <span className="text-[10px] font-extrabold px-1.5 py-0.2 rounded-full bg-white/70">
              {mirs.length}
            </span>
          </button>

          <button
            onClick={() => setActiveSubTab('lab')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeSubTab === 'lab'
                ? 'bg-amber-500 text-slate-950 shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <FlaskConical className="w-4 h-4" />
            <span>
              {isAr ? '3. سجل اختبار مكعبات الخرسانة (Lab Cubes)' : '3. Concrete Lab Cube Tests (ASTM)'}
            </span>
            <span className="text-[10px] font-extrabold px-1.5 py-0.2 rounded-full bg-white/70">
              {labTests.length}
            </span>
          </button>
        </div>
      </div>

      {/* SUB-TAB 1: WIR / RFI Table */}
      {activeSubTab === 'rfi' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
          {/* Controls Bar: Search & Status Filters */}
          <div className="p-4 bg-slate-50 border-b border-slate-200/80 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute start-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={
                  isAr
                    ? 'بحث برقم الـ RFI، النشاط، أو الموقع...'
                    : 'Search RFI no, structural element, or location...'
                }
                className="w-full ps-9 pe-4 py-2 bg-white rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-800"
              />
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
              <span className="text-[11px] font-bold text-slate-400 me-1 uppercase tracking-wider shrink-0">
                {isAr ? 'الحالة:' : 'Status:'}
              </span>
              {(['All', 'Code A', 'Code B', 'Code C', 'Pending'] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer ${
                    statusFilter === status
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {status === 'All'
                    ? isAr ? 'الكل' : 'All'
                    : status === 'Code A'
                    ? isAr ? 'كود A (معتمد)' : 'Code A (Approved)'
                    : status === 'Code B'
                    ? isAr ? 'كود B (ملاحظات)' : 'Code B (Notes)'
                    : status === 'Code C'
                    ? isAr ? 'كود C (مرفوض)' : 'Code C (Reject)'
                    : isAr ? 'قيد التوقيع' : 'Pending Sign-off'}
                </button>
              ))}
            </div>
          </div>

          {/* RFI Data Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-start text-xs">
              <thead className="bg-slate-100/70 text-slate-700 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4 text-start">{isAr ? 'رقم الـ RFI' : 'RFI Sequence'}</th>
                  <th className="py-3 px-4 text-start">{isAr ? 'النشاط والعنصر الإنشائي' : 'Activity & Element'}</th>
                  <th className="py-3 px-4 text-start">{isAr ? 'الموقع بالمشروع' : 'Zone / Location'}</th>
                  <th className="py-3 px-4 text-start">{isAr ? 'الاستشاري والفاحص' : 'Consultant / Inspector'}</th>
                  <th className="py-3 px-4 text-start">{isAr ? 'حالة الاعتماد' : 'Status Code'}</th>
                  <th className="py-3 px-4 text-start">{isAr ? 'تاريخ التقديم' : 'Date'}</th>
                  <th className="py-3 px-4 text-end">{isAr ? 'الإجراء' : 'Action'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                {filteredRfis.map((rfi) => (
                  <tr
                    key={rfi.id}
                    onClick={() => setSelectedRfi(rfi)}
                    className="hover:bg-amber-50/40 cursor-pointer transition-colors"
                  >
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                      {rfi.rfiNo}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900 leading-snug">
                        {isAr ? rfi.titleAr : rfi.title}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        {isAr ? rfi.activityTypeAr : rfi.activityType}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-slate-800">
                        {isAr ? rfi.locationAr : rfi.location}
                      </span>
                      <span className="text-[11px] text-slate-400 block">{rfi.zone}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-900">
                        {isAr ? rfi.inspectorNameAr : rfi.inspectorName}
                      </div>
                      <div className="text-[10px] text-slate-500">
                        {isAr ? rfi.consultantAr : rfi.consultant}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold border ${
                          rfi.status === 'Code A'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                            : rfi.status === 'Code B'
                            ? 'bg-amber-50 text-amber-900 border-amber-300'
                            : rfi.status === 'Code C'
                            ? 'bg-rose-50 text-rose-800 border-rose-300'
                            : 'bg-sky-50 text-sky-800 border-sky-300'
                        }`}
                      >
                        {rfi.status === 'Code A' && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
                        {rfi.status === 'Code B' && <AlertCircle className="w-3 h-3 text-amber-600" />}
                        {rfi.status === 'Code C' && <XCircle className="w-3 h-3 text-rose-600" />}
                        {rfi.status === 'Pending' && <Clock className="w-3 h-3 text-sky-600" />}
                        <span>{rfi.status}</span>
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-[11px] text-slate-500">
                      <div>{rfi.dateGregorian}</div>
                      <div className="text-[10px] text-slate-400">{rfi.dateHijri}</div>
                    </td>
                    <td className="py-3.5 px-4 text-end">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedRfi(rfi);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-amber-100 text-slate-700 hover:text-amber-900 font-bold text-[11px] transition-colors"
                      >
                        {isAr ? 'معاينة المحضر' : 'View File'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>
              {isAr
                ? `إجمالي المعروض: ${filteredRfis.length} طلبات فحص`
                : `Showing ${filteredRfis.length} inspection tickets`}
            </span>
            <span className="font-semibold text-slate-700">
              {isAr ? 'معتمد وفقاً للائحة كود البناء السعودي' : 'SBC Verification Ledger'}
            </span>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: MIR Table (Material Inspection Requests) */}
      {activeSubTab === 'mir' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="p-4 bg-slate-50 border-b border-slate-200/80 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                {isAr ? 'سجل شهادات اختبار المصنع واعتمادات المواد (MTC / MIR)' : 'Material Inspection Requests & Mill Test Certificates (MTC)'}
              </h3>
              <p className="text-xs text-slate-500">
                {isAr
                  ? 'شهادات حديد سابك والراجحي، خلاطات الخرسانة، وعوازل بيتومات'
                  : 'SABIC / Rajhi steel MTC certificates, Ready-mix batch designs, Bitumat membranes'}
              </p>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800">
              100% SASO / ASTM Verified
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-start text-xs">
              <thead className="bg-slate-100/70 text-slate-700 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4 text-start">{isAr ? 'رقم الـ MIR' : 'MIR No'}</th>
                  <th className="py-3 px-4 text-start">{isAr ? 'المادة الموردة' : 'Material Description'}</th>
                  <th className="py-3 px-4 text-start">{isAr ? 'المورد / المصنع' : 'Manufacturer / Supplier'}</th>
                  <th className="py-3 px-4 text-start">{isAr ? 'رقم شهادة الاختبار MTC' : 'MTC Certificate'}</th>
                  <th className="py-3 px-4 text-start">{isAr ? 'المعيار والمواصفة' : 'Standard'}</th>
                  <th className="py-3 px-4 text-start">{isAr ? 'الحالة' : 'Approval Status'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                {mirs.map((mir) => (
                  <tr key={mir.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                      {mir.mirNo}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900">
                        {isAr ? mir.materialAr : mir.material}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                        {isAr ? mir.testSummaryAr : mir.testSummary}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-800">
                      {isAr ? mir.supplierAr : mir.supplier}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[11px] text-amber-700 font-bold">
                      {mir.mtcNumber}
                    </td>
                    <td className="py-3.5 px-4 text-[11px] text-slate-600">
                      {mir.standard}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold border ${
                          mir.status === 'Approved'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                            : 'bg-amber-50 text-amber-800 border-amber-300'
                        }`}
                      >
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>{isAr ? mir.statusAr : mir.status}</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUB-TAB 3: Concrete Lab Test Log (ASTM Cube Tests) */}
      {activeSubTab === 'lab' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="p-4 bg-slate-50 border-b border-slate-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <FlaskConical className="w-4 h-4 text-amber-500" />
                {isAr
                  ? 'سجل اختبارات معمل الخرسانة (هبوط السلمب، الحرارة، وكسر المكعبات)'
                  : 'Concrete Lab Log (Slump, Fresh Temp & 7d/28d Cube Strength)'}
              </h3>
              <p className="text-xs text-slate-500">
                {isAr
                  ? 'محددات الكود السعودي: هبوط السلمب 120±25 مم | الحرارة ≤ 32°م | اختبار 7 أيام (70%) و 28 يوماً (100%)'
                  : 'SBC Standards: Slump 120±25mm | Fresh Temp ≤ 32°C | 7-day (70% benchmark) & 28-day (100% design strength)'}
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded border border-emerald-200">
                Temp Target: ≤ 32°C
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-start text-xs">
              <thead className="bg-slate-100/70 text-slate-700 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4 text-start">{isAr ? 'تذكرة الصب' : 'QC Ticket'}</th>
                  <th className="py-3 px-4 text-start">{isAr ? 'العنصر ورتبة الخرسانة' : 'Structural Element & Grade'}</th>
                  <th className="py-3 px-4 text-start">{isAr ? 'محطة الخلط' : 'Batch Plant'}</th>
                  <th className="py-3 px-4 text-center">{isAr ? 'السلمب (مم)' : 'Slump (mm)'}</th>
                  <th className="py-3 px-4 text-center">{isAr ? 'حرارة الخرسانة' : 'Mix Temp (°C)'}</th>
                  <th className="py-3 px-4 text-center">{isAr ? 'كسر 7 أيام (MPa)' : '7-Day Break (MPa)'}</th>
                  <th className="py-3 px-4 text-center">{isAr ? 'كسر 28 يوماً (MPa)' : '28-Day Break (MPa)'}</th>
                  <th className="py-3 px-4 text-end">{isAr ? 'النتيجة الإجمالية' : 'Compliance'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                {labTests.map((test) => (
                  <tr key={test.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                      {test.ticketNo}
                      <span className="text-[10px] text-slate-400 block">{test.pourDate}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900">
                        {isAr ? test.elementAr : test.element}
                      </div>
                      <span className="font-mono text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 mt-0.5 inline-block">
                        Mix Grade: {test.mixDesign}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 font-medium">
                      {test.batchPlant}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className="font-bold text-slate-900">{test.slumpMm} mm</span>
                      <span className="text-[10px] text-emerald-700 font-bold block">✓ Pass</span>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span
                        className={`font-bold px-2 py-0.5 rounded ${
                          test.tempC <= 32
                            ? 'bg-emerald-50 text-emerald-800'
                            : 'bg-rose-50 text-rose-800'
                        }`}
                      >
                        {test.tempC}°C
                      </span>
                      <span className="text-[10px] text-slate-500 block">≤ 32°C SBC Limit</span>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <div className="font-bold text-slate-900">{test.strength7dMpa} MPa</div>
                      <div className="text-[10px] text-slate-500">
                        Target: {test.target7dMpa} MPa (70%)
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      {test.strength28dMpa > 0 ? (
                        <>
                          <div className="font-bold text-emerald-700">{test.strength28dMpa} MPa</div>
                          <div className="text-[10px] text-slate-500">
                            Target: {test.target28dMpa} MPa (100%)
                          </div>
                        </>
                      ) : (
                        <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                          {isAr ? 'في غرفة الإنضاج (قيد الانتظار)' : 'In Curing Tank'}
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-end">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold border ${
                          test.finalStatus === 'Pass'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                            : test.finalStatus === 'Pending 28d'
                            ? 'bg-amber-50 text-amber-900 border-amber-300'
                            : 'bg-rose-50 text-rose-800 border-rose-300'
                        }`}
                      >
                        {test.finalStatus === 'Pass' ? (
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        ) : (
                          <Clock className="w-3 h-3 text-amber-600" />
                        )}
                        <span>{isAr ? test.finalStatusAr : test.finalStatus}</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

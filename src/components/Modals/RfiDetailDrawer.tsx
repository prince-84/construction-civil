'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { RfiStatus } from '@/types';
import {
  X,
  FileCheck2,
  Calendar,
  Building2,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Clock,
  Printer,
  ShieldCheck,
  UserCheck,
} from 'lucide-react';

export default function RfiDetailDrawer() {
  const { selectedRfi, setSelectedRfi, updateRfiStatus, language, currentProject } = useApp();
  const isAr = language === 'ar';

  const [consultantNotes, setConsultantNotes] = useState('');

  if (!selectedRfi) return null;

  const handleStatusChange = (newStatus: RfiStatus) => {
    updateRfiStatus(selectedRfi.id, newStatus, consultantNotes || selectedRfi.consultantNotes);
    setSelectedRfi({
      ...selectedRfi,
      status: newStatus,
      consultantNotes: consultantNotes || selectedRfi.consultantNotes,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 my-8">
        {/* Drawer Header */}
        <div className="p-5 bg-gradient-to-r from-slate-900 to-slate-800 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-base font-black text-amber-400">
                  {selectedRfi.rfiNo}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/10 text-white border border-white/20">
                  {selectedRfi.specCode}
                </span>
              </div>
              <p className="text-xs text-slate-300">
                {isAr ? 'محضر استلام الأعمال الإنشائية المعتمد' : 'Official Work Inspection Request (WIR)'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setSelectedRfi(null)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5 text-xs text-slate-700">
          {/* Status Banner */}
          <div
            className={`p-4 rounded-xl border flex items-center justify-between ${
              selectedRfi.status === 'Code A'
                ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                : selectedRfi.status === 'Code B'
                ? 'bg-amber-50 border-amber-300 text-amber-950'
                : selectedRfi.status === 'Code C'
                ? 'bg-rose-50 border-rose-300 text-rose-950'
                : 'bg-sky-50 border-sky-300 text-sky-950'
            }`}
          >
            <div className="flex items-center gap-2.5">
              {selectedRfi.status === 'Code A' && <CheckCircle2 className="w-6 h-6 text-emerald-600" />}
              {selectedRfi.status === 'Code B' && <AlertTriangle className="w-6 h-6 text-amber-600" />}
              {selectedRfi.status === 'Code C' && <XCircle className="w-6 h-6 text-rose-600" />}
              {selectedRfi.status === 'Pending' && <Clock className="w-6 h-6 text-sky-600" />}
              <div>
                <span className="font-black text-sm block">
                  {selectedRfi.status === 'Code A'
                    ? isAr ? 'كود A: معتمد بالكامل ويصرح ببدء المرحلة التالية' : 'Code A: Fully Approved to Proceed'
                    : selectedRfi.status === 'Code B'
                    ? isAr ? 'كود B: معتمد بملاحظات يجب استيفاؤها موقعياً' : 'Code B: Approved with Field Comments'
                    : selectedRfi.status === 'Code C'
                    ? isAr ? 'كود C: مرفوض - يلزم تصحيح الأعمال وإعادة التقديم' : 'Code C: Rejected - Resubmission Mandatory'
                    : isAr ? 'قيد التوقيع والفحص الميداني' : 'Pending Consultant Inspection & Signature'}
                </span>
                <span className="text-[11px] opacity-80">
                  {isAr ? 'قرار الاستشاري الهندسي المشرف' : 'Supervising Consultant Official Determination'}
                </span>
              </div>
            </div>
            <span className="font-mono text-xs font-black px-2.5 py-1 rounded-lg bg-white border shadow-xs">
              {selectedRfi.status}
            </span>
          </div>

          {/* Activity & Location Details */}
          <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block mb-0.5">
                {isAr ? 'عنوان النشاط والمرحلة:' : 'Inspection Activity:'}
              </span>
              <p className="font-bold text-slate-900 text-xs">
                {isAr ? selectedRfi.titleAr : selectedRfi.title}
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                {isAr ? selectedRfi.activityTypeAr : selectedRfi.activityType}
              </p>
            </div>

            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block mb-0.5">
                {isAr ? 'الموقع الدقيق والمحاور:' : 'Location & Zone:'}
              </span>
              <p className="font-bold text-slate-900 text-xs">
                {isAr ? selectedRfi.locationAr : selectedRfi.location}
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5">{selectedRfi.zone}</p>
            </div>

            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block mb-0.5">
                {isAr ? 'الاستشاري والفاحص المعتمد:' : 'Consultant & Inspector:'}
              </span>
              <p className="font-bold text-slate-900 text-xs">
                {isAr ? selectedRfi.inspectorNameAr : selectedRfi.inspectorName}
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                {isAr ? selectedRfi.consultantAr : selectedRfi.consultant}
              </p>
            </div>

            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block mb-0.5">
                {isAr ? 'تاريخ التقديم المزدوج:' : 'Dual Filing Dates:'}
              </span>
              <p className="font-bold text-slate-900 text-xs">{selectedRfi.dateGregorian}</p>
              <p className="text-[11px] text-slate-500 mt-0.5">{selectedRfi.dateHijri}</p>
            </div>
          </div>

          {/* Submission Notes */}
          <div>
            <span className="font-bold text-slate-800 block mb-1">
              {isAr ? 'ملاحظات المقاول الفنية والمطابقة:' : 'Contractor Compliance Statement:'}
            </span>
            <div className="p-3 bg-white border border-slate-200 rounded-xl text-slate-700 leading-relaxed text-xs">
              {isAr ? selectedRfi.submissionNotesAr : selectedRfi.submissionNotes}
            </div>
          </div>

          {/* Consultant Notes & Live Action Buttons */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
            <span className="font-bold text-slate-900 block">
              {isAr ? 'إجراءات وملاحظات الاستشاري الفورية:' : 'Consultant Evaluation & Decision Controls:'}
            </span>

            {selectedRfi.consultantNotes && (
              <div className="p-3 rounded-lg bg-white border border-slate-200 font-semibold text-slate-800">
                {isAr ? selectedRfi.consultantNotesAr || selectedRfi.consultantNotes : selectedRfi.consultantNotes}
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-[11px] text-slate-500 font-medium block">
                {isAr ? 'إضافة / تحديث ملاحظات الفحص الهندسي:' : 'Update Consultant Observations:'}
              </label>
              <input
                type="text"
                placeholder={isAr ? 'اكتب ملاحظات الفحص الموقعي...' : 'Enter inspection notes...'}
                value={consultantNotes}
                onChange={(e) => setConsultantNotes(e.target.value)}
                className="w-full p-2 bg-white rounded-lg border border-slate-300 text-xs text-slate-800 focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-[11px] font-bold text-slate-500 me-2">
                {isAr ? 'تحديث الاعتماد:' : 'Set Status:'}
              </span>
              <button
                type="button"
                onClick={() => handleStatusChange('Code A')}
                className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1 shadow-xs transition-colors cursor-pointer"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Code A (Approve)</span>
              </button>
              <button
                type="button"
                onClick={() => handleStatusChange('Code B')}
                className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs flex items-center gap-1 shadow-xs transition-colors cursor-pointer"
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Code B (Notes)</span>
              </button>
              <button
                type="button"
                onClick={() => handleStatusChange('Code C')}
                className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center gap-1 shadow-xs transition-colors cursor-pointer"
              >
                <XCircle className="w-3.5 h-3.5" />
                <span>Code C (Reject)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-between items-center">
          <button
            onClick={() => window.print()}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>{isAr ? 'طباعة محضر الاستلام' : 'Print WIR Report'}</span>
          </button>
          <button
            onClick={() => setSelectedRfi(null)}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors cursor-pointer"
          >
            {isAr ? 'تم وإغلاق' : 'Done'}
          </button>
        </div>
      </div>
    </div>
  );
}

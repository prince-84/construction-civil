'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { PlusCircle, X, ClipboardCheck, Sparkles } from 'lucide-react';

export default function NewRfiModal() {
  const { isRfiModalOpen, setRfiModalOpen, addRfi, language, currentProject } = useApp();
  const isAr = language === 'ar';

  const [title, setTitle] = useState('Ground Floor Transfer Girder TG-02 Steel Check');
  const [titleAr, setTitleAr] = useState('فحص حديد تسليح كمرة التحويل TG-02 بالدور الأرضي');
  const [activityType, setActivityType] = useState('Steel Reinforcement Before Pouring');
  const [activityTypeAr, setActivityTypeAr] = useState('استلام حديد التسليح قبل الصب');
  const [location, setLocation] = useState('Ground Floor - Core Grid B2 to B8');
  const [locationAr, setLocationAr] = useState('الدور الأرضي - محاور النواة B2 إلى B8');
  const [zone, setZone] = useState('Zone B - Central Core');
  const [inspectorName, setInspectorName] = useState('Eng. Fahad Al-Otaibi');
  const [inspectorNameAr, setInspectorNameAr] = useState('م. فهد العتيبي');
  const [submissionNotes, setSubmissionNotes] = useState(
    'Top and bottom reinforcement bundles fixed per drawing CIV-TG-02. Tension laps 50D inspected with cover blocks 50mm.'
  );
  const [submissionNotesAr, setSubmissionNotesAr] = useState(
    'تم إنهاء حديد التسليح العلوي والسفلي طبقاً للمخطط، وتم ضبط وصلات التراكب 50Φ والبسكوت الخرساني 50مم.'
  );
  const [specCode, setSpecCode] = useState('SBC 304 Sec 7.2');

  if (!isRfiModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    addRfi({
      title,
      titleAr,
      activityType,
      activityTypeAr,
      location,
      locationAr,
      zone,
      consultant: currentProject.consultant,
      consultantAr: currentProject.consultantAr,
      inspectorName,
      inspectorNameAr,
      status: 'Pending',
      submissionNotes,
      submissionNotesAr,
      specCode,
    });

    setRfiModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 my-8">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-slate-900 to-slate-800 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
              <ClipboardCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm">
                {isAr ? 'تقديم طلب فحص واستلام هندسي (WIR / RFI)' : 'Submit Work Inspection Request (WIR / RFI)'}
              </h3>
              <p className="text-[11px] text-slate-300">
                {isAr ? 'توجيه الطلب لاستشاري الإشراف طبقاً لمعايير الكود' : 'Direct request to Supervising Consultant'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setRfiModalOpen(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          {/* Title */}
          <div>
            <label className="font-bold text-slate-700 block mb-1">
              {isAr ? 'عنوان الطلب والعنصر الإنشائي:' : 'Inspection Activity Title:'}
            </label>
            <input
              type="text"
              required
              value={isAr ? titleAr : title}
              onChange={(e) => {
                setTitle(e.target.value);
                setTitleAr(e.target.value);
              }}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-amber-500 text-slate-900"
            />
          </div>

          {/* Activity Type & Spec Code */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 block mb-1">
                {isAr ? 'نوع نشاط التفتيش:' : 'Activity Type:'}
              </label>
              <select
                value={activityType}
                onChange={(e) => setActivityType(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-amber-500 text-slate-900"
              >
                <option value="Steel Reinforcement Before Pouring">Steel Reinforcement Before Pouring</option>
                <option value="Shuttering Line & Plumb Inspection">Shuttering Line & Plumb Inspection</option>
                <option value="Post-Pour De-shuttering Inspection">Post-Pour De-shuttering Inspection</option>
                <option value="Blockwork Alignment & Plumb">Blockwork Alignment & Plumb</option>
                <option value="Waterproofing Membrane & Ponding">Waterproofing Membrane & Ponding</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">
                {isAr ? 'مرجع الكود السعودي:' : 'SBC / Code Reference:'}
              </label>
              <input
                type="text"
                value={specCode}
                onChange={(e) => setSpecCode(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-amber-500 text-slate-900"
              />
            </div>
          </div>

          {/* Location & Zone */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 block mb-1">
                {isAr ? 'الموقع الدقيق والمحاور:' : 'Specific Location & Grids:'}
              </label>
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-amber-500 text-slate-900"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">
                {isAr ? 'القطاع الإنشائي:' : 'Civil Zone:'}
              </label>
              <input
                type="text"
                value={zone}
                onChange={(e) => setZone(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-amber-500 text-slate-900"
              />
            </div>
          </div>

          {/* Inspector Name */}
          <div>
            <label className="font-bold text-slate-700 block mb-1">
              {isAr ? 'مهندس الاستشاري المشرف:' : 'Supervising Consultant Inspector:'}
            </label>
            <input
              type="text"
              value={inspectorName}
              onChange={(e) => setInspectorName(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-amber-500 text-slate-900"
            />
          </div>

          {/* Submission Notes */}
          <div>
            <label className="font-bold text-slate-700 block mb-1">
              {isAr ? 'الملاحظات الفنية للمقاول والمرفقات:' : 'Contractor Submission Notes & Attachments:'}
            </label>
            <textarea
              rows={3}
              value={submissionNotes}
              onChange={(e) => setSubmissionNotes(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-amber-500 text-slate-900"
            />
          </div>

          {/* Form Actions */}
          <div className="pt-2 flex justify-end gap-2.5">
            <button
              type="button"
              onClick={() => setRfiModalOpen(false)}
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-colors cursor-pointer"
            >
              {isAr ? 'إلغاء' : 'Cancel'}
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold shadow-xs transition-colors cursor-pointer"
            >
              {isAr ? 'إرسال طلب الاستلام' : 'Submit WIR / RFI'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { MixGrade, ConcretePourBooking } from '@/types';
import {
  Truck,
  X,
  Thermometer,
  Snowflake,
  ShieldCheck,
  Calendar,
  Clock,
  Sparkles,
} from 'lucide-react';

export default function PourBookingModal() {
  const { isPourModalOpen, setPourModalOpen, addPourBooking, language, weather } = useApp();
  const isAr = language === 'ar';

  const [targetElement, setTargetElement] = useState('Level 3 Suspended Slab Zone C');
  const [targetElementAr, setTargetElementAr] = useState('سقف الدور الثالث - منطقة ج');
  const [volumeM3, setVolumeM3] = useState(320);
  const [mixGrade, setMixGrade] = useState<MixGrade>('C35');
  const [batchPlant, setBatchPlant] = useState('Saudi Readymix Co. (Plant 4)');
  const [windowChoice, setWindowChoice] = useState<'Night Shift' | 'Early Morning' | 'Day Shift'>('Night Shift');
  const [pumpType, setPumpType] = useState<'Boom Pump 42m' | 'Boom Pump 56m' | 'Static Line Pump'>('Boom Pump 56m');
  const [icePercent, setIcePercent] = useState(65);
  const [pourDate, setPourDate] = useState('14 Oct 2026');
  const [pourTime, setPourTime] = useState('21:00 - 03:00');

  if (!isPourModalOpen) return null;

  // Calculate estimated concrete temperature based on ambient and ice replacement %
  // Base batch temp roughly: Ambient - (IcePercent * 0.12)
  const estimatedTempC = Number(
    Math.max(24, weather.ambientTempC - icePercent * 0.14).toFixed(1)
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    addPourBooking({
      targetElement,
      targetElementAr,
      volumeM3: Number(volumeM3),
      mixGrade,
      batchPlant,
      batchPlantAr:
        batchPlant.includes('Saudi') ? 'شركة الخرسانة الجاهزة السعودية' : 'شركة الكفاح للخرسانة',
      pourDate,
      pourTime,
      window: windowChoice,
      windowAr:
        windowChoice === 'Night Shift'
          ? 'الوردية الليلية'
          : windowChoice === 'Early Morning'
          ? 'الصباح الباكر'
          : 'الوردية النهارية',
      pumpType,
      pumpTypeAr:
        pumpType === 'Boom Pump 56m'
          ? 'مضخة بوم 56م'
          : pumpType === 'Boom Pump 42m'
          ? 'مضخة بوم 42م'
          : 'مضخة أرضية ثابتة',
      icePercent: Number(icePercent),
      ambientForecastC: weather.ambientTempC,
      estimatedTempC,
      chilledWater: true,
    });

    setPourModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 my-8">
        {/* Modal Header */}
        <div className="p-5 bg-gradient-to-r from-slate-900 to-slate-800 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
              <Truck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm">
                {isAr ? 'حجز وجدولة صبة خرسانية (SBC 304)' : 'Book Concrete Pour (SBC 304 Compliant)'}
              </h3>
              <p className="text-[11px] text-slate-300">
                {isAr ? 'تخصيص محطة الخلط والمضخة وضوابط الثلج' : 'Batch plant allocation & hot weather ice controls'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setPourModalOpen(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          {/* Target Element */}
          <div>
            <label className="font-bold text-slate-700 block mb-1">
              {isAr ? 'العنصر الإنشائي والموقع:' : 'Target Structural Element & Zone:'}
            </label>
            <input
              type="text"
              required
              value={targetElement}
              onChange={(e) => setTargetElement(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-amber-500 text-slate-900"
            />
          </div>

          {/* Volume & Mix Grade */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 block mb-1">
                {isAr ? 'الكمية المطلوبة (م³):' : 'Volume Requested (m³):'}
              </label>
              <input
                type="number"
                min="10"
                step="5"
                required
                value={volumeM3}
                onChange={(e) => setVolumeM3(Number(e.target.value))}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:ring-2 focus:ring-amber-500 text-slate-900"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">
                {isAr ? 'رتبة الخرسانة (Mix Grade):' : 'Mix Design Grade:'}
              </label>
              <select
                value={mixGrade}
                onChange={(e) => setMixGrade(e.target.value as MixGrade)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:ring-2 focus:ring-amber-500 text-slate-900"
              >
                <option value="C30">C30 (Substructure Blinding / Slab on Grade)</option>
                <option value="C35">C35 (Suspended PT Slabs)</option>
                <option value="C40">C40 (Heavy Rafts & Retaining Walls)</option>
                <option value="C50">C50 (High-Rise Columns & Transfer Girders)</option>
              </select>
            </div>
          </div>

          {/* Supplier Batch Plant & Pump Type */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 block mb-1">
                {isAr ? 'محطة الخلط المعتمدة:' : 'Batching Plant Supplier:'}
              </label>
              <select
                value={batchPlant}
                onChange={(e) => setBatchPlant(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-amber-500 text-slate-900"
              >
                <option value="Saudi Readymix Co. (Plant 4)">Saudi Readymix Co. (Plant 4)</option>
                <option value="Al Kifah Ready Mix Co.">Al Kifah Ready Mix Co.</option>
                <option value="Yamama Ready Mix Plant">Yamama Ready Mix Plant</option>
              </select>
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">
                {isAr ? 'معدة الضخ (Pump):' : 'Placing Equipment:'}
              </label>
              <select
                value={pumpType}
                onChange={(e) => setPumpType(e.target.value as any)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-amber-500 text-slate-900"
              >
                <option value="Boom Pump 56m">Boom Pump 56m (Long Reach)</option>
                <option value="Boom Pump 42m">Boom Pump 42m (Standard Reach)</option>
                <option value="Static Line Pump">Static Line Pump (High Pressure)</option>
              </select>
            </div>
          </div>

          {/* Pour Window & Shift */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 block mb-1">
                {isAr ? 'وردية الصب المعتمدة:' : 'Pour Shift Window:'}
              </label>
              <select
                value={windowChoice}
                onChange={(e) => setWindowChoice(e.target.value as any)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-amber-500 text-slate-900"
              >
                <option value="Night Shift">Night Shift (20:00 - 04:00) [Recommended]</option>
                <option value="Early Morning">Early Morning (04:00 - 08:00)</option>
                <option value="Day Shift">Day Shift (Subject to Thermal Permit)</option>
              </select>
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">
                {isAr ? 'تاريخ وساعات الصب:' : 'Pour Date & Time:'}
              </label>
              <input
                type="text"
                value={pourDate}
                onChange={(e) => setPourDate(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-amber-500 text-slate-900"
              />
            </div>
          </div>

          {/* Flake Ice Replacement Control Slider */}
          <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-blue-950 flex items-center gap-1.5">
                <Snowflake className="w-4 h-4 text-blue-600" />
                {isAr ? 'نسبة استبدال المياه بالثلج المجروش (Flake Ice %):' : 'Flake Ice Replacement Ratio:'}
              </span>
              <span className="font-extrabold text-blue-900 bg-white px-2 py-0.5 rounded border border-blue-300">
                {icePercent}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={icePercent}
              onChange={(e) => setIcePercent(Number(e.target.value))}
              className="w-full accent-blue-600 h-2 bg-blue-200 rounded-lg cursor-pointer mb-2"
            />
            <div className="flex justify-between items-center text-[11px]">
              <span className="text-slate-600">
                {isAr ? 'درجة حرارة الخلطة المتوقعة:' : 'Estimated Delivery Temp:'}{' '}
                <strong className="text-emerald-700">{estimatedTempC}°C</strong>
              </span>
              <span
                className={`font-bold ${
                  estimatedTempC <= 32 ? 'text-emerald-700' : 'text-rose-700'
                }`}
              >
                {estimatedTempC <= 32
                  ? '✓ SBC 304 Compliant (≤ 32°C)'
                  : '⚠ Over Limit (> 32°C)'}
              </span>
            </div>
          </div>

          {/* Form Actions */}
          <div className="pt-2 flex justify-end gap-2.5">
            <button
              type="button"
              onClick={() => setPourModalOpen(false)}
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-colors cursor-pointer"
            >
              {isAr ? 'إلغاء' : 'Cancel'}
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold shadow-xs transition-colors cursor-pointer"
            >
              {isAr ? 'تأكيد الحجز والإشعار' : 'Confirm & Schedule Pour'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

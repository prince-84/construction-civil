'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Language,
  Project,
  CivilPhaseGroup,
  RfiItem,
  MirItem,
  LabCubeTest,
  ConcretePourBooking,
  BbsEntry,
  WeatherSafetyInfo,
} from '@/types';
import {
  INITIAL_PROJECTS,
  INITIAL_WBS_PHASES,
  INITIAL_RFIS,
  INITIAL_MIRS,
  INITIAL_LAB_TESTS,
  INITIAL_POURS,
  INITIAL_BBS,
  INITIAL_WEATHER_SAFETY,
} from '@/data/mockData';

export type NavTab = 'dashboard' | 'wbs' | 'qaqc' | 'pours' | 'bbs';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  currentProject: Project;
  setCurrentProject: (proj: Project) => void;
  projects: Project[];
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  toggleSidebar: () => void;
  weather: WeatherSafetyInfo;
  setSimulatedAmbientTemp: (temp: number) => void;
  rfis: RfiItem[];
  addRfi: (item: Omit<RfiItem, 'id' | 'rfiNo' | 'dateGregorian' | 'dateHijri'>) => void;
  updateRfiStatus: (id: string, status: RfiItem['status'], notes?: string) => void;
  selectedRfi: RfiItem | null;
  setSelectedRfi: (rfi: RfiItem | null) => void;
  mirs: MirItem[];
  labTests: LabCubeTest[];
  pours: ConcretePourBooking[];
  addPourBooking: (booking: Omit<ConcretePourBooking, 'id' | 'bookingNo' | 'status' | 'statusAr'>) => void;
  wbsPhases: CivilPhaseGroup[];
  toggleWbsItem: (phaseId: string, itemId: string) => void;
  bbsData: BbsEntry[];
  isPourModalOpen: boolean;
  setPourModalOpen: (open: boolean) => void;
  isRfiModalOpen: boolean;
  setRfiModalOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  const [projects] = useState<Project[]>(INITIAL_PROJECTS);
  const [currentProject, setCurrentProject] = useState<Project>(INITIAL_PROJECTS[0]);
  const [activeTab, setActiveTab] = useState<NavTab>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [weather, setWeather] = useState<WeatherSafetyInfo>(INITIAL_WEATHER_SAFETY);
  const [rfis, setRfis] = useState<RfiItem[]>(INITIAL_RFIS);
  const [selectedRfi, setSelectedRfi] = useState<RfiItem | null>(null);
  const [mirs] = useState<MirItem[]>(INITIAL_MIRS);
  const [labTests] = useState<LabCubeTest[]>(INITIAL_LAB_TESTS);
  const [pours, setPours] = useState<ConcretePourBooking[]>(INITIAL_POURS);
  const [wbsPhases, setWbsPhases] = useState<CivilPhaseGroup[]>(INITIAL_WBS_PHASES);
  const [bbsData] = useState<BbsEntry[]>(INITIAL_BBS);
  const [isPourModalOpen, setPourModalOpen] = useState(false);
  const [isRfiModalOpen, setRfiModalOpen] = useState(false);

  // Sync RTL dir attribute with language
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = language;
    }
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'ar' : 'en'));
  };

  const toggleSidebar = () => {
    setSidebarCollapsed((prev) => !prev);
  };

  const setSimulatedAmbientTemp = (temp: number) => {
    let alert: WeatherSafetyInfo['statusAlert'] = 'Safe Window';
    let alertAr = 'نافذة صب آمنة';
    let advisoryEn = 'Ambient temperature is within standard parameters. Normal pour operations allowed.';
    let advisoryAr = 'درجة الحرارة ضمن الحدود المقبولة. يُسمح بعمليات الصب الطبيعية.';
    let permitted = true;

    if (temp >= 38) {
      alert = 'Night Pour Mandatory';
      alertAr = 'إيقاف الصب النهاري: الصب الليلي إلزامي';
      advisoryEn = `CRITICAL HEAT ALERT (${temp}°C): Direct daytime casting prohibited under SBC 304. Switch strictly to night shifts with heavy flake ice batching.`;
      advisoryAr = `تحذير حراري حرج (${temp}°م): يُمنع الصب المباشر نهاراً طبقاً لـ SBC 304. التحول فوراً للصب الليلي مع استبدال المياه بالثلج المجروش.`;
      permitted = false;
    } else if (temp >= 32) {
      alert = 'Caution - Ice Required';
      alertAr = 'تنبيه: يتطلب استخدام الثلج والمياه المبردة';
      advisoryEn = `HIGH AMBIENT TEMPERATURE (${temp}°C): Concrete batch temperature must stay ≤ 32°C. Chilled water and flake ice replacement required.`;
      advisoryAr = `حرارة جو مرتفعة (${temp}°م): يجب ألا تتجاوز حرارة الخرسانة 32°م عند الصب. يلزم استخدام الثلج وتبريد الركام.`;
      permitted = true;
    }

    setWeather((prev) => ({
      ...prev,
      ambientTempC: temp,
      statusAlert: alert,
      statusAlertAr: alertAr,
      advisoryEn,
      advisoryAr,
      pourPermitted: permitted,
    }));
  };

  const addRfi = (data: Omit<RfiItem, 'id' | 'rfiNo' | 'dateGregorian' | 'dateHijri'>) => {
    const nextNum = 1048 + rfis.length - 6;
    const newRfi: RfiItem = {
      ...data,
      id: `rfi-${nextNum}`,
      rfiNo: `RFI-CIV-2026-${nextNum}`,
      dateGregorian: '10 Oct 2026',
      dateHijri: '19 Shawwal 1447 AH',
    };
    setRfis((prev) => [newRfi, ...prev]);
  };

  const updateRfiStatus = (id: string, status: RfiItem['status'], notes?: string) => {
    setRfis((prev) =>
      prev.map((rfi) =>
        rfi.id === id
          ? {
              ...rfi,
              status,
              consultantNotes: notes || rfi.consultantNotes,
            }
          : rfi
      )
    );
  };

  const addPourBooking = (booking: Omit<ConcretePourBooking, 'id' | 'bookingNo' | 'status' | 'statusAr'>) => {
    const nextNum = String(92 + pours.length - 4).padStart(3, '0');
    const newBooking: ConcretePourBooking = {
      ...booking,
      id: `pour-${nextNum}`,
      bookingNo: `POUR-2026-${nextNum}`,
      status: 'Scheduled',
      statusAr: 'مجدول ومؤكد للصب',
    };
    setPours((prev) => [newBooking, ...prev]);
  };

  const toggleWbsItem = (phaseId: string, itemId: string) => {
    setWbsPhases((prev) =>
      prev.map((phase) => {
        if (phase.id !== phaseId) return phase;
        const updatedItems = phase.items.map((item) =>
          item.id === itemId ? { ...item, completed: !item.completed } : item
        );
        const completedCount = updatedItems.filter((i) => i.completed).length;
        const progress = Math.round((completedCount / updatedItems.length) * 100);
        return {
          ...phase,
          items: updatedItems,
          progress,
          status: progress === 100 ? 'Completed' : progress > 0 ? 'In Progress' : 'Upcoming',
          statusAr: progress === 100 ? 'مكتمل بنسبة 100%' : progress > 0 ? 'قيد التنفيذ النشط' : 'قيد البدء الميداني',
        };
      })
    );
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        currentProject,
        setCurrentProject,
        projects,
        activeTab,
        setActiveTab,
        sidebarCollapsed,
        setSidebarCollapsed,
        toggleSidebar,
        weather,
        setSimulatedAmbientTemp,
        rfis,
        addRfi,
        updateRfiStatus,
        selectedRfi,
        setSelectedRfi,
        mirs,
        labTests,
        pours,
        addPourBooking,
        wbsPhases,
        toggleWbsItem,
        bbsData,
        isPourModalOpen,
        setPourModalOpen,
        isRfiModalOpen,
        setRfiModalOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

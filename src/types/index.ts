export type Language = 'en' | 'ar';

export type CivilPhase = 'substructure' | 'superstructure' | 'finishing';

export type RfiStatus = 'Code A' | 'Code B' | 'Code C' | 'Pending';

export type MixGrade = 'C30' | 'C35' | 'C40' | 'C50';

export interface Project {
  id: string;
  name: string;
  nameAr: string;
  location: string;
  locationAr: string;
  type: string;
  typeAr: string;
  consultant: string;
  consultantAr: string;
  contractor: string;
  contractorAr: string;
  totalConcreteTargetM3: number;
  totalConcretePouredM3: number;
  activeCivilZones: number;
  pendingRfisCount: number;
  progressPercent: number;
  budgetSAR: string;
  ambientTempC: number;
  status: 'Active' | 'Under Inspection' | 'Near Completion';
  statusAr: string;
}

export interface WbsChecklistItem {
  id: string;
  text: string;
  textAr: string;
  sbcCode: string;
  completed: boolean;
}

export interface CivilPhaseGroup {
  id: string;
  phase: CivilPhase;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  sbcCode: string;
  progress: number;
  status: 'In Progress' | 'Completed' | 'Upcoming';
  statusAr: string;
  items: WbsChecklistItem[];
}

export interface RfiItem {
  id: string;
  rfiNo: string;
  title: string;
  titleAr: string;
  activityType: string;
  activityTypeAr: string;
  location: string;
  locationAr: string;
  zone: string;
  consultant: string;
  consultantAr: string;
  inspectorName: string;
  inspectorNameAr: string;
  status: RfiStatus;
  dateGregorian: string;
  dateHijri: string;
  submissionNotes: string;
  submissionNotesAr: string;
  consultantNotes?: string;
  consultantNotesAr?: string;
  specCode: string;
}

export interface MirItem {
  id: string;
  mirNo: string;
  material: string;
  materialAr: string;
  supplier: string;
  supplierAr: string;
  standard: string;
  mtcNumber: string;
  status: 'Approved' | 'Under Review' | 'Rejected';
  statusAr: string;
  date: string;
  testSummary: string;
  testSummaryAr: string;
}

export interface LabCubeTest {
  id: string;
  ticketNo: string;
  element: string;
  elementAr: string;
  mixDesign: MixGrade;
  pourDate: string;
  batchPlant: string;
  slumpMm: number;
  slumpStatus: 'Pass' | 'Fail';
  tempC: number;
  tempStatus: 'Compliant' | 'High';
  strength7dMpa: number;
  target7dMpa: number;
  strength28dMpa: number;
  target28dMpa: number;
  finalStatus: 'Pass' | 'Pending 28d' | 'Fail';
  finalStatusAr: string;
  cubesCount: number;
}

export interface ConcretePourBooking {
  id: string;
  bookingNo: string;
  targetElement: string;
  targetElementAr: string;
  volumeM3: number;
  mixGrade: MixGrade;
  batchPlant: string;
  batchPlantAr: string;
  pourDate: string;
  pourTime: string;
  window: 'Night Shift' | 'Early Morning' | 'Day Shift';
  windowAr: string;
  pumpType: 'Boom Pump 42m' | 'Boom Pump 56m' | 'Static Line Pump';
  pumpTypeAr: string;
  icePercent: number; // Chilled water / flake ice replacement %
  ambientForecastC: number;
  estimatedTempC: number;
  status: 'Scheduled' | 'In Progress' | 'Completed';
  statusAr: string;
  chilledWater: boolean;
}

export interface BbsEntry {
  barDiameter: string;
  nominalMm: number;
  unitWeightKgM: number;
  totalDeliveredTons: number;
  fabricatedTons: number;
  scrapTons: number;
  wastagePercent: number;
  targetTolerancePercent: number;
  status: 'Compliant' | 'Review Required';
  statusAr: string;
}

export interface WeatherSafetyInfo {
  ambientTempC: number;
  humidityPercent: number;
  windSpeedKmh: number;
  pourPermitted: boolean;
  statusAlert: 'Safe Window' | 'Caution - Ice Required' | 'Night Pour Mandatory';
  statusAlertAr: string;
  advisoryEn: string;
  advisoryAr: string;
  nextSafeWindow: string;
  nextSafeWindowAr: string;
}

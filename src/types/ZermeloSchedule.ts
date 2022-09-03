export type getZermeloLiveSchedule = ZermeloSchedule;

export interface ZermeloSchedule {
  response: Response;
}

export interface Response {
  status: number;
  message: string;
  details: string;
  eventId: number;
  startRow: number;
  endRow: number;
  totalRows: number;
  data: ResponseData[];
}

export interface ResponseData {
  week: string;
  user: string;
  appointments: Appointment[];
  status: Status[];
  replacements: any[];
}

export interface Appointment {
  status: Status[];
  actions: Action[];
  start: number;
  end: number;
  cancelled: boolean;
  appointmentType: string;
  online: boolean;
  optional: boolean;
  appointmentInstance?: number;
  startTimeSlotName: string;
  endTimeSlotName: string;
  subjects: string[];
  groups: string[];
  locations: string[];
  teachers: string[];
  onlineTeachers: any[];
  onlineLocationUrl: any;
  capacity: any;
  expectedStudentCount: any;
  expectedStudentCountOnline: any;
  changeDescription?: string;
  schedulerRemark?: string;
  content: any;
  id?: number;
}

export interface Action {
  appointment: ActionAppointment;
  status: Status[];
  allowed: boolean;
  post: string;
}

export interface ActionAppointment {
  start: number;
  end: number;
  cancelled: boolean;
  plannedAttendance: boolean;
  studentEnrolled: boolean;
  allowedActions: string;
  optional: boolean;
  attendanceOverruled: boolean;
  appointmentType: string;
  online: boolean;
  onlineLocationUrl: any;
  appointmentInstance: number;
  startTimeSlotName: string;
  endTimeSlotName: string;
  subjects: string[];
  groups: any[];
  locations: string[];
  teachers: string[];
  onlineTeachers: any[];
  capacity: any;
  expectedStudentCount: any;
  expectedStudentCountOnline: any;
  changeDescription: string;
  schedulerRemark: string;
  content: any;
  availableSpace: number;
  id: number;
}

export interface Status {
  code: number;
  nl: string;
  en: string;
}

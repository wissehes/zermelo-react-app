export type getZermeloMeData = ZermeloMeResponse;

export interface ZermeloMeResponse {
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
  code: string;
  roles: string[];
  firstName: string;
  prefix: any;
  lastName: string;
  schoolInSchoolYears: number[];
  isApplicationManager: boolean;
  archived: boolean;
  hasPassword: boolean;
  isStudent: boolean;
  isEmployee: boolean;
  isFamilyMember: boolean;
  isSchoolScheduler: boolean;
  isSchoolLeader: boolean;
  isStudentAdministrator: boolean;
  isTeamLeader: boolean;
  isSectionLeader: boolean;
  isMentor: boolean;
  isParentTeacherNightScheduler: boolean;
  isDean: boolean;
}

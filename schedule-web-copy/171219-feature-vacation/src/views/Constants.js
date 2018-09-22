export const scheduleTypes = {
  onSchedule: 1,
  fifo: 2,
};

export const GENDER_TYPES = {
  MALE: 'MALE',
  FEMALE: 'FEMALE',
};

export const GENDER_API_VALUES = {
  [GENDER_TYPES.MALE]: 'true',
  [GENDER_TYPES.FEMALE]: 'false',
};

export const GENDER_RADIO_NAME = 'GENDER';

export const FILTER_NAMES = {
  BRANCHES: 'BRANCHES',
  ROOMS: 'ROOMS',
  DOCTORS: 'DOCTORS',
};

export const ALL_BRANCHES_VALUE = 'ALL_BRANCHES';

export const MODAL_NAMES = {
  PATIENT_DETAILS: 'PATIENT_DETAILS',
  PATIENT_NOTES: 'PATIENT_NOTES',
  ADD_APPOINTMENT: 'ADD_APPOINTMENT',
  CANCEL_APPOINTMENT: 'CANCEL_APPOINTMENT',
  ADD_PATIENT: 'ADD_PATIENT',
  EDIT_PATIENT: 'EDIT_PATIENT',
  DELETE_PATIENT: 'DELETE_PATIENT',
};

export const CONFIRMATION_SELECT_TYPES = {
  THIS_WEEK: 'THIS_WEEK',
  NEXT_WEEK: 'NEXT_WEEK',
  THIRD_WEEK: 'THIRD_WEEK',
  FOURTH_WEEK: 'FOURTH_WEEK',
};

export const VISIT_TYPES = {
  CONSULTATION: 'Consultation',
  EXAMINATION: 'Examination',
};

export const VISIT_TYPES_API_VALUES = {
  0: 'Examination',
  1: 'Consultation',
};

export const COUNTRY_CODES = {
  EGYPT: '+20',
  LEBANON: '+961',
  JORDAN: '+962',
};

export const INSURANCE_PROVIDERS = {
  MEDRIGHT: 'Medright',
};

export const RELATIVE_TYPES = {
  FATHER: 'Father',
  MOTHER: 'Mother',
  BROTHER: 'Brother',
  SISTER: 'Sister',
};

export const PHONE_NUMBER_LENGTH = 11;

export const DEFAULT_ERROR_MESSAGE =
  'Something went wrong. Please try again later';

export const PATIENT = {
  FETCH: 'PATIENT_FETCH',
  FETCH_SUCCESS: 'PATIENT_FETCH_SUCCESS',
};

export const fetchPatient = (
  patientKey,
  clinicKey = 'clnc8c1fff89af1dacc0',
  authorization = '9913fb',
  language = 'ar-EG',
) => ({
  type: PATIENT.FETCH,
  patientKey,
  clinicKey,
  authorization,
  language,
});

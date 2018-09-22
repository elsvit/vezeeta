export const DOCTOR = {
  DOWNLOAD: 'DOCTORS_DOWNLOAD',
};

export const downloadDoctors = (doctors) => (
  {
    type: DOCTOR.DOWNLOAD,
    doctors,
  }
);

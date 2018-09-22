/* global process */

const BaseUrls = {
  accountManagement: process.env.REACT_APP_ACCOUNT_URL,
  schedule: process.env.REACT_APP_SCHEDULE_URL,
  patients: process.env.REACT_APP_PATIENTS_URL,
  reservations: process.env.REACT_APP_RESERVATIONS_URL,
};

const Urls = {
  getAccountStructure: `${
    BaseUrls.accountManagement
  }/Account/GetAccountStructure`,

  getPatientReservationsUrl: `${
    BaseUrls.schedule
  }api/Schedule/GetPatientReservations`,
  getReservationDetailsUrl: `${
    BaseUrls.schedule
  }api/Schedule/GetReservationDetails`,
  getConfirmationsUrl: `${
    BaseUrls.schedule
  }/Confirmations/GetWeeksConfirmations`,
  saveConfirmationsUrl: `${BaseUrls.schedule}/Confirmations/SetConfirmations`,
  getWorkingHours: `${BaseUrls.schedule}/WorkingHours/GetWorkingHours`,

  getPatientByKeyUrl: `${BaseUrls.patients}/Patients/GetPatientsByPatientKeys`,
  searchPatientsByKeyword: `${BaseUrls.patients}/Patients/GetPatientsList`,
  createPatient: `${BaseUrls.patients}/Patients/AddPatients`,
  deletePatientByKeyUrl: `${BaseUrls.patients}/Patients/DeletePatients`,

  createReservationUrl: `${
    BaseUrls.reservations
  }/Reservation/UpsertReservations`,
};

export default Urls;

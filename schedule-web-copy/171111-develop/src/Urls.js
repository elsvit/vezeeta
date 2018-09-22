/* global process */

const BaseUrls = {
  accountManagement: process.env.REACT_APP_ACCOUNT_URL,
  schedule: process.env.REACT_APP_SCHEDULE_URL,
  cDoctors: process.env.REACT_APP_C_DOCTORS_URL,
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

  getPatientByKeyUrl: `${BaseUrls.cDoctors}api/Patient/GetPatientByKey`,
  getPatientsListUrl: `${BaseUrls.cDoctors}api/Patient/GetPatientsList`,

  getWorkingHours: `${BaseUrls.schedule}/WorkingHours/GetWorkingHours`,
};

export default Urls;

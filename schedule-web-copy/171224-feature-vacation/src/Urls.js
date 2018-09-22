/* global process */

const BaseUrls = {
  accountManagement: process.env.REACT_APP_ACCOUNT_URL,
  schedule: process.env.REACT_APP_SCHEDULE_URL,
  patients: process.env.REACT_APP_PATIENTS_URL,
  reservations: process.env.REACT_APP_RESERVATIONS_URL,
  staticApi: process.env.REACT_APP_STATIC_API_URL,
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
  editPatient: `${BaseUrls.patients}/Patients/EditPatient`,
  deletePatientByKeyUrl: `${BaseUrls.patients}/Patients/DeletePatients`,

  fetchReservationsUrl: `${
    BaseUrls.reservations
  }/Reservation/GetReservationDetails`,
  createReservationUrl: `${
    BaseUrls.reservations
  }/Reservation/UpsertReservations`,
  markReservationAsNoShow: `${
    BaseUrls.reservations
  }/Reservation/MarkReservationsAsNoShow`,
  undoReservationNoShow: `${
    BaseUrls.reservations
  }/Reservation/UndoNoShowReservations`,
  checkInReservation: `${
    BaseUrls.reservations
  }/Reservation/UpdateReservationsStatus`,
  cancelReservation: `${BaseUrls.reservations}/Reservation/CancelReservations`,
  countReservationsInRange: `${BaseUrls.reservations}/Reservation/CountReservationsInRange`,

  saveWorkingHours: `${BaseUrls.schedule}/WorkingHours/SaveWorkingHours`,
  GetScheduleTypes: `${BaseUrls.schedule}/Schedule/GetScheduleTypes`,
  SetScheduleTypes: `${BaseUrls.schedule}/Schedule/SetScheduleTypes`,
  GetAllowReservationWindow: `${BaseUrls.schedule}/Schedule/GetAllowReservationWindow`,
  SetAllowReservationWindow: `${BaseUrls.schedule}/Schedule/SetAllowReservationWindow`,
  getVacations: `${BaseUrls.schedule}/Vacation/GetVacations`,
  setVacations: `${BaseUrls.schedule}/Vacation/SetVacations`,

  getCountries: `${BaseUrls.staticApi}Country/GetCountries`,
};

export default Urls;

import ClinicsUtils from './Clinics';
import {
  isToday,
  isTomorrow,
  getAppointmentStart,
  getAppointmentEnd,
} from '../Helpers';
import { VISIT_TYPES_API_VALUES } from '../Constants';

export const getAppointmentsWithPatientsKeys = (appointments, patientsKeys) =>
  appointments.filter((appointment) =>
    patientsKeys.includes(appointment.PatientKey));

export const sortAppointments = (appointments) => {
  const nextAppointments = [...appointments];
  nextAppointments.sort((a1, a2) => new Date(a1.ReservationDate) > new Date(a2.ReservationDate));

  const todayAppointments = [];
  const tomorrowAppointments = [];
  const otherAppointments = [];
  nextAppointments.forEach((appointment) => {
    if (appointment.isToday) {
      todayAppointments.push(appointment);
    } else if (appointment.isTomorrow) {
      tomorrowAppointments.push(appointment);
    } else {
      otherAppointments.push(appointment);
    }
  });

  return todayAppointments.concat(tomorrowAppointments, otherAppointments);
};

export const setAppointmentsData = (appointments, clinics) => {
  const clinicsData = ClinicsUtils.flattenClinics(clinics);
  const branchesNames = ClinicsUtils.getBranchesNames(clinicsData.branches);
  const roomsNames = ClinicsUtils.getRoomNames(clinicsData.rooms);
  const doctorsNames = ClinicsUtils.getDoctorsNames(clinicsData.doctors);

  return appointments.map((appointment) => {
    const appointmentDate = new Date(appointment.ReservationDate);

    return {
      ...appointment,
      isToday: isToday(appointmentDate),
      isTomorrow: isTomorrow(appointmentDate),
      appointmentStart: getAppointmentStart(1, appointment),
      appointmentEnd: getAppointmentEnd(1, appointment),
      branchName: branchesNames[appointment.RoomKey],
      roomName: roomsNames[appointment.RoomKey],
      doctorName: doctorsNames[appointment.AccountKey],
      appointmentType: VISIT_TYPES_API_VALUES[appointment.VisitTypeId],
    };
  });
};

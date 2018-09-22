import { scheduleTypes } from '../constants.js';

const isSameDay = function(d1, d2) {
  return (
    d1.getDate() === d2.getDate() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getFullYear() === d2.getFullYear()
  );
};

const getOnScheduleAppointmentTime = function(appointmentDateTime) {
  let hours = doubleDigit(appointmentDateTime.getHours());
  let minutes = doubleDigit(appointmentDateTime.getMinutes());
  return `${hours}:${minutes}`;
};

const getFifoAppointmentTime = function(fifoStartTime) {
  return fifoStartTime.subString(0, 5);
};

const getAppointmentTime = function(
  scheduleTypeId,
  appointmentDateTime,
  fifoStartTime
) {
  return scheduleTypeId === scheduleTypes.fifo
    ? getFifoAppointmentTime(fifoStartTime)
    : getOnScheduleAppointmentTime(appointmentDateTime);
};

export const doubleDigit = function(num) {
  return num.toString().length === 1 ? `0${num}` : num;
};

export const getAppointmentStart = function(scheduleTypeId, appointment) {
  let appointmentDateTime = new Date(appointment.ReservationDate);
  return getAppointmentTime(
    scheduleTypeId,
    appointmentDateTime,
    appointment.StartTime
  );
};

export const getAppointmentEnd = function(scheduleTypeId, appointment) {
  let appointmentDateTime = new Date(appointment.ReservationDate);
  let end = new Date(appointmentDateTime);
  end.setMinutes(end.getMinutes() + appointment.Duration);
  return getAppointmentTime(scheduleTypeId, end, appointment.EndTime);
};

export const isToday = function(date) {
  return isSameDay(date, new Date());
};

export const isTomorrow = function(date) {
  let tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return isSameDay(date, tomorrow);
};

export const getMonthFromDate = function(date) {
  var month = new Array();
  month[0] = 'January';
  month[1] = 'February';
  month[2] = 'March';
  month[3] = 'April';
  month[4] = 'May';
  month[5] = 'June';
  month[6] = 'July';
  month[7] = 'August';
  month[8] = 'September';
  month[9] = 'October';
  month[10] = 'November';
  month[11] = 'December';
  return month[date.getMonth()];
};

export const getDayOfMonthFromDate = date => doubleDigit(date.getDate());

export const getYearFromDate = date => date.getFullYear();

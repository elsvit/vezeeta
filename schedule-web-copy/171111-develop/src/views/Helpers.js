import { scheduleTypes } from './Constants';

const isSameDay = (d1, d2) =>
  d1.getDate() === d2.getDate() &&
  d1.getMonth() === d2.getMonth() &&
  d1.getFullYear() === d2.getFullYear();

export const doubleDigit = (num) =>
  (num.toString().length === 1 ? `0${num}` : num);

const getOnScheduleAppointmentTime = (appointmentDateTime) => {
  const hours = doubleDigit(appointmentDateTime.getHours());
  const minutes = doubleDigit(appointmentDateTime.getMinutes());
  return `${hours}:${minutes}`;
};

const getFifoAppointmentTime = (fifoStartTime) => fifoStartTime.subString(0, 5);

const getAppointmentTime = (
  scheduleTypeId,
  appointmentDateTime,
  fifoStartTime,
) =>
  (scheduleTypeId === scheduleTypes.fifo
    ? getFifoAppointmentTime(fifoStartTime)
    : getOnScheduleAppointmentTime(appointmentDateTime));

export const getAppointmentStart = (scheduleTypeId, appointment) => {
  const appointmentDateTime = new Date(appointment.ReservationDate);
  return getAppointmentTime(
    scheduleTypeId,
    appointmentDateTime,
    appointment.StartTime,
  );
};

export const getAppointmentEnd = (scheduleTypeId, appointment) => {
  const appointmentDateTime = new Date(appointment.ReservationDate);
  const end = new Date(appointmentDateTime);
  end.setMinutes(end.getMinutes() + appointment.Duration);
  return getAppointmentTime(scheduleTypeId, end, appointment.EndTime);
};

export const isToday = (date) => isSameDay(date, new Date());

export const isTomorrow = (date) => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return isSameDay(date, tomorrow);
};

export const getMonthFromDate = (date, shortMonthName = false) => {
  const month = [];
  month[0] = shortMonthName ? 'Jan' : 'January';
  month[1] = shortMonthName ? 'Feb' : 'February';
  month[2] = shortMonthName ? 'Mar' : 'March';
  month[3] = shortMonthName ? 'Apr' : 'April';
  month[4] = 'May';
  month[5] = 'June';
  month[6] = 'July';
  month[7] = shortMonthName ? 'Aug' : 'August';
  month[8] = shortMonthName ? 'Sept' : 'September';
  month[9] = shortMonthName ? 'Oct' : 'October';
  month[10] = shortMonthName ? 'Nov' : 'November';
  month[11] = shortMonthName ? 'Dec' : 'December';
  return month[date.getMonth()];
};

export const getDayOfMonthFromDate = (date) => doubleDigit(date.getDate());

export const getYearFromDate = (date) => date.getFullYear();

export const getDateRangeLabel = (startDate, endDate) =>
  `${startDate.getDate()} ${getMonthFromDate(
    startDate,
    true,
  ).toLowerCase()} - ${endDate.getDate()} ${getMonthFromDate(
    endDate,
    true,
  ).toLowerCase()}`;

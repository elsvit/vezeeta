import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Spinner } from '@vezeeta/web-components';

import AppointmentsList from './AppointmentsList';
import {
  fetchAppointments,
  updateNoShow,
  checkIn,
  cancel,
} from '../../../store/actions/appointments';
import { searchPatients } from '../../../store/actions/patients';
import getPatientsKeys from '../../utils/Patients';
import {
  setAppointmentsData,
  sortAppointments,
  getAppointmentsWithPatientsKeys,
} from '../../utils/Appointments';
import { MODAL_NAMES } from '../../Constants';

class AppointmentContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      appointments: [],
    };
  }

  componentDidMount() {
    this.props.searchPatients(this.props.patientSearchValue);
  }

  componentWillReceiveProps(nextProps) {
    const selectedDoctorsChanged =
      this.props.selectedDoctors !== nextProps.selectedDoctors;
    const startDateChanged = this.props.startDate !== nextProps.startDate;
    const startDatePresent = !!nextProps.startDate;
    const endDateChanged = this.props.endDate !== nextProps.endDate;
    const endDatePresent = !!nextProps.endDate;

    if (
      startDatePresent &&
      endDatePresent &&
      (selectedDoctorsChanged || startDateChanged || endDateChanged)
    ) {
      this.props.fetchAppointments(
        nextProps.selectedDoctors,
        nextProps.startDate,
        nextProps.endDate,
      );
    }

    if (this.props.patientSearchValue !== nextProps.patientSearchValue) {
      this.props.searchPatients(nextProps.patientSearchValue);
    }

    if (
      this.props.appointments !== nextProps.appointments ||
      this.props.clinics !== nextProps.clinics ||
      this.props.searchedPatients !== nextProps.searchedPatients
    ) {
      const searchedPatientsKeys = getPatientsKeys(nextProps.searchedPatients);
      const searchedAppointments = getAppointmentsWithPatientsKeys(
        nextProps.appointments,
        searchedPatientsKeys,
      );
      const nextAppointments = setAppointmentsData(
        searchedAppointments,
        nextProps.clinics,
      );
      const sortedAppointments = sortAppointments(nextAppointments);

      this.setState({
        appointments: sortedAppointments,
      });
    }
  }

  updateNoShow = (reservationKey) => {
    const appointment = this.props.appointments.find((item) => item.ReservationKey === reservationKey);

    if (appointment.EnableNoShow) {
      const nextIsNoShow = !appointment.IsNoShow;
      this.props.updateNoShow(reservationKey, nextIsNoShow);
    }
  };

  checkIn = (reservationKey) => {
    const appointment = this.props.appointments.find((item) => item.ReservationKey === reservationKey);

    if (appointment.EnableCheckin) {
      this.props.checkIn(reservationKey);
    }
  };

  cancel = (reservationKey) => {
    this.props.cancel(reservationKey);
  };

  openPatientDetails = (patientKey) => {
    const { openModal } = this.props;
    const onDeleteSuccess = () =>
      this.props.fetchAppointments(
        this.props.selectedDoctors,
        this.props.startDate,
        this.props.endDate,
      );

    openModal(MODAL_NAMES.PATIENT_DETAILS, {
      patientKey,
      onDeleteSuccess,
    });
  };

  openCancel = (reservationKey) => {
    const appointment = this.props.appointments.find((item) => item.ReservationKey === reservationKey);
    const cancelReservation = () => this.props.cancel(reservationKey);

    if (!appointment.ReservationPassed) {
      this.props.openModal(MODAL_NAMES.CANCEL_APPOINTMENT, {
        cancel: cancelReservation,
      });
    }
  };

  openNotes = (notes) => {
    this.props.openModal(MODAL_NAMES.PATIENT_NOTES, {
      notes,
    });
  };

  render() {
    if (this.props.isAppointmentsLoading) {
      return <Spinner />;
    }

    return (
      <AppointmentsList
        appointments={this.state.appointments}
        openModal={this.props.openModal}
        updateNoShow={this.updateNoShow}
        checkIn={this.checkIn}
        cancel={this.cancel}
        openPatientDetails={this.openPatientDetails}
        openNotes={this.openNotes}
        openCancel={this.openCancel}
      />
    );
  }
}

AppointmentContainer.propTypes = {
  openModal: PropTypes.func,
  appointments: PropTypes.array,
  fetchAppointments: PropTypes.func,
  updateNoShow: PropTypes.func,
  checkIn: PropTypes.func,
  cancel: PropTypes.func,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  selectedDoctors: PropTypes.array,
  isAppointmentsLoading: PropTypes.bool,
  patientSearchValue: PropTypes.string,
  searchPatients: PropTypes.func,
  searchedPatients: PropTypes.array,
  clinics: PropTypes.array,
};

const mapStateToProps = (state) => ({
  appointments: state.appointments.list,
  isAppointmentsLoading: state.appointments.isListLoading,
  searchedPatients: state.patients.searchedList,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      fetchAppointments,
      updateNoShow,
      checkIn,
      cancel,
      searchPatients,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(AppointmentContainer);

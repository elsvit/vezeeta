import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Modal } from '@vezeeta/web-components';

import Schedule from './Schedule';
import { MODAL_NAMES } from '../Constants';
import { fetchAppointments } from '../../store/actions/appointments';
import getModalTabs from '../utils/Modal';
import { getFormattedDate, getDateAfterGivenDays } from '../Helpers';

class ScheduleContainer extends Component {
  constructor(props) {
    super(props);

    const todayDate = new Date();
    const dateAfterSixDays = getDateAfterGivenDays(6);

    this.state = {
      openedModal: null,
      modalData: {},
      selectedDoctors: [],
      startDate: getFormattedDate(todayDate),
      endDate: getFormattedDate(dateAfterSixDays),
      patientSearchValue: '',
    };
  }

  openModal = (modalName, modalData) => {
    if (MODAL_NAMES[modalName]) {
      this.setState(
        {
          openedModal: modalName,
          modalData,
        },
        () => {
          this.modal.showModal();
        },
      );
    }
  };

  closeModal = () => {
    this.setState({
      openedModal: null,
      modalData: {},
    });
  };

  handleCalendarChange = (calendarData) => {
    const { startDate, endDate } = calendarData;

    this.setState({
      startDate,
      endDate,
    });
  };

  handleFilterChange = (selectedDoctors) => {
    this.setState({
      selectedDoctors,
    });
  };

  handleSearchChange = (searchValue) => {
    this.setState({ patientSearchValue: searchValue });
  };

  openAddAppointment = () => {
    const { selectedDoctorsInfo, startDate, endDate } = this.state;
    const fetchAppointmentsThunk = () =>
      this.props.fetchAppointments(selectedDoctorsInfo, startDate, endDate);

    this.openModal(MODAL_NAMES.ADD_APPOINTMENT, {
      fetchAppointments: fetchAppointmentsThunk,
    });
  };

  render() {
    return (
      <div>
        {this.state.openedModal && (
          <Modal
            ref={(modal) => {
              this.modal = modal;
            }}
            tabs={getModalTabs(this.state.openedModal, {
              ...this.state.modalData,
              closeModal: this.closeModal,
            })}
            onHide={this.closeModal}
            className="schedule-modal"
          />
        )}
        <Schedule
          {...this.state}
          openModal={this.openModal}
          openAddAppointment={this.openAddAppointment}
          clinics={this.props.clinics}
          handleCalendarChange={this.handleCalendarChange}
          handleFilterChange={this.handleFilterChange}
          handleSearchChange={this.handleSearchChange}
        />
      </div>
    );
  }
}

ScheduleContainer.propTypes = {
  clinics: PropTypes.array,
  fetchAppointments: PropTypes.func,
};

const mapStateToProps = (state) => ({
  clinics: state.clinics.Clinics,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      fetchAppointments,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleContainer);

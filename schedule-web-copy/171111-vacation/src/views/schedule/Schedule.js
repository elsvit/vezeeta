import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Filter, Calendar, Modal } from '@vezeeta/web-components';

import AppointmentContainer from './appointments/AppointmentContainer';
import PatientSearchContainer from './PatientSearchContainer';
import { MODAL_NAMES } from '../Constants';
import ClinicsUtils from '../utils/Clinics';
import FilterUtils from '../utils/Filter';
import getModalTabs from '../utils/Modal';
import './Schedule.scss';

class Schedule extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startDate: '',
      endDate: '',
    };
  }

  // Mock calendar default select for initial fetch
  componentDidMount() {
    // eslint-disable-next-line
    this.setState({
      startDate: '02/01/2016',
      endDate: '02/20/2016',
    });
  }

  openAddAppointment = () => {
    this.props.openModal(MODAL_NAMES.ADD_APPOINTMENT);
  };

  handleCalendarChange = (calendarData) => {
    const { startDate, endDate } = calendarData;

    this.setState({
      startDate,
      endDate,
    });
  };

  render() {
    const { clinics } = this.props;
    const clinicsData = ClinicsUtils.flattenClinics(clinics);
    const branchesSection = FilterUtils.createBranchesSection(clinicsData.branches);
    const roomsSection = FilterUtils.createRoomsSection(clinicsData.rooms);
    const doctorsSection = FilterUtils.createDoctorsSection(clinicsData.doctors);

    return (
      <div id="Schedule">
        <div className="row">
          {this.props.openedModal && (
            <Modal
              tabs={getModalTabs(this.props.openedModal, {
                ...this.props.modalData,
                closeModal: this.props.resetModalData,
              })}
              onClose={this.props.resetModalData}
            />
          )}
          <div className="col-xs-3">
            <Calendar onChange={this.handleCalendarChange} />
            <div className="h20" />
            <Filter
              title="Filter By"
              sections={[branchesSection, roomsSection, doctorsSection]}
            />
          </div>

          <div className="col-xs-9 appointments-container">
            <div className="row appointments-title-container">
              <div className="patient-search-container">
                <PatientSearchContainer />
              </div>
              <div>
                <Button onClick={this.openAddAppointment}>
                  Add Appointment
                </Button>
              </div>
            </div>

            <div className="appointments-list-container">
              <div>
                <AppointmentContainer
                  openModal={this.props.openModal}
                  startDate={this.state.startDate}
                  endDate={this.state.endDate}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Schedule.propTypes = {
  openModal: PropTypes.func,
  resetModalData: PropTypes.func,
  openedModal: PropTypes.string,
  modalData: PropTypes.object,
  clinics: PropTypes.array,
};

export default Schedule;

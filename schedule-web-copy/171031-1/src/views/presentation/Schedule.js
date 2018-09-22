import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LabelWithIcon from '../../components/buttons/labelWithIcon/LabelWithIcon';
import AppointmentContainer from '../containers/AppointmentContainer';
import Filter from './filter/Filter';
import './Schedule.scss';
import PatientDetailsContainer from '../containers/PatientDetailsContainer';
import RescheduleContainer from '../containers/RescheduleContainer';
import PatientSearchContainer from '../containers/PatientSearchContainer';
import Calendar from './Calendar';

class Schedule extends Component {
  constructor(props) {
    super(props);
  }

  print() {
    window.print();
  }

  render() {
    let branchesSection = {
      type: 'combo',
      filters: [
        {
          data: {
            placeholder: 'All Branches',
            value: 'All Branches',
            searchable: ['All Branches']
          },
          component: <div>All Branches</div>
        },
        {
          data: {
            placeholder: 'Branch 1',
            value: 'Branch 1',
            searchable: ['Branch 1']
          },
          component: <div>Branch 1</div>
        },
        {
          data: {
            placeholder: 'Branch 2',
            value: 'Branch 2',
            searchable: ['Branch 2']
          },
          component: <div>Branch 2</div>
        }
      ],
      placeholder: 'Branches'
    };

    let roomsSection = {
      type: 'check',
      filters: [
        {
          data: {
            placeholder: 'All Rooms'
          },
          onClick: () => null
        },
        {
          data: {
            placeholder: 'Room 1'
          },
          onClick: () => null
        },
        {
          data: {
            placeholder: 'Room 2'
          },
          onClick: () => null
        }
      ],
      placeholder: 'Rooms'
    };

    let doctorsSection = {
      type: 'check',
      filters: [
        {
          data: {
            placeholder: 'All Doctors'
          },
          onClick: () => null
        },
        {
          data: {
            placeholder: 'Dr. Ahmed Rizk'
          },
          onClick: () => null
        },
        {
          data: {
            placeholder: 'Dr. Fady Aziz'
          },
          onClick: () => null
        },
        {
          data: {
            placeholder: 'Dr. Magdi Sami'
          },
          onClick: () => null
        }
      ],
      placeholder: 'Doctors'
    };

    let viewSection = {
      type: 'check',
      filters: [
        {
          data: {
            placeholder: 'Upcoming to old'
          },
          onClick: () => null
        },
        {
          data: {
            placeholder: 'No Show'
          },
          onClick: () => null
        },
        {
          data: {
            placeholder: 'Cancelled'
          },
          onClick: () => null
        }
      ],
      placeholder: 'View'
    };

    return (
      <div id="Schedule">
        <div className="row">
          <PatientDetailsContainer
            openPatientDetailsModal={this.props.openPatientDetailsModal}
            patientKey={this.props.patientKey}
          />
          <RescheduleContainer
            openRescheduleModal={this.props.openRescheduleModal}
            rescheduleReservationKey={this.props.rescheduleReservationKey}
            rescheduleReservationDateTime={
              this.props.rescheduleReservationDateTime
            }
          />
          <div className="col-xs-3">
            <Calendar />
            <div className="h20" />
            <Filter
              title="Filter By"
              sections={[
                branchesSection,
                roomsSection,
                viewSection,
                doctorsSection
              ]}
            />
          </div>

          <div className="col-xs-9">
            <div className="row">
              <div className="col-xs-9">
                <PatientSearchContainer />
              </div>
              <div className="col-xs-3">
                <div className="row">
                  <div className="col-xs-6">
                    <LabelWithIcon onClick={this.print}>
                      <span>Print</span>
                    </LabelWithIcon>
                  </div>
                  <div className="col-xs-6">
                    <LabelWithIcon>
                      <span>Export</span>
                    </LabelWithIcon>
                  </div>
                </div>
              </div>
            </div>
            <div className="h20" />

            <div className="row">
              <div className="col-xs-12">
                <AppointmentContainer
                  openPatientDetails={this.props.openPatientDetails}
                  openReschedule={this.props.openReschedule}
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
  openPatientDetailsModal: PropTypes.bool.isRequired,
  patientKey: PropTypes.string,
  openPatientDetails: PropTypes.func,
  openRescheduleModal: PropTypes.bool.isRequired,
  rescheduleReservationKey: PropTypes.string,
  rescheduleReservationDateTime: PropTypes.string,
  openReschedule: PropTypes.func
};

export default Schedule;

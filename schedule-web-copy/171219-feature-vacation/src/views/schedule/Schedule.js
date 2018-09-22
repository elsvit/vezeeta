import React from 'react';
import PropTypes from 'prop-types';
import { Button, Calendar, Search } from '@vezeeta/web-components';

import AppointmentContainer from './appointments/AppointmentContainer';
import FilterContainer from '../filter/FilterContainer';
import './Schedule.scss';

const Schedule = (props) => (
  <div>
    <div className="schedule-card">
      <div>
        <Calendar
          startDate={props.startDate}
          endDate={props.endDate}
          onChange={props.handleCalendarChange}
        />
        <div className="h20" />
        <FilterContainer onChange={props.handleFilterChange} />
      </div>

      <div className="list--container">
        <div className="list--title-container">
          <Search
            placeholder="Search By Patient"
            onChange={props.handleSearchChange}
          />
          <Button onClick={props.openAddAppointment}>Add Appointment</Button>
        </div>

        <div className="appointments-list-container">
          <div>
            <AppointmentContainer
              clinics={props.clinics}
              openModal={props.openModal}
              startDate={props.startDate}
              endDate={props.endDate}
              patientSearchValue={props.patientSearchValue}
              selectedDoctors={props.selectedDoctors}
            />
          </div>
        </div>
      </div>
    </div>
  </div>
);

Schedule.propTypes = {
  openModal: PropTypes.func,
  clinics: PropTypes.array,
  handleCalendarChange: PropTypes.func,
  handleFilterChange: PropTypes.func,
  handleSearchChange: PropTypes.func,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  patientSearchValue: PropTypes.string,
  selectedDoctors: PropTypes.array,
  openAddAppointment: PropTypes.func,
};

export default Schedule;

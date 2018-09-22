import React from 'react';
import PropTypes from 'prop-types';

import FilterContainer from '../filter/FilterContainer';
import DoctorsContainer from './doctors/DoctorsContainer';

const Confirmation = (props) => (
  <div className="schedule-card">
    <FilterContainer onChange={props.handleFilterChange} />
    <div>
      <DoctorsContainer
        clinics={props.clinics}
        selectedDoctors={props.selectedDoctors}
      />
    </div>
  </div>
);

Confirmation.propTypes = {
  clinics: PropTypes.array,
  handleFilterChange: PropTypes.func,
  selectedDoctors: PropTypes.array,
};

export default Confirmation;

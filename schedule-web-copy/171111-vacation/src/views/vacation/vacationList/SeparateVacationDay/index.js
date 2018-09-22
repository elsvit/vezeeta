import React from 'react';
import PropTypes from 'prop-types';

import './index.scss';

const SeparateVacationDay = (props) => (
  <div className="today-separate">
    <div className="today-separate-text">
      {props.value}
    </div>
  </div>
);

SeparateVacationDay.propTypes = {
  value: PropTypes.string,
};

export default SeparateVacationDay;

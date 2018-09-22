import React from 'react';
import PropTypes from 'prop-types';

import './VacationSeparator.scss';

const SeparateVacationDay = (props) => (
  <div className="block-separator">
    <div className="block-separator-text">
      {props.value}
    </div>
  </div>
);

SeparateVacationDay.propTypes = {
  value: PropTypes.string,
};

export default SeparateVacationDay;

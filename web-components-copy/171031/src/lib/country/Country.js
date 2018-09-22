import React from 'react';
import PropTypes from 'prop-types';

import { Text } from '../index';
import './Country.scss';

function Country(props) {
  if (props.loading) {
    return (
      <div className="loading">
        <div className="flag--loading" />
        <div className="name--loading" />
      </div>
    );
  }
  return (
    <div className="country-item">
      <img src={props.flag} className="flag" alt={props.name} />
      <Text className="name">{props.name}</Text>
    </div>
  );
}

Country.propTypes = {
  loading: PropTypes.bool,
  flag: PropTypes.string,
  name: PropTypes.string,
};

export default Country;

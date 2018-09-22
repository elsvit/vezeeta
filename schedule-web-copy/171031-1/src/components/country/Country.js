import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Country.scss';

class Country extends Component {
  render() {
    if (this.props.loading) {
      return (
        <div className="loading">
          <div className="flag--loading" />
          <div className="name--loading" />
        </div>
      );
    } else {
      return (
        <div className="country-item">
          <img src={this.props.flag} className="flag" />
          <span className="name">{this.props.name}</span>
        </div>
      );
    }
  }
}

Country.propTypes = {
  loading: PropTypes.bool,
  flag: PropTypes.string,
  name: PropTypes.string,
  selectedCountryValue: PropTypes.object
};

export default Country;

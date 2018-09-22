import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Confirmation from './Confirmation';

class ConfirmationContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedDoctors: [],
    };
  }

  handleFilterChange = (selectedDoctors) => {
    this.setState({
      selectedDoctors,
    });
  };

  render() {
    return (
      <Confirmation
        clinics={this.props.clinics}
        handleFilterChange={this.handleFilterChange}
        selectedDoctors={this.state.selectedDoctors}
      />
    );
  }
}

ConfirmationContainer.propTypes = {
  clinics: PropTypes.array,
};

const mapStateToProps = (state) => ({
  clinics: state.clinics.Clinics,
});

export default connect(mapStateToProps, null)(ConfirmationContainer);

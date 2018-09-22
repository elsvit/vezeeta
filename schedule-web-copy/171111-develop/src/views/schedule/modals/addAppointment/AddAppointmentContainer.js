import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AddAppointment from './AddAppointment';

class AddAppointmentContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addNewPatient: false,
    };
  }

  changeField = (key, value) => {
    this.setState({
      [key]: value,
    });
  };

  render() {
    return (
      <AddAppointment
        isOpened={this.props.isOpened}
        closeModal={this.props.closeModal}
        addNewPatient={this.state.addNewPatient}
        changeField={this.changeField}
      />
    );
  }
}

AddAppointmentContainer.propTypes = {
  isOpened: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default AddAppointmentContainer;

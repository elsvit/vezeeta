import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import CancelAppointment from './CancelAppointment';

class CancelAppointmentContainer extends Component {
  componentWillReceiveProps(nextProps) {
    if (!this.props.canceled && nextProps.canceled) {
      this.props.closeModal();
    }
  }

  render() {
    return (
      <CancelAppointment
        closeModal={this.props.closeModal}
        cancel={this.props.cancel}
        canceling={this.props.canceling}
      />
    );
  }
}

CancelAppointmentContainer.propTypes = {
  closeModal: PropTypes.func.isRequired,
  cancel: PropTypes.func,
  canceling: PropTypes.bool,
  canceled: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  canceling: state.appointments.canceling,
  canceled: state.appointments.canceled,
});

export default connect(mapStateToProps, null)(CancelAppointmentContainer);

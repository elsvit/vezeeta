import React from 'react';
import PropTypes from 'prop-types';
import { Button, GhostButton } from '@vezeeta/web-components';

import './CancelAppointment.scss';

const CancelAppointment = (props) => (
  <div className="cancel-appointment-info-container">
    <p>Do you really want to cancel this reservation? This cannot be undone.</p>
    <div className="modal-buttons-container">
      <GhostButton onClick={props.closeModal} onKeyDown={props.closeModal}>
        Back
      </GhostButton>
      <Button>Cancel Reservation</Button>
    </div>
  </div>
);

CancelAppointment.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default CancelAppointment;

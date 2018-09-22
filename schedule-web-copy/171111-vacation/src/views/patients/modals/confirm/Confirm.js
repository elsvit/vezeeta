import React from 'react';
import PropTypes from 'prop-types';
import { Button, GhostButton } from '@vezeeta/web-components';

// import ModalWrapper2 from '../ModalWrapper2';
import './Confirm.scss';

const Confirm = (props) => (
  <div className="confirm-info-container">
    <div className="confirm-info-text">
      {props.text}
    </div>

    <div className="modal-buttons-container">

      <GhostButton
        onClick={() => props.submitConfirm(false)}
      >
        No
      </GhostButton>
      <Button
        onClick={() => props.submitConfirm(true, props.data)}
      >
        Yes
      </Button>
    </div>
  </div>
);

Confirm.propTypes = {
  submitConfirm: PropTypes.func.isRequired,
  data: PropTypes.object,
  text: PropTypes.string,
};

Confirm.defaultProps = {
  text: '',
};

export default Confirm;

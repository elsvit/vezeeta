import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button, GhostButton } from '@vezeeta/web-components';

import './Confirm.scss';

class Confirm extends PureComponent {
  render() {
    return (
      <div className="confirm-info-container">
        <div className="modal-buttons-container">
          <GhostButton
            onClick={() => this.props.submitFunc(false)}
          >
            No
          </GhostButton>
          <Button
            onClick={() => this.props.submitFunc(true)}
            type="red"
          >
            Yes
          </Button>
        </div>
      </div>
    );
  }
}

Confirm.propTypes = {
  submitFunc: PropTypes.func,
};

export default Confirm;

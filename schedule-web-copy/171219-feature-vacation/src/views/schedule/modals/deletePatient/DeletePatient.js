import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, GhostButton } from '@vezeeta/web-components';

import '../Modal.scss';

class DeletePatient extends Component {
  componentWillReceiveProps(nextProps) {
    if (
      !this.props.deletedPatient &&
      nextProps.deletedPatient &&
      this.props.onDeleteSuccess
    ) {
      this.props.onDeleteSuccess();
    }
  }

  handleDeleteClick = () => {
    this.props.deletePatient();
  };

  render() {
    return (
      <div className="confirm-action-info-container">
        <p>Do you really want to delete this patient? This cannot be undone.</p>
        <div className="modal-buttons-container">
          <GhostButton
            onClick={this.props.closeModal}
            onKeyDown={this.props.closeModal}
          >
            Back
          </GhostButton>
          <Button
            onClick={this.handleDeleteClick}
            isLoading={this.props.deletingPatient}
          >
            Delete Patient
          </Button>
        </div>
      </div>
    );
  }
}

DeletePatient.propTypes = {
  closeModal: PropTypes.func.isRequired,
  deletePatient: PropTypes.func.isRequired,
  onDeleteSuccess: PropTypes.func,
  deletingPatient: PropTypes.bool,
  deletedPatient: PropTypes.bool,
};

export default DeletePatient;

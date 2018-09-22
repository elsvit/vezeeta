import React, { Component } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import ComboBox from '../../components/comboBox/ComboBox';
import './Reschedule.scss';
import Button from '../../components/buttons/Button';

class Reschedule extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="modal reschedule">
        <Modal isOpen={this.props.openRescheduleModal}>
          <div className="row">
            <div className="col-xs-12">
              <span className="fs-18 grey-text bold">
                Reschedule Appointment
              </span>
            </div>
          </div>

          <hr className="separator" />

          <div className="row">
            <div className="col-xs-12">
              <span className="block bold fs-18 grey-text">Date</span>
              <ComboBox className="full-width" />
            </div>
          </div>

          <div className="h10" />

          <span className="block bold fs-18 grey-text">Time</span>

          <div className="h10" />
          <div className="time-pickers row">
            <div className="col-xs-6">
              <span>From</span>
              <ComboBox
                items={this.props.timeOptions}
                placeholder="Start Time"
                select={this.props.currentStartTime}
                className="full-width"
              />
            </div>

            <div className="col-xs-6">
              <span>To</span>
              <ComboBox
                items={this.props.timeOptions}
                placeholder="End Time"
                select={this.props.currentEndTime}
                className="full-width"
              />
            </div>
          </div>

          <div className="h20" />

          <div className="row">
            <div className="col-xs-6">
              <Button className="white-bg grey-text grey-border full-width">
                <span>Cancel</span>
              </Button>
            </div>

            <div className="col-xs-6">
              <Button className="red-bg white-text full-width">
                <div>Confirm Reschedule</div>
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

Reschedule.propTypes = {
  openRescheduleModal: PropTypes.bool.isRequired,
  timeOptions: PropTypes.array.isRequired,
  currentStartTime: PropTypes.string,
  currentEndTime: PropTypes.string
};

export default Reschedule;

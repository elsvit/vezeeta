import React from 'react';
import Modal from 'react-modal';
// import PropTypes from 'prop-types';
import { ComboBox, Button, Heading, Text } from '@vezeeta/web-components';

import './Reschedule.scss';

function Reschedule() {
  return (
    <div className="modal reschedule">
      <Modal isOpen={this.props.openRescheduleModal}>
        <div className="row">
          <div className="col-xs-12">
            <span className="fs-18 grey-text bold">Reschedule Appointment</span>
          </div>
        </div>

        <hr className="separator" />

        <div className="row">
          <div className="col-xs-12">
            <Heading className="bold">Date</Heading>
            <ComboBox className="full-width" />
          </div>
        </div>

        <div className="h10" />

        <Heading className="bold">Time</Heading>

        <div className="h10" />
        <div className="time-pickers row">
          <div className="col-xs-6">
            <Text>From</Text>
            <ComboBox
              items={this.props.timeOptions}
              placeholder="Start Time"
              select={this.props.currentStartTime}
              className="full-width"
            />
          </div>

          <div className="col-xs-6">
            <Text>To</Text>
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

// Reschedule.propTypes = {
//   openRescheduleModal: PropTypes.bool.isRequired,
//   timeOptions: PropTypes.array.isRequired,
//   currentStartTime: PropTypes.string,
//   currentEndTime: PropTypes.string,
// };

export default Reschedule;

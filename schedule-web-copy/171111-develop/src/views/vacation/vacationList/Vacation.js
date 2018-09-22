import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Heading,
  Subheading,
  Icon,
  Button,
} from '@vezeeta/web-components';
import Colors from '!!sass-variable-loader!../../../shared/Colors.scss'; // eslint-disable-line

import './Vacation.scss';

class VacationRaw extends PureComponent {
  constructor(props) {
    super(props);
    this.onClickDelVacationCancel = this.onClickDelVacationCancel.bind(this);
    this.onClickDelVacationAccept = this.onClickDelVacationAccept.bind(this);
    this.state = {
      deleteVacationShow: false,
      deleteVacationId: '',
    };
  }
  onClickDelVacation(id) {
    console.log('onClickDelVacation10 id', id); // eslint-disable-line
    this.setState({
      deleteVacationShow: true,
      deleteVacationId: id,
    });
  }

  onClickDelVacationAccept() {
    this.props.deleteVacation(this.state.deleteVacationId);
    this.setState({
      deleteVacationShow: false,
      deleteVacationId: '',
    });
  }

  onClickDelVacationCancel() {
    console.log('onClickDelVacationCancel '); // eslint-disable-line
    this.setState({
      deleteVacationShow: false,
    });
  }

  render() {
    const {
      doctorId,
      doctorName,
      roomName,
      vacationStart,
      vacationEnd,
    } = this.props;
    const { deleteVacationShow } = this.state;
    const submitDeleteClass = deleteVacationShow
      ? 'vacation-del-confirm-show'
      : 'vacation-del-confirm-hide';
    return (
      <div>
        <div className="vacation--container">
          <Heading className="doctor-name">{doctorName}</Heading>
          <div className="vacation-details--container">
            <Subheading className="vacation-details">
              {`${vacationStart} - ${vacationEnd}`}
            </Subheading>
          </div>
          <div
            className="vacation-list-icon"
            onClick={() => this.onClickDelVacation(doctorId)}
            onKeyDown={() => {}}
          >
            <Icon
              name="delete"
              width={25}
              height={25}
              color={Colors.vezeetaBlue}
            />
          </div>
          <Subheading className="room">{roomName}</Subheading>
        </div>

        <div className={submitDeleteClass}>
          <div className="raw">
            <div className="col-xs-12 col-md-6">
              <div className="delete-vacation-button-left ">
                <Button
                  className="fs-16 delete-vacation-button-cancel"
                  onClick={this.onClickDelVacationCancel}
                >
                  Cancel
                </Button>
              </div>
            </div>
            <div className="col-xs-12 col-md-6">
              <div className="delete-vacation-button-right">
                <Button
                  className="fs-16"
                  onClick={this.onClickDelVacationAccept}
                >
                  Delete Vacation
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

VacationRaw.propTypes = {
  doctorId: PropTypes.string,
  doctorName: PropTypes.string,
  roomName: PropTypes.string,
  vacationStart: PropTypes.string,
  vacationEnd: PropTypes.string,
  deleteVacation: PropTypes.func,
};

export default VacationRaw;

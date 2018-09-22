import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Heading,
  Subheading,
  Icon,
  Button,
  GhostButton,
} from '@vezeeta/web-components';
import Colors from '!!sass-variable-loader!../../../shared/Colors.scss'; // eslint-disable-line

import './VacationRow.scss';

class VacationRaw extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      deleteVacationShow: false,
      deleteVacationId: '',
    };
  }
  /*
   * setState DelVacation
   * @param (string) id
   */
  onClickDelVacation(id) {
    this.setState({
      deleteVacationShow: true,
      deleteVacationId: id,
    });
  }

  /*
   * Confirm delete vacation
   */
  onClickDelVacationAccept = () => {
    this.props.deleteVacation(this.state.deleteVacationId);
    this.setState({
      deleteVacationShow: false,
      deleteVacationId: '',
    });
  }

  /*
   * Cancel delete vacation
   */
  onClickDelVacationCancel = () => {
    this.setState({
      deleteVacationShow: false,
    });
  };

  render() {
    const {
      accountKey,
      roomKey,
      doctorName,
      roomName,
      vacationFrom,
      vacationTo,
    } = this.props;
    const { deleteVacationShow } = this.state;
    const submitDeleteClass = deleteVacationShow
      ? 'vacation-del-confirm-show'
      : 'vacation-del-confirm-hide';
    return (
      <div className="vacation-list-row">
        <div className="vacation--container">
          <Heading className="doctor-name">{doctorName}</Heading>
          <div className="vacation-details--container">
            <Subheading className="vacation-details">
              {`${vacationFrom} - ${vacationTo}`}
            </Subheading>
          </div>
          <div
            className="vacation-list-icon"
            onClick={() => this.onClickDelVacation({
              accountKey,
              roomKey,
              vacationFrom,
              vacationTo,
            })}
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
          <div className="row">
            <div className="col-xs-6">
              <div className="delete-vacation-button-left ">
                <GhostButton
                  className="fs-16 delete-vacation-button-cancel vacation-button"
                  onClick={this.onClickDelVacationCancel}
                >
                  Cancel
                </GhostButton>
              </div>
            </div>
            <div className="col-xs-6">
              <div className="delete-vacation-button-right">
                <Button
                  className="fs-16 bg-color-red vacation-button"
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
  accountKey: PropTypes.string,
  roomKey: PropTypes.string,
  doctorName: PropTypes.string,
  roomName: PropTypes.string,
  vacationFrom: PropTypes.string,
  vacationTo: PropTypes.string,
  deleteVacation: PropTypes.func,
};

export default VacationRaw;

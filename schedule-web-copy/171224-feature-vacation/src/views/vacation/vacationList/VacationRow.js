import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Heading,
  Subheading,
  Icon,
  // Button,
  // GhostButton,
} from '@vezeeta/web-components';
import Colors from '!!sass-variable-loader!../../../shared/Colors.scss'; // eslint-disable-line

import './VacationRow.scss';

class VacationRaw extends PureComponent {
  render() {
    const {
      accountKey,
      roomKey,
      doctorName,
      roomName,
      vacationFrom,
      vacationTo,
    } = this.props;
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
            onClick={() => this.props.onClickDeleteVacation({
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
  onClickDeleteVacation: PropTypes.func,
};

export default VacationRaw;

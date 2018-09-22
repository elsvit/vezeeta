import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Text, Icon, Button, GhostButton } from '@vezeeta/web-components';
import Colors from '!!sass-variable-loader!../../../../shared/Colors.scss'; // eslint-disable-line

import './index.scss';

class VacationRaw extends PureComponent {
  constructor(props) {
    super(props);
    this.onClickDelVacationCancel = this.onClickDelVacationCancel.bind(this);
    this.onClickDelVacationAccept = this.onClickDelVacationAccept.bind(this);
    this.state = {
      deleteVacationShow: false,
      deleteVacation: '',
    };
  }
  onClickDelVacation(obj) {
    this.setState({
      deleteVacationShow: true,
      deleteVacation: { ...obj },
    });
  }

  onClickDelVacationAccept() {
    this.props.deleteVacation(this.state.deleteVacation);
    this.setState({
      deleteVacationShow: false,
      deleteVacation: '',
    });
  }

  onClickDelVacationCancel() {
    this.setState({
      deleteVacationShow: false,
    });
  }

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
    const submitDeleteClass = deleteVacationShow ? 'vacation-del-confirm-show' : 'vacation-del-confirm-hide';
    return (
      <div className="row appointment vacation-list-row">
        <div className="col-xs-10">
          <div className="row">
            <div className="col-xs-6 vacation-row-left">
              <div className="vacation-list-row-helper-grey">
                <Text className="block bold fs-18 helper-grey">
                  { doctorName }
                </Text>
              </div>
              <div className="vacation-list-row-helper-grey">
                <Text className="block bold fs-16">
                  { roomName }
                </Text>
              </div>
            </div>

            <div className="col-xs-6">
              <Text className="bold fs-16">{vacationFrom}</Text>
              {' - '}
              <Text className="bold fs-16">{vacationTo}</Text>
            </div>
          </div>
        </div>
        <div className="col-xs-2 right-icon">
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
              width={30}
              height={30}
              color={Colors.blueOne}
            />
          </div>
        </div>

        <div
          className={submitDeleteClass}
        >
          <div className="row" >
            <div className="col-xs-6 col-md-6">
              <div className="delete-vacation-button-left ">
                <GhostButton
                  className="fs-18 delete-vacation-button-cancel"
                  onClick={this.onClickDelVacationCancel}
                >
                  Cancel
                </GhostButton>
              </div>
            </div>
            <div className="col-xs-6 col-md-6">
              <div className="delete-vacation-button-right">
                <Button
                  className="fs-18"
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

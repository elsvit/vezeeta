import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Spinner } from '@vezeeta/web-components';
import { loadWorkingHours } from '../../store/actions/room';
import Room from './Room';

const mapStateToProps = (state) => ({
  workingHoursLoaded: state.room.loaded,
  workingHours: state.room.WeekDetails,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      loadWorkingHours,
    },
    dispatch,
  );
class RoomContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      roomKey: props.selectedRoom,
      isLoading: true,
      room: null,
    };
  }
  componentDidMount() {
    const WorkingHoursObj = this.props.roomDoctors.map((doctor) => ({
      AccountKey: doctor.AccountKey,
      RoomKey: this.props.selectedRoom,
    }));
    this.props.loadWorkingHours(WorkingHoursObj);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.workingHoursLoaded === this.state.isLoading) {
      this.setState({
        room: nextProps.workingHours,
        isLoading: false,
      });
    }
    if (nextProps.selectedRoom !== this.props.selectedRoom) {
      const WorkingHoursObj = this.props.roomDoctors.map((doctor) => ({
        AccountKey: doctor.AccountKey,
        RoomKey: nextProps.selectedRoom,
      }));
      this.setState({ isLoading: true }, () => {
        document.querySelector(`input[type=radio]#${nextProps.selectedRoom}`).checked = true;
      });
      this.props.loadWorkingHours(WorkingHoursObj);
    }
  }
  render() {
    if (!this.state.isLoading) {
      return (
        <Room
          room={this.state.room}
          title={this.props.title}
          roomDoctors={this.props.roomDoctors}
          doctorName={this.props.doctorName}
          doctorTypes={this.props.doctorTypes}
          roomKey={this.state.roomKey}
          selectedDoctorType={this.props.selectedDoctorType}
          selectedRoomReservationWindow={this.props.selectedRoomReservationWindow}
          shouldComponentRestart={this.props.shouldComponentRestart}
        />
      );
    }
    return (
      <div
        className="loading-container"
        ref={(spinner) => {
          this.spinner = spinner;
        }}
      >
        <Spinner />
      </div>
    );
  }
}
RoomContainer.propTypes = {
  title: PropTypes.string,
  doctorTypes: PropTypes.array,
  roomDoctors: PropTypes.array,
  doctorName: PropTypes.string,
  selectedDoctorType: PropTypes.number,
  selectedRoomReservationWindow: PropTypes.number,
  selectedRoom: PropTypes.string,
  loadWorkingHours: PropTypes.func,
  shouldComponentRestart: PropTypes.func,
  workingHoursLoaded: PropTypes.bool,
  workingHours: PropTypes.array,
};
export default connect(mapStateToProps, mapDispatchToProps)(RoomContainer);

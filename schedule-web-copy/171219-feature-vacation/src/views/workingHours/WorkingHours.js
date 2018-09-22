import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Filter } from '@vezeeta/web-components';

import FilterUtils from '../utils/Filter';
import ClinicsUtils from '../utils/Clinics';
import { FILTER_NAMES } from '../Constants';
import RoomContainer from './RoomContainer';
import './WorkingHours.scss';

class WorkingHours extends Component {
  constructor(props) {
    super(props);

    const clinics = this.props.clinic;
    const clinicsData = ClinicsUtils.flattenClinics(clinics);

    this.state = {
      branchesSection: FilterUtils.createBranchesSection(
        clinicsData.branches,
        {
          noSearch: true,
          selectFirst: true,
        },
        false,
      ),
      roomsSection: FilterUtils.createRadioRoomsSection(
        ClinicsUtils.getRoomsInBranches(
          clinicsData.branches,
          clinicsData.branches[0].BranchKey,
        ),
        { selectedValue: clinicsData.branches[0].Rooms[0].RoomKey },
      ),
      selectedBranchValue: [clinicsData.branches[0].BranchKey],
      selectedRoomsIds: clinicsData.branches[0].Rooms[0].RoomKey,
      selectedDoctorsIds: '',
      selectedDoctorType: 1,
      selectedRoomReservationWindow: '',
      roomScheduleTypes: this.props.roomScheduleTypes,
      roomReservationWindow: this.props.roomReservationWindow,
      allDoctors: clinicsData.doctors,
    };
  }

  componentDidMount() {
    this.getScheduleType(this.state.selectedRoomsIds);
    this.roomReservationWindow(this.state.selectedRoomsIds);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.clinic.length > 0 && this.state.selectedBranchValue) {
      this.setState((state) => {
        const nextState = {
          ...state,
        };
        const clinicsData = ClinicsUtils.flattenClinics(nextProps.clinic);

        if (nextProps.filteredClinics.length > 0) {
          const filteredClinicsData = ClinicsUtils.flattenClinics(nextProps.filteredClinics);
          const selectedBranchesValues = filteredClinicsData.branches.map((branch) => branch.BranchKey);
          const selectedRoomsIds = filteredClinicsData.rooms.map((room) => room.RoomKey);

          nextState.roomsSection = FilterUtils.createRadioRoomsSection(ClinicsUtils.getRoomsInBranches(
            clinicsData.branches,
            selectedBranchesValues,
          ));

          nextState.doctorsSection = FilterUtils.createDoctorsSection(ClinicsUtils.getDoctorsInRooms(clinicsData.rooms, selectedRoomsIds));
        }

        if (this.props.clinic.length === 0) {
          nextState.branchesSection = FilterUtils.createBranchesSection(clinicsData.branches);
        }

        return nextState;
      });
    }
  }

  shouldComponentUpdate(_, nextState) {
    if (
      this.state.selectedBranchValue !== nextState.selectedBranchValue ||
      this.state.selectedRoomsIds !== nextState.selectedRoomsIds ||
      this.state.selectedDoctorsIds !== nextState.selectedDoctorsIds
    ) {
      return false;
    }

    return true;
  }

  getScheduleType(roomkey) {
    this.state.roomScheduleTypes.map((room) => {
      if (room.RoomKey === roomkey) {
        this.setState({
          selectedDoctorType: room.ScheduleType,
        });
      }
    });
  }
  roomReservationWindow(roomkey) {
    this.state.roomReservationWindow.map((room) => {
      if (room.RoomKey === roomkey) {
        this.setState({
          selectedRoomReservationWindow: room.ReservationWindow,
        });
      }
    });
  }

  handleFilterChange(filterData) {
    const { selectedBranchValue, selectedRoomsIds } = this.state;

    const {
      [FILTER_NAMES.BRANCHES]: nextSelectedBranchValue,
      [FILTER_NAMES.ROOMS]: nextSelectedRoomsIds,
      [FILTER_NAMES.DOCTORS]: nextSelectedDoctorsIds,
    } = filterData;

    const roomsInBranch = ClinicsUtils.flattenClinics(this.props.clinic).branches.map((branch) => {
      if (branch.BranchKey === nextSelectedBranchValue) return branch.BranchKey;
    });

    const selectedBranchChanged =
      nextSelectedBranchValue !== selectedBranchValue;
    const selectedRoomsChanged = selectedRoomsIds;
    this.setState(
      {
        selectedBranchValue: nextSelectedBranchValue,
        selectedRoomsIds: selectedBranchChanged
          ? ClinicsUtils.getRoomsInBranches(
            ClinicsUtils.flattenClinics(this.props.clinic).branches,
            roomsInBranch,
          )[0].RoomKey
          : nextSelectedRoomsIds,
        selectedDoctorsIds: nextSelectedDoctorsIds,
      },
      () => {
        const newFilterData = {
          ...filterData,
          [FILTER_NAMES.ROOMS]: selectedBranchChanged
            ? ClinicsUtils.getRoomsInBranches(
              ClinicsUtils.flattenClinics(this.props.clinic).branches,
              roomsInBranch,
            )[0].RoomKey
            : nextSelectedRoomsIds,
          [FILTER_NAMES.DOCTORS]:
            selectedBranchChanged || selectedRoomsChanged
              ? undefined
              : nextSelectedDoctorsIds,
        };

        this.props.filterClinics(this.props.clinic, newFilterData);
        this.getScheduleType(this.state.selectedRoomsIds);
        this.roomReservationWindow(this.state.selectedRoomsIds);
      },
    );
  }

  render() {
    const { branchesSection, roomsSection } = this.state;

    if (!this.state.isLoading) {
      return (
        <div className="schedule-card working-hours-container">
          <div>
            <Filter
              title="Filter By"
              sections={[branchesSection, roomsSection]}
              onChange={(data) => this.handleFilterChange(data)}
            />
          </div>
          <div className="room-container">
            <RoomContainer
              title={this.props.defaultRoom.title}
              doctorName={this.props.defaultRoom.branchName}
              doctorTypes={[
                {
                  name: 'doctorType',
                  value: 1,
                  component: <div>On Appointment</div>,
                },
                {
                  name: 'doctorType',
                  value: 2,
                  component: <div>FIFO</div>,
                },
              ]}
              roomDoctors={this.state.allDoctors}
              selectedRoom={this.state.selectedRoomsIds}
              selectedDoctorType={this.state.selectedDoctorType}
              selectedRoomReservationWindow={this.state.selectedRoomReservationWindow}
              shouldComponentRestart={this.props.shouldComponentRestart}
            />
          </div>
        </div>
      );
    }
  }
}

WorkingHours.propTypes = {
  clinic: PropTypes.array,
  defaultRoom: PropTypes.object,
  filteredClinics: PropTypes.array,
  roomScheduleTypes: PropTypes.array,
  roomReservationWindow: PropTypes.array,
  filterClinics: PropTypes.func,
  shouldComponentRestart: PropTypes.func,
};

export default WorkingHours;

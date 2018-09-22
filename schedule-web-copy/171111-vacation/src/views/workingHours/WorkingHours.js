import React, { Component } from 'react';
import PropTypes from 'prop-types';
import update from 'immutability-helper';
import { Filter } from '@vezeeta/web-components';

import FilterUtils from '../utils/Filter';
import ClinicsUtils from '../utils/Clinics';
// import { FILTER_NAMES } from '../Constants';
import Room from './Room';

import './WorkingHours.scss';

class WorkingHours extends Component {
  constructor(props) {
    super(props);

    const clinicsData = ClinicsUtils.flattenClinics(this.props.clinic);

    this.state = {
      clinic: clinicsData,
      branchesSection: FilterUtils.createBranchesSection(clinicsData.branches, {
        selectedValue: clinicsData.branches[0].BranchKey,
      }),
      roomsSection: FilterUtils.createRadioRoomsSection(clinicsData.rooms, {
        selectedValue: clinicsData.rooms[0].RoomKey,
      }),
    };
  }

  componentDidMount() {
    console.log(
      this.state.clinic,
      this.state.branchesSection,
      this.state.roomsSection,
    );
  }

  handleFilterChange = (filterData) => {
    this.state.clinic.branches.map((branch) => {
      if (branch.BranchKey === filterData.BRANCHES) {
        this.setState({
          clinic: update(this.state.clinic, {
            branches: { $set: [branch] },
          }),
        });

        console.log(this.state.clinic);
        /* this.setState({
          branchesSection: FilterUtils.createBranchesSection(
            this.state.clinic.branches,
            {
              selectedValue: this.state.clinic.branches[0].BranchKey,
            },
          ),
          roomsSection: FilterUtils.createRadioRoomsSection(
            this.state.clinic.rooms,
            {
              selectedValue: this.state.clinic.rooms[0].RoomKey,
            },
          ),
        }); */
      }
    });
  };

  render() {
    const { branchesSection, roomsSection } = this.state;

    if (!this.state.isLoading) {
      return (
        <div className="working-hours-container flex-row">
          <div className="filter-container">
            <Filter
              title="Filter By"
              sections={[branchesSection, roomsSection]}
              onChange={(data) => this.handleFilterChange(data)}
            />
          </div>
          <div className="room-container">
            <Room
              title={this.props.defaultRoom.title}
              doctorName={this.props.defaultRoom.branchName}
              doctorTypes={this.props.defaultRoom.doctorTypes}
              selectedDoctorType={this.props.defaultRoom.selectedValue}
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
};

export default WorkingHours;

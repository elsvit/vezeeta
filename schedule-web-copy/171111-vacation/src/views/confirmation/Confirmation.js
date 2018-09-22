import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Filter } from '@vezeeta/web-components';

import DoctorsContainer from './doctors/DoctorsContainer';
import FilterUtils from '../utils/Filter';
import ClinicsUtils from '../utils/Clinics';
import { FILTER_NAMES, ALL_BRANCHES_VALUE } from '../Constants';

class Confirmation extends Component {
  constructor(props) {
    super(props);

    const { clinics } = this.props;
    const clinicsData = ClinicsUtils.flattenClinics(clinics);

    this.state = {
      branchesSection: FilterUtils.createBranchesSection(clinicsData.branches, {
        selectedValue: ALL_BRANCHES_VALUE,
      }),
      roomsSection: FilterUtils.createRoomsSection(clinicsData.rooms, {
        isAllSelected: true,
      }),
      doctorsSection: FilterUtils.createDoctorsSection(clinicsData.doctors, {
        isAllSelected: true,
      }),
      selectedBranchValue: ALL_BRANCHES_VALUE,
      selectedRoomsIds: [],
      selectedDoctorsIds: [],
    };
  }

  componentWillMount() {
    this.props.loadClinics();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.clinics.length > 0) {
      this.setState((state) => {
        const nextState = {
          ...state,
        };
        const clinicsData = ClinicsUtils.flattenClinics(nextProps.clinics);

        if (nextProps.filteredClinics.length > 0) {
          const { resetRoomsSection, resetDoctorsSection } = this.state;
          const filteredClinicsData = ClinicsUtils.flattenClinics(nextProps.filteredClinics);
          const selectedBranchesValues = filteredClinicsData.branches.map((branch) => branch.BranchKey);
          const selectedRoomsIds = filteredClinicsData.rooms.map((room) => room.RoomKey);

          nextState.roomsSection = FilterUtils.createRoomsSection(
            ClinicsUtils.getRoomsInBranches(
              clinicsData.branches,
              selectedBranchesValues,
            ),
            {
              isAllSelected: resetRoomsSection,
              resetSection: resetRoomsSection,
            },
          );

          nextState.doctorsSection = FilterUtils.createDoctorsSection(
            ClinicsUtils.getDoctorsInRooms(clinicsData.rooms, selectedRoomsIds),
            {
              isAllSelected: resetDoctorsSection,
              resetSection: resetDoctorsSection,
            },
          );
        }

        if (this.props.clinics.length === 0) {
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

  handleFilterChange(filterData) {
    const { selectedBranchValue, selectedRoomsIds } = this.state;
    const {
      [FILTER_NAMES.BRANCHES]: nextSelectedBranchValue,
      [FILTER_NAMES.ROOMS]: nextSelectedRoomsIds,
      [FILTER_NAMES.DOCTORS]: nextSelectedDoctorsIds,
    } = filterData;
    const selectedBranchChanged =
      nextSelectedBranchValue !== selectedBranchValue;
    const selectedRoomsChanged =
      selectedRoomsIds &&
      nextSelectedRoomsIds &&
      !nextSelectedRoomsIds.every((id) => selectedRoomsIds.includes(id));

    this.setState(
      {
        selectedBranchValue: nextSelectedBranchValue,
        selectedRoomsIds: nextSelectedRoomsIds,
        selectedDoctorsIds: nextSelectedDoctorsIds,
        resetRoomsSection: selectedBranchChanged,
        resetDoctorsSection: selectedBranchChanged || selectedRoomsChanged,
      },
      () => {
        const newFilterData = {
          ...filterData,
          [FILTER_NAMES.ROOMS]: selectedBranchChanged
            ? undefined
            : nextSelectedRoomsIds,
          [FILTER_NAMES.DOCTORS]:
            selectedBranchChanged || selectedRoomsChanged
              ? undefined
              : nextSelectedDoctorsIds,
        };
        this.props.filterClinics(this.props.clinics, newFilterData);
      },
    );
  }

  render() {
    const { branchesSection, roomsSection, doctorsSection } = this.state;
    const filteredClinicsData = ClinicsUtils.flattenClinics(this.props.filteredClinics);

    return (
      <div className="schedule-card">
        <div>
          <Filter
            title="Filter By"
            sections={[branchesSection, roomsSection, doctorsSection]}
            onChange={(data) => this.handleFilterChange(data)}
          />
        </div>
        <div>
          <DoctorsContainer
            selectedDoctors={ClinicsUtils.getDoctorsInfo(filteredClinicsData.rooms)}
          />
        </div>
      </div>
    );
  }
}

Confirmation.propTypes = {
  clinics: propTypes.array,
  filteredClinics: propTypes.array,
  loadClinics: propTypes.func,
  filterClinics: propTypes.func,
};

export default Confirmation;

import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Filter } from '@vezeeta/web-components';

import FilterUtils from '../utils/Filter';
import ClinicsUtils from '../utils/Clinics';
import { FILTER_NAMES } from '../Constants';
import LoadingFilter from '../loadingFilter/LoadingFilter';

class FilterContainer extends Component {
  constructor(props) {
    super(props);

    // Check if clinics already loaded and get initial state in that case
    const filterData = this.props.clinicsLoaded
      ? this.getInitialFilterDataOnClinicsLoad(this.props.clinics)
      : {};

    this.state = {
      selectedBranch: { value: null, selectFirst: false },
      selectedRooms: { isAllSelected: true },
      selectedDoctors: { isAllSelected: true },
      selectedDoctorsInfo: [],
      filteredClinics: [],
      ...filterData,
    };
  }

  /**
   * If the clinics are loading for the first time set initial filter state
   * when loading is complete
   */
  componentWillReceiveProps(nextProps) {
    if (!this.state.selectedBranch.value && nextProps.clinicsLoaded) {
      const filterData = this.getInitialFilterDataOnClinicsLoad(nextProps.clinics);

      this.setState(filterData);
    }
  }

  /**
   * Call onChange callback on every selectedDoctorsInfo update
   */
  componentDidUpdate(_, prevState) {
    if (
      prevState.selectedDoctorsInfo !== this.state.selectedDoctorsInfo &&
      this.props.onChange
    ) {
      this.props.onChange(this.state.selectedDoctorsInfo);
    }
  }

  /**
   * Get initial filter state with first branch selected
   * @param {array} clinics
   * @returns {object} initial filter state representation
   */
  getInitialFilterDataOnClinicsLoad = (clinics) => {
    const clinicsData = ClinicsUtils.flattenClinics(clinics);
    const firstBranchKey = clinicsData.branches[0].BranchKey;
    const filterData = {
      [FILTER_NAMES.BRANCHES]: firstBranchKey,
    };
    const filteredClinics = FilterUtils.filterClinics(clinics, filterData);

    return {
      selectedBranch: { value: firstBranchKey, selectFirst: true },
      filteredClinics,
    };
  };

  /**
   * Filter component onChange handler
   * @param {object} filterData
   */
  handleFilterChange = (filterData) => {
    const selectedBranch = this.state.selectedBranch.value;
    const selectedRoomsIds = this.state.selectedRooms.selectedIds;
    const {
      [FILTER_NAMES.BRANCHES]: nextSelectedBranch,
      [FILTER_NAMES.ROOMS]: nextSelectedRoomsIds,
      [FILTER_NAMES.DOCTORS]: nextSelectedDoctorsIds,
    } = filterData;

    const selectedBranchChanged = nextSelectedBranch !== selectedBranch;
    const selectedRoomsChanged =
      selectedRoomsIds &&
      nextSelectedRoomsIds &&
      !nextSelectedRoomsIds.every((id) => selectedRoomsIds.includes(id));

    // Reset selected rooms if selected branch changed
    const nextSelectedRooms = selectedBranchChanged
      ? { isAllSelected: true, resetSection: true }
      : { selectedIds: nextSelectedRoomsIds };

    // Reset selected doctors if selected branch or room changed
    const nextSelectedDoctors =
      selectedBranchChanged || selectedRoomsChanged
        ? {
          isAllSelected: true,
          resetSection: true,
        }
        : { selectedIds: nextSelectedDoctorsIds };

    // Exclude rooms data if selected branch changed and exclude doctors data // if selected branch or doctors changed
    const adaptedFilterData = {
      ...filterData,
      [FILTER_NAMES.ROOMS]: selectedBranchChanged
        ? undefined
        : nextSelectedRoomsIds,
      [FILTER_NAMES.DOCTORS]:
        selectedBranchChanged || selectedRoomsChanged
          ? undefined
          : nextSelectedDoctorsIds,
    };

    const filteredClinics = FilterUtils.filterClinics(
      this.props.clinics,
      adaptedFilterData,
    );
    const filteredClinicsData = ClinicsUtils.flattenClinics(filteredClinics);
    const selectedDoctorsInfo = ClinicsUtils.getDoctorsInfo(filteredClinicsData.rooms);
    this.setState({
      selectedBranch: { value: nextSelectedBranch },
      selectedRooms: nextSelectedRooms,
      selectedDoctors: nextSelectedDoctors,
      filteredClinics,
      selectedDoctorsInfo,
    });
  };

  render() {
    const { clinics } = this.props;
    const {
      filteredClinics,
      selectedBranch,
      selectedRooms,
      selectedDoctors,
    } = this.state;
    const clinicsData = ClinicsUtils.flattenClinics(clinics);
    const filteredClinicsData = ClinicsUtils.flattenClinics(filteredClinics);
    const branchesSection = FilterUtils.createBranchesSection(
      clinicsData.branches,
      { selectFirst: selectedBranch.selectFirst },
    );
    const roomsSection = FilterUtils.createRoomsSection(
      ClinicsUtils.getRoomsInBranches(
        clinicsData.branches,
        filteredClinicsData.branches.map((branch) => branch.BranchKey),
      ),
      selectedRooms,
    );
    const doctorsSection = FilterUtils.createDoctorsSection(
      ClinicsUtils.getDoctorsInRooms(
        clinicsData.rooms,
        filteredClinicsData.rooms.map((room) => room.RoomKey),
      ),
      selectedDoctors,
    );

    return (
      <div>
        {this.props.clinicsLoaded ? (
          <Fragment>
            <div>
              <Filter
                title="Filter By"
                sections={[branchesSection, roomsSection, doctorsSection]}
                onChange={this.handleFilterChange}
              />
            </div>
          </Fragment>
        ) : (
          <LoadingFilter />
        )}
      </div>
    );
  }
}

FilterContainer.propTypes = {
  clinics: PropTypes.array,
  clinicsLoaded: PropTypes.bool,
  onChange: PropTypes.func,
};

const mapStateToProps = (state) => ({
  clinics: state.clinics.Clinics,
  clinicsLoaded: state.clinics.loaded,
});

export default connect(mapStateToProps, null)(FilterContainer);

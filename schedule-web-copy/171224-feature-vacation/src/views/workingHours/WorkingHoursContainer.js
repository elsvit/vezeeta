import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { Spinner } from '@vezeeta/web-components';

import WorkingHours from './WorkingHours';
import { filterClinics } from '../../store/actions/clinics';
import { getRoomDetails } from '../../store/actions/workinghours';

const mapStateToProps = (state) => ({
  clinicsLoaded: state.clinics.loaded,
  clinics: state.clinics,
  roomScheduleTypes: state.workinghours.roomScheduleTypes,
  roomReservationWindow: state.workinghours.roomReservationWindow,
  filteredClinics: state.clinics.filteredList,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getRoomDetails,
      filterClinics,
    },
    dispatch,
  );

class WorkingHoursContainer extends Component {
  constructor(props) {
    super(props);
    this.reRenderComponent = this.reRenderComponent.bind(this);
    this.state = {
      isLoading: true,
      clinics: null,
    };
  }

  componentDidMount() {
    if (this.props.clinics.Clinics.length > 0) {
      this.props.getRoomDetails(this.props.clinics.Clinics);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.clinicsLoaded === false &&
      nextProps.clinicsLoaded === this.state.isLoading &&
      this.state.clinics !== nextProps.clinics.Clinics
    ) {
      this.setState({
        clinics: nextProps.clinics.Clinics,
        isLoading: false,
      });
      this.props.getRoomDetails(nextProps.clinics.Clinics);
    }
  }

  reRenderComponent() {
    this.setState({ isLoading: true });
    this.props.getRoomDetails(this.props.clinics.Clinics);
  }

  render() {
    if (!this.state.isLoading) {
      const clinics = this.state.clinics;
      return (
        <WorkingHours
          clinic={clinics}
          roomScheduleTypes={this.props.roomScheduleTypes}
          roomReservationWindow={this.props.roomReservationWindow}
          defaultRoom={clinics[0].Branches[0].Rooms[0]}
          filteredClinics={this.props.filteredClinics}
          filterClinics={this.props.filterClinics}
          shouldComponentRestart={this.reRenderComponent}
        />
      );
    }
    return (
      <div className="loading-container">
        <Spinner />
      </div>
    );
  }
}
WorkingHoursContainer.propTypes = {
  clinics: PropTypes.object,
  clinicsLoaded: PropTypes.bool,
  filteredClinics: PropTypes.array,
  roomScheduleTypes: PropTypes.array,
  roomReservationWindow: PropTypes.array,
  filterClinics: PropTypes.func,
  getRoomDetails: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(WorkingHoursContainer);

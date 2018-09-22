import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import VacationList from './VacationList';

const mapStateToProps = (state) => ({
  selectedIds: state.vacation.Filtered.doctors.selectedIds,
  vacation: state.vacation.Vacation,
  startDate: state.vacation.startDate,
  endDate: state.vacation.endDate,
  minDateDefault: state.vacation.minDateDefault,
  maxDateDefault: state.vacation.maxDateDefault,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
}, dispatch);

class VacationListContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      startDate: this.props.startDate,
      endDate: this.props.endDate,
    };
  }

  componentWillReceiveProps(nextProps) {
    const newState = {};
    let check = false;
    if (nextProps.startDate !== this.props.startDate) {
      newState.startDate = nextProps.startDate;
      check = true;
    }
    if (nextProps.endDate !== this.props.endDate) {
      newState.endDate = nextProps.endDate;
      check = true;
    }
    if (check) {
      this.setState(newState);
    }
    console.log('VacationListContainer43 componentWillReceiveProps startDate', this.props.startDate, ':', nextProps.startDate);
  }

  deleteVacation(val) {
    console.log('VacationListContainer deleteVacation', val);
  }

  render() {
    const {
      selectedIds,
      vacation,
      minDateDefault,
      maxDateDefault,
    } = this.props;
    const {
      startDate,
      endDate,
    } = this.state;
    const startDateMod = !startDate ? minDateDefault : startDate;
    const endDateMod = !endDate ? maxDateDefault : endDate;
    console.log('VacationListContainer30 startDate', startDate, ' endDate', endDate, ' minDateDefault', minDateDefault, ' maxDateDefault', maxDateDefault);
    return (
      <VacationList
        vacation={vacation}
        startDate={startDateMod}
        endDate={endDateMod}
        selectedIds={selectedIds}
        deleteVacation={this.deleteVacation}
      />
    );
  }
}

VacationListContainer.propTypes = {
  selectedIds: PropTypes.array,
  vacation: PropTypes.array,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  minDateDefault: PropTypes.string,
  maxDateDefault: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(VacationListContainer);

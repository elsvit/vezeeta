import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Calendar } from '@vezeeta/web-components';
// import Calendar from '../calendar/Calendar';

import {
  setVacationFilterDates,
  createVacationFiltered,
} from '../../../store/actions/vacation';

const mapStateToProps = (state) => ({
  state,
  startDate: state.vacation.startDate,
  endDate: state.vacation.endDate,
  minDate: state.vacation.minDateDefault,
  maxDate: state.vacation.maxDateDefault,
  clinics: state.clinics,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  setVacationFilterDates,
  createVacationFiltered,
}, dispatch);

class VacationCalendarContainer extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.startDate !== this.props.startDate || nextProps.endDate !== this.props.endDate) {
      this.props.createVacationFiltered({ clinics: this.props.clinics });
    }
  }

  calendarOnChange = (data) => {
    this.props.setVacationFilterDates(data);
  }

  render() {
    const {
      minDate,
      maxDate,
    } = this.props;
    return (
      <Calendar
        onChange={this.calendarOnChange}
        minDate={minDate}
        maxDate={maxDate}
        startDate=""
        endDate=""
      />
    );
  }
}

VacationCalendarContainer.propTypes = {
  setVacationFilterDates: PropTypes.func,
  createVacationFiltered: PropTypes.func,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  minDate: PropTypes.string,
  maxDate: PropTypes.string,
  clinics: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(VacationCalendarContainer);

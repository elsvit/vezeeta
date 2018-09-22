import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
// import { Calendar } from '@vezeeta/web-components';
import Calendar from '../calendar/Calendar';

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
    console.log('VacationCalendarContainer30 componentWillReceiveProps');
  }

  calendarOnChange = (data) => {
    console.log('VacationCalendarContainer34 calendarOnChange', data);
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
  setVacationFilterDates: PropTypes.func, // eslint-disable-line
  createVacationFiltered: PropTypes.func, // eslint-disable-line
  startDate: PropTypes.string, // eslint-disable-line
  endDate: PropTypes.string, // eslint-disable-line
  minDate: PropTypes.string, // eslint-disable-line
  maxDate: PropTypes.string, // eslint-disable-line
  clinics: PropTypes.object,
};

// class VacationCalendarContainer = () => <Calendar callback={this.calendarFunc.bind(this)} />;
export default connect(mapStateToProps, mapDispatchToProps)(VacationCalendarContainer);

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon, Text } from '@vezeeta/web-components';
// import { Calendar } from '@vezeeta/web-components/lib/Calendar';
// import { Icon } from '../../icon/Icon';
// import { Text } from '../../typography/Typography';
// import { Calendar } from '../../calendar/Calendar';

import Calendar from '../calendar/Calendar';
import './DateInput.scss';

class DateInput extends Component {
  constructor(props) {
    super(props);
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.state = {
      showCalendar: this.props.showCalendar,
      date: this.props.date,
    };
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillReceiveProps(nextProps) {
    const stateObj = {};
    let check = false;
    if (nextProps.showCalendar === false) {
      stateObj.showCalendar = false;
      check = true;
    }
    if (nextProps.date !== this.props.date) {
      stateObj.date = nextProps.date;
      check = true;
    }
    if (check) {
      this.setState(stateObj);
    }
  }
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  onChangeCalendar = (e) => {
    console.log('DateInput47 onChangeCalendar', e.date);
    const stateObj = {
      showCalendar: !this.props.oneClickSelect,
    };
    stateObj.date = this.props.enableClear && this.state.date ? '' : e.date;
    this.props.onChange({ date: e.date });
    this.setState(stateObj);
  };

  onClickDateInput = () => {
    this.setState({
      showCalendar: !this.state.showCalendar,
    });
  };

  onClickCloseCalendar = () => {
    this.setState({
      showCalendar: false,
    });
  };

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({
        showCalendar: false,
      });
    }
  }

  render() {
    const showCalendarClass = this.state.showCalendar
      ? 'calendar-active'
      : 'calendar-hide';
    let label = this.props.placeholder;
    if (this.props.label) {
      label = this.props.label;
    } else if (this.state.date) {
      label = this.state.date;
    }
    const className = 'fs-18 '.concat(this.props.className);
    return (
      <div className="input-date" ref={this.setWrapperRef}>
        <div
          className="input-date-icon"
          onClick={this.onClickDateInput}
          onKeyDown={() => {}}
        >
          <Icon name="note" width={20} height={20} color="blue" />
        </div>
        <div
          className="input-date-text"
          onClick={this.onClickDateInput}
          onKeyDown={() => {}}
        >
          <Text className={className}>{label}</Text>
        </div>
        <div className={showCalendarClass}>
          <div className="calendar-close-icon-wrap">
            <div
              className="calendar-close-icon"
              onClick={this.onClickCloseCalendar}
              onKeyDown={() => {}}
            >
              <Icon name="close" width={15} height={15} />
            </div>
          </div>
          <Calendar
            onChange={this.onChangeCalendar}
            date={this.state.date}
            type="single"
            minDate={this.props.minDate}
            maxDate={this.props.maxDate}
            dateFormat={this.props.dateFormat}
            id={this.props.id}
          />
        </div>
      </div>
    );
  }
}

DateInput.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  placeholder: PropTypes.string, // show, if label empty
  label: PropTypes.string, // label (on the right of calendar icon)
  onChange: PropTypes.func,
  date: PropTypes.string,
  minDate: PropTypes.string,
  maxDate: PropTypes.string,
  dateFormat: PropTypes.oneOf(['yyyy-mm-dd', 'mm/dd/yyyy', '']),
  showCalendar: PropTypes.bool, // false: hide Calendar
  oneClickSelect: PropTypes.bool, // true: auto-close Calendar after select date, false: doesn`t auto-close
  enableClear: PropTypes.bool, // false: each click- input, true: first click- input, second- clear
};

DateInput.defaultProps = {
  oneClickSelect: true,
  enableClear: false,
};

export default DateInput;

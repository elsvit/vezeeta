import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import Icon from '../icon/IconDrawer';
import { Icon } from '@vezeeta/web-components';
import Colors from '!!sass-variable-loader!../../../shared/Colors.scss'; // eslint-disable-line
// import Colors from '!!sass-variable-loader!../shared/Colors.scss'; // eslint-disable-line
import './Calendar.scss';

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = this.getStartState(this.props);
  }

  componentWillReceiveProps(nextProps) {
    const arr = [];
    if (this.props.minDate !== nextProps.minDate) arr.push({ key: 'minDate', val: nextProps.minDate });
    if (this.props.maxDate !== nextProps.maxDate) arr.push({ key: 'maxDate', val: nextProps.maxDate });
    if (this.props.type === 'single') {
      if (this.props.date !== nextProps.date) arr.push({ key: 'date', val: nextProps.date });
    } else {
      if (this.props.startDate !== nextProps.startDate) arr.push({ key: 'startDate', val: nextProps.startDate });
      if (this.props.endDate !== nextProps.endDate) arr.push({ key: 'endDate', val: nextProps.endDate });
    }
    const arrLength = arr.length;
    if (arrLength > 0) {
      const stateObj = {};
      for (let i = 0; i < arrLength; i += 1) {
        const key = arr[i].key;
        let val = arr[i].val;
        if (this.checkMMDDYYYY(val)) {
          val = this.transformMMDDYYYYtoYYYYMMDD(val);
        }
        if (this.checkYYYYMMDD(val) || val === '') {
          stateObj[key] = val;
        }
      }
      this.setState(stateObj);
    }
  }

  /**
   * event handlers
   */
  onClickRightArrowCalendar = () => {
    const currentMonthNum = this.state.currentMonthNum;
    let year = +this.state.currentYear;
    let month = +currentMonthNum + 1;
    if (currentMonthNum === 12) {
      month = 1;
      year += 1;
    }
    this.setState({
      currentMonthNum: +month,
      currentMonthName: this.getMonthNames()[month - 1],
      currentYear: +year,
    });
  };

  onClickLeftArrowCalendar = () => {
    const currentMonthNum = this.state.currentMonthNum;
    let year = +this.state.currentYear;
    let month = +currentMonthNum - 1;
    if (currentMonthNum === 1) {
      month = 12;
      year -= 1;
    }
    this.setState({
      currentMonthNum: +month,
      currentMonthName: this.getMonthNames()[month - 1],
      currentYear: +year,
    });
  };

  onClickCalendar = (e) => {
    const fullId = e.target.id;
    const id = fullId.substr(this.props.id.length);
    if (this.checkYYYYMMDD(id)) {
      const {
        dateFormat,
        err,
      } = this.state;
      const minDate = this.state.minDate;
      const maxDate = this.state.maxDate;
      if (this.props.type === 'single') {
        if (
          this.compareDate(minDate, id) &&
          this.compareDate(id, maxDate)
        ) {
          const date = id;
          this.setState({
            date,
          });
          const dateOut = date === '' ? '' : this.transformDate(date, dateFormat);
          this.props.onChange({ date: dateOut, err });
        } else if (!this.compareDate(minDate, id)) {
          this.switchErrorPopUp(this.state.errMassageLessThenMinDate.concat(this.state.minDate)); // eslint-disable-line
        } else if (!this.compareDate(id, maxDate)) {
          this.switchErrorPopUp(this.state.errMassageMoreThenMxaDate.concat(this.state.maxDate)); // eslint-disable-line
        }
      } else {
        let startDate = this.state.startDate;
        let endDate = this.state.endDate;
        if (endDate === '') {
          if (startDate === '') {
            if (
              this.compareDate(minDate, id) &&
              this.compareDate(id, maxDate)
            ) {
              startDate = id;
              this.setState({
                startDate,
              });
              const dateOut = !startDate ? '' : this.transformDate(startDate, dateFormat);
              this.props.onChange({ startDate: dateOut, err });
            }
          } else if (
            this.compareDate(startDate, id) &&
            this.compareDate(id, maxDate)
          ) {
            endDate = id;
            this.setState({
              endDate,
            });
            const startDateOut = startDate === '' ? '' : this.transformDate(startDate, dateFormat);
            const endDateOut = endDate === '' ? '' : this.transformDate(endDate, dateFormat);
            this.props.onChange({ startDate: startDateOut, endDate: endDateOut, err });
          } else if (
            this.compareDate(minDate, id) &&
            this.compareDate(id, startDate)
          ) {
            endDate = startDate;
            startDate = id;
            this.setState({
              startDate,
              endDate,
            });
            const startDateOut = startDate === '' ? '' : this.transformDate(startDate, dateFormat);
            const endDateOut = endDate === '' ? '' : this.transformDate(endDate, dateFormat);
            this.props.onChange({ startDate: startDateOut, endDate: endDateOut, err });
          } else if (!this.compareDate(minDate, id)) {
            this.switchErrorPopUp(this.state.errMassageLessThenMinDate.concat(this.state.minDate)); // eslint-disable-line
          } else if (!this.compareDate(id, maxDate)) {
            this.switchErrorPopUp(this.state.errMassageMoreThenMxaDate.concat(this.state.maxDate)); // eslint-disable-line
          }
        } else if (startDate !== '') {
          startDate = '';
          endDate = '';
          this.setState({
            startDate,
            endDate,
          });
          this.props.onChange({ startDate: '', endDate: '', err });
        }
      }
    }
  }


  onClickErrorPopUp = () => {
    this.setState({
      showErrorPopUp: false,
      errPopUp: '',
    });
  }

  onChangeTitleYear = (e) => {
    const currentYear = e.target.value;
    const minDateObj = new Date(this.state.minDate);
    const minYear = minDateObj.getFullYear();
    const maxDateObj = new Date(this.state.maxDate);
    const maxYear = maxDateObj.getFullYear();
    const checkTitleYear = +currentYear >= +minYear && +currentYear <= +maxYear;
    if (/^\d{0,4}$/.test(currentYear) && +currentYear < 3000) {
      this.setState({
        currentYear: +currentYear,
        checkTitleYear,
      });
    }
  }

  getStartState = () => {
    const minDateDefault = '01/01/1900';
    const maxDateDefault = '12/31/2099';
    const now = new Date();
    const err = [];
    const monthNames = this.getMonthNames();
    const monthNum = now.getMonth();
    const monthName = monthNames[now.getMonth()];
    const year = now.getFullYear();
    let minDate = this.props.minDate ? this.props.minDate : minDateDefault;
    let maxDate = this.props.maxDate ? this.props.maxDate : maxDateDefault;
    let dateFormat = this.props.dateFormat;
    let date = this.props.date;
    let startDate = this.props.startDate;
    const dateArr = [minDate, maxDate];
    let endDate = this.props.endDate;
    if (this.props.type === 'single') {
      dateArr.push(date);
    } else {
      dateArr.push(startDate);
      dateArr.push(endDate);
    }
    if (dateFormat === '') {
      dateFormat = this.setDateFormat(dateArr);
    }
    if (minDate !== '' && !this.checkYYYYMMDD(minDate)) {
      if (this.checkMMDDYYYY(minDate)) {
        minDate = this.transformMMDDYYYYtoYYYYMMDD(minDate);
      } else {
        err.push('minDate format != yyyy-mm-dd or mm/dd/yyyy');
        minDate = minDateDefault;
      }
    }
    if (maxDate !== '' && !this.checkYYYYMMDD(maxDate)) {
      if (this.checkMMDDYYYY(maxDate)) {
        maxDate = this.transformMMDDYYYYtoYYYYMMDD(maxDate);
      } else {
        err.push('maxDate format != yyyy-mm-dd or mm/dd/yyyy');
        maxDate = maxDateDefault;
      }
    }

    if (
      minDate !== '' &&
      maxDate !== '' &&
      !this.compareDate(minDate, maxDate)
    ) {
      maxDate = maxDateDefault >= minDate ? minDateDefault : minDate;
    }
    if (this.props.type === 'single') {
      if (date !== '' && !this.checkYYYYMMDD(date)) {
        if (this.checkMMDDYYYY(date)) {
          date = this.transformMMDDYYYYtoYYYYMMDD(date);
        } else {
          err.push('date format != yyyy-mm-dd or mm/dd/yyyy');
          startDate = '';
        }
      }
    } else {
      if (startDate !== '' && !this.checkYYYYMMDD(startDate)) {
        if (this.checkMMDDYYYY(startDate)) {
          startDate = this.transformMMDDYYYYtoYYYYMMDD(startDate);
        } else {
          err.push('startDate format != yyyy-mm-dd or mm/dd/yyyy');
          startDate = '';
        }
      }
      if (startDate === '') endDate = '';
      if (endDate !== '' && !this.checkYYYYMMDD(endDate)) {
        if (this.checkMMDDYYYY(endDate)) {
          endDate = this.transformMMDDYYYYtoYYYYMMDD(endDate);
        } else {
          err.push('endDate format != yyyy-mm-dd or mm/dd/yyyy');
          endDate = '';
        }
      }
      if (
        startDate !== '' &&
        endDate !== '' &&
        !this.compareDate(startDate, endDate)
      ) {
        startDate = '';
        endDate = '';
      }
    }

    return {
      now,
      currentMonthNum: monthNum + 1,
      currentMonthName: monthName,
      currentYear: year,
      minDate,
      maxDate,
      date,
      startDate,
      endDate,
      dateFormat,
      err,
      weekDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      showErrorPopUp: false,
      errPopUp: '',
      errMassageLessThenMinDate: 'Input date less then min date ',
      errMassageMoreThenMxaDate: 'Input date more then max date ',
      checkTitleYear: true,
    };
  }

  getMonthNames = () => [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  // setDateFormat([minDate, maxDate, startDate, endDate]) {
  setDateFormat(dateArr) {
    const dateArrLen = dateArr.length;
    let dateFormat = 'mm/dd/yyyy';
    let sumYYYYMMDD = 0;
    for (let i = 0; i < dateArrLen; i += 1) {
      if (dateArr[i] === '' || this.checkYYYYMMDD(dateArr[i])) sumYYYYMMDD += 1;
    }
    if (sumYYYYMMDD === dateArrLen) {
      dateFormat = 'yyyy-mm-dd';
    }
    return dateFormat;
  }

  switchErrorPopUp = (err) => {
    this.setState({
      showErrorPopUp: true,
      errPopUp: err,
    });
    setTimeout(() => {
      this.setState({
        showErrorPopUp: false,
        errPopUp: '',
      });
    }, 6000);
  }

  createDayStyles = (obj) => {
    const val = obj.val;
    const now = obj.now;
    const type = obj.type;
    const date = obj.date;
    const startDate = obj.startDate;
    const endDate = obj.endDate;
    const arr = val.split('-');
    const startDateObj = startDate !== '' ? new Date(startDate) : '';
    const endDateObj = startDate !== '' ? new Date(endDate) : '';
    let classDiv = '';
    if (type === 'single') {
      if (val === date) {
        classDiv += ' calendar-one-date ';
      }
    } else if (startDate !== '') {
      const valDate = new Date(val);
      if (val === startDate && val === endDate) {
        classDiv += ' calendar-one-date ';
      } else if (val === startDate) {
        classDiv += ' calendar-start-date ';
      } else if (endDate !== '') {
        if (valDate > startDateObj && valDate < endDateObj) {
          classDiv += ' calendar-diapason-date ';
        } else if (val === endDate) {
          classDiv += ' calendar-end-date ';
        }
      }
    }
    const todayClass =
      +arr[0] === +now.getFullYear() &&
      +arr[1] === now.getMonth() + 1 &&
      +arr[2] === +now.getDate()
        ? 'calendar-today'
        : '';
    classDiv += todayClass;
    return classDiv;
  }

  findDaysInMonth(month, year) {
    if (
      month === 'January' ||
      month === 'March' ||
      month === 'May' ||
      month === 'July' ||
      month === 'August' ||
      month === 'October' ||
      month === 'December'
    ) {
      return 31;
    }
    if (
      month === 1 ||
      month === 3 ||
      month === 5 ||
      month === 7 ||
      month === 8 ||
      month === 10 ||
      month === 12
    ) {
      return 31;
    } else if (
      month === 'April' ||
      month === 'June' ||
      month === 'September' ||
      month === 'November'
    ) {
      return 30;
    } else if (
      month === 4 ||
      month === 6 ||
      month === 9 ||
      month === 11
    ) {
      return 30;
    } else if ((year - 2016) % 4 !== 0) {
      return 28;
    }
    return 29;
  }

  checkYYYYMMDD(val) {
    const arr = val.split('-');
    if (arr.length === 3) {
      if (!Number.isNaN(+arr[0])) {
        if (+arr[1] >= 1 && +arr[1] <= 12) {
          const daysInMonth = this.findDaysInMonth(+arr[1], +arr[0]);
          if (+arr[2] >= 1 && +arr[2] <= daysInMonth) return true;
        }
      }
    }
    return false;
  }

  checkMMDDYYYY(val) {
    const arr = val.split('/');
    if (arr.length === 3) {
      if (!Number.isNaN(+arr[2])) {
        if (+arr[0] >= 1 && +arr[0] <= 12) {
          const daysInMonth = this.findDaysInMonth(+arr[0], +arr[2]);
          if (+arr[1] >= 1 && +arr[1] <= daysInMonth) return true;
        }
      }
    }
    return false;
  }

  /**
   * Return date in dateFormat format
   * @param {string} date
   * @param {string} dateFormat
   */
  transformDate(date, dateFormat) {
    switch (dateFormat) {
    case ('mm/dd/yyyy'):
      if (this.checkMMDDYYYY(date)) return date;
      if (this.checkYYYYMMDD(date)) return this.transformYYYYMMDDtoMMDDYYYY(date);
      break;
    case ('yyyy-mm-dd'):
      if (this.checkYYYYMMDD(date)) return date;
      if (this.checkMMDDYYYY(date)) return this.transformMMDDYYYYtoYYYYMMDD(date);
      break;
    default:
      return false;
    }
  }

  transformMMDDYYYYtoYYYYMMDD(mmddyyyy) {
    const arr = mmddyyyy.split('/');
    return arr[2] + '-' + arr[0] + '-' + arr[1]; // eslint-disable-line
  }

  transformYYYYMMDDtoMMDDYYYY(yyyymmdd) {
    const arr = yyyymmdd.split('-');
    return arr[1] + '/' + arr[2] + '/' + arr[0]; // eslint-disable-line
  }

  /**
   * Compare dates: if startDate <= endDate return true
   * @param {string} startDate
   * @param {string} endDate
   */
  compareDate(startDate, endDate) {
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);
    const startYear = startDateObj.getFullYear();
    const startMonth = startDateObj.getMonth();
    const startDateNum = startDateObj.getDate();
    const startTime = (startYear * 365) + (startMonth * 30) + startDateNum;
    const endYear = endDateObj.getFullYear();
    const endMonth = endDateObj.getMonth();
    const endDateNum = endDateObj.getDate();
    const endTime = (endYear * 365) + (endMonth * 30) + endDateNum;
    if (startTime > endTime) return false;
    return true;
  }

  render() {
    const cellNums = 42;
    const {
      now,
      date,
      startDate,
      endDate,
      currentMonthNum,
      currentMonthName,
      currentYear,
      weekDays,
      errPopUp,
      showErrorPopUp,
      checkTitleYear,
    } = this.state;
    const { type } = this.props;
    const prevMonthAr = [];
    const thisMonthAr = [];
    const nextMonthAr = [];
    const monthDays = this.findDaysInMonth(currentMonthNum, currentYear);
    const thisMonthDate = new Date(currentYear + '-' + currentMonthNum); // eslint-disable-line
    const thisMonth1Day = thisMonthDate.getDay();
    for (let i = 1; i <= monthDays; i += 1) {
      thisMonthAr.push(currentYear + '-' + currentMonthNum + '-' + i); // eslint-disable-line
    }
    let prevMonthNum = currentMonthNum - 1;
    let prevYear = currentYear;
    if (currentMonthNum === 1) {
      prevYear = currentYear - 1;
      prevMonthNum = 12;
    }
    const prevMonthDays = this.findDaysInMonth(prevMonthNum, prevYear);
    const prevMonthShowDays = thisMonth1Day;
    for (
      let i = (prevMonthDays - prevMonthShowDays) + 1;
      i <= prevMonthDays;
      i += 1
    ) {
      prevMonthAr.push(prevYear + '-' + prevMonthNum + '-' + i); // eslint-disable-line
    }
    const nextMonthNum = (currentMonthNum % 12) + 1;
    const nextYear = currentMonthNum === 12 ? currentYear + 1 : currentYear;
    const nextMonthShowDays = cellNums - prevMonthShowDays - monthDays;
    for (let i = 1; i <= nextMonthShowDays; i += 1) {
      nextMonthAr.push(nextYear + '-' + nextMonthNum + '-' + i); // eslint-disable-line
    }
    let titleYearClass = 'calendar-header-title-year-input ';
    if (!checkTitleYear) { titleYearClass += ' year--dange'; }
    return (
      <div
        className="calendar-wrapper"
      >
        <div className="calendar-header">
          <div
            className="calendar-left-arrow"
            onClick={this.onClickLeftArrowCalendar}
            onKeyDown={() => {}}
          >
            <Icon
              name="arrow_left"
              width={15}
              height={15}
              color={Colors.blueOne}
            />
          </div>
          <div className="calendar-header-title">
            <div className="calendar-header-title-month">{currentMonthName}</div>
            <div className="calendar-header-title-year">
              <input
                className={titleYearClass}
                type="year"
                value={currentYear}
                onChange={this.onChangeTitleYear}
              />
            </div>
          </div>
          <div
            className="calendar-right-arrow"
            onClick={this.onClickRightArrowCalendar}
            onKeyDown={() => {}}
          >
            <Icon
              name="arrow_right"
              width={15}
              height={15}
              color={Colors.blueOne}
            />
          </div>
        </div>
        <div
          className="calendar-body"
          onClick={this.onClickCalendar}
          onKeyDown={() => {}}
        >
          <div
            className={showErrorPopUp ? 'calendar-error-popup-show' : 'calendar-error-popup-hide'}
            onClick={this.onClickErrorPopUp}
            onKeyDown={() => {}}
          >
            {errPopUp}
          </div>
          <div className="calendar-week-days">
            <div className="week-names">
              {weekDays.map((day) => <div key={day} className="calendar-weekday fs-14">{day}</div>)}
            </div>
          </div>
          <div className="calendar-days">
            {prevMonthAr.map((val) => {
              const arr = val.split('-');
              let classDiv =
                'calendar-day pointer calendar-opacity-50 ';
              classDiv += this.createDayStyles({
                val,
                now,
                type,
                date,
                startDate,
                endDate,
              });
              return (
                <div key={val} id={this.props.id.concat(val)} className={classDiv.concat(' fs-14')}>
                  {arr[2]}
                </div>
              );
            })}
            {thisMonthAr.map((val) => {
              const arr = val.split('-');
              let classDiv = 'calendar-day pointer ';
              classDiv += this.createDayStyles({
                val,
                now,
                type,
                date,
                startDate,
                endDate,
              });
              return (
                <div key={val} id={this.props.id.concat(val)} className={classDiv}>
                  {arr[2]}
                </div>
              );
            })}
            {nextMonthAr.map((val) => {
              const arr = val.split('-');
              let classDiv =
                'calendar-day pointer calendar-opacity-50 ';
              classDiv += this.createDayStyles({
                val,
                now,
                type,
                date,
                startDate,
                endDate,
              });
              return (
                <div key={val} id={this.props.id.concat(val)} className={classDiv}>
                  {arr[2]}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

Calendar.propTypes = {
  onChange: PropTypes.func.isRequired,
  minDate: PropTypes.string,
  maxDate: PropTypes.string,
  date: PropTypes.string,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  dateFormat: PropTypes.oneOf(['yyyy-mm-dd', 'mm/dd/yyyy', '']),
  type: PropTypes.oneOf(['range', 'single']),
  id: PropTypes.string,
};

Calendar.defaultProps = {
  minDate: '2000-01-01',
  maxDate: '2100-01-01',
  startDate: '', // for type: range
  endDate: '', // for type: range
  date: '', // for type: single
  dateFormat: '',
  type: 'range',
  id: '', // add string id to calendar-cell-id
};

export default Calendar;

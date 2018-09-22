import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import update from 'immutability-helper';
import { ComboBox, Subheading, Icon, TimeInput } from '@vezeeta/web-components';
import Colors from '!!sass-variable-loader!../../shared/Colors.scss'; // eslint-disable-line
const durationItems = [
  {
    data: {
      placeholder: '5 Minutes',
      value: 5,
      searchable: '5 Minutes',
    },
    component: <div>5 Minutes</div>,
  },
  {
    data: {
      placeholder: '10 Minutes',
      value: 10,
      searchable: '10 Minutes',
    },
    component: <div>10 Minutes</div>,
  },
  {
    data: {
      placeholder: '15 Minutes',
      value: 15,
      searchable: '15 Minutes',
    },
    component: <div>15 Minutes</div>,
  },
  {
    data: {
      placeholder: '20 Minutes',
      value: 20,
      searchable: '20 Minutes',
    },
    component: <div>20 Minutes</div>,
  },
  {
    data: {
      placeholder: '30 Minutes',
      value: 30,
      searchable: '30 Minutes',
    },
    component: <div>30 Minutes</div>,
  },
  {
    data: {
      placeholder: '40 Minutes',
      value: 40,
      searchable: '40 Minutes',
    },
    component: <div>40 Minutes</div>,
  },
  {
    data: {
      placeholder: '45 Minutes',
      value: 45,
      searchable: '45 Minutes',
    },
    component: <div>45 Minutes</div>,
  },
  {
    data: {
      placeholder: '60 Minutes',
      value: 60,
      searchable: '60 Minutes',
    },
    component: <div>60 Minutes</div>,
  },
  {
    data: {
      placeholder: '75 Minutes',
      value: 75,
      searchable: '75 Minutes',
    },
    component: <div>75 Minutes</div>,
  },
  {
    data: {
      placeholder: '90 Minutes',
      value: 90,
      searchable: '90 Minutes',
    },
    component: <div>90 Minutes</div>,
  },
  {
    data: {
      placeholder: '105 Minutes',
      value: 105,
      searchable: '105 Minutes',
    },
    component: <div>105 Minutes</div>,
  },
  {
    data: {
      placeholder: '120 Minutes',
      value: 120,
      searchable: '120 Minutes',
    },
    component: <div>120 Minutes</div>,
  },
];
class Shift extends Component {
  constructor(props) {
    super(props);

    this.state = {
      doctorTypeKey: this.props.doctorTypeKey,
      shiftDetails: this.props.shiftDetails,
      roomDoctors: this.props.roomDoctors.map((doctor) => ({
        data: {
          placeholder: doctor.DoctorName,
          value: doctor.AccountKey,
          searchable: '',
          img: '',
        },
        component: <div>{doctor.DoctorName}</div>,
      })),
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.doctorTypeKey !== nextProps.doctorTypeKey) {
      this.setState({
        doctorTypeKey: nextProps.doctorTypeKey,
      });
    }
    if (this.state.roomDoctors !== nextProps.roomDoctors) {
      this.setState({
        roomDoctors: nextProps.roomDoctors.map((doctor) => ({
          data: {
            placeholder: doctor.DoctorName,
            value: doctor.AccountKey,
            searchable: '',
            img: '',
          },
          component: <div>{doctor.DoctorName}</div>,
        })),
      });
    }

    if (this.state.shiftDetails !== nextProps.shiftDetails) {
      this.setState({
        shiftDetails: nextProps.shiftDetails,
      });
    }
    this.getInputsValues();
  }

  shouldComponentUpdate() {
    return false;
  }

  getInputsValues = () => {
    const shift = {
      StartTime: this.shiftFrom.state.apiValue,
      EndTime: this.shiftTo.state.apiValue,
      AccountKey: this.shiftDoctor.state.apiValue,
      SlotDuration: this.visitType.state.apiValue,
      RoomKey: this.props.roomKey,
      ScheduleId: null,
      ShiftType: this.state.doctorTypeKey,
    };

    // this.setState({
    //   shiftDetails: [shift],
    // });

    this.setState({
      shiftDetails: { index: this.props.shiftIndex, shift },
    });
  };

  removeShift = () => {
    this.props.removeShift(this.props.shiftIndex);
  };

  render() {
    let removeButton = null;
    const visitTypeText = 'Duration';
    if (this.props.shiftIndex !== 0) {
      removeButton = (
        <div
          className="remove"
          onClick={this.removeShift}
          onKeyPress={() => {}}
        >
          <Icon name="delete" color={Colors.vezeetaBlue} width={15} />
        </div>
      );
    }

    return (
      <div className={this.props.className}>
        <div className="shift-details">
          <div className="row-1">
            <div className="col-1">
              <TimeInput
                items={[]}
                placeholder="Start Time"
                select={this.state.shiftDetails.StartTime === null ? ('08:00:00') : (this.state.shiftDetails.StartTime)}
                ref={(comboBox) => {
                  this.shiftFrom = comboBox;
                }}
                timeDuration={this.visitType ? (this.visitType.state.apiValue) : (30)}
                onChange={this.getInputsValues}
                noSearch
              />
              <Subheading className="to">To</Subheading>
              <TimeInput
                items={[]}
                placeholder="End Time"
                select={this.state.shiftDetails.EndTime === null ? ('13:00:00') : (this.state.shiftDetails.EndTime)}
                ref={(comboBox) => {
                  this.shiftTo = comboBox;
                }}
                timeDuration={this.visitType ? (this.visitType.state.apiValue) : (30)}
                onChange={this.getInputsValues}
                noSearch
              />
            </div>
            <ComboBox
              items={this.state.roomDoctors}
              placeholder="Select Doctor"
              select={this.state.shiftDetails.AccountKey}
              ref={(comboBox) => {
                this.shiftDoctor = comboBox;
              }}
              onChange={() => {
                this.getInputsValues();
              }}
              noIcon
            />
          </div>
          <div className="row-2">
            <div className="col-1">
              <Subheading className="visit-type-text">
                {visitTypeText}
              </Subheading>
              <ComboBox
                items={durationItems}
                placeholder="Duration"
                select={this.state.shiftDetails.SlotDuration === null ? (30) : (this.state.shiftDetails.SlotDuration)}
                ref={(comboBox) => {
                  this.visitType = comboBox;
                }}
                onChange={() => { this.getInputsValues(); }}
                noIcon
              />
            </div>
          </div>
        </div>
        {removeButton}
      </div>
    );
  }
}

Shift.propTypes = {
  className: PropTypes.string,
  doctorTypeKey: PropTypes.number,
  roomDoctors: PropTypes.array,
  roomKey: PropTypes.string,
  shiftDetails: PropTypes.object,
  shiftIndex: PropTypes.number,
  removeShift: PropTypes.func,
};

Shift.defaultProps = {
  className: '',
};

export default Shift;

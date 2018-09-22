import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ComboBox, Subheading, Icon } from '@vezeeta/web-components';
import Colors from '!!sass-variable-loader!../../shared/Colors.scss'; // eslint-disable-line

class Shift extends Component {
  constructor(props) {
    super(props);

    this.state = {
      doctorTypeKey: this.props.doctorTypeKey,
      shiftDetails: this.props.shiftDetails,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.doctorTypeKey !== nextProps.doctorTypeKey) {
      this.setState({
        doctorTypeKey: nextProps.doctorTypeKey,
      });
    }

    if (this.state.shiftDetails !== nextProps.shiftDetails) {
      this.setState({
        shiftDetails: nextProps.shiftDetails,
      });
    }
  }

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

    // if (this.state.doctorTypeKey === 'key4') {
    //   visitTypeText = 'Duration';
    // } else {
    //   visitTypeText = 'Slots';
    // }

    return (
      <div className={this.props.className}>
        <div className="shift-details">
          <div className="row-1">
            <div className="col-1">
              <ComboBox
                placeholder="6:00 PM"
                select={this.state.shiftDetails.StartTime}
                ref={(comboBox) => {
                  this.shiftFrom = comboBox;
                }}
                noIcon
              />
              <Subheading className="to">To</Subheading>
              <ComboBox
                placeholder="11:00 PM"
                select={this.state.shiftDetails.EndTime}
                ref={(comboBox) => {
                  this.shiftTo = comboBox;
                }}
                noIcon
              />
            </div>
            <ComboBox
              placeholder="Select Doctor"
              select={this.state.shiftDetails.AccountKey}
              ref={(comboBox) => {
                this.shiftFrom = comboBox;
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
                placeholder="30:00 min"
                select={this.state.shiftDetails.SlotDuration}
                ref={(comboBox) => {
                  this.visitType = comboBox;
                }}
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
  doctorTypeKey: PropTypes.string,
  shiftDetails: PropTypes.object,
  shiftIndex: PropTypes.number,
  removeShift: PropTypes.func,
};

Shift.defaultProps = {
  className: '',
};

export default Shift;

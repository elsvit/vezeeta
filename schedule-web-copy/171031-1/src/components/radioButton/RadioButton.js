import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Option from './Option';
import './RadioButton.scss';

class RadioButton extends Component {
  constructor(props) {
    super(props);

    this.updateValue = this.updateValue.bind(this);
    this.showErrorMessage = this.showErrorMessage.bind(this);
    this.hideErrorMessage = this.hideErrorMessage.bind(this);
    this.isValid = this.isValid.bind(this);
    this.validate = this.validate.bind(this);
    this.focus = this.focus.bind(this);

    this.state = {
      value: undefined,
      selected: this.props.selected || undefined,
      isLoading: this.props.options ? false : true,
      errorMessage: 'Select an Option'
    };
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.options !== this.props.options &&
      nextProps.options.length !== 0
    ) {
      this.setState({
        isLoading: false
      });
    }
  }

  /**
   * Updates this.state.value and call this.props.setData and
   * this.props.onChange if found
   * @param {number} value
   */
  updateValue(value) {
    this.setState(
      {
        value: value
      },
      () => {
        if (this.props.setData) {
          this.props.setData(this.state.value);
        }

        if (this.props.onChange) {
          this.props.onChange();
        }
      }
    );
  }

  /**
   * Interfaces that should be in all components that require user's input
   */
  showErrorMessage() {}
  hideErrorMessage() {}
  isValid() {}
  validate() {}
  focus() {}

  render() {
    let options = null;

    if (!this.state.isLoading) {
      options = this.props.options.map((option, optionId) => {
        return (
          <Option
            key={optionId}
            value={option.value}
            checked={option.value == this.props.selected ? true : false}
            updateValue={this.updateValue}
            component={option.component}
            disable={option.disable ? true : false}
          />
        );
      });
    } else {
      options = (
        <div className={`lazy-loading ${this.props.listAlignment}`}>
          <div>
            <div className="circle" />
            <div className="text" />
          </div>
          <div>
            <div className="circle" />
            <div className="text" />
          </div>
        </div>
      );
    }

    return (
      <ul className={`radio-button-list ${this.props.listAlignment}`}>
        {options}
      </ul>
    );
  }
}

RadioButton.propTypes = {
  selected: PropTypes.number,
  options: PropTypes.array,
  listAlignment: PropTypes.string,
  setData: PropTypes.func,
  onChange: PropTypes.func
};

export default RadioButton;

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Option from './Option';
import './RadioButton.scss';

class RadioButton extends Component {
  constructor(props) {
    super(props);

    this.updateValue = this.updateValue.bind(this);
    this.getInputValue = this.getInputValue.bind(this);
    this.showErrorMessage = this.showErrorMessage.bind(this);
    this.hideErrorMessage = this.hideErrorMessage.bind(this);
    this.isValid = this.isValid.bind(this);
    this.validate = this.validate.bind(this);
    this.focus = this.focus.bind(this);

    this.state = {
      value: undefined,
      isLoading: !this.props.options,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.options !== this.props.options &&
      nextProps.options.length !== 0
    ) {
      this.setState({
        isLoading: false,
      });
    }
  }

  /**
   * Get radio button value
   */
  getInputValue() {
    return this.state.value;
  }

  /**
   * Updates this.state.value and call this.props.setData and
   * this.props.onChange if found
   * @param value
   */
  updateValue(value) {
    this.setState(
      {
        value,
      },
      () => {
        if (this.props.setData) {
          this.props.setData(this.state.value);
        }

        if (this.props.onChange) {
          this.props.onChange();
        }
      },
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
      options = this.props.options.map((option, index) => (
        <Option
          key={index}
          value={option.value}
          name={option.name}
          checked={option.value === this.props.selected}
          updateValue={this.updateValue}
          component={option.component}
          disable={!!option.disable}
        />
      ));
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
      <ul
        className={`radio-button-list ${this.props.listAlignment} ${this.props
          .className}`}
      >
        {options}
      </ul>
    );
  }
}

RadioButton.propTypes = {
  className: PropTypes.string,
  selected: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  options: PropTypes.array.isRequired,
  listAlignment: PropTypes.string,
  setData: PropTypes.func,
  onChange: PropTypes.func,
};

RadioButton.defaultProps = {
  className: '',
  listAlignment: 'flex-col',
};

export default RadioButton;

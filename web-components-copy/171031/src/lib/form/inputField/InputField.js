import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Icon } from '../../index';
import Colors from '!!sass-variable-loader!../../shared/Colors.scss'; // eslint-disable-line
import './InputField.scss';

class InputField extends Component {
  constructor(props) {
    super(props);

    this.showErrorMessage = this.showErrorMessage.bind(this);
    this.hideErrorMessage = this.hideErrorMessage.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onTyping = this.onTyping.bind(this);
    this.validate = this.validate.bind(this);
    this.isValid = this.isValid.bind(this);

    this.state = {
      errorMessage: '',
      isDanger: false,
      iconColor: Colors.defaultGrey,
      value: this.props.value,
      dangerLock: false,
    };

    InputField.defaultProps = {
      className: '',
      value: '',
    };
  }

  /**
  * Changing the icon color depending on input state
  */
  onFocus() {
    if (this.props.center) {
      this.input.removeAttribute('placeholder');
    }

    if (!this.state.isDanger) {
      this.setState({ iconColor: Colors.vezeetaBlue });
    }
  }

  /**
  * Validating the input value and change the icon color to default
  */
  onBlur() {
    if (this.validate()) {
      if (this.props.setData) {
        this.props.setData(this.getInputValue());
      }
    }

    if (this.props.onBlur) {
      this.props.onBlur();
    }
  }

  /**
  * Update input's value while writing
  * @param {event} e
  */
  onTyping(e) {
    let value = e.target.value;
    if (this.props.formatOnTyping) {
      value = this.props.formatOnTyping(value);
    }
    this.setState({
      value,
      dangerLock: false,
    });

    if (this.props.onTyping) {
      this.props.onTyping();
    }

    if (!this.isValid()) {
      this.validate();
    }
  }

  /**
  * Returns the current input value
  */
  getInputValue() {
    return this.input.value;
  }

  /**
  * Change the error message and change the isDanger state to true
  * @param {string} message
  */
  showErrorMessage(message, dangerLock) {
    this.setState({
      errorMessage: message,
      isDanger: true,
      iconColor: Colors.vezeetaRed,
      dangerLock: dangerLock || false,
    });
  }

  /**
  * Change the idDanger state to false
  */
  hideErrorMessage() {
    if (!this.state.dangerLock) {
      this.setState({
        isDanger: false,
        iconColor: Colors.defaultGrey,
      });
    }
  }

  /**
  * Get regex tests from validation object and run all tests
  * Shows error message if false
  * Update the data in the parent component
  */
  validate() {
    let shouldBreak = false;
    const result = true;

    if (!this.props.disabled) {
      if (this.state.value === '' || this.state.value === undefined) {
        this.showErrorMessage(`${this.props.placeholder} is required`);
      } else if (this.props.validationChecks) {
        this.props.validationChecks.map((check) => {
          if (shouldBreak) return;
          const regexResult = check.regex.test(this.getInputValue());

          if (!regexResult) {
            shouldBreak = true;
            this.showErrorMessage(check.errorMessage);
          } else {
            this.hideErrorMessage();
          }
        });
      } else {
        this.hideErrorMessage();
      }
    }

    return result;
  }

  /**
   * Move focus to the input
   */
  focus() {
    this.input.focus();
  }

  /**
   * Return if the component isDanger
   */
  isValid() {
    if (
      this.state.isDanger ||
      this.state.value === '' ||
      this.state.value === undefined
    ) {
      return false;
    }
    return true;
  }

  render() {
    let dangerClass;
    let icon;
    let noIconClass = '';
    let centerClass = '';
    let helpers;
    let maxLength;
    let helperIconClass = '';
    let disabledClass = '';
    const className = ` ${this.props.className}`;

    if (!this.state.isDanger) {
      dangerClass = '';
    } else {
      dangerClass = ' input-field--danger';
    }

    if (this.props.icon) {
      icon = (
        <div className="icon-container">
          <Icon
            name={this.props.icon}
            width={this.props.iconWidth}
            color={this.state.iconColor}
          />
        </div>
      );
    } else {
      icon = <div />;
      noIconClass = ' field-no-icon';
    }

    if (this.props.center) {
      centerClass = ' placeholder--center';
    }

    if (this.props.helperIcon || this.props.helperImages) {
      helperIconClass = ' helper-icon';
    }

    if (this.props.helperIcon) {
      helpers = (
        <div className="helperIcon">
          <Icon
            name={this.props.helperIcon}
            width={this.props.helperIconWidth}
            color={this.state.iconColor}
          />
        </div>
      );
    }

    if (this.props.helperImages) {
      helpers = (
        <div className="helperImages">
          {this.props.helperImages.map((helper, index) => (
            <img
              key={index}
              src={helper.image}
              height={helper.height}
              alt={helper.image}
            />
          ))}
        </div>
      );
    }

    if (this.props.maxLength) {
      maxLength = this.props.maxLength;
    } else {
      maxLength = undefined;
    }

    if (this.props.disabled) {
      disabledClass = ' input-field--disabled';
    }

    if (this.props.type === 'hidden') {
      return (
        <input
          type={this.props.type}
          value={this.state.value}
          id={this.props.inputId}
          autoComplete={this.props.autoComplete}
          name={this.props.name}
          ref={(input) => {
            this.input = input;
          }}
        />
      );
    }
    return (
      <div className={`input-field${className}${dangerClass}${disabledClass}`}>
        {icon}
        <input
          className={`${noIconClass}${centerClass}${helperIconClass}`}
          type={this.props.type}
          placeholder={this.props.placeholder}
          onBlur={this.onBlur}
          onFocus={this.onFocus}
          maxLength={maxLength}
          ref={(input) => {
            this.input = input;
          }}
          value={this.state.value}
          onChange={this.onTyping}
          id={this.props.inputId}
          autoComplete={this.props.autoComplete}
          name={this.props.name}
          disabled={this.props.disabled}
        />
        {helpers}
        <span>{this.state.errorMessage}</span>
      </div>
    );
  }
}

InputField.defaultProps = {
  className: '',
  value: '',
};

InputField.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string.isRequired,
  icon: PropTypes.string,
  iconWidth: PropTypes.number,
  center: PropTypes.bool,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string,
  validationChecks: PropTypes.array,
  setData: PropTypes.func,
  onBlur: PropTypes.func,
  onTyping: PropTypes.func,
  helperImages: PropTypes.array,
  helperIcon: PropTypes.string,
  helperIconWidth: PropTypes.number,
  maxLength: PropTypes.number,
  formatOnTyping: PropTypes.func,
  inputId: PropTypes.string,
  autoComplete: PropTypes.string,
  name: PropTypes.string,
  disabled: PropTypes.bool,
};

export default InputField;

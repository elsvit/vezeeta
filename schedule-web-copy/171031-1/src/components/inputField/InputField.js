import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Icon } from '../Components';
import Colors from '!!sass-variable-loader!../base/Colors.scss';
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
      value: this.props.value
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
      value: value
    });

    if (this.props.onTyping) {
      this.props.onTyping();
    }
  }

  /**
  * Change the error message and change the isDanger state to true
  * @param {string} message
  */
  showErrorMessage(message) {
    this.setState({
      errorMessage: message,
      isDanger: true,
      iconColor: Colors.vezeetaRed
    });
  }

  /**
  * Change the idDanger state to false
  */
  hideErrorMessage() {
    this.setState({
      isDanger: false,
      iconColor: Colors.defaultGrey
    });
  }

  /**
  * Returns the current input value
  */
  getInputValue() {
    return this.input.value;
  }

  /**
  * Get regex tests from validation object and run all tests
  * Shows error message if false
  * Update the data in the parent component
  */
  validate() {
    let shouldBreak = false;
    let result = true;

    if (this.state.value === '' || this.state.value === undefined) {
      this.showErrorMessage(`${this.props.placeholder} is required`);
    } else if (this.props.validationChecks) {
      this.props.validationChecks.map(check => {
        if (shouldBreak) return;
        let result = check.regex.test(this.getInputValue());

        if (!result) {
          shouldBreak = true;
          this.showErrorMessage(check.errorMessage);
        } else {
          this.hideErrorMessage();
        }
      });
    } else {
      this.hideErrorMessage();
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
    )
      return false;
    return true;
  }

  render() {
    let dangerClass,
      icon,
      noIconClass,
      centerClass,
      helpers,
      maxLength,
      helperIconClass;

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
      noIconClass = '';
    } else {
      icon = <div />;
      noIconClass = 'field-no-icon';
    }

    if (this.props.center) {
      centerClass = 'placeholder--center';
    }

    if (this.props.helperIcon || this.props.helperImages) {
      helperIconClass = 'helper-icon';
    } else {
      helperIconClass = '';
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
          {this.props.helperImages.map((helper, index) => {
            return <img key={index} src={helper.image} height={helper.height} />;
          })}
        </div>
      );
    }

    if (this.props.maxLength) {
      maxLength = this.props.maxLength;
    } else {
      maxLength = undefined;
    }

    return (
      <div className={`input-field ${dangerClass}`}>
        {icon}
        <input
          className={`${noIconClass} ${centerClass} ${helperIconClass}`}
          type={this.props.type}
          placeholder={this.props.placeholder}
          onBlur={this.onBlur}
          onFocus={this.onFocus}
          maxLength={maxLength}
          ref={input => (this.input = input)}
          value={this.state.value}
          onChange={this.onTyping}
        />
        {helpers}
        <span>{this.state.errorMessage}</span>
      </div>
    );
  }
}

InputField.propTypes = {
  type: PropTypes.string,
  icon: PropTypes.string,
  iconWidth: PropTypes.number,
  center: PropTypes.bool,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  validationChecks: PropTypes.array,
  setData: PropTypes.func,
  onBlur: PropTypes.func,
  onTyping: PropTypes.func,
  helperImages: PropTypes.array,
  helperIcon: PropTypes.string,
  helperIconWidth: PropTypes.number,
  maxLength: PropTypes.number,
  formatOnTyping: PropTypes.func
};

export default InputField;

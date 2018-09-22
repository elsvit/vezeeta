import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon, Title } from '../../index';

import Colors from '!!sass-variable-loader!../../shared/Colors.scss'; // eslint-disable-line
import './Counter.scss';

class Counter extends Component {
  constructor(props) {
    super(props);

    this.increaseCount = this.increaseCount.bind(this);
    this.decreaseCount = this.decreaseCount.bind(this);
    this.onChange = this.onChange.bind(this);
    this.getInputValue = this.getInputValue.bind(this);
    this.isValid = this.isValid.bind(this);
    this.validate = this.validate.bind(this);

    this.state = {
      count: this.props.value || 1,
    };
  }

  onChange() {
    if (this.props.setData) {
      this.props.setData(this.state.count);
    }

    if (this.props.onChange) {
      this.props.onChange();
    }
  }

  /**
   * Returns the current count
   */
  getInputValue() {
    return this.state.count;
  }

  /**
   * Increase the current count by one
   */
  increaseCount() {
    this.setState(
      {
        count: this.state.count + 1,
      },
      () => {
        this.onChange();
      },
    );
  }

  /**
   * Check if the current count if bigger than one, then decrease it by one
   */
  decreaseCount() {
    if (this.state.count > 1) {
      this.setState(
        {
          count: this.state.count - 1,
        },
        () => {
          this.onChange();
        },
      );
    }
  }

  /**
   * Always returns true
   */
  isValid() {
    return true;
  }

  /**
   * Do nothing, just to have the same field method
   */
  validate() {}

  render() {
    return (
      <div className={`counter-container ${this.props.className}`}>
        <div
          className="counter-btn"
          onClick={this.decreaseCount}
          onKeyDown={() => {}}
        >
          <Icon name="minus" width={24} color={Colors.vezeetaBlue} />
        </div>
        <Title>{this.state.count}</Title>
        <div
          className="counter-btn"
          onClick={this.increaseCount}
          onKeyDown={() => {}}
        >
          <Icon name="plus" width={10} color={Colors.vezeetaBlue} />
        </div>
      </div>
    );
  }
}

Counter.propTypes = {
  value: PropTypes.number.isRequired,
  setData: PropTypes.func,
  onChange: PropTypes.func,
  className: PropTypes.string,
};

Counter.defaultProps = {
  className: '',
};

export default Counter;

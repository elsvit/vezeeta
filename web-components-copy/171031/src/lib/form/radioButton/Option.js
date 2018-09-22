import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Text } from '../../index';

// TODO: add disabled functionality

class Option extends Component {
  constructor(props) {
    super(props);

    this.updateValue = this.updateValue.bind(this);
  }

  /**
   * Updates parent value
   */
  updateValue() {
    this.props.updateValue(this.props.value);
  }

  render() {
    return (
      <li>
        <input
          type="radio"
          id={this.props.value}
          name={this.props.name}
          onClick={this.updateValue}
          defaultChecked={this.props.checked}
        />
        <Text htmlFor={this.props.value}>
          {this.props.component.props.children}
        </Text>

        <div className="check">
          <div className="inside" />
        </div>
      </li>
    );
  }
}

Option.propTypes = {
  component: PropTypes.object,
  checked: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  updateValue: PropTypes.func,
  name: PropTypes.string,
};

export default Option;

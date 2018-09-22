import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Text } from '../../components/Components';

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
          id={this.props.component.props.children}
          name="option"
          onClick={this.updateValue}
          defaultChecked={this.props.checked}
        />
        <Text htmlFor={this.props.component.props.children}>
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
  value: PropTypes.number,
  updateValue: PropTypes.func
};

export default Option;

/* eslint-disable */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

// TODO: complete component implmenation

class Checkbox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: this.props.items,
      isLoading: this.props.items,
      checked: [],
    };
  }

  render() {
    return (
      <div className="checkbox-container">
        {this.state.items.map((item, index) => (
          <div key={index} className="checkbox-item">
            <label className="input-checkbox checkbox-lightBlue">
              <input type="checkbox" id="checkbox-1" />
              <div className="checkbox">{item.component} </div>
            </label>
          </div>
        ))}
      </div>
    );
  }
}

Checkbox.propTypes = {
  items: PropTypes.array,
};

export default Checkbox;

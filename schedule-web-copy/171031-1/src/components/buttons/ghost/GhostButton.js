import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Icon, Text } from '../../Components';
import Colors from '!!sass-variable-loader!../../../components/base/Colors.scss';
import './GhostButton.scss';

class GhostButton extends Component {
  render() {
    let IconButton = null;
    if (this.props.icon == undefined) {
      IconButton = '';
    } else {
      IconButton = (
        <div className="icon-container">
          <Icon name={this.props.icon} width={17} color={Colors.defaultGrey} />
        </div>
      );
    }

    return (
      <div
        className={`btn-container ${this.props.className}`}
        onClick={this.props.onClick}
      >
        {IconButton}
        <div className="text-container">
          <Text>{this.props.children}</Text>
        </div>
      </div>
    );
  }
}

GhostButton.propTypes = {
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  icon: PropTypes.string,
  iconWidth: PropTypes.number,
  className: PropTypes.string
};

export default GhostButton;

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Icon, Text } from '../../Components';
import Colors from '!!sass-variable-loader!../../../components/base/Colors.scss';
import './LabelWithIcon.scss';

class LabelWithIcon extends Component {
  render() {
    return (
      <div
        className={`label-with-icon ${this.props.className}`}
        onClick={this.props.onClick}
      >
        <div className="icon-container">
          <Icon name="plus" width={10} color={Colors.vezeetaBlue} />
        </div>

        <Text>{this.props.children}</Text>
      </div>
    );
  }
}

LabelWithIcon.propTypes = {
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string
};

export default LabelWithIcon;

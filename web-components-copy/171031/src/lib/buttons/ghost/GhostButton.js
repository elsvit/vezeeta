import React from 'react';
import PropTypes from 'prop-types';

import { Icon, Text } from '../../index';
import Colors from '!!sass-variable-loader!../../shared/Colors.scss'; // eslint-disable-line
import './GhostButton.scss';

// TODO: replace div with button

function GhostButton(props) {
  let IconButton;
  let disableClassName;
  const className = ` ${props.className}`;

  if (props.icon === undefined) {
    IconButton = '';
  } else {
    IconButton = (
      <div className="icon-container">
        <Icon
          name={props.icon}
          width={props.iconWidth}
          color={Colors.defaultGrey}
        />
      </div>
    );
  }

  if (props.disable === true) {
    disableClassName = ' btn-container--disabled';
  } else {
    disableClassName = '';
  }

  return (
    <div
      className={`btn-container--ghost${className}${disableClassName}`}
      onClick={props.onClick}
      onKeyDown={() => {}}
    >
      {IconButton}
      <div className="text-container">
        <Text>{props.children}</Text>
      </div>
    </div>
  );
}

GhostButton.propTypes = {
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.string,
  iconWidth: PropTypes.number,
  className: PropTypes.string,
  disable: PropTypes.bool,
};

GhostButton.defaultProps = {
  className: '',
  disable: false,
  iconWidth: 17,
};

export default GhostButton;

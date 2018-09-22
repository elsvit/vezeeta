import React from 'react';
import PropTypes from 'prop-types';

import { Icon, Text } from '../../index';
import Colors from '!!sass-variable-loader!../../shared/Colors.scss'; // eslint-disable-line
import './LabelWithIcon.scss';

// TODO: replace div with button

function LabelWithIcon(props) {
  const className = ` ${props.className}`;

  return (
    <div
      className={`label-with-icon${className}`}
      onClick={props.onClick}
      onKeyDown={() => {}}
    >
      <div className="icon-container">
        <Icon name="plus" width={10} color={Colors.vezeetaBlue} />
      </div>

      <Text>{props.children}</Text>
    </div>
  );
}

LabelWithIcon.propTypes = {
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
};

LabelWithIcon.defaultProps = {
  className: '',
};

export default LabelWithIcon;

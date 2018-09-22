import React from 'react';
import PropTypes from 'prop-types';

import './Card.scss';

// TODO: modify to be more re-usable

function Card(props) {
  const className = ` ${props.className}`;

  return (
    <div className={`container${className}`}>
      <div className="card col-md-10 col-md-offset-1 col-xs-12">
        {props.children}
      </div>
    </div>
  );
}

Card.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  className: PropTypes.string,
};

Card.defaultProps = {
  className: '',
};

export default Card;

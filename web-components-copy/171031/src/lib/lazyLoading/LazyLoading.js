import React from 'react';
import PropTypes from 'prop-types';

import './LazyLoading.scss';

function LazyLoading(props) {
  return <div className="lazy-loading-container">{props.children}</div>;
}

LazyLoading.propTypes = {
  children: PropTypes.any,
};

export default LazyLoading;

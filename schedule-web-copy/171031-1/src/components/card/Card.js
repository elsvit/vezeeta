import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Card.scss';

// TODO: modify to be more re-usable

class Card extends Component {
  render() {
    return (
      <div className="container">
        <div className="card col-md-10 col-md-offset-1 col-xs-12">
          {this.props.children}
        </div>
      </div>
    );
  }
}

Card.propTypes = {
  children: PropTypes.array
};

export default Card;

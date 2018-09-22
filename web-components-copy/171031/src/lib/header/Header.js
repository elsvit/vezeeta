import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Header.scss';

class Header extends Component {
  componentDidMount() {
    this.logo.onload = () => {
      this.logo.style.opacity = 1;
    };
  }

  render() {
    const itemsClass = ` ${this.props.itemsClass}`;

    return (
      <header className="col-xs-12">
        <div className="container">
          <div className="header-container col-md-10 col-xs-12 col-md-offset-1">
            <div className="logo-container col-xs-3">
              <img
                className="logo"
                src="https://s3-eu-west-1.amazonaws.com/cdn-vezeetastaging/vezeeta-account/assets/logo.png"
                ref={(img) => {
                  this.logo = img;
                }}
                alt="logo"
                onClick={this.props.onLogoClick}
                onKeyDown={() => {}}
              />
            </div>
            <div className={`menu-container col-xs-9${itemsClass}`}>
              {this.props.headerItems}
            </div>
          </div>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  headerItems: PropTypes.object,
  itemsClass: PropTypes.string,
  onLogoClick: PropTypes.func.isRequired,
};

Header.defaultProps = {
  itemsClass: '',
};

export default Header;

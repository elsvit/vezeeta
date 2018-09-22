import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MenuItem extends Component {
  constructor(props) {
    super(props);

    this.updatePlaceholder = this.updatePlaceholder.bind(this);
    this.updateInputImg = this.updateInputImg.bind(this);
    this.hasImage = false;

    if (this.props.item.img) {
      this.hasImage = true;
    }
  }

  /**
   * Updates input's placeholder
   */
  updatePlaceholder() {
    this.props.updateValue(this.props.item.placeholder, this.props.item.value);

    if (this.hasImage) {
      this.updateInputImg();
    }
  }

  /**
   * Change the input's image to match the placeholder
   */
  updateInputImg() {
    this.props.updatePlaceholderImg(this.props.item.img);
  }

  render() {
    if (this.props.disable === true) {
      return <li className="disabled">{this.props.component}</li>;
    } else {
      return (
        <li onMouseDown={this.updatePlaceholder}>{this.props.component}</li>
      );
    }
  }
}

MenuItem.propTypes = {
  item: PropTypes.object,
  updateValue: PropTypes.func,
  updatePlaceholderImg: PropTypes.func,
  component: PropTypes.object,
  disable: PropTypes.bool
};

export default MenuItem;

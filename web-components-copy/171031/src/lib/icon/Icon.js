import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Icons from './icons.json';
import IconLoader from './IconLoader';

class Icon extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: this.props.name,
    };
  }
  /**
   * Getting icon object from icons.json
   */
  componentWillMount() {
    this.icon = IconLoader.getIcon(this.state.name);
    this.name = this.icon.properties.name;
    this.width = this.icon.icon.width;
    this.height = this.icon.properties.order;

    if (this.width === undefined) {
      this.width = Icons.height;
    } else if (this.height === undefined || this.height < 600) {
      this.height = Icons.height;
    }

    this.viewBox = `0 0 ${this.width} ${this.height}`;
    this.paths = this.icon.icon.paths;

    this.ratio = this.width / this.height;
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ name: nextProps.name });
    if (this.state.name !== nextProps.name) {
      this.icon = IconLoader.getIcon(nextProps.name);
      this.name = this.icon.properties.name;
      this.width = this.icon.icon.width;
      this.height = this.icon.properties.order;

      if (this.width === undefined) {
        this.width = Icons.height;
      } else if (this.height === undefined || this.height < 600) {
        this.height = Icons.height;
      }

      this.viewBox = `0 0 ${this.width} ${this.height}`;
      this.paths = this.icon.icon.paths;

      this.ratio = this.width / this.height;
    }
  }

  render() {
    let width;
    let height;
    let widthSub;
    let heightSub;

    if (this.props.height) {
      width = Math.ceil(this.props.height * this.ratio);
      height = this.props.height;
    } else {
      height = Math.ceil(this.props.width * (1 / this.ratio));
      width = this.props.width;
    }

    if (width > height) {
      widthSub = 0;
      heightSub = height;
    } else {
      heightSub = 0;
      widthSub = width;
    }

    return (
      <svg
        viewBox={this.viewBox}
        width={width}
        height={height}
        className={this.props.className}
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
      >
        <svg
          viewBox={this.viewBox}
          className={this.name}
          width={this.width - widthSub}
          height={this.height - heightSub}
          ref={(svg) => {
            this.svg = svg;
          }}
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
        >
          <g>
            {this.paths.map((path) => (
              <path fill={this.props.color} key={path} d={path} />
            ))}
          </g>
        </svg>
      </svg>
    );
  }
}

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  color: PropTypes.string,
  className: PropTypes.string,
};

export default Icon;

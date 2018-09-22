import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './DropDown.scss';

class DropDown extends Component {
  constructor(props) {
    super(props);

    this.toggleDropDown = this.toggleDropDown.bind(this);
    this.hideDropDown = this.hideDropDown.bind(this);
    this.updateValue = this.updateValue.bind(this);
    this.getDropDownValue = this.getDropDownValue.bind(this);
    this.enable = this.enable.bind(this);
    this.disable = this.disable.bind(this);
    this.select = this.select.bind(this);

    this.state = {
      isDropDownOpened: false,
      disable: this.props.disable,
      select: this.props.select,
      value: {},
      isLoading: !this.props.items,
      placeholder: this.props.placeholder,
      items: this.props.items,
      pointerEvents: 'initial',
      cursor: 'pointer',
    };
  }

  componentWillMount() {
    if (this.props.disable === true) {
      this.disable();
    } else {
      this.enable();
    }
  }

  componentDidMount() {
    this.select();
  }

  /**
   * Checks if the items props changed and updates it
   * @param {object} nextProps
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.items !== this.state.items && nextProps.items.length !== 0) {
      this.setState(
        {
          items: nextProps.items,
          isLoading: false,
        },
        () => {
          this.select();
        },
      );
    }

    if (nextProps.select !== this.state.select) {
      this.setState({
        select: nextProps.select,
      });
    }

    if (nextProps.disable !== this.state.disable) {
      if (nextProps.disable === true) {
        this.disable();
      } else {
        this.enable();
      }
    }
  }

  getDropDownValue() {
    return this.state.value;
  }

  /**
   * Hide the drop-down
   */
  hideDropDown() {
    this.setState({
      isDropDownOpened: false,
    });
    this.dropDown.style.display = 'none';
  }

  /**
   *
   * @param {object} newValue
   * @param {component} newPlaceholder
   */
  updateValue(newValue, newPlaceholder) {
    this.setState(
      {
        value: newValue,
        placeholder: newPlaceholder,
      },
      () => {
        if (this.props.setData) {
          this.props.setData(newValue);
        }
        if (this.props.onChange) {
          this.props.onChange();
        }
        this.dropDown.style.display = 'none';
      },
    );
  }

  /**
   * Shows/hides the drop-down
   */
  toggleDropDown() {
    this.setState({
      isDropDownOpened: !this.state.isDropDownOpened,
    });

    if (!this.state.isDropDownOpened) {
      this.dropDown.style.display = 'flex';
    } else {
      this.dropDown.style.display = 'none';
    }
  }

  disable() {
    this.setState({
      pointerEvents: 'none',
      cursor: 'initial',
    });
  }

  enable() {
    this.setState({
      pointerEvents: 'initial',
      cursor: 'pointer',
    });
  }

  select() {
    if (!this.state.isLoading) {
      this.props.items.map((item) => {
        if (this.state.select === item.data.value) {
          this.updateValue(item.data.value, item.component);
        }
      });
    }
  }

  render() {
    let dropDown;
    let placeholder;
    const className = ` ${this.props.className}`;
    const activeClassName = ` ${this.props.activeClassName}`;

    if (!this.state.isLoading) {
      placeholder = this.state.placeholder;
      dropDown = this.state.items.map((item, index) => (
        <li // eslint-disable-line
          key={index}
          onMouseDown={() => this.updateValue(item.data.value, item.component)}
          className="drop-down-item"
        >
          {item.component}
        </li>
      ));
    }

    return (
      <div className={`drop-down${className}`}>
        <div
          tabIndex="0"
          className={`value-placeholder${activeClassName}`}
          onBlur={this.hideDropDown}
          onClick={this.toggleDropDown}
          onKeyDown={() => {}}
          style={{
            pointerEvents: this.state.pointerEvents,
            cursor: this.state.cursor,
          }}
          ref={(dropDownMenu) => {
            this.dropDown = dropDownMenu;
          }}
        >
          {placeholder}
        </div>
        <ul
          className="list"
          ref={(dropMenu) => {
            this.dropDown = dropMenu;
          }}
        >
          {dropDown}
        </ul>
      </div>
    );
  }
}

DropDown.propTypes = {
  className: PropTypes.string,
  activeClassName: PropTypes.string,
  placeholder: PropTypes.object,
  items: PropTypes.array.isRequired,
  setData: PropTypes.func,
  select: PropTypes.number.isRequired,
  onChange: PropTypes.func,
  disable: PropTypes.bool,
};

DropDown.defaultProps = {
  className: '',
  activeClassName: '',
  disable: false,
};

export default DropDown;

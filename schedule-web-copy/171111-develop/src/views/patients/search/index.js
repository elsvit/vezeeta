import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@vezeeta/web-components';
import Colors from '!!sass-variable-loader!../../../shared/Colors.scss'; // eslint-disable-line

import './Search.scss';

class Search extends PureComponent {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      value: '',
    };
  }

  handleChange(e) {
    const value = e.target.value;
    this.setState({
      value,
    });
    this.props.onChange(value);
  }

  render() {
    const { placeholder } = this.props;
    const { value } = this.state;
    return (
      <div className="search-field">
        <input
          type="search"
          value={value}
          onChange={this.handleChange}
          className="input-field"
          placeholder={placeholder}
        />
        <div className="lense-icon">
          <Icon
            name="search"
            width={16}
            height={16}
            color={Colors.helperGrey}
          />
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  placeholder: PropTypes.string,
  onChange: PropTypes.func, // eslint-disable-line
};

export default Search;

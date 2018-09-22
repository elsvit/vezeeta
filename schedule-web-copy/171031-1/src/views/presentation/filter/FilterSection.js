import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ComboBox from '../../../components/comboBox/ComboBox';
import CheckBox from '../CheckBox';
import './FilterSection.scss';

class FilterSection extends Component {
  constructor(props) {
    super(props);
    this.getComboSection = this.getComboSection.bind(this);
    this.getCheckListSection = this.getCheckListSection.bind(this);
  }

  getComboSection() {
    return (
      <div className="filter-section">
        <span className="filter-placeholder bold">
          {this.props.placeholder}
        </span>
        <div className="h10" />
        <ComboBox
          items={this.props.filters}
          placeholder={this.props.placeholder}
        />
      </div>
    );
  }

  getCheckListSection() {
    let result = [];
    for (let i = 0; i < this.props.filters.length; i++) {
      let currentFilter = this.props.filters[i];
      result.push(
        <CheckBox
          label={currentFilter.data.placeholder}
          handleCheckboxChange={currentFilter.onClick}
        />
      );
    }

    return (
      <div className="filter-section">
        <span className="filter-placeholder bold">
          {this.props.placeholder}
        </span>
        <div className="h10" />

        {result}
      </div>
    );
  }

  render() {
    if (this.props.type === 'combo') {
      return this.getComboSection();
    } else if (this.props.type === 'check') {
      return this.getCheckListSection();
    }
  }
}

FilterSection.propTypes = {
  placeholder: PropTypes.string,
  filters: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired
};

export default FilterSection;

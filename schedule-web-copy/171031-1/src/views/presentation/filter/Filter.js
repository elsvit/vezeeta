import React, { Component } from 'react';
import LabelWithIcon from '../../../components/buttons/labelWithIcon/LabelWithIcon';
import PropTypes from 'prop-types';
import FilterSection from './FilterSection';
import './Filter.scss';

class Filter extends Component {
  constructor(props) {
    super(props);
    this.getSections = this.getSections.bind(this);
  }

  getSections() {
    let result = [];
    for (let i = 0; i < this.props.sections.length; i++) {
      let currentSection = this.props.sections[i];
      result.push(
        <div className="row">
          <div className="col-xs-12">
            <FilterSection
              type={currentSection.type}
              filters={currentSection.filters}
              placeholder={currentSection.placeholder}
            />
          </div>
        </div>
      );
    }
    return result;
  }

  render() {
    let sections = this.getSections();
    return (
      <div className="filter">
        <div className="row">
          <div className="col-xs-12 filter-title">
            <LabelWithIcon>
              <span>{this.props.title}</span>
            </LabelWithIcon>
          </div>
        </div>
        {sections}
      </div>
    );
  }
}

Filter.propTypes = {
  title: PropTypes.string,
  sections: PropTypes.array.isRequired
};

export default Filter;

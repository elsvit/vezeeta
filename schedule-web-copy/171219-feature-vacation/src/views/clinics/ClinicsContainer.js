import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loadClinics } from '../../store/actions/clinics';

class ClinicsContainer extends Component {
  componentDidMount() {
    if (this.props.clinics.length === 0) {
      this.props.loadClinics();
    }
  }

  render() {
    return <div>{this.props.children}</div>;
  }
}

ClinicsContainer.propTypes = {
  clinics: PropTypes.array,
  loadClinics: PropTypes.func,
  children: PropTypes.object,
};

const mapStateToProps = (state) => ({
  clinics: state.clinics.Clinics,
});

const mapDispatchToProps = (dispatch) => ({
  loadClinics: () => dispatch(loadClinics()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ClinicsContainer);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { loadClinics } from '../../store/actions/clinics';

const mapStateToProps = (state) => ({
  // userType: state.user.type,
  state,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  loadClinics,
}, dispatch);

class MainContainer extends Component {
  componentDidMount() {
    this.props.loadClinics();
  }

  render() {
    const { children } = this.props; // eslint-disable-line
    return (
      <div>
        { children }
      </div>
    );
  }
}

MainContainer.propTypes = {
  // userType: PropTypes.string,
  loadClinics: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);


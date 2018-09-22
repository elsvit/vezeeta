import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Icon } from '@vezeeta/web-components';
import Colors from '!!sass-variable-loader!../../../shared/Colors.scss'; // eslint-disable-line

import AddVacationBranch from './AddVacationBranch';
import AddVacationDoctor from './AddVacationDoctor';
import './AddVacation.scss';

const mapStateToProps = (state) => ({
  clinics: state.clinics.Clinics,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
}, dispatch);

class AddVacation extends Component {
  constructor(props) {
    super(props);
    this.onClickLinkBranch = this.onClickLinkBranch.bind(this);
    this.onClickLinkDoctor = this.onClickLinkDoctor.bind(this);
    this.state = {
      showBranch: true,
      showDoctor: false,
    };
  }

  onClickLinkBranch() {
    this.setState({
      showBranch: true,
      showDoctor: false,
    });
  }

  onClickLinkDoctor() {
    this.setState({
      showBranch: false,
      showDoctor: true,
    });
  }

  render() {
    console.log('AddVacation45 clinics', this.props.clinics);
    const { showAddVacation, onClickAddVacation } = this.props;
    const addVacationClass = showAddVacation ? 'add-vacation' : 'add-vacation-hide';
    let headerBranchClass = 'add-vacation-header-link blue-text bold fs-20 ';
    let headerDoctorClass = 'add-vacation-header-link blue-text bold fs-20 ';
    let formBranchClass = 'add-vacation-form-hide ';
    let formDoctorClass = 'add-vacation-form-hide ';

    if (this.state.showBranch) {
      headerBranchClass += 'add-vacation-header-active';
      formBranchClass = 'add-vacation-branch-active';
    } else if (this.state.showDoctor) {
      headerDoctorClass += 'add-vacation-header-active';
      formDoctorClass = 'add-vacation-doctor-active';
    }
    return (
      <div className={addVacationClass} id="add-vacation">
        <div className="add-vacation-tab">
          <div className="add-vacation-header">
            <span
              className={headerBranchClass}
              id="add-vacation-header-branch"
              onClick={this.onClickLinkBranch}
              onKeyDown={() => {}}
            >
              Branch
            </span>
            <span
              className={headerDoctorClass}
              id="add-vacation-header-doctor"
              onClick={this.onClickLinkDoctor}
              onKeyDown={() => {}}
            >
              Doctor
            </span>
            <span
              className="add-vacation-header-close bold fs-20"
              id="add-vacation-header-close"
              onClick={onClickAddVacation}
              onKeyDown={() => {}}
            >
              <Icon
                name="close"
                width={20}
                height={20}
                color={Colors.mediumGrey}
              />
            </span>
          </div>

          <AddVacationBranch
            className={formBranchClass}
            onClickCancel={onClickAddVacation}
            clinics={this.props.clinics}
          />

          <AddVacationDoctor
            className={formDoctorClass}
            onClickCancel={onClickAddVacation}
            clinics={this.props.clinics}
          />

        </div>
        <div className="add-vacation-opacity">  {/* eslint-disable-line */}
        </div>
      </div>
    );
  }
}

AddVacation.propTypes = {
  showAddVacation: PropTypes.bool,
  onClickAddVacation: PropTypes.func,
  clinics: PropTypes.array,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddVacation);

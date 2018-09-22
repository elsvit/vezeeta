import React, { Component } from 'react';
import { API } from '@vezeeta/web-utils';
import { Spinner } from '@vezeeta/web-components';

import Urls from '../../Urls';
import WorkingHours from './WorkingHours';

class WorkingHoursContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    const getAccountStructure = new API();
    const getAccountStructureHeader = [
      {
        key: 'AccountKey',
        value: 'acca132c1048f08f78c',
      },
    ];

    getAccountStructure
      .get(Urls.getAccountStructure, getAccountStructureHeader)
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          this.setState({
            isLoading: false,
            clinic: response.data.Clinics,
            defaultRoom: {
              title: response.data.Clinics[0].Branches[0].Rooms[0].RoomName,
              /* branchName: response.data.Clinics[0].Branches[0].BranchName, */
              doctorTypes: [
                {
                  name: 'doctorType',
                  value: 'key4',
                  component: <div>On Appointment</div>,
                },
                {
                  name: 'doctorType',
                  value: 'key5',
                  component: <div>FIFO</div>,
                },
              ],
              selectedValue: 'key4',
            },
          });
        }
      });
  }

  render() {
    if (!this.state.isLoading) {
      return (
        <WorkingHours
          clinic={this.state.clinic}
          defaultRoom={this.state.defaultRoom}
        />
      );
    }
    return (
      <div
        className="loading"
        ref={(spinner) => {
          this.spinner = spinner;
        }}
      >
        <Spinner />
      </div>
    );
  }
}

export default WorkingHoursContainer;

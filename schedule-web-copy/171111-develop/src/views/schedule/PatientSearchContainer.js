import React, { Component } from 'react';
import { API } from '@vezeeta/web-utils';
import { ComboBox, Text } from '@vezeeta/web-components';

import Urls from '../../Urls';

class PatientSearchContainer extends Component {
  constructor(props) {
    super(props);
    this.keywordChange = this.keywordChange.bind(this);
    this.apiWrapper = new API();
    // this.state = {
    //   value: '',
    //   suggestions: [],
    // };
  }

  async keywordChange(value) {
    // this.setState({ value });
    const patientData = await this.apiWrapper.get(
      `${Urls.getPatientsListUrl}?keyword=${value}&page=1&pageSize=100`,
      [
        {
          key: 'ClinicKey',
          value: 'clnc8c1fff89af1dacc0',
        },
        {
          key: 'Authorization',
          value: '9913fb',
        },
        {
          key: 'Language',
          value: 'ar-EG',
        },
      ], // Remove this
    ).data;

    if (patientData === undefined) return;

    const suggestions = [];
    patientData.forEach((element) => {
      suggestions.push({
        data: {
          placeholder: element.PatientName,
          value: element.PatientKey,
        },
        component: <Text>element.PatientName</Text>,
      });
    });

    // this.setState({ suggestions }); TODO: enable
  }

  render() {
    const data = [
      {
        data: { placeholder: 'ahmed', value: 'ahmed', searchable: ['ahmed'] },
        component: <Text>ahmed</Text>,
      },
      {
        data: { placeholder: 'adel', value: 'adel', searchable: ['adel'] },
        component: <Text>adel</Text>,
      },
      {
        data: { placeholder: 'ramy', value: 'ramy', searchable: ['ramy'] },
        component: <Text>ramy</Text>,
      },
    ];

    return <ComboBox items={data} placeholder="Search By Patient" />;
  }
}

export default PatientSearchContainer;

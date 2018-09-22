import React from 'react';
import { Icon } from '@vezeeta/web-components';
import { GENDER_TYPES, GENDER_RADIO_NAME } from '../Constants';

const getGenderOptions = () => [
  {
    name: GENDER_RADIO_NAME,
    value: GENDER_TYPES.MALE,
    component: (
      <div>
        <Icon name="male" height={40} />
      </div>
    ),
  },
  {
    name: GENDER_RADIO_NAME,
    value: GENDER_TYPES.FEMALE,
    component: (
      <div>
        <Icon name="female" height={40} />
      </div>
    ),
  },
];

export default getGenderOptions;

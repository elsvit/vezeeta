import React from 'react';

import { MODAL_NAMES } from '../Constants';
import PatientDetailsContainer from '../schedule/modals/patientDetails/PatientDetailsContainer';
import PatientNotes from '../schedule/modals/patientNotes/PatientNotes';
import CancelAppointment from '../schedule/modals/cancelAppointment/CancelAppointment';
import AddAppointmentContainer from '../schedule/modals/addAppointment/AddAppointmentContainer';

const MODAL_TITLES = {
  [MODAL_NAMES.PATIENT_DETAILS]: 'Patient Info',
  [MODAL_NAMES.PATIENT_NOTES]: 'Patient Note',
  [MODAL_NAMES.CANCEL_APPOINTMENT]: 'Cancel Reservation',
  [MODAL_NAMES.ADD_APPOINTMENT]: 'Add Reservation',
};

const MODAL_COMPONENTS = {
  [MODAL_NAMES.PATIENT_DETAILS]: PatientDetailsContainer,
  [MODAL_NAMES.PATIENT_NOTES]: PatientNotes,
  [MODAL_NAMES.CANCEL_APPOINTMENT]: CancelAppointment,
  [MODAL_NAMES.ADD_APPOINTMENT]: AddAppointmentContainer,
};

const getModalTabs = (modalName, modalComponentProps) => {
  const ModalComponent = MODAL_COMPONENTS[modalName];
  return [
    {
      tabName: MODAL_TITLES[modalName],
      tabPage: <ModalComponent {...modalComponentProps} />,
    },
  ];
};

export default getModalTabs;

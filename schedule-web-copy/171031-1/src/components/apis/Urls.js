let BaseUrls = {
  accountManagement: 'http://accountmanagement-api-staging.drbridge.com/api',
  lookUps: 'http://lookupsapi-staging.drbridge.com/api'
};

let Urls = {
  getCountries: `${BaseUrls.lookUps}/Countries`,
  getCountryCodes: `${BaseUrls.lookUps}/CountryCodes`,
  getCultures: `${BaseUrls.lookUps}/Cultures`,
  getCities: `${BaseUrls.lookUps}/Cities`,
  getAreas: `${BaseUrls.lookUps}/Areas`,
  getSpecialities: `${BaseUrls.lookUps}/Specialities`,

  account: {
    getAccountByKey: `${BaseUrls.accountManagement}/Account/GetAccountByKey?accountKey=`,
    registerAccount: `${BaseUrls.accountManagement}/Account/RegisterAccount`,
    saveProfilePhoto: `${BaseUrls.accountManagement}/Account/SaveProfilePhoto`
  },

  entity: {
    addEntityImage: `${BaseUrls.accountManagement}/Entity/AddEntityImage`,
    createEntity: `${BaseUrls.accountManagement}/Entity/CreateClinic`
  },

  payment: {
    getPaymentTypes: `${BaseUrls.accountManagement}/Payment/GetPaymentTypes`,
    getPaymentMethods: `${BaseUrls.accountManagement}/Payment/GetPaymentMethods`,
    getPaymentCycles: `${BaseUrls.accountManagement}/Payment/GetPaymentCycles?productLineId=`,
    savePaymentMethod: `${BaseUrls.accountManagement}/Payment/SavePaymentMethod`
  },

  verification: {
    verifyPhone: `${BaseUrls.accountManagement}/Verification/VerifyPhone`,
    sendPhoneVerificatoinCode: `${BaseUrls.accountManagement}/Verification/SendPhoneVerificatoinCode`
  },

  productLines: {
    getProductLines: `${BaseUrls.accountManagement}/ProductLine/GetProductLines`,
    getRegisteredProductLines: `${BaseUrls.accountManagement}/ProductLine/GetRegisteredProductLines`
  },

  speciality: {
    getSpecialityGroups: `${BaseUrls.accountManagement}/Speciality/GetSpecialityGroups`
  }
};

let headers = {
  'Content-Type': 'application/json'
};

export { Urls, headers };
export default Urls;

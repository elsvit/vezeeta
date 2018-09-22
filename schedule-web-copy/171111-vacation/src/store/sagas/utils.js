export const fetchClinics = () => { // eslint-disable-line
  const DataUrl = '/json/clinics.json'; // eslint-disable-line
  return fetch(DataUrl) // eslint-disable-line
    .then((res) => { // eslint-disable-line
      const jsonRes = res.json();
      console.log('utils fetchClinics5 res', res, ' jsonRes', jsonRes);// eslint-disable-line
      return jsonRes; // eslint-disable-line
    }); // eslint-disable-line
} // eslint-disable-line
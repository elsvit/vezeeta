export const CONFIRMATIONS = {
  FETCH: 'CONFIRMATIONS_FETCH',
  FETCH_SUCCESS: 'CONFIRMATIONS_FETCH_SUCCESS',
  SAVE: 'CONFIRMATIONS_SAVE',
  SAVE_SUCCESS: 'CONFIRMATIONS_SAVE_SUCCESS',
};

/**
 * Load confirmation details
 * @param {array} keys, array of clinic keys
 * @param {string} clinicKey, current clinic key
 * @param {string} authorization, api secret
 * @param {string} language, culture
 */
export const fetchConfirmations = (
  keys,
  clinicKey = 'clnc8c1fff89af1dacc0', // TODO: change the clinic key to a real one
  authorization = '9913fb',
  language = 'ar-EG',
) => ({
  type: CONFIRMATIONS.FETCH,
  keys,
  clinicKey,
  authorization,
  language,
});

/**
 * Save confirmation details
 * @param {array} confirmations, array of confirmations object
 * @param {string} clinicKey, current clinic key
 * @param {string} authorization, api secret
 * @param {string} language, culture
 */
export const saveConfirmations = (
  confirmations,
  clinicKey = 'clnc8c1fff89af1dacc0', // TODO: change the clinic key to a real one
  authorization = '9913fb',
  language = 'ar-EG',
) => ({
  type: CONFIRMATIONS.SAVE,
  confirmations,
  clinicKey,
  authorization,
  language,
});

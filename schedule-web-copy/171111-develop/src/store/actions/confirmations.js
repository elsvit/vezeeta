export const CONFIRMATIONS = {
  FETCH: 'CONFIRMATIONS_FETCH',
  FETCH_SUCCESS: 'CONFIRMATIONS_FETCH_SUCCESS',
  SAVE: 'CONFIRMATIONS_SAVE',
  SAVE_SUCCESS: 'CONFIRMATIONS_SAVE_SUCCESS',
};

export const fetchConfirmations = (
  keys,
  clinicKey = 'clnc8c1fff89af1dacc0',
  authorization = '9913fb',
  language = 'ar-EG',
) => ({
  type: CONFIRMATIONS.FETCH,
  keys,
  clinicKey,
  authorization,
  language,
});

export const saveConfirmations = (
  confirmations,
  clinicKey = 'clnc8c1fff89af1dacc0',
  authorization = '9913fb',
  language = 'ar-EG',
) => ({
  type: CONFIRMATIONS.SAVE,
  confirmations,
  clinicKey,
  authorization,
  language,
});

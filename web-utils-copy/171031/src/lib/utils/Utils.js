import CryptoJS from 'crypto-js';

const validateFields = (fields) => {
  let isValid = true;
  let firstDangerField = -1;

  fields.map((field, fieldNo) => {
    if (!field.isValid()) {
      isValid = false;
      field.validate();
      if (firstDangerField === -1) firstDangerField = fieldNo;
    }
  });

  return {
    isValid,
    firstDangerField,
  };
};

/**
   * Convert image from Facebook, Google to base64
   * @param {url} url of the image
   * @param callback
   * @param {outputFormat} the base64 of the image
   */
const convertImgToBase64 = (url, callback, outputFormat) => {
  const img = new Image();
  img.crossOrigin = 'Anonymous';
  img.onload = () => {
    let canvas = document.createElement('CANVAS');
    const ctx = canvas.getContext('2d');
    canvas.height = img.height;
    canvas.width = img.width;
    ctx.drawImage(img, 0, 0);
    const dataURL = canvas.toDataURL(outputFormat);
    callback(dataURL);
    canvas = null;
  };
  img.src = url;
};

const isFound = (result) => result.length !== 0 && result[0] !== null;

const encrypt = (data, key) => CryptoJS.AES.encrypt(data, key);

const decrypt = (data, key) => {
  const bytes = CryptoJS.AES.decrypt(data.toString(), key);
  return bytes.toString(CryptoJS.enc.Utf8);
};

export { validateFields, isFound, encrypt, decrypt, convertImgToBase64 };

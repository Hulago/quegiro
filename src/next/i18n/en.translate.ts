/* eslint-disable quotes */
/* eslint-disable max-len */
export default {
  ERRORS: {
    ARRAY: {
      INVALID_TYPE: 'invalid array type',
      MAX_LENGTH: 'max length value is {maxLength}',
      MIN_LENGTH: 'min length value is {minLength}',
      RANGE_LENGTH: ''
    },
    BOOLEAN: {
      INVALID_TYPE: 'invalid boolean type'
    },
    DATE: {
      INVALID_TYPE: '',
      MAX: '',
      MIN: '',
      RANGE: ''
    },
    IS_REQUIRED: 'field required',
    NUMBER: {
      INVALID_TYPE: '',
      IS_INTEGER: '',
      IS_ONE_OF: '',
      MAX: 'max value is {max}',
      MIN: 'min value is {min}',
      PATTERN: '',
      RANGE: ''
    },
    OBJECT: {
      INVALID_TYPE: ''
    },
    STRING: {
      CONTAINS_LETTER: '',
      CONTAINS_LETTER_ONLY: '',
      CONTAINS_LOWERCASE_LETTER: '',
      CONTAINS_NUMBER: '',
      CONTAINS_UPPERCASE_LETTER: '',
      INVALID_TYPE: 'invalid string type',
      IPV4: 'invalid ipv4 address',
      IPV6: 'invalid ipv6 address',
      IS_EMAIL: 'invalid email address',
      IS_HEX: 'invalid hex',
      IS_ONE_OF: '',
      IS_URL: 'invalid url',
      MAX_LENGTH: '',
      MIN_LENGTH: '',
      PATTERN: '',
      RANGE_LENGTH: ''
    }
  },
  P_UPLOAD: {
    ASSET_SIZE_EXCEEDED: 'Asset size exceeded',
    IMAGE_SIZE_EXCEEDED:
      'The maximum size of an image asset is {maxImageSize}KB',
    TIP: 'Assets should be of 1000x1000 max, recomended size 500x500. Accepted formats jpg, jpeg, webp',
    UPLOADED_ASSETS_EXCEED: 'Upload of resources exceeded',
    UPLOADED_ASSETS_EXCEED_MSG: 'The maximum number of assets is {maxAssets}',
    VIDEO_SIZE_EXCEEDED: 'The maximum size of a video asset is {maxVideoSize}MB'
  }
};

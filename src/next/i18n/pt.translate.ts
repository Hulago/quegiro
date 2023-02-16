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
    IS_REQUIRED: 'campo obrigatório',
    NUMBER: {
      INVALID_TYPE: '',
      IS_INTEGER: '',
      IS_ONE_OF: '',
      MAX: 'valor máximo é {max}',
      MIN: 'valor mínimo é {min}',
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
      INVALID_TYPE: 'tipo de string inválido',
      IPV4: 'endereço ipv4 inválido',
      IPV6: 'endereço ipv6 inválido',
      IS_EMAIL: 'endereço de e-mail inválido',
      IS_HEX: 'hexadecimal inválido',
      IS_ONE_OF: '',
      IS_URL: 'url inválido',
      MAX_LENGTH: 'valor máximo de comprimento é {maxLength}',
      MIN_LENGTH: 'valor mínimo de comprimento é {minLength}',
      PATTERN: '',
      RANGE_LENGTH: ''
    }
  },
  P_UPLOAD: {
    ASSET_SIZE_EXCEEDED: 'Tamanho do recurso excedido',
    IMAGE_SIZE_EXCEEDED: 'O tamanho máximo de uma imagem é {maxImageSize}KB',
    TIP: 'Os recursos devem ter no máximo 1000x1000 pixels, tamanho recomendado 500x500. Formatos aceites jpg, jpeg, webp',
    UPLOADED_ASSETS_EXCEED: 'Upload de recursos excedidos',
    UPLOADED_ASSETS_EXCEED_MSG: 'O número máximo de recursos é {maxAssets}',
    VIDEO_SIZE_EXCEEDED: 'O tamanho máximo de um video é {maxVideoSize}MB'
  }
};

const errorMessages = {
  array: {
    maxLength: 'KIT.ERRORS.ARRAY.MAX_LENGTH',
    minLength: 'KIT.ERRORS.ARRAY.MIN_LENGTH',
    rangeLength: 'KIT.ERRORS.ARRAY.RANGE_LENGTH',
    type: 'KIT.ERRORS.ARRAY.INVALID_TYPE'
  },
  base: {
    isRequired: 'KIT.ERRORS.IS_REQUIRED',
    isRequiredOrEmpty: '${name} is a required field'
  },
  boolean: {
    type: 'KIT.ERRORS.BOOLEAN.INVALID_TYPE'
  },
  date: {
    max: 'KIT.ERRORS.DATE.MAX',
    min: 'KIT.ERRORS.DATE.MIN',
    range: 'KIT.ERRORS.DATE.RANGE',
    type: 'KIT.ERRORS.DATE.INVALID_TYPE'
  },
  number: {
    isInteger: 'KIT.ERRORS.NUMBER.IS_INTEGER',
    isOneOf: 'KIT.ERRORS.NUMBER.IS_ONE_OF',
    max: 'KIT.ERRORS.NUMBER.MAX',
    min: 'KIT.ERRORS.NUMBER.MIN',
    pattern: 'KIT.ERRORS.NUMBER.PATTERN',
    range: 'KIT.ERRORS.NUMBER.RANGE',
    type: 'KIT.ERRORS.NUMBER.INVALID_TYPE'
  },
  object: {
    type: 'KIT.ERRORS.OBJECT.INVALID_TYPE'
  },
  string: {
    containsLetter: 'KIT.ERRORS.STRING.CONTAINS_LETTER',
    containsLetterOnly: 'KIT.ERRORS.STRING.CONTAINS_LETTER_ONLY',
    containsLowercaseLetter: 'KIT.ERRORS.STRING.CONTAINS_LOWERCASE_LETTER',
    containsNumber: 'KIT.ERRORS.STRING.CONTAINS_NUMBER',
    containsUppercaseLetter: 'KIT.ERRORS.STRING.CONTAINS_UPPERCASE_LETTER',
    isEmail: 'KIT.ERRORS.STRING.IS_EMAIL',
    isHex: 'KIT.ERRORS.STRING.IS_HEX',
    isOneOf: 'KIT.ERRORS.STRING.IS_ONE_OF',
    isURL: 'KIT.ERRORS.STRING.IS_URL',
    maxLength: 'KIT.ERRORS.STRING.MAX_LENGTH',
    minLength: 'KIT.ERRORS.STRING.MIN_LENGTH',
    pattern: 'KIT.ERRORS.STRING.PATTERN',
    rangeLength: 'KIT.ERRORS.STRING.RANGE_LENGTH',
    type: 'KIT.ERRORS.STRING.INVALID_TYPE'
  }
};

export { errorMessages };

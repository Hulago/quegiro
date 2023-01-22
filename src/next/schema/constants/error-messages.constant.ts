/**
|--------------------------------------------------------------------------
| Copyright Websublime All Rights Reserved.
|--------------------------------------------------------------------------
|
| Use of this source code is governed by an MIT-style license that can be
| found in the LICENSE file at https://websublime.dev/license
|
*/

/**
 * @public
 */
const errorMessages = {
  array: {
    maxLength: 'UI.ERRORS.ARRAY.MAX_LENGTH',
    minLength: 'UI.ERRORS.ARRAY.MIN_LENGTH',
    rangeLength: 'UI.ERRORS.ARRAY.RANGE_LENGTH',
    type: 'UI.ERRORS.ARRAY.INVALID_TYPE'
  },
  base: {
    isRequired: 'UI.ERRORS.IS_REQUIRED',
    isRequiredOrEmpty: '${name} is a required field'
  },
  boolean: {
    type: 'UI.ERRORS.BOOLEAN.INVALID_TYPE'
  },
  date: {
    max: 'UI.ERRORS.DATE.MAX',
    min: 'UI.ERRORS.DATE.MIN',
    range: 'UI.ERRORS.DATE.RANGE',
    type: 'UI.ERRORS.DATE.INVALID_TYPE'
  },
  number: {
    isInteger: 'UI.ERRORS.NUMBER.IS_INTEGER',
    isOneOf: 'UI.ERRORS.NUMBER.IS_ONE_OF',
    max: 'UI.ERRORS.NUMBER.MAX',
    min: 'UI.ERRORS.NUMBER.MIN',
    pattern: 'UI.ERRORS.NUMBER.PATTERN',
    range: 'UI.ERRORS.NUMBER.RANGE',
    type: 'UI.ERRORS.NUMBER.INVALID_TYPE'
  },
  object: {
    type: 'UI.ERRORS.OBJECT.INVALID_TYPE'
  },
  string: {
    containsLetter: 'UI.ERRORS.STRING.CONTAINS_LETTER',
    containsLetterOnly: 'UI.ERRORS.STRING.CONTAINS_LETTER_ONLY',
    containsLowercaseLetter: 'UI.ERRORS.STRING.CONTAINS_LOWERCASE_LETTER',
    containsNumber: 'UI.ERRORS.STRING.CONTAINS_NUMBER',
    containsUppercaseLetter: 'UI.ERRORS.STRING.CONTAINS_UPPERCASE_LETTER',
    isEmail: 'UI.ERRORS.STRING.IS_EMAIL',
    isHex: 'UI.ERRORS.STRING.IS_HEX',
    isOneOf: 'UI.ERRORS.STRING.IS_ONE_OF',
    isURL: 'UI.ERRORS.STRING.IS_URL',
    maxLength: 'UI.ERRORS.STRING.MAX_LENGTH',
    minLength: 'UI.ERRORS.STRING.MIN_LENGTH',
    pattern: 'UI.ERRORS.STRING.PATTERN',
    rangeLength: 'UI.ERRORS.STRING.RANGE_LENGTH',
    type: 'UI.ERRORS.STRING.INVALID_TYPE'
  }
};

export { errorMessages };

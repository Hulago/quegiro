import { errorMessages } from '../constants/error-messages.constant';
import { schemaType } from '../constants/schema-type.constant';
import { BaseSchemaType } from './base.schema-type';

/**
 * String model type validation
 *
 * @public
 */
export class StringSchemaType extends BaseSchemaType<string> {
  type = 'string';

  /**
   * Create StringSchemaType instance
   *
   * @param errorMessage - Error message
   */
  constructor(errorMessage: string) {
    super(schemaType.property);

    this.addRule({
      errorMessage,
      validationFn: value =>
        this.isEmpty(value) ? true : typeof value === 'string'
    });
  }

  /**
   * Test if value contains only letters
   *
   * @param errorMessage - Error message
   * @public
   */
  containsLetter(errorMessage = errorMessages.string.containsLetter) {
    this.addRule({
      errorMessage,
      validationFn: value => /[a-zA-Z]/.test(value)
    });

    return this;
  }

  /**
   * Test if value is uppercase
   *
   * @param errorMessage - Error message
   * @public
   */
  containsUppercaseLetter(
    errorMessage = errorMessages.string.containsUppercaseLetter
  ) {
    this.addRule({
      errorMessage,
      validationFn: value => /[A-Z]/.test(value)
    });

    return this;
  }

  /**
   * Test if value is lowercase
   *
   * @param errorMessage - Error message
   * @public
   */
  containsLowercaseLetter(
    errorMessage = errorMessages.string.containsLowercaseLetter
  ) {
    this.addRule({
      errorMessage,
      validationFn: value => /[a-z]/.test(value)
    });

    return this;
  }

  /**
   * Test if value contains letters only
   *
   * @param errorMessage - Error message
   * @public
   */
  containsLetterOnly(errorMessage = errorMessages.string.containsLetterOnly) {
    this.addRule({
      errorMessage,
      validationFn: value => /^[a-zA-Z]+$/.test(value)
    });

    return this;
  }

  /**
   * Test if value contains numbers
   *
   * @param errorMessage - Error message
   * @public
   */
  containsNumber(errorMessage = errorMessages.string.containsNumber) {
    this.addRule({
      errorMessage,
      validationFn: value => /[0-9]/.test(value)
    });

    return this;
  }

  /**
   * Test if is one of other types included
   *
   * @param values - Values to test
   * @param errorMessage - Error message
   * @public
   */
  isOneOf(values: string[], errorMessage = errorMessages.string.isOneOf) {
    this.addRule({
      errorMessage,
      params: { values },
      validationFn: value => !!~values.indexOf(value)
    });

    return this;
  }

  /**
   * Test if is a valid email
   *
   * @param errorMessage - Error message
   * @public
   */
  isEmail(errorMessage = errorMessages.string.isEmail) {
    // http://emailregex.com/
    const regexp =
      // eslint-disable-next-line no-useless-escape
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    this.addRule({
      errorMessage,
      validationFn: value => regexp.test(value)
    });
    return this;
  }

  /**
   * Test if is a valid url
   *
   * @param errorMessage - Error message
   * @public
   */
  isURL(errorMessage = errorMessages.string.isURL) {
    const regexp = new RegExp(
      '^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$',
      'i'
    );

    this.addRule({
      errorMessage,
      validationFn: value => regexp.test(value)
    });

    return this;
  }

  /**
   * Test if is a hex value
   *
   * @param errorMessage - Error message
   * @public
   */
  isHex(errorMessage = errorMessages.string.isHex) {
    const regexp = /^#?([a-f0-9]{6}|[a-f0-9]{3})$/i;

    this.addRule({
      errorMessage,
      validationFn: value => regexp.test(value)
    });

    return this;
  }

  /**
   * Test a reg expression
   *
   * @param regexp - Reg expression
   * @param errorMessage - Error message
   * @public
   */
  pattern(regexp: RegExp, errorMessage = errorMessages.string.pattern) {
    this.addRule({
      errorMessage,
      params: { regexp },
      validationFn: value => regexp.test(value)
    });

    return this;
  }

  /**
   * Test if string length is between minimum and maximum length
   *
   * @param minLength - Minimum length
   * @param maxLength - Maximum length
   * @param errorMessage - Error message
   * @public
   */
  rangeLength(
    minLength: number,
    maxLength: number,
    errorMessage = errorMessages.string.rangeLength
  ) {
    this.addRule({
      errorMessage,
      params: { maxLength, minLength },
      validationFn: value =>
        value.length >= minLength && value.length <= maxLength
    });

    return this;
  }

  /**
   * Test if string as minmum length
   *
   * @param minLength - Minimum length
   * @param errorMessage - Error message
   * @public
   */
  minLength(minLength: number, errorMessage = errorMessages.string.minLength) {
    this.addRule({
      errorMessage,
      params: { minLength },
      validationFn: value => Array.from(value).length >= minLength
    });

    return this;
  }

  /**
   * Test if string is less then maximum length
   *
   * @param maxLength - Maximum length
   * @param errorMessage - Error message
   */
  maxLength(maxLength: number, errorMessage = errorMessages.string.maxLength) {
    this.addRule({
      errorMessage,
      params: { maxLength },
      validationFn: value => Array.from(value).length <= maxLength
    });

    return this;
  }
}

/**
 * Creats instance StringType
 *
 * @public
 */
export function StringType(errorMessage = errorMessages.string.type) {
  return new StringSchemaType(errorMessage);
}

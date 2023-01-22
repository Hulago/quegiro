/**
|--------------------------------------------------------------------------
| Copyright Websublime All Rights Reserved.
|--------------------------------------------------------------------------
|
| Use of this source code is governed by an MIT-style license that can be
| found in the LICENSE file at https://websublime.dev/license
|
*/

import { errorMessages } from '../constants/error-messages.constant';
import { schemaType } from '../constants/schema-type.constant';
import { BaseSchemaType } from './base.schema-type';

/**
 * Number model type validation
 *
 * @public
 */
export class NumberSchemaType extends BaseSchemaType<number> {
  type = 'number';

  /**
   * Create NumberSchemaType instance
   *
   * @param errorMessage - Error message
   */
  constructor(errorMessage: string) {
    super(schemaType.property);

    this.addRule({
      errorMessage,
      validationFn: (value) =>
        this.isEmpty(value) ? true : typeof value === 'number'
    });
  }

  /**
   * Test if number is integer.
   *
   * @param errorMessage - Error message
   *
   * @public
   */
  isInteger(errorMessage = errorMessages.number.isInteger) {
    this.addRule({
      errorMessage,
      validationFn: (value) => Number.isInteger(Number(value))
    });

    return this;
  }

  /**
   * Test a reg expression
   *
   * @param regexp - Reg expression
   * @param errorMessage - Error message
   *
   * @public
   */
  pattern(regexp: RegExp, errorMessage = errorMessages.number.pattern) {
    this.addRule({
      errorMessage,
      params: { regexp },
      validationFn: (value) => regexp.test(value + '')
    });

    return this;
  }

  /**
   * Test if is one of other types included
   *
   * @param values - Other values
   * @param errorMessage - Error message
   *
   * @public
   */
  isOneOf(values: number[], errorMessage = errorMessages.number.isOneOf) {
    this.addRule({
      errorMessage,
      params: { values },
      validationFn: (value) => values.includes(Number(value))
    });

    return this;
  }

  /**
   * Test if value is between the range
   *
   * @param min - Minimum value
   * @param max - Maximum value
   * @param errorMessage - Error message
   *
   * @public
   */
  range(min: number, max: number, errorMessage = errorMessages.number.range) {
    this.addRule({
      errorMessage,
      params: { max, min },
      validationFn: (value) => Number(value) >= min && Number(value) <= max
    });

    return this;
  }

  /**
   * Test value if great or equal to minimum value
   *
   * @param min - Minimum value
   * @param errorMessage - Error message
   *
   * @public
   */
  min(min: number, errorMessage = errorMessages.number.min) {
    this.addRule({
      errorMessage,
      params: { min },
      validationFn: (value) => Number(value) >= min
    });

    return this;
  }

  /**
   * Test value if it is lower or equal to maximum value
   *
   * @param max - Maximum value
   * @param errorMessage - Error message
   *
   * @public
   */
  max(max: number, errorMessage = errorMessages.number.max) {
    this.addRule({
      errorMessage,
      params: { max },
      validationFn: (value) => Number(value) <= max
    });

    return this;
  }
}

/**
 * Creates instance NumberType
 *
 * @public
 */
export function NumberType(errorMessage = errorMessages.number.type) {
  return new NumberSchemaType(errorMessage);
}

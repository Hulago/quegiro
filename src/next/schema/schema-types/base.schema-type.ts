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
import { ErrorModel } from '../models/error.model';
import { CheckResult, Maybe, Rule } from '../schema.types';

/**
 * Base type model validation
 *
 * @public
 */
export class BaseSchemaType<T = any> {
  type!: string;

  /**
   * schema for ArraySchemaType items
   */
  items?: unknown;

  /**
   * Object with the schema for ObjectSchemaType
   */
  properties?: unknown;

  /**
   * Type name
   */
  readonly schemaType!: schemaType;

  /**
   * Required property
   */
  protected required = false;

  /**
   * Required error message property
   */
  protected requiredErrorMessage = errorMessages.base.isRequired;

  /**
   * Trims string
   */
  protected trim = false;

  /**
   * Validation rules
   */
  protected rules: Rule[] = [];

  /**
   * Create mixed type instance
   *
   * @param name - Type name
   */
  constructor(st = schemaType.property) {
    this.schemaType = st;
  }

  /**
   * Test value types
   *
   * @param value - Value
   * @param data - Data
   * @param fieldName - Field
   *
   * @public
   */
  async check(
    value: Maybe<T>,
    parent: any = null,
    context: any = null
  ): Promise<CheckResult> {
    if (this.required && this.isEmpty(value)) {
      return {
        errors: [
          new ErrorModel({
            i18n: this.requiredErrorMessage,
            key: context
          })
        ],
        hasError: true,
        isValid: false
      };
    }

    const errors = [];

    if (!this.isEmpty(value)) {
      for (const rule of this.rules) {
        const valid = await Promise.resolve(
          rule.validationFn.call(this, value, parent, context)
        );

        if (!valid) {
          errors.push(
            new ErrorModel({
              constraints: rule.params,
              i18n: rule.errorMessage,
              key: context,
              value
            })
          );
        }
      }
    }

    return {
      errors,
      hasError: errors.length > 0,
      isValid: errors.length === 0
    };
  }

  /**
   * Validate if value is empty
   *
   * @param value - Value
   *
   * @returns
   * @public
   */
  isEmpty(value: Maybe<T>): boolean {
    return (
      value === null ||
      value === undefined ||
      (typeof value === 'string' && value.trim() === '')
    );
  }

  /**
   * Add validation rule.
   *
   * @param param - Rule object.
   *
   * @returns
   * @public
   */
  addRule({ errorMessage, params = null, validationFn }: Rule) {
    this.rules.push({
      errorMessage,
      params,
      validationFn
    });
    return this;
  }

  /**
   * Sign as require property
   *
   * @param errorMessage - Error message
   * @param trim - Trim string spaces
   *
   * @public
   */
  isRequired(errorMessage = this.requiredErrorMessage, trim = true) {
    this.required = true;
    this.trim = trim;
    this.requiredErrorMessage = errorMessage;

    return this;
  }
}

/**
 * Creates instance MixedType
 *
 * @public
 */
export function BaseType<T = any>(st = schemaType.property) {
  return new BaseSchemaType<T>(st);
}

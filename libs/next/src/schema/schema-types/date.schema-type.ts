import { errorMessages } from '../constants/error-messages.constant';
import { schemaType } from '../constants/schema-type.constant';
import { BaseSchemaType } from './base.schema-type';

/**
 * Date model type validation
 *
 * @public
 */
export class DateSchemaType extends BaseSchemaType<Date | string> {
  type = 'date';

  /**
   * Create DateSchemaType instance
   *
   * @param errorMessage - Error message
   */

  constructor(errorMessage: string) {
    super(schemaType.property);

    this.addRule({
      errorMessage,
      validationFn: (value) =>
        this.isEmpty(value)
          ? true
          : !/Invalid|NaN/.test(new Date(value).toString())
    });
  }

  /**
   * Test if date is between date ranges
   *
   * @param min - Minimum date
   * @param max - Maximum date
   * @param errorMessage - Error message
   * @public
   */
  range(
    min: string | Date,
    max: string | Date,
    errorMessage = errorMessages.date.range
  ) {
    this.addRule({
      errorMessage,
      params: { max, min },
      validationFn: (value) =>
        new Date(value) >= new Date(min) && new Date(value) <= new Date(max)
    });

    return this;
  }

  /**
   * Test if date is equal or greater than minimum date
   *
   * @param min - Minimum date
   * @param errorMessage - Error message
   * @public
   */
  min(min: string | Date, errorMessage = errorMessages.date.min) {
    this.addRule({
      errorMessage,
      params: { min },
      validationFn: (value) => new Date(value) >= new Date(min)
    });

    return this;
  }

  /**
   * Test if date is equal or less than maximum date
   *
   * @param max - Maximum date
   * @param errorMessage - Error message
   * @public
   */
  max(max: string | Date, errorMessage = errorMessages.date.max) {
    this.addRule({
      errorMessage,
      params: { max },
      validationFn: (value) => new Date(value) <= new Date(max)
    });

    return this;
  }
}

/**
 * Creats instance DateType
 *
 * @public
 */
export function DateType(errorMessage = errorMessages.date.type) {
  return new DateSchemaType(errorMessage);
}

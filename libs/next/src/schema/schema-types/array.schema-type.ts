import { errorMessages } from '../constants/error-messages.constant';
import { schemaType } from '../constants/schema-type.constant';
import { CheckResult, InferSchemaType, Maybe } from '../schema.types';
import { BaseSchemaType } from './base.schema-type';

/**
 * Array model type validation
 *
 * @public
 */
export class ArraySchemaType<T> extends BaseSchemaType<Array<T>> {
  type = 'array';

  /**
   * items model type
   */
  declare items: InferSchemaType<T> | null;

  /**
   * Create ArraySchemaType instance
   *
   * @param errorMessage - Error message for invalid type
   */
  constructor(items: Maybe<InferSchemaType<T>> = null, errorMessage: string) {
    super(schemaType.array);

    this.items = items || null;

    this.addRule({
      errorMessage,
      validationFn: (value) =>
        this.isEmpty(value) ? true : Array.isArray(value)
    });
  }

  /**
   * Validation of an empty array
   * @param value
   * @returns
   */
  isEmpty(value: Maybe<Array<T>>) {
    if (super.isEmpty(value)) {
      return true;
    }

    if (value && value.length === 0) {
      return true;
    } else {
      const childsArray: boolean[] = [];

      value?.forEach((item) => {
        if (this.items) {
          // TODO remove any
          childsArray.push(this.items.isEmpty(item as never));
        }
      });
      return childsArray.reduce((acc, item) => acc && item, true);
    }
  }

  /**
   * Set items model type
   * @param items
   * @returns
   */
  of(items: InferSchemaType<T>) {
    this.items = items;

    // do not need to validate type or add rule, it will do done by the instance items.

    return this;
  }

  /**
   * Validate array
   * @param values - array values to be validated
   * @param parent - parent value
   * @returns
   */
  // eslint-disable-next-line max-params
  async check(
    values: Maybe<Array<T>>,
    parent: any = null,
    context: any = null,
    drill = true
  ): Promise<CheckResult> {
    // call super check with bind this
    const baseValidation = await super.check(values, parent, context);

    if (drill) {
      const res: any = [];

      if (Array.isArray(values)) {
        for (let index = 0; index < values.length; index++) {
          if (this.items) {
            // TODO remove any
            res.push(
              await this.items.check(values[index] as never, values, index)
            );
          }
        }
      }

      // reduce errors
      const areItemsValid = res.reduce(
        (prev: boolean, curr: any) => prev && curr.isValid,
        true
      );

      return {
        ...baseValidation,
        hasError: baseValidation.errors.length > 0,
        isValid: baseValidation.errors.length === 0 && areItemsValid,
        items: res
      };
    } else {
      return {
        ...baseValidation,
        hasError: baseValidation.errors.length > 0,
        isValid: baseValidation.errors.length === 0
      };
    }
  }

  /**
   * Test if array length is between range
   *
   * @param minLength - Minimum length
   * @param maxLength - Maximum length
   * @param errorMessage - Error message
   * @public
   */
  rangeLength(
    minLength: number,
    maxLength: number,
    errorMessage = errorMessages.array.rangeLength
  ) {
    this.addRule({
      errorMessage,
      params: { maxLength, minLength },
      validationFn: (value: string[]) =>
        value.length >= minLength && value.length <= maxLength
    });
    return this;
  }

  /**
   * Test array minimum length
   *
   * @param minLength - Minimum length
   * @param errorMessage - Error message
   * @public
   */
  minLength(minLength: number, errorMessage = errorMessages.array.minLength) {
    this.addRule({
      errorMessage,
      params: { minLength },
      validationFn: (value) => value.length >= minLength
    });

    return this;
  }

  /**
   * Test array maximum length
   *
   * @param maxLength - Maximum length
   * @param errorMessage - Error message
   * @public
   */
  maxLength(maxLength: number, errorMessage = errorMessages.array.maxLength) {
    this.addRule({
      errorMessage,
      params: { maxLength },
      validationFn: (value) => value.length <= maxLength
    });
    return this;
  }
}

/**
 * Creats instance ObjectType
 *
 * @public
 */
export function ArrayType<T>(
  items: InferSchemaType<T> | null = null,
  errorMessage = errorMessages.array.type
) {
  return new ArraySchemaType(items, errorMessage);
}

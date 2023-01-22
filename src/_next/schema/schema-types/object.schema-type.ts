import { errorMessages } from '../constants/error-messages.constant';
import { CheckResult, Maybe, Properties } from '../schema.types';
import { schemaType } from '../constants/schema-type.constant';
import { BaseSchemaType } from './base.schema-type';

/**
 * Object model type validation
 *
 * @public
 */
export class ObjectSchemaType<T> extends BaseSchemaType<T> {
  type = 'object';

  /**
   * Properties model types.
   */
  declare properties: Properties<Omit<T, 'toJSON'>>;

  /**
   * Create ObjectSchemaType instance.
   *
   * @param errorMessage - Error message
   */
  constructor(
    properties: Properties<Omit<T, 'toJSON'>> = null,
    errorMessage: string
  ) {
    super(schemaType.object);

    this.properties = properties;

    this.addRule({
      errorMessage,
      validationFn: value =>
        this.isEmpty(value) ? true : typeof value === 'object'
    });
  }

  /**
   * Validate if an object is empty
   * @param value
   * @returns
   */
  isEmpty(value: Maybe<T>): boolean {
    if (super.isEmpty(value)) {
      return true;
    }

    // validate if all properties are empty, need to discuss this.
    const properties = this.properties || ({} as any);
    Object.keys(properties).reduce(
      (prev, curr) => properties[curr].isEmpty((value as any)[curr]) && prev,
      true
    );

    return false;
  }

  /**
   *
   * @param properties - Object properties
   * @public
   * @example
   * ObjectType().shape({
   *  name: StringType(),
   *  age: NumberType()
   * })
   */
  shape(properties: Properties<T>) {
    this.properties = properties;

    return this;
  }

  // eslint-disable-next-line max-params
  async check(
    value: Maybe<any>,
    parent: any = null,
    context: any = null,
    drill = true
  ): Promise<CheckResult> {
    const baseValidation = await super.check(value, parent, context);

    // validate properties
    const properties = this.properties || ({} as any);

    if (drill) {
      const res: any = {};

      for (const key of Object.keys(properties)) {
        res[key] = await properties[key].check(value[key], value, key, drill);
      }

      // reduce errors
      const arePropertiesValid = Object.keys(res).reduce(
        (prev, curr) => prev && res[curr].isValid,
        true
      );

      return {
        ...baseValidation,
        hasError: baseValidation.errors.length > 0,
        isValid: baseValidation.errors.length === 0 && arePropertiesValid,
        properties: res
      };
    } else {
      return {
        ...baseValidation,
        hasError: baseValidation.errors.length > 0,
        isValid: baseValidation.errors.length === 0
      };
    }
  }
}

/**
 * Creats instance ObjectType
 *
 * @public
 */
export function ObjectType<T>(
  shape: Properties<Omit<T, 'toJSON'>> = null,
  errorMessage = errorMessages.object.type
) {
  return new ObjectSchemaType(shape, errorMessage);
}

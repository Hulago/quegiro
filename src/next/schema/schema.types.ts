import { BooleanSchemaType } from './schema-types/boolean.schema-type';
import { NumberSchemaType } from './schema-types/number.schema-type';
import { ObjectSchemaType } from './schema-types/object.schema-type';
import { StringSchemaType } from './schema-types/string.schema-type';
import { ArraySchemaType } from './schema-types/array.schema-type';
import { BaseSchemaType } from './schema-types/base.schema-type';
import { DateSchemaType } from './schema-types/date.schema-type';
import { ErrorModel } from './models/error.model';

/**
 * Model Interface
 * Can implement a toJSON method to use with JSON.stringify
 */
export interface Model {
  toJSON?(): any;
}

/**
 * Infer which schema type is base on the native type
 */
export type InferSchemaType<T> = T extends number | null | undefined
  ? NumberSchemaType
  : T extends string | null | undefined
  ? StringSchemaType
  : T extends boolean | null | undefined
  ? BooleanSchemaType
  : T extends Date | null | undefined
  ? DateSchemaType
  : T extends (infer U)[] | null | undefined
  ? ArraySchemaType<U>
  : T extends object | null | undefined
  ? ObjectSchemaType<T>
  : BaseSchemaType<T>;

/**
 * Properties of ObjectSchemaType
 */
export type Properties<T = any> =
  | {
      [P in keyof T]: InferSchemaType<T[P]>;
    }
  | null;

/**
 * Rule signature for validation
 *
 * @public
 */
export interface Rule<V = any, P = any, C = any> {
  validationFn: validationFnType<V, P, C>;
  errorMessage?: string;
  params?: any;
}

/**
 * Validation funciton type
 */
export type validationFnType<V, P, C> = (
  value: V,
  parent?: P,
  stick?: C
) => boolean | Promise<boolean>;

export type Maybe<T> = T | null | undefined;

/**
 * Result from schema validation check.
 */
export interface CheckResult {
  hasError: boolean;
  isValid: boolean;
  errors: ErrorModel[];
  properties?: Record<string, CheckResult>;
  items?: CheckResult[];
}

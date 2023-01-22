import {
  ArraySchemaType,
  BaseSchemaType,
  ObjectSchemaType,
  schemaType
} from '../schema';
import { BaseControl } from './base-control';
import { FormArray } from './form-array';
import { FormControl } from './form-control';

/**
 * Form Group
 */
export class FormGroup<T = unknown> extends BaseControl<T> {
  properties = {} as Record<keyof T | string, BaseControl<T>>;

  constructor(
    schema: ObjectSchemaType<T>,
    parent: BaseControl<any> | null = null,
    context: any = null
  ) {
    super(schema, parent, context);

    if (this.schema.schemaType !== schemaType.object) {
      throw 'Invalid Schema type';
    }

    const { properties = {} } = schema;

    Object.keys(properties as object).forEach((key: keyof T | string) => {
      const childSchema = (schema.properties as any)[key] as
        | BaseSchemaType
        | ArraySchemaType<unknown>
        | ObjectSchemaType<unknown>;

      if (childSchema && childSchema.schemaType === schemaType.property) {
        this.properties[key] = new FormControl(
          childSchema as BaseSchemaType<any>,
          this,
          key
        );
      }

      if (childSchema && childSchema.schemaType === schemaType.array) {
        this.properties[key] = new FormArray(
          childSchema as ArraySchemaType<any>,
          this,
          key
        );
      }

      if (childSchema && childSchema.schemaType === schemaType.object) {
        this.properties[key] = new FormGroup(
          childSchema as ObjectSchemaType<any>,
          this,
          key
        );
      }
    });
  }

  async validate(data: any = this.data, drill = false) {
    const { errors, isValid } = await this.schema.check(
      data,
      this.parent?.weakMap.get(this.parent),
      null,
      drill
    );

    if (drill) {
      for (const key of Object.keys(this.properties)) {
        await this.properties[key].validate(data[key], drill);
      }
    }

    const propertiesValidation = Object.keys(this.properties).reduce(
      (acc, key) => acc && this.properties[key].isValid,
      true
    );

    this.isValid = isValid && propertiesValidation;
    this.errors = [...errors];

    if (this.parent) {
      await this.notifyParent();
    }
  }

  setData(data: T) {
    this.weakMap.set(this, data);

    Object.keys(this.properties).forEach(key => {
      if (data && key in data) {
        this.properties[key].setData((data as any)[key]);
      }
    });
  }

  async onChange(child: BaseControl<any>) {
    if (child.isDirty) {
      this.isDirty = true;
    }

    this.isFocus = child.isFocus;

    if (!this.isTouch) {
      this.isTouch = child.isTouch;
    }

    this.isLoading = child.isLoading;

    if (
      child.context !== null &&
      child.context !== undefined &&
      this.weakMap.get(this) !== null &&
      this.weakMap.get(this) !== undefined &&
      JSON.stringify((this.weakMap.get(this) as any)[child.context]) !==
        JSON.stringify(child.weakMap.get(child))
    ) {
      (this.weakMap.get(this) as any)[child.context] = child.weakMap.get(child);
    }

    await this.validate(this.weakMap.get(this));
  }
}

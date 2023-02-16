import {
  ArraySchemaType,
  BaseSchemaType,
  ObjectSchemaType,
  schemaType
} from '../schema';
import { BaseControl } from './base-control';
import { FormControl } from './form-control';
import { FormArray } from './form-array';

/**
 * Form Group
 */
export class FormGroup<T = any> extends BaseControl<T> {
  properties: Record<keyof T, BaseControl<T>> = {} as Record<
    keyof T,
    BaseControl<T>
  >;

  // properties: {
  //   [P in keyof T] | [key: string]: BaseControl<T>;
  // }

  constructor(
    schema: ObjectSchemaType<T>,
    parent: BaseControl<any> | null = null,
    context: any = null
  ) {
    super(schema, parent, context);

    if (this.schema.schemaType !== schemaType.object) {
      throw new Error('Invalid Schema type');
    }

    Object.keys(schema.properties).forEach(key => {
      const childSchema = (schema.properties as any)[key] as
        | BaseSchemaType<any>
        | ArraySchemaType<any>
        | ObjectSchemaType<any>;

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
      this.parent?.data,
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
    this.data = data;
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
      (child.context !== null || child.context !== undefined) &&
      (this.data !== null || this.data !== undefined) &&
      JSON.stringify((this.data as any)[child.context]) !==
        JSON.stringify(child.data)
    ) {
      (this.data as any)[child.context] = child.data;
    }

    await this.validate(this.data);
  }
}

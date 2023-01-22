import {
  ArraySchemaType,
  BaseSchemaType,
  ObjectSchemaType,
  schemaType
} from '../schema';
import { BaseControl } from './base-control';
import { FormControl } from './form-control';
import { FormGroup } from './form-group';

/**
 * Form Array
 */

// TODO Add items

export class FormArray<T = any> extends BaseControl<T> {
  items: Array<BaseControl<T>> | never[] = [];

  declare schema: ArraySchemaType<T>;

  constructor(
    schema: ArraySchemaType<T>,
    parent: BaseControl<any> | null = null,
    context: any = null
  ) {
    super(schema, parent, context);
  }

  async validate(data: any = this.data, drill = false) {
    const { errors, isValid } = await this.schema.check(
      data,
      this.parent?.data,
      null,
      drill
    );

    if (drill) {
      for (let i = 0; i < this.items.length; i++) {
        await this.items[i].validate(data[i], drill);
      }
    }

    const childValidation = (this.items as Array<BaseControl<any>>).reduce(
      (acc, item) => acc && item.isValid,
      true
    );

    this.isValid = isValid && childValidation;
    this.errors = [...errors];

    if (this.parent) {
      this.notifyParent();
    }
  }

  setData(data: any) {
    this.data = data;
    data.forEach((item: any, index: number) => {
      if (this.items[index]) {
        this.items[index].setData(item);
      } else {
        if (this.schema.items?.schemaType === schemaType.property) {
          this.items[index] = new FormControl(
            this.schema?.items as BaseSchemaType<any>,
            this,
            index
          );
        }

        if (this.schema.items?.schemaType === schemaType.array) {
          this.items[index] = new FormArray(
            this.schema?.items as ArraySchemaType<any>,
            this,
            index
          );
        }

        if (this.schema.items?.schemaType === schemaType.object) {
          this.items[index] = new FormGroup(
            this.schema?.items as ObjectSchemaType<any>,
            this,
            index
          );
        }

        this.items[index].setData(item);
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

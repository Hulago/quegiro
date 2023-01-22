/* eslint-disable no-unused-vars */
import {
  ArraySchemaType,
  BaseSchemaType,
  ErrorModel,
  ObjectSchemaType
} from '../schema';

/**
 * Base Control
 */
export class BaseControl<T = any> {
  items?: Array<BaseControl<T>> | never[] = [];
  properties?: Record<string, BaseControl<T>> = {};

  isDirty = false;
  isTouch = false;
  isFocus = false;
  isLoading = false;
  isValid = true;
  errors: ErrorModel[] = [];

  context: any;

  data: T | null | undefined;

  schema: BaseSchemaType<T> | ArraySchemaType<T> | ObjectSchemaType<T>;
  parent: BaseControl<any> | null;

  constructor(
    schema: BaseSchemaType<T> | ArraySchemaType<T> | ObjectSchemaType<T>,
    parent: BaseControl<any> | null = null,
    context: any = null
  ) {
    this.parent = parent;
    this.schema = schema;
    this.context = context;
  }

  get isPrestine() {
    return this.isDirty === false && this.isTouch === false;
  }

  /**
   * Getter has errors
   */
  get hasErrors() {
    return this.errors.length > 0;
  }

  /**
   * Set control dirty state to true
   */
  setDirty() {
    this.isDirty = true;
    this.isTouch = true;
    if (this.parent) {
      this.parent.setDirty();
    }
  }

  /**
   * Set control touch state to true
   */
  setTouch() {
    this.isTouch = true;
    if (this.parent) {
      this.parent.setTouch();
    }
  }

  /**
   * Set control focus state
   * @param focus focus state
   */
  setFocus(focus: boolean) {
    this.isFocus = focus;
    this.isTouch = true;
    if (this.parent) {
      this.parent.setFocus(focus);
    }
  }

  setData(data: any) {
    if (
      this.schema.type === 'array' ||
      this.schema.type === 'object' ||
      data === null ||
      data === undefined ||
      data === ''
    ) {
      (this.data as any) = data;
    } else {
      if (
        this.schema.type === 'number' &&
        data !== null &&
        data !== undefined &&
        data !== ''
      ) {
        (this.data as any) = Number(data);
      }

      if (
        this.schema.type === 'string' &&
        data !== null &&
        data !== undefined &&
        data !== ''
      ) {
        (this.data as any) = String(data);
      }

      if (
        this.schema.type === 'boolean' &&
        data !== null &&
        data !== undefined &&
        data !== ''
      ) {
        (this.data as any) = Boolean(data);
      }

      if (
        this.schema.type === 'date' &&
        data !== null &&
        data !== undefined &&
        data !== ''
      ) {
        (this.data as any) = new Date(data);
      }
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async validate(data: any = this.data, drill = false) {
    const { errors, isValid } = await this.schema.check(
      data,
      this.parent?.data
    );

    this.isValid = isValid;
    this.errors = [...errors];

    if (this.parent) {
      await this.notifyParent();
    }
  }

  async notifyParent() {
    if (this.parent && this.parent.onChange) {
      await this.parent.onChange(this);
    }
  }

  // eslint-disable-next-line no-unused-vars
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onChange(child: BaseControl<T>) {
    /** do nothing */
  }
}

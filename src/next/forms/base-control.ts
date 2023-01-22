/* eslint-disable no-unused-vars */
import {
  ArraySchemaType,
  BaseSchemaType,
  ErrorModel,
  ObjectSchemaType
} from '../schema';
import { DATA_TYPES } from './constants';

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

  // data: T | null | undefined;

  schema: BaseSchemaType<T> | ArraySchemaType<T> | ObjectSchemaType<T>;

  parent: BaseControl<any> | null;

  weakMap = new WeakMap<typeof this, unknown>();

  get isPrestine() {
    return this.isDirty === false && this.isTouch === false;
  }

  /**
   * Getter has errors
   */
  get hasErrors() {
    return this.errors.length > 0;
  }
  get data() {
    return this.weakMap.get(this);
  }
  constructor(
    schema: BaseSchemaType<T> | ArraySchemaType<T> | ObjectSchemaType<T>,
    parent: BaseControl<any> | null = null,
    context: any = null
  ) {
    this.parent = parent;
    this.schema = schema;
    this.context = context;
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
    const { type } = this.schema;
    const isDataValid = data !== null && data !== undefined && data !== '';

    switch (type) {
      case DATA_TYPES.NUMBER:
        this.weakMap.set(this, isDataValid ? Number(data) : data);
        break;

      case DATA_TYPES.STRING:
        this.weakMap.set(this, isDataValid ? String(data) : data);
        break;

      case DATA_TYPES.BOOLEAN:
        this.weakMap.set(this, isDataValid ? Boolean(data) : data);
        break;

      case DATA_TYPES.DATE:
        this.weakMap.set(this, isDataValid ? new Date(data) : data);
        break;

      case DATA_TYPES.ARRAY || DATA_TYPES.OBJECT:
        this.weakMap.set(this, data);
        break;
      default:
        break;
    }
  }

  async validateAll(data: any = this.weakMap.get(this)) {
    return this.validate(data, true);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async validate(data: any = this.weakMap.get(this), drill = false) {
    const { errors, isValid } = await this.schema.check(
      data,
      this.parent?.weakMap.get(this.parent),
      this.context
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

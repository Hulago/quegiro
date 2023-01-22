import { BaseControl } from './base-control';
import { BaseSchemaType } from '../schema';

/**
 * Form Control
 */
export class FormControl<T = any> extends BaseControl<T> {
  constructor(
    schema: BaseSchemaType<T>,
    parent: BaseControl<any> | null = null,
    context: any = null
  ) {
    super(schema, parent, context);
  }
}

/**
|--------------------------------------------------------------------------
| Copyright Websublime All Rights Reserved.
|--------------------------------------------------------------------------
|
| Use of this source code is governed by an MIT-style license that can be
| found in the LICENSE file at https://websublime.dev/license
|
*/

import { errorMessages } from '../constants/error-messages.constant';
import { schemaType } from '../constants/schema-type.constant';
import { BaseSchemaType } from './base.schema-type';

/**
 * Boolean type validation
 *
 * @public
 */
export class BooleanSchemaType extends BaseSchemaType<boolean> {
  type = 'boolean';

  /**
   * Create BooleanType instance
   *
   * @param errorMessage - Error message
   */
  constructor(errorMessage: string) {
    super(schemaType.property);

    this.addRule({
      errorMessage,
      validationFn: value =>
        this.isEmpty(value) ? true : typeof value === 'boolean'
    });
  }
}

/**
 * Creates instance BooleanType
 *
 * @param errorMessage - Error message
 *
 * @public
 */
export function BooleanType(errorMessage = errorMessages.boolean.type) {
  return new BooleanSchemaType(errorMessage);
}

/**
|--------------------------------------------------------------------------
| Copyright Websublime All Rights Reserved.
|--------------------------------------------------------------------------
|
| Use of this source code is governed by an MIT-style license that can be
| found in the LICENSE file at https://websublime.dev/license
|
*/

/**
 * @public
 */
export class ErrorModel {
  /**
   * Key identifier
   */
  key: string;

  /**
   * I18N flag
   */
  i18n: string;

  /**
   * Constrait
   */
  constraints: any;

  /**
   * Value
   */
  value: any;

  constructor(data: Partial<ErrorModel> = {}) {
    const {
      constraints = null,
      i18n = 'ERROR.UNKNOWN',
      key = 'UNKNOWN',
      value = null,
    } = data || {};

    this.key = key;
    this.constraints = constraints;
    this.value = value;
    this.i18n = i18n;
  }
}

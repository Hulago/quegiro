/**
 * Error Model
 *
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
      i18n = 'KIT.ERROR.UNKNOWN',
      key = 'UNKNOWN',
      value = null
    } = data || {};

    this.key = key;
    this.constraints = constraints;
    this.value = value;
    this.i18n = i18n;
  }
}

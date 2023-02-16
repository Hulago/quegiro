import { ErrorModel } from '../../index';

describe('> ErrorModel', () => {
  it('Should have default values', () => {
    const error = new ErrorModel();

    expect(error.constraints).toBeNull();
    expect(error.i18n).toEqual('KIT.ERROR.UNKNOWN');
    expect(error.key).toEqual('UNKNOWN');
    expect(error.value).toBeNull();
  });
});

/* eslint-disable @typescript-eslint/no-var-requires */
import { BooleanType, errorMessages } from '../../index';

describe('> BooleanType', () => {
  it('Should be a valid boolean', async () => {
    const data = BooleanType();
    const data2 = BooleanType().isRequired();

    expect((await data.check(true)).hasError).toBeFalsy();
    expect((await data.check(false)).hasError).toBeFalsy();
    expect((await data.check(0 as any)).hasError).toBeTruthy();
    expect((await data.check('' as any)).hasError).toBeFalsy();
    expect((await data.check(null)).hasError).toBeFalsy();

    expect((await data.check(undefined)).hasError).toBeFalsy();

    expect((await data.check(0 as any)).errors[0].i18n).toEqual(
      errorMessages.boolean.type
    );

    expect((await data2.check('' as any)).hasError).toBeTruthy();
    expect((await data2.check(null)).hasError).toBeTruthy();
    expect((await data2.check(undefined)).hasError).toBeTruthy();
    expect((await data2.check('' as any)).errors[0].i18n).toEqual(
      errorMessages.base.isRequired
    );
  });
});

/* eslint-disable @typescript-eslint/no-var-requires */
import { DateType, errorMessages } from '../../index';

describe('> DateType', () => {
  it('Should be a valid date', async () => {
    const data = DateType();
    const data2 = DateType().isRequired();

    expect((await data.check(new Date())).hasError).toBeFalsy();
    expect((await data.check('date' as any)).hasError).toBeTruthy();

    expect((await data.check('')).hasError).toBeFalsy();
    expect((await data.check(null)).hasError).toBeFalsy();
    expect((await data.check(undefined)).hasError).toBeFalsy();
    expect((await data.check('date' as any)).errors[0].i18n).toEqual(
      errorMessages.date.type
    );

    expect((await data2.check('' as any)).hasError).toBeTruthy();
    expect((await data2.check(null)).hasError).toBeTruthy();
    expect((await data2.check(undefined)).hasError).toBeTruthy();
    expect((await data2.check('' as any)).errors[0].i18n).toEqual(
      errorMessages.base.isRequired
    );
  });

  it('Should be within the date range', async () => {
    const data = DateType().range('2020-01-01', '2020-02-01');

    expect((await data.check('2020-01-02')).hasError).toBeFalsy();
    expect((await data.check('2020-02-02')).hasError).toBeTruthy();
    expect((await data.check('2020-02-02')).errors[0].i18n).toEqual(
      errorMessages.date.range
    );
  });

  it('Should not be less than the minimum date', async () => {
    const data = DateType().min('2020-01-01');

    expect((await data.check('2020-01-02')).hasError).toBeFalsy();
    expect((await data.check('2019-12-30')).hasError).toBeTruthy();
    expect((await data.check('2019-12-30')).errors[0].i18n).toEqual(
      errorMessages.date.min
    );
  });

  it('Should not exceed the maximum date', async () => {
    const data = DateType().max('2020-01-01');

    expect((await data.check('2019-12-30')).hasError).toBeFalsy();
    expect((await data.check('2020-01-02')).hasError).toBeTruthy();
    expect((await data.check('2020-01-02')).errors[0].i18n).toEqual(
      errorMessages.date.max
    );
  });
});

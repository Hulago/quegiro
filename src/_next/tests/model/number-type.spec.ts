/* eslint-disable @typescript-eslint/no-var-requires */
import { errorMessages, NumberType } from '../../index';

describe('> NumberType', () => {
  const validationSchema = NumberType();

  it('Should be a valid number', async () => {
    expect((await validationSchema.check(2.22)).hasError).toBeFalsy();
    expect((await validationSchema.check(2.22)).hasError).toBeFalsy();
    expect((await validationSchema.check(2)).hasError).toBeFalsy();
    expect((await validationSchema.check(-222)).hasError).toBeFalsy();
  });

  it('Should not be checked', async () => {
    expect((await validationSchema.check(null)).hasError).toBeFalsy();
    expect((await validationSchema.check(undefined)).hasError).toBeFalsy();
    expect((await validationSchema.check('' as any)).hasError).toBeFalsy();
  });

  it('Should be a invalid number', async () => {
    expect((await validationSchema.check('abc' as any)).hasError).toBeTruthy();

    expect((await validationSchema.check('1' as any)).hasError).toBeTruthy();

    // falar com o Ramos Devemos fazer cast ? Validation usar isNaN

    expect((await validationSchema.check({} as any)).hasError).toBeTruthy();

    expect((await validationSchema.check([] as any)).hasError).toBeTruthy();

    expect((await validationSchema.check(true as any)).hasError).toBeTruthy();

    const fn = () => 0;

    expect((await validationSchema.check(fn as any)).hasError).toBeTruthy();

    expect((await validationSchema.check([] as any)).errors[0].i18n).toEqual(
      errorMessages.number.type
    );
  });

  it('Null and Undefined should be a invalid number', async () => {
    const validationSchema = NumberType().isRequired();

    expect((await validationSchema.check(null)).hasError).toBeTruthy();

    expect((await validationSchema.check(undefined)).hasError).toBeTruthy();
  });

  it('Should be an integer', async () => {
    const validationSchema = NumberType().isInteger();

    expect((await validationSchema.check(1)).hasError).toBeFalsy();
    // expect((await validationSchema.check('1' as any)).hasError).toBeFalsy();  falar com o Ramos
    expect((await validationSchema.check(-1)).hasError).toBeFalsy();
    expect((await validationSchema.check(1.1)).hasError).toBeTruthy();
    expect((await validationSchema.check(1.1)).errors[0].i18n).toEqual(
      errorMessages.number.isInteger
    );
  });

  it('Should not be lower than the minimum', async () => {
    const validationSchema = NumberType().min(10);

    expect((await validationSchema.check(10)).hasError).toBeFalsy();
    expect((await validationSchema.check(9)).hasError).toBeTruthy();
    expect((await validationSchema.check(9)).errors[0].i18n).toEqual(
      errorMessages.number.min
    );

    expect((await validationSchema.check(9)).errors[0].value).toEqual(9);

    expect((await validationSchema.check(9)).errors[0].constraints.min).toEqual(
      10
    );
  });

  it('Should not exceed the maximum', async () => {
    const validationSchema = NumberType().max(10);

    expect((await validationSchema.check(9)).hasError).toBeFalsy();
    expect((await validationSchema.check(11)).hasError).toBeTruthy();
    expect((await validationSchema.check(11)).errors[0].i18n).toEqual(
      errorMessages.number.max
    );

    expect((await validationSchema.check(11)).errors[0].value).toEqual(11);

    expect(
      (await validationSchema.check(11)).errors[0].constraints.max
    ).toEqual(10);
  });

  it('Should be within the range of optional values', async () => {
    const validationSchema = NumberType().range(10, 20);

    expect((await validationSchema.check(10)).hasError).toBeFalsy();
    expect((await validationSchema.check(15)).hasError).toBeFalsy();
    expect((await validationSchema.check(20)).hasError).toBeFalsy();
    expect((await validationSchema.check(9)).hasError).toBeTruthy();
    expect((await validationSchema.check(9)).errors[0].i18n).toEqual(
      errorMessages.number.range
    );

    expect((await validationSchema.check(21)).errors[0].i18n).toEqual(
      errorMessages.number.range
    );

    expect((await validationSchema.check(9)).errors[0].value).toEqual(9);

    expect((await validationSchema.check(9)).errors[0].constraints.max).toEqual(
      20
    );

    expect((await validationSchema.check(9)).errors[0].constraints.min).toEqual(
      10
    );
  });

  it('Should be within the following value range: 1,2,3,4', async () => {
    const validationSchema = NumberType().isOneOf([1, 2, 3, 4]);

    expect((await validationSchema.check(1)).hasError).toBeFalsy();
    expect((await validationSchema.check(2)).hasError).toBeFalsy();
    expect((await validationSchema.check(3)).hasError).toBeFalsy();
    expect((await validationSchema.check(4)).hasError).toBeFalsy();
    expect((await validationSchema.check(5)).hasError).toBeTruthy();

    expect((await validationSchema.check(5)).errors[0].i18n).toEqual(
      errorMessages.number.isOneOf
    );
  });

  it('Should allow custom rules', async () => {
    const validationSchema = NumberType().pattern(/^-?1\d+$/);

    expect((await validationSchema.check(11)).hasError).toBeFalsy();
    expect((await validationSchema.check(12)).hasError).toBeFalsy();
    expect((await validationSchema.check(22)).hasError).toBeTruthy();

    expect((await validationSchema.check(22)).errors[0].i18n).toEqual(
      errorMessages.number.pattern
    );
  });
});

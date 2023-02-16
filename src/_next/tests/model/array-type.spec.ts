import {
  // BooleanType,
  // DateType,
  ArrayType,
  errorMessages,
  NumberType,
  ObjectType,
  StringType
} from '../../index';

describe('> ArrayType', () => {
  it('Should be a valid array', async () => {
    const arr1 = ArrayType<string>()
      .minLength(2, 'error1')
      .of(StringType().isEmail('error2'));

    const arr2 = ArrayType<string>().minLength(2).of(StringType().isEmail());

    const check1 = await arr1.check([
      'miguel.ramos@quegiro.com',
      'ddddd@d.com',
      'ddd@bbb.com'
    ]);

    expect(check1.hasError).toBeFalsy();
    expect(check1.items && check1.items[0].hasError).toBeFalsy();
    expect(check1.items && check1.items[1].hasError).toBeFalsy();
    expect(check1.items && check1.items[2].hasError).toBeFalsy();

    const check2 = await arr2.check([
      'miguel.ramos@quegiro.com',
      'error_email',
      'ddd@bbb.com'
    ]);

    expect(check2.hasError).toBeFalsy();
    expect(check2.isValid).toBeFalsy();
    expect(check2.items && check2.items[1].hasError).toBeTruthy();

    expect(check2.items && check2.items[1].errors[0].i18n).toEqual(
      errorMessages.string.isEmail
    );

    const check3 = await arr2.check([]);

    expect(check3.errors[0].i18n).toEqual(errorMessages.array.minLength);

    const check4 = await arr2.check([
      'miguel.ramos@quegiro.com',
      'error_email',
      'ddd@bbb.com'
    ]);

    expect(check4.items && check4.items[1].errors[0].i18n).toEqual(
      errorMessages.string.isEmail
    );
    expect(check4.items && check4.items[1].errors[0].key).toEqual(1);
  });

  it('Should support array nested objects', async () => {
    const schema = ArrayType().of(
      ObjectType().shape({
        age: NumberType().min(18),
        email: StringType().isEmail()
      })
    );

    const checkStatus = await schema.check([
      'miguel.ramos@quegiro.com',
      { age: 19, email: 'error_email' },
      { age: 17, email: 'error_email' }
    ]);

    const firstElement = checkStatus.items && checkStatus.items[0];
    const secondElement = checkStatus.items && checkStatus.items[1];
    const thirdElement = checkStatus.items && checkStatus.items[2];

    expect(checkStatus.hasError).toBeFalsy();
    expect(checkStatus.isValid).toBeFalsy();
    expect(firstElement?.hasError).toBeTruthy();
    expect(firstElement?.errors[0].i18n).toEqual(errorMessages.object.type);

    expect(secondElement?.properties?.email?.hasError).toBeTruthy();
    expect(secondElement?.properties?.email?.errors[0].i18n).toEqual(
      errorMessages.string.isEmail
    );
    expect(secondElement?.properties?.age.hasError).toBeFalsy();

    expect(thirdElement?.properties?.email.hasError).toBeTruthy();
    expect(thirdElement?.properties?.email.errors[0].i18n).toEqual(
      errorMessages.string.isEmail
    );
    expect(thirdElement?.properties?.age.hasError).toBeTruthy();
    expect(thirdElement?.properties?.age.errors[0].i18n).toEqual(
      errorMessages.number.min
    );
  });

  it('Should be required ', async () => {
    const schema = ArrayType().isRequired();

    const checkStatus = await schema.check(null);

    expect(checkStatus.hasError).toBeTruthy();
    expect(checkStatus.errors[0].i18n).toEqual(errorMessages.base.isRequired);

    expect((await schema.check(null)).hasError).toBeTruthy();

    expect((await schema.check(undefined)).hasError).toBeTruthy();
  });

  it('Should be within the number of items', async () => {
    const schema = ArrayType(NumberType()).rangeLength(2, 4);

    expect((await schema.check([1, 2])).hasError).toBeFalsy();
    expect((await schema.check([1])).hasError).toBeTruthy();
    expect((await schema.check([1, 2, 3, 4, 5])).hasError).toBeTruthy();
    expect((await schema.check([1])).errors[0].i18n).toEqual(
      errorMessages.array.rangeLength
    );
  });

  it('Should not exceed the maximum number of items', async () => {
    const schema = ArrayType().maxLength(2);

    expect((await schema.check([1, 2, 3])).hasError).toBeTruthy();
    expect((await schema.check([1, 2, 3])).errors[0].i18n).toEqual(
      errorMessages.array.maxLength
    );
  });

  it('Should not be less than the maximum number of items', async () => {
    const schema = ArrayType().minLength(2);

    expect((await schema.check([1])).hasError).toBeTruthy();
    expect((await schema.check([1])).errors[0].i18n).toEqual(
      errorMessages.array.minLength
    );
  });
});

/* eslint-disable @typescript-eslint/no-var-requires */
import {
  // BooleanType,
  // DateType,
  errorMessages,
  NumberType,
  ObjectType,
  StringType
} from '../../index';

describe('> ObjectType', () => {
  it('Should be a valid object', async () => {
    const schemaObject = ObjectType<{ age: number; email: string }>({
      age: NumberType().min(18),
      email: StringType().isEmail()
    });

    let validation = await schemaObject.check({
      age: 19,
      email: 'miguel.ramos@quegiro.com'
    });

    expect(validation.properties?.age.hasError).toBeFalsy();
    expect(validation.properties?.email.hasError).toBeFalsy();

    validation = await schemaObject.check({
      age: 19,
      email: 'miguel.ramos'
    });

    expect(validation.properties?.age.hasError).toBeFalsy();
    expect(validation.properties?.age.isValid).toBeTruthy();
    expect(validation.properties?.email.hasError).toBeTruthy();
    expect(validation.properties?.email.errors[0].i18n).toEqual(
      errorMessages.string.isEmail
    );

    expect(validation.isValid).toBeFalsy();

    // note the object do not have errors but is invalid because of his child properties
    // Discuss with Miguel Ramos
    expect(validation.hasError).toBeFalsy();
  });

  it('Should validate is empty', async () => {
    const schemaObject = ObjectType<{ age: number; email: string }>({
      age: NumberType().min(18),
      email: StringType().isEmail()
    });

    const nullValidation = await schemaObject.isEmpty(null);

    expect(nullValidation).toBeTruthy();
  });

  it('Should be checked for object nesting.', async () => {
    class Parent {
      age: number;
      email: string;
    }
    class User {
      age?: number;
      email: string;
      parent: Parent;
    }

    const schema = ObjectType<User>({
      age: NumberType().min(18),
      email: StringType().isEmail(),
      parent: ObjectType<Parent>().shape({
        age: NumberType().min(50),
        email: StringType().isEmail()
      })
    });

    // schema.properties?.age.

    const checkStatus = await schema.check({
      age: 17,
      email: 'miguel.ramos@quegiro.com',
      parent: { age: 40, email: 'zicheng' }
    });

    expect(checkStatus.hasError).toBeFalsy();
    expect(checkStatus.isValid).toBeFalsy();
    expect(checkStatus.properties?.email.hasError).toBeFalsy();
    expect(checkStatus.properties?.age.hasError).toBeTruthy();
    expect(checkStatus.properties?.age.errors[0].i18n).toEqual(
      errorMessages.number.min
    );
    expect(checkStatus.properties?.parent.hasError).toBeFalsy();
    expect(checkStatus.properties?.parent.isValid).toBeFalsy();

    const parentCheckStatus = checkStatus.properties?.parent;

    expect(parentCheckStatus?.properties?.email.hasError).toBeTruthy();
    expect(parentCheckStatus?.properties?.email.errors[0].i18n).toEqual(
      errorMessages.string.isEmail
    );
    expect(parentCheckStatus?.properties?.age.hasError).toBeTruthy();
    expect(parentCheckStatus?.properties?.age.errors[0].i18n).toEqual(
      errorMessages.number.min
    );

    expect(parentCheckStatus?.properties?.age.errors[0].key).toEqual('age');

    const checkStatus2 = await schema.check({
      age: 18,
      email: 'miguel.ramos@quegiro.com',
      parent: { age: 50, email: 'zicheng@dd.com' }
    });

    expect(checkStatus2.hasError).toBeFalsy();
    expect(checkStatus2.properties?.age.hasError).toBeFalsy();
    expect(checkStatus2.properties?.age.hasError).toBeFalsy();
    expect(checkStatus2.properties?.parent.hasError).toBeFalsy();

    const parentCheckStatus2 = checkStatus2.properties?.parent;

    expect(parentCheckStatus2?.properties?.email.hasError).toBeFalsy();
    expect(parentCheckStatus2?.properties?.age.hasError).toBeFalsy();
  });
});

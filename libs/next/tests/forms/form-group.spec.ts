/* eslint-disable @typescript-eslint/no-var-requires */

import {
  errorMessages,
  FormGroup,
  NumberType,
  ObjectType,
  StringType
} from '../../index';

describe('> FormGroup', () => {
  it('Should have default state', () => {
    const schema = ObjectType({
      age: NumberType().isRequired().min(18),
      email: StringType().isRequired().isEmail(),
      name: StringType().isRequired()
    });
    const control = new FormGroup(schema);

    expect(control.isFocus).toBeFalsy();
    expect(control.isDirty).toBeFalsy();
    expect(control.isTouch).toBeFalsy();
    expect(control.isPrestine).toBeTruthy();
    expect(control.isValid).toBeTruthy();
    expect(control.hasErrors).toBeFalsy();
  });

  it('Should propagate focus', () => {
    const schema = ObjectType({
      age: NumberType().isRequired().min(18),
      email: StringType().isRequired().isEmail(),
      name: StringType().isRequired()
    });
    const control = new FormGroup(schema);

    control.properties.age.setFocus(true);

    expect(control.isFocus).toBeTruthy();
    expect(control.isDirty).toBeFalsy();
    expect(control.isTouch).toBeTruthy();
    expect(control.isPrestine).toBeFalsy();
  });

  it('Should propagate touch', () => {
    const schema = ObjectType({
      age: NumberType().isRequired().min(18),
      email: StringType().isRequired().isEmail(),
      name: StringType().isRequired()
    });
    const control = new FormGroup(schema);

    control.properties.age.setTouch();

    expect(control.isFocus).toBeFalsy();
    expect(control.isDirty).toBeFalsy();
    expect(control.isTouch).toBeTruthy();
    expect(control.properties.age.isTouch).toBeTruthy();
    expect(control.isPrestine).toBeFalsy();
  });

  it('Should propagate dirty', () => {
    const schema = ObjectType({
      age: NumberType().isRequired().min(18),
      email: StringType().isRequired().isEmail(),
      name: StringType().isRequired()
    });
    const control = new FormGroup(schema);

    control.properties.email.setDirty();

    expect(control.isFocus).toBeFalsy();
    expect(control.isDirty).toBeTruthy();
    expect(control.properties.email.isDirty).toBeTruthy();
    expect(control.properties.email.isTouch).toBeTruthy();
    expect(control.isTouch).toBeTruthy();
    expect(control.isPrestine).toBeFalsy();
  });

  it('Should set data', () => {
    const schema = ObjectType({
      age: NumberType().isRequired().min(18),
      email: StringType().isRequired().isEmail(),
      name: StringType().isRequired()
    });
    const control = new FormGroup(schema);

    control.setData({
      age: 10,
      email: 'teste@teste.com',
      name: 'test'
    });

    expect(JSON.stringify(control.data)).toEqual(
      JSON.stringify({
        age: 10,
        email: 'teste@teste.com',
        name: 'test'
      })
    );
    expect(control.properties.age.data).toEqual(10);
    expect(control.properties.email.data).toEqual('teste@teste.com');
    expect(control.properties.name.data).toEqual('test');

    expect(control.isValid).toBeTruthy();
    expect(control.isDirty).toBeFalsy();

    expect(control.properties.age.isValid).toBeTruthy();
    expect(control.properties.age.isDirty).toBeFalsy();
  });

  it('Should validate field', async () => {
    const schema = ObjectType({
      age: NumberType().isRequired().min(18),
      email: StringType().isRequired().isEmail(),
      name: StringType().isRequired()
    });
    const control = new FormGroup(schema);

    control.setData({
      age: 10,
      email: 'teste@teste.com',
      name: 'test'
    });

    await control.validate();

    expect(control.isFocus).toBeFalsy();
    expect(control.isDirty).toBeFalsy();
    expect(control.isTouch).toBeFalsy();
    expect(control.isPrestine).toBeTruthy();
    expect(control.isValid).toBeTruthy();
    expect(control.hasErrors).toBeFalsy();

    await control.properties.age.validate();

    expect(control.isValid).toBeFalsy();
    expect(control.hasErrors).toBeFalsy();
    expect(control.properties.age.errors[0].i18n).toBe(
      errorMessages.number.min
    );
  });
});

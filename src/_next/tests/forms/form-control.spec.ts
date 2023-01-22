/* eslint-disable @typescript-eslint/no-var-requires */
import { errorMessages, FormControl, NumberType } from '../../index';

describe('> FormControl', () => {
  it('Should have default state', () => {
    const schema = NumberType().isRequired().max(10);
    const control = new FormControl(schema);

    expect(control.isFocus).toBeFalsy();
    expect(control.isDirty).toBeFalsy();
    expect(control.isTouch).toBeFalsy();
    expect(control.isPrestine).toBeTruthy();
    expect(control.isValid).toBeTruthy();
    expect(control.hasErrors).toBeFalsy();
  });

  it('Should set focus', () => {
    const schema = NumberType().isRequired().max(10);
    const control = new FormControl(schema);

    control.setFocus(true);

    expect(control.isFocus).toBeTruthy();
    expect(control.isDirty).toBeFalsy();
    expect(control.isTouch).toBeTruthy();
    expect(control.isPrestine).toBeFalsy();
  });

  it('Should set touch', () => {
    const schema = NumberType().isRequired().max(10);
    const control = new FormControl(schema);

    control.setTouch();

    expect(control.isFocus).toBeFalsy();
    expect(control.isDirty).toBeFalsy();
    expect(control.isTouch).toBeTruthy();
    expect(control.isPrestine).toBeFalsy();
  });

  it('Should be dirty', () => {
    const schema = NumberType().isRequired().max(10);
    const control = new FormControl(schema);
    control.setDirty();

    expect(control.isFocus).toBeFalsy();
    expect(control.isDirty).toBeTruthy();
    expect(control.isTouch).toBeTruthy();
    expect(control.isPrestine).toBeFalsy();
  });

  it('Should set data', () => {
    const schema = NumberType().isRequired().max(10);
    const control = new FormControl<number>(schema);
    control.setData(123);

    expect(control.isFocus).toBeFalsy();
    expect(control.isDirty).toBeFalsy();
    expect(control.isTouch).toBeFalsy();
    expect(control.isPrestine).toBeTruthy();
    expect(control.isValid).toBeTruthy();
    expect(control.hasErrors).toBeFalsy();
  });

  it('Should validate field', async () => {
    const schema = NumberType().isRequired().max(10);
    const control = new FormControl<number>(schema);
    control.setData(123);

    await control.validate();

    expect(control.isFocus).toBeFalsy();
    expect(control.isDirty).toBeFalsy();
    expect(control.isTouch).toBeFalsy();
    expect(control.isPrestine).toBeTruthy();
    expect(control.isValid).toBeFalsy();
    expect(control.hasErrors).toBeTruthy();
    expect(control.errors[0].i18n).toEqual(errorMessages.number.max);
  });

  it('Should validate required', async () => {
    const schema = NumberType().isRequired().max(10);
    const control = new FormControl<number>(schema);

    await control.validate();

    expect(control.isFocus).toBeFalsy();
    expect(control.isDirty).toBeFalsy();
    expect(control.isTouch).toBeFalsy();
    expect(control.isPrestine).toBeTruthy();
    expect(control.isValid).toBeFalsy();
    expect(control.hasErrors).toBeTruthy();
    expect(control.errors[0].i18n).toEqual(errorMessages.base.isRequired);
  });

  it('Should validate invalid type', async () => {
    const schema = NumberType().isRequired().max(10);
    const control = new FormControl<number>(schema);

    await control.validate('123');

    expect(control.isFocus).toBeFalsy();
    expect(control.isDirty).toBeFalsy();
    expect(control.isTouch).toBeFalsy(); // should it be touch ??
    expect(control.isPrestine).toBeTruthy();
    expect(control.isValid).toBeFalsy();
    expect(control.hasErrors).toBeTruthy();

    expect(control.errors[0].i18n).toEqual(errorMessages.number.type);
  });
});

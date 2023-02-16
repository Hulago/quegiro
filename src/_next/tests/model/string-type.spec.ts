/* eslint-disable @typescript-eslint/no-var-requires */

import { errorMessages, StringType } from '../../index';

describe('> StringType', () => {
  it('Should check min string length', async () => {
    const cjkStr = StringType().minLength(5);
    const emojiStr = StringType().minLength(5);
    const str = StringType().minLength(5);

    expect((await str.check('abcde')).hasError).toBeFalsy();
    expect((await str.check('abcd')).hasError).toBeTruthy();

    expect((await cjkStr.check('鲤鱼跃龙门')).hasError).toBeFalsy();
    expect((await cjkStr.check('岁寒三友')).hasError).toBeTruthy();
    expect((await emojiStr.check('👌👍🐱🐶🐸')).hasError).toBeFalsy();

    expect((await emojiStr.check('👌👍🐱🐶')).hasError).toBeTruthy();

    expect((await str.check('a')).errors[0].i18n).toEqual(
      errorMessages.string.minLength
    );
  });

  it('Should check max string length', async () => {
    const schema = StringType().maxLength(4);

    expect((await schema.check('abcde')).hasError).toBeTruthy();
    expect((await schema.check('abcd')).hasError).toBeFalsy();

    expect((await schema.check('👌👍🐱🐶🐸')).hasError).toBeTruthy();

    expect((await schema.check('👌👍🐱🐶')).hasError).toBeFalsy();

    expect((await schema.check('abcde')).errors[0].i18n).toEqual(
      errorMessages.string.maxLength
    );
  });

  it('Should be required', async () => {
    const schema = StringType().isRequired();

    expect((await schema.check('')).hasError).toBeTruthy();

    expect((await schema.check(' abcde ')).hasError).toBeFalsy();

    expect((await schema.check('  ')).hasError).toBeTruthy();

    expect((await schema.check('')).errors[0].i18n).toEqual(
      errorMessages.base.isRequired
    );
  });

  it('Should be able to customize the rules', async () => {
    const schema = StringType()
      .maxLength(4, 'error1')
      .addRule({
        errorMessage: 'error2',
        validationFn: value => value !== '123'
      });

    expect((await schema.check('12')).hasError).toBeFalsy();

    expect((await schema.check('123')).hasError).toBeTruthy();
    expect((await schema.check('123')).errors[0].i18n).toEqual('error2');
    expect((await schema.check('abcde')).hasError).toBeTruthy();
    expect((await schema.check('abcde')).errors[0].i18n).toEqual('error1');
  });

  it('Should be one of value in array', async () => {
    const schema = StringType().isOneOf(['A', 'B', 'C']);

    expect((await schema.check('A')).hasError).toBeFalsy();
    expect((await schema.check('D')).hasError).toBeTruthy();
    expect((await schema.check('D')).errors[0].i18n).toEqual(
      errorMessages.string.isOneOf
    );
  });

  it('Should contain letters', async () => {
    const schema = StringType().containsLetter();

    expect((await schema.check('12A')).hasError).toBeFalsy();
    expect((await schema.check('a12')).hasError).toBeFalsy();
    expect((await schema.check('12')).hasError).toBeTruthy();
    expect((await schema.check('-')).errors[0].i18n).toEqual(
      errorMessages.string.containsLetter
    );
  });

  it('Should only contain letters', async () => {
    const schema = StringType().containsLetterOnly();

    expect((await schema.check('aA')).hasError).toBeFalsy();
    expect((await schema.check('12A')).hasError).toBeTruthy();
    expect((await schema.check('a12')).hasError).toBeTruthy();
    expect((await schema.check('12')).hasError).toBeTruthy();
    expect((await schema.check('1a')).errors[0].i18n).toEqual(
      errorMessages.string.containsLetterOnly
    );
  });

  it('Should contain uppercase letters', async () => {
    const schema = StringType().containsUppercaseLetter();

    expect((await schema.check('12A')).hasError).toBeFalsy();
    expect((await schema.check('a12')).hasError).toBeTruthy();
    expect((await schema.check('12')).hasError).toBeTruthy();
    expect((await schema.check('-')).errors[0].i18n).toEqual(
      errorMessages.string.containsUppercaseLetter
    );
  });

  it('Should contain lowercase letters', async () => {
    const schema = StringType().containsLowercaseLetter();

    expect((await schema.check('12A')).hasError).toBeTruthy();
    expect((await schema.check('a12')).hasError).toBeFalsy();
    expect((await schema.check('12')).hasError).toBeTruthy();
    expect((await schema.check('-')).errors[0].i18n).toEqual(
      errorMessages.string.containsLowercaseLetter
    );
  });

  it('Should contain numbers', async () => {
    const schema = StringType().containsNumber();

    expect((await schema.check('12')).hasError).toBeFalsy();
    expect((await schema.check('a12')).hasError).toBeFalsy();
    expect((await schema.check('12A')).hasError).toBeFalsy();
    expect((await schema.check('a')).errors[0].i18n).toEqual(
      errorMessages.string.containsNumber
    );
  });

  it('Should be a url', async () => {
    const schema = StringType().isURL();

    expect((await schema.check('https://www.abc.com')).hasError).toBeFalsy();
    expect((await schema.check('http://www.abc.com')).hasError).toBeFalsy();
    expect((await schema.check('ftp://www.abc.com')).hasError).toBeFalsy();
    expect((await schema.check('http://127.0.0.1/home')).hasError).toBeFalsy();
    expect((await schema.check('www.abc.com')).hasError).toBeTruthy();
    expect((await schema.check('a')).errors[0].i18n).toEqual(
      errorMessages.string.isURL
    );
  });

  it('Should be a hexadecimal character', async () => {
    const schema = StringType().isHex();

    expect((await schema.check('#fff000')).hasError).toBeFalsy();
    expect((await schema.check('fff000')).hasError).toBeFalsy();
    expect((await schema.check('#fff')).hasError).toBeFalsy();
    expect((await schema.check('fff')).hasError).toBeFalsy();
    expect((await schema.check('#000')).hasError).toBeFalsy();
    expect((await schema.check('#00')).hasError).toBeTruthy();
    expect((await schema.check('a')).errors[0].i18n).toEqual(
      errorMessages.string.isHex
    );
  });

  it('Should allow custom rules', async () => {
    const schema = StringType().pattern(/^-?1\d+$/);

    expect((await schema.check('11')).hasError).toBeFalsy();
    expect((await schema.check('12')).hasError).toBeFalsy();
    expect((await schema.check('22')).hasError).toBeTruthy();
    expect((await schema.check('22')).errors[0].i18n).toEqual(
      errorMessages.string.pattern
    );
  });

  it('Should be within the range of the number of characters', async () => {
    const schema = StringType().rangeLength(5, 10);

    expect((await schema.check('12345')).hasError).toBeFalsy();
    expect((await schema.check('1234')).hasError).toBeTruthy();
    expect((await schema.check('12345678910')).hasError).toBeTruthy();
    expect((await schema.check('1234')).errors[0].i18n).toEqual(
      errorMessages.string.rangeLength
    );
  });

  it('Should not be less than the minimum number of characters', async () => {
    const schema = StringType().minLength(5);

    expect((await schema.check('12345')).hasError).toBeFalsy();
    expect((await schema.check('1234')).hasError).toBeTruthy();
    expect((await schema.check('1234')).errors[0].i18n).toEqual(
      errorMessages.string.minLength
    );
  });

  it('Should not exceed the maximum number of characters', async () => {
    const schema = StringType().maxLength(5);

    expect((await schema.check('12345')).hasError).toBeFalsy();
    expect((await schema.check('123456')).hasError).toBeTruthy();
    expect((await schema.check('123456')).errors[0].i18n).toEqual(
      errorMessages.string.maxLength
    );
  });
});

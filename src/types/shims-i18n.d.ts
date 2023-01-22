import { I18nDictionary } from '../plugins/i18n.plugin';

type PathImpl<T, Key extends keyof T> = Key extends string
  ? T[Key] extends Record<string, any>
    ?
        | `${Key}.${PathImpl<T[Key], Exclude<keyof T[Key], keyof any[]>> &
            string}`
        | `${Key}.${Exclude<keyof T[Key], keyof any[]> & string}`
    : never
  : never;

type PathImpl2<T> = PathImpl<T, keyof T> | keyof T;

type Path<T> = PathImpl2<T> extends string | keyof T ? PathImpl2<T> : keyof T;

type PathValue<T, P extends Path<T>> = P extends `${infer Key}.${infer Rest}`
  ? Key extends keyof T
    ? Rest extends Path<T[Key]>
      ? PathValue<T[Key], Rest>
      : never
    : never
  : P extends keyof T
  ? T[P]
  : never;

type I18nMessages = Path<I18nDictionary['en-US']>;

declare module 'vue/types/vue' {
  // tslint:disable-next-line: interface-name
  interface Vue {
    i18n(token: I18nMessages, requiredOrOptions?: any | boolean): string;

    i18n(
      token: I18nMessages,
      requiredOrOptions: any | boolean,
      fn: string,
      data: any
    ): string;

    truncate(str: string, size: number): string;
  }
}

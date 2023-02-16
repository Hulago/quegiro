/* eslint-disable max-params */
import { format } from 'date-fns';

export const dateRender =
  (
    {
      dateFormat
    }: {
      dateFormat: string;
    } = {
      dateFormat: 'dd-MM-yyyy HH:mm'
    }
  ) =>
  (value: number | Date | string | null) => {
    return value ? format(new Date(value), dateFormat) : null;
  };

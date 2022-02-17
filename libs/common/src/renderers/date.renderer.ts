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
  (value: number | null) =>
    value ? format(value, dateFormat) : null;

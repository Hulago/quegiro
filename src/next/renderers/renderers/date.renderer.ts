import dayjs from 'dayjs';

import { ellipsisClass, monoFontClass } from '../styles/renderer.styles';

import type { DateRendererProps } from '../../types/renderers.type';

export const dateRender = ({
  value,
  dateFormat = 'DD-MMM-YYYY',
  fontSize = 10,
  monoFont = true,
  injectClass = ''
}: DateRendererProps): // eslint-disable-next-line max-params
string => {
  // to be compatible with moment date format

  const date = dayjs(value);

  return date.isValid() && value !== undefined && value !== null
    ? `<div class="pk-date-renderer ${injectClass} ${ellipsisClass(
        1,
        'center',
        fontSize
      )} ${monoFont ? monoFontClass : ''}" title="${date.format(
        dateFormat
      )}">${date.format(dateFormat)}</div>`
    : `<div class="${injectClass} ${ellipsisClass(1, 'center', fontSize)} ${
        monoFont ? monoFontClass : ''
      }">-</div>`;
};

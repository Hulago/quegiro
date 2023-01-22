/* eslint-disable max-params */
import { ellipsisClass } from '../styles/renderer.styles';

/**
 * Render text into div element
 *
 * @param value - Text value
 * @param ellipsis - True or false
 * @param lines - Lines for ellipsis
 * @param fontSize -Font size
 * @param injectClass - Custom css class
 */
import type { StringRendererProps } from '../../types/renderers.type';

export const stringRender = ({
  value = null,
  ellipsis = true,
  lines = 2,
  fontSize = 12,
  injectClass
}: StringRendererProps): string => {
  const eDiv = document.createElement('div');

  if (ellipsis) {
    eDiv.classList.add(`${ellipsisClass(lines, 'left', fontSize)}`);
    if (injectClass) {
      eDiv.classList.add(injectClass);
    }
  }
  if (value) {
    eDiv.innerText = value.toString();
    eDiv.title = value.toString();
  } else {
    eDiv.innerText = '-';
  }
  return eDiv.outerHTML;
};

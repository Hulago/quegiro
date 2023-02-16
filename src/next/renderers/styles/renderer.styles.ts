import { css } from '@emotion/css';

export const labelStyles = ({
  backgroundColor,
  color
}: {
  backgroundColor: string | null;
  color: string | null;
}) =>
  css`
    display: inline-block;
    border-radius: 4px;
    background-color: ${backgroundColor
      ? backgroundColor
      : 'var(--pk-color-grey)'};
    color: ${color ? color : 'var(--pk-color-black)'};
    font-size: 12px;
    font-weight: 600;
    line-height: 20px;
    padding: 2px 8px;
    width: fit-content;
    white-space: nowrap;
  `;

export const avatar = (size: number) => css`
  width: ${size}px;
  height: ${size}px;
  border-radius: 50%;
  object-fit: cover;
`;

export const ellipsisClass = (
  lines = 2,
  align = 'center',
  fontSize = 14
) => css`
  display: -webkit-box;
  -webkit-line-clamp: ${lines};
  -webkit-box-orient: vertical;
  overflow: hidden;
  white-space: normal;
  font-size: ${fontSize}px;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.29;
  letter-spacing: normal;
  color: var(--pk-color-black);
  width: 100%;
  text-align: ${align};
`;

export const monoFontClass = css`
  font-family: Verdana, Courier, Consolas, monospace;
`;

export const centerClass = css`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const userContainerClass = css`
  display: flex;
  align-items: center;
`;

const font = css`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 14px;
  line-height: 1.29;
`;

export const userNameFieldClass = css`
  ${font};
  font-weight: 600;
`;

export const userEmailFieldClass = css`
  ${font};
  padding-top: 2px;
`;

export const userRoundClass = (size = 48, backgroundColor: string) =>
  css`
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    width: ${size}px;
    height: ${size}px;
    text-transform: uppercase;
    border-radius: 50%;
    background-color: ${backgroundColor};
  `;

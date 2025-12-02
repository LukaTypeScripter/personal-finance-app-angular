import tinycolor from 'tinycolor2';

export const lightenColor = (color: string): string => {
  let tc = tinycolor(color);
  return tc
    .lighten(9)
    .saturate(0)
    .toHexString();
};

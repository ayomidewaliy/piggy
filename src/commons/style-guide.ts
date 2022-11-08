export const Fonts = {
  CircularMedium: 'CircularStd-Medium',
  CircularBook: 'CircularStd-Book',
  CircularBold: 'CircularStd-Bold',
};

const primary = '#0d60d8';
const secondary = '#0c1825';
const error = '#ff2626';
const green = '#539f82';

const neutral = {
  white: '#FFFFFF',
  dark: '#000000',
  bodytext: '#1F2023',
  inactive: '#CCCCCC',
  guyabano: '#F8F8F8',
  silver: '#AAAAAA',
  bg: '#F8F8F8',
  borders: '#EBEBEB',
};

export const colors = {primary, secondary, neutral, error, green};

export const font = {
  size: {
    h1: 30,
    h2: 24,
    h3: 22,
    pxl: 17,
    pl: 15,
    ps: 13,
    caption: 12,
  },
  family: {
    medium: Fonts.CircularMedium,
    body: Fonts.CircularBook,
    bold: Fonts.CircularBold,
  },
};

export const PADDING = 20;

export const hexToRgba = (hex: string, opacity: number) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return `rgba(${parseInt(result![1], 16)}, ${parseInt(
    result![2],
    16,
  )}, ${parseInt(result![3], 16)},${opacity})`;
};

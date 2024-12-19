import { type RGB, type HSL } from '../types/colors';

export function getRGB(color: string): RGB {
  let r = 0, g = 0, b = 0;
  
  // Handle hex colors
  if (color.startsWith('#')) {
    const hex = color.slice(1);
    r = parseInt(hex.slice(0, 2), 16);
    g = parseInt(hex.slice(2, 4), 16);
    b = parseInt(hex.slice(4, 6), 16);
  }
  // Handle rgb/rgba colors
  else if (color.startsWith('rgb')) {
    const matches = color.match(/\d+/g);
    if (matches) {
      [r, g, b] = matches.map(Number);
    }
  }
  
  return { r, g, b };
}

export function getLuminance({ r, g, b }: RGB): number {
  // Calculate relative luminance using sRGB color space
  const rsRGB = r / 255;
  const gsRGB = g / 255;
  const bsRGB = b / 255;

  const rL = rsRGB <= 0.03928 ? rsRGB / 12.92 : Math.pow((rsRGB + 0.055) / 1.055, 2.4);
  const gL = gsRGB <= 0.03928 ? gsRGB / 12.92 : Math.pow((gsRGB + 0.055) / 1.055, 2.4);
  const bL = bsRGB <= 0.03928 ? bsRGB / 12.92 : Math.pow((bsRGB + 0.055) / 1.055, 2.4);

  return 0.2126 * rL + 0.7152 * gL + 0.0722 * bL;
}

export function shouldUseDarkText(backgroundColor: string): boolean {
  const rgb = getRGB(backgroundColor);
  const luminance = getLuminance(rgb);
  return luminance > 0.5; // Use dark text if background is bright
}
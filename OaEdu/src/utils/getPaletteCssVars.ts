import { paletteLight } from "../providers/theme/design-tokens/Mui/Palette/paletteLight";

export function getPaletteCssVars(palette = paletteLight?.primary) {
  if (!palette) return {};
  return Object.entries(palette as Record<string, string>).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [`--primary-${key}`]: value,
    }),
    {}
  );
}
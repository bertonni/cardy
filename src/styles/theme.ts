import { extendTheme } from "native-base";

export const theme = extendTheme({
  colors: {
    primary: {
      50: "rgba(204, 220, 255, 1)",
      100: "#CCDCFF",
      500: "#013099",
      800: "#012169",
    },
    secondary: {
      100: "#FFB3BF",
      500: "#c8102E",
      800: "#992E3F",
    },
    neutral: {
      100: "#F7F7F7",
      200: "#E6E6E6",
      900: "#292929",
    },
  },
  fonts: {
    heading: "Poppins_700Bold",
    body: "Poppins_400Regular",
  },
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
    xl: 24,
  },
  sizes: {
    14: 56,
    21: 84,
    22: 88,
    23: 92,
    24: 96,
    25: 100,
    27: 108,
    27.5: 110,
    36: 144,
    41: 164,
    85: 340
  },
});
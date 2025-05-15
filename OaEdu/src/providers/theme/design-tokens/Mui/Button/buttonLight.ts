import type { ThemeOptions } from "@mui/material";

export const buttonLightOverrides: ThemeOptions["components"] = {
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: 12,
        textTransform: "none",
        fontWeight: 600,
      },
    },
    variants: [
      {
        props: { variant: "contained", color: "primary" },
        style: {
          backgroundColor: "#80cbc4",
          color: "#212121",
          width: 200,
          fontSize: 18,
          "&:hover": {
            backgroundColor: "#4f9a94",
          },
        },
      },
      {
        props: { variant: "contained", color: "secondary" },
        style: {
          backgroundColor: "#ff9800",
          color: "#fff",
          width: 120,
          fontSize: 14,
          "&:hover": {
            backgroundColor: "#f57c00",
          },
        },
      },
    ],
  },
};

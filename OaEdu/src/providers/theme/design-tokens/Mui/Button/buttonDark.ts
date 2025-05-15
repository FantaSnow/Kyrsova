import type { ThemeOptions } from "@mui/material";

export const buttonDarkOverrides: ThemeOptions["components"] = {
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: 20,
        textTransform: "uppercase",
        fontWeight: 700,
        letterSpacing: 2,
      },
    },
    variants: [
      {
        props: { variant: "contained", color: "primary" },
        style: {
          backgroundColor: "#22223b",
          color: "#f2e9e4",
          width: 180,
          fontSize: 16,
          "&:hover": {
            backgroundColor: "#4a4e69",
          },
        },
      },
      {
        props: { variant: "contained", color: "secondary" },
        style: {
          backgroundColor: "#9a8c98",
          color: "#22223b",
          width: 140,
          fontSize: 15,
          "&:hover": {
            backgroundColor: "#c9ada7",
          },
        },
      },
    ],
  },
};
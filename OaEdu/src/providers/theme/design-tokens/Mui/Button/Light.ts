import { typography } from "../../Typography/typography";
import { palette } from "../../Pallete";

export const lightButtonStyles = {
  medium: {
    borderRadius: "8px",
    width: "150px",
    height: "40px",
    primary: {
      enabled: {
        backgroundColor: palette.primary.primary50,
        color: palette.secondary.secondary5,
        fontSize: typography.buttonM.fontSize,
        lineHeight: typography.buttonM.lineHeight,
        fontWeight: typography.buttonM.fontWeight,
      },
      hover: {
        backgroundColor: palette.primary.primary60,
        color: palette.secondary.secondary5,
      },
      active: {
        backgroundColor: palette.primary.primary70,
        color: palette.secondary.secondary5,
      },
      disabled: {
        backgroundColor: palette.secondary.secondary20,
        color: palette.secondary.secondary50,
      },
    },
    secondary: {
      enabled: {
        backgroundColor: "transparent",
        border: `1px solid ${palette.primary.primary50}`,
        color: palette.secondary.secondary5,
        fontSize: typography.buttonM.fontSize,
        lineHeight: typography.buttonM.lineHeight,
        fontWeight: typography.buttonM.fontWeight,
      },
      hover: {
        backgroundColor: "transparent",
        border: `1px solid ${palette.primary.primary60}`,
        color: palette.secondary.secondary5,
      },
      active: {
        backgroundColor: "transparent",
        border: `1px solid ${palette.primary.primary70}`,
        color: palette.secondary.secondary5,
      },
      disabled: {
        backgroundColor: "transparent",
        border: `1px solid ${palette.secondary.secondary20}`,
        color: palette.secondary.secondary50,
      },
    },
    tertiary: {
      enabled: {
        backgroundColor: "transparent",
        color: palette.secondary.secondary5,
        fontSize: typography.buttonM.fontSize,
        lineHeight: typography.buttonM.lineHeight,
        fontWeight: typography.buttonM.fontWeight,
      },
      hover: {
        backgroundColor: "transparent",
        color: palette.secondary.secondary5,
      },
      active: {
        backgroundColor: "transparent",
        color: palette.secondary.secondary5,
      },
      disabled: {
        backgroundColor: "transparent",
        color: palette.secondary.secondary50,
      },
    },
  },
  big: {
    borderRadius: "12px",
    width: "200px",
    height: "40px",
    primary: {
      enabled: {
        backgroundColor: palette.primary.primary50,
        color: palette.secondary.secondary5,
        fontSize: typography.buttonL.fontSize,
        lineHeight: typography.buttonL.lineHeight,
        fontWeight: typography.buttonL.fontWeight,
      },
      hover: {
        backgroundColor: palette.primary.primary60,
        color: palette.secondary.secondary5,
      },
      active: {
        backgroundColor: palette.primary.primary70,
        color: palette.secondary.secondary5,
      },
      disabled: {
        backgroundColor: palette.secondary.secondary20,
        color: palette.secondary.secondary50,
      },
    },
    secondary: {
      enabled: {
        backgroundColor: "transparent",
        border: `1px solid ${palette.primary.primary50}`,
        color: palette.secondary.secondary5,
        fontSize: typography.buttonL.fontSize,
        lineHeight: typography.buttonL.lineHeight,
        fontWeight: typography.buttonL.fontWeight,
      },
      hover: {
        backgroundColor: "transparent",
        border: `1px solid ${palette.primary.primary60}`,
        color: palette.secondary.secondary5,
      },
      active: {
        backgroundColor: "transparent",
        border: `1px solid ${palette.primary.primary70}`,
        color: palette.secondary.secondary5,
      },
      disabled: {
        backgroundColor: "transparent",
        border: `1px solid ${palette.secondary.secondary20}`,
        color: palette.secondary.secondary50,
      },
    },
    tertiary: {
      enabled: {
        backgroundColor: "transparent",
        color: palette.secondary.secondary5,
        fontSize: typography.buttonL.fontSize,
        lineHeight: typography.buttonL.lineHeight,
        fontWeight: typography.buttonL.fontWeight,
      },
      hover: {
        backgroundColor: "transparent",
        color: palette.secondary.secondary5,
      },
      active: {
        backgroundColor: "transparent",
        color: palette.secondary.secondary5,
      },
      disabled: {
        backgroundColor: "transparent",
        color: palette.secondary.secondary50,
      },
    },
  },
};

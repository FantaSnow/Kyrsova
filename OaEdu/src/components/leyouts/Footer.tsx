import { Box, Typography, Stack, IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import GoogleIcon from "../../assets/icons/google.svg?react";
import SocialsIcon from "../../assets/icons/socials.svg?react";
import TelegramIcon from "../../assets/icons/telegram.svg?react";
import Logo from "../../assets/icons/LogoF.svg?react";
import { getPaletteCssVars } from "../../utils/getPaletteCssVars";

const Footer = () => {
  const theme = useTheme();
  const iconColors = getPaletteCssVars(theme.palette.primary);

  return (
    <Box
      component="footer"
      sx={{
        width: "100wh",
        bgcolor: "primary.primary20",
        color: "text.primary",
        py: 4,
        px: { xs: 2, md: 8 },
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Stack
        direction={{ xs: "column", lg: "row" }}
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography
          variant="h2"
          width={{ xs: "100%", lg: "40%" }}
          textAlign={{ xs: "center", lg: "left" }}
        >
          © 2025 OAEdu. Усі права захищено
        </Typography>

        <Box sx={{ my: { xs: 2, lg: 0 } }}>
          <Logo style={{ color: "text.primary" }} />
        </Box>
        <Stack
          direction="column"
          spacing={3}
          alignItems={{ xs: "center", lg: "flex-end" }}
          width={{ xs: "100%", lg: "40%" }}
        >
          <Stack direction="row" spacing={1}>
            <Typography variant="h2">Telegram Bot</Typography>
            <TelegramIcon style={iconColors} />
          </Stack>
          <Stack direction="row" spacing={1}>
            <Typography variant="h2">Social media</Typography>
            <GoogleIcon style={iconColors} />
          </Stack>
          <Stack direction="row" spacing={1}>
            <Typography variant="h2">Application</Typography>
            <SocialsIcon style={iconColors} />
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Footer;

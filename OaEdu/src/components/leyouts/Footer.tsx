import { Box, Typography, Stack, IconButton } from "@mui/material";
import GoogleIcon from "../../assets/icons/google.svg?react";
import SocialsIcon from "../../assets/icons/socials.svg?react";
import TelegramIcon from "../../assets/icons/telegram.svg?react";
import Logo from "../../assets/icons/Logo.svg?react";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        width: "100wh",
        bgcolor: "primary.primary30",
        color: "text.primary",
        py: 4,
        px: { xs: 2, md: 8 },
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h2">© 2025 OAEdu. Усі права захищено</Typography>
        <Logo style={{ margin: "30" }} />

        <Stack direction="row" spacing={3} alignItems="center">
          <Stack spacing={1} alignItems="flex-end">
            <Typography variant="h2">Telegram Bot</Typography>
            <Typography variant="h2">Social media</Typography>
            <Typography variant="h2">Application</Typography>
          </Stack>

          <Stack direction="row" spacing={2}>
            <IconButton>
              <TelegramIcon style={{ fill: "text.primary" }} />
            </IconButton>
            <IconButton>
              <GoogleIcon style={{ fill: "text.primary" }} />
            </IconButton>
            <IconButton>
              <SocialsIcon style={{ fill: "text.primary" }} />
            </IconButton>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Footer;

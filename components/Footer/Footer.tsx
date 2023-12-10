import {Box, Typography} from "@mui/material";
import {footerBoxStyle, footerTypographyStyle} from "@/components/Footer/Footer.styled";

export const Footer = () => {
  return (
    <footer>
      <Box sx={footerBoxStyle}>
        <Typography sx={footerTypographyStyle} variant="subtitle1">
          Все права защищены, но это не точно...
        </Typography>
      </Box>
    </footer>
  );
};
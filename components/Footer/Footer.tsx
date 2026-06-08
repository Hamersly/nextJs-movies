import { Box, Typography } from '@mui/material';
import {
  footerAvatarStyle,
  footerBoxStyle,
  footerCreatedByBox,
  footerTypographyStyle,
} from '@/components/Footer/Footer.styled';
import Avatar from '@mui/material/Avatar';

export const Footer = () => {
  return (
    <footer>
      <Box sx={footerBoxStyle}>
        <Box sx={footerCreatedByBox}>
          <Typography sx={footerTypographyStyle} variant="subtitle1">
            Created by Hamersly
          </Typography>
          <Avatar alt="Remy Sharp" src="/avatarka_Indian_chief.png" sx={footerAvatarStyle} />
        </Box>
        <Typography sx={footerTypographyStyle} variant="subtitle1">
          Все права защищены, но это не точно...
        </Typography>
      </Box>
    </footer>
  );
};

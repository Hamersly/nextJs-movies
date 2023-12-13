import {Box, Typography} from '@mui/material';
import {footerBoxStyle, footerCreatedByBox, footerTypographyStyle} from '@/components/Footer/Footer.styled';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

export const Footer = () => {
  return (
    <footer>
      <Box sx={footerBoxStyle}>
        <Box sx={footerCreatedByBox}>
          <Typography sx={footerTypographyStyle} variant="subtitle1">
            Created by Hamersly
          </Typography>
          <Avatar
            alt="Remy Sharp"
            src="/avatarka_Indian_chief.png"
            sx={{ width: 50, height: 50, marginLeft: 3 }}
          />
        </Box>
        <Typography sx={footerTypographyStyle} variant="subtitle1">
          Все права защищены, но это не точно...
        </Typography>
      </Box>
    </footer>
  );
};
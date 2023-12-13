import {Box, Typography} from '@mui/material';
import {footerBoxStyle, footerCreatedByBox, footerTypographyStyle} from '@/components/Footer/Footer.styled';
import Avatar from '@mui/material/Avatar';

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
            sx={{width: 50, height: 50, marginLeft: 3, boxShadow: '5px 6px 7px 2px rgba(0, 1, 2, 0.50)'}}
          />
        </Box>
        <Typography sx={footerTypographyStyle} variant="subtitle1">
          Все права защищены, но это не точно...
        </Typography>
      </Box>
    </footer>
  );
};
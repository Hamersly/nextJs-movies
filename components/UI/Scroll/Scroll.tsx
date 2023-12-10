import {FC} from 'react';
import ScrollToTop from 'react-scroll-to-top';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import {scrollToTopStyle} from './Scroll.styled';

export const Scroll: FC = () => {
  return (
    <ScrollToTop
      smooth
      component={<ArrowUpwardIcon
        fontSize="large"/>}
      width={'50'}
      height={'50'}
      style={scrollToTopStyle}
    />
  );
};
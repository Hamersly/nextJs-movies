import {FC} from 'react';
import Image from 'next/image';
import {rgbDataURL} from '@/helpers/blur';
import Backdrop from '@mui/material/Backdrop';


interface IProps {
  path: string | undefined
  handleClose: () => void
  open: boolean
  width: number
  height: number
  styles: {}
}
export const BackdropImg:FC<IProps> = ({
  path,
  handleClose, 
  open,
  width,
  height,
  styles,}
) => {
  return (
    <Backdrop
      sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
      open={open}
      onClick={handleClose}
    >
      <Image
        src={`https://image.tmdb.org/t/p/original${path}`}
        width={width}
        height={height}
        style={styles}
        quality={100}
        placeholder="blur"
        blurDataURL={rgbDataURL(163, 163, 163)}
        alt=""
      />
    </Backdrop>
  );
};
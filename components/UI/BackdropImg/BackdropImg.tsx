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

export const BackdropImg: FC<IProps> = ({
  path,
  handleClose,
  open,
  width,
  height,
  styles,
}
) => {
  return (
    <Backdrop
      sx={{color: '#fff', zIndex: 999999}}
      open={open}
      onClick={handleClose}
    >
      <Image
        src={`${process.env.NEXT_PUBLIC_URL_IMG}${path}`}
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
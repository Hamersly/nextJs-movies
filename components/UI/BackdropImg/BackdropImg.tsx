import type { CSSProperties, FC } from 'react';
import Image from 'next/image';
import { rgbDataURL } from '@/helpers/blur';
import { backdropSrc } from '@/helpers/tmdbImage';
import Backdrop from '@mui/material/Backdrop';
import { backdropStyle } from './BackdropImg.styled';

interface IProps {
  path: string | undefined;
  handleClose: () => void;
  open: boolean;
  width: number;
  height: number;
  styles: CSSProperties;
  alt?: string;
}

export const BackdropImg: FC<IProps> = ({
  path,
  handleClose,
  open,
  width,
  height,
  styles,
  alt,
}) => {
  const src = backdropSrc(path, 'w1280') || '';

  return (
    <Backdrop sx={backdropStyle} open={open} onClick={handleClose}>
      <Image
        src={src}
        width={width}
        height={height}
        style={styles}
        quality={100}
        placeholder="blur"
        blurDataURL={rgbDataURL(163, 163, 163)}
        alt={alt || ''}
      />
    </Backdrop>
  );
};

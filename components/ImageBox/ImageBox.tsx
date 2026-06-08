import { CSSProperties, FC, useState } from 'react';
import Image from 'next/image';
import { rgbDataURL } from '@/helpers/blur';
import { posterSrc } from '@/helpers/tmdbImage';
import { BackdropImg } from '@/components/UI/BackdropImg/BackdropImg';

interface IProps {
  img_path: string | undefined;
  errorImgSrc: string;
  imageStyle: CSSProperties;
  posterStyle: CSSProperties;
  imgWidth: number;
  imgHeight: number;
  backdropWidth: number;
  backdropHeight: number;
  alt?: string;
  priority?: boolean;
}

export const ImageBox: FC<IProps> = ({
  img_path,
  errorImgSrc,
  imageStyle,
  posterStyle,
  imgWidth,
  imgHeight,
  backdropWidth,
  backdropHeight,
  alt = '',
  priority = false,
}) => {
  // Постер кликабелен — по клику открывается Backdrop с увеличенной версией
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);
  const handleToggle = () => setOpen((prev) => !prev);

  // Размер w342 — оптимален для списка и детальной страницы (≈30KB)
  const src = posterSrc(img_path, 'w342') || '';

  return (
    <>
      <Image
        onClick={handleToggle}
        src={src}
        width={imgWidth}
        height={imgHeight}
        style={imageStyle}
        placeholder="blur"
        blurDataURL={rgbDataURL(163, 163, 163)}
        alt={alt}
        priority={priority}
        onError={({ currentTarget }) => {
          currentTarget.onerror = null;
          currentTarget.src = errorImgSrc;
        }}
      />
      <BackdropImg
        handleClose={handleClose}
        path={img_path}
        open={open}
        width={backdropWidth}
        height={backdropHeight}
        styles={posterStyle}
        alt={alt}
      />
    </>
  );
};

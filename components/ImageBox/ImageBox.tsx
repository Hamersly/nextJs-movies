import {FC, useState} from 'react';
import Image from 'next/image';
import {detailImageStile, detailPosterStile} from './ImageBox.styled';
import {rgbDataURL} from '@/helpers/blur';
import {BackdropImg} from '@/components/UI/BackdropImg/BackdropImg';

interface IProps {
  backdrop_path: string | undefined
}

export const ImageBox: FC<IProps> = ({backdrop_path}) => {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState(`${process.env.NEXT_PUBLIC_URL_IMG}${backdrop_path}`);

  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <>
      <Image
        onClick={handleToggle}
        src={url}
        width={500}
        height={350}
        style={detailImageStile}
        placeholder="blur"
        blurDataURL={rgbDataURL(163, 163, 163)}
        alt=""
        onError={() => setUrl(process.env.NEXT_PUBLIC_ERROR_IMG_2!)}
      />
      <BackdropImg
        handleClose={handleClose}
        path={backdrop_path}
        open={open}
        width={5000}
        height={3500}
        styles={detailPosterStile}
      />
    </>
  );
};
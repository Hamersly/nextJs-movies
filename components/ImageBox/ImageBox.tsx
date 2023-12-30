import {FC, useState} from 'react';
import Image from 'next/image';
import {rgbDataURL} from '@/helpers/blur';
import {BackdropImg} from '@/components/UI/BackdropImg/BackdropImg';


// <ImageBox
//   img_path={poster_path}
//   errorImgSrc={'/notFound.png'}
//   imageStile={unitImageStile}
//   posterStile={unitPosterStile}
//   imgWidth={350}
//   imgHeight={500}
//   backdropWidth={3500}
//   backdropHeight={5000}
// />

interface IProps {
  img_path: string | undefined
  errorImgSrc: string
  imageStile: {}
  posterStile: {}
  imgWidth: number,
  imgHeight: number,
  backdropWidth: number,
  backdropHeight: number,
}

export const ImageBox: FC<IProps> = ({
  img_path,
  errorImgSrc,
  imageStile, 
  posterStile,
  imgWidth,
  imgHeight,
  backdropWidth,
  backdropHeight
}) => {
  const [open, setOpen] = useState(false);

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
        src={`${process.env.NEXT_PUBLIC_URL_IMG}${img_path}`}
        width={imgWidth}
        height={imgHeight}
        style={imageStile}
        placeholder="blur"
        blurDataURL={rgbDataURL(163, 163, 163)}
        alt=""
        onError={({currentTarget}) => {
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
        styles={posterStile}
      />
    </>
  );
};
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { Typography } from '@mui/material';

export const ShopLocationCard = () => {
  return (
    <>
      <div className='flex w-full items-center mt-32 p-16'>
        <div className='flex-auto mt-px w-full border-t-1' />
        <Typography className='mx-16 uppercase w-full font-bold' color=''>
          shop location
        </Typography>
        <div className='flex-auto mt-px w-full border-t-1' />
      </div>
      <div className='flex w-full px-8 mb-16'>
        <FuseSvgIcon className='text-48' size={24} color='action'>
          heroicons-solid:location-marker
        </FuseSvgIcon>
        <Typography className='w-full font-bold' color=''>
          Address: Madina Arts Wakilan Wali Gali No 6
        </Typography>
      </div>
      <div className='flex w-full px-8 mb-16'>
        <FuseSvgIcon className='text-48' size={24} color='action'>
          heroicons-solid:phone
        </FuseSvgIcon>
        <Typography className='w-full font-bold' color=''>
          92(320) 595-0000
        </Typography>
      </div>
      <div className='flex w-full px-8 mb-16'>
        <FuseSvgIcon className='text-48' size={24} color='action'>
          heroicons-solid:mail
        </FuseSvgIcon>
        <Typography className='w-full font-bold' color=''>
          admin@Madinaarts.com
        </Typography>
      </div>
      <div className='flex w-full px-8'>
        <FuseSvgIcon className='text-48' size={24} color='action'>
          heroicons-solid:home
        </FuseSvgIcon>
        <Typography className='w-full font-bold' color=''>
          Faisalabad, Pakistan
        </Typography>
      </div>
    </>
  );
};

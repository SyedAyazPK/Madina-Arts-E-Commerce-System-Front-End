import { Avatar, Typography } from '@mui/material';

export const BrandCard = ({ image, title, subtitle }) => {
  return (
    <div className='cursor-pointer mr-16'>
      <div className='brand-card-bg p-16'>
        <div className='flex w-full justify-between items-center'>
          <div className='mr-8'>
            <Typography className='my-16 brand-card-title text-center'>
              {title}
            </Typography>
            <Typography className='my-16 brand-card-subtitle text-center'>
              {subtitle}
            </Typography>
          </div>
          <Avatar
            src={image}
            className='m-8 '
            sx={{ width: 112, height: 96 }}
          />
        </div>
      </div>
    </div>
  );
};

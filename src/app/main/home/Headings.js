import { Typography } from '@mui/material';

export const Headings = ({ heading, subheading }) => {
  return (
    <div className='my-48'>
      <Typography className='heading'>{heading}</Typography>
      <Typography className='sub-heading'>{subheading}</Typography>
    </div>
  );
};

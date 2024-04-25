import History from '@history';
import { Typography } from '@mui/material';

export const CategoryCard = ({ id, image, title }) => {
  return (
    <div
      className='cursor-pointer mr-16 w-full md:w-auto'
      onClick={() => History.push(`/shop/category/${id}`)}
    >
      <div className='category-card-border w-full md:w-auto'>
        <img
          src={image ? image : '/assets/images/ecom/Rectangle 25.png'}
          className='p-6'
          style={{ height: '16rem', width: '18rem' }}
        />
      </div>
      <Typography className='my-16 card-title text-center'>{title}</Typography>
    </div>
  );
};

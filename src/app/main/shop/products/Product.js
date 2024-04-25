import { Typography } from '@mui/material';
import { selectProducts } from 'app/store/homeSlice';
import { useSelector } from 'react-redux';
import { ProductCard } from './ProductCard';

export const Product = () => {
  const products = useSelector(selectProducts);
  return (
    <div className='p-16'>
      <Typography className='font-semibold uppercase mb-8' variant='h5'>
        products
      </Typography>
      {products?.result?.map((product) => (
        <ProductCard id={product._id} product={product} />
      ))}
    </div>
  );
};

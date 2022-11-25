import React from 'react';
import { useLoaderData } from 'react-router-dom';
import ItemCard from '../Components/Card/ItemCard';

const CategoryProducts = () => {
  const products = useLoaderData();
  return (
    <div className=' bg-gray-200 pb-10'>
      <h1 className='text-3xl font-semibold text-primary py-5'>{products[0].category} Items</h1>
      <div className='grid grid-cols-5 gap-5 mx-3'>
        {
          products.map(product => <ItemCard key={product._id} product={product}/>)
        }
      </div>
    </div>
  );
};

export default CategoryProducts;
import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import ItemCard from '../Components/Card/ItemCard';
import LoadingSpinner from '../Components/Spinner/LoadingSpinner';
import { AuthContext } from '../Context/AuthProvider';

const CategoryProducts = () => {
  const {loading} = useContext(AuthContext);
  const products = useLoaderData();
  return (
    <div>
      {loading && <LoadingSpinner/>}
      <div className=' bg-gray-200 pb-10'>
        <h1 className='text-3xl font-semibold text-primary py-5'>{products[0].category} Items</h1>
        <div className='grid grid-cols-5 gap-5 mx-3'>
          {
            products.map(product => <ItemCard key={product._id} product={product} />)
          }
        </div>
      </div>
    </div>
  );
};

export default CategoryProducts;
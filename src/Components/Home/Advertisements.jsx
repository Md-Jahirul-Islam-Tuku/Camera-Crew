import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Context/AuthProvider';
import ProductCard from '../Card/ProductCard';
import LoadingSpinner from '../Spinner/LoadingSpinner';

const Advertisements = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const { loading } = useContext(AuthContext);
  useEffect(() => {
    fetch('http://localhost:5000/advertisementProducts')
      .then(res => res.json())
      .then(data => { setFeaturedProducts(data) })
  }, [])
  return (
    <div>
      {
        loading ? <LoadingSpinner /> :
          <div className='bg-primary my-10 py-10'>
            <h1 className='text-3xl text-white font-semibold mb-10'>Advertisements</h1>
            <div className='grid grid-cols-5 gap-5 mx-5'>
              {
                featuredProducts.map(product => <ProductCard
                  key={product._id}
                  product={product}
                ></ProductCard>)
              }
            </div>
          </div>
      }
    </div>
  );
};

export default Advertisements;
import React, { useEffect, useState } from 'react';
import ProductCard from '../Card/ProductCard';

const FeaturedProducts = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5000/featuredProducts')
      .then(res => res.json())
      .then(data => setFeaturedProducts(data))
  }, [])
  return (
    <div className='bg-primary my-10 py-10'>
      <h1 className='text-3xl text-white font-semibold mb-10'>Featured Products</h1>
      <div className='grid grid-cols-5 gap-5 mx-5'>
        {
          featuredProducts.map(product => <ProductCard
            key={product._id}
            product={product}
          ></ProductCard>)
        }
      </div>
    </div>
  );
};

export default FeaturedProducts;
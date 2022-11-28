import React, { useEffect, useState } from 'react';
import CategoryCard from '../Card/CategoryCard';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5000/categories')
    .then(res => res.json())
    .then(data => setCategories(data))
  }, [])
  return (
    <div div className='mt-12'>
      <h1 className='my-5 text-3xl text-primary font-semibold text-left'>Shop Categories</h1>
      <div className='grid grid-cols-3 mb-10 gap-8'>
        {
          categories.map(category => <CategoryCard key={category?._id} category={category} />)
        }
      </div>
    </div>
  );
};

export default Categories;
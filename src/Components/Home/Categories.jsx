import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Context/AuthProvider';
import CategoryCard from '../Card/CategoryCard';
import LoadingSpinner from '../Spinner/LoadingSpinner';

const Categories = () => {
  const { loading } = useContext(AuthContext);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5000/categories').then(res => res.json()).then(data => setCategories(data))
  }, [])
  return (
    <div>
      {loading ? <LoadingSpinner /> :
        <div div className='mt-12' >
          <h1 className='my-5 text-3xl text-primary font-semibold text-left'>Shop Categories</h1>
          <div className='grid grid-cols-3 mb-10 gap-8'>
            {
              categories.map(category => <CategoryCard key={category._id} category={category} />)
            }
          </div>
        </div >
      }
    </div>
  );
};

export default Categories;
import React from 'react';
import { Link } from 'react-router-dom';

const CategoryCard = ({ category }) => {
  const { name, img } = category;
  return (
    <div className="card card-compact border bg-white hover:drop-shadow-[-10px_10px_0_rgba(0,0,0,0.1)]">
      <figure className='h-96 p-5'>
        <img src={img} alt="Shoes" className="rounded-xl drop-shadow-[-10px_10px_0_rgba(0,0,0,0.1)]" />
      </figure>
      <hr />
      <div className="card-body items-center text-center">
        <h2 className="card-title text-3xl mb-3 text-primary">{name}</h2>
        <div className="card-actions">
          <Link to={`/categoryProducts/${name}`} className="btn btn-primary text-white">See All Products</Link>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
import React from 'react';

const CategoryCard = ({ category }) => {
  const { name, img } = category;
  return (
    <div className="card border hover:shadow-xl">
      <figure className='h-96 p-5'>
        <img src={img} alt="Shoes" className="rounded-xl" />
      </figure>
      <hr />
      <div className="card-body items-center text-center">
        <h2 className="card-title text-3xl mb-3 text-primary">{name}</h2>
        <div className="card-actions">
          <button className="btn btn-primary text-white">See All Products</button>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
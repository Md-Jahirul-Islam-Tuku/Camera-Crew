import React from 'react';

const ProductCard = ({ product }) => {
  const { image, productName, location, resalePrice, originalPrice, usesYears, category, userName } = product;
  return (
    <div className="card card-compact bg-white shadow-xl">
      <figure><img src={image} alt="Shoes" className='h-56 px-2' /></figure>
      <hr />
      <div className="card-body text-left gap-0">
        <h2 className="text-base font-semibold">{productName}</h2>
        <h2 className="text-base font-semibold">Category: {category}</h2>
        <h2 className="text-base font-semibold">Uses Years: {usesYears} yrs.</h2>
        <h2 className="text-base font-semibold">Seller: {userName}</h2>
        <h2 className="text-base font-semibold">Location: {location}</h2>
        <h2 className="text-base font-semibold">Original Price: {originalPrice} Tk.</h2>
        <h2 className="text-xl font-semibold text-primary">Tk. {resalePrice}</h2>
        <div className="card-actions justify-end mt-3">
          <button className="btn btn-primary btn-sm text-white">Book Now</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
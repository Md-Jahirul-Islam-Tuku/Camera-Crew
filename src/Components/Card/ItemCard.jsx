import React from 'react';

const ItemCard = ({ product }) => {
  const { image, productName, location, resalePrice, originalPrice, usesYears, category, userName, condition, mobile, description } = product;
  return (
    <div className="card card-compact bg-white shadow-xl">
      <figure className='bg-white'><img src={image} alt="Shoes" className='h-56 px-2 bg-white' /></figure>
      <hr />
      <div className="card-body text-left gap-0">
        <h2 className="text-base font-semibold text-primary">{productName}</h2>
        <h2 className="text-base font-semibold"><span className='text-primary'>Category:</span> {category}</h2>
        <h2 className="text-base font-semibold"><span className='text-primary'>Uses Years:</span> {usesYears} yrs.</h2>
        <h2 className="text-base font-semibold"><span className='text-primary'>Condition:</span> {condition}</h2>
        <h2 className="text-base font-semibold"><span className='text-primary'>Seller:</span> {userName}</h2>
        <h2 className="text-base font-semibold"><span className='text-primary'>Location:</span> {location}</h2>
        <h2 className="text-base font-semibold"><span className='text-primary'>Contact No:</span> {mobile}</h2>
        <h2 className="text-base font-semibold"><span className='text-primary'>Original Price:</span> {originalPrice} Tk.</h2>
        <p className='mt-2'><span className='text-primary'>About: </span> {description}</p>
        <h2 className="text-xl font-semibold text-primary">Tk. {resalePrice}</h2>
        <div className="card-actions justify-end mt-3">
          <button className="btn btn-primary btn-sm text-white">Book Now</button>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
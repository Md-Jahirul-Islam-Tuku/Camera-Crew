import React from 'react';
import { CheckBadgeIcon } from '@heroicons/react/24/solid'

const ProductCard = ({ product }) => {
  const { image, productName, location, resalePrice, originalPrice, usesYears, category, userName, mobile, condition, badge } = product;
  return (
    <div className="card card-compact bg-white shadow-xl">
      <figure><img src={image} alt="Shoes" className='h-56 px-2' /></figure>
      <hr />
      <div className="card-body text-left gap-0">
        <h2 className="text-base font-semibold text-primary">{productName}</h2>
        <h2 className="text-base font-semibold"><span className='text-primary'>Category:</span> {category}</h2>
        <h2 className="text-base font-semibold"><span className='text-primary'>Uses Years:</span> {usesYears} yrs.</h2>
        <h2 className="text-base font-semibold"><span className='text-primary'>Condition:</span> {condition}</h2>
        <h2 className="text-base font-semibold flex items-center"><span className='text-primary mr-1'>Seller:</span> {userName}{badge && <CheckBadgeIcon className="h-5 w-5 ml-1 text-blue-500" />}</h2>
        <h2 className="text-base font-semibold"><span className='text-primary'>Location:</span> {location}</h2>
        <h2 className="text-base font-semibold"><span className='text-primary'>Contact No:</span> {mobile}</h2>
        <h2 className="text-base font-semibold"><span className='text-primary'>Original Price:</span> {originalPrice} Tk.</h2>
        <h2 className="text-xl font-semibold text-primary">Tk. {resalePrice}</h2>
        <div className="card-actions justify-end mt-3">
          <button className="btn btn-primary btn-sm text-white">Book Now</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
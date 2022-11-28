import { CheckBadgeIcon } from '@heroicons/react/24/solid';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';
import { GeneralContext } from '../../Context/GeneralProvider';
import { ArrowTrendingDownIcon } from '@heroicons/react/24/solid';

const ItemCard = ({ product, setItem, bookings, reports }) => {
  const { user } = useContext(AuthContext);
  const { dbUser, handleReport } = useContext(GeneralContext);
  const { _id, image, productName, location, resalePrice, originalPrice, usesYears, category, userName, condition, mobile, description, badge } = product;

  const booked = bookings.filter(book => book.productId === _id && book.userEmail === user?.email)
  const id = booked[0]?.productId;
  const email = booked[0]?.userEmail;

  const report = reports.filter(book => book.productId === _id && book.reporterEmail === user?.email)
  const reportId = report[0]?.productId;
  const reportEmail = report[0]?.reporterEmail;


  return (
    <div className="card card-compact bg-white hover:shadow-xl">
      <figure className='bg-white'><img src={image} alt="Shoes" className='h-56 px-2 bg-white' /></figure>
      <hr />
      <div className="card-body text-left gap-0">
        <h2 className="text-base font-semibold text-primary">{productName}</h2>
        <h2 className="text-base font-semibold"><span className='text-primary'>Category:</span> {category}</h2>
        <h2 className="text-base font-semibold"><span className='text-primary'>Uses Years:</span> {usesYears} yrs.</h2>
        <h2 className="text-base font-semibold"><span className='text-primary'>Condition:</span> {condition}</h2>
        <h2 className="text-base font-semibold flex items-center"><span className='text-primary mr-1'>Seller:</span> {userName}{badge && <CheckBadgeIcon className="h-5 w-5 ml-1 text-blue-500 animate-bounce" />}</h2>
        <h2 className="text-base font-semibold"><span className='text-primary'>Location:</span> {location}</h2>
        <h2 className="text-base font-semibold"><span className='text-primary'>Contact No:</span> {mobile}</h2>
        <h2 className="text-base font-semibold"><span className='text-primary'>Original Price:</span> {originalPrice} Tk.</h2>
        <p className='mt-2'><span className='text-primary'>About: </span> {description}</p>
        <h2 className="text-xl font-semibold text-primary">Tk. {resalePrice}</h2>
        {
          user ? <><div className="card-actions justify-between mt-3">
            {
              _id === id && user.email === email ? <label className="btn btn-sm bg-accent text-white font-semibold border-0 btn-disabled">Booked</label> : <label onClick={() => setItem(product)} htmlFor="booking-modal" className="btn btn-sm bg-gradient-to-r from-secondary to-primary text-white font-semibold border-0">Book Now</label>
            }
            {
              _id === reportId && user.email === reportEmail ? <div className="tooltip tooltip-accent text-white" data-tip="Reported">
                <button className="btn btn-sm btn-accent"><ArrowTrendingDownIcon className='h-6 w-6 text-white' /></button>
              </div> : <Link onClick={() => handleReport(product)} className={`btn btn-primary btn-sm text-white bg-gradient-to-r from-secondary to-primary ${dbUser?.role === 'admin' && 'btn-disabled'}`}>
                Report
              </Link>
            }
          </div></> : <><div className="card-actions justify-between mt-3">
            <Link to='/login' className="btn btn-sm bg-gradient-to-r from-secondary to-primary text-white font-semibold border-0">Book Now</Link>
            <Link to='/login' className="btn btn-sm bg-gradient-to-r from-secondary to-primary text-white font-semibold border-0">Report</Link>
          </div></>
        }
      </div>
    </div>
  );
};

export default ItemCard;
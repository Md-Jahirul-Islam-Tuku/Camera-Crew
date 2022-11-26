import { CheckBadgeIcon } from '@heroicons/react/24/solid';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Context/AuthProvider';
import { GeneralContext } from '../../Context/GeneralProvider';
import ButtonSpinner from '../Spinner/buttonSpinner';

const ItemCard = ({ product, handleOrders }) => {
  const { user, loading, setLoading } = useContext(AuthContext);
  const { dbUser, bookings } = useContext(GeneralContext);
  const { _id,image, productName, location, resalePrice, originalPrice, usesYears, category, userName, condition, mobile, description, report, reportEmail, badge } = product;
  const [refresh, setRefresh] = useState(false);
  const handleReport = product => {
    setLoading(true)
    fetch(`http://localhost:5000/productReport/${product?._id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => {
        if (data.modifiedCount) {
          Swal.fire({
            icon: 'success',
            title: `${product?.productName}`,
            text: 'Report to Admin Successfully',
            showConfirmButton: true,
          })
        }
        setLoading(false)
        setRefresh(!refresh)
      })
      .catch(err => console.error(err))
  }
  const booked = bookings.filter(book => book.productId === _id && book.userEmail === user?.email)
  const id = booked[0]?.productId;
  const email = booked[0]?.userEmail;
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
          dbUser?.role === "Buyer" ? <><div className="card-actions justify-between mt-3">
            {
              dbUser?.role === "Buyer" ? <button onClick={() => handleOrders(product)} className={`btn btn-primary btn-sm text-white ${id === _id && user?.email === email && 'btn-disabled bg-blue-200'}`}>
                Book Now
              </button> : <button className='btn btn-sm text-white btn-disabled bg-blue-200'>
                Book Now
              </button>
            }
            {
              report && reportEmail === user.email ? <h1 className='text-error text-lg font-semibold'>Reported</h1> : <Link onClick={() => handleReport(product)} className="btn btn-primary btn-sm text-white">
                {
                  loading ? <ButtonSpinner /> : 'Report'
                }
              </Link>
            }
          </div></> : <><div className="card-actions justify-between mt-3">
            <Link className="btn btn-primary btn-sm text-white btn-disabled bg-blue-200">Book Now</Link>
            <Link className="btn btn-sm text-white btn-disabled bg-blue-200">Report</Link>
          </div></>
        }
      </div>
    </div>
  );
};

export default ItemCard;
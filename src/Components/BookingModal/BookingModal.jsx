import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Context/AuthProvider';
import { GeneralContext } from '../../Context/GeneralProvider';

const BookingModal = ({ product, setItem, refetch }) => {
  const { _id, productName, resalePrice, image } = product;
  const { user } = useContext(AuthContext);
  const {refresh, setRefresh}=useContext(GeneralContext);
  const handleBooking = e => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const phone = form.phone.value;
    const email = form.email.value;
    const location = form.location.value;

    const booking = {
      productName,
      productId: _id,
      price: resalePrice,
      userName: name,
      userEmail: email,
      phone,
      location
    }
    fetch('http://localhost:5000/booking', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `bearer ${localStorage.getItem('cameraCrew-token')}`
      },
      body: JSON.stringify(booking)
    }).then(res => res.json()).then(product => {
      if (product.acknowledged) {
        Swal.fire({
          icon: 'success',
          imageUrl: `${image}`,
          imageWidth: 350,
          imageHeight: 350,
          imageAlt: 'Product image',
          title: `${productName} booked successfully`,
          showConfirmButton: false,
          timer: 1500
        })
      }
      form.reset()
      refetch()
      setItem(null)
      setRefresh(!refresh)
    })
  }
  return (
    <>
      <input type="checkbox" id="booking-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label htmlFor="booking-modal" className="btn btn-primary text-white btn-sm btn-circle absolute right-2 top-2">✕</label>
          <h3 className="text-xl font-bold text-left text-primary">{productName}</h3>
          <h3 className="text-lg font-bold text-left text-secondary">Tk. {resalePrice}</h3>
          <form onSubmit={handleBooking} className='grid grid-cols-1 gap-2 font-semibold mt-3'>
            <input name='name' type="text" defaultValue={user?.displayName} disabled placeholder="Full Name" className="input input-bordered w-full text-lg" />
            <input name='email' type="email" defaultValue={user?.email} disabled placeholder="Email" className="input input-bordered w-full" />
            <input name='phone' type="text" placeholder="Phone Number" className="input input-bordered w-full" />
            <input name='location' type="text" placeholder="Meeting location" className="input input-bordered w-full" />
            <button type='submit' className='w-full btn text-white bg-gradient-to-r from-secondary to-primary font-semibold border-0'>Submit</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default BookingModal;
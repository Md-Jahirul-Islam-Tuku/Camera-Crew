import React, { useContext, useEffect, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';
import LoadingSpinner from '../Components/Spinner/LoadingSpinner';
import { AuthContext } from '../Context/AuthProvider';
import { GeneralContext } from '../Context/GeneralProvider';

const MyOrders = () => {
 const { user, loading } = useContext(AuthContext);
 const { refresh, setRefresh } = useContext(GeneralContext);
 const [orders, setOrders] = useState([])
 useEffect(() => {
  fetch(`https://y-mauve-alpha.vercel.app/myOrders/${user?.email}`,
   {
    method: 'GET',
    headers: {
     'content-type': 'application/json',
     authorization: `Bearer ${localStorage.getItem('cameraCrew-token')}`,
    },
   }
  )
   .then(res => res.json())
   .then(data => {
    setOrders(data)
   })
 }, [user?.email, refresh])

 const handleDelete = product => {
  const swalWithBootstrapButtons = Swal.mixin({
   customClass: {
    confirmButton: 'btn btn-success',
    cancelButton: 'btn btn-error text-white mr-2'
   },
   buttonsStyling: false
  })
  swalWithBootstrapButtons.fire({
   title: 'Are you sure?',
   text: `You won't be able to revert Dr. ${product?.productName}`,
   imageUrl: `${product?.image}`,
   imageWidth: 350,
   imageHeight: 350,
   imageAlt: 'Product image',
   showCancelButton: true,
   confirmButtonText: 'Yes, delete it!',
   cancelButtonText: 'No, cancel!',
   reverseButtons: true
  }).then((result) => {
   if (result.isConfirmed) {
    fetch(`https://y-mauve-alpha.vercel.app/bookings/${product?._id}`, {
     method: 'DELETE',
     headers: {
      authorization: `Bearer ${localStorage.getItem('cameraCrew-token')}`
     }
    })
     .then(res => res.json())
     .then(data => {
      if (data?.deletedCount) {
       swalWithBootstrapButtons.fire(
        'Deleted!',
        `${product?.name} has been deleted.`,
        'success'
       )
       setRefresh(!refresh)
      }
     })

   } else if (
    result.dismiss === Swal.DismissReason.cancel
   ) {
    swalWithBootstrapButtons.fire(
     'Cancelled',
     'Your imaginary doctor is safe :)',
     'error'
    )
   }
  })
 }
 const handleAdvertisement = product => {
  fetch(`https://y-mauve-alpha.vercel.app/products/${product?._id}`, {
   method: 'PUT',
   headers: {
    authorization: `Bearer ${localStorage.getItem('cameraCrew-token')}`
   }
  })
   .then(res => res.json())
   .then(data => {
    if (data.modifiedCount) {
     Swal.fire({
      icon: 'success',
      imageUrl: `${product?.image}`,
      imageWidth: 350,
      imageHeight: 350,
      imageAlt: 'Product image',
      title: 'To Advertisement Successfully',
      text: `${product?.productName}`,
      showConfirmButton: true,
     })
    }
   })
   .catch(err => console.error(err))
 }

 return (
  <div className='min-h-[100vh] bg-gray-200 font-semibold text-primary'>
   {loading && <LoadingSpinner />}
   <h1 className='text-3xl py-5'>{user?.displayName} your total bookings: {orders.length}</h1>
   <div className="overflow-x-auto mx-20">
    <table className="table w-full table-normal">
     <thead>
      <tr>
       <th></th>
       <th></th>
       <th>Name</th>
       <th>Resale Price</th>
       <th>Location</th>
       <th>Advertisement</th>
       <th>Action</th>
      </tr>
     </thead>
     <tbody>
      {orders.map((product, i) =>
       <tr key={product._id}>
        <th>{i + 1}</th>
        <td>
         <div className="avatar">
          <div className="w-12 rounded-xl">
           <img src={product?.image} alt="" />
          </div>
         </div>
        </td>
        <td>{product.productName}</td>
        <td>Tk. {product.price}</td>
        <td>{product.location}</td>
        <td>
         {
          product.price && !product.paid &&
          <Link to={`/dashboard/payment/${product._id}`}><button className='btn btn-xs btn-accent text-white hover:text-success'>Payment</button></Link>
         }
         {
          product.price && product.paid &&
          <p className='text-secondary text-xl hidden'>PAID</p>
         }
        </td>
        <td><button onClick={() => handleDelete(product)} className='btn btn-xs font-semibold text-white btn-error'>Delete</button></td>
       </tr>
      )
      }
     </tbody>
    </table>
   </div>
  </div>
 );
};

export default MyOrders;
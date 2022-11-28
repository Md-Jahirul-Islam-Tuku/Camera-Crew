import React, { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../Context/AuthProvider';
import LoadingSpinner from '../../Spinner/LoadingSpinner';
import { CheckBadgeIcon } from '@heroicons/react/24/solid'
import { useQuery } from '@tanstack/react-query';

const AllBuyer = () => {
  const { loading } = useContext(AuthContext);

  const { data: buyers = [], refetch } = useQuery({
    queryKey: ['buyers'],
    queryFn: () => fetch('http://localhost:5000/users?role=Buyer').then(res => res.json())
  })
  const { data: bookings = [], } = useQuery({
    queryKey: ['bookings'],
    queryFn: () => fetch('http://localhost:5000/booking').then(res => res.json())
  })

  const handleProducts = buyer => {
    fetch(`http://localhost:5000/value/${buyer?.email}`, {
      method: 'PUT'
    }).then(res => res.json()).then(() => { })
  }

  const handleBadge = buyer => {
    fetch(`http://localhost:5000/seller/${buyer?._id}`, {
      method: 'PUT',
      headers: {
        authorization: `Bearer ${localStorage.getItem('cameraCrew-token')}`
      }
    })
      .then(res => {
        handleProducts(buyer);
        return res.json();
      })
      .then(data => {
        if (data.modifiedCount) {
          Swal.fire({
            icon: 'success',
            imageUrl: `${buyer?.img}`,
            imageWidth: 350,
            imageHeight: 350,
            imageAlt: 'Product image',
            title: 'Advertised Successfully',
            text: `${buyer?.name}`,
            showConfirmButton: true,
          })
        }
      })
      .catch(err => console.error(err))
  }
  return (
    <div className='min-h-[100vh] bg-gray-200 font-semibold text-primary'>
      {loading && <LoadingSpinner />}
      <h1 className='text-3xl py-5'>Total Buyers: {buyers.length}</h1>
      <div className="overflow-x-auto mx-20">
        <table className="table w-full table-normal">
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Total Bookings</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {buyers.map((buyer, i) =>
              <tr key={buyer._id}>
                <th>{i + 1}</th>
                <td>
                  <div className="avatar">
                    <div className="w-12 rounded-xl">
                      <img src={buyer?.img} alt={buyer.name} />
                    </div>
                  </div>
                </td>
                <td>{buyer.name}</td>
                <td>{buyer.email}</td>
                <td className='text-lg font-semibold'>
                  {bookings.length}
                </td>
                <td><button className='btn btn-xs font-semibold text-white btn-error'>Delete</button></td>
              </tr>
            )
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllBuyer;
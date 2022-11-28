import React, { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../Context/AuthProvider';
import LoadingSpinner from '../../Spinner/LoadingSpinner';
import { CheckBadgeIcon } from '@heroicons/react/24/solid'
import { useQuery } from '@tanstack/react-query';

const AllSeller = () => {
  const { loading } = useContext(AuthContext);
  const [refresh, setRefresh] = useState(true);
  let [changeText, setChangeText] = useState(false);

  // const [sellers, setSellers] = useState([]);
  // useEffect(() => {
  //   fetch('http://localhost:5000/users?role=Seller')
  //     .then(res => res.json())
  //     .then(data => {
  //       setSellers(data)
  //       setRefresh(!refresh)
  //     })
  // }, [refresh])

  const { data: sellers = [], refetch } = useQuery({
    queryKey: ['sellers'],
    queryFn: () => fetch('http://localhost:5000/users?role=Seller').then(res => res.json())
  })

  const handleDelete = seller => {
    const email = seller.email;
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-error text-white mr-2'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: `You won't be able to revert Dr. ${seller?.productName}`,
      imageUrl: `${seller?.img}`,
      imageWidth: 350,
      imageHeight: 350,
      imageAlt: 'Seller image',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/seller/${seller?._id}`, {
          method: 'DELETE',
          headers: {
            authorization: `Bearer ${localStorage.getItem('cameraCrew-token')}`
          },
          body: JSON.stringify({ email })
        })
          .then(res => res.json())
          .then(data => {
            if (data?.deletedCount) {
              swalWithBootstrapButtons.fire(
                'Deleted!',
                `${seller?.name} has been deleted.`,
                'success'
              )
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
  const handleBadge = seller => {
    const email = seller.email;
    setChangeText(!changeText);
    fetch(`http://localhost:5000/seller/${seller?._id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('cameraCrew-token')}`
      },
      body: JSON.stringify({ changeText, email })
    })
      .then(res => res.json())
      .then(data => {
        if (data.result.modifiedCount && data.value.modifiedCount && changeText) {
          Swal.fire({
            icon: 'success',
            imageUrl: `${seller?.img}`,
            imageWidth: 350,
            imageHeight: 350,
            imageAlt: 'Seller image',
            title: `${seller?.name} verified`,
            showConfirmButton: true,
          })
          refetch()
        }
        else if (data.result.modifiedCount && data.value.modifiedCount && !changeText){
          Swal.fire({
            icon: 'error',
            imageUrl: `${seller?.img}`,
            imageWidth: 350,
            imageHeight: 350,
            imageAlt: 'Seller image',
            title: `${seller?.name} unverified`,
            showConfirmButton: true,
          })
          refetch()
        }
      })
      .catch(err => console.error(err))
  }
  return (
    <div className='min-h-[100vh] bg-gray-200 font-semibold text-primary'>
      {loading && <LoadingSpinner />}
      <h1 className='text-3xl py-5'>Total Sellers: {sellers.length}</h1>
      <div className="overflow-x-auto mx-20">
        <table className="table w-full table-normal">
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Verification</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              sellers.map((seller, i) =>
                <tr key={seller._id}>
                  <th>{i + 1}</th>
                  <td>
                    <div className="avatar">
                      <div className="w-12 rounded-xl">
                        <img src={seller?.img} alt="" />
                      </div>
                    </div>
                  </td>
                  <td>{seller.name}</td>
                  <td>{seller.email}</td>
                  <td>
                    {seller.badge ? <button onClick={() => handleBadge(seller)} className='btn btn-xs font-semibold text-white btn-primary'>Refute</button> :
                      <>
                        <div className='flex items-center'>
                          <button onClick={() => handleBadge(seller)} className='btn btn-xs font-semibold text-white btn-primary'>verify</button>
                          <CheckBadgeIcon className='h-6 w-6 text-blue-600 ml-1' />
                        </div>
                      </>}
                  </td>
                  <td><button onClick={() => handleDelete(seller)} className='btn btn-xs font-semibold text-white btn-error'>Delete</button></td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllSeller;
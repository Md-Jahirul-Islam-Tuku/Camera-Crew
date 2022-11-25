import React, { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../Context/AuthProvider';
import LoadingSpinner from '../../Spinner/LoadingSpinner';
import { CheckBadgeIcon } from '@heroicons/react/24/solid'

const AllSeller = () => {
  const { loading } = useContext(AuthContext);
  const [sellers, setSellers] = useState([]);
  const [refresh, setRefresh] = useState(true)
  useEffect(() => {
    fetch('http://localhost:5000/users?role=Seller')
      .then(res => res.json())
      .then(data => {
        setSellers(data)
        setRefresh(!refresh)
      })
  }, [refresh])
  const handleProducts = seller =>{
    fetch(`http://localhost:5000/value/${seller?.email}`, {
      method: 'PUT'
    }).then(res=>res.json()).then(()=>{})
  }

  const handleBadge = seller => {
    fetch(`http://localhost:5000/seller/${seller?._id}`, {
      method: 'PUT',
      headers: {
        authorization: `Bearer ${localStorage.getItem('cameraCrew-token')}`
      }
    })
      .then(res => {
        handleProducts(seller);
        return res.json();
      })
      .then(data => {
        if (data.modifiedCount) {
          Swal.fire({
            icon: 'success',
            imageUrl: `${seller?.img}`,
            imageWidth: 350,
            imageHeight: 350,
            imageAlt: 'Product image',
            title: 'Advertised Successfully',
            text: `${seller?.name}`,
            showConfirmButton: true,
          })
        }
      })
      .catch(err => console.error(err))
  }
  return (
    <div className='min-h-[100vh] bg-gray-200 font-semibold text-primary'>
      <h1 className='text-3xl py-5'>All Sellers</h1>
      <div className="overflow-x-auto mx-20">
        <table className="table w-full table-normal">
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Provide Badge</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              loading ? <LoadingSpinner /> : sellers.map((seller, i) =>
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
                  <td>{seller.badge ? <p className='text-lg text-green-600 flex items-center'>Sent <CheckBadgeIcon className="h-6 w-6 text-blue-500 ml-2" /></p> : <button onClick={() => handleBadge(seller)} className='btn btn-xs font-semibold text-white btn-primary'>Send Badge</button>}</td>
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

export default AllSeller;
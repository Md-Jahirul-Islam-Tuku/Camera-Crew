import React, { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../Context/AuthProvider';
import LoadingSpinner from '../../Spinner/LoadingSpinner';
import { CheckBadgeIcon } from '@heroicons/react/24/solid'

const AllSeller = () => {
  const { loading } = useContext(AuthContext);
  const [sellers, setSellers] = useState([]);
  const [refresh, setRefresh] = useState(true);

  let [changeText, setChangeText] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5000/users?role=Seller')
      .then(res => res.json())
      .then(data => {
        setSellers(data)
        setRefresh(!refresh)
      })
  }, [refresh])
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
        console.log(data);
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
                    {seller.badge ? <button onClick={() => handleBadge(seller)} className='btn btn-xs font-semibold text-white btn-primary'>unverify</button> :
                      <>
                        <div className='flex items-center'>
                          <button onClick={() => handleBadge(seller)} className='btn btn-xs font-semibold text-white btn-primary'>verify</button>
                          <CheckBadgeIcon className='h-6 w-6 text-blue-600 ml-1' />
                        </div>
                      </>}
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

export default AllSeller;
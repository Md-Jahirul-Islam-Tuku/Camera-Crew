import React, { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../Context/AuthProvider';
import LoadingSpinner from '../../Spinner/LoadingSpinner';
import { CheckBadgeIcon } from '@heroicons/react/24/solid'

const AllBuyer = () => {
  const { loading } = useContext(AuthContext);
  const [buyers, setBuyers] = useState([]);
  const [refresh, setRefresh] = useState(true)
  useEffect(() => {
    fetch('http://localhost:5000/users?role=Buyer')
      .then(res => res.json())
      .then(data => {
        setBuyers(data)
        setRefresh(!refresh)
      })
  }, [refresh])
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
      <h1 className='text-3xl py-5'>Total Buyers: {buyers.length}</h1>
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
              loading ? <LoadingSpinner /> : buyers.map((buyer, i) =>
                <tr key={buyer._id}>
                  <th>{i + 1}</th>
                  <td>
                    <div className="avatar">
                      <div className="w-12 rounded-xl">
                        <img src={buyer?.img} alt="" />
                      </div>
                    </div>
                  </td>
                  <td>{buyer.name}</td>
                  <td>{buyer.email}</td>
                  <td>{buyer.badge ? <p className='text-lg text-green-600 flex items-center'>Sent <CheckBadgeIcon className="h-6 w-6 text-blue-500 ml-2" /></p> : <button onClick={() => handleBadge(buyer)} className='btn btn-xs font-semibold text-white btn-primary'>Send Badge</button>}</td>
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
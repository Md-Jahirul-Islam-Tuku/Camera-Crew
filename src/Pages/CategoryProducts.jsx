import React, { useContext, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';
import ItemCard from '../Components/Card/ItemCard';
import LoadingSpinner from '../Components/Spinner/LoadingSpinner';
import { AuthContext } from '../Context/AuthProvider';

const CategoryProducts = () => {
  const products = useLoaderData();
  const { user, loading, setLoading } = useContext(AuthContext);
  const [refresh, setRefresh] = useState(false)
  const handleOrders = product => {
    const { _id, image, productName } = product;
    const productId = _id;
    const userEmail = user.email;
    const booking = { productId, userEmail }
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
        setRefresh(!refresh)
        setLoading(false)
      }
    })
  }
  return (
    <div>
      {loading && <LoadingSpinner/>}
      <div className=' bg-gray-200 pb-10'>
        <h1 className='text-3xl font-semibold text-primary py-5'>{products[0].category} Items</h1>
        <div className='grid grid-cols-5 gap-5 mx-3'>
          {
            products.map(product => <ItemCard key={product._id} product={product} handleOrders={handleOrders} />)
          }
        </div>
      </div>
    </div>
  );
};

export default CategoryProducts;
import React, { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Context/AuthProvider';
import ProductCard from '../Card/ProductCard';
import LoadingSpinner from '../Spinner/LoadingSpinner';

const Advertisements = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const { user, loading, setLoading } = useContext(AuthContext);
  const [refresh, setRefresh]= useState(false)
  useEffect(() => {
    fetch('http://localhost:5000/advertisementProducts')
      .then(res => res.json())
      .then(data => { setFeaturedProducts(data) })
  }, [refresh])
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
      {
        loading ? <LoadingSpinner /> :
          <div className={`bg-primary my-10 py-10 ${featuredProducts.length === 0 && 'hidden'}`}>
            <h1 className='text-3xl text-white font-semibold mb-10'>Advertisements</h1>
            <div className='grid grid-cols-5 gap-5 mx-5'>
              {
                featuredProducts.map(product => <ProductCard
                  key={product._id}
                  product={product}
                  handleOrders={handleOrders}
                ></ProductCard>)
              }
            </div>
          </div>
      }
    </div>
  );
};

export default Advertisements;
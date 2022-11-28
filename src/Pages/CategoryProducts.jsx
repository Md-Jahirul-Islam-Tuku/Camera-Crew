import React, { useContext, useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { getBookings } from '../API/getBookings';
import { getReports } from '../API/getReports';
import BookingModal from '../Components/BookingModal/BookingModal';
import ItemCard from '../Components/Card/ItemCard';
import LoadingSpinner from '../Components/Spinner/LoadingSpinner';
import { AuthContext } from '../Context/AuthProvider';
import { GeneralContext } from '../Context/GeneralProvider';

const CategoryProducts = () => {
  const products = useLoaderData();
  const { loading } = useContext(AuthContext);
  const [item, setItem] = useState(null);

  // const [orders, setOrders] = useState([])
  // useEffect(() => {
  //   fetch(`http://localhost:5000/myOrders/${user?.email}`)
  //     .then(res => res.json())
  //     .then(data => {
  //       setOrders(data)
  //     })
  // }, [user?.email, refresh])

  const { refresh } = useContext(GeneralContext);

  const [bookings, setBookings] = useState([])
  const fetchBookings = () =>
    getBookings().then(data => setBookings(data))
  useEffect(() => {
    fetchBookings()
  }, [refresh])

  const [reports, setReports] = useState([])
  const fetchReports = () =>
    getReports().then(data => setReports(data))
  useEffect(() => {
    fetchReports()
  }, [refresh])

  return (
    <div>
      {loading && <LoadingSpinner/>}
      <div className=' bg-gray-200 pb-10'>
        <h1 className='text-3xl font-semibold text-primary py-5'>{products[0].category} Items</h1>
        <div className='grid grid-cols-5 gap-5 mx-3'>
          {
            products.map(product => <ItemCard 
              key={product._id} 
              product={product}
              setItem={setItem}
              bookings={bookings}
              reports={reports}
               />)
          }
        </div>
        {item && <BookingModal product={item} setItem={setItem} />}
      </div>
    </div>
  );
};

export default CategoryProducts;
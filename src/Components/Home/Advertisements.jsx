import { useQuery } from '@tanstack/react-query';
import React, { useContext, useEffect, useState } from 'react';
import { getBookings } from '../../API/getBookings';
import { getReports } from '../../API/getReports';
import { GeneralContext } from '../../Context/GeneralProvider';
import BookingModal from '../BookingModal/BookingModal';
import ItemCard from '../Card/ItemCard';

const Advertisements = () => {
  const [item, setItem] = useState(null);
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

  const { data: featuredProducts = [], refetch } = useQuery({
    queryKey: ['featuredProducts'],
    queryFn: () => fetch('https://y-mauve-alpha.vercel.app/advertisementProducts').then(res => res.json())
  })
  return (
    <div className={`bg-primary my-10 py-10 ${featuredProducts.length === 0 && 'hidden'}`}>
      <h1 className='text-3xl text-white font-semibold mb-10'>Advertisements</h1>
      <div className='grid grid-cols-5 gap-5 mx-5'>
        {
          featuredProducts.map(product => <ItemCard
            key={product._id}
            product={product}
            setItem={setItem}
            refetch={refetch}
            bookings={bookings}
            reports={reports}
          />)
        }
      </div>
      {item && <BookingModal product={item} setItem={setItem} refetch={refetch} />}
    </div>
  );
};

export default Advertisements;
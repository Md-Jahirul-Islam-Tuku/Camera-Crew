import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe('pk_test_51M6vipFIcZQlcbQak3vWy6NRiVYXhPs7S566Bkgl6l3FZTjilrIoJfAoZy3M9RepGOjxuscAlKyL0hsmaa6NEfI800y9Va6RPr');
const Payment = () => {
  const data = useLoaderData();
  const { productName, price } = data;
  return (
    <div>
      <h1 className='text-3xl font-semibold my-3'>Pay for <span className='text-primary'>{productName}</span></h1>
      <h3 className='text-xl font-semibold'>Price: <span className='text-primary'>Tk. {price}</span></h3>
      <div className='w-[450px] mt-8 mx-auto text-left border-2 p-10 border-dashed rounded-xl'>
        <Elements
          stripe={stripePromise}
        >
          <CheckoutForm data={data} />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
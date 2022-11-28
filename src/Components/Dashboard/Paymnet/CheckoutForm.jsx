import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';

const CheckoutForm = ({ data }) => {
  const { price, productName, userEmail, _id } = data;
  console.log(data);
  const [cardError, setCardError] = useState('');
  const [success, setSuccess] = useState('');
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState('');
  const [clientSecret, setClientSecret] = useState("");

  const stripe = useStripe();
  const elements = useElements();
  useEffect(() => {
    fetch("https://y-mauve-alpha.vercel.app/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${localStorage.getItem('cameraCrew-token')}`
      },
      body: JSON.stringify({ price }),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
      });
  }, [price]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });
    if (error) {
      console.log('[error]', error);
      setCardError(error.message)
    } else {
      setCardError('')
      console.log('[PaymentMethod]', paymentMethod);
    }
    setSuccess('');
    setProcessing(true);
    const { paymentIntent, error: cardError } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: card,
          billing_details: {
            name: productName,
            email: userEmail
          },
        },
      },
    );
    if (cardError) {
      setCardError(cardError.message);
      return;
    }
    if (paymentIntent.status === 'succeeded') {
      setProcessing(false);
      const payment = {
        price,
        transactionId: paymentIntent.id,
        email: userEmail,
        bookingId: _id
      }
      fetch('https://y-mauve-alpha.vercel.app/payments', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${localStorage.getItem('dentistry-token')}`
        },
        body: JSON.stringify(payment)
      }).then(res => res.json()).then(data => {
        if (data.insertedId) {
          setSuccess('Congratulations! Your payment completed.');
          setTransactionId(paymentIntent.id);
        }
      })
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#3C4043',
              '::placeholder': {
                color: '#3C4043',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <button className='btn btn-primary btn-sm mt-3' type="submit"
        disabled={!stripe
          //  || !clientSecret
        }
      >
        {
          // processing ?
          //   <div className="w-6 h-6 border-4 border-dashed rounded-full animate-spin border-white"></div> :
          'Pay'
        }
      </button>
      <p className='mt-2 text-error'>{cardError}</p>
      {
        success && <div>
          <p className='text-green-500'>{success}</p>
          <p>Your transaction id: {transactionId}</p>
        </div>
      }
    </form>
  );
};

export default CheckoutForm;
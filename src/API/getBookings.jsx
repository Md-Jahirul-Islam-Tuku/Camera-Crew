export const getBookings = async () => {
  const response = await fetch(
    'http://localhost:5000/booking',
    {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('cameraCrew-token')}`,
      },
    }
  )
  const bookings = await response.json()
  return bookings
}
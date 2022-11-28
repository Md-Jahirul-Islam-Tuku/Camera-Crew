export const getBookings = async () => {
  const response = await fetch(
    'https://y-mauve-alpha.vercel.app/booking',
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
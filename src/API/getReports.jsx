export const getReports = async () => {
  const response = await fetch(
    'http://localhost:5000/reports',
    {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('cameraCrew-token')}`,
      },
    }
  )
  const reports = await response.json()
  return reports
}
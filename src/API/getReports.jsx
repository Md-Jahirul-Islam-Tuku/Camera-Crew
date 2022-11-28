export const getReports = async () => {
  const response = await fetch(
    'https://y-mauve-alpha.vercel.app/reports',
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
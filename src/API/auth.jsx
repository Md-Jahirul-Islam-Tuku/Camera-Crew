export const setAuthToken = user => {
  const currentUser = {
    name: user.name || user.displayName,
    email: user.email || user.email,
    img: user.userImage || user.photoURL,
    role: user.role,
  }
  fetch(`https://y-mauve-alpha.vercel.app/user/${user?.email}`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(currentUser),
  })
    .then(res => res.json())
    .then(data => {
      localStorage.setItem('cameraCrew-token', data.token)
    })
}
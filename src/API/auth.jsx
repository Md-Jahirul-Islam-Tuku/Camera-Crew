export const setAuthToken = user => {
  const currentUser = {
    name: user.name || user.displayName,
    email: user.email || user.email,
    img: user.userImage || user.photoURL,
    role: user.role,
  }
  console.log(currentUser);
  //   Save user in db & get token
  fetch(`http://localhost:5000/user/${user?.email}`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(currentUser),
  })
    .then(res => res.json())
    .then(data => {
      console.log(data)

      //Save token in LocalStorage
      localStorage.setItem('cameraCrew-token', data.token)
    })
}
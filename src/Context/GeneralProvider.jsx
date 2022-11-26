import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthContext } from './AuthProvider';


export const GeneralContext = createContext();
const GeneralProvider = ({children}) => {
  const {user}=useContext(AuthContext)
  const [dbUser, setDbUser] = useState({});
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/users/${user?.email}`)
      .then(res => res.json())
      .then(data => setDbUser(data))
      .catch(err => console.log('error', err))
  }, [user])

  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    fetch('http://localhost:5000/booking')
      .then(res => res.json())
      .then(data => {
        setBookings(data)
        setRefresh(!refresh)
      })
  })

  const value={
    dbUser,
    bookings,
    setBookings
  }
  return (
    <GeneralContext.Provider value={value}>
      {children}
    </GeneralContext.Provider>
  );
};

export default GeneralProvider;
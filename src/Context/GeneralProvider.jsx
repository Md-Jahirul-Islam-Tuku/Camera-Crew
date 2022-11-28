import { useQuery } from '@tanstack/react-query';
import React, { createContext, useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from './AuthProvider';


export const GeneralContext = createContext();
const GeneralProvider = ({ children }) => {
  const { user } = useContext(AuthContext)
  const [dbUser, setDbUser] = useState({});
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    fetch(`https://y-mauve-alpha.vercel.app/users/${user?.email}`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${localStorage.getItem('cameraCrew-token')}`
      }
    })
      .then(res => res.json())
      .then(data => setDbUser(data))
      .catch(err => console.log('error', err))
  }, [user?.email])

  const handleReport = product => {
    const report = {
      productId: product._id,
      reporterName: user.displayName,
      reporterEmail: user.email,
      image: product.image,
      productName: product.productName,
      category: product.category
    }
    fetch('https://y-mauve-alpha.vercel.app/reportProduct', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('cameraCrew-token')}`
      },
      body: JSON.stringify(report)
    }).then(res => res.json()).then(data => {
      console.log(data);
      if (data.acknowledged) {
        Swal.fire(`${product.productName} reported to admin`);
      }
      setRefresh(!refresh)
    })
  }
  const value = {
    dbUser,
    handleReport,
    refresh,
    setRefresh
  }
  return (
    <GeneralContext.Provider value={value}>
      {children}
    </GeneralContext.Provider>
  );
};

export default GeneralProvider;
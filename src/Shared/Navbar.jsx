import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../Assets/img/icon/favicon.png';
import profile from '../Assets/img/icon/profile.png';
import { AuthContext } from '../Context/AuthProvider';

const Navbar = () => {
  const [dbUser, setDbUser] = useState(null);
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate()
  const email = user?.email;
  useEffect(() => {
    fetch(`http://localhost:5000/user/${email}`)
      .then(res => res.json())
      .then(data => {
        setDbUser(data);
      })
  }, [email, user])
  const userLogOut = () => {
    logOut();
    navigate('/')
  }
  const menu = <>
    <li><Link to='/' className='rounded-lg' >Home</Link></li>
    <li><Link to='/blog' className='rounded-lg' >Blog</Link></li>
    {
      dbUser?.role === 'Buyer' && user && <li><Link to='/myOrders' className='rounded-lg' >My Orders</Link></li>
    }
    {
      dbUser?.role === 'Seller' && user && <>
        <li tabIndex={0}>
          <Link to='/dashboard' className="justify-between rounded-lg">
            Dashboard
            <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" /></svg>
          </Link>
          <ul className="p-2 bg-white rounded-lg">
            <li><Link to='/dashboard' className='rounded-lg' >Add Product</Link></li>
            <li><Link to='/dashboard/myProducts' className='rounded-lg' >My Products</Link></li>
            <li><Link to='/dashboard/myBuyers' className='rounded-lg' >My Buyers</Link></li>
          </ul>
        </li>
      </>
    }
    {
      dbUser?.role === 'admin' && user && <>
        <li tabIndex={0}>
          <Link className="justify-between">
            Dashboard
            <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" /></svg>
          </Link>
          <ul className="p-2 bg-white rounded-lg">
            <li><Link to='/' className='rounded-lg' >All Sellers</Link></li>
            <li><Link to='/' className='rounded-lg' >All Buyers</Link></li>
            <li><Link to='/' className='rounded-lg' >Reported Items</Link></li>
          </ul>
        </li>
      </>
    }
  </>
  return (
    <div className="navbar bg-base-100 text-primary py-8 fixed z-10 w-[1280px]">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </label>
          <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
            {menu}
          </ul>
        </div>
        <Link to='/' className="btn btn-ghost normal-case text-3xl pl-0" style={{ fontFamily: 'Eagle Lake' }}><img src={logo} className='w-10' alt="Logo" /> CameraCrew</Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal p-0 text-xl font-semibold">
          {menu}
        </ul>
      </div>
      <div className="navbar-end">
        {
          user ? <><button className="btn btn-ghost text-lg font-bold" onClick={userLogOut} >Log Out</button>
            <div className='tooltip tooltip-bottom tooltip-primary' data-tip={user?.displayName}>
              <img src={user.photoURL} className='w-12 h-12 rounded-full border-2 border-primary' alt="User" />
            </div></> :
            <><Link to='/login' className="btn btn-ghost text-lg font-bold">Login</Link>
              <img src={profile} className='w-10' alt="UserPhoto" /></>
        }
      </div>
    </div>
  );
};

export default Navbar;
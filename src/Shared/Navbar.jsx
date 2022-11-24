import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from '../Assets/img/icon/favicon.png';
import profile from '../Assets/img/icon/profile.png';
import { AuthContext } from '../Context/AuthProvider';

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const menu = <>
    <li><Link to='/' className='rounded-lg' >Home</Link></li>
    <li><Link to='/blog' className='rounded-lg' >Blog</Link></li>
    <li><Link to='/myorders' className='rounded-lg' >My Orders</Link></li>
  </>
  return (
    <div className="navbar bg-base-100 text-primary py-8">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </label>
          <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
            {menu}
          </ul>
        </div>
        <Link to='/' className="btn btn-ghost normal-case text-3xl" style={{fontFamily: 'Eagle Lake'}}><img src={logo} className='w-10' alt="Logo" /> CameraCrew</Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal p-0 text-lg font-semibold">
          {menu}
        </ul>
      </div>
      <div className="navbar-end">
        {
          user ? <><Link to='/login' className="btn btn-ghost text-lg font-bold" onClick={logOut} >Log Out</Link>
            <img src={user.photoURL} className='w-12 h-12 rounded-full border-2 border-primary' alt="UserPhoto" /></> :
            <><Link to='/login' className="btn btn-ghost text-lg font-bold">Login</Link>
              <img src={profile} className='w-10' alt="UserPhoto" /></>
        }
      </div>
    </div>
  );
};

export default Navbar;
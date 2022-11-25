import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Shared/Navbar';

const Dashboard = () => {
  return (
    <div className='lg:w-[1280px] mx-auto'>
      <Navbar/>
      <Outlet/>
    </div>
  );
};

export default Dashboard;
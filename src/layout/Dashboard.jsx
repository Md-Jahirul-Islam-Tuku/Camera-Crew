import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Shared/Navbar';

const Dashboard = () => {
  return (
    <div>
      <Navbar/>
      <Outlet/>
    </div>
  );
};

export default Dashboard;
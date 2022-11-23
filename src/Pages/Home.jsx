import React from 'react';
import Banner from '../Components/Home/Banner';
import Categories from '../Components/Home/Categories';
import ValuableClients from '../Components/Home/ValuableClients';

const Home = () => {
  return (
    <div className='my-10'>
      <Banner/>
      <Categories/>
      <ValuableClients/>
    </div>
  );
};

export default Home;
import React from 'react';
import Banner from '../Components/Home/Banner';
import Categories from '../Components/Home/Categories';
import ValuableClients from '../Components/Home/ValuableClients';

const Home = () => {
  return (
    <div className='mb-10 pt-32 px-5 lg:px-0'>
      <Banner/>
      <Categories/>
      <ValuableClients/>
    </div>
  );
};

export default Home;
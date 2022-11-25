import React from 'react';
import Banner from '../Components/Home/Banner';
import Categories from '../Components/Home/Categories';
import Advertisements from '../Components/Home/Advertisements';
import ValuableClients from '../Components/Home/ValuableClients';

const Home = () => {
  return (
    <div className='mb-10 pt-32 px-5 lg:px-0'>
      <Banner/>
      <Advertisements />
      <Categories/>
      <ValuableClients/>
    </div>
  );
};

export default Home;
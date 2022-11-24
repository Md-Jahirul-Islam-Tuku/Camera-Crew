import React from 'react';

const ValuableClients = () => {
  return (
    <section className="p-6 dark:bg-blue-100 dark:text-gray-100 rounded-xl">
      <div className="container p-4 mx-auto text-center">
        <h2 className="text-4xl font-bold text-primary">Some of Our Valuable Clients</h2>
      </div>
      <div className="container flex flex-wrap justify-center mx-auto dark:text-gray-400">
        <div className="flex justify-center w-1/2 p-6 align-middle md:w-1/3 xl:w-1/4">
          <img src="https://camerabazar.net/wp-content/uploads/2022/09/deepto-tv-logo.jpg" className='h-16 rounded-lg shadow-lg' alt="client" />
        </div>
        <div className="flex justify-center w-1/2 p-6 align-middle md:w-1/3 xl:w-1/4">
          <img src="https://camerabazar.net/wp-content/uploads/2022/09/asin-tv-logo.jpg" className='h-16 rounded-lg shadow-lg' alt="client" />
        </div>
        <div className="flex justify-center w-1/2 p-6 align-middle md:w-1/3 xl:w-1/4">
          <img src="https://camerabazar.net/wp-content/uploads/2022/09/my-tv-logo.jpg" className='h-16 rounded-lg shadow-lg' alt="client" />
        </div>
        <div className="flex justify-center w-1/2 p-6 align-middle md:w-1/3 xl:w-1/4">
          <img src="https://camerabazar.net/wp-content/uploads/2022/09/ksrm-logo.jpg" className='h-16 rounded-lg shadow-lg' alt="client" />
        </div>
        <div className="flex justify-center w-1/2 p-6 align-middle md:w-1/3 xl:w-1/4">
          <img src="https://camerabazar.net/wp-content/uploads/2022/09/bangladesh-army-logo.jpg" className='h-16 rounded-lg shadow-lg' alt="client" />
        </div>
        <div className="flex justify-center w-1/2 p-6 align-middle md:w-1/3 xl:w-1/4">
          <img src="https://camerabazar.net/wp-content/uploads/2022/09/secondary-higher-education-board-logo.png" className='h-16 rounded-lg bg-white shadow-lg' alt="client" />
        </div>
        <div className="flex justify-center w-1/2 p-6 align-middle md:w-1/3 xl:w-1/4">
          <img src="https://camerabazar.net/wp-content/uploads/2022/09/bangladesh-air-force-logo.jpg" className='h-16 rounded-lg shadow-lg' alt="client" />
        </div>
        <div className="flex justify-center w-1/2 p-6 align-middle md:w-1/3 xl:w-1/4">
          <img src="https://camerabazar.net/wp-content/uploads/2022/09/aci-logo.png" className='h-16 rounded-lg bg-white shadow-lg' alt="client" />
        </div>
      </div>
    </section>
  );
};

export default ValuableClients;
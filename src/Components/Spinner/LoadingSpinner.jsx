import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className='flex justify-center items-center h-full my-10'>
      <div className='w-14 h-14 border-8 border-dashed rounded-full animate-spin border-primary'></div>
    </div>
  );
};

export default LoadingSpinner;
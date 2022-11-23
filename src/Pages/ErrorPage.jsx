import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div>
      <section className="flex items-center h-[100vh] sm:p-16 dark:text-gray-100">
        <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8 space-y-8 text-center sm:max-w-md">
          <h2 className="font-extrabold text-9xl dark:text-gray-600 flex items-center">
            4<div className='animate-bounce'>0</div>4
          </h2>
          
          <p className="text-3xl text-primary">Sorry, we couldn't find this page.</p>
          <Link to='/' className="px-8 py-3 font-semibold rounded bg-primary">Back to homepage</Link>
        </div>
      </section>
    </div>
  );
};

export default ErrorPage;
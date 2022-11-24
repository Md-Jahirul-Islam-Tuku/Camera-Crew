import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../Context/AuthProvider';

const MyProducts = () => {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:5000/products/${user?.email}`)
      .then(res => res.json())
      .then(data => setProducts(data))
  }, [user?.email])
  return (
    <div className='pt-32 h-[100vh] bg-gray-200 font-semibold text-primary'>
      <h1 className='text-3xl'>{user?.displayName} your total products: {products.length}</h1>
      <div className="overflow-x-auto mx-20 mt-6">
        <table className="table w-full table-normal">
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th>Name</th>
              <th>Category</th>
              <th>Resale Price</th>
              <th>Original Price</th>
              <th>Advertise</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              products.map((product, i) =>
                <tr>
                  <th>{i + 1}</th>
                  <td>
                    <div className="avatar">
                      <div className="w-12 rounded-xl">
                        <img src={product?.image} alt="" />
                      </div>
                    </div>
                  </td>
                  <td>{product.productName}</td>
                  <td>{product.category}</td>
                  <td>{product.resalePrice} <span className='ml-1'>BDT*</span></td>
                  <td>{product.originalPrice} <span className='ml-1'>BDT*</span></td>
                  <td><button className='btn btn-xs font-semibold text-white btn-primary'>Advertise</button></td>
                  <td><button className='btn btn-xs font-semibold text-white btn-error'>Delete</button></td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyProducts;
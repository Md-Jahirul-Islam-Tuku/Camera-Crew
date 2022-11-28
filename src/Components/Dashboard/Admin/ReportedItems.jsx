import React, { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { getReports } from '../../../API/getReports';
import { AuthContext } from '../../../Context/AuthProvider';
import { GeneralContext } from '../../../Context/GeneralProvider';
import LoadingSpinner from '../../Spinner/LoadingSpinner';

const ReportedItems = () => {
  const { user, loading } = useContext(AuthContext);
  const { refresh, setRefresh } = useContext(GeneralContext);

  const [reports, setReports] = useState([])
  const fetchReports = () =>
    getReports().then(data => setReports(data))
  useEffect(() => {
    fetchReports()
  }, [refresh])

  const handleDelete = product => {
    const { productId } = product;
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-error text-white mr-2'
      },
      buttonsStyling: false
    })
    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: `You won't be able to revert Dr. ${product?.productName}`,
      imageUrl: `${product?.image}`,
      imageWidth: 350,
      imageHeight: 350,
      imageAlt: 'Product image',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://y-mauve-alpha.vercel.app/products/${productId}`, {
          method: 'DELETE',
          headers: {
            authorization: `Bearer ${localStorage.getItem('cameraCrew-token')}`
          }
        })
          .then(res => res.json())
          .then(data => {
            if (data?.deletedCount) {
              swalWithBootstrapButtons.fire(
                'Deleted!',
                `${product?.name} has been deleted.`,
                'success'
              )
              setRefresh(!refresh)
            }
          })

      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your imaginary doctor is safe :)',
          'error'
        )
      }
    })
  }

  return (
    <div className='min-h-[100vh] bg-gray-200 font-semibold text-primary'>
      {loading && <LoadingSpinner />}
      <h1 className='text-3xl py-5'>{user?.displayName} your total bookings: {reports.length}</h1>
      <div className="overflow-x-auto mx-20">
        <table className="table w-full table-normal">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Reporter Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className='bg-white'>
            {reports.map((report, i) =>
              <tr key={report._id}>
                <th>{i + 1}</th>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={report.image} alt="Avatar Tailwind CSS Component" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{report.productName}</div>
                      <div className="text-sm opacity-50">{report.category}</div>
                    </div>
                  </div>
                </td>
                <td>{report.reporterName}</td>
                <td>{report.reporterEmail}</td>
                <td><button onClick={() => handleDelete(report)} className='btn btn-xs font-semibold text-white btn-error'>Delete</button></td>
              </tr>
            )
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportedItems;
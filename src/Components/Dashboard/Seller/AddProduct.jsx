import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../Context/AuthProvider';
import { GeneralContext } from '../../../Context/GeneralProvider';
import ButtonSpinner from '../../Spinner/buttonSpinner';

const AddProduct = () => {
  const { user, loading, setLoading } = useContext(AuthContext);
  const { register, formState: { errors }, handleSubmit } = useForm();
  const {dbUser}= useContext(GeneralContext);
  const badge = dbUser?.role;
  const navigate = useNavigate();
  const handleAddProduct = data => {
    setLoading(true)
    const image = data.image[0];
    const formData = new FormData();
    formData.append('image', image);
    const url = `https://api.imgbb.com/1/upload?key=b425c34f0debd616d9ceb086ef1f326c`;
    fetch(url, {
      method: 'POST',
      body: formData
    }).then(res => {
      return res.json()
    })
      .then(imgData => {
        if (imgData.success) {
          const image = imgData.data.url;
          const product = { ...data, image, badge };
          fetch('http://localhost:5000/products', {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
              authorization: `bearer ${localStorage.getItem('cameraCrew-token')}`
            },
            body: JSON.stringify(product)
          }).then(res => res.json()).then(product => {
            if (product.acknowledged) {
              Swal.fire({
                icon: 'success',
                title: `${data.productName} added successfully`,
                showConfirmButton: false,
                timer: 1500
              })
              setLoading(false)
              navigate('/dashboard/myProducts')
            }
          })
        }
      })
  }

  return (
    <div className='mx-3 bg-gray-200 h-[100vh]'>
      <h1 className='text-3xl py-5 font-semibold text-primary'>Add A Product</h1>
      <form onSubmit={handleSubmit(handleAddProduct)} className='w-[48vw] mx-auto bg-base-100 p-10 rounded-xl text-primary ng-untouched ng-pristine ng-valid drop-shadow-[-15px_15px_0_rgba(0,0,0,0.25)]'>
        <div className='flex items-center justify-between text-lg input-bordered input'>
          <input type='text' {...register("userName")} className='bg-base-100 text-primary' value={user?.displayName} readOnly />
          <input type='text' {...register("email")} className='bg-base-100 text-primary' value={user?.email} readOnly />
        </div>
        <div className='flex my-5'>
          <div className='form-control w-1/3'>
            <input placeholder='Product Name' type='text' {...register("productName", { required: 'Name required' })} className='rounded-lg input-bordered input' />
            {errors.productName && <p className='text-red-600 text-left'>{errors.productName?.message}</p>}
          </div>
          <div className='form-control w-1/3'>
            <input placeholder='Location- Barishal' type='text' {...register("location", { required: 'Location is required' })} className='rounded-lg input-bordered input' />
            {errors.location && <p className='text-red-600 text-left'>{errors.location?.message}</p>}
          </div>
          <div className='form-control w-1/3'>
            <input placeholder='Resale Price- 200' type='text' {...register("resalePrice", { required: 'Resale price is required' })} className='rounded-lg input-bordered input' />
            {errors.resalePrice && <p className='text-red-600 text-left'>{errors.resalePrice?.message}</p>}
          </div>
        </div>
        <div className='flex'>
          <div className='form-control w-1/3'>
            <input placeholder='Original Price- 250' type='text' {...register("originalPrice", { required: 'Original Price required' })} className='rounded-lg input-bordered input' />
            {errors.originalPrice && <p className='text-red-600 text-left'>{errors.originalPrice?.message}</p>}
          </div>
          <div className='form-control w-1/3'>
            <input placeholder='Years of use- 2' type='text' {...register("usesYears", { required: 'Email address is required' })} className='rounded-lg input-bordered input' />
            {errors.usesYears && <p className='text-red-600 text-left'>{errors.usesYears?.message}</p>}
          </div>
          <div className='form-control w-1/3'>
            <select type='text' {...register("category", { required: 'Category is required' })} className="select select-bordered w-full" >
              <option value='Category' selected disabled>Category</option>
              <option value="DSLR Camera">DSLR Camera</option>
              <option value="Handycam">Handycam</option>
              <option value="Video Camera">Video Camera</option>
            </select>
            {errors.category && <p className='text-red-600 text-left'>{errors.category?.message}</p>}
          </div>
        </div>
        <div className='flex justify-center my-5'>
          <div className='form-control w-1/2'>
            <input placeholder='Mobile number' type='text' {...register("mobile", { required: 'Email address is required' })} className='rounded-lg input-bordered input' />
            {errors.mobile && <p className='text-red-600 text-left'>{errors.mobile?.message}</p>}
          </div>
          <div className='form-control w-1/3'>
            <select type='text' {...register("condition", { required: 'Condition is required' })} className="select select-bordered w-full" >
              <option value='Category' selected disabled>Condition</option>
              <option value="Excellent">Excellent</option>
              <option value="Good">Good</option>
              <option value="Fair">Fair</option>
            </select>
            {errors.condition && <p className='text-red-600 text-left'>{errors.condition?.message}</p>}
          </div>
        </div>
        <div>
          <textarea placeholder='Description' {...register("description", { required: 'Description is required' })} className='w-full input input-bordered p-3 h-16 text-lg'></textarea>
          {errors.description && <p className='text-red-600 text-left'>{errors.description?.message}</p>}
        </div>
        <div className="mt-7">
          <label className="block font-medium mb-2">Upload Product Photo</label>
          <input type="file" name="image" className="p-8 border-2 border-dashed rounded-md border-gray-300 text-gray-400" {...register("image", { required: 'Image is required' })} />
        </div>
        <button className='btn btn-primary w-full my-5 text-white text-lg'>
          {loading ? <ButtonSpinner /> : 'Add Product'}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
import { updateProfile } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import { AuthContext } from '../Context/AuthProvider';
import google from '../Assets/img/icon/google.png'

const SignUp = () => {
  const { register, formState: { errors }, handleSubmit } = useForm();
  const { createUser, auth } = useContext(AuthContext);
  const [img, setImg] = useState('');
  // const navigate = useNavigate();
  const handleSignUp = data => {
    const { role, name, email, password } = data;
    const image = data.image[0];
    const formData = new FormData();
    formData.append('image', image);
    const url = `https://api.imgbb.com/1/upload?key=b425c34f0debd616d9ceb086ef1f326c`;
    fetch(url, {
      method: 'POST',
      body: formData
    }).then(res => res.json())
      .then(imgData => {
        if (imgData.success) {
          const image = imgData.data.url;
          setImg(image)
        }
      })
    console.log(role, name, email, password, img);
    createUser(email, password)
      .then(result => {
        updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: img
        })
        const user = result.user;
        Swal.fire({
          icon: 'success',
          title: 'Sign up Successful.',
          showConfirmButton: false,
          timer: 1500
        })
        // saveUser(name, email, role);
        // setAuthToken(user);
        console.log(user);

      })
      .catch(error => console.error(error))
  };
  // const saveUser = (name, email) => {
  //   const user = { name, email };
  //   fetch('http://localhost:5000/users', {
  //     method: 'POST',
  //     headers: {
  //       'content-type': 'application/json'
  //     },
  //     body: JSON.stringify(user),
  //   })
  //     .then(res => res.json())
  //     .then(data => navigate('/'))
  // }
  return (
    <div className='lg:h-[89vh] flex justify-center'>
      <div className='lg:w-1/3 mx-2 lg:mx-0 mt-8 mb-32 shadow-xl p-5 rounded-xl bg-white'>
        <h2 className='text-2xl font-semibold mb-5'>Please Sign Up</h2>
        <form onSubmit={handleSubmit(handleSignUp)}>
          <div className='text-xl flex items-center justify-center font-semibold text-primary mt-4'>
            <input type="radio" value="Buyer" checked name="role" {...register("role")} className='h-4 w-4 mr-2' /> Buyer
            <input type="radio" value="Seller" name="role" {...register("role")} className='h-4 w-4 ml-6 mr-2' /> Seller
          </div>
          <div className='form-control w-full'>
            <label className="label">
              <span className="label-email">Photo</span>
            </label>
            <input type='file' name='image' {...register("image", { required: 'Image required' })} className='rounded-lg input-bordered input p-2' />
            {errors.image && <p className='text-red-600 text-left'>{errors.image?.message}</p>}
          </div>
          <div className='form-control w-full'>
            <label className="label">
              <span className="label-email">Full name</span>
            </label>
            <input type='text' {...register("name", { required: 'Name required' })} className='rounded-lg input-bordered input' />
            {errors.name && <p className='text-red-600 text-left'>{errors.name?.message}</p>}
          </div>

          <div className='form-control w-full'>
            <label className="label">
              <span className="label-email">Email</span>
            </label>
            <input type='email' {...register("email", { required: 'Email address is required' })} className='rounded-lg input-bordered input' />
            {errors.email && <p className='text-red-600 text-left'>{errors.email?.message}</p>}
          </div>
          <div className='form-control w-full'>
            <label className="label">
              <span className="label-password">Password</span>
            </label>
            <input type='password' {...register("password", {
              required: 'Password is required',
              minLength: { value: 6, message: 'Password must be min 6 characters' },
              pattern: { value: /(?=.*\d)(?=.*[a-zA-Z])(?=.*[!#$%&? "])/, message: 'provide uppercase, digit & special character' }
            })} className='rounded-lg input-bordered input' />
            {errors.password && <p className='text-red-600 text-left'>{errors.password?.message}</p>}
          </div>

          <input type="submit" value='Sign up' className='btn btn-primary text-white my-4 w-full' />
        </form>
        <p>Already in Camera Crew ? <Link to='/login' className='text-primary font-semibold' >Please Login</Link></p>
        <div className="divider">OR</div>
        <button className='btn btn-outline btn-primary w-full'><img src={google} className='h-8 mr-2' alt="google" /> Continue with Google</button>
      </div>
    </div>
  );
};

export default SignUp;
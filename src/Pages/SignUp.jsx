import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import { AuthContext } from '../Context/AuthProvider';
import google from '../Assets/img/icon/google.png';
import { setAuthToken } from '../API/auth';
import ButtonSpinner from '../Components/Spinner/buttonSpinner';

const SignUp = () => {
  const { register, formState: { errors }, handleSubmit } = useForm();
  const { createUser, updateUserProfile, loading, setLoading, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
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
        if (imgData?.success) {
          const userImage = `${imgData?.data.display_url}`;
          createUser(email, password)
            .then(() => {
              updateUserProfile(name, imgData.data.display_url)
              setAuthToken({ name, email, userImage, role });
              Swal.fire({
                icon: 'success',
                title: 'Sign up Successful.',
                showConfirmButton: false,
                timer: 1500
              })
              setLoading(false);
              navigate(from, { replace: true });
            })
            .catch(error => {
              console.error(error);
              setLoading(false)
            })
        }
      })
  };
  const handleGoogleSign = () => {
    signInWithGoogle().then(result => {
      const user = result.user;
      console.log(user);
      setAuthToken({...user, role: 'Buyer'});
      setLoading(false);
      navigate(from, { replace: true })
    })
  }
  return (
    <div className='lg:h-[100vh] flex justify-center pt-32'>
      <div className='lg:w-[40vw] mx-2 lg:mx-0 mt-8 h-[72vh] shadow-xl p-10 rounded-xl bg-white'>
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
          <button className='btn btn-primary w-full my-5 text-white text-lg'>
            {loading ? <ButtonSpinner /> : 'Sign Up'}
          </button>
        </form>
        <p>Already in Camera Crew ? <Link to='/login' className='text-primary font-semibold' >Please Login</Link></p>
        <div className="divider">OR</div>
        <button onClick={handleGoogleSign} className='btn btn-outline btn-primary w-full text-lg'><img src={google} className='h-8 mr-2' alt="google" /> Continue with Google</button>
      </div>
    </div>
  );
};

export default SignUp;
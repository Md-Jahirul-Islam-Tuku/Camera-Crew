import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider';
import google from '../Assets/img/icon/google.png'
import { setAuthToken } from '../API/auth';
import Swal from 'sweetalert2';
import ButtonSpinner from '../Components/Spinner/buttonSpinner';

const Login = () => {
  const { register, formState: { errors }, handleSubmit } = useForm();
  const { signIn, loading, setLoading, signInWithGoogle } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const handleLogin = data => {
    const { email, password } = data;
    signIn(email, password)
      .then(result => {
        const user = result.user;
        setLoading(false)
        setAuthToken(user)
        Swal.fire({
          icon: 'success',
          title: 'Login Successful.',
          showConfirmButton: false,
          timer: 1500
        })
        navigate(from, { replace: true });
      })
      .then(error => {
        console.error(error)
        setLoading(false)
      }).catch(err => {
        console.log('error',err)
        if (err.message === 'Firebase: Error (auth/user-not-found).') {
          Swal.fire({
            icon: 'error',
            title: 'User Not Found. Create new account.',
            showConfirmButton: false,
          })
        }
        setLoading(false)
      })
  };
  const handleGoogleSign = () => {
    signInWithGoogle().then(result => {
      const user = result.user;
      console.log(user);
      setAuthToken({ ...user, role: 'Buyer' });
      setLoading(false);
      navigate(from, { replace: true })
    })
  }
  return (
    <div className='lg:h-[100vh] flex justify-center pt-32'>
      <div className='lg:w-[40vw] mx-2 lg:mx-0 shadow-xl mt-20 mb-48 p-10 rounded-xl bg-white'>
        <h2 className='text-2xl font-semibold mb-5'>Please Login</h2>
        <form onSubmit={handleSubmit(handleLogin)}>
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
              minLength: { value: 6, message: 'Password must be min 6 characters' }
            })} className='rounded-lg input-bordered input' />
            {errors.password && <p className='text-red-600 text-left'>{errors.password?.message}</p>}
            <label className="label">
              <a href="/" className="label-text-alt link link-hover">Forgot password?</a>
            </label>
          </div>
          <button className='btn btn-primary w-full my-5 text-white text-lg'>
            {loading ? <ButtonSpinner /> : 'Log in'}
          </button>
        </form>
        <p>New to Camera Crew ? <Link to='/signup' className='text-primary font-semibold' >Create new account</Link></p>
        <div className="divider">OR</div>
        <button onClick={handleGoogleSign} className='btn btn-outline btn-primary w-full'><img src={google} className='h-8 mr-2' alt="google" /> Continue with Google</button>
      </div>
    </div>
  );
};

export default Login;
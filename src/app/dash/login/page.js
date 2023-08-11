"use client"
import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import logo from '../../../../public/logo.png';
import login from '../../../../public/login.png';
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../../features/auth/authSlice';
import { useLoginMutation } from '../../../features/auth/authApiSlice';

const LoginPage = () => {
  const userRef = useRef();
  const errRef = useRef();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [device_name, setDevice_name] = useState('');

  const [errMsg, setErrMsg] = useState('');
  const router = useRouter();

  const [loginMutation, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [email, password, device_name]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = await loginMutation({ email, password, device_name }).unwrap();
      dispatch(setCredentials({ ...userData }));
      setEmail('');
      setPassword('');
      setDevice_name('');
      router.push('/dash/dashboard'); // Use correct path format with '/'
    } catch (err) {
        if (!err?.originalStatus) {
            // isLoading: true until timeout occurs
            setErrMsg('No Server Response');
        } else if (err.originalStatus === 400) {
            setErrMsg('Missing Username or Password');
        } else if (err.originalStatus === 401) {
            setErrMsg('Unauthorized');
        } else {
            setErrMsg('Login Failed');
        }
        errRef.current.focus();
    }
  };

  const handleUserInput = (e) => setEmail(e.target.value);
  const handlePwdInput = (e) => setPassword(e.target.value);

  const content = isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <div 
    className="h-full flex flex justify-center items-center  bg-image bg-cover bg-center "
    style={{
      backgroundImage: `url(${login.src})`,
    }}>
      <section className="md:w-[50%] w-full px-2 md:px-36 h-screen bg-white">
      <div className='grid place-content-center mt-9'>
      <Image src={logo} width="48" height="48" alt='logo'/>
      </div>
      <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>


      {/*welcome back */}
      <section className=" mt-20 ">
      <div><h1 className='text-[20px] text-center font-bold'>Login To Dashboard </h1></div>
      </section>

      {/*inputs div */}
      <form onSubmit={handleSubmit}>
      <section className='mt-5 flex flex-col gap-3 text-[12px]'>
      <div className=''>
      <h2>Email address</h2>
      <input 
      type="text"
      id="email"
      ref={userRef}
      value={email}
      onChange={handleUserInput}
      autoComplete="off"
      required
      className="w-full p-3 border rounded-lg" placeholder="enter email"  />

      </div>

      <div className=''>
      <h2>Password</h2>
      <input
       type="password"
       id="password"
       onChange={handlePwdInput}
       value={password}
       required
      className="w-full p-3 border rounded-lg" placeholder="enter password"  />
      </div>
      
      

      </section>

      {/* remember */}
      <section className='mt-2 flex text-[12px] justify-between text-black'>
      <div className='flex gap-1'>
      <input type='checkbox'/>
      <h2>Remember</h2>
      </div>
      <div>
      <h2>Forgot Password?</h2>
      </div>
      </section>

      {/* buttons */}
      <section className='mt-[37px] text-[12px]'>
      <div>
      <button type='submit' className='w-full rounded-lg text-white p-3 text-[16px] bg-[#FF7D00] text-center'>
      <h1>sign in</h1>
      </button>
      </div>
      

      

      </section>
      </form>

      </section>
      
    </div>
  );

  return content;
};

export default LoginPage;

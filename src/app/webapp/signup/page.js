import React from 'react'
import Image from 'next/image'
import logo from '../../../../public/logo.png'
import signup from '../../../../public/signup.png'
import { useRegisterMutation } from '@/app/api/apiSlice'

const page = () => {
  const [formData, setFormData] = useState({
    name: '',
    email_address: '',
    phone_number: '',
    account_type: '',
    company: '',
    password: '',
    // "name": "Aiken Geln",
    // "email_address": "johndoe@mail.com",
    // "phone_number": "08147775048",
    // "account_type": "rider",
    // "company": 1000000,
    // "password": "password123"
  });

  const [register, { isLoading, isSuccess, isError, error }] = useRegisterMutation();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await register(formData);

      if (response) {
        console.log('User created successfully.');
        // Redirect or show a success message
      } else {
        console.error('User creation failed.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      console.error('Response:', error.response);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div
    className="h-full flex  bg-image bg-cover bg-center "
    style={{
      backgroundImage: `url(${signup.src})`,
    }}>
      <section className="md:w-[50%] md:px-36 h-full bg-white">
      <div className=' mt-3'>
      <Image src={logo} width="48" height="48" alt='logo'/>
      </div>

      {/*welcome bacl */}
      <section className=" flex flex-col gap-3 p-0 mt-5">
      <div><h1 className='text-[20px] font-bold'>Create an Account</h1></div>
      <div><p className='text-[12px]'>Complete the sign up process to get started</p></div>
      </section>

      {/*inputs div */}
      
      <section className='mt-3 flex flex-col gap-3 text-[12px]'>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>

      <div className=''>
      <h2>Full Name</h2>
      <input 
      id="name"
      name="name"
      type="text"
      autoComplete="name"
      required
      onChange={handleInputChange}
      value={formData.name}
      className="w-full p-3 border rounded-lg" placeholder="enter email"  />

      </div>

      <div className=''>
      <h2> Email address</h2>
      <input
      id="email_address"
      name="email_address"
      type="email"
      autoComplete="email"
      required
      onChange={handleInputChange}
      value={formData.email}
      className="w-full p-3 border rounded-lg" placeholder="enter password"  />
      </div>
      
      <div className=''>
      <h2>Phone Number</h2>
      <input 
      id="phone_number"
      name="phone_number"
      type="tel"
      autoComplete="tel"
      required
      onChange={handleInputChange}
      value={formData.phone_number}
      className="w-full p-3 border rounded-lg" placeholder="enter email"  />

      </div>

      <div className=''>
      <h2>Account Type</h2>
      <select      id="account_type"
      name="account_type"
      autoComplete="account-type"
      required
      onChange={handleInputChange}
      value={formData.account_type}
      className="w-full p-3 border rounded-lg" type="email" placeholder="enter password"  >
        <option value="" disabled>Select account type</option>
              <option value="company">Company</option>
              <option value="customer">Customer</option>
              <option value="rider">Rider</option>
      </select>
      </div>

      <div className=''>
      <label htmlFor="company" className="block text-sm font-medium text-gray-700">
              Company (Optional)
            </label>
            <input
              id="company"
              name="company"
              type="number"
              autoComplete="off"
              onChange={handleInputChange}
              value={formData.company}
      className="w-full p-3 border rounded-lg" placeholder="enter password"  />
      </div>

      <div>
      <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              onChange={handleInputChange}
              value={formData.password}
      className="w-full p-3 border rounded-lg" placeholder="enter password"  />
      </div>
      </form>


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
      <section className='mt-3 flex flex-col gap-3 text-[12px]'>
      <div>
      <button className='w-full rounded-lg text-white p-3 bg-[#FF7D00] text-center'>
      <h1>sign in</h1>
      </button>
      </div>

      <div>
      <h1 className='text-center my-1'>OR</h1>
      </div>

      <div>
      <button className='w-full rounded-lg border border-[#FF7D00] p-3 text-[#FF7D00] text-center'>
      <h1>Continue with google</h1>
      </button>
      </div>

      <div>
      <h1 className='text-right my-3'>Don’t have an account? Sign Up</h1>
      </div>

      </section>

      </section>
    </div>
  )
}

export default page

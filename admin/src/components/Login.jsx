import React, { useState } from 'react';
import axios from 'axios'
import { backendUrl } from '../App';
import { toast } from 'react-toastify';


const Login = ({setToken}) => {
  const [email ,setEmail] = useState('');
  const [password, setPassword] = useState('');

    const onSubmitHandler = async(e)=>{
      try {
        e.preventDefault()
        const response = await axios.post(backendUrl + '/api/user/admin' , {email , password})
        if (response.data.success) {
          setToken(response.data.token)
        }
        else{
          toast.error(response.data.messege)
        }
        
      } catch (error) {
        console.log(error);
        toast.error(error.messege)
      }
    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-md rounded-lg w-full max-w-md p-8">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Admin Panel</h1>
        <form onSubmit={onSubmitHandler}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Email Address</label>
            <input onChange={(e)=>setEmail(e.target.value)} value={email}
              type="email"
              placeholder="your@gmail.com"
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-1">Password</label>
            <input onChange={(e)=>setPassword(e.target.value)} value={password}
              type="password"
              placeholder="Enter Your Password"
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

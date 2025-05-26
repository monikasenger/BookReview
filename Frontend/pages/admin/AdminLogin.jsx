import React, { useState, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { AdminContext } from '../../context/AdminContext';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {setAToken, backendUrl}= useContext(AdminContext)
  const navigate = useNavigate();
const onSubmitHandler = async(event)=>{
event.preventDefault()
const {data}= await axios.post(`${backendUrl}/api/admin/admin-login`, { email, password });

if (data.success) {
  localStorage.setItem('aToken',data.token)
  setAToken(data.token)
  
}else{
  toast.error(data.message)
}
}
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={onSubmitHandler} className="bg-white p-8 rounded shadow-md w-80">
        <h2 className="text-2xl font-semibold mb-4 text-center">Admin Login</h2>
        <input
          type="email"
          onChange={(e)=>setEmail(e.target.value)}
          value={email}
          placeholder="Admin Email"
          className="w-full p-2 border mb-4 rounded"
          required
        />
        <input
          type="password"
           onChange={(e)=>setPassword(e.target.value)}
          value={password}
          placeholder="Admin Password"
          className="w-full p-2 border mb-4 rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;

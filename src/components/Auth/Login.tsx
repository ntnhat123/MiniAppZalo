import React, { useEffect, useState } from 'react';
import CryptoJS, { SHA1 } from 'crypto-js';
import LogoImage from 'logo.jpg'
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash,FaUser,FaLock } from "react-icons/fa";
import { useAuth } from 'context/authContext';
import { RiErrorWarningFill } from 'react-icons/ri';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRevealPassword, setIsRevealPassword] = useState(false);
  const {login,errors} = useAuth();

  const togglePassword = () => {
    setIsRevealPassword((prevState) => !prevState);
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    const hash = SHA1(password);
    const hashWords = hash.words;
    let hashpassword = '';
    for (let i = 0; i < hashWords.length * 4; i++) {
      const byte = (hashWords[Math.floor(i / 4)] >> (8 * (3 - (i % 4)))) & 0xff;
      hashpassword += byte.toString();
    }
    login(username,hashpassword)
  }

  return (
  <div className="flex items-center justify-center min-h-screen overflow-hidden">
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-blue-500 to-white">
      <div className='flex items-center justify-center rounded-full shadow-lg w-32 h-32'>
        <img src={LogoImage} alt="" className='w-full h-full rounded-full object-cover'/>
      </div>
      <div className="bg-white md:p-6 p-7 md:m-1 m-4 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Đăng Nhập</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 relative">
              <label className="block text-gray-700 text-sm font-bold mb-2">Tên đăng nhập</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <FaUser className="text-gray-500" />
                </span>
                <input 
                  type="text" 
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)} 
                  placeholder='Nhập tên người dùng...' 
                  className="w-full pl-10 px-3 py-2 border-b-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  required 
                />
              </div>
          </div>
          <div className="mb-4 relative">
              <label className="block text-gray-700 text-sm font-bold mb-2">Mật khẩu</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <FaLock className="text-gray-500" />
                </span>
                <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Nhập mật khẩu...' className="w-full pl-10 px-3 py-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10 border-b-2" required type={isRevealPassword ? 'text' : 'password'} />
                <span onClick={togglePassword} role="presentation" className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer">
                  {isRevealPassword ? 
                    <FaEyeSlash />
                    : 
                    <IoEyeSharp />
                  }
                </span>
              </div> 
          </div>

          {errors && (
            <p role="alert" className="flex items-center gap-1 text-red-500 text-sm mb-4">
              <RiErrorWarningFill /> {errors}
            </p>
          )}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Đăng Nhập
          </button>
        </form>
      </div>
    </div>
  </div>

  );
};

export default LoginForm;
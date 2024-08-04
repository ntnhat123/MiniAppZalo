import { postLogin } from 'api/Login';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CryptoJS, { SHA1 } from 'crypto-js';
import LogoImage from 'logo.jpg'

const LoginForm = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    const hash = SHA1(password);
    const hashWords = hash.words;
    let hashpassword = '';
    for (let i = 0; i < hashWords.length * 4; i++) {
      const byte = (hashWords[Math.floor(i / 4)] >> (8 * (3 - (i % 4)))) & 0xff;
      hashpassword += byte.toString();
    }

    console.log({ username,  hashpassword });
    
    try {
      const res = await postLogin(username, hashpassword);
      if (res) {
        navigate('calendar');
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
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
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Tên đăng nhập:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder='Nhập tên người dùng...'
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Mật khẩu:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Nhập mật khẩu...'
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
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

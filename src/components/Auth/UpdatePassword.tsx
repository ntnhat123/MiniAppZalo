import React, { useState } from 'react';
import CryptoJS, { SHA1 } from 'crypto-js';
import { FaLock } from "react-icons/fa";
import { useAuth } from 'context/authContext';
import { RiErrorWarningFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { postUpdatePassword } from 'api/UpdatePassword';

import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

const UpdatePasswordForm = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isRevealPassword, setIsRevealPassword] = useState(false);
  const { user, login, errors } = useAuth();
  const navigate = useNavigate();

  const togglePassword = () => {
    setIsRevealPassword((prevState) => !prevState);
  }

  const hashPassword = (password) => {
    const hash = SHA1(password);
    const hashWords = hash.words;
    let hashPassword = '';
    for (let i = 0; i < hashWords.length * 4; i++) {
      const byte = (hashWords[Math.floor(i / 4)] >> (8 * (3 - (i % 4)))) & 0xff;
      hashPassword += byte.toString();
    }
    return hashPassword;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const hashedOldPassword = hashPassword(oldPassword);
    const hashedNewPassword = hashPassword(newPassword);

    try {
      const res = await postUpdatePassword(hashedOldPassword, hashedNewPassword);
      if (res) {
        toast.success("Lưu dữ liệu thành công", { autoClose: 1000, draggable: true });
        console.log(res);
      }
    } catch (error) {
      toast.error("Lưu dữ liệu thất bại");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen overflow-hidden">
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-blue-500 to-white">
        <div className="bg-white md:p-6 p-7 md:m-1 m-4 rounded-2xl shadow-lg w-96">
          <h2 className="text-2xl font-bold mb-4 text-center">Đổi mật khẩu</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4 relative">
              <label className="block text-gray-700 text-sm font-bold mb-2">Mật khẩu cũ</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <FaLock className="text-gray-500" />
                </span>
                <input value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} placeholder='Nhập mật khẩu cũ...' className="w-full pl-10 px-3 py-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-transparent pr-10 border-b-2" required type={isRevealPassword ? 'text' : 'password'} />
              </div>
            </div>
<div className="mb-4 relative">
              <label className="block text-gray-700 text-sm font-bold mb-2">Mật khẩu mới</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <FaLock className="text-gray-500" />
                </span>
                <input value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder='Nhập mật khẩu mới...' className="w-full pl-10 px-3 py-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-transparent pr-10 border-b-2" required type={isRevealPassword ? 'text' : 'password'} />
              </div>
            </div>
            <div className="mb-4 relative">
              <label className="block text-gray-700 text-sm font-bold mb-2">Nhập lại mật khẩu mới</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <FaLock className="text-gray-500" />
                </span>
                <input value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder='Nhập lại mật khẩu mới...' className="w-full pl-10 px-3 py-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-transparent pr-10 border-b-2" required type={isRevealPassword ? 'text' : 'password'} />
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
              Lưu thay đổi
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdatePasswordForm;
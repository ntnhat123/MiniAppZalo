import { useAuth } from 'context/authContext';
import React, { useEffect, useState } from 'react';

const Profile = () => {
    const {user,logout} = useAuth();

    const handleLogout = () => {
        logout();
    };

    return (
        <div className="h-full flex flex-col items-center justify-center bg-gray-100">
            <div className="w-full max-w-md rounded-lg p-6">
            <div className="flex justify-center mb-6 relative">
                <img src="https://via.placeholder.com/100" alt="User Profile" className="w-24 h-24 rounded-full border-4 border-white shadow-md"/>
            </div>
        
            <div className="space-y-4">
                <div>
                    <label className="block text-gray-600 font-semibold mb-2">Tên</label>
                    <input type="text" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" value={user?.FullName}/>
                </div>
                
                <div>
                    <label className="block text-gray-600 font-semibold mb-2">Tên đăng nhập</label>
                    <input type="text" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" value={user?.UserName}/>
                </div>
                
                <div>
                    <label className="block text-gray-600 font-semibold mb-2">UserID</label>
                    <input type="email" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" value={user?.UserID}/>
                </div>
                
                <div>
                    <label className="block text-gray-600 font-semibold mb-2">Địa chỉ Email</label>
                    <input type="text" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" value={user?.EmailAddress}/>
                </div>
                
            </div>
        
            <div className="mt-6">
                <button className="w-full bg-blue-600 text-white py-2 rounded-lg shadow-md hover:bg-blue-700 transition-all" onClick={handleLogout}>
                Đăng xuất
                </button>
            </div>
            </div>
    </div>
    
    );
};

export default Profile;
import { useAuth } from 'context/authContext';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authorize,getUserInfo  } from "zmp-sdk/apis";
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const Profile = () => {
    const { user, roles, logout } = useAuth();
    const [avatar, setAvatar] = useState('https://via.placeholder.com/100');
    const navigate = useNavigate();
    useEffect(() => {
        const userAuthorized = localStorage.getItem('userAuthorized');
    
        if (!userAuthorized) {
            authorize({
                scopes: ["scope.userInfo"],
                success: () => {
                    localStorage.setItem('userAuthorized', 'true');
                    getUserInfo({
                        autoRequestPermission: true, 
                        success: (profile) => {
                            setAvatar(profile.userInfo.avatar);
                        },
                        fail: (error) => {
                            console.error('Lỗi khi lấy thông tin người dùng:', error);
                        }
                    });
                },
                fail: (error) => {
                    console.error('Cấp quyền thất bại:', error);
                }
            });
        } else {
            getUserInfo({
                autoRequestPermission: true, 
                success: (profile) => {
                    setAvatar(profile.userInfo.avatar);
                },
                fail: (error) => {
                    console.error('Lỗi khi lấy thông tin người dùng:', error);
                }
            });
        }
    }, []);
    

    useEffect(() => {
        if (!user) {
          navigate('/', { replace: true });
        }
      }, [user, navigate]);

    const handleLogout = () => {
        toast.success("Đăng xuất thành công!",{ autoClose: 1000,draggable: true});
        logout();
    };

    const CheckRole = (roleId) => roles?.some((role) => role?.RoleID === roleId);

    return (
        <div className="h-full flex flex-col items-center bg-gradient-to-b from-blue-500 to-white justify-center">
            <div className="w-full max-w-md rounded-lg p-6">
                <div className="flex justify-center mb-6 relative">
                    <img 
                        src={avatar}
                        alt="User Profile" 
                        className="w-24 h-24 rounded-full border-4 border-white shadow-md" 
                    />
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-black-600 font-semibold mb-2">Tên</label>
                        <input 
                            type="text" 
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            value={user?.FullName || ''} 
                            readOnly 
                        />
                    </div>

                    <div>
                        <label className="block text-black-600 font-semibold mb-2">Tên đăng nhập</label>
                        <input type="text" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" value={user?.UserName || ''}  readOnly />
                    </div>

                    <div>
                        <label className="block text-black-600 font-semibold mb-2">Địa chỉ Email</label>
                        <input 
                            type="email" 
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            value={user?.EmailAddress || ''} 
                            readOnly 
                        />
                    </div>
                </div>
                <div className="mt-6">
                    <button className="w-full bg-blue-600 text-white py-2 rounded-lg shadow-md hover:bg-blue-700 transition-all" onClick={() => navigate("/updatepassword")}>
                        Đổi mật khẩu
                    </button>
                </div>
                {
                    CheckRole(100) && (
                        <div className="mt-6">
                            <button className="w-full bg-blue-600 text-white py-2 rounded-lg shadow-md hover:bg-blue-700 transition-all" onClick={() => navigate("/updatepasswordall")}>
                                Đổi mật khẩu người dùng khác
                            </button>
                        </div>
                    )
                }

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